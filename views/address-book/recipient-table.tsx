"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DotHorizontalIcon from "@/components/ui/dot-horizontal";
import { useEffect, useMemo, useState } from "react";
import EditIcon from "@/components/icons/edit-icon";
import { cn } from "@/lib/utils";
import { geist, inter } from "@/public/fonts";
import DeleteIcon from "@/components/icons/delete";
import CancelIcon from "@/components/icons/cancel";
import DoneIcon from "@/components/icons/done";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAddressBookRecipients } from "@/lib/query/address-book-recipients";
import { useCompanyStore } from "@/store/company";
import { AddressBookRecipientWithGroupAndCompany } from "@/store/address-book-recipients";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";

import {
  deleteAddressBookRecipient,
  updateAddressBookRecipient,
} from "@/lib/mutation/address-book/recipient/address-book-recipient";

import { getAddressBookGroup } from "@/lib/query/address-book-groups";
import { MultiSelect } from "@/components/multi-select";
import ImageUploader from "@/components/modals/image-uploader-no-context";
import Image from "next/image";

const editRecipientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  emailAddress: z.string().email("Invalid email address"),
  photoUrl: z.string().optional().or(z.literal("")),
  groupIds: z.array(z.string()).default([]),
});

interface RecipientTableProps {
  search: string;
  page: number;
  limit: number;
  groupFilter?: string[]; // Changed to array for multiple group filtering
}

type ActionType = "edit" | "delete" | null;

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

