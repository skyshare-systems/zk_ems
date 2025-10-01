"use client";

import ContainerMain from "@/components/container-main";
import ContainerSidebar from "@/components/container-sidebar";
import BadgeAlertIcon from "@/components/icons/badge-alert";
import LayoutContainer from "@/components/layout-container";
import TemplateRenderer from "@/components/template-renderer";
import TemplateSelection from "@/components/template-selection";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/icon-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getTemplates } from "@/lib/query/templates";
import { useCompanyStore } from "@/store/company";
import { useCreateEmailStore } from "@/store/create-email";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "react-use";
const CreateNewEmail = () => {
  const { user } = useUserStore();
  const { company } = useCompanyStore();
  const { selectedTemplate, reset, setSelectedTemplate } =
    useCreateEmailStore();

  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: templates, isLoading: templatesIsLoading } = useQuery({
    queryKey: ["templates", company?.id, debouncedTitle, user?.id, page],
    queryFn: () =>
      getTemplates({
        params:
          `userId=${user?.id}&companyId=${company?.id}` +
          (debouncedTitle
            ? `&title=${debouncedTitle}`
            : "" + `&page=${page}&limit=${limit}`),
      }),
    enabled: !!user && !!company,
  });

  const [, cancel] = useDebounce(
    () => {
      setSelectedTemplate(null);
      setDebouncedTitle(title);
    },
    1500,
    [title],
  );

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  if(!company) return null;

  return (
    <div className="flex flex-col lg:flex-row">
      <LayoutContainer classnames="lg:sticky w-fit h-screen p-0 top-0 left-0 pb-28 w-full lg:w-fit ">
        <ContainerSidebar classname="p-2 lg:p-8 w-full relative">
          <div className="flex items-center gap-1">
            <SidebarTrigger className=" sm:static" />

            <p className="ty-subheading">Create new email</p>
          </div>
          <IconInput
            startIcon={<Search size={16} />}
            className="w-full flex-1 bg-white/[.04]"
            value={title}
            onChange={onChange}
            placeholder="Type a template name to search..."
          />
          <ScrollArea className="w-full h-full relative">
            <div className="flex flex-col items-start gap-2 flex-1 self-stretch rounded-lg">
              {templatesIsLoading && (
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <TemplateSelection.Skeleton key={index} />
                  ))}
                </>
              )}
              {templates?.data.map((template) => (
                <TemplateSelection template={template} key={template.id} />
              ))}

              {templates?.data.length === 0 && (
                <p className="ty-descriptions text-white/50">
                  No templates found. Please contact the administrators first.
                </p>
              )}
            </div>
            <div className="h-16 w-full linear absolute bottom-0 left-0"></div>
          </ScrollArea>
          {templates && templates?.data.length > 0 && (
            <>
              <div className="absolute bottom-0 left-0  flex justify-between items-center self-stretch w-full px-8">
                <div className="flex items-center gap-2">
                  <p className="ty-descriptions text-white/50">
                    <span className="ty-subtitle text-white font-semibold">
                      1-{templates?.data.length}
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
            </>
          )}
        </ContainerSidebar>
      </LayoutContainer>
      <LayoutContainer classnames="relative p-2 lg:p-8 lg:pl-0 mb-24">
        <ContainerMain>
          <p className="ty-subtitle self-stretch text-white/50">
            {!selectedTemplate ? "Edit your email" : "Email Preview"}
          </p>

          {selectedTemplate ? (
            <TemplateRenderer companyId={company.id}/>
          ) : (
            <div className="flex p-4 flex-col justify-center items-center gap-4 flex-1 self-stretch rounded-2xl">
              <div className="flex flex-col items-center gap-2">
                <BadgeAlertIcon />
                <p className="ty-subheading">Select a template first!</p>
              </div>

              <p className="ty-descriptions text-white/50">
                Please select a template first to create an email!
              </p>
            </div>
          )}
        </ContainerMain>
      </LayoutContainer>
    </div>
  );
};

export default CreateNewEmail;
