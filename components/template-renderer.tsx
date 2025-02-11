"use client";

import { useCreateEmailStore } from "@/store/create-email";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { ArrowUpRight, Upload } from "lucide-react";
import React, { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import TemplateSelection from "./template-selection";
import { useCompanyStore } from "@/store/company";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "@/lib/query/templates";
import { Separator } from "./ui/separator";
import Templates from "@/views/templates";
import EmailEditor from "./email-editor";
import axios from "axios";
import { marked } from "marked";
import { useModalStore } from "@/store/modal";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  content: string;
}

interface User {
  id: string;
  email: string;
}

interface Company {
  id: string;
  name: string;
}

interface ValidationError {
  message: string;
  type: "error" | "warning";
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

interface TemplateRendererProps {
  maxRecipientsAllowed?: number;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  maxRecipientsAllowed = 1000, // Default max recipients
}) => {
  const {
    selectedTemplate,
    subject,
    recipients,
    setRecipients,
    body,
    setSubject,
  } = useCreateEmailStore();

  const [recipientInput, setRecipientInput] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isProcessingCSV, setIsProcessingCSV] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useUserStore();
  const { company } = useCompanyStore();
  const { isOpen, onClose, onOpen } = useModalStore();

  const { data: templates } = useQuery({
    queryKey: ["templates"],
    queryFn: () =>
      getTemplates({
        params: `userId=${user?.id}&companyId=${company?.id}`,
      }),
  });

  const validateEmail = (email: string): ValidationResult => {
    const errors: ValidationError[] = [];
    const trimmedEmail = email.trim();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.push({
        message: "Invalid email format",
        type: "error",
      });
    }

    // Length validation
    if (trimmedEmail.length > 254) {
      errors.push({
        message: "Email is too long (max 254 characters)",
        type: "error",
      });
    }

    // Domain validation
    const [localPart, domain] = trimmedEmail.split("@");
    if (
      domain &&
      !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
        domain
      )
    ) {
      errors.push({
        message: "Invalid domain format",
        type: "error",
      });
    }

    // Local part validation
    if (localPart && !/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(localPart)) {
      errors.push({
        message: "Invalid characters in email address",
        type: "error",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const validateRecipientsList = (
    newRecipients: string[]
  ): ValidationResult => {
    const errors: ValidationError[] = [];

    // Check total recipients limit
    if (newRecipients.length > maxRecipientsAllowed) {
      errors.push({
        message: `Maximum ${maxRecipientsAllowed} recipients allowed`,
        type: "error",
      });
    }

    // Check for duplicates
    const duplicates = newRecipients.filter(
      (email, index) => newRecipients.indexOf(email) !== index
    );
    if (duplicates.length > 0) {
      errors.push({
        message: `Duplicate emails found: ${duplicates.join(", ")}`,
        type: "warning",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const handleAddRecipient = (): void => {
    const validation = validateEmail(recipientInput);

    if (!validation.isValid) {
      validation.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    const trimmedEmail = recipientInput.trim();
    if (recipients.includes(trimmedEmail)) {
      toast.error("This email is already in the list");
      return;
    }

    const newRecipients = [trimmedEmail, ...recipients];
    const listValidation = validateRecipientsList(newRecipients);

    if (!listValidation.isValid) {
      listValidation.errors.forEach((error) => {
        if (error.type === "error") {
          toast.error(error.message);
        } else {
          toast.warning(error.message);
        }
      });
      return;
    }

    setRecipients(newRecipients);
    setRecipientInput("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddRecipient();
    }
  };

   const processCSVContent = (
     content: string
   ): {
     validEmails: string[];
     duplicates: string[];
   } => {
     const rows = content.split(/[\r\n]+/);
     const validEmails: string[] = [];
     const errors: string[] = [];
     const duplicatesInFile: string[] = [];
     const duplicatesWithExisting: string[] = [];

     rows.forEach((row, index) => {
       const cleanRow = row.replace(/^\uFEFF/, "");
       if (!cleanRow) return;

       const matches = cleanRow.match(/(?:^|,)("([^"]*)"|([^,]*))/g);
       if (!matches) return;

       matches.forEach((match) => {
         const email = match.replace(/^,/, "").replace(/^"|"$/g, "").trim();

         if (email) {
           const validation = validateEmail(email);
           if (validation.isValid) {
             // Check if email is already in recipients list
             if (recipients.includes(email)) {
               duplicatesWithExisting.push(email);
             }
             // Check if email is already found in current CSV
             else if (validEmails.includes(email)) {
               duplicatesInFile.push(email);
             }
             // Only add if it's not a duplicate
             else {
               validEmails.push(email);
             }
           } else {
             errors.push(
               `Row ${index + 1}: ${email} - ${validation.errors[0].message}`
             );
           }
         }
       });
     });

     if (errors.length > 0) {
       toast.warning(
         `Some emails were invalid:\n${errors.slice(0, 5).join("\n")}${
           errors.length > 5 ? "\n..." : ""
         }`
       );
     }

     if (duplicatesInFile.length > 0) {
       toast.warning(
         `Duplicates found within CSV:\n${duplicatesInFile
           .slice(0, 5)
           .join("\n")}${duplicatesInFile.length > 5 ? "\n..." : ""}`
       );
     }

     if (duplicatesWithExisting.length > 0) {
       toast.warning(
         `Emails already in recipients list:\n${duplicatesWithExisting
           .slice(0, 5)
           .join("\n")}${duplicatesWithExisting.length > 5 ? "\n..." : ""}`
       );
     }

     return {
       validEmails,
       duplicates: [...duplicatesInFile, ...duplicatesWithExisting],
     };
   };

   const handleFileUpload = async (
     event: ChangeEvent<HTMLInputElement>
   ): Promise<void> => {
     try {
       setIsProcessingCSV(true);
       const file = event.target.files?.[0];

       if (!file) {
         toast.error("No file selected");
         return;
       }

       if (!file.type && !file.name.endsWith(".csv")) {
         toast.error("Please upload a CSV file");
         return;
       }

       if (file.size > 5 * 1024 * 1024) {
         toast.error("File size too large. Maximum size is 5MB");
         return;
       }

       const reader = new FileReader();

       reader.onload = (e: ProgressEvent<FileReader>) => {
         const text = e.target?.result as string;
         const { validEmails, duplicates } = processCSVContent(text);

         if (validEmails.length === 0) {
           if (duplicates.length > 0) {
             toast.error("All emails in CSV are duplicates");
           } else {
             toast.error("No valid email addresses found in the CSV file");
           }
           return;
         }

         // Only add non-duplicate emails
         const combinedEmails = [...validEmails, ...recipients];

         const listValidation = validateRecipientsList(combinedEmails);
         if (!listValidation.isValid) {
           listValidation.errors.forEach((error) => {
             if (error.type === "error") {
               toast.error(error.message);
             } else {
               toast.warning(error.message);
             }
           });
           return;
         }

         setRecipients(combinedEmails);
         toast.success(
           `Added ${validEmails.length} new email${
             validEmails.length === 1 ? "" : "s"
           }${
             duplicates.length > 0
               ? `\nSkipped ${duplicates.length} duplicate${
                   duplicates.length === 1 ? "" : "s"
                 }`
               : ""
           }`
         );
       };

       reader.onerror = () => {
         toast.error("Error reading file");
       };

       reader.readAsText(file);
     } catch (error) {
       toast.error("Error processing CSV file");
       console.error("CSV processing error:", error);
     } finally {
       setIsProcessingCSV(false);
       if (event.target) {
         event.target.value = "";
       }
     }
   };

  const removeRecipient = (indexToRemove: number): void => {
    setRecipients(recipients.filter((_, index) => index !== indexToRemove));
  };

  if (!selectedTemplate) return null;

  const sendEmailConfirmation = (): void => {
    onOpen();
  };

  return (
    <div className="flex p-4 flex-col justify-center items-start gap-6 self-stretch rounded-2xl bg-white/[.08]">
      <div className="flex flex-col justify-center items-start gap-4 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex items-center gap-2 self-stretch">
            <p className="ty-descriptions text-white/[.32] w-[100px]">Subject</p>
            <Input
              value={subject}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSubject(e.target.value)
              }
              placeholder="Something captivating..."
              className="bg-white/[.08] w-full placeholder:ty-descriptions placeholder:text-white/[.32]"
            />
          </div>
          <div className="flex flex-col gap-2 self-stretch">
            <div className="flex  gap-2 self-stretch">
              <p className="ty-descriptions text-white/[.32] w-[100px]">
                Recipients ({recipients.length}/{maxRecipientsAllowed})
              </p>
              <div className="flex gap-2 w-full items-center">
                <Input
                  value={recipientInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRecipientInput(e.target.value)
                  }
                  onKeyDown={handleKeyPress}
                  placeholder="Enter email address"
                  className="bg-white/[.08] flex-1 w-full ty-descriptions placeholder:ty-descriptions placeholder:text-white/[.32]"
                />
                <Button
                  disabled={!recipientInput || !validateEmail(recipientInput).isValid}
                  onClick={handleAddRecipient}
                  className="bg-white/[.8] text-black"
                >
                  Add
                </Button>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/[.8] text-black flex items-center gap-2"
                  disabled={isProcessingCSV}
                >
                  <Upload size={16} />
                  {isProcessingCSV ? "Processing..." : "CSV"}
                </Button>
              </div>
            </div>
            <div className="flex">
              {recipients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {recipients.slice(0, 5).map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white/[.08] px-2 py-1 rounded"
                    >
                      <span className="text-white/[.8] text-[10.24px]">
                        {email}
                      </span>
                      <button
                        onClick={() => removeRecipient(index)}
                        className="text-white/[.32] hover:text-white/[.8] text-[10.24px]"
                        aria-label={`Remove ${email}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {recipients.length > 5 && (
                    <div className="flex items-center gap-2 bg-white/[.08] px-2 py-1 rounded">
                      <span className="text-white/[.8] text-[10.24px]">
                        +{recipients.length - 5} more
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="ty-descriptions text-white/[.32]">Email Content</p>

        <EmailEditor isPreview={isPreview} setIsPreview={setIsPreview} />
      </div>

      <div className="flex justify-end items-center gap-2 self-stretch">
        <Button
          onClick={() => setIsPreview(!isPreview)}
          variant={"ghost"}
          className="bg-gold/[.04]"
        >
          <p className="text-gold">Show Preview</p>
        </Button>
        <Button
          onClick={sendEmailConfirmation}
          variant={"ghost"}
          className="bg-white/[.08] flex items-center"
        >
          <p className="ty-title text-[14px] text-white/[.32]">Send now </p>
          <ArrowUpRight size={14} className="text-white/[.32]" />
        </Button>
      </div>
    </div>
  );
};

export default TemplateRenderer;
