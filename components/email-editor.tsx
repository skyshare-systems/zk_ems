import { updateFontHtml } from "@/lib/utils";
import { useCreateEmailStore } from "@/store/create-email";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ArticleEditor from "./article-editor";
import CtaEditor from "./cta-editor";
import FromThePeopleEditor from "./from-the-people-editor";
import { Mdx } from "./mdx/InitializedMDXEditor";
import UpcomingProgramEditor from "./upcoming-program-editor";
// import EditorPreview from "./mdx/preview";
// import Editor from "./mdx/editor";
const EmailEditor = ({
  isPreview,
  isGeneratingPreview,
}: {
  isPreview: boolean;
  isGeneratingPreview: boolean;
}) => {
  const {
    selectedTemplate,
    body,
    alignment,
    editorData,
    preview,
    setArticles,
  } = useCreateEmailStore();
  const ref = useRef<MDXEditorMethods>(null);

  const [iframeUrl, setIframeUrl] = useState<string>("");

  useEffect(() => {
    const updatedHtml = updateFontHtml(preview.html);

    const blob = new Blob([updatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    setIframeUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [preview.html]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  if (!selectedTemplate) return null;

  return (
    <div className="flex flex-col self-stretch h-full gap-6 p-4 bg-white rounded-2xl grow">
      {isPreview ? (
        <>
          {isGeneratingPreview ? (
            <div className="flex flex-col items-center justify-center w-full gap-4 grow">
              <Loader size={24} className="animate-spin text-black/[32]" />
              <p className="text-black/[.5] text-[10.24px]">
                Generating Preview
              </p>
            </div>
          ) : (
            <div className="flex flex-col grow h-full min-h-[400px] items-center justify-center">
              <iframe
                src={iframeUrl}
                className="flex-grow w-full h-full min-h-0 rounded-2xl bg-none"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </>
      ) : (
        <>
          {/* Body */}
          <div className="flex flex-col items-center w-full gap-4 my-4 grow">
            <p className="text-black ty-subtext">Edit Email Body</p>
            <p className="text-black/[.5] text-[10.24px]">
              Note: Alignment Plugin will make all content to follow the
              selected alignment. Since markdown doesn&rsquo;t support alignment
              at all.
            </p>
            <div className="flex flex-col border border-black/[.32] border-dashed grow h-full w-full rounded-2xl overflow-hidden min-h-[450px]">
              <Mdx ref={ref} />
              {/* <Editor /> */}
            </div>

            <CtaEditor />
            <FromThePeopleEditor />
            <ArticleEditor />
            <UpcomingProgramEditor />
          </div>
        </>
      )}
    </div>
  );
};

export default EmailEditor;
