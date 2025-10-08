import ContainerMain from "@/components/container-main";
import ContainerSidebar from "@/components/container-sidebar";
import TimeScheduleIcon from "@/components/icons/time-schedule";
import LayoutContainer from "@/components/layout-container";
import SentEmail from "@/components/sent-email";
import SentEmailRenderer from "@/components/sent-email-renderer";
import TemplateRenderer from "@/components/template-renderer";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/icon-input";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getSentEmails } from "@/lib/query/sent-emails";
import { cn } from "@/lib/utils";
import { geist } from "@/public/fonts";
import { useCompanyStore } from "@/store/company";
import { useCreateEmailStore } from "@/store/create-email";
import { useSentEmailStore } from "@/store/sent-email";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert, ChevronLeft, ChevronRight, Search } from "lucide-react";
import React, { useState } from "react";
import { useDebounce } from "react-use";

const SentEmails = () => {
  const { user } = useUserStore();
  const { company } = useCompanyStore();
  const { selectedSentEmail, reset: resetSentEmail } = useSentEmailStore();
  const { reset } = useCreateEmailStore();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");

  const { data: sentEmails, isLoading: sentEmailsIsLoading } = useQuery({
    queryKey: ["sent-emails", company?.id, debouncedTitle, user?.id, page],
    queryFn: () =>
      getSentEmails({
        params: `userId=${user?.id}&companyId=${company?.id}&page=${page}&limit=${limit}&title=${debouncedTitle}`,
      }),
    enabled: !!company?.id && !!user?.id,
  });

  const [, cancel] = useDebounce(
    () => {
      resetSentEmail();
      setDebouncedTitle(title);
    },
    1500,
    [title],
  );

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  const isoString = selectedSentEmail?.createdAt?.toString() ?? "";

  const date = new Date(isoString);

  // Format options
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC", // or your local time zone if needed
  };

  const formatted = date.toLocaleString("en-US", options);

  return (
    <div className="flex flex-col lg:flex-row">
      <LayoutContainer classnames="lg:sticky w-fit h-screen p-0 top-0 left-0 pb-28 w-full lg:w-fit ">
        <ContainerSidebar classname="p-2 lg:p-8 w-full relative">
          <div className="flex items-center gap-1">
            <SidebarTrigger className="" />

            <p
              className={cn(geist.className, "ty-subheading text-white_v2-100")}
            >
              Sent Emails
            </p>
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
              {sentEmailsIsLoading && (
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <SentEmail.Skeleton key={index} />
                  ))}
                </>
              )}

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
          </ScrollArea>
          {sentEmails && sentEmails?.data.length > 0 && (
            <>
              <div className="absolute bottom-0 left-0  flex justify-between items-center self-stretch w-full px-8">
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
            </>
          )}
        </ContainerSidebar>
      </LayoutContainer>
      <LayoutContainer classnames="relative p-2 lg:p-8 lg:pl-0 mb-24">
        <ContainerMain>
          <div className="flex justify-between items-center gap-2 w-full">
            <p
              className={cn(
                geist.className,
                "ty-subtitle self-stretch text-white/50",
              )}
            >
              Email Preview
            </p>
            {formatted !== "Invalid Date" && (
              <div className="flex items-center gap-2">
                <TimeScheduleIcon className="text-white_v2-50" />
                <p
                  className={cn(
                    geist.className,
                    "ty-subtitle self-stretch text-white/50",
                  )}
                >
                  {formatted}
                </p>
              </div>
            )}
          </div>

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
    </div>
  );
};

export default SentEmails;
