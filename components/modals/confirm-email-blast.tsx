"use client";

import React, { useEffect } from "react";
import { Modal } from "../modal";
import { useModalStore } from "@/store/modal";
import { Button } from "../ui/button";
import axios from "axios";
import { TemplateWithCompany, useCreateEmailStore } from "@/store/create-email";
import { marked } from "marked";
import { toast } from "sonner";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  sendEmail,
  SendEmailProps,
  sendEmailSkyshare,
} from "@/lib/mutation/email/send-email";
import { useUserStore } from "@/store/user";
import useProps from "@/hooks/useProps";
import { getAnalytics } from "@/lib/query/analytics";
import RocketIcon from "../icons/rocket";
import RocketRight from "../icons/rocket-right";
import { useSentEmailStore } from "@/store/sent-email";

const ConfirmEmailBlast = () => {
  const { isOpen, onClose } = useModalStore();
  const { selectedSentEmail } = useSentEmailStore();

  const {
    selectedTemplate,
    subject,
    recipients,
    body,
    reset,
    attachments,
    alignment,
    isPreview,
    mode,
  } = useCreateEmailStore();
  const { propsBuilder } = useProps();

  const queryClient = useQueryClient();

  const { user } = useUserStore();

  const abortControllerRef = React.useRef<AbortController | null>(null);

  const { mutate: sendNow, isPending } = useMutation({
    mutationFn: (params: SendEmailProps) => {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      return selectedTemplate?.company.name === "Skyshare Labs"
        ? sendEmailSkyshare({ ...params, signal })
        : sendEmail({ ...params, signal });
    },
    mutationKey: ["send-email"],
    onSuccess: async () => {
      toast.success("Email sent successfully", {
        onAutoClose: () => onClose(),
        onDismiss: () => onClose(),
      });

      await getAnalytics({
        params: `?companyId=${mode === "create" ? selectedTemplate?.company?.id : selectedSentEmail?.companyId}`,
      });

      queryClient.invalidateQueries({
        queryKey: ["sent-emails"],
      });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPending && abortControllerRef.current) {
        abortControllerRef.current.abort();
        toast.info("Email sending aborted.");
        setTimeout(() => onClose(), 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, isPending]);

  if (!isOpen) return null;

  function send() {
    switch (mode) {
      case "create": {
        if (!selectedTemplate || recipients.length === 0) {
          toast.error("Please select at least one recipient.");
          return;
        }

        sendNow({
          subject,
          selectedTemplate,
          recipients,
          body,
          alignment,
          attachments,
          ...propsBuilder(),
        });
      }
      case "forward": {
        if (recipients.length === 0) {
          toast.error("Please select at least one recipient.");
          return;
        }

        sendNow({
          subject,
          selectedTemplate: selectedSentEmail?.template as TemplateWithCompany,
          recipients,
          body: selectedSentEmail?.body as string,
          alignment,
          attachments,
          mode: "forward",
          selectedSentEmailId: selectedSentEmail?.id,
          ...propsBuilder(),
        });
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 inset-0 flex justify-center items-center h-full w-full backdrop-blur-lg bg-black/50 z-[999]">
      <div className="flex justify-center w-full p-2 flex-col items-center gap-4 self-stretch">
        <RocketIcon className="text-gold_v2-100" />

        <div className="flex flex-col items-center gap-2">
          <p className="ty-subtitle text-center text-white_v2-50">
            You are about to blast
          </p>
          <h6 className="ty-h6 text-white_v2-100">{subject}</h6>
          <p className="ty-descriptions">
            <span className="text-white_v2-50">to </span>
            <span className="text-white_v2-100">
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
          <RocketRight className="text-black_v2-100" />
          <p className="ty-title text-black text-center">
            {isPending ? "Sending..." : "Send now"}
          </p>
        </Button>
        <Button
          disabled={isPending}
          onClick={onClose}
          variant={"default"}
          className="bg-gold"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ConfirmEmailBlast;
