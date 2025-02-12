"use client";

import { useCreateEmailStore } from "@/store/create-email";
import { useState } from "react";
import Preview from "./preview";

const TemplatePreview = () => {
  const { selectedTemplate } = useCreateEmailStore();
  const [isPreview, setIsPreview] = useState(false);

  if (!selectedTemplate) return null;

  return (
    <div className="flex p-4 flex-col justify-center items-start gap-6 self-stretch rounded-2xl bg-white/[.08] ">
      <div className="flex flex-col justify-center items-start gap-4 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex items-center gap-2 self-stretch">
            <p className="ty-descriptions text-white/[.32] w-24">Name</p>
            <p className="text-ellipsis line-clamp-1 flex-1">
              {selectedTemplate.name}
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch">
            <p className="ty-descriptions text-white/[.32] w-24">Description</p>
            <p className="text-ellipsis line-clamp-1 flex-1">
              {selectedTemplate.description}
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch">
            <p className="ty-descriptions text-white/[.32] w-24">Category</p>
            <p className="text-ellipsis line-clamp-1 text-gold flex-1">
              {selectedTemplate.tags[0]}
            </p>
          </div>
        </div>

        <Preview isPreview={isPreview} setIsPreview={setIsPreview} />
      </div>
    </div>
  );
};

export default TemplatePreview;
