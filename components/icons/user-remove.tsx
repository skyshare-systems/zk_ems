import React from "react";

interface IClassName {
  className?: string;
}

const UserRemoveIcon = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      className={className}
    >
      <path
        d="M7.33337 10.2113H6.00004C3.42271 10.2113 1.33337 12.3006 1.33337 14.8779H12C12 12.3006 9.9107 10.2113 7.33337 10.2113Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33337 5.5446C9.33337 7.01736 8.13947 8.21126 6.66671 8.21126C5.19395 8.21126 4.00004 7.01736 4.00004 5.5446C4.00004 4.07184 5.19395 2.87793 6.66671 2.87793C8.13947 2.87793 9.33337 4.07184 9.33337 5.5446Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 6.21094L13 7.8776M13 7.8776L11.3334 9.54427M13 7.8776L14.6667 9.54427M13 7.8776L11.3334 6.21094"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserRemoveIcon;