export default function RecipientTable({
  search,
  page,
  limit,
  groupFilter = [], // Default to empty array for multiple group filtering
}: RecipientTableProps) {
  const { company } = useCompanyStore();
  const queryClient = useQueryClient();

  const recipientsKey = useMemo(
    () => [
      "address-book-recipients",
      company?.id,
      page,
      limit,
      search,
      groupFilter,
    ],
    [company?.id, page, limit, search, groupFilter],
  );

  const {
    data: recipientsResp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: recipientsKey,
    queryFn: () =>
      getAddressBookRecipients({
        companyId: company?.id || "",
        limit,
        offset: (page - 1) * limit,
        search,
        groupIds: groupFilter, // always an array
      }),
    enabled: !!company?.id,
  });

  const { data: groupsResp } = useQuery({
    queryKey: ["address-book-groups", company?.id],
    queryFn: () =>
      getAddressBookGroup({
        params: `companyId=${company?.id}&limit=1000`,
      }),
    enabled: !!company?.id,
  });

  const recipients = recipientsResp?.data ?? [];
  const allGroups = groupsResp?.data ?? [];

  const [selectedUser, setSelectedUser] =
    useState<AddressBookRecipientWithGroupAndCompany | null>(null);
  const [actionType, setActionType] = useState<ActionType>(null);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [groupBadges, setGroupBadges] = useState<string[]>([]);

  const form = useForm<z.infer<typeof editRecipientSchema>>({
    resolver: zodResolver(editRecipientSchema),
    defaultValues: {
      name: "",
      emailAddress: "",
      photoUrl: "",
      groupIds: [],
    },
  });

  useEffect(() => {
    if (actionType === "edit" && selectedUser) {
      const initialIds = selectedUser.groups?.map((g) => g.id) ?? [];
      setGroupBadges(initialIds);
      setSelectedValues([]);
      form.reset({
        name: selectedUser.name || "",
        emailAddress: selectedUser.emailAddress || "",
        photoUrl: selectedUser.photoUrl || "",
        groupIds: initialIds,
      });
    }
  }, [actionType, selectedUser]);

  const updateMutation = useMutation({
    mutationFn: updateAddressBookRecipient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipientsKey });
      toast.success("Recipient updated successfully", { duration: 1200 });
      closeDialog();
    },
    onError: (error: any) => {
      toast.error(
        `Failed to update recipient: ${error?.message ?? "Unknown error"}`,
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddressBookRecipient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipientsKey });
      toast.success("Recipient deleted", { duration: 1200 });
      closeDialog();
    },
    onError: (error: any) => {
      toast.error(
        `Failed to delete recipient: ${error?.message ?? "Unknown error"}`,
      );
    },
  });

  const handleAction = (
    user: AddressBookRecipientWithGroupAndCompany,
    type: Exclude<ActionType, null>,
  ) => {
    setSelectedUser(user);
    setActionType(type);
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setActionType(null);
    setSelectedValues([]);
    setGroupBadges([]);
    form.reset();
  };

  const handleGroupChange = (ids: string[]) => {
    setSelectedValues(ids);
  };

  const handleAddGroups = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (selectedValues.length === 0) return;

    const merged = Array.from(new Set([...groupBadges, ...selectedValues]));
    setGroupBadges(merged);
    setSelectedValues([]);
    form.setValue("groupIds", merged, { shouldDirty: true });
  };

  const handleRemoveGroup = (groupId: string) => {
    const filtered = groupBadges.filter((id) => id !== groupId);
    setGroupBadges(filtered);
    form.setValue("groupIds", filtered, { shouldDirty: true });
  };

  const handlePhotoUpload = (url: string) => {
    form.setValue("photoUrl", url, { shouldDirty: true });
  };

  const onSubmit = (values: z.infer<typeof editRecipientSchema>) => {
    if (!selectedUser || !company?.id) return;

    updateMutation.mutate({
      recipientId: selectedUser.id,
      companyId: company.id,
      data: {
        name: values.name,
        emailAddress: values.emailAddress,
        photoUrl: values.photoUrl,
        groupIds: groupBadges,
      },
    });
  };

  const onConfirmDelete = () => {
    if (!selectedUser || !company?.id) return;
    deleteMutation.mutate({
      recipientId: selectedUser.id,
      companyId: company.id,
    });
  };

  // Get filter info for display
  const getFilterDisplayText = () => {
    if (!search && (!groupFilter || groupFilter.length === 0)) return "";

    let parts = [];
    if (search) parts.push(`"${search}"`);
    if (groupFilter && groupFilter.length > 0) {
      const groupNames = groupFilter
        .map((id) => allGroups.find((g: any) => g.id === id))
        .filter(Boolean)
        .map((g) => `@${g?.name}`)
        .join(", ");
      parts.push(`in groups: ${groupNames}`);
    }

    return parts.length > 0 ? ` for ${parts.join(" ")}` : "";
  };

  /* ------------------------------- render ------------------------------ */
  return (
    <div className="w-full p-6 text-white bg-white_v2-4 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Full Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Group/s</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-8 text-center text-white_v2-50"
              >
                Loading…
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center text-red-400">
                Failed to load recipients.
              </TableCell>
            </TableRow>
          ) : (recipients?.length ?? 0) === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-8 text-center text-white_v2-50"
              >
                No recipients found{getFilterDisplayText()}.
              </TableCell>
            </TableRow>
          ) : (
            recipients.map((user: AddressBookRecipientWithGroupAndCompany) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    {user.photoUrl ? (
                      <AvatarImage src={user.photoUrl} alt={user.name} />
                    ) : (
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>{user.name}</span>
                </TableCell>
                <TableCell>{user.emailAddress}</TableCell>
                <TableCell className="flex flex-wrap items-center gap-1">
                  {user?.groups?.map((group) => (
                    <div
                      key={group.id}
                      style={{ color: group.color }}
                      className="rounded border border-gray_v2-16 bg-gray_v2-4 px-2 py-1"
                    >
                      @{group?.tag}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <DotHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem
                        onClick={() => handleAction(user, "edit")}
                        className={cn(
                          geist.className,
                          "text-gold_v2-100 ty-descriptions cursor-pointer",
                        )}
                      >
                        <EditIcon /> Edit Recipient
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction(user, "delete")}
                        className={cn(
                          geist.className,
                          "text-red-500 ty-descriptions cursor-pointer",
                        )}
                      >
                        <DeleteIcon /> Delete Recipient
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Modal */}
      <Dialog open={!!selectedUser && !!actionType} onOpenChange={closeDialog}>
        {/* Delete Modal */}
        {actionType === "delete" ? (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle
                className={cn(inter.className, "text-white_v2-100 ty-h6")}
              >
                Delete Recipient
              </DialogTitle>
              <DialogDescription
                className={cn(
                  geist.className,
                  "ty-descriptions text-white_v2-50",
                )}
              >
                This will remove the user in the Address Book. Are you sure you
                want to proceed?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="w-full">
              <button
                onClick={closeDialog}
                disabled={deleteMutation.isPending}
                className={cn(
                  geist.className,
                  "w-full rounded-lg bg-white_v2-4 ty-descriptions py-2 px-3 flex items-center justify-center gap-2 hover:bg-white_v2-100 hover:text-black_v2-100 ease-out duration-300 disabled:opacity-50",
                )}
              >
                <CancelIcon />
                Cancel
              </button>
              <button
                onClick={onConfirmDelete}
                disabled={deleteMutation.isPending}
                className={cn(
                  geist.className,
                  "w-full rounded-lg bg-[#741B1B] ty-descriptions py-3 px-3 flex items-center justify-center gap-2 hover:text-white_v2-100 ease-out duration-300 hover:opacity-50 disabled:opacity-50",
                )}
              >
                <DeleteIcon />
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </DialogFooter>
          </DialogContent>
        ) : (
          // Edit Modal (follows your Add form UX)
          <DialogContent className="flex flex-col gap-4 max-w-[500px]">
            <DialogHeader className="flex flex-col items-start justify-start gap-2">
              <DialogTitle
                className={cn(inter.className, "text-white_v2-100 ty-h6")}
              >
                Edit Recipient
              </DialogTitle>
              <DialogDescription
                className={cn(
                  geist.className,
                  "ty-descriptions text-white_v2-50",
                )}
              >
                Edit this contact&apos;s name, email, photo or group assignment.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                {/* Name */}
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
                            placeholder="Enter your recipient's name here.."
                            className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  name="emailAddress"
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
                            placeholder="Enter your recipient's email here.."
                            className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Photo (ImageUploader + preview) */}
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
                      <div className="flex items-center gap-2 bg-white_v2-100 rounded-lg justify-center min-h-[46px]">
                        <ImageUploader onUploadComplete={handlePhotoUpload} />
                      </div>
                      {form.watch("photoUrl") && (
                        <Image
                          width={200}
                          height={200}
                          src={form.watch("photoUrl") || ""}
                          alt="Uploaded Photo"
                          className="rounded-lg border border-white_v2-8 bg-white_v2-8"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Groups (MultiSelect + Add) */}
                <FormField
                  name="groupIds"
                  control={form.control}
                  render={() => (
                    <FormItem className="w-full">
                      <div className="flex flex-col gap-2 items-end w-full">
                        <div className="flex items-center gap-2 w-full">
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
                              options={allGroups
                                .filter((g: any) => !groupBadges.includes(g.id))
                                .map((g: any) => ({
                                  value: g.id,
                                  label: g.tag,
                                  style: { color: g?.color },
                                }))}
                              onValueChange={handleGroupChange}
                              value={selectedValues}
                            />
                            <button
                              disabled={
                                selectedValues.length === 0 ||
                                updateMutation.isPending
                              }
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

                        {/* Selected group badges */}
                        <div className="flex flex-wrap gap-1 mt-2 max-w-[345px] w-full">
                          {groupBadges.map((groupId) => {
                            const group = allGroups.find(
                              (g: any) => g.id === groupId,
                            );
                            if (!group) return null;
                            return (
                              <div
                                key={group.id}
                                className={cn(
                                  geist.className,
                                  "bg-white_v2-4 py-1 px-2 rounded-full ty-descriptions flex items-center gap-1",
                                )}
                                style={{
                                  borderColor: group.color,
                                  color: group.color,
                                }}
                              >
                                <span>@{group.tag}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGroup(group.id)}
                                  className="text-white_v2-100"
                                >
                                  <CancelIcon />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Footer */}
                <div className="flex justify-end gap-2 w-full pt-2">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className={cn(
                      geist.className,
                      "w-fit rounded-lg bg-white_v2-4 ty-descriptions py-2 px-3 flex items-center justify-center gap-2 hover:bg-white_v2-100 hover:text-black_v2-100 ease-out duration-300",
                    )}
                  >
                    <CancelIcon />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className={cn(
                      geist.className,
                      "bg-gold_v2-100 text-black_v2-100 flex items-center gap-2 rounded-lg py-3 px-4 ty-descriptions disabled:opacity-50",
                    )}
                  >
                    <DoneIcon />
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </Form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
