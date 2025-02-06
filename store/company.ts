import { Company } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CompanyStore {
  company: Company | null;
  setCompany: (company: Company) => void;
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      company: null,
      setCompany: (company) => set({ company }),
    }),
    {
      name: "company-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
