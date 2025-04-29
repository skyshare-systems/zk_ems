"use client";
import { ReactLenis } from "lenis/react";
import React from "react";

interface Props {
  children: Readonly<React.ReactNode>;
}
const SmoothScroll = ({ children }: Props) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroll;
