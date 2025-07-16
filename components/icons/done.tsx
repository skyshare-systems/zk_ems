import React from "react";

interface IClassName {
  className?: string;
}

const DoneIcon = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      className={className}
    >
      <path
        d="M1.91666 6.32959L3.95833 8.37126L10.0833 1.95459"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="square"
      />
    </svg>
  );
};

export default DoneIcon;
