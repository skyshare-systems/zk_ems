"use client";

import { ChevronsUpDown } from "lucide-react";

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
import { getCompanies } from "@/lib/query/company";
import { CompanyWithConfigs, useCompanyStore } from "@/store/company";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";
import { Company } from "@prisma/client";
import { useSentEmailStore } from "@/store/sent-email";
import { useCreateEmailStore } from "@/store/create-email";
import { cn } from "@/lib/utils";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { user } = useUserStore();
  const { setSelectedSentEmail } = useSentEmailStore();
  const { setSelectedTemplate } = useCreateEmailStore();
  const { company, setCompany } = useCompanyStore();

  const { data } = useQuery({
    queryKey: ["companies", company?.id, user?.id],
    queryFn: () =>
      getCompanies({
        params: `page=1&limit=10&userId=${user?.id}`,
      }),
    enabled: !!user,
  });

  useEffect(() => {
    if (data?.data && !company) {
      setCompany(data.data[0]);
    }
  }, [company, data, setCompany]);

  if (!company) return null;

  function handleChangeCompany(company: CompanyWithConfigs) {
    setCompany(company);
    setSelectedTemplate(null);
    setSelectedSentEmail(null);
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {company.image ? (
                <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src={company.image}
                    width={64}
                    height={64}
                    alt={company.name}
                    className="rounded-lg size-12"
                  />
                </div>
              ) : (
                <div className="flex size-12 justify-center items-center rounded-lg border-[.70px] border-white/[.16] bg-black">
                  <p className="text-white/[.32]">?</p>
                </div>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-[10.24px] text-white/50">
                  You are currently using
                </span>
                <span className="truncate text-[14px]">{company.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "bottom"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Switch to
            </DropdownMenuLabel>
            {data &&
              data.data.map((c) => (
                <DropdownMenuItem
                  key={c.name}
                  onClick={() => handleChangeCompany(c)}
                  className={cn(
                    "gap-2 p-2 rounded-lg",
                    c.id === company.id && "text-gold bg-gold/[.08]"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center gap-2 self-start opacity-[.72]"
                    )}
                  >
                    {c.image ? (
                      <div className="flex w-8 h-8 justify-center items-center rounded-lg border-[.70px] border-white/[.16] bg-black">
                        <Image
                          src={c.image}
                          width={44}
                          height={44}
                          alt={c.name}
                        />
                      </div>
                    ) : (
                      <div className="flex w-8 h-8 justify-center items-center rounded-lg border-[.70px] border-white/[.16] bg-black">
                        <p className="text-white/[.32]">?</p>
                      </div>
                    )}

                    <p className="ty-descriptions">{c.name}</p>
                  </div>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
