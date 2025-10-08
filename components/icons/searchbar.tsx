import React from "react";

interface IClassName {
  className?: string;
}

const SearchbarIcon = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className={className}
    >
      <path
        d="M10.7083 10.8716L13.3333 13.4966"
        stroke="#F5F8FF"
        strokeOpacity="0.32"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1667 7.07959C12.1667 4.1801 9.81626 1.82959 6.91675 1.82959C4.01725 1.82959 1.66675 4.1801 1.66675 7.07959C1.66675 9.97911 4.01725 12.3296 6.91675 12.3296C9.81626 12.3296 12.1667 9.97911 12.1667 7.07959Z"
        stroke="#F5F8FF"
        strokeOpacity="0.32"
        strokeWidth="0.875"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchbarIcon;
