import React from "react";

interface IClassName {
  className?: string;
}

const ForwardIcon = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      className={className}
    >
      <path
        d="M9.91675 2.7168L11.6667 4.4668L9.91675 6.2168"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.33325 13.2168V6.46686C2.33325 5.3623 3.22867 4.46687 4.33323 4.46686L11.6666 4.4668"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ForwardIcon;
