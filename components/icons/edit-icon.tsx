import { cn } from "@/lib/utils";
import React from "react";

interface IClassName {
  className?: string;
}

const EditIcon = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      className={cn(className)}
    >
      <path
        d="M7.60705 3.65428L8.3079 2.9534C8.695 2.56631 9.3226 2.56631 9.7097 2.9534C10.0968 3.34048 10.0968 3.96807 9.7097 4.35516L9.0088 5.05604M7.60705 3.65428L3.49012 7.77123C2.96747 8.29388 2.70613 8.55519 2.52818 8.87364C2.35023 9.19209 2.1712 9.94403 2 10.6631C2.71905 10.4919 3.471 10.3128 3.78945 10.1349C4.1079 9.95693 4.36922 9.69564 4.89188 9.17299L9.0088 5.05604M7.60705 3.65428L9.0088 5.05604"
        stroke="currentColor"
        stroke-width="0.875"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.5 10.6631H8.5"
        stroke="currentColor"
        stroke-width="0.875"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default EditIcon;
