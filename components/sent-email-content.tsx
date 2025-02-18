import { useSentEmailStore } from "@/store/sent-email";

const SentEmailContent = () => {
  const { selectedSentEmail } = useSentEmailStore();
  if (!selectedSentEmail) return null;

  return (
    <div className="flex flex-col flex-1 w-full bg-white p-4 h-full ">
      <div className="flex flex-col grow p-4 justify-center items-center gap-2 self-stretch rounded-lg">
        <div
          className="prose w-full max-w-[640px] break-words text-center"
          dangerouslySetInnerHTML={{ __html: selectedSentEmail.email }}
        ></div>
      </div>
    </div>

    /*   <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 p-4">
        <div className="border border-dashed border-gold w-full max-w-[640px] p-4 rounded-lg text-white bg-white shadow-lg">
          <div className="w-full flex justify-center">
            <div
              className="prose w-full max-w-[640px] break-words text-center"
              dangerouslySetInnerHTML={{ __html: selectedSentEmail.email }}
            ></div>
          </div>
        </div>
    </div> */
  );
};

export default SentEmailContent;
