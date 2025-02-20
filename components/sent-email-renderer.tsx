"use client";

import { useSentEmailStore } from "@/store/sent-email";
import { SentEmailContent } from "./sent-email-content";

const SentEmailRenderer = () => {
  const { selectedSentEmail } = useSentEmailStore();

  if (!selectedSentEmail) return null;


  return (
    <div className="flex p-4 flex-col  gap-6 self-stretch rounded-2xl bg-white/[.08] h-full grow w-full">
      <div className="flex flex-col grow justify-center items-start gap-4 self-stretch h-full">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex items-center gap-2 self-stretch ">
            <p className="ty-descriptions text-white/[.32] w-[96px]">Subject</p>
            <p className="ty-title text-white">
              {selectedSentEmail?.subject}
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch flex-wrap ">
            <p className="ty-descriptions text-white/[.32] w-[96px]">
              Recipients
            </p>
            {selectedSentEmail?.recipients.slice(0, 5).map((recipient) => (
              <div
                className="px-2 py-1 flex justify-normal items-center gap-2 rounded-full bg-white/[.04]"
                key={recipient.id}
              >
                <p className="ty-subtext text-white/[.72]">
                  {recipient.emailAddress}
                </p>
              </div>
            ))}

            {selectedSentEmail?.recipients.length === 0 && (
              <p className="ty-subtext text-white/[.72]">No recipients</p>
            )}

            {selectedSentEmail && selectedSentEmail?.recipients.length > 5 && (
              <div className="px-2 py-1 flex justify-normal items-center gap-2 rounded-full bg-white/[.04]">
                <p className="ty-subtext text-white/[.72]">
                  +{selectedSentEmail?.recipients.length - 5} more
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full grow bg-white/[.04] rounded-2xl border border-dashed border-gold overflow-hidden h-full">
          <SentEmailContent />
        </div>
      </div>
    </div>
  );
};

export default SentEmailRenderer;
