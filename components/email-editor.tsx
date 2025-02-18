import { useCreateEmailStore } from "@/store/create-email";
import { marked } from "marked";
import React, { useRef } from "react";
import { Mdx } from "./mdx/InitializedMDXEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";

interface Props {
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailEditor = ({ isPreview }: Props) => {
  const { selectedTemplate, body, setBody } = useCreateEmailStore();
  const [markdown, setMarkdown] = React.useState("");
  const ref = useRef<MDXEditorMethods>(null);

  if (!selectedTemplate) return null;

  const buildPreview = () => {
    const headerHTML = selectedTemplate.header;
    const bodyHTML = marked(body);
    const footerHTML = selectedTemplate.footer;

    return `
            <div className="w-full">
                <div>${headerHTML}</div>
                <div className="w-full">${bodyHTML}</div>
                <div>${footerHTML}</div>
            </div>
        `;
  };

  const previewHTML = buildPreview();

  const focus = () => {
    ref.current?.focus();
  };

  return (
    <div className="flex p-4 flex-col  gap-6 self-stretch rounded-2xl bg-white h-full grow">
      {isPreview ? (
        <div className="flex justify-center items-center min-h-screen w-full  p-4">
          <div className="border border-dashed border-gold w-full max-w-[640px] p-4 rounded-lg text-white bg-white shadow-lg">
            <div className="w-full flex justify-center">
              <div
                className="prose w-full max-w-[640px] break-words text-center"
                dangerouslySetInnerHTML={{ __html: previewHTML }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="rounded-lg p-4 w-full max-w-[640px] border border-white/[.08] text-center">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: selectedTemplate.header,
                }}
              ></div>
            </div>
          </div>

          {/* Body */}
          <div
            onClick={focus}
            className="flex flex-col items-center gap-2 w-full my-4 grow"
          >
            <p className="ty-subtext text-black">Edit Email Body</p>
            <div className="grow h-full w-full">
            
              <Mdx ref={ref} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="rounded-lg p-4 w-full max-w-[640px] border border-white/[.08] text-center">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: selectedTemplate.footer,
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailEditor;
