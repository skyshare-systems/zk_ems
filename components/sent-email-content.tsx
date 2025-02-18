import { useSentEmailStore } from "@/store/sent-email";
import { EmailSection } from "./email-section";

export const SentEmailContent = () => {
  const { selectedSentEmail } = useSentEmailStore();
  if (!selectedSentEmail) return null;

  return (
    <div className="flex flex-col flex-1 w-full bg-white p-4 h-full">
      <EmailSection content={selectedSentEmail.header} />
      <div className="flex flex-col grow">
        <EmailSection content={selectedSentEmail.body} />
      </div>
      <EmailSection content={selectedSentEmail.footer} />
    </div>
  );
};
