import api from "@/lib/axios";
import { Template } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CreateEmailStore {
  body: string;
  setBody: (body: string) => void;
  subject: string;
  setSubject: (subject: string) => void;
  recipients: string[];
  setRecipients: (recipients: string[]) => void;
  userTemplates: Template[];
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
  getUserTemplates: () => void;
  reset: () => void;
}

export const useCreateEmailStore = create<CreateEmailStore>()(
  persist(
    (set) => ({
      body: "",
      setBody: (body) => set({ body }),
      subject: "",
      setSubject: (subject) => set({ subject }),
      recipients: [],
      setRecipients: (recipients) => set({ recipients }),
      selectedTemplate: null,
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      userTemplates: [],
      getUserTemplates: async () => {
        const response = await api("/templates");
        set({ userTemplates: response.data });
      },
      reset: () =>
        set({
          body: "",
          subject: "",
          recipients: [],
          selectedTemplate: null,
        }),
    }),
    {
      name: "create-email-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
