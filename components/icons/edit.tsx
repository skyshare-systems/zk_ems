import React from "react";

interface IClassName {
  className?: string;
}
const EditIcon = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
    >
      <path
        d="M6.98511 3.46777L10.4941 6.96777"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M7.56958 12.8008H12.8331"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M1.16682 9.30537L9.3114 1.13651C9.31498 1.13291 9.32082 1.13288 9.32444 1.13645L12.8269 4.63416C12.8292 4.63644 12.8292 4.64012 12.8269 4.6424L4.66211 12.8006H1.16675L1.16682 9.30537Z"
        stroke="currentColor"
      />
    </svg>
  );
};

export default EditIcon;
