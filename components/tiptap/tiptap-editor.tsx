"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useCreateEmailStore } from "@/store/create-email";
import { TiptapToolbar } from "./tiptap-toolbar";
import { useEffect, useRef } from "react";

export const TiptapEditor = () => {
  const { body, setBody } = useCreateEmailStore();
  const isInternalUpdate = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Placeholder.configure({
        placeholder: "Start writing your email...",
      }),
      TextStyle,
      Color,
    ],
    content: body || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-[640px] mx-auto w-full h-full min-h-[400px] p-4 focus:outline-none text-black",
      },
    },
    onUpdate: ({ editor }) => {
      isInternalUpdate.current = true;
      setBody(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Sync external body changes (e.g. store rehydration from localStorage)
  useEffect(() => {
    if (!editor) return;
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }

    const currentContent = editor.getHTML();
    if (body !== currentContent) {
      editor.commands.setContent(body || "", { emitUpdate: false });
    }
  }, [body, editor]);

  return (
    <div className="flex flex-col grow h-full w-full">
      <TiptapToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex flex-col grow overflow-y-auto"
      />
    </div>
  );
};
