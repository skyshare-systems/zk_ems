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
import { useState } from "react";

const users = [
  {
    name: "Skyshare Labs Edit 2",
    email: "newemail@labs.com",
    groups: ["members", "admins", "stakeholders"],
    avatar: "/avatar/skyshare.png",
  },
  {
    name: "Liam Sullivan",
    email: "liam02@cloudventures.com",
    groups: ["members", "team", "crew", "squad"],
  },
  {
    name: "Ethan Hernandez",
    email: "ethan123@techinnovators.com",
    groups: ["members", "team", "crew", "squad"],
  },
  {
    name: "Noah Garcia",
    email: "noahgarcia@futuretech.com",
    groups: ["members"],
  },
  {
    name: "Oliver Martinez",
    email: "oliver121@nextgenapps.com",
    groups: ["members", "team", "crew", "squad"],
  },
  {
    name: "Lucas Lopez",
    email: "lucas44@creativesolutions.com",
    groups: ["members", "team", "crew", "squad"],
  },
  {
    name: "Mason Gonzalez",
    email: "mason1111@digitaldreams.com",
    groups: ["members", "team", "crew", "squad"],
  },
  {
    name: "Aiden Wilson",
    email: "aiden23@innovatech.com",
    groups: ["members", "team"],
  },
  {
    name: "James Anderson",
    email: "jamesanderson@smartapps.com",
    groups: ["members"],
  },
  {
    name: "Elijah Thomas",
    email: "elijah_thomas@techpioneers.com",
    groups: ["members", "team", "crew", "squad"],
  },
];

const groupColors: Record<string, string> = {
  members: "bg-yellow-700",
  team: "bg-gray-700",
  crew: "bg-gray-700",
  squad: "bg-gray-700",
  admins: "bg-blue-700",
  stakeholders: "bg-sky-600",
};

export default function UserTable() {
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null,
  );
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null);

  const handleAction = (user: (typeof users)[0], type: "edit" | "delete") => {
    setSelectedUser(user);
    setActionType(type);
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setActionType(null);
  };

  return (
    <div className="p-6 bg-white-4 text-white rounded-xl w-full">
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
          {users.map((user, i) => (
            <TableRow key={i}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
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
              <TableCell>{user.email}</TableCell>
              <TableCell className="space-x-1">
                {user.groups.map((g, idx) => (
                  <Badge
                    key={idx}
                    className={`text-white ${groupColors[g] || "bg-gray-700"}`}
                  >
                    @{g}
                  </Badge>
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
                      className="text-yellow-400 cursor-pointer"
                    >
                      ✏️ Edit Recipient
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction(user, "delete")}
                      className="text-red-500 cursor-pointer"
                    >
                      🗑️ Delete Recipient
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <Dialog open={!!selectedUser && !!actionType} onOpenChange={closeDialog}>
        {actionType === "delete" ? (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Recipient</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete ${selectedUser?.name}?
              </DialogDescription>
            </DialogHeader>

            <div className="py-2">
              <p className="text-red-500">
                This action is irreversible. Please confirm.
              </p>
            </div>

            <DialogFooter>
              <Button variant="secondary" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                variant={actionType === "delete" ? "destructive" : "default"}
                onClick={closeDialog}
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
