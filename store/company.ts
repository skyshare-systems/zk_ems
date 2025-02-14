import { Company, Prisma } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CompanyWithConfigs = Prisma.CompanyGetPayload<{
  include: {
    smtpCredential: true;
    storageConfig: true;
  };
}>;

interface CompanyStore {
  company: CompanyWithConfigs | null;
  setCompany: (company: CompanyWithConfigs) => void;
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
