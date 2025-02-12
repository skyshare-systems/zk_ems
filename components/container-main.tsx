import { PropsWithChildren } from "react";

const ContainerMain = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-[calc(100dvh-142px)] flex-1 flex flex-col items-center gap-[18px] grow">
      {children}
    </div>
  );
};

export default ContainerMain;
{/* <div className="flex flex-1 w-full bg-white p-4 h-full">
  <div
    className="prose max-w-none w-full"
    dangerouslySetInnerHTML={{ __html: selectedSentEmail.email }}
  ></div>
</div>;
 */}