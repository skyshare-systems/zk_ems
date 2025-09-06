"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { geist } from "@/public/fonts";
import { cn } from "@/lib/utils";
import AddRecipientModal from "./add-recipient-modal";
import { useModalAddRecipient } from "@/store/modal-add-recipient";
import { useAddressBook } from "@/store/address-book-tab";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChevronDownIcon from "@/components/icons/chevron-down";
import { getAddressBookGroup } from "@/lib/query/address-book-groups";
import { useCompanyStore } from "@/store/company";

const AddRecipient = () => {
  const { isOpen, onOpen, onClose } = useModalAddRecipient((store) => store);
  const { tab } = useAddressBook((state) => state);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const { company } = useCompanyStore();

  const groups = [
    { label: "@admins", color: "text-teal-400" },
    { label: "@crew", color: "text-white" },
    { label: "@developers", color: "text-pink-600" },
    { label: "@designers", color: "text-orange-500" },
    { label: "@members", color: "text-yellow-400" },
    { label: "@stakeholders", color: "text-sky-500" },
    { label: "@team", color: "text-white" },
    { label: "@team_leads", color: "text-amber-600" },
    { label: "@squad", color: "text-white" },
    { label: "@testers", color: "text-purple-600" },
  ];

  const { data: groupsMoto } = useQuery({
    queryKey: ["groups"],
    queryFn: () =>
      getAddressBookGroup({
        params: `companyId=${company?.id}`,
      }),
  });

  console.log(groupsMoto?.data);

  const toggleGroup = (group: string) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
    );
  };

  if (tab !== "recipients") return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="whitespace-nowrap rounded-lg border border-white_v2-16 bg-white_v2-4 hover:bg-white_v2-50 py-3 px-4 text-white_v2-100  flex items-center gap-2 ease-out duration-300">
            All Groups
            <ChevronDownIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black border border-gray-700 p-2 space-y-1">
          {groupsMoto?.data.map(({ name, color }) => (
            <DropdownMenuCheckboxItem
              key={name}
              checked={selectedGroups.includes(name)}
              onCheckedChange={() => toggleGroup(name)}
              style={{
                color: color,
              }}
              className={`flex items-center gap-2 ty-descriptions`}
            >
              {name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        onClick={onOpen}
        className={cn(
          geist.className,
          "bg-gold_v2-100 text-black_v2-100 w-full 2xl:w-fit flex items-center gap-2 py-3 px-4 rounded-lg hover:opacity-50 ease-out duration-300",
        )}
      >
        Add a Recipient
      </button>
      <AddRecipientModal />
    </>
  );
};

export default AddRecipient;
