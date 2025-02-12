import ContainerMain from "@/components/container-main";
import ContainerSidebar from "@/components/container-sidebar";
import LayoutContainer from "@/components/layout-container";
import SentEmail from "@/components/sent-email";
import SentEmailRenderer from "@/components/sent-email-renderer";
import TemplateRenderer from "@/components/template-renderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSentEmails } from "@/lib/query/sent-emails";
import { useCompanyStore } from "@/store/company";
import { useSentEmailStore } from "@/store/sent-email";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const SentEmails = () => {
  const { user } = useUserStore();
  const { company } = useCompanyStore();
  const { selectedSentEmail } = useSentEmailStore();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // TODO: Implement Search functionality.

  const { data: sentEmails } = useQuery({
    queryKey: ["sent-emails", company?.id, user?.id, page],
    queryFn: () =>
      getSentEmails({
        params: `userId=${user?.id}&companyId=${company?.id}&page=${page}&limit=${limit}`,
      }),
    enabled: !!company?.id && !!user?.id,
  });

  return (
    <LayoutContainer>
      <ContainerSidebar>
        <p className="ty-subheading">Sent Emails</p>
        <Input placeholder="Search" className="w-full" />
        <ScrollArea className="h-[calc(100vh-380px)] md:h-[calc(100vh-340px)] lg:h-[calc(100vh-300px)]  w-full relative">
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

          <div className="h-16 w-full linear absolute bottom-0 left-0"></div>
          <div className="absolute bottom-0 left-0  flex justify-between items-center self-stretch w-full">
            <div className="flex items-center gap-2">
              <p className="ty-descriptions text-white/50">
                <span className="ty-subtitle text-white font-semibold">
                  1-{sentEmails?.data.length}
                </span>{" "}
                of{" "}
                <span className="ty-subtitle text-white font-semibold">
                  {sentEmails?.meta?.totalPage}
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
                disabled={page === sentEmails?.meta?.totalPage}
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
