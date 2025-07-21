import React from "react";

interface IClassName {
  className?: string;
}
const TimeScheduleIcon = ({ className }: IClassName) => {
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
        d="M7 5.63379V7.96712L7.875 8.84212"
        stroke="currentColor"
        strokeWidth="0.875"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.4015 10.5646C12.3561 11.08 12.8334 11.3378 12.8334 11.7584C12.8334 12.1791 12.3561 12.4369 11.4015 12.9523L10.7515 13.3033C10.0185 13.6992 9.65194 13.8971 9.47566 13.7532C9.04405 13.4008 9.71646 12.4912 9.88189 12.1689C10.0495 11.8424 10.0465 11.6686 9.88189 11.348C9.71646 11.0257 9.04405 10.1161 9.47566 9.76368C9.65194 9.61977 10.0185 9.81769 10.7515 10.2135L11.4015 10.5646Z"
        stroke="currentColor"
        strokeWidth="0.875"
      />
      <path
        d="M7.59852 13.7701C7.40176 13.7902 7.20203 13.8005 6.99996 13.8005C3.7783 13.8005 1.16663 11.1888 1.16663 7.96712C1.16663 4.74546 3.7783 2.13379 6.99996 2.13379C10.2216 2.13379 12.8333 4.74546 12.8333 7.96712C12.8333 8.36665 12.7931 8.75684 12.7166 9.13379"
        stroke="currentColor"
        strokeWidth="0.875"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default TimeScheduleIcon;
