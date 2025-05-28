"use client";

import {
  defaultSectionOrders,
  getDefaultOrder,
  SectionType,
} from "@/emails/utils";
import { updateFontHtml } from "@/lib/utils";
import { useCreateEmailStore } from "@/store/create-email";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Reorder } from "framer-motion";
import { Loader, Move, RotateCw } from "lucide-react";
import { JSX, useEffect, useRef, useState } from "react";
import ArticleEditor from "./article-editor";
import CtaEditor from "./cta-editor";
import FromThePeopleEditor from "./from-the-people-editor";
import { Mdx } from "./mdx/InitializedMDXEditor";
import OurProgramsEditor from "./our-programs-editor";
import OurServicesEditor from "./our-services-editor";
import ProductsEditor from "./product-editor";
import RecentPostsEditor from "./recent-posts-editor";
import { Button } from "./ui/button";
import UpcomingProgramEditor from "./upcoming-program-editor";
import { companies } from "@/lib/constant";

const sectionComponents: Record<SectionType, JSX.Element> = {
  fromThePeople: <FromThePeopleEditor />,
  articles: <ArticleEditor />,
  upcomingPrograms: <UpcomingProgramEditor />,
  products: <ProductsEditor />,
  services: <OurServicesEditor />,
  posts: <RecentPostsEditor />,
  programs: <OurProgramsEditor />,
};

const EmailEditor = ({
  isPreview,
  isGeneratingPreview,
  isErrorGeneratingPreview,
  error,
}: {
  isPreview: boolean;
  isGeneratingPreview: boolean;
  isErrorGeneratingPreview: boolean;
  error: any;
}) => {
  const {
    selectedTemplate,
    preview,
    sectionOrder: sections,
    setSectionOrder: setSections,
    resetSectionOrder: resetSections,
    isSectionOrderUpdated,
    isRearranging,
    setIsRearranging,
  } = useCreateEmailStore();

  const ref = useRef<MDXEditorMethods>(null);
  const [iframeUrl, setIframeUrl] = useState<string>("");

  useEffect(() => {
    const updatedHtml = updateFontHtml(preview.html);
    const blob = new Blob([updatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setIframeUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [preview.html]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  if (!selectedTemplate) return null;

  const defaultSections = getDefaultOrder(
    defaultSectionOrders[selectedTemplate.company.name as companies] ||
      defaultSectionOrders["default"],
    selectedTemplate.company.name as companies,
    isSectionOrderUpdated,
  );


  return (
    <div className="flex flex-col self-stretch h-full gap-6 p-4 bg-white rounded-2xl grow">
      {isPreview ? (
        <>
          {isGeneratingPreview ? (
            <div className="flex flex-col items-center justify-center w-full gap-4 grow">
              <Loader size={24} className="animate-spin text-black/[.32]" />
              <p className="text-black/[.5] text-[10.24px]">
                Generating Preview
              </p>
            </div>
          ) : isErrorGeneratingPreview ? (
            <div className="flex flex-col items-center justify-center w-full gap-4 grow">
              <p className="text-red-800 text-[14px]">
                Error Generating Preview
              </p>
              <p className="text-red-800 text-[14px]">{error as string}</p>
            </div>
          ) : (
            <div className="flex flex-col grow h-full min-h-[1000px] items-center justify-center">
              <iframe
                src={iframeUrl}
                className="flex-grow w-full h-full min-h-0 rounded-2xl bg-none"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center w-full gap-4 my-4 grow">
            <p className="text-black ty-subtext">Edit Email Body</p>
            <p className="text-black/[.5] text-[10.24px]">
              Note: Alignment Plugin will make all content follow the selected
              alignment. Since markdown doesn’t support alignment at all.
            </p>
            <div className="flex flex-col border border-black/[.32] border-dashed grow h-full w-full rounded-2xl overflow-hidden min-h-[450px]">
              <Mdx ref={ref} />
            </div>
            <CtaEditor />
            <div className="flex justify-between self-stretch items-start">
              <Button
                onClick={resetSections}
                variant={"default"}
                className="px-3 py-2 flex items-center gap-2 rounded-lg border border-black hover:bg-red-500 hover:text-white bg-black/[.16]"
              >
                <RotateCw size={14} />
                <p className="text-[12.8px] font-normal tracking-normal">
                  Reset Arrangement
                </p>
              </Button>

              <Button
                onClick={() => setIsRearranging(!isRearranging)}
                variant={"default"}
                className="bg-gold hover:bg-gold/60"
              >
                <Move size={14} color="black" />
                <p className="text-[12.8px] font-normal tracking-normal">
                  {isRearranging ? "Done" : "Arrange"}
                </p>
              </Button>
            </div>
            {/* Section Reorder */}
            <Reorder.Group
              axis="y"
              values={sections}
              onReorder={setSections}
              className="flex flex-col gap-4 w-full"
            >
              {sections
                .filter((key) => defaultSections.includes(key))
                .sort(
                  (a, b) =>
                    defaultSections.indexOf(a) - defaultSections.indexOf(b),
                )
                .map((key) => (
                  <Reorder.Item
                    key={key}
                    value={key}
                    className="relative bg-white rounded-lg shadow-md"
                  >
                    {sectionComponents[key]}
                  </Reorder.Item>
                ))}
            </Reorder.Group>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailEditor;
