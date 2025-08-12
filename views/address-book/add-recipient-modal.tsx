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
import AddPhoto from "./add-photo";
import ImageUploader from "@/components/modals/image-uploader-no-context";
import Image from "next/image";
import { getAddressBookGroup } from "@/lib/query/address-book-groups";
import { MultiSelect } from "@/components/multi-select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <ImageUploader onUploadComplete={handlePhotoUpload} />
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
              <div className="flex gap-2 w-full">
                <MultiSelect
                  options={filteredOptions.map((group) => ({
                    value: group.id,
                    label: group.name,
                  }))}
                  onValueChange={handleGroupChange}
                  value={selectedValues}
                />
                <button
                  disabled={selectedValues.length === 0}
                  onClick={handleAddGroups}
                  className={cn(
                    geist.className,
                    "bg-gold_v2-100 disabled:bg-gold_v2-50 text-black_v2-100 flex items-center gap-2 rounded-lg py-2 px-4 self-stretch ty-descriptions",
                  )}
                >
                  <h1> + </h1>Add
                </button>
              </div>
            </div>

            {/* Displaying selected groups as badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {groupBadges.map((groupId) => {
                const group = groups?.data.find((g) => g.id === groupId);
                return group ? (
                  <Badge
                    key={group.id}
                    className="flex items-center gap-2 bg-transparent px-3 py-1 rounded-full border"
                    style={{ borderColor: group.color, color: group.color }}
                  >
                    <span>{group.name}</span>
                    <button
                      className="text-white_v2-100"
                      onClick={() => handleRemoveGroup(group.id)}
                    >
                      x
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end w-full">
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
