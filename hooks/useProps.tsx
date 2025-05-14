"use client";

import { useCreateEmailStore } from "@/store/create-email";
import { useCallback } from "react";

const useProps = () => {
  const {
    articles,
    selectedTemplate,
    fromThePeople,
    cta,
    upcomingPrograms,
    products,
    services,
    posts,
    programs,
    sectionOrder,
    isSectionOrderUpdated,
  } = useCreateEmailStore();

  const propsBuilder = useCallback(() => {
    if (!selectedTemplate) return;

    return {
      cta,
      fromThePeople,
      articles,
      upcomingPrograms,
      products,
      services,
      posts,
      sectionOrder,
      isSectionOrderUpdated,
      programs,
    };
  }, [
    articles,
    selectedTemplate,
    cta,
    fromThePeople,
    upcomingPrograms,
    products,
    services,
    posts,
    sectionOrder,
    isSectionOrderUpdated,
    programs,
  ]);

  return { propsBuilder };
};

export default useProps;
