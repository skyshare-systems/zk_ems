import React from "react";
import { cn } from "@/lib/utils";
// import DOMPurify from "dompurify";

export const EmailSection = ({ content }: { content: string }) => {
  // Sanitize the HTML content
/*   const sanitizedContent = DOMPurify.sanitize(content);
 */
  return (
    <div className="rounded-lg w-full text-center">
      <div
        className={cn(
          "prose max-w-[640px] mx-auto p-0",
          // Group related table styles together
          "prose-table:border-collapse prose-table:w-full prose-table:m-0 prose-table:p-0",
          // Remove borders and spacing from table elements
          "[&_td]:border-0 [&_td]:m-0 [&_td]:p-0 [&_td]:w-fit",
          "[&_th]:border-0 [&_th]:m-0 [&_th]:p-0",
          "[&_tr]:border-0 [&_tr]:m-0 [&_tr]:p-0",
          "[&_thead]:border-0 [&_thead]:m-0 [&_thead]:p-0",
          "[&_tbody]:border-0 [&_tbody]:m-0 [&_tbody]:p-0",
          "[&_tfoot]:border-0 [&_tfoot]:m-0 [&_tfoot]:p-0",
          // Image styling
          "prose-img:m-0 prose-img:p-0"
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default EmailSection;
