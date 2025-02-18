"use client";

import { useCreateEmailStore } from "@/store/create-email";
import { useModalStore } from "@/store/modal";
import { ArrowUpRight, Upload } from "lucide-react";
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { toast } from "sonner";
import EmailEditor from "./email-editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
    setSubject,
  } = useCreateEmailStore();

  const [recipientInput, setRecipientInput] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isProcessingCSV, setIsProcessingCSV] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const { onOpen } = useModalStore();


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
    <div className="flex p-4 flex-col  gap-6 self-stretch rounded-2xl bg-white/[.08] h-full grow w-full">
      <div className="flex flex-col grow justify-center items-start gap-4 self-stretch h-full">
        <div className="flex flex-col items-start justify-start gap-4 self-stretch">
          <div className="flex flex-col 2xl:flex-row items-center gap-2 self-stretch">
            <p className="ty-descriptions text-white/[.32] self-stretch 2xl:w-[100px]">
              Subject
            </p>
            <Input
              value={subject}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSubject(e.target.value)
              }
              placeholder="Something captivating..."
              className="bg-white/[.08] w-full placeholder:ty-descriptions placeholder:text-white/[.32] p-3"
            />
          </div>
          <div className="flex flex-col gap-2 self-stretch">
            <div className="flex flex-col 2xl:flex-row gap-2 self-stretch">
              <p className="ty-descriptions text-white/[.32] self-stretch 2xl:w-[100px]">
                Recipients ({recipients.length}/{maxRecipientsAllowed})
              </p>
              <div className="flex flex-col 2xl:flex-row gap-2 w-full items-center">
                <Input
                  value={recipientInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRecipientInput(e.target.value)
                  }
                  onKeyDown={handleKeyPress}
                  placeholder="Enter email address"
                  className="bg-white/[.08] flex-1 w-full ty-descriptions placeholder:ty-descriptions placeholder:text-white/[.32] p-3"
                />
                <Button
                  disabled={
                    !recipientInput || !validateEmail(recipientInput).isValid
                  }
                  onClick={handleAddRecipient}
                  className="bg-white/[.8] text-black w-full 2xl:w-fit"
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
                  className="bg-white/[.8] text-black flex items-center gap-2 w-full 2xl:w-fit"
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

        <div className="flex flex-col w-full grow bg-white/[.04] rounded-2xl border border-dashed border-gold overflow-hidden h-full">
          <EmailEditor isPreview={isPreview}  />
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap  justify-end items-center gap-2 self-stretch">
        <Button
          onClick={() => setIsPreview(!isPreview)}
          variant={"ghost"}
          className="bg-gold/[.04] w-full lg:w-fit"
        >
          <p className="text-gold">Show Preview</p>
        </Button>
        <Button
          disabled={recipients.length === 0 || subject.trim() === ""}
          onClick={sendEmailConfirmation}
          variant={"ghost"}
          className="bg-white/[.08] flex items-center w-full lg:w-fit"
        >
          <p className="ty-title text-[14px] text-white/[.32]">Send now </p>
          <ArrowUpRight size={14} className="text-white/[.32]" />
        </Button>
      </div>
    </div>
  );
};

export default TemplateRenderer;
