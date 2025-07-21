import React from "react";

interface IClassName {
  className?: string;
}

const SentEmailsIcon = ({ className }: IClassName) => {
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
        d="M12.8334 7.66998C12.8334 7.38333 12.8303 6.80496 12.8242 6.51749C12.7861 4.72926 12.767 3.83514 12.1072 3.17281C11.4474 2.51047 10.5291 2.4874 8.69245 2.44126C7.56049 2.41281 6.43967 2.41281 5.30773 2.44125C3.47111 2.48739 2.55279 2.51046 1.89297 3.1728C1.23314 3.83514 1.21408 4.72925 1.17594 6.51749C1.16368 7.09248 1.16369 7.66403 1.17595 8.23902C1.21408 10.0273 1.23315 10.9214 1.89297 11.5837C2.55279 12.2461 3.47111 12.2691 5.30773 12.3152C5.77601 12.327 6.24239 12.3339 6.70842 12.3359"
        stroke="currentColor"
        strokeWidth="0.875"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.16675 3.87793L5.19934 6.16729C6.67266 7.00372 7.32751 7.00372 8.80083 6.16729L12.8334 3.87793"
        stroke="currentColor"
        strokeWidth="0.875"
        stroke-linejoin="round"
      />
      <path
        d="M12.8334 10.5863H8.16675M12.8334 10.5863C12.8334 10.1778 11.6701 9.41464 11.3751 9.12793M12.8334 10.5863C12.8334 10.9947 11.6701 11.7579 11.3751 12.0446"
        stroke="currentColor"
        strokeWidth="0.875"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SentEmailsIcon;
