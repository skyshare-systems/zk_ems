"use client";

import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  Database,
  LogOut,
  ServerCog,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/store/user";
import { Separator } from "./ui/separator";
import { useCompanyStore } from "@/store/company";
import { useSmtpModalStore } from "@/store/smtp";
import { useState } from "react";
import { useStorageModalStore } from "@/store/storage";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, setUser } = useUserStore();
  const { company } = useCompanyStore();
  const { onOpen: onOpenSmtpModal } = useSmtpModalStore();
  const { onOpen: onOpenStorageModal } = useStorageModalStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  function handleLogout() {
    setUser(null);
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-black"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image} alt={user?.username} />
                <AvatarFallback className="rounded-lg">
                  {user.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user.emailAddress}
                </span>
              </div>
              <ChevronRight className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="flex justify-between items-center text-xs text-muted-foreground py-3">
              <p className="ty-descriptions">Account</p>
              <p className="ty-descriptions">
                Role: <span className="text-gold">{user.role}</span>
              </p>
            </DropdownMenuLabel>
            <Separator />
            <DropdownMenuItem
              onClick={() => {
                onOpenSmtpModal();
                setIsOpen(false);
              }}
              className="py-3 cursor-pointer"
            >
              <ServerCog />
              Configure <span className="text-gold">{company?.name}</span>
              SMTP
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onOpenStorageModal();
                setIsOpen(false);
              }}
              className="py-3 cursor-pointer"
            >
              <Database />
              Configure <span className="text-gold">{company?.name}</span>
              Storage
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="py-3 cursor-pointer"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
