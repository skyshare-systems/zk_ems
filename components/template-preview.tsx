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
import { useModalStore } from "@/store/modal";
import Preview from "./preview";

const TemplatePreview = () => {
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
  const { isOpen, onClose, onOpen } = useModalStore();

  const { data: templates } = useQuery({
    queryKey: ["templates"],
    queryFn: () =>
      getTemplates({
        params: `userId=${user?.id}&companyId=${company?.id}`,
      }),
  });

  if (!selectedTemplate) return null;

  function sendEmailConfirmation() {
    onOpen();
  }

  return (
    <div className="flex p-4 flex-col justify-center items-start gap-6 self-stretch rounded-2xl bg-white/[.08] ">
      <div className="flex flex-col justify-center items-start gap-4 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex items-center gap-2 self-stretch">
            <p className="ty-descriptions text-white/[.32] w-24">Name</p>
            <p className="text-ellipsis line-clamp-1 flex-1">
              {selectedTemplate.name}
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch">
            <p className="ty-descriptions text-white/[.32] w-24">Description</p>
            <p className="text-ellipsis line-clamp-1 flex-1">
              {selectedTemplate.description}
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch">
            <p className="ty-descriptions text-white/[.32] w-24">Category</p>
            <p className="text-ellipsis line-clamp-1 text-gold flex-1">
              {selectedTemplate.tags[0]}
            </p>
          </div>
        </div>

        <Preview isPreview={isPreview} setIsPreview={setIsPreview} />
      </div>
    </div>
  );
};

export default TemplatePreview;
