"use client";

import React, { Suspense, useEffect } from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FileChartColumnIncreasing,
  Frame,
  GalleryVerticalEnd,
  LayoutTemplate,
  MailPlus,
  Map,
  Notebook,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

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
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCreateEmailStore } from "@/store/create-email";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Create new email",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Sent Emails",
      url: "#",
      icon: Bot,
    
    },
    {
      title: "Templates",
      url: "#",
      icon: BookOpen,
      
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const searchParams = useSearchParams();
  const tab = searchParams.get("t");

  const {reset} = useCreateEmailStore();
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
              onClick={reset}
              href={`/dashboard?t=create-new-email`}>
                <SidebarMenuButton
                  tooltip={"Create new email"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    "bg-gold/[.12] text-gold"
                  )}
                >
                  {tab === "create-new-email" && <div className="w-2 h-2 rounded-full bg-gold absolute right-2 top-1/2 -translate-y-1/2"></div>}
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
              <Link
              onClick={reset}
              href={`/dashboard?t=sent-emails`}>
                <SidebarMenuButton
                  tooltip={"Sent Emails"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "sent-emails" && "text-white"
                  )}
                >
                  {tab === "sent-emails" && <div className="w-2 h-2 rounded-full bg-white absolute right-2 top-1/2 -translate-y-1/2"></div>}
                  <Send />
                  <span>Sent Emails</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link
              onClick={reset}
              href={`/dashboard?t=templates`}>
                <SidebarMenuButton
                  tooltip={"Templates"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "templates" && "text-white"
                  )}
                >
                  {tab === "templates" && <div className="w-2 h-2 rounded-full bg-white absolute right-2 top-1/2 -translate-y-1/2"></div>}
                  <LayoutTemplate />
                  <span>Templates</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link
              onClick={reset}
              href={`/dashboard?t=analytics`}>
                <SidebarMenuButton
                  tooltip={"Analytics"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "analytics" && "text-white"
                  )}
                >
                  {tab === "analytics" && <div className="w-2 h-2 rounded-full bg-white absolute right-2 top-1/2 -translate-y-1/2"></div>}
                  <FileChartColumnIncreasing />
                  <span>Analytics</span>
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
              href={`/dashboard?t=address-book`}>
                <SidebarMenuButton
                  tooltip={"Address Book"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "address-book" && "bg-gold text-black"
                  )}
                >
                  <Notebook />
                  <span>Address Book</span>
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
