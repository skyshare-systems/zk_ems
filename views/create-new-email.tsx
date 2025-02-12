"use client";

import ContainerMain from "@/components/container-main";
import ContainerSidebar from "@/components/container-sidebar";
import LayoutContainer from "@/components/layout-container";
import TemplateRenderer from "@/components/template-renderer";
import TemplateSelection from "@/components/template-selection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTemplates } from "@/lib/query/templates";
import { useCompanyStore } from "@/store/company";
import { useCreateEmailStore } from "@/store/create-email";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
const CreateNewEmail = () => {
  const { user } = useUserStore();
  const { company } = useCompanyStore();
  const { selectedTemplate } = useCreateEmailStore();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: templates } = useQuery({
    queryKey: ["templates", company?.id, user?.id],
    queryFn: () =>
      getTemplates({
        params: `userId=${user?.id}&companyId=${company?.id}&page=${page}&limit=${limit}`,
      }),
    enabled: !!user && !!company,
  });

  return (
    <LayoutContainer>
      <ContainerSidebar>
        <p className="ty-subheading">Create new email</p>
        <Input placeholder="Search for a template" className="w-full" />
        <ScrollArea className="h-[calc(100vh-380px)] md:h-[calc(100vh-340px)] lg:h-[calc(100vh-300px)]  w-full relative">
          <div className="flex flex-col items-start gap-2 flex-1 self-stretch rounded-lg">
            {templates?.data.templates.map((template) => (
              <TemplateSelection template={template} key={template.id} />
            ))}

            {templates?.data.templates.length === 0 && (
              <p className="ty-descriptions text-white/50">
                No templates found. Please contact the administrators first.
              </p>
            )}
          </div>

          <div className="h-16 w-full linear absolute bottom-0 left-0"></div>
          <div className="absolute bottom-0 left-0  flex justify-between items-center self-stretch w-full">
            <div className="flex items-center gap-2">
              <p className="ty-descriptions text-white/50">
                <span className="ty-subtitle text-white font-semibold">
                  1-{templates?.data.templates.length}
                </span>{" "}
                of{" "}
                <span className="ty-subtitle text-white font-semibold">
                  {templates?.meta?.totalPage}
                </span>
              </p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Button
                disabled={page === 1}
                variant={"outline"}
                onClick={() => setPage((prev) => prev - 1)}
                className="h-fit flex p-1 items-start gap-2 rounded border border-gray/[.16]"
              >
                <ChevronLeft size={12} />
                <span className="sr-only">Previous Page</span>
              </Button>
              <Button
                disabled={page === templates?.meta?.totalPage}
                variant={"outline"}
                onClick={() => setPage((prev) => prev + 1)}
                className="h-fit flex p-1 items-start gap-2 rounded border border-gray/[.16]"
              >
                <ChevronRight size={12} />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </ContainerSidebar>
      <ContainerMain>
        <p className="ty-subtitle self-stretch text-white/50">
          {!selectedTemplate ? "Edit your email" : "Email Preview"}
        </p>

        {selectedTemplate ? (
          <TemplateRenderer />
        ) : (
          <div className="flex p-4 flex-col justify-center items-center gap-4 flex-1 self-stretch rounded-2xl">
            <div className="flex flex-col items-center gap-2">
              <BadgeAlert size={48} />
              <p className="ty-subheading">Select a template first!</p>
            </div>

            <p className="ty-descriptions text-white/50">
              Please select a template first to create an email!
            </p>
          </div>
        )}
      </ContainerMain>
    </LayoutContainer>
  );
};

export default CreateNewEmail;
