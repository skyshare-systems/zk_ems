import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props {
  classname?: string;
}

const ContainerSidebar = ({ children, classname }: PropsWithChildren & Props) => {
  return (
    <div
      className={cn(
        "flex lg:min-w-[400px] w-full flex-col items-start gap-4 self-stretch  flex-1 grow",
        classname
      )}
    >
      {children}
    </div>
  );
};

export default ContainerSidebar;