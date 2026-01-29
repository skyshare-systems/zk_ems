"use client";

import { useSentEmailStore } from "@/store/sent-email";
import EditIcon from "./icons/edit";
import { cn } from "@/lib/utils";
import { geist } from "@/public/fonts";
import ForwardIcon from "./icons/forward";
import { ChangeEvent, useEffect, useState, KeyboardEvent, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCreateEmailStore } from "@/store/create-email";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import UserRemoveIcon from "./icons/user-remove";
import CancelIcon from "./icons/cancel";
import { useModalStore } from "@/store/modal";
import EmailEditorSentEmail from "./email-editor-sent-email";
import { generateTemplate } from "@/lib/mutation/template/generateTemplate";
import useProps from "@/hooks/useProps";

interface Group {
  id: string;
  name: string;
  tag: string;
}

interface ValidationError {
  message: string;
  type: "error" | "warning";
}
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

const SentEmailRenderer = () => {
  const { selectedSentEmail } = useSentEmailStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(true);
  const [recipientInput, setRecipientInput] = useState<string>("");
  const [isProcessingCSV, setIsProcessingCSV] = useState<boolean>(false);
  const [showGroupSuggestions, setShowGroupSuggestions] = useState<boolean>(false);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const maxRecipientsAllowed = 1000;
  const { onOpen } = useModalStore();
  const { propsBuilder } = useProps();

  const {
    subject,
    recipients,
    setRecipients,
    setSubject,
    setMode,
    setBody,
    setSelectedTemplate,
    setArticles,
    setFromThePeople,
    setUpcomingPrograms,
    setProducts,
    setServices,
    setPosts,
    setPrograms,
    setCta,
    setSectionOrder,
    setPreview,
    body,
  } = useCreateEmailStore();

  // Get company ID from selected sent email
  const companyId = selectedSentEmail?.companyId || selectedSentEmail?.template?.companyId || "";

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

  // Preview generation mutation
  const {
    mutate: generatePreview,
    isPending: isGeneratingPreview,
    isError: isGeneratingPreviewError,
    error: generatingPreviewError,
  } = useMutation({
    mutationKey: ["generate-template-sent-email"],
    mutationFn: () => {
      return generateTemplate({
        body,
        templateId: selectedSentEmail?.templateId ?? "",
        ...propsBuilder(),
      });
    },
    onSuccess: ({ data: { html } }) => {
      setPreview(html);
    },
  });

  function toggleEditMode() {
    const newEditMode = !isEditMode;
    setIsEditMode(newEditMode);

    if (newEditMode && selectedSentEmail) {
      // Populate store with sent email data when entering edit mode
      const formData = selectedSentEmail.formData as any;

      // Set body from formData (rawBody) or fallback
      setBody(formData?.rawBody || "");
      setSubject(selectedSentEmail.subject || "");

      // Set the template from sent email
      if (selectedSentEmail.template) {
        setSelectedTemplate(selectedSentEmail.template as any);
      }

      // Populate section data from formData
      if (formData) {
        setArticles(formData.articles || []);
        setFromThePeople(formData.fromThePeople || []);
        setUpcomingPrograms(formData.upcomingPrograms || []);
        setProducts(formData.products || []);
        setServices(formData.services || []);
        setPosts(formData.posts || []);
        setPrograms(formData.programs || []);
        setCta(formData.cta || { link: "", text: "" });
        if (formData.sectionOrder?.length > 0) {
          setSectionOrder(formData.sectionOrder);
        }
      }

      // Start in preview mode
      setIsPreviewMode(true);
    } else {
      // Reset when exiting edit mode
      setIsPreviewMode(true);
    }

    window.scroll(0, 0);
  }

  function togglePreviewMode() {
    const newPreviewMode = !isPreviewMode;
    setIsPreviewMode(newPreviewMode);

    // Generate preview when switching to preview mode
    if (newPreviewMode) {
      generatePreview();
    }

    window.scroll(0, 0);
  }

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

    const newRecipients = [...recipients, trimmedEmail];
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
    if (recipients.length === 0) {
      toast.error("Please add at least one recipient before forwarding");
      if (!isEditMode) {
        setIsEditMode(true);
      }
      return;
    }
    setMode("forward");
    onOpen();
  };

  useEffect(() => {
    setSubject(selectedSentEmail?.subject ?? "");
  }, [selectedSentEmail?.subject, setSubject]);

  if (!selectedSentEmail) return null;

  return (
    <div className="flex p-4 flex-col  gap-6 self-stretch rounded-2xl bg-white/[.08] h-full grow w-full">
      <div className="flex flex-col grow justify-center items-start gap-4 self-stretch h-full">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex items-center gap-2 self-stretch ">
            <p className="ty-descriptions text-white/[.32] w-[96px]">Subject</p>
            {!isEditMode ? (
              <p className="ty-title text-white">
                {selectedSentEmail?.subject}
              </p>
            ) : (
              <Input
                value={subject}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSubject(e.target.value)
                }
                placeholder="Something captivating..."
                className="bg-white/[.08] w-full placeholder:ty-descriptions placeholder:text-white/[.32] p-3"
              />
            )}
          </div>

          {!isEditMode ? (
            <div className="flex items-center gap-2 self-stretch flex-wrap ">
              <p className="ty-descriptions text-white/[.32] w-[96px]">
                Recipients
              </p>

              {selectedSentEmail?.recipients.slice(0, 5).map((recipient) => (
                <div
                  className="px-2 py-1 flex justify-normal items-center gap-2 rounded-full bg-white/[.04]"
                  key={recipient.id}
                >
                  <p className="ty-subtext text-white/[.72]">
                    {recipient.emailAddress}
                  </p>
                </div>
              ))}

              {selectedSentEmail?.recipients.length === 0 && (
                <p className="ty-subtext text-white/[.72]">No recipients</p>
              )}

              {selectedSentEmail &&
                selectedSentEmail?.recipients.length > 5 && (
                  <div className="px-2 py-1 flex justify-normal items-center gap-2 rounded-full bg-white/[.04]">
                    <p className="ty-subtext text-white/[.72]">
                      +{selectedSentEmail?.recipients.length - 5} more
                    </p>
                  </div>
                )}
            </div>
          ) : (
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
                    {recipients.slice(0, 5).map((email, index) => {
                      return (
                        <div
                          key={`recipient-${email}-${index}`}
                          className="flex items-center gap-1 bg-white/[.08] px-2 py-1 rounded-full"
                        >
                          <span className="text-white-100 ty-subtext">
                            {email}
                          </span>
                          <button
                            onClick={() => removeRecipient(index)}
                            className={cn(
                              "text-[10.24px] ease-out duration-300 text-white_v2-50 hover:text-white_v2-100",
                            )}
                            aria-label={`Remove ${email}`}
                          >
                            <CancelIcon />
                          </button>
                        </div>
                      );
                    })}

                    {recipients.length > 5 && (
                      <div className="flex items-center gap-2 bg-white/[.08] px-2 py-1 rounded">
                        <span className="text-white/[.8] text-[10.24px]">
                          +{recipients.length - 5} more
                        </span>
                      </div>
                    )}

                    <button
                      onClick={removeAllRecipients}
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
          )}
        </div>

        <div className="flex flex-col w-full grow bg-white/[.04] rounded-2xl border border-dashed border-gold overflow-hidden h-full">
          <EmailEditorSentEmail
            isPreview={!isEditMode || isPreviewMode}
            isGeneratingPreview={isGeneratingPreview}
            isErrorGeneratingPreview={isGeneratingPreviewError}
            error={generatingPreviewError}
          />
        </div>

        <div className="flex justify-end items-center gap-3 w-full">
          <button
            onClick={toggleEditMode}
            className={cn(
              geist.className,
              "flex items-center gap-2 py-2 px-3 ty-descriptions text-white_v2-100 bg-white_v2-4 rounded ease-out duration-300 hover:bg-white_v2-100 hover:text-black_v2-100",
            )}
          >
            {!isEditMode ? "Edit" : "Back"}
            <EditIcon />
          </button>

          {isEditMode && (
            <button
              onClick={togglePreviewMode}
              disabled={isGeneratingPreview}
              className={cn(
                geist.className,
                "flex items-center gap-2 py-2 px-3 ty-descriptions rounded ease-out duration-300",
                isPreviewMode
                  ? "text-white_v2-100 bg-white_v2-4 hover:bg-white_v2-100 hover:text-black_v2-100"
                  : "text-black_v2-100 bg-white_v2-100",
              )}
            >
              {isGeneratingPreview ? "Generating..." : isPreviewMode ? "Edit" : "Preview"}
            </button>
          )}

          <button
            onClick={sendEmailConfirmation}
            disabled={!isEditMode && recipients.length === 0}
            className={cn(
              geist.className,
              "flex items-center gap-2 py-2 px-3 ty-descriptions text-gold_v2-100 bg-gold_v2-4 rounded ease-out duration-300 hover:bg-gold_v2-100 hover:text-black_v2-100",
              !isEditMode && recipients.length === 0 && "opacity-50 cursor-not-allowed",
            )}
          >
            Forward
            <ForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentEmailRenderer;
