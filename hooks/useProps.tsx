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
      console.log("COMPANY NAME IS", selectedTemplate.company.name);

      return {
        cta,
        fromThePeople,
        articles,
        upcomingPrograms,
        products,
        services,
        posts,
      };
      // switch (selectedTemplate.company.name) {
      //   case "IBS": {
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      //   case "YourSkin School Of Integrated Aesthetics": {
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      //   case "Avian Summit Travel Corporation": {
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      //   case "Kids Learning Ville": {
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      //   case "KPC Tax & Accounting Services": {
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      //   case "KPC Importation Services": {
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      //   case "KPC Payment Assistance": {
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      //   case "KPC Finance & Accounting Institute": {
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      //   case "Skyshare Labs": {
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      //   case "InnovatEd Business Solutions": {
      //     console.log("RETURNING HERE IBS");
      //     return {
      //       cta,
      //       fromThePeople,
      //       articles,
      //       upcomingPrograms,
      //       products,
      //       services,
      //       posts,
      //     };
      //   }
      // }
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
