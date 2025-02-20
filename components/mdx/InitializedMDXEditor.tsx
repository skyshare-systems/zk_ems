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

/* import { ALL_PLUGINS, YoutubeDirectiveDescriptor, virtuosoSampleSandpackConfig } from './_boilerplate'
import kitchenSinkMarkdown from './assets/kitchen-sink.md?raw'
import './dark-editor.css'
import { basicDark } from 'cm6-theme-basic-dark'
import type { Story } from '@ladle/react'

export const Basics = () => {
  return <MDXEditor markdown={kitchenSinkMarkdown} plugins={ALL_PLUGINS} />
}

export const ReadOnly: Story<{ readOnly: boolean }> = ({ readOnly }) => {
  return <MDXEditor markdown={kitchenSinkMarkdown} readOnly={readOnly} plugins={ALL_PLUGINS} />
}

ReadOnly.args = { readOnly: true }
ReadOnly.argTypes = {
  readOnly: {
    name: 'Read only',
    defaultValue: true,
    control: { type: 'boolean' }
  }
}

export const CustomTheming = () => {
  return (
    <MDXEditor
      className="dark-theme dark-editor"
      markdown={kitchenSinkMarkdown}
      plugins={[
        toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageAutocompleteSuggestions: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'] }),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' },
          codeMirrorExtensions: [basicDark]
        }),
        directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo', codeMirrorExtensions: [basicDark] }),
        markdownShortcutPlugin()
      ]}
    />
  )
}

export const ConditionalToolbar = () => {
  const [outsideState, setOutsideState] = React.useState('foo')
  return (
    <>
      <button
        onClick={() => {
          setOutsideState('bar')
        }}
      >
        Toggle outside state
      </button>
      {outsideState}
      <MDXEditor
        markdown={'hello world'}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  {outsideState}
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <Separator />
                  <BlockTypeSelect />
                  <CreateLink />
                  <InsertImage />
                  <Separator />
                </DiffSourceToggleWrapper>
              </>
            )
          }),
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          // codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
          // sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
          // codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text' } }),
          directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
          diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
          markdownShortcutPlugin()
        ]}
      />
    </>
  )
}
 */

interface Props {
  ref: React.RefObject<MDXEditorMethods | null>;
}

export const Mdx = ({ ref }: Props) => {
  const { body, setBody } = useCreateEmailStore();
  const { company } = useCompanyStore();

  //* take 10 newly uploaded images

  return (
    <MDXEditor
      autoFocus
      ref={ref}
      markdown={body}
      onChange={setBody}
      contentEditableClassName="prose grow max-w-[640px]  text-center h-full mx-auto"
      className="h-full grow w-full mx-auto"
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
              });

              const data = await response.json();
              const url = data.filepath;

              return url;
            } catch (error) {
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
