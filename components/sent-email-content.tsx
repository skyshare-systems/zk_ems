import { useSentEmailStore } from "@/store/sent-email";
import { EmailSection } from "./email-section";
import { useEffect, useState } from "react";
import { updateFontHtml } from "@/lib/utils";

export const SentEmailContent = () => {
  const { selectedSentEmail } = useSentEmailStore();

  const [iframeUrl, setIframeUrl] = useState<string>("");

  useEffect(() => {
    if (!selectedSentEmail) return;

    const updatedHtml = updateFontHtml(selectedSentEmail.body);

    const blob = new Blob([updatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    setIframeUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedSentEmail]);

  if (!selectedSentEmail) return null;

  return (
    <div className="flex flex-col flex-1 w-full bg-white p-4 h-full ">
      <iframe
        src={iframeUrl}
        className="rounded-2xl w-full h-full flex-grow min-h-0 bg-none"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};
