"use client";
import React from "react";
import { Input } from "@/components/ui/input";

import CancelIcon from "@/components/icons/cancel";
import { cn } from "@/lib/utils";
import { geist, inter } from "@/public/fonts";
import { useModalAddRecipient } from "@/store/modal-add-recipient";
import ImageUploader from "@/components/modals/image-uploader-no-context";
import { Button } from "@/components/ui/button";
import DoneIcon from "@/components/icons/done";
import AddPhoto from "./add-photo";

const AddRecipientModal = () => {
  const { isOpen, onOpen, onClose } = useModalAddRecipient((store) => store);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-black_v2-32 backdrop-blur w-full h-full">
      <div className="flex flex-col items-start justify-start p-8 gap-4 max-w-[500px] w-full grow rounded-lg border border-white_v2-16 bg-black_v2-100">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-start w-full">
            <h3
              className={cn(inter.className, "text-white_v2-100 ty-subheading")}
            >
              Add a Recipient
            </h3>

            <button onClick={onClose}>
              <CancelIcon />
            </button>
          </div>
          <p
            className={cn(geist.className, "ty-descriptions text-white_v2-100")}
          >
            Add an individual recipient to your address book or group.
          </p>
        </div>

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
        <div className="flex justify-end w-full">
          <button
            //   onClick={handleAddRecipient}
            className={cn(
              geist.className,
              "bg-gold_v2-100 text-black_v2-100 flex items-center gap-2 rounded-lg py-3 px-4 ty-descriptions",
            )}
          >
            <DoneIcon />
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipientModal;
