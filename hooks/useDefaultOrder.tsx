"use client";
import { defaultSectionOrders, SectionType } from "@/emails/utils";
import { companies } from "@/lib/constant";
import { useCreateEmailStore } from "@/store/create-email";
import React from "react";

interface Props {
  sectionOrder: SectionType[];
}
const useDefaultOrder = ({ sectionOrder }: Props) => {
  const { selectedTemplate } = useCreateEmailStore();

  const companyName = selectedTemplate?.company.name;

  const defaultOrder =
    defaultSectionOrders[companyName as companies] ||
    defaultSectionOrders["default"];

  // Ensure sectionOrder includes all valid ones from default
  const finalSectionOrder = sectionOrder?.length
    ? defaultOrder.map((section) =>
        sectionOrder.includes(section) ? section : "x",
      ) // add "x" if missing
    : defaultOrder;

  return {
    finalSectionOrder,
  };
};

export default useDefaultOrder;
