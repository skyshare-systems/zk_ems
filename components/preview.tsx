import { useCreateEmailStore } from "@/store/create-email";
import { ScrollArea } from "./ui/scroll-area";

const Preview = () => {
  const { selectedTemplate } = useCreateEmailStore();

  if (!selectedTemplate) return null;



  return (
    <div className="flex flex-col flex-1 w-full bg-white p-4 h-full ">
      <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="rounded-lg p-4 w-full border border-white/[.08]">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: selectedTemplate.header,
              }}
            ></div>
        </div>
      </div>

      <div className="flex flex-col grow p-4 justify-center items-center gap-2 self-stretch rounded-lg">
        <p className="h-full text-black/50 ty-descriptions text-center ">
          Some great email content exists here.
        </p>
      </div>

      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="rounded-lg p-4 w-full">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: selectedTemplate.footer,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
