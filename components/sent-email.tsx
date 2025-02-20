"use client";

import { cn, localizedTime } from "@/lib/utils";
import { useSentEmailStore } from "@/store/sent-email";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

export type SentEmailWithTemplateAndCount = Prisma.SentEmailGetPayload<{
  include: {
    _count: {
      select: { recipients: true };
    };
    template: true;
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
        "flex p-3 flex-col justify-center items-start gap-2 self-stretch rounded-xl border border-white/[.08] duration-200 hover:bg-white/[.08]",
        selectedSentEmail === sentEmail &&
          "bg-white/[.08] border border-white/[.08]"
      )}
    >
      {/* BADGES */}
      <div className="flex flex-wrap items-start gap-1">
        {sentEmail.template.tags.map((tag) => (
          <div
            key={tag}
            className="bg-gold/[.08] rounded-[4px] flex px-2 py-1 justify-center items-start gap-2"
          >
            <p className="text-gold text-[12.8px]">{tag}</p>
          </div>
        ))}

        <div className="bg-white/[.04] rounded-[4px] flex px-2 py-1 justify-center items-start gap-2 text-white/50 text-[12.24px]">
          <p className="self-stretch line-clamp-1 text-ellipsis">
            {sentEmail.template.name}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-center items-center gap-2 self-stretch">
        <p className="ty-title self-stretch">{sentEmail.template.subject}</p>
        <p className="text-white/[.32] text-ellipsis overflow-hidden line-clamp-3 text-[12.24px] self-stretch">
          {sentEmail.template.description}
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-end self-stretch">
        <div className="flex px-2 py-1 items-center gap-1 rounded bg-white/[.04]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <g opacity="0.5">
              <path
                d="M9.30805 10.5H9.55315C10.1281 10.5 10.5853 10.2381 10.9959 9.8718C12.039 8.9413 9.58705 8 8.75 8M7.75 3.03438C7.86355 3.01186 7.98145 3 8.1024 3C9.01235 3 9.75 3.67158 9.75 4.5C9.75 5.32842 9.01235 6 8.1024 6C7.98145 6 7.86355 5.98815 7.75 5.9656"
                stroke="white"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
              <path
                d="M2.24066 8.5556C1.65117 8.8715 0.105569 9.51655 1.04694 10.3237C1.5068 10.718 2.01896 11 2.66286 11H6.33715C6.98105 11 7.4932 10.718 7.95305 10.3237C8.89445 9.51655 7.34885 8.8715 6.75935 8.5556C5.377 7.8148 3.623 7.8148 2.24066 8.5556Z"
                stroke="white"
                strokeWidth="0.75"
              />
              <path
                d="M6.5 4.25C6.5 5.35457 5.60455 6.25 4.5 6.25C3.39543 6.25 2.5 5.35457 2.5 4.25C2.5 3.14543 3.39543 2.25 4.5 2.25C5.60455 2.25 6.5 3.14543 6.5 4.25Z"
                stroke="white"
                strokeWidth="0.75"
              />
            </g>
          </svg>

          <p className="text-white/50 ty-subtitle">
            {sentEmail._count.recipients}
          </p>
        </div>

        <p className="text-[10.24px] text-white/[.8]">
          {localizedTime(sentEmail.createdAt, "MMMM d yyyy • h:mm a")}
        </p>
      </div>

      {/* actions */}
      {/*   <div className="flex p-2 items-center gap-1 "></div> */}
    </div>
  );
};

export default SentEmail;
