"use client";

import React, { useEffect } from "react";
import { Modal } from "../modal";
import { useModalStore } from "@/store/modal";
import { Button } from "../ui/button";
import axios from "axios";
import { useCreateEmailStore } from "@/store/create-email";
import { marked } from "marked";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@/lib/mutation/email/send-email";

const ConfirmEmailBlast = () => {
  const { isOpen, onClose } = useModalStore();
  const { selectedTemplate, subject, recipients, body, reset } =
    useCreateEmailStore();

  const { mutate: sendNow, isPending } = useMutation({
    mutationFn: sendEmail,
    mutationKey: ["send-email"],
    onSuccess: () => {
      toast.success("Email sent successfully", {
        onAutoClose: () => {
          onClose();
        /*   reset(); */
        },
      });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    });
  }, [onClose]);

  if (!isOpen) return null;

  function send() {
    if (!selectedTemplate) return;

    sendNow({
      subject,
      selectedTemplate,
      recipients,
      body,
    });
  }

  return (
    <div className="fixed top-0 left-0 inset-0 flex justify-center items-center h-full w-full backdrop-blur-lg bg-black/50 z-[999]">
      <div className="flex justify-center w-full p-2 flex-col items-center gap-4 self-stretch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M29.9734 43.1729L29.9733 29.5669C29.9734 25.855 29.9733 23.9991 30.25 22.2276C30.8177 18.5929 32.2453 15.1463 34.4139 12.1749C35.4711 10.7264 36.7834 9.41409 39.4081 6.7894C39.5452 6.6523 39.6607 6.66256 39.7877 6.78947C42.4123 9.41416 43.7247 10.7265 44.7816 12.1748C46.9503 15.1464 48.378 18.5929 48.9457 22.2275C49.2225 23.999 49.2223 25.855 49.2225 29.5668L49.2223 43.1729"
            stroke="#F3BC30"
            stroke-width="1.5"
            strokeLinecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M30.4233 35.8978C27.6136 38.7075 23.4871 41.6436 21.947 45.3617C20.8186 48.0861 21.2487 51.3514 21.2486 54.247L29.0408 51.1301C31.1059 50.3041 32.0464 53.0119 33.0036 54.4477C34.0702 56.0477 34.1342 56.082 36.0571 56.082L43.1385 56.082C45.0614 56.0819 45.1255 56.0478 46.192 54.4477C47.1493 53.0119 48.0898 50.3041 50.1547 51.1302L57.9471 54.2471C57.9471 51.3514 58.3772 48.0861 57.2486 45.3618C55.7086 41.6435 51.582 38.7075 48.7724 35.8978"
            stroke="#F3BC30"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <path
            d="M52.7974 52.7973V56.0971"
            stroke="#F3BC30"
            stroke-width="1.5"
            strokeLinecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26.3985 52.7973V56.0971"
            stroke="#F3BC30"
            stroke-width="1.5"
            strokeLinecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M31.4805 21.5808C33.7574 19.8979 36.6282 18.611 38.9734 18.6417C41.759 18.47 44.5478 19.2049 47.7156 21.5808"
            stroke="#F3BC30"
            stroke-width="1.5"
            strokeLinecap="square"
          />
          <path
            d="M39.598 19.997L39.598 24.7488"
            stroke="#F3BC30"
            stroke-width="1.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="flex flex-col items-center gap-2">
          <p className="ty-subtitle text-center text-[#F5F8FF]">
            You are about to blast
          </p>
          <h6 className="ty-h6">{subject}</h6>
          <p className="ty-descriptions text-white/50">
            to{" "}
            <span className="text-white">
              {recipients.length}{" "}
              {recipients.length > 1 ? "recipients" : "recipient"}
            </span>
          </p>
        </div>

        <Button
          disabled={isPending}
          onClick={send}
          variant={"default"}
          className="bg-gold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M12.665 1.33457C12.4768 1.14646 12.2611 1.06438 12.0287 1.03504C11.8323 1.01023 11.5719 1.02303 11.3346 1.0347C9.9107 1.10435 8.51648 1.5339 7.44145 2.60894L6.57491 3.47553C6.19668 3.85371 6.02285 4.02036 5.8622 4.10264C5.75073 4.15971 5.62144 4.18763 5.28793 4.12424C5.01002 4.05469 4.66189 3.96756 4.33694 3.96694C3.979 3.96626 3.60611 4.06546 3.29031 4.38126C2.98899 4.68258 2.77099 5.03687 2.771 5.45007C2.771 5.86324 2.989 6.21756 3.29031 6.51885L7.48065 10.7092C7.78195 11.0105 8.13626 11.2285 8.54944 11.2285C8.96267 11.2285 9.31693 11.0105 9.61822 10.7092C9.93404 10.3934 10.0333 10.0205 10.0326 9.66255C10.032 9.33763 9.94483 8.9895 9.8753 8.7116C9.81189 8.37805 9.83983 8.24878 9.89688 8.13731C9.97913 7.97666 10.1458 7.80282 10.524 7.42465L11.3906 6.55805C12.4656 5.48301 12.8952 4.08879 12.9648 2.66491C12.9765 2.4276 12.9893 2.16727 12.9645 1.9708C12.9351 1.73837 12.853 1.52267 12.665 1.33457ZM9.91455 3.49998C9.59238 3.49998 9.33122 3.76115 9.33122 4.08331C9.33122 4.40548 9.59238 4.66665 9.91455 4.66665H9.9198C10.242 4.66665 10.5031 4.40548 10.5031 4.08331C10.5031 3.76115 10.242 3.49998 9.9198 3.49998H9.91455Z"
              fill="#000205"
            />
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M3.07535 7.59865C3.29177 7.81507 3.29177 8.16594 3.07535 8.38236L1.96702 9.49069C1.7506 9.70711 1.39973 9.70711 1.18331 9.49069C0.966892 9.27428 0.966892 8.9234 1.18331 8.70699L2.29164 7.59865C2.50806 7.38224 2.85893 7.38224 3.07535 7.59865ZM3.95414 9.26115C4.17056 9.04474 4.52143 9.04474 4.73785 9.26115C4.95427 9.47757 4.95427 9.82844 4.73785 10.0449L1.96702 12.8157C1.7506 13.0321 1.39973 13.0321 1.18331 12.8157C0.966892 12.5993 0.966892 12.2484 1.18331 12.032L3.95414 9.26115ZM6.40038 10.9237C6.61674 11.1401 6.61674 11.4909 6.40038 11.7074L5.29202 12.8157C5.0756 13.0321 4.72473 13.0321 4.50831 12.8157C4.29189 12.5993 4.29189 12.2484 4.50831 12.032L5.61664 10.9237C5.83306 10.7072 6.18396 10.7072 6.40038 10.9237Z"
              fill="#000205"
            />
          </svg>
          <p className="ty-title text-black text-center">
            {isPending ? "Sending..." : "Send now"}
          </p>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmEmailBlast;
