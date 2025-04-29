import React, { useState } from "react";
import { Modal } from "../modal";
import { useConfirmResetStore } from "@/store/confirm-reset";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useCreateEmailStore } from "@/store/create-email";
import { toast } from "sonner";

const ConfirmResetModal = () => {
  const { isOpen, onClose } = useConfirmResetStore();
  const { reset } = useCreateEmailStore();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    const randomDelay = Math.floor(Math.random() * 1000) + 500;
    setIsResetting(true);

    await new Promise((resolve) => setTimeout(resolve, randomDelay));
    reset();

    setIsResetting(false);

    onClose();
    toast.success("Fields have been reset to default values.", {
      duration: 1000,
    });
  };

  return (
    <Modal
      description="This will reset all fields to their default values. Are you sure you want to proceed?"
      isOpen={isOpen}
      onClose={onClose}
      title="Reset Fields"
    >
      <div className="flex gap-2 items-center">
        <Button onClick={onClose} type="submit" className="w-full">
          {false ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <p className="ty-descriptions">Cancel</p>
          )}
        </Button>
        <Button
          onClick={handleReset}
          type="submit"
          variant={"destructive"}
          className="w-full"
        >
          {isResetting ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <p className="ty-descriptions">Reset</p>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmResetModal;
