import { useCreateEmailStore } from "@/store/create-email";
import { marked } from "marked";
import React, { useRef } from "react";
import { Mdx } from "./mdx/InitializedMDXEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { EmailSection } from "./email-section";
import { cn } from "@/lib/utils";
const EmailEditor = ({ isPreview }: { isPreview: boolean }) => {
  const { selectedTemplate, body } = useCreateEmailStore();
  const ref = useRef<MDXEditorMethods>(null);

  if (!selectedTemplate) return null;

  const previewHTML = `
    <div className="w-full prose">
      <div>${selectedTemplate.header}</div>
      <div className="w-full">${marked.parse(body)}</div>
      <div>${selectedTemplate.footer}</div>
    </div>
  `;

  return (
    <div className="flex p-4 flex-col gap-6 self-stretch rounded-2xl bg-white h-full grow">
      {isPreview ? (
        <div className="flex justify-center items-center min-h-screen w-full p-4">
          <div className="border border-dashed border-gold w-full max-w-[640px] p-4 rounded-lg bg-white shadow-lg">
            <div className="w-full flex justify-center ">
              <div
                className={cn(
                  "prose max-w-[640px] mx-auto p-0 text-center",
                  // Complete table reset
                  "[&_table]:w-full [&_table]:border-0 [&_table]:m-0 [&_table]:p-0 [&_table]:border-collapse",
                  // Reset spacing and layout for all table elements
                  "[&_*]:border-0 [&_*]:m-0 [&_*]:p-0",
                  // Specific table element resets
                  "[&_td]:w-fit [&_td]:text-left",
                  "[&_tr]:w-full",
                  "[&_th]:font-normal [&_th]:text-left",
                  // Remove any inherited styles
                  "[&_table]:shadow-none",
                  "[&_thead]:bg-transparent",
                  "[&_tbody]:bg-transparent",
                  "[&_tfoot]:bg-transparent",
                  // Reset any prose-specific styles
                  "prose-table:shadow-none",
                  "prose-tr:border-0",
                  "prose-td:align-middle",
                  // Reset images within tables
                  "[&_img]:m-0 [&_img]:p-0 [&_img]:inline-block"
                )}
                dangerouslySetInnerHTML={{ __html: previewHTML }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <EmailSection content={selectedTemplate.header} />

          {/* Body */}
          <div
            className="flex flex-col items-center gap-2 w-full my-4 grow"
            onClick={() => ref.current?.focus()}
          >
            <p className="ty-subtext text-black">Edit Email Body</p>
            <div className="flex flex-col border border-black/[.32] border-dashed grow h-full w-full rounded-2xl overflow-hidden">
              <Mdx ref={ref} />
            </div>
          </div>

          <EmailSection content={selectedTemplate.footer} />
        </>
      )}
    </div>
  );
};

export default EmailEditor;
