"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  ImageIcon,
  Link,
  Quote,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImageUploader from "../modals/image-uploader";
import { useState } from "react";

interface TiptapToolbarProps {
  editor: Editor | null;
}

export const TiptapToolbar = ({ editor }: TiptapToolbarProps) => {
  const [imageUploaderOpen, setImageUploaderOpen] = useState(false);

  if (!editor) return null;

  const getBlockType = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    if (editor.isActive("heading", { level: 5 })) return "h5";
    if (editor.isActive("heading", { level: 6 })) return "h6";
    if (editor.isActive("blockquote")) return "blockquote";
    return "paragraph";
  };

  const setBlockType = (value: string) => {
    switch (value) {
      case "paragraph":
        editor.chain().focus().setParagraph().run();
        break;
      case "h1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "h3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "h4":
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      case "h5":
        editor.chain().focus().toggleHeading({ level: 5 }).run();
        break;
      case "h6":
        editor.chain().focus().toggleHeading({ level: 6 }).run();
        break;
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run();
        break;
    }
  };

  const handleInsertImage = (src: string, alt: string) => {
    editor.chain().focus().setImage({ src, alt }).run();
  };

  const handleInsertLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-black/[.12] p-2 bg-black/[.04] text-black">
      <Select value={getBlockType()} onValueChange={setBlockType}>
        <SelectTrigger className="h-8 w-[140px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
          <SelectItem value="h4">Heading 4</SelectItem>
          <SelectItem value="h5">Heading 5</SelectItem>
          <SelectItem value="h6">Heading 6</SelectItem>
          <SelectItem value="blockquote">Quote</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor.isActive("bold") ? "bg-black/[.12]" : ""}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor.isActive("italic") ? "bg-black/[.12]" : ""}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor.isActive("underline") ? "bg-black/[.12]" : ""}`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor.isActive("bulletList") ? "bg-black/[.12]" : ""}`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor.isActive("orderedList") ? "bg-black/[.12]" : ""}`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ImageUploader
        open={imageUploaderOpen}
        onOpenChange={setImageUploaderOpen}
        onInsert={handleInsertImage}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor.isActive("link") ? "bg-black/[.12]" : ""}`}
        onClick={handleInsertLink}
      >
        <Link size={16} />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor.isActive({ textAlign: "left" }) ? "bg-black/[.12]" : ""}`}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor.isActive({ textAlign: "center" }) ? "bg-black/[.12]" : ""}`}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor.isActive({ textAlign: "right" }) ? "bg-black/[.12]" : ""}`}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight size={16} />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo2 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo2 size={16} />
      </Button>
    </div>
  );
};
