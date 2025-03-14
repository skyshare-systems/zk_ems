import { useCreateEmailStore } from "@/store/create-email";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { Mdx } from "./mdx/InitializedMDXEditor";
// import EditorPreview from "./mdx/preview";
// import Editor from "./mdx/editor";
const EmailEditor = ({
  isPreview,
  isGeneratingPreview,
}: {
  isPreview: boolean;
  isGeneratingPreview: boolean;
}) => {
  const { selectedTemplate, body, alignment, editorData, preview } =
    useCreateEmailStore();
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  if (!selectedTemplate) return null;

  return (
    <div className="flex p-4 flex-col gap-6 self-stretch rounded-2xl bg-white h-full grow">
      {isPreview ? (
        <>
          {isGeneratingPreview ? (
            <div className="flex flex-col grow w-full items-center gap-4 justify-center">
              <Loader size={24} className="animate-spin text-black/[32]" />
              <p className="text-black/[.5] text-[10.24px]">
                Generating Preview
              </p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: preview.html }}></div>
          )}
        </>
      ) : (
        <>
          {/* Body */}
          <div className="flex flex-col items-center gap-2 w-full my-4 grow">
            <p className="ty-subtext text-black">Edit Email Body</p>
            <p className="text-black/[.5] text-[10.24px]">
              Note: Alignment Plugin will make all content to follow the
              selected alignment. Since markdown doesn&rsquo;t support alignment
              at all.
            </p>
            <div className="flex flex-col border border-black/[.32] border-dashed grow h-full w-full rounded-2xl overflow-hidden min-h-[450px]">
              <Mdx ref={ref} />
              {/* <Editor /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailEditor;
