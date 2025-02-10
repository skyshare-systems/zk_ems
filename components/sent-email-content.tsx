import { useCreateEmailStore } from "@/store/create-email";
import React, { useState } from "react";
import MarkdownEditor, { preview } from "@uiw/react-markdown-editor";
import { ScrollArea } from "./ui/scroll-area";
import { marked } from "marked";
import MDEditor, { commands, getCommands } from "@uiw/react-md-editor";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSentEmailStore } from "@/store/sent-email";

interface Props {
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}
const SentEmailContent = () => {
  const {selectedSentEmail} = useSentEmailStore();
  if(!selectedSentEmail) return null;

  return (
    <ScrollArea className="h-[200px] w-full self-stretch flex-1 bg-white/[.04] p-4 rounded-2xl ">
      <div className="prose self-stretch w-full flex-1" dangerouslySetInnerHTML={{__html: selectedSentEmail.email}}></div>
    </ScrollArea>
  );
};

export default SentEmailContent;
