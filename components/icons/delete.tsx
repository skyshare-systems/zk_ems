import { cn } from "@/lib/utils";
import React from "react";

interface IClassName {
  className?: string;
}

const DeleteIcon = ({ className }: IClassName) => {
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
        d="M9.75 3.41309L9.44015 8.42564C9.36095 9.70629 9.3214 10.3466 9.0004 10.807C8.84165 11.0346 8.63735 11.2267 8.40035 11.3711C7.92105 11.6631 7.2795 11.6631 5.99635 11.6631C4.71156 11.6631 4.06915 11.6631 3.58952 11.3705C3.3524 11.2259 3.148 11.0335 2.98934 10.8055C2.66844 10.3444 2.62972 9.70314 2.5523 8.42069L2.25 3.41309"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M1.5 3.41309H10.5M8.02785 3.41309L7.68655 2.70895C7.4598 2.24122 7.3464 2.00735 7.15085 1.86149C7.1075 1.82914 7.06155 1.80036 7.0135 1.77544C6.79695 1.66309 6.53705 1.66309 6.01725 1.66309C5.4844 1.66309 5.218 1.66309 4.99784 1.78015C4.94905 1.80609 4.90249 1.83604 4.85864 1.86967C4.66082 2.02144 4.55032 2.26386 4.32931 2.74872L4.02646 3.41309"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M4.75 8.91309V5.91309"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M7.25 8.91309V5.91309"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DeleteIcon;
