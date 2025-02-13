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
            <div className="w-full border-red-500 border">
                <div>${headerHTML}</div>
                <div className="w-full bg-red-500">${bodyHTML}</div>
                <div>${footerHTML}</div>
            </div>
        `;
  };

  const previewHTML = buildPreview();

  return (
    <div className="flex p-4 flex-col  gap-6 self-stretch rounded-2xl bg-white h-full grow">
      {isPreview ? (
        <div className="border border-dashed border-gold grow h-full w-full p-4 rounded-lg border-spacing-9 text-white max-w-[640px] mx-auto">
          <div className="w-full ">
            <div
              className="prose w-full max-w-none"
              dangerouslySetInnerHTML={{ __html: previewHTML }}
            ></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="rounded-lg p-4 w-full border border-white/[.08]">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: selectedTemplate.header,
                }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 self-stretch h-full flex-1 my-4">
            <p className="ty-subtext text-black">Edit Email Body</p>

            <div className="max-w-[1250px] w-full">
              {/*   <MDEditor
                value={body}
                height="500px"
                className="h-full"
                onChange={(value, viewUpdate) => setBody(value || "")}
                preview="edit"
                commands={[...getCommands()]}
              /> */}

              <SimpleToolbar  />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="rounded-lg p-4 w-full border border-white/[.08]">
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
