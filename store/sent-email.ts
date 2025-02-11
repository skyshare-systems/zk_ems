import { SentEmailWithTemplateAndCount } from "@/components/sent-email";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SentEmailStore {
  selectedSentEmail: SentEmailWithTemplateAndCount | null;
  setSelectedSentEmail: (sentEmail: SentEmailWithTemplateAndCount | null) => void;
}

export const useSentEmailStore = create<SentEmailStore>()(
  persist(
    (set) => ({
      selectedSentEmail: null,
      setSelectedSentEmail: (sentEmail) =>
        set(() => ({ selectedSentEmail: sentEmail })),
    }),
    {
      name: "sent-email-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
