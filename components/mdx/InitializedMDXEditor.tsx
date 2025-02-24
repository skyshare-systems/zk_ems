import React from "react";
import {
  AdmonitionDirectiveDescriptor,
  MDXEditor,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  Separator,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  ListsToggle,
  KitchenSinkToolbar,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  InsertCodeBlock,
  InsertSandpack,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import { useCreateEmailStore } from "@/store/create-email";
import "@mdxeditor/editor/style.css";
import { useCompanyStore } from "@/store/company";
import { toast } from "sonner";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  ref: React.RefObject<MDXEditorMethods | null>;
}

export const Mdx = ({ ref }: Props) => {
  const { body, setBody, alignment, setAlignment } = useCreateEmailStore();
  const { company } = useCompanyStore();

  //* take 10 newly uploaded images

  return (
    <MDXEditor
      autoFocus
      ref={ref}
      markdown={body}
      onChange={setBody}
      contentEditableClassName={cn(
        "prose flex flex-col grow max-w-[640px] m-0 p-0 h-full mx-auto",
        {
          "text-left": alignment === "left",
          "text-center": alignment === "center",
          "text-right": alignment === "right",
        }
      )}
      className="h-full flex flex-col grow w-full mx-auto"
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex flex-wrap gap-2 justify w-full space-y-2">
              <DiffSourceToggleWrapper>
                <BlockTypeSelect />
                <Separator />
                <BoldItalicUnderlineToggles />
                <Separator />
                <ListsToggle />
                <Separator />
                <InsertImage />
                <CreateLink />
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                />
                <Separator />
                <AlignLeft
                  size={24}
                  color="gray"
                  className="self-center hover:stroke-black"
                  onClick={() => {
                    setAlignment("left");
                  }}
                />
                <AlignCenter
                  size={24}
                  color="gray"
                  className="self-center hover:stroke-black"
                  onClick={() => {
                    setAlignment("center");
                  }}
                />
                <AlignRight
                  size={24}
                  color="gray"
                  className="self-center hover:stroke-black"
                  onClick={() => {
                    setAlignment("right");
                  }}
                />
                <Separator />
                <div className="mr-auto">
                  <UndoRedo />
                </div>
              </DiffSourceToggleWrapper>
            </div>
          ),
        }),
        listsPlugin(),
        quotePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS", html: "HTML" },
        }),
        headingsPlugin({
          allowedHeadingLevels: [1, 2, 3, 4, 5, 6],
        }),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({
          imageUploadHandler: async (fileData) => {
            try {
              if (!company) {
                throw new Error("Company not found");
              }

              const formData = new FormData();

              formData.append("file", fileData);
              formData.append("filename", fileData.name);
              formData.append("companyId", company?.id);

              const response = await fetch("/api/attachments", {
                method: "POST",
                body: formData,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              const data = await response.json();
              const url = data.filepath;

              return url;
            } catch (error) {
              window.alert("Something went wrong.");
              toast.error("Something went wrong.");
              console.error("Error handling image upload:", error);
              throw error;
            }
          },
          imageAutocompleteSuggestions: [
            "https://picsum.photos/200/300",
            "https://picsum.photos/200",
          ],
        }),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
        markdownShortcutPlugin(),
      ]}
    />
  );
};
