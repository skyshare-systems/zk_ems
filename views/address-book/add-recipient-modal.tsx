import { Input } from "@/components/ui/input";
import CancelIcon from "@/components/icons/cancel";
import DoneIcon from "@/components/icons/done";
import { createAddressBookRecipient } from "@/lib/mutation/address-book/recipient/address-book-recipient";
import { cn } from "@/lib/utils";
import { geist, inter } from "@/public/fonts";
import { addRecipientSchema } from "@/schema/address-book-recipient";
import { useCompanyStore } from "@/store/company";
import { useModalAddRecipient } from "@/store/modal-add-recipient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/modals/image-uploader-no-context";
import Image from "next/image";
import { getAddressBookGroup } from "@/lib/query/address-book-groups";
import { MultiSelect } from "@/components/multi-select";
import { useState, useRef, ChangeEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const AddRecipientModal = () => {
  const { isOpen, onOpen, onClose } = useModalAddRecipient((store) => store);
  const { company } = useCompanyStore();

  // Ensure hooks are always called regardless of isOpen value
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createAddressBookRecipient,
    mutationKey: ["address-book-recipient"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address-book-recipients", company?.id],
      });
      form.reset();
      onClose();
      toast.success("Fields have been reset to default values.", {
        duration: 1000,
      });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`, { duration: 2000 });
    },
  });

  const { data: groups } = useQuery({
    queryKey: ["groups"],
    queryFn: () =>
      getAddressBookGroup({
        params: `companyId=${company?.id}`,
      }),
  });

  const form = useForm<z.infer<typeof addRecipientSchema>>({
    resolver: zodResolver(addRecipientSchema),
    defaultValues: {
      name: "",
      email: "",
      photoUrl: "",
      groupIds: [],
    },
  });

  const [selectedValues, setSelectedValues] = useState<string[]>([]); // Track selected values in MultiSelect
  const [groupBadges, setGroupBadges] = useState<string[]>([]); // Track added group IDs for badges
  const [isProcessingCSV, setIsProcessingCSV] = useState(false);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (url: string) => {
    form.setValue("photoUrl", url); // Update the photoUrl in the form state
  };

  const handleGroupChange = (selectedIds: string[]) => {
    setSelectedValues(selectedIds); // Update the selected values for MultiSelect
  };

  const handleAddGroups = () => {
    if (selectedValues.length > 0) {
      form.setValue("groupIds", [
        ...form.getValues("groupIds"),
        ...selectedValues,
      ]);
      setGroupBadges((prev) => [...prev, ...selectedValues]); // Add to badges list
      setSelectedValues([]); // Reset MultiSelect selection after adding
    }
  };

  const handleRemoveGroup = (groupId: string) => {
    const updatedGroupIds = form
      .getValues("groupIds")
      .filter((id: string) => id !== groupId);
    form.setValue("groupIds", updatedGroupIds);
    setGroupBadges((prev) => prev.filter((id) => id !== groupId)); // Remove from badges
  };

  // Filter out selected groups from the MultiSelect options
  const filteredOptions =
    groups?.data.filter((group) => !groupBadges.includes(group.id)) || [];

  // CSV import handlers
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const processCSVContent = (content: string): { emailAddress: string; name?: string; photoUrl?: string; groups?: string[] }[] => {
    const rows = content.split(/[\r\n]+/);
    const recipients: { emailAddress: string; name?: string; photoUrl?: string; groups?: string[] }[] = [];
    const seenEmails = new Set<string>();

    // Check if first row is a header
    let startIndex = 0;
    let headerMap: Record<string, number> = {};

    if (rows.length > 0) {
      const firstRow = rows[0].replace(/^\uFEFF/, "").trim().toLowerCase();
      const firstParts = firstRow.split(",").map((p) => p.replace(/^"|"$/g, "").trim());

      // Check if first row contains header keywords
      if (firstParts.some(p => ["emailaddress", "email", "name", "photourl", "groups", "group"].includes(p))) {
        startIndex = 1;
        firstParts.forEach((header, index) => {
          headerMap[header] = index;
        });
      }
    }

    for (let i = startIndex; i < rows.length; i++) {
      const cleanRow = rows[i].replace(/^\uFEFF/, "").trim();
      if (!cleanRow) continue;

      // Handle quoted fields with commas inside
      const parts: string[] = [];
      let current = "";
      let inQuotes = false;
      for (const char of cleanRow) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          parts.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      parts.push(current.trim());

      let emailAddress: string;
      let name: string | undefined;
      let photoUrl: string | undefined;
      let groups: string[] | undefined;

      if (Object.keys(headerMap).length > 0) {
        // Use header mapping
        const emailIndex = headerMap["emailaddress"] ?? headerMap["email"] ?? 0;
        const nameIndex = headerMap["name"] ?? 1;
        const photoIndex = headerMap["photourl"];
        const groupsIndex = headerMap["groups"] ?? headerMap["group"];

        emailAddress = parts[emailIndex]?.toLowerCase() || "";
        name = parts[nameIndex] || undefined;
        photoUrl = photoIndex !== undefined ? parts[photoIndex] || undefined : undefined;

        // Groups are semicolon-separated within the field
        if (groupsIndex !== undefined && parts[groupsIndex]) {
          groups = parts[groupsIndex].split(";").map(g => g.trim()).filter(Boolean);
        }
      } else {
        // Default: first column is email, second is name
        emailAddress = parts[0]?.toLowerCase() || "";
        name = parts[1] || undefined;
      }

      if (emailAddress && validateEmail(emailAddress) && !seenEmails.has(emailAddress)) {
        seenEmails.add(emailAddress);
        recipients.push({ emailAddress, name, photoUrl, groups });
      }
    }

    return recipients;
  };

  const handleCSVUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsProcessingCSV(true);
      const file = event.target.files?.[0];

      if (!file) {
        toast.error("No file selected");
        return;
      }

      if (!file.name.endsWith(".csv")) {
        toast.error("Please upload a CSV file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size too large. Maximum size is 10MB");
        return;
      }

      const reader = new FileReader();

      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const recipients = processCSVContent(text);

        if (recipients.length === 0) {
          toast.error("No valid email addresses found in the CSV file");
          return;
        }

        toast.info(`Processing ${recipients.length} recipients...`);

        try {
          const response = await fetch("/api/address-book-recipient/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              companyId: company?.id,
              recipients,
            }),
          });

          const result = await response.json();

          if (!response.ok) {
            toast.error(result.message || "Failed to import recipients");
            return;
          }

          const { created, duplicatesSkipped, invalidSkipped } = result.data;

          queryClient.invalidateQueries({
            queryKey: ["address-book-recipients", company?.id],
          });

          toast.success(
            `Imported ${created} recipient${created !== 1 ? "s" : ""}` +
              (duplicatesSkipped > 0 ? `, ${duplicatesSkipped} duplicates skipped` : "") +
              (invalidSkipped > 0 ? `, ${invalidSkipped} invalid skipped` : "")
          );

          onClose();
        } catch (error) {
          console.error("Error importing recipients:", error);
          toast.error("Failed to import recipients");
        }
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

  const onSubmit = (values: z.infer<typeof addRecipientSchema>) => {
    mutate({
      companyId: company?.id || "",
      emailAddress: values.email,
      name: values.name,
      photoUrl: values.photoUrl,
      groupIds: values.groupIds,
    });
  };

  // Conditional rendering for the modal, but hooks are always called above.
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-black_v2-32 backdrop-blur w-full h-full z-[3]">
      <div className="flex flex-col items-start justify-start p-8 gap-4 max-w-[500px] w-full grow rounded-lg border border-white_v2-16 bg-black_v2-100">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-start w-full">
            <h3
              className={cn(inter.className, "text-white_v2-100 ty-subheading")}
            >
              Add a Recipient
            </h3>
            <button onClick={onClose}>
              <CancelIcon />
            </button>
          </div>
          <p
            className={cn(geist.className, "ty-descriptions text-white_v2-100")}
          >
            Add an individual recipient to your address book or group.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 items-center w-full"
          >
            {/* Name Input */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex items-center gap-2 w-full">
                    <h2
                      className={cn(
                        geist.className,
                        "min-w-[96px] ty-descriptions text-white_v2-32",
                      )}
                    >
                      Name
                    </h2>
                    <FormControl>
                      <Input
                        placeholder="Enter your recipient’s name here.."
                        className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Email Input */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex items-center gap-2 w-full">
                    <h2
                      className={cn(
                        geist.className,
                        "min-w-[96px] ty-descriptions text-white_v2-32",
                      )}
                    >
                      Email
                    </h2>
                    <FormControl>
                      <Input
                        placeholder="Enter your recipient’s email here.."
                        className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Photo Upload */}
            <div className="flex items-center gap-2 w-full grow">
              <div className="flex items-center gap-2 w-full grow">
                <h2
                  className={cn(
                    geist.className,
                    "min-w-[96px] ty-descriptions text-white_v2-32",
                  )}
                >
                  Photo
                </h2>
                <div className="flex flex-col gap-2 w-full bg-white rounded-lg ease-out duration-200 hover:opacity-50 min-h-[46px]">
                  <div className="flex items-center gap-2 grow">
                    <ImageUploader
                      onUploadComplete={handlePhotoUpload}
                      className="text-black grow"
                    />
                  </div>
                  {form.watch("photoUrl") && (
                    <Image
                      width={200}
                      height={200}
                      src={form.watch("photoUrl") || ""}
                      alt="Uploaded Photo"
                      className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* MultiSelect for Groups */}
            <div className="flex items-center gap-2 w-full grow">
              <h2
                className={cn(
                  geist.className,
                  "min-w-[96px] ty-descriptions text-white_v2-32",
                )}
              >
                Group
              </h2>
              <div className="flex gap-2 items-start w-full">
                <MultiSelect
                  options={filteredOptions.map((group) => ({
                    value: group.id,
                    label: group.tag,
                    style: { color: group?.color },
                  }))}
                  onValueChange={handleGroupChange}
                  value={selectedValues}
                />
                <button
                  disabled={selectedValues.length === 0}
                  onClick={handleAddGroups}
                  className={cn(
                    geist.className,
                    "bg-gold_v2-100 disabled:bg-gold_v2-50 text-black_v2-100 flex items-center gap-2 rounded-lg py-3 px-4 ty-descriptions",
                  )}
                >
                  <h1> + </h1>Add
                </button>
              </div>
            </div>

            {/* Displaying selected groups as badges */}
            <div className="flex justify-end items-center w-full">
              <div className="flex flex-wrap justify-start gap-2 mt-2 w-full max-w-[330px]">
                {groupBadges.map((groupId) => {
                  const group = groups?.data.find((g) => g.id === groupId);
                  return group ? (
                    <div
                      key={group.id}
                      className={cn(
                        geist.className,
                        "flex items-center gap-2 rounded-full bg-white_v2-4 ty-subtext py-1 px-2 cursor-pointer hover:bg-white_v2-8 ease-out duration-300",
                      )}
                      style={{
                        color: group.color,
                      }}
                    >
                      <span>{group.tag}</span>
                      <button
                        className="text-white_v2-100"
                        onClick={() => handleRemoveGroup(group.id)}
                      >
                        <CancelIcon />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  ref={csvInputRef}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => csvInputRef.current?.click()}
                  disabled={isProcessingCSV}
                  className={cn(
                    geist.className,
                    "text-gold_v2-100 flex items-center gap-2 rounded-lg border border-gold_v2-16 bg-gold_v2-4 hover:bg-gold_v2-100 hover:text-black_v2-100 ease-out duration-300 py-3 px-4 ty-descriptions",
                  )}
                >
                  <Upload size={16} />
                  {isProcessingCSV ? "Importing..." : "Import CSV"}
                </button>
              </div>
              <button
                type="submit"
                className={cn(
                  geist.className,
                  "bg-gold_v2-100 text-black_v2-100 flex items-center gap-2 rounded-lg py-3 px-4 ty-descriptions",
                )}
              >
                <DoneIcon />
                Done
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddRecipientModal;
