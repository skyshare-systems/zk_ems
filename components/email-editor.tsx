import { useCreateEmailStore } from "@/store/create-email";
import React, { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { ScrollArea } from "./ui/scroll-area";
import { marked } from "marked";

const EmailEditor = () => {
  const { selectedTemplate } = useCreateEmailStore();
  const [markdown, setMarkdown] = useState("");
  if (!selectedTemplate) return null;

  const buildPreview = () => {
    const headerHTML = selectedTemplate.header;
    const bodyHTML = marked(markdown);
    const footerHTML = selectedTemplate.footer;

    return `
            <div>
                <div>${headerHTML}</div>
                <div>${bodyHTML}</div>
                <div>${footerHTML}</div>
            </div>
        `;
  };

  const previewHTML = buildPreview();

  return (
    <ScrollArea className="h-[440px] w-full">
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

        <MarkdownEditor
          value={markdown}
          height="180px"
          className="w-full h-full"
          onChange={(value, viewUpdate) => setMarkdown(value)}
        />
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

      <div className="mt-4 w-full">
        <p className="ty-subtext text-white/[.32]">Preview</p>
        <div
          className="rounded-lg p-4 w-full border border-white/[.08]"
          dangerouslySetInnerHTML={{ __html: previewHTML }}
        ></div>
      </div>
    </ScrollArea>
  );
};

export default EmailEditor;
