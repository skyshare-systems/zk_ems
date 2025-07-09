import React from "react";

interface IClassName {
  className?: string;
}

const RocketRightOutline = ({ className }: IClassName) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      className={className}
    >
      <path
        d="M8 11.0446L12.1232 6.92137C13.2481 5.79651 13.8105 5.23407 14.4312 4.78107C15.7047 3.85163 17.1818 3.2398 18.7395 2.99651C19.4988 2.87793 20.2942 2.87793 21.885 2.87793C21.9681 2.87793 22 2.91605 22 2.99297C22 4.58377 22 5.37918 21.8814 6.13839C21.6381 7.69611 21.0263 9.1732 20.0969 10.4467C19.6439 11.0674 19.0814 11.6298 17.9566 12.7547L13.8333 16.8779"
        stroke="currentColor"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.341 8.97631C8.63808 8.97631 6.49778 8.61558 4.9043 9.27562C3.73671 9.75925 2.87754 10.8791 2 11.7566L5.30597 13.1734C6.18208 13.5489 5.64651 14.6545 5.50147 15.3797C5.33985 16.1878 5.34886 16.2176 5.93158 16.8003L8.07758 18.9463C8.6603 19.529 8.69008 19.5381 9.49816 19.3764C10.2234 19.2314 11.329 18.6958 11.7044 19.5719L13.1213 22.8779C13.9988 22.0004 15.1187 21.1412 15.6023 19.9736C16.2624 18.3801 15.9016 16.2398 15.9016 14.5369"
        stroke="currentColor"
        stroke-width="1.125"
        stroke-linejoin="round"
      />
      <path
        d="M12 20.8779L11 21.8779"
        stroke="currentColor"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 12.8779L3 13.8779"
        stroke="currentColor"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 4.95801C16.2 5.13801 17.46 5.61801 18.1614 6.33801C19.0576 7.13016 19.68 8.19801 19.92 9.87801"
        stroke="currentColor"
        stroke-width="1.125"
        stroke-linecap="square"
      />
      <path
        d="M17.94 6.9375L16.5 8.3775"
        stroke="currentColor"
        stroke-width="1.125"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default RocketRightOutline;
