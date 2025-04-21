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
  } = useCreateEmailStore();

  const propsBuilder = useCallback(
    function propsBuilder() {
      if (!selectedTemplate) return;
      switch (selectedTemplate.company.name) {
        case "InnovatEd Business Academy": {
          return {
            cta,
            fromThePeople,
            articles,
            upcomingPrograms,
            products,
            services,
            posts,
          };
        }
        case "KPC IS": {
          return {
            articles: articles,
          };
        }
        case "KPC TAX": {
          return {
            articles,
            cta,
            fromThePeople,
            upcomingPrograms,
          };
        }
      }
    },
    [
      articles,
      selectedTemplate,
      cta,
      fromThePeople,
      upcomingPrograms,
      products,
      services,
      posts,
    ],
  );

  return { propsBuilder };
};

export default useProps;
