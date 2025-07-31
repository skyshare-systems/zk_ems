import { SentEmailWithTemplateAndCount } from "@/components/sent-email";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TemplateWithCompany } from "./create-email";

interface SentEmailStore {
  selectedSentEmail: SentEmailWithTemplateAndCount | null;
  setSelectedSentEmail: (
    sentEmail: SentEmailWithTemplateAndCount | null,
  ) => void;
  reset: () => void;
}

export const useSentEmailStore = create<SentEmailStore>()(
  persist(
    (set) => ({
      selectedSentEmail: null,
      setSelectedSentEmail: (sentEmail) => {
        set(() => ({ selectedSentEmail: sentEmail }));
      },
      reset: () => set({ selectedSentEmail: null }),
    }),
    {
      name: "sent-email-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
