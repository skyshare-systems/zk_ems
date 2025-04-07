"use client";

import { useCreateEmailStore } from "@/store/create-email";
import { useCallback } from "react";

const useProps = () => {
  const { articles, selectedTemplate, fromThePeople, cta, upcomingPrograms } =
    useCreateEmailStore();

  const propsBuilder = useCallback(
    function propsBuilder() {
      if (!selectedTemplate) return;
      switch (selectedTemplate.company.name) {
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
    [articles, selectedTemplate, cta, fromThePeople, upcomingPrograms],
  );

  return { propsBuilder };
};

export default useProps;
