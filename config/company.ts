import { companies } from "@/lib/constant";

interface CompanyConfig {
  id: string;
  company: companies;
  config: {
    [key: string]: unknown;
  }
}

export const companyConfig: CompanyConfig[] = [
  {
    id: "cm9qsgh9y00015excd3o4dd61",
    company:"InnovatEd Business Academy",
    config: {
      buttonColor:"bg-[#09316F]"
    }
  }
]