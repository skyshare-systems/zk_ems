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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { geist, inter } from "@/public/fonts";
import EditGroup from "./edit-group";

type Recipient = {
  name: string;
  avatarUrl?: string;
};

type Group = {
  tag: string;
  name: string;
  recipients: Recipient[];
};

const groupData: Group[] = [
  {
    tag: "@members",
    name: "Members",
    recipients: [
      { name: "Alex Johnson" },
      { name: "Maria Garcia" },
      { name: "David Smith" },
      { name: "Jane Doe" },
    ],
  },
  {
    tag: "@team_leads",
    name: "Team Leads",
    recipients: [
      { name: "Emily Brown" },
      { name: "Michael Lee" },
      { name: "Sofia Patel" },
      { name: "John Doe" },
    ],
  },
];

export default function GroupTable() {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null);

  const toggleExpand = (tag: string) => {
    setExpandedGroups((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const openActionModal = (group: Group, action: "edit" | "delete") => {
    setSelectedGroup(group);
    setActionType(action);
  };

  const closeModal = () => {
    setSelectedGroup(null);
    setActionType(null);
  };

  return (
    <div className="p-6 bg-white_v2-4 text-white rounded-xl w-full">
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
          {groupData.map((group) => {
            const isExpanded = expandedGroups[group.tag];
            const visibleRecipients = isExpanded
              ? group.recipients
              : group.recipients.slice(0, 3);

            return (
              <TableRow key={group.tag}>
                <TableCell>
                  <span className="text-sm font-medium text-muted-foreground">
                    {group.tag}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-2">
                    {visibleRecipients.map((r, idx) => (
                      <div
                        key={`${group.tag}-${r.name}-${idx}`}
                        className="flex items-center gap-1 bg-muted rounded-full px-2 py-1"
                      >
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={r.avatarUrl || ""} alt={r.name} />
                          <AvatarFallback>
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
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
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
                      <Button size="icon" variant="ghost">
                        ⋮
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem
                        onClick={() => openActionModal(group, "edit")}
                        className="cursor-pointer text-yellow-400"
                      >
                        ✏️ Edit Recipient
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openActionModal(group, "delete")}
                        className="cursor-pointer text-red-500"
                      >
                        🗑️ Delete Recipient
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <p className="text-muted-foreground text-sm mt-4">1–10 of 256</p>

      {/* Modal */}
      <Dialog open={!!selectedGroup && !!actionType} onOpenChange={closeModal}>
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
                This will remove the group in the Address Book. Are you sure you
                want to proceed?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="w-full">
              <button
                onClick={closeModal}
                className={cn(
                  geist.className,
                  "w-full rounded-lg bg-white_v2-4 ty-descriptions py-2 px-3 flex items-center justify-center gap-2 hover:bg-white_v2-100 hover:text-black_v2-100 ease-out duration-300",
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
                    stroke-width="0.875"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Cancel
              </button>
              <button
                onClick={closeModal}
                className={cn(
                  geist.className,
                  "w-full rounded-lg bg-[#741B1B] ty-descriptions py-3 px-3 flex items-center justify-center gap-2 hover:text-white_v2-100 ease-out duration-300 hover:opacity-50",
                )}
              >
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
                    stroke-width="0.75"
                    stroke-linecap="round"
                  />
                  <path
                    d="M1.75 3.37126H12.25M9.36582 3.37126L8.96764 2.54977C8.7031 2.00407 8.5708 1.73123 8.34266 1.56106C8.29208 1.52331 8.23848 1.48974 8.18242 1.46066C7.92978 1.32959 7.62656 1.32959 7.02012 1.32959C6.39847 1.32959 6.08767 1.32959 5.83081 1.46616C5.77389 1.49643 5.71957 1.53136 5.66842 1.57061C5.43762 1.74766 5.3087 2.03049 5.05086 2.59616L4.69754 3.37126"
                    stroke="currentColor"
                    stroke-width="0.75"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.54163 9.78809V6.28809"
                    stroke="currentColor"
                    stroke-width="0.75"
                    stroke-linecap="round"
                  />
                  <path
                    d="M8.45837 9.78809V6.28809"
                    stroke="currentColor"
                    stroke-width="0.75"
                    stroke-linecap="round"
                  />
                </svg>
                {actionType === "delete" ? "Delete" : "Save Changes"}
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
