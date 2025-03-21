import { useCreateEmailStore } from "@/store/create-email";
import { useSentEmailStore } from "@/store/sent-email";
import { EmailSection } from "./email-section";
import { getTemplateLookup, updateFontHtml } from "@/lib/utils";
import { useEffect, useState } from "react";

// Preview Component
export const Preview = () => {
  const { selectedTemplate } = useCreateEmailStore();

  const [template, setTemplate] = useState<string>("");

  const [iframeUrl, setIframeUrl] = useState<string>("");

  useEffect(() => {
    const updatedHtml = updateFontHtml(template);

    const blob = new Blob([updatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    setIframeUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [template]);

  useEffect(() => {
    if (!selectedTemplate) return;

    const getTemplate = async () => {
      const template = await getTemplateLookup(selectedTemplate?.id, {
        isTemplate: true,
      });


      setTemplate(template);
    };

    getTemplate();
  }, [selectedTemplate]);

  if (!selectedTemplate || !iframeUrl || !template) return null;

  return (
    <div className="flex flex-col flex-1 w-full bg-white p-4 h-full">
      <iframe
        src={iframeUrl}
        className="rounded-2xl w-full h-full flex-grow min-h-0 bg-none"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};
