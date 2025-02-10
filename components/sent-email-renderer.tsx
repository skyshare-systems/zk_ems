"use client";

import { useCreateEmailStore } from "@/store/create-email";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import TemplateSelection from "./template-selection";
import { useCompanyStore } from "@/store/company";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "@/lib/query/templates";
import { Separator } from "./ui/separator";
import Templates from "@/views/templates";
import EmailEditor from "./email-editor";
import { InputTags } from "./ui/input-tags";
import axios from "axios";
import { marked } from "marked";
import { SentEmailWithTemplateAndCount } from "./sent-email";
import { useSentEmailStore } from "@/store/sent-email";
import SentEmailContent from "./sent-email-content";

const SentEmailRenderer = () => {
  const { selectedSentEmail } = useSentEmailStore();
  const {
    selectedTemplate,
    subject,
    recipients,
    setRecipients,
    body,
    setSubject,
  } = useCreateEmailStore();
  const [values, setValues] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const { user } = useUserStore();
  const { company } = useCompanyStore();

  const { data: templates } = useQuery({
    queryKey: ["templates"],
    queryFn: () =>
      getTemplates({
        params: `userId=${user?.id}&companyId=${company?.id}`,
      }),
  });


  if (!selectedSentEmail) return null;


  return (
    <div className="flex p-4 flex-col justify-center items-start gap-6 self-stretch rounded-2xl bg-white/[.08] mb-24 ">
      <div className="flex flex-col justify-center items-start gap-4 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex items-center gap-2 self-stretch ">
            <p className="ty-descriptions text-white/[.32] w-[96px]">Subject</p>
            <p className="ty-title text-white">
              {selectedSentEmail?.template.subject}
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch  ">
            <p className="ty-descriptions text-white/[.32] w-[96px]">
              Recipients
            </p>
            {selectedSentEmail?.recipients.slice(0, 5).map((recipient) => (
              <div
                className="px-2 py-1 flex justify-normal items-center gap-2 rounded-full bg-white/[.04]"
                key={recipient.id}
              >
                <p className="ty-subtext text-white/[.72]">{recipient.emailAddress}</p>
              </div>
            ))}

            {selectedSentEmail?.recipients.length === 0 && (
              <p className="ty-subtext text-white/[.72]">No recipients</p>
            )}

            {selectedSentEmail && selectedSentEmail?.recipients.length > 5 && (
              <div className="px-2 py-1 flex justify-normal items-center gap-2 rounded-full bg-white/[.04]">
                <p className="ty-subtext text-white/[.72]">
                  +{selectedSentEmail?.recipients.length - 5} more
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="ty-descriptions text-white/[.32]">Email Content</p>

        <SentEmailContent />
      </div>
    </div>
  );
};

export default SentEmailRenderer;
