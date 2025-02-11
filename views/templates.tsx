"use client";

import ContainerMain from "@/components/container-main";
import ContainerSidebar from "@/components/container-sidebar";
import LayoutContainer from "@/components/layout-container";
import TemplatePreview from "@/components/template-preview";
import TemplateRenderer from "@/components/template-renderer";
import TemplateSelection from "@/components/template-selection";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTemplates } from "@/lib/query/templates";
import { useCompanyStore } from "@/store/company";
import { useCreateEmailStore } from "@/store/create-email";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
const Templates = () => {
  const { user } = useUserStore();
  const { company } = useCompanyStore();
  const { selectedTemplate, setSelectedTemplate, reset } =
    useCreateEmailStore();
  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");

  const { data: templates } = useQuery({
    queryKey: ["templates", company?.id, debouncedTitle],
    queryFn: () =>
      getTemplates({
        params:
          `userId=${user?.id}&companyId=${company?.id}` +
          (debouncedTitle ? `&title=${debouncedTitle}` : ""),
      }),
  });

  const [, cancel] = useDebounce(
    () => {
      setDebouncedTitle(title);
    },
    1500,
    [title]
  );
  return (
    <LayoutContainer classnames="relative">
      <ContainerSidebar>
        <p className="ty-subheading">Brand Email Templates</p>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search"
          className="w-full"
        />

        <ScrollArea className="h-[calc(100vh-380px)] md:h-[calc(100vh-340px)] lg:h-[calc(100vh-300px)] w-full">
          <div className="flex flex-col items-start gap-2 flex-1 self-stretch rounded-lg">
            {templates?.data.templates
              .filter((template) => template.name.includes(debouncedTitle))
              .map((template) => (
                <TemplateSelection template={template} key={template.id} />
              ))}

            {templates?.data.templates.length === 0 && (
              <p className="ty-descriptions text-white/50">
                No templates found. Please contact the administrators first.
              </p>
            )}
          </div>
        </ScrollArea>
      </ContainerSidebar>
      <ContainerMain>
        {selectedTemplate && (
          <p className="ty-subtitle self-stretch text-white/50">
            Template Preview
          </p>
        )}

        {selectedTemplate && <TemplatePreview />}

        {/*   <div className="flex p-4 flex-col justify-center items-center gap-4 flex-1 self-stretch rounded-2xl">
            <div className="flex flex-col items-center gap-2">
              <BadgeAlert size={48} />
              <p className="ty-subheading">Select a template first!</p>
            </div>

            <p className="ty-descriptions text-white/50">
              Please select a template to view!
            </p>
          </div> */}
      </ContainerMain>

      {templates?.data.templates.length === 0 && (
        <div className="absolute h-full grow flex-1 inset-0 flex items-center justify-center -z-10">
          <div className="flex flex-col justify-center items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                stroke="#F3BC30"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 34C17.8242 31.5712 20.7286 30 24 30C27.2714 30 30.1758 31.5712 32 34"
                stroke="#F3BC30"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.0179 18H16M32 18H31.982"
                stroke="#F3BC30"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="text-gold">Uh-oh!</p>
            <p className="text-[14px] text-white/50">
              You have no template for this brand.
            </p>
            <p className="text-[14px] text-white/50">
              Contact the developers to create one.
            </p>
          </div>
        </div>
      )}
    </LayoutContainer>
  );
};

export default Templates;
