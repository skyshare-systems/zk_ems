import api from "@/lib/axios";
import { Template } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CreateEmailStore {
  userTemplates: Template[];
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
  getUserTemplates: () => void;
}

export const useCreateEmailStore = create<CreateEmailStore>()(
  persist(
    (set) => ({
      selectedTemplate: null,
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      userTemplates: [],
      getUserTemplates: async () => {
        const response = await api("/templates");
        set({ userTemplates: response.data });
      },
    }),
    {
      name: "create-email-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
