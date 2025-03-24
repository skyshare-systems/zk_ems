"use client";

import { ChevronRight, Database, LogOut, ServerCog } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCompanyStore } from "@/store/company";
import { useSmtpModalStore } from "@/store/smtp";
import { useStorageModalStore } from "@/store/storage";
import { useUserStore } from "@/store/user";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "@/lib/mutation/auth/logout";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, setUser } = useUserStore();
  const { company } = useCompanyStore();
  const { onOpen: onOpenSmtpModal } = useSmtpModalStore();
  const { onOpen: onOpenStorageModal } = useStorageModalStore();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: logOutCall } = useMutation({
    mutationFn: logOut,
    mutationKey: ["logout"],
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem("token");
    },
  });

  if (!user) return null;

  function handleLogout() {
    const token = localStorage.getItem("token");
    if (!user || !token) return;

    logOutCall({
      token,
      userId: user.id,
    });
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
                <AvatarImage
                  src={user?.image}
                  alt={user?.username}
                  className="object-contain"
                />
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
            className="min-w-56 rounded-lg"
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
            {user.role === "ADMIN" && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    onOpenSmtpModal();
                    setIsOpen(false);
                  }}
                  className="py-3 cursor-pointer whitespace-nowrap"
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
                  className="py-3 cursor-pointer whitespace-nowrap"
                >
                  <Database />
                  Configure <span className="text-gold">{company?.name}</span>
                  Storage
                </DropdownMenuItem>
                <Separator />
              </>
            )}
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
