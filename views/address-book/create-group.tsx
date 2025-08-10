"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { geist } from "@/public/fonts";
import { cn } from "@/lib/utils";
import AddRecipientModal from "./add-recipient-modal";
import { useModalAddRecipient } from "@/store/modal-add-recipient";
import { useAddressBook } from "@/store/address-book-tab";

const CreateGroup = () => {
  // const { isOpen, onOpen, onClose } = useModalAddRecipient((store) => store);
  const { tab, setTab } = useAddressBook((state) => state);

  if (tab !== "groups") return null;

  return (
    <>
      <button
        className={cn(
          geist.className,
          "bg-gold_v2-100 text-black_v2-100 w-full 2xl:w-fit flex items-center gap-2 py-3 px-4 rounded-lg hover:opacity-50 ease-out duration-300",
        )}
      >
        Create a group
      </button>

      {/* <AddRecipientModal /> */}
    </>
  );
};

export default CreateGroup;
