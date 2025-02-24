import React from "react";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";

export const EmailSection = ({
  content,
  className,
}: {
  className?: string;
  content: string;
}) => {
  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className={cn("rounded-lg w-full text-center", className)}>
      <div
        className={cn(
          "prose max-w-[640px] w-full mx-auto ",
          // Complete table reset
          "[&_table]:w-full [&_table]:border-0 [&_table]:m-0 [&_table]:p-0 [&_table]:border-collapse",
          // Reset spacing and layout for all table elements
          "[&_*]:border-0 ",
          // Specific table element resets
          "[&_td]:w-fit [&_td]:text-left",
          "[&_tr]:w-full",
          "[&_th]:font-normal [&_th]:text-left",
          // Remove any inherited styles
          "[&_table]:shadow-none",
          "[&_thead]:bg-transparent",
          "[&_tbody]:bg-transparent",
          "[&_tfoot]:bg-transparent",
          // Reset any prose-specific styles
          "prose-table:shadow-none",
          "prose-tr:border-0",
          "prose-td:align-middle",
          // Reset images within tables
          "[&_img]:m-0 [&_img]:p-0 [&_img]:inline-block"
        )}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
};

export default EmailSection;
