import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface Props {
  classnames?: string;
}
const LayoutContainer = ({ children, classnames }: PropsWithChildren & Props) => {
  return (
    <div className={cn("flex items-start gap-8 p-8 w-full", classnames)}>
      {children}
    </div>
  );
};

export default LayoutContainer;

