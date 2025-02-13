import { useCreateEmailStore } from "@/store/create-email";
import { marked } from "marked";
import React from "react";
import { SimpleToolbar } from "./mdx/InitializedMDXEditor";

interface Props {
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailEditor = ({ isPreview }: Props) => {
  const { selectedTemplate, body, setBody } = useCreateEmailStore();
  const [markdown, setMarkdown] = React.useState("");
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
          <div className="flex flex-col items-center gap-2 w-full my-4">
            <p className="ty-subtext text-black">Edit Email Body</p>
            <div className="max-w-[1250px] w-full">
              {/* <MDEditor ... /> */}
              <SimpleToolbar />
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
