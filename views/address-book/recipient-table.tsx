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
// import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DotHorizontalIcon from "@/components/ui/dot-horizontal";

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
  return (
    <div className="p-6 bg-black text-white rounded-xl">
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
                <Button variant="ghost" size="icon">
                  <DotHorizontalIcon />
                  {/* <DotsHorizontalIcon className="w-5 h-5 text-white" /> */}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">
        <div>1–10 of 256</div>
        <div className="text-green-400">
          ✓ Edited the recipient successfully.
        </div>
      </div>
    </div>
  );
}
