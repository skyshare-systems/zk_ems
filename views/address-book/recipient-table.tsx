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
import EditIcon from "@/components/icons/edit-icon";
import { cn } from "@/lib/utils";
import { geist, inter } from "@/public/fonts";
import DeleteIcon from "@/components/icons/delete";
import CancelIcon from "@/components/icons/cancel";
import DoneIcon from "@/components/icons/done";
import AddPhoto from "./add-photo";
import { Input } from "@/components/ui/input";

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
    <div className="p-6 bg-white_v2-4 text-white rounded-xl w-full">
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
          ))}
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
                onClick={closeDialog}
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
          // Edit Modal
          <DialogContent className="flex flex-col gap-4 max-w-[500px]">
            <DialogHeader className="flex flex-col gap-2 items-start justify-start">
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
                Edit this contact’s name, email, photo or group assignment.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-2 w-full">
              <h2
                className={cn(
                  geist.className,
                  "min-w-[96px] ty-descriptions text-white_v2-32",
                )}
              >
                Name
              </h2>

              <Input
                placeholder="Enter your recipient’s name here.."
                className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
              />
            </div>

            <div className="flex items-center gap-2 w-full">
              <h2
                className={cn(
                  geist.className,
                  "min-w-[96px] ty-descriptions text-white_v2-32",
                )}
              >
                Email
              </h2>

              <Input
                placeholder="Enter your recipient’s email here.."
                className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
              />
            </div>

            <AddPhoto />

            <div className="flex items-center gap-2 w-full grow">
              <h2
                className={cn(
                  geist.className,
                  "min-w-[96px] ty-descriptions text-white_v2-32",
                )}
              >
                Group
              </h2>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add to one or more existing groups"
                    className="rounded-lg border border-white_v2-8 bg-white_v2-8 placeholder:text-white_v2-32 text-white_v2-100 grow p-3"
                  />
                  <button
                    //   onClick={handleAddRecipient}
                    className={cn(
                      geist.className,
                      "bg-gold_v2-100 text-black_v2-100 flex items-center gap-2 rounded-lg py-2 px-4 self-stretch ty-descriptions",
                    )}
                  >
                    <h1> + </h1>Add
                  </button>
                </div>
              </div>
            </div>

            <DialogFooter className="w-full">
              <button
                onClick={closeDialog}
                className={cn(
                  geist.className,
                  "bg-gold_v2-100 text-black_v2-100 flex items-center gap-2 rounded-lg py-3 px-4 ty-descriptions",
                )}
              >
                <DoneIcon />
                Done
              </button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
