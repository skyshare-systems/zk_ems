import { LucideProps } from "lucide-react";
import React from "react";

const SentEmail = ({ ...props }: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      {...props}
    >
      <path
        d="M12.8333 7.79175C12.8333 7.5051 12.8302 6.92672 12.8241 6.63925C12.786 4.85102 12.7669 3.95691 12.1071 3.29457C11.4472 2.63224 10.529 2.60917 8.69233 2.56302C7.56037 2.53458 6.43955 2.53458 5.3076 2.56301C3.47099 2.60916 2.55267 2.63223 1.89285 3.29457C1.23302 3.9569 1.21396 4.85102 1.17582 6.63925C1.16356 7.21425 1.16356 7.7858 1.17583 8.36079C1.21396 10.1491 1.23303 11.0431 1.89285 11.7055C2.55267 12.3678 3.47099 12.3909 5.30761 12.437C5.77589 12.4488 6.24227 12.4557 6.70829 12.4577"
        stroke="white"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.16663 4L5.19922 6.28936C6.67253 7.12579 7.32738 7.12579 8.80071 6.28936L12.8333 4"
        stroke="white"
        strokeWidth="0.875"
        strokeLinejoin="round"
      />
      <path
        d="M12.8333 10.7083H8.16663M12.8333 10.7083C12.8333 10.2999 11.67 9.53671 11.375 9.25M12.8333 10.7083C12.8333 11.1168 11.67 11.88 11.375 12.1667"
        stroke="white"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SentEmail;
