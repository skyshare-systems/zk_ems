"use client";

import { generateTemplate } from "@/lib/mutation/template/generateTemplate";
import { useCreateEmailStore } from "@/store/create-email";
import { useModalStore } from "@/store/modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUpRight, RotateCcw, Upload } from "lucide-react";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import EmailEditor from "./email-editor";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import useProps from "@/hooks/useProps";
import { cn, colorizeButton } from "@/lib/utils";
import ScrollTop from "./scroll-top";
import { useConfirmResetStore } from "@/store/confirm-reset";
import { geist } from "@/public/fonts";
import EraserIcon from "./icons/eraser";
import CancelIcon from "./icons/cancel";
import UserRemoveIcon from "./icons/user-remove";

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
  companyId: string; // Required for fetching groups
}

interface Group {
  id: string;
  name: string;
  tag: string;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  maxRecipientsAllowed = 1000,
  companyId,
}) => {
  const {
    selectedTemplate,
    subject,
    recipients,
    setRecipients,
    setSubject,
    attachments,
    setAttachments,
    body,
    preview,
    setPreview,
    articles,
    reset,
    isPreview,
    setIsPreview,
  } = useCreateEmailStore();
  const { onOpen: openResetFieldsModal } = useConfirmResetStore();
  const { propsBuilder } = useProps();

  const [recipientInput, setRecipientInput] = useState<string>("");
  const [isProcessingCSV, setIsProcessingCSV] = useState<boolean>(false);
  const [showGroupSuggestions, setShowGroupSuggestions] =
    useState<boolean>(false);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { onOpen } = useModalStore();

  // Fetch groups for the company
  const { data: groupsData } = useQuery({
    queryKey: ["address-book-groups", companyId],
    queryFn: async () => {
      const response = await fetch(
        `/api/address-book-groups?companyId=${companyId}&limit=100`,
      );
      if (!response.ok) throw new Error("Failed to fetch groups");
      return response.json();
    },
    enabled: !!companyId,
  });

  const groups: Group[] = groupsData?.data || [];

  // Handle input change and filter groups
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipientInput(value);

    if (value.startsWith("@") && groups.length > 0) {
      const searchTerm = value.slice(1).toLowerCase();
      const filtered = groups.filter(
        (group) =>
          group.name.toLowerCase().includes(searchTerm) ||
          group.tag.toLowerCase().includes(searchTerm),
      );
      setFilteredGroups(filtered);
      setShowGroupSuggestions(filtered.length > 0);
    } else {
      setShowGroupSuggestions(false);
      setFilteredGroups([]);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowGroupSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch group recipients and add them
  const handleSelectGroup = async (groupId: string, groupName: string) => {
    try {
      const response = await fetch(
        `/api/address-book-groups/recipients?groupId=${groupId}&companyId=${companyId}`,
      );

      if (!response.ok) {
        toast.error("Failed to fetch group recipients");
        return;
      }

      const result = await response.json();
      const groupRecipients: string[] = result.data.recipients;

      if (groupRecipients.length === 0) {
        toast.warning(`Group "${groupName}" has no recipients`);
        return;
      }

      // Filter out duplicates
      const newRecipients = groupRecipients.filter(
        (email) => !recipients.includes(email),
      );

      if (newRecipients.length === 0) {
        toast.info("All recipients from this group are already added");
        return;
      }

      const combinedEmails = [...newRecipients, ...recipients];
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
        `Added ${newRecipients.length} recipient${newRecipients.length === 1 ? "" : "s"} from "${groupName}"`,
      );
      setRecipientInput("");
      setShowGroupSuggestions(false);
    } catch (error) {
      console.error("Error fetching group recipients:", error);
      toast.error("Failed to add group recipients");
    }
  };

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
        domain,
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
    newRecipients: string[],
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
      (email, index) => newRecipients.indexOf(email) !== index,
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
      if (showGroupSuggestions && filteredGroups.length > 0) {
        // Select first group suggestion
        handleSelectGroup(filteredGroups[0].id, filteredGroups[0].name);
      } else {
        handleAddRecipient();
      }
    } else if (e.key === "Escape") {
      setShowGroupSuggestions(false);
    }
  };

  const processCSVContent = (
    content: string,
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
            if (recipients.includes(email)) {
              duplicatesWithExisting.push(email);
            } else if (validEmails.includes(email)) {
              duplicatesInFile.push(email);
            } else {
              validEmails.push(email);
            }
          } else {
            errors.push(
              `Row ${index + 1}: ${email} - ${validation.errors[0].message}`,
            );
          }
        }
      });
    });

    if (errors.length > 0) {
      toast.warning(
        `Some emails were invalid:\n${errors.slice(0, 5).join("\n")}${
          errors.length > 5 ? "\n..." : ""
        }`,
      );
    }

    if (duplicatesInFile.length > 0) {
      toast.warning(
        `Duplicates found within CSV:\n${duplicatesInFile
          .slice(0, 5)
          .join("\n")}${duplicatesInFile.length > 5 ? "\n..." : ""}`,
      );
    }

    if (duplicatesWithExisting.length > 0) {
      toast.warning(
        `Emails already in recipients list:\n${duplicatesWithExisting
          .slice(0, 5)
          .join("\n")}${duplicatesWithExisting.length > 5 ? "\n..." : ""}`,
      );
    }

    return {
      validEmails,
      duplicates: [...duplicatesInFile, ...duplicatesWithExisting],
    };
  };

  const handleFileUpload = async (
    event: ChangeEvent<HTMLInputElement>,
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
          }`,
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

  const removeAllRecipients = () => {
    setRecipients([]);
  };

  const sendEmailConfirmation = (): void => {
    onOpen();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  useEffect(() => {
    setAttachments([]);
  }, []); // Remove setAttachments from dependency array

  const {
    mutate,
    isPending: isGeneratingPreview,
    isError: isGeneratingPreviewError,
    error: generatingPreviewError,
  } = useMutation({
    mutationKey: ["generate-template"],
    mutationFn: () => {
      return generateTemplate({
        body,
        templateId: selectedTemplate!.id,
        ...propsBuilder(),
      });
    },
    onSuccess: ({ data: { html } }) => {
      setPreview(html);
    },
  });

  function generatePreview() {
    setIsPreview(!isPreview);

    window.scroll(0, 0);
    if (!isPreview) {
      mutate();
    }
  }

  if (!selectedTemplate) return null;

  return (
    <div className="flex p-4 flex-col  gap-6 self-stretch rounded-2xl bg-white/[.08] h-full grow w-full">
      <div className="flex flex-col grow justify-center items-start gap-4 self-stretch h-full">
        <div className="flex flex-col items-start justify-start gap-4 self-stretch">
          <div className="flex flex-col 2xl:flex-row items-center  gap-2 self-stretch">
            <p className="ty-descriptions text-white/[.32] 2xl:w-[100px] leading-[120%]">
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
            <div className="flex flex-col 2xl:flex-row items-center gap-2 self-stretch">
              <p className="ty-descriptions text-white/[.32]  2xl:w-[100px]">
                Recipients
              </p>
              <div className="flex flex-col 2xl:flex-row gap-2 w-full items-center relative">
                <div className="relative w-full flex-1">
                  <Input
                    value={recipientInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter email or type @ to search groups"
                    className="bg-white/[.08] w-full ty-descriptions placeholder:ty-descriptions placeholder:text-white/[.32] p-3"
                  />

                  {/* Group Suggestions Dropdown */}
                  {showGroupSuggestions && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-50 w-full mt-1 bg-[#26282A] border border-white/[.16] rounded-lg max-h-60 overflow-y-auto"
                    >
                      {filteredGroups.map((group) => (
                        <button
                          key={group.id}
                          onClick={() =>
                            handleSelectGroup(group.id, group.name)
                          }
                          className="w-full text-left px-4 py-3 hover:bg-white/[.08] transition-colors duration-200 border-b border-white/[.08] last:border-b-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-gold_v2-100 font-semibold">
                              @{group.tag}
                            </span>
                            <span className="text-white/[.8]">-</span>
                            <span className="text-white/[.64]">
                              {group.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  disabled={
                    !recipientInput ||
                    recipientInput.startsWith("@") ||
                    !validateEmail(recipientInput).isValid
                  }
                  onClick={handleAddRecipient}
                  className={cn(
                    geist.className,
                    "bg-gold_v2-100 text-black_v2-100 w-full 2xl:w-fit flex items-center gap-2",
                  )}
                >
                  + Add
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
                  className="text-gold_v2-100 flex items-center gap-2 w-full 2xl:w-fit rounded-lg border border-gold_v2-16 bg-gold_v2-4 hover:bg-gold_v2-100 hover:text-black_v2-100 ease-out duration-300"
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
                      className="flex items-center gap-1 bg-white/[.08] px-2 py-1 rounded-full"
                    >
                      <span className="text-white-100 ty-subtext">{email}</span>
                      <button
                        onClick={() => removeRecipient(index)}
                        className="text-white_v2-50 hover:text-white_v2-100 text-[10.24px] ease-out duration-300"
                        aria-label={`Remove ${email}`}
                      >
                        <CancelIcon />
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

                  <button
                    onClick={() => removeAllRecipients()}
                    className={cn(
                      geist.className,
                      "rounded-full border border-[#DA000080] text-[#DA0000] ease-out duration-300 ty-subtext flex items-center gap-1 py-1 px-2 hover:bg-[#DA0000] hover:text-white_v2-100",
                    )}
                  >
                    <UserRemoveIcon /> Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {selectedTemplate.company.name === "Skyshare Labs" && (
          <div className="flex gap-4 items-center self-stretch">
            <p className="ty-descriptions text-white/[.32] self-stretch 2xl:w-[100px]">
              Add Attachments
            </p>

            <div className="mt-1 flex items-center">
              <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                Add File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-white/[.08] p-2 rounded gap-2"
                  >
                    <p className="text-sm text-white">{file.name}</p>
                    <button
                      className="text-red-500 text-xs"
                      onClick={() =>
                        setAttachments(
                          attachments.filter((_, i) => i !== index),
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4 items-center w-full">
          <p className="ty-descriptions text-white/[.32] flex-1">
            Email Content
          </p>
          <div className="flex items-center gap-2">
            <Button
              title="Scroll to Bottom"
              onClick={() => {
                window.scrollTo(0, document.body.scrollHeight);
              }}
              className={cn(
                geist.className,
                "w-full lg:w-fit z-50 p-0 rounded-none border-b border-b-white_v2-100 flex items-center gap-1 bg-transparent text-white_v2-100 opacity-60 hover:opacity-100 hover:bg-transparent duration-300 ease-out ty-descriptions",
              )}
            >
              <ArrowDown color="white" size={12} />
              Scroll to bottom
            </Button>
            <Button
              title="Reset Fields"
              onClick={() => {
                openResetFieldsModal();
              }}
              className={cn(
                geist.className,
                "w-full lg:w-fit p-0 z-50 rounded-none border-b border-b-white_v2-100 bg-transparent text-white_v2-100 opacity-60 hover:opacity-100 hover:bg-transparent duration-300 ease-out ty-descriptions",
              )}
            >
              <EraserIcon />
              Clear
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full grow bg-white/[.04] rounded-2xl border border-dashed border-gold overflow-hidden h-full">
          <EmailEditor
            isPreview={isPreview}
            isGeneratingPreview={isGeneratingPreview}
            isErrorGeneratingPreview={isGeneratingPreviewError}
            error={generatingPreviewError}
          />
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap  justify-end items-center gap-2 self-stretch">
        <Button
          onClick={() => {
            generatePreview();
          }}
          variant={"ghost"}
          className="bg-gold_v2-4 border border-gold_v2-100 w-full lg:w-fit ease-out duration-300 hover:bg-gold_v2-100 text-gold_v2-100 hover:text-black_v2-100"
        >
          <p className="">{isPreview ? "Hide" : "Show"} Preview</p>
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

      <ScrollTop />
    </div>
  );
};

export default TemplateRenderer;
