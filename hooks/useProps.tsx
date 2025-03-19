"use client";

import { useCreateEmailStore } from "@/store/create-email";
import { useCallback } from "react";

const useProps = () => {
  const { articles, selectedTemplate } = useCreateEmailStore();

  const propsBuilder = useCallback(
    function propsBuilder() {
      if (!selectedTemplate) return;
      switch (selectedTemplate.company.name) {
        case "KPC IS": {
          return {
            articles: articles,
          };
        }
      }
    },
    [articles, selectedTemplate],
  );

  return { propsBuilder };
};

export default useProps;
