import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface Props {
  classnames?: string;
}
const LayoutContainer = ({ children, classnames }: PropsWithChildren & Props) => {
  return (
    <div className={cn("flex p-2 items-start gap-8 ", classnames)}>
      {children}
    </div>
  );
};

export default LayoutContainer;
