import React from "react";

interface IClassName {
  className?: string;
}

const AnalyticsIcon = ({ className }: IClassName) => {
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
        d="M1.45825 7.87759C1.45825 5.26523 1.45825 3.95905 2.26981 3.14749C3.08137 2.33594 4.38755 2.33594 6.99992 2.33594C9.61226 2.33594 10.9185 2.33594 11.7301 3.14749C12.5416 3.95905 12.5416 5.26523 12.5416 7.87759C12.5416 10.49 12.5416 11.7961 11.7301 12.6077C10.9185 13.4193 9.61226 13.4193 6.99992 13.4193C4.38755 13.4193 3.08137 13.4193 2.26981 12.6077C1.45825 11.7961 1.45825 10.49 1.45825 7.87759Z"
        stroke="currentColor"
        stroke-width="0.875"
      />
      <path
        d="M1.45825 6.12793H12.5416"
        stroke="currentColor"
        stroke-width="0.875"
        stroke-linejoin="round"
      />
      <path
        d="M4.08325 4.37793H4.08849"
        stroke="currentColor"
        stroke-width="1.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.4165 4.37793H6.42175"
        stroke="currentColor"
        stroke-width="1.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.91659 10.7946C9.91659 9.18378 8.61074 7.87793 6.99992 7.87793C5.38909 7.87793 4.08325 9.18378 4.08325 10.7946"
        stroke="currentColor"
        stroke-width="0.875"
        stroke-linecap="round"
      />
      <path
        d="M7.41235 9.79883L6.5874 10.6238"
        stroke="currentColor"
        stroke-width="0.875"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AnalyticsIcon;
