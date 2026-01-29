"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { geist, inter } from "@/public/fonts";
import EditGroup from "./edit-group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAddressBookGroup } from "@/lib/query/address-book-groups";
import { useCompanyStore } from "@/store/company";
import {
  AddressBookGroupWithRecipients,
  useAddressBookGroupStore,
} from "@/store/address-book-groups";
import { deleteAddressBookGroup } from "@/lib/mutation/address-book-group/address-book-group";
import { toast } from "sonner"; // assuming you're using sonner for toasts

interface GroupTableProps {
  search: string;
  page: number;
  limit: number;
  onPageChange?: (page: number) => void;
  onMetaChange?: (meta: { totalPage: number; total: number }) => void;
}

export default function GroupTable({ search, page, limit, onPageChange, onMetaChange }: GroupTableProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );
  const { company } = useCompanyStore();
  const queryClient = useQueryClient();

  const { group, setGroup } = useAddressBookGroupStore();

  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null);

  const toggleExpand = (tag: string) => {
    setExpandedGroups((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const openActionModal = (
    group: AddressBookGroupWithRecipients,
    action: "edit" | "delete",
  ) => {
    setGroup(group);
    setActionType(action);
  };

  const closeModal = () => {
    setGroup(null);
    setActionType(null);
  };

  const { data: groups } = useQuery({
    queryFn: () =>
      getAddressBookGroup({
        params:
          `companyId=${company?.id}` +
          (search ? `&search=${search}` : "") +
          `&page=${page}&limit=${limit}`,
      }),
    queryKey: ["address-book-groups", company?.id, search, page, limit],
    enabled: !!company?.id,
  });

  const meta = groups?.meta;

  // Notify parent of meta changes for pagination
  useEffect(() => {
    if (meta && onMetaChange) {
      onMetaChange({
        totalPage: meta.totalPage || 1,
        total: 0,
      });
    }
  }, [meta, onMetaChange]);

  // Delete mutation
  const { mutate: deleteGroup, isPending: isDeleting } = useMutation({
    mutationFn: (groupId: string) => deleteAddressBookGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address-book-groups", company?.id],
      });
      toast.success("Group deleted successfully");
      closeModal();
    },
    onError: (error) => {
      toast.error(`Failed to delete group: ${error}`);
    },
  });

  const handleDelete = () => {
    if (group?.id) {
      deleteGroup(group.id);
    }
  };

  const groupsData = groups?.data || [];

  return (
    <div className="w-full rounded-md border">
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Group Tag</TableHead>
              <TableHead>Group Name</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupsData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No groups found.
                </TableCell>
              </TableRow>
            ) : (
              groupsData.map((group) => {
                const isExpanded = expandedGroups[group.tag];
                const visibleRecipients = isExpanded
                  ? group.recipients
                  : group.recipients.slice(0, 3);

                return (
                  <TableRow key={group.tag}>
                    <TableCell className="font-medium">
                      <span style={{ color: group.color }}>@{group.tag}</span>
                    </TableCell>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-2">
                        {visibleRecipients.map((r, idx) => (
                          <div
                            key={`${group.tag}-${r.name}-${idx}`}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted border"
                          >
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={r.photoUrl || ""} alt={r.name} />
                              <AvatarFallback className="text-[10px]">
                                {r.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{r.name}</span>
                          </div>
                        ))}
                        {group.recipients.length > 3 && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs rounded-full"
                            onClick={() => toggleExpand(group.tag)}
                          >
                            {isExpanded
                              ? "View less"
                              : `+${group.recipients.length - 3} more`}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="5" r="2"/>
                              <circle cx="12" cy="12" r="2"/>
                              <circle cx="12" cy="19" r="2"/>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            onClick={() => openActionModal(group, "edit")}
                            className="text-gold_v2-100 cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit Group
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openActionModal(group, "delete")}
                            className="text-red-500 cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                              <path d="M3 6h18"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Delete Group
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

      {/* Modal */}
      <Dialog open={!!group && !!actionType} onOpenChange={closeModal}>
        {/* Delete Modal */}
        {actionType === "delete" ? (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle
                className={cn(inter.className, "text-white_v2-100 ty-h6")}
              >
                Delete Group
              </DialogTitle>
              <DialogDescription
                className={cn(
                  geist.className,
                  "ty-descriptions text-white_v2-50",
                )}
              >
                This will permanently remove the group "{group?.name}" and all
                its associated data from the Address Book. This action cannot be
                undone. Are you sure you want to proceed?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="w-full">
              <button
                onClick={closeModal}
                disabled={isDeleting}
                className={cn(
                  geist.className,
                  "w-full rounded-lg bg-white_v2-4 ty-descriptions py-2 px-3 flex items-center justify-center gap-2 hover:bg-white_v2-100 hover:text-black_v2-100 ease-out duration-300 disabled:opacity-50",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M11.5833 3.07959L3.41663 11.2463M3.41663 3.07959L11.5833 11.2463"
                    stroke="currentColor"
                    strokeWidth="0.875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={cn(
                  geist.className,
                  "w-full rounded-lg bg-[#741B1B] ty-descriptions py-3 px-3 flex items-center justify-center gap-2 hover:text-white_v2-100 ease-out duration-300 hover:opacity-50 disabled:opacity-50",
                )}
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <path
                      d="M11.375 3.37158L11.0135 9.21956C10.9211 10.7136 10.875 11.4607 10.5005 11.9979C10.3153 12.2634 10.0769 12.4875 9.80041 12.6559C9.24122 12.9966 8.49275 12.9966 6.99574 12.9966C5.49682 12.9966 4.74734 12.9966 4.18778 12.6553C3.91113 12.4866 3.67267 12.262 3.48756 11.996C3.11318 11.4581 3.06801 10.71 2.97769 9.21378L2.625 3.37158"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1.75 3.37126H12.25M9.36582 3.37126L8.96764 2.54977C8.7031 2.00407 8.5708 1.73123 8.34266 1.56106C8.29208 1.52331 8.23848 1.48974 8.18242 1.46066C7.92978 1.32959 7.62656 1.32959 7.02012 1.32959C6.39847 1.32959 6.08767 1.32959 5.83081 1.46616C5.77389 1.49643 5.71957 1.53136 5.66842 1.57061C5.43762 1.74766 5.3087 2.03049 5.05086 2.59616L4.69754 3.37126"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5.54163 9.78809V6.28809"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8.45837 9.78809V6.28809"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <EditGroup onClose={closeModal} actionType={actionType} />
        )}
      </Dialog>
    </div>
  );
}
