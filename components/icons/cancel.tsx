import React from "react";

interface IClassName {
  className?: string;
}

const CancelIcon = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      className={className}
    >
      <path
        d="M9.50002 3.37793L2.5 10.3779M2.5 3.37793L9.50002 10.3779"
        stroke="currentColor"
        stroke-opacity="0.5"
        strokeWidth="0.875"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CancelIcon;
