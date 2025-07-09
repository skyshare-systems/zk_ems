import React from "react";

interface IClassName {
  className?: string;
}

const AddressBookIcon = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      className={className}
    >
      <g opacity="0.5">
        <path
          d="M12.8333 8.54492V6.21159C12.8333 4.0117 12.8333 2.91176 12.1498 2.22834C11.4664 1.54492 10.3665 1.54492 8.16659 1.54492H6.99992C4.80003 1.54492 3.70009 1.54492 3.01667 2.22834C2.33325 2.91176 2.33325 4.0117 2.33325 6.21159V8.54492C2.33325 10.7448 2.33325 11.8448 3.01667 12.5282C3.70009 13.2116 4.80003 13.2116 6.99992 13.2116H8.16659C10.3665 13.2116 11.4664 13.2116 12.1498 12.5282C12.8333 11.8448 12.8333 10.7448 12.8333 8.54492Z"
          stroke="currentColor"
          stroke-width="0.875"
        />
        <path
          d="M2.91675 3.87793H1.16675M2.91675 7.37793H1.16675M2.91675 10.8779H1.16675"
          stroke="currentColor"
          stroke-width="0.875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.2083 4.46094H7.875M9.04167 6.79427H7.875"
          stroke="currentColor"
          stroke-width="0.875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.25 13.2116V1.54492"
          stroke="currentColor"
          stroke-width="0.875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

export default AddressBookIcon;
