import { User } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AddressBookTab {
  tab: string;
  setTab: (tab: string) => void;
}

export const useAddressBook = create<AddressBookTab>()(
  persist(
    (set) => ({
      tab: "recipients",
      setTab: (tab) => set({ tab }),
    }),
    {
      name: "tab-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
