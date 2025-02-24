import { useCreateEmailStore } from "@/store/create-email";
import { useSentEmailStore } from "@/store/sent-email";
import { EmailSection } from "./email-section";

// Preview Component
export const Preview = () => {
  const { selectedTemplate } = useCreateEmailStore();
  if (!selectedTemplate) return null;

  return (
    <div className="flex flex-col flex-1 w-full bg-white p-4 h-full">
      <EmailSection content={selectedTemplate.header} />

      <div className="flex flex-col grow p-4 justify-center items-center gap-2 self-stretch rounded-lg">
        <p className="h-full text-black/50 ty-descriptions text-center">
          Some great email content exists here.
        </p>
      </div>

      <EmailSection content={selectedTemplate.footer} />
    </div>
  );
};
