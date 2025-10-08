"use client";

import {
  FileChartColumnIncreasing,
  LayoutTemplate,
  MailPlus,
  Notebook,
  Send,
} from "lucide-react";
import React from "react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { getAnalytics } from "@/lib/query/analytics";
import { cn } from "@/lib/utils";
import { useCompanyStore } from "@/store/company";
import { useCreateEmailStore } from "@/store/create-email";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import numeral from "numeral";
import { useIsMobile } from "@/hooks/use-mobile";
import MailAddIcon from "./icons/mail-add";
import { geist } from "@/public/fonts";
import SentEmailsIcon from "./icons/sent-emails";
import TemplatesIcon from "./icons/templates";
import AnalyticsIcon from "./icons/analytics";
import AddressBookIcon from "./icons/address-book";
import RocketRightOutline from "./icons/rocket-right-outline";

interface EllipseIndicatorProps {
  color: string;
}

function EllipseIndicator({ color }: EllipseIndicatorProps) {
  const { open } = useSidebar();

  if (!open) {
    return null;
  }
  return (
    <div
      className={cn(
        "w-2 h-2 rounded-full absolute right-2 top-1/2 -translate-y-1/2",
        `bg-${color}`,
      )}
    ></div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("t");

  const { reset, setMode } = useCreateEmailStore();
  const { company } = useCompanyStore();
  const { open } = useSidebar();

  const { data } = useQuery({
    queryKey: ["analytics", company?.id],
    queryFn: () => getAnalytics({ params: `?companyId=${company?.id}` }),
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {open && (
          <SidebarGroup>
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="flex w-8 h-8 flex-col justify-center items-center gap-2 rounded-lg bg-gold_v2-16">
                <RocketRightOutline className="text-gold_v2-100" />
              </div>
              <div className="flex flex-col items-start gap-2">
                <h4 className="ty-h4 text-white_v2-100">
                  {numeral(data?.data.count).format("0, 0")}
                </h4>
                <p className={cn(geist.className, "ty-subtext opacity-50")}>
                  Emails blasted this {data?.data.month}
                </p>
              </div>
            </div>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                onClick={() => {
                  reset();
                  setMode("create");
                }}
                href={`/dashboard?t=create-new-email`}
              >
                <SidebarMenuButton
                  tooltip={"Create new email"}
                  className={cn(
                    geist.className,
                    "hover:text-black ty-descriptions bg-gold_v2-12 text-gold_v2-100",
                    tab === "create-new-email" && "bg-gold_v2-100 text-black",
                  )}
                >
                  {tab === "create-new-email" && (
                    <EllipseIndicator color="black" />
                  )}
                  <MailAddIcon />
                  <span>Create new Email</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                onClick={() => {
                  reset();
                  setMode("forward");
                }}
                href={`/dashboard?t=sent-emails`}
              >
                <SidebarMenuButton
                  tooltip={"Sent Emails"}
                  className={cn(
                    geist.className,
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "sent-emails" && "text-white",
                  )}
                >
                  {tab === "sent-emails" && <EllipseIndicator color="white" />}
                  <SentEmailsIcon />
                  <span>Sent Emails</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link onClick={reset} href={`/dashboard?t=templates`}>
                <SidebarMenuButton
                  tooltip={"Templates"}
                  className={cn(
                    geist.className,
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "templates" && "text-white",
                  )}
                >
                  {tab === "templates" && <EllipseIndicator color="white" />}
                  <TemplatesIcon />
                  <span>Templates</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link
                onClick={reset}
                href={`/dashboard?t=analytics`}
                className="pointer-events-none"
              >
                <SidebarMenuButton
                  tooltip={"Analytics"}
                  className={cn(
                    geist.className,
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "analytics" && "text-white",
                  )}
                >
                  {tab === "analytics" && <EllipseIndicator color="white" />}
                  <AnalyticsIcon />
                  <span>Analytics </span>
                  <div className="rounded-full flex px-2 py-1 bg-white/[.05] ty-subtext">
                    Coming soon!
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                onClick={reset}
                href={`/dashboard?t=address-book`}
                // className="pointer-events-none"
              >
                <SidebarMenuButton
                  tooltip={"Address Book"}
                  className={cn(
                    geist.className,
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "address-book" && "text-white",
                  )}
                >
                  <AddressBookIcon />
                  <span>Address Book</span>

                  {tab === "address-book" && <EllipseIndicator color="white" />}

                  {/* <div className="rounded-full flex px-2 py-1 bg-white/[.05] ty-subtext">
                    Coming soon!
                  </div> */}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
