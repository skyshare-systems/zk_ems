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
const EmailEditor = ({isPreview, setIsPreview}: Props) => {
  const { selectedTemplate, body, setBody } = useCreateEmailStore();



  if (!selectedTemplate) return null;

  const buildPreview = () => {
    const headerHTML = selectedTemplate.header;
    const bodyHTML = marked(body);
    const footerHTML = selectedTemplate.footer;

    return `
            <div className="w-full border-red-500 border">
                <div>${headerHTML}</div>
                <div className="w-full bg-red-500">${bodyHTML}</div>
                <div>${footerHTML}</div>
            </div>
        `;
  };

  const previewHTML = buildPreview();


 
  return (
    <ScrollArea className="h-[440px] w-full">
      {isPreview ? (
        <div className="border border-dashed border-gold grow h-full  w-full p-4 rounded-lg border-spacing-9 text-white">
          <div
            className="prose  text-current whitespace-nowrap w-full flex-1 grow"
            dangerouslySetInnerHTML={{ __html: previewHTML }}
          ></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start gap-2 self-stretch">
            <p className="ty-subtext text-white/[.32]">Header</p>

            <div className="rounded-lg p-4 w-full border border-white/[.08]">
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: selectedTemplate.header,
                }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 self-stretch h-full flex-1 my-4">
            <p className="ty-subtext text-white/[.32]">Body</p>

            <div className="max-w-[1250px] w-full">
              <MDEditor
                value={body}
                height="210px"
                className="h-full"
                onChange={(value, viewUpdate) => setBody(value || "")}
                preview="edit"
                commands={[...getCommands()]}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 self-stretch">
            <p className="ty-subtext text-white/[.32]">Footer</p>

            <div className="rounded-lg p-4 w-full border border-white/[.08]">
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: selectedTemplate.footer,
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </ScrollArea>
  );
};

export default EmailEditor;