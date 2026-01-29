"use client";

import { cn, localizedTime } from "@/lib/utils";
import { useSentEmailStore } from "@/store/sent-email";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { Skeleton } from "./ui/skeleton";
import { albert_sans, geist } from "@/public/fonts";
import UserMultiple from "./icons/user-multiple";

export type SentEmailWithTemplateAndCount = Prisma.SentEmailGetPayload<{
  include: {
    _count: {
      select: { recipients: true };
    };
    template: {
      include: {
        company: true;
      };
    };
    recipients: true;
  };
}>;

interface Props {
  sentEmail: SentEmailWithTemplateAndCount;
}

const SentEmail = ({ sentEmail }: Props) => {
  const { setSelectedSentEmail, selectedSentEmail } = useSentEmailStore();

  return (
    <div
      onClick={() => {
        if (selectedSentEmail?.id === sentEmail.id) {
          setSelectedSentEmail(null);
        } else {
          setSelectedSentEmail(sentEmail);
        }
      }}
      className={cn(
        "flex p-3 flex-col justify-center items-start gap-2 self-stretch rounded-xl ] border border-transparent hover:border-white/[.08] duration-200 hover:hover:bg-white/[.08]",
        selectedSentEmail === sentEmail
          ? "bg-white/[.08] border border-white/[.08] opacity-100"
          : "opacity-[.72] hover:opacity-100",
      )}
    >
      {/* BADGES */}
      <div className="flex flex-wrap items-start gap-1">
        {sentEmail.template.tags.map((tag, index) => (
          <div
            key={tag}
            className={cn(
              `${index === 0 ? "bg-gold_v2-8 text-gold_v2-100" : "bg-white_v2-4 text-white_v2-50"}`,
              "rounded-[4px] flex px-2 py-1 justify-center items-start gap-2",
            )}
          >
            <p className={cn(albert_sans.className, "ty-subtext capitalize")}>
              {tag}
            </p>
          </div>
        ))}
        {/* 
        <div className="bg-white/[.04] rounded-[4px] flex px-2 py-1 justify-center items-start gap-2 text-white/50 text-[12.24px]">
          <p className="self-stretch line-clamp-1 text-ellipsis">
            {sentEmail.template.name}
          </p>
        </div> */}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-center items-center gap-1 self-stretch">
        <p className={cn(geist.className, "ty-title self-stretch")}>
          {sentEmail.subject}
        </p>
        <p
          className={cn(
            albert_sans.className,
            "text-white/[.32] text-ellipsis overflow-hidden line-clamp-3 ty-subtext self-stretch",
          )}
        >
          {sentEmail.template.description}
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-end self-stretch">
        <div className="flex px-2 py-1 items-center gap-1 rounded bg-white/[.04]">
          <UserMultiple className="opacity-50" />

          <p className={cn(geist.className, "text-white_v2-100 ty-subtitle")}>
            {sentEmail._count.recipients}
          </p>
        </div>

        <p className={cn(geist.className, "ty-outline text-white_v2-50")}>
          {localizedTime(sentEmail.createdAt, "MMMM d yyyy • h:mm a")}
        </p>
      </div>

      {/* actions */}
      {/*   <div className="flex p-2 items-center gap-1 "></div> */}
    </div>
  );
};

export default SentEmail;

export function SentEmailSeketlon() {
  return <Skeleton className="h-40 w-full" />;
}

SentEmail.Skeleton = SentEmailSeketlon;
