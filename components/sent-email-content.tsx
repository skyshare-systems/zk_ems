import { useSentEmailStore } from "@/store/sent-email";
import { EmailSection } from "./email-section";

export const SentEmailContent = () => {
  const { selectedSentEmail } = useSentEmailStore();
  if (!selectedSentEmail) return null;

  return (
    <div className="flex flex-col flex-1 w-full bg-white p-4 h-full ">
      <EmailSection className="mb-[20px]" content={selectedSentEmail.header} />
      <div className="flex flex-col grow p-[20px]">
        <EmailSection content={selectedSentEmail.body} />
      </div>
      <EmailSection className="mt-[20px]" content={selectedSentEmail.footer} />
    </div>
  );
};
