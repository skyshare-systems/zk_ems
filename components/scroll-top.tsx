"use client";

import React, { useEffect } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useCompanyStore } from "@/store/company";
import { cn, colorizeButton } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

const ScrollTop = () => {
  const { company } = useCompanyStore();

  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById("scroll-top-button");
      if (button) {
        if (window.scrollY > 600) {
          button.classList.remove("hidden");
        } else {
          button.classList.add("hidden");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!company) return null;

  return (
    <Button
      id="scroll-top-button"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      className={cn(
        buttonVariants({
          size: "icon",
        }),
        colorizeButton(company.name),
        "w-full lg:w-fit fixed bottom-24 right-4 z-50 hover:bg-opacity-90 duration-500 transition-all hidden",
      )}
    >
      <ArrowUp color="white" size={16} />
    </Button>
  );
};

export default ScrollTop;
