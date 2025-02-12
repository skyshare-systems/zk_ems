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
} from "@/components/ui/sidebar";
import { getAnalytics } from "@/lib/query/analytics";
import { cn } from "@/lib/utils";
import { useCompanyStore } from "@/store/company";
import { useCreateEmailStore } from "@/store/create-email";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import numeral from "numeral";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("t");

  const { reset } = useCreateEmailStore();
  const { company } = useCompanyStore();

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
        <SidebarGroup>
          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="flex w-8 h-8 flex-col justify-center items-center gap-2 rounded-lg bg-gold/[.16]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 10.1667L12.1232 6.04344C13.2481 4.91858 13.8105 4.35614 14.4312 3.90314C15.7047 2.9737 17.1818 2.36187 18.7395 2.11858C19.4988 2 20.2942 2 21.885 2C21.9681 2 22 2.03812 22 2.11504C22 3.70584 22 4.50125 21.8814 5.26046C21.6381 6.81818 21.0263 8.29527 20.0969 9.56878C19.6439 10.1895 19.0814 10.7519 17.9566 11.8768L13.8333 16"
                  stroke="#F3BC30"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.341 8.09838C8.63808 8.09838 6.49778 7.73765 4.9043 8.39769C3.73671 8.88132 2.87754 10.0012 2 10.8787L5.30597 12.2955C6.18208 12.671 5.64651 13.7766 5.50147 14.5018C5.33985 15.3099 5.34886 15.3397 5.93158 15.9224L8.07758 18.0684C8.6603 18.6511 8.69008 18.6602 9.49816 18.4985C10.2234 18.3535 11.329 17.8179 11.7044 18.694L13.1213 22C13.9988 21.1225 15.1187 20.2633 15.6023 19.0957C16.2624 17.5022 15.9016 15.3619 15.9016 13.659"
                  stroke="#F3BC30"
                  stroke-width="1.125"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 20L11 21"
                  stroke="#F3BC30"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 12L3 13"
                  stroke="#F3BC30"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 4.07996C16.2 4.25996 17.46 4.73996 18.1614 5.45996C19.0576 6.25211 19.68 7.31996 19.92 8.99996"
                  stroke="#F3BC30"
                  stroke-width="1.125"
                  stroke-linecap="square"
                />
                <path
                  d="M17.94 6.06006L16.5 7.50006"
                  stroke="#F3BC30"
                  stroke-width="1.125"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="ty-h4">
                {numeral(data?.data.count).format("0, 0")}
              </h4>
              <p className="ty-subtext opacity-50">
                Emails blasted this {data?.data.month }
              </p>
            </div>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link onClick={reset} href={`/dashboard?t=create-new-email`}>
                <SidebarMenuButton
                  tooltip={"Create new email"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082] bg-gold/[.12] text-gold",
                    tab === "create-new-email" && "bg-gold text-black"
                  )}
                >
                  {tab === "create-new-email" && (
                    <div className="w-2 h-2 rounded-full bg-black absolute right-2 top-1/2 -translate-y-1/2"></div>
                  )}
                  <MailPlus />
                  <span>Create new Email</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link onClick={reset} href={`/dashboard?t=sent-emails`}>
                <SidebarMenuButton
                  tooltip={"Sent Emails"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "sent-emails" && "text-white"
                  )}
                >
                  {tab === "sent-emails" && (
                    <div className="w-2 h-2 rounded-full bg-white absolute right-2 top-1/2 -translate-y-1/2"></div>
                  )}
                  <Send />
                  <span>Sent Emails</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link onClick={reset} href={`/dashboard?t=templates`}>
                <SidebarMenuButton
                  tooltip={"Templates"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "templates" && "text-white"
                  )}
                >
                  {tab === "templates" && (
                    <div className="w-2 h-2 rounded-full bg-white absolute right-2 top-1/2 -translate-y-1/2"></div>
                  )}
                  <LayoutTemplate />
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
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "analytics" && "text-white"
                  )}
                >
                  {tab === "analytics" && (
                    <div className="w-2 h-2 rounded-full bg-white absolute right-2 top-1/2 -translate-y-1/2"></div>
                  )}
                  <FileChartColumnIncreasing />
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
                className="pointer-events-none"
              >
                <SidebarMenuButton
                  tooltip={"Address Book"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "address-book" && "bg-gold text-black"
                  )}
                >
                  <Notebook />
                  <span>Address Book</span>
                  <div className="rounded-full flex px-2 py-1 bg-white/[.05] ty-subtext">
                    Coming soon!
                  </div>
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
