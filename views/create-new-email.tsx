"use client";

import TemplateRenderer from "@/components/template-renderer";
import TemplateSelection from "@/components/template-selection";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTemplates } from "@/lib/query/templates";
import { cn } from "@/lib/utils";
import { useCompanyStore } from "@/store/company";
import { useCreateEmailStore } from "@/store/create-email";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert } from "lucide-react";
const CreateNewEmail = () => {
  const { user } = useUserStore();
  const { company } = useCompanyStore();
  const { selectedTemplate } = useCreateEmailStore();

  const { data: templates } = useQuery({
    queryKey: ["templates", company?.id, user?.id],
    queryFn: () =>
      getTemplates({
        params: `userId=${user?.id}&companyId=${company?.id}`,
      }),
  });

  return (
    <div className="flex p-2 items-start gap-8 flex-1 self-stretch w-full overflow-hidden">
      <div className="flex max-w-[320px] md:max-w-[unset] min-w-[288px] flex-col items-start gap-4 self-stretch">
        <p className="ty-subheading">Create new email</p>

        <Input placeholder="Search for a template" className="w-full" />
        <ScrollArea className="h-[calc(100vh-380px)] md:h-[calc(100vh-340px)] lg:h-[calc(100vh-300px)]  w-full">
          <div className="flex flex-col items-start gap-2 flex-1 self-stretch rounded-lg">
            {templates?.data.templates.map((template) => (
              <TemplateSelection template={template} key={template.id} />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div
        className={cn(
          "flex w-full flex-col items-center gap-[18px] flex-1 self-stretch",
          !selectedTemplate && "border-b border-b-gray/[.16]"
        )}
      >
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
      </div>
    </div>
  )
};

export default CreateNewEmail;
