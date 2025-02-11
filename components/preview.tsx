import { useCreateEmailStore } from "@/store/create-email";
import React, { useState } from "react";
import MarkdownEditor, { preview } from "@uiw/react-markdown-editor";
import { ScrollArea } from "./ui/scroll-area";
import { marked } from "marked";
import MDEditor, { commands, getCommands } from "@uiw/react-md-editor";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}
const Preview = ({ isPreview, setIsPreview }: Props) => {
  const { selectedTemplate, body, setBody } = useCreateEmailStore();

  if (!selectedTemplate) return null;


  return (
    <ScrollArea className="h-[440px] w-full bg-white/[.04] p-4 rounded-2xl space-y-2">
        <>
          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="rounded-lg p-4 w-full">
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: selectedTemplate.header,
                }}
              ></div>
            </div>
          </div>
          <div className="flex p-4 justify-center items-center gap-2 self-stretch rounded-lg flex-1 min-h-64">

<p className="ty-descriptions text-center text-white/[.32]">Some great email content exists here.</p>

          </div>

          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="rounded-lg p-4 w-full">
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: selectedTemplate.footer,
                }}
              ></div>
            </div>
          </div>
        </>
    </ScrollArea>
  );
};

export default Preview;
