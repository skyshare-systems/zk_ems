import { cn } from "@/lib/utils";
import React from "react";

interface IClassName {
  className?: string;
}

const ChevronDownIcon = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      className={cn(className)}
    >
      <path
        d="M1.49976 0.913114L4.99978 4.41309L8.49976 0.913086"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="16"
      />
    </svg>
  );
};

export default ChevronDownIcon;
