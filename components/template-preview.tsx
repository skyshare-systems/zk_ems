"use client";

import { useCreateEmailStore } from "@/store/create-email";
import { useState } from "react";
import Preview from "./preview";

const TemplatePreview = () => {
  const { selectedTemplate } = useCreateEmailStore();
  const [isPreview, setIsPreview] = useState(false);

  if (!selectedTemplate) return null;

  return (
    <div className="flex p-4 flex-col  gap-6 self-stretch rounded-2xl bg-white/[.08] h-full grow">
      <div className="flex flex-col grow justify-center items-start gap-4 self-stretch h-full">
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
            <p className="ty-descriptions text-white/[.32] w-24">
              {selectedTemplate.tags.length > 1 ? "Categories" : "Category"}
            </p>
            {selectedTemplate.tags.map((tag) => (
              <p className="text-ellipsis line-clamp-1 text-gold" key={tag}>
                {tag}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full grow bg-white/[.04] rounded-2xl border border-dashed border-gold overflow-hidden h-full">
          <Preview />
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
