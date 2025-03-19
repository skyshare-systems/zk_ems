"use client";


import { updateFontHtml } from "@/lib/utils";
import { useEffect, useState } from "react";

const useRenderTemplate = (html: string) => {
  const [iframeUrl, setIframeUrl] = useState<string>("");

  useEffect(() => {
    const updatedHtml = updateFontHtml(html);

    const blob = new Blob([updatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    setIframeUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [html]);

  return {
    iframeUrl,
  };
};

export default useRenderTemplate;
