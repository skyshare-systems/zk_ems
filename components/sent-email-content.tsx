import { useSentEmailStore } from "@/store/sent-email";


const SentEmailContent = () => {
  const { selectedSentEmail } = useSentEmailStore();
  if (!selectedSentEmail) return null;

  return (
    <div className="flex flex-1 w-full bg-white p-4 h-full">
      <div
        className="prose max-w-none w-full"
        dangerouslySetInnerHTML={{ __html: selectedSentEmail.email }}
      ></div>
    </div>
  );
};

export default SentEmailContent;
