"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { geist } from "@/public/fonts";
import { cn } from "@/lib/utils";
import AddRecipientModal from "./add-recipient-modal";
import { useModalAddRecipient } from "@/store/modal-add-recipient";
import { useAddressBook } from "@/store/address-book-tab";

const AddRecipient = () => {
  const { isOpen, onOpen, onClose } = useModalAddRecipient((store) => store);
  const { tab } = useAddressBook((state) => state);

  if (tab !== "recipients") return null;

  return (
    <>
      <Button
        onClick={onOpen}
        className={cn(
          geist.className,
          "bg-gold_v2-100 text-black_v2-100 w-full 2xl:w-fit flex items-center gap-2",
        )}
      >
        Add a Recipient
      </Button>

      <AddRecipientModal />
    </>
  );
};

export default AddRecipient;
