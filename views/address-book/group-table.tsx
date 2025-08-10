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

      {/* Dialog Modal */}
      <Dialog open={!!selectedGroup && !!actionType} onOpenChange={closeModal}>
        {actionType === "delete" ? (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Recipient</DialogTitle>
              <DialogDescription>
                `Are you sure you want to delete all recipients from group $
                {selectedGroup?.name}? This action cannot be undone.`
              </DialogDescription>
            </DialogHeader>

            <div className="py-2">
              <p className="text-red-500">
                Deleting this group will remove all associated recipients.
              </p>
            </div>

            <DialogFooter>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant={actionType === "delete" ? "destructive" : "default"}
                onClick={closeModal}
              >
                {actionType === "delete" ? "Delete" : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          ""
        )}
      </Dialog>
    </div>
  );
}
