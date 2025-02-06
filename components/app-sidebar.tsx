"use client";

import * as React from "react";
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

// This is sample data.
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
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href={`/dashboard?t=create-new-email`}>
                <SidebarMenuButton
                  tooltip={"Create new email"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "create-new-email" && "bg-gold text-black",
                  )}
                >
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
              <Link href={`/dashboard?t=sent-emails`}>
                <SidebarMenuButton
                  tooltip={"Sent Emails"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "sent-emails" && "bg-gold text-black",
                  )}
                >
                  <Send />
                  <span>Sent Emails</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={`/dashboard?t=templates`}>
                <SidebarMenuButton
                  tooltip={"Templates"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "templates" && "bg-gold text-black",
                  )}
                >
                  <LayoutTemplate />
                  <span>Templates</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={`/dashboard?t=analytics`}>
                <SidebarMenuButton
                  tooltip={"Analytics"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "analytics" && "bg-gold text-black",
                  )}
                >
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
              <Link href={`/dashboard?t=address-book`}>
                <SidebarMenuButton
                  tooltip={"Address Book"}
                  className={cn(
                    "hover:text-black ty-descriptions text-[#7f8082]",
                    tab === "address-book" && "bg-gold text-black",
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
