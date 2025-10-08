"use client";
import { cn } from "@/lib/utils";
import { geist } from "@/public/fonts";
import { useAddressBook } from "@/store/address-book-tab";
import { useModalAddRecipient } from "@/store/modal-add-recipient";
import AddRecipientModal from "./add-recipient-modal";


const AddRecipient = () => {
  const {  onOpen,  } = useModalAddRecipient((store) => store);
  const { tab } = useAddressBook((state) => state);

  if (tab !== "recipients") return null;

  return (
    <>
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
