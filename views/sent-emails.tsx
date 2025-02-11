import ContainerMain from "@/components/container-main";
import ContainerSidebar from "@/components/container-sidebar";
import LayoutContainer from "@/components/layout-container";
import SentEmail from "@/components/sent-email";
import SentEmailRenderer from "@/components/sent-email-renderer";
import TemplateRenderer from "@/components/template-renderer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSentEmails } from "@/lib/query/sent-emails";
import { useCompanyStore } from "@/store/company";
import { useSentEmailStore } from "@/store/sent-email";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert } from "lucide-react";
import React from "react";

const SentEmails = () => {
  const { user } = useUserStore();
  const { company } = useCompanyStore();
  const {selectedSentEmail} = useSentEmailStore();

  // TODO: Implement Search functionality.

  const { data: sentEmails } = useQuery({
    queryKey: ["sent-emails", company?.id, user?.id],
    queryFn: () =>
      getSentEmails({
        params: `userId=${user?.id}&companyId=${company?.id}`,
      }),
    enabled: !!company?.id && !!user?.id,
  });



  return (
    <LayoutContainer>
      <ContainerSidebar>
        <p className="ty-subheading">Sent Emails</p>
        <Input placeholder="Search" className="w-full" />
        <ScrollArea className="h-[calc(100vh-380px)] md:h-[calc(100vh-340px)] lg:h-[calc(100vh-300px)]  w-full">
          <div className="flex flex-col items-start gap-2 flex-1 self-stretch rounded-lg">
            {sentEmails?.data.map((sentEmail) => (
              <SentEmail sentEmail={sentEmail} key={sentEmail.id} />
            ))}

            {sentEmails?.data.length === 0 && (
              <p className="ty-descriptions text-white/50">
                No sent emails found. Blasted email will display here.
              </p>
            )}
          </div>
        </ScrollArea>
      </ContainerSidebar>
      <ContainerMain>
        <p className="ty-subtitle self-stretch text-white/50">Email Preview</p>

        {selectedSentEmail ? (
          <SentEmailRenderer />
        ) : (
          <div className="flex p-4 flex-col justify-center items-center gap-4 flex-1 self-stretch rounded-2xl">
            <div className="flex flex-col items-center gap-2">
              <BadgeAlert size={48} />
              <p className="ty-subheading">Select an email first!</p>
            </div>

            <p className="ty-descriptions text-white/50">
              Please select a sent email to view!
            </p>
          </div>
        )}
      </ContainerMain>
    </LayoutContainer>
  );
};

export default SentEmails;
