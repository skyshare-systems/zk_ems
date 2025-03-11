import api from "@/lib/axios";
import { Company, Prisma, Template } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TemplateWithCompany = Prisma.TemplateGetPayload<{
  include: { company: true };
}>

interface CreateEmailState {
  editorData: { blocks: any[] };
  body: string;
  subject: string;
  recipients: string[];
  selectedTemplate: TemplateWithCompany | null;
  userTemplates: Template[];
  alignment: "left" | "center" | "right";
  attachments: File[];
}

interface CreateEmailActions {
  setEditorData: (data: { blocks: any[] }) => void;
  setBody: (body: string) => void;
  setSubject: (subject: string) => void;
  setRecipients: (recipients: string[]) => void;
  setSelectedTemplate: (template: TemplateWithCompany | null) => void;
  getUserTemplates: () => Promise<void>;
  setAlignment: (alignment: "left" | "center" | "right") => void;
  setAttachments: (file: File[]) => void;
  reset: () => void;
}

const initialState: CreateEmailState = {
  editorData: { blocks: [] },
  body: "",
  subject: "",
  recipients: [],
  selectedTemplate: null,
  userTemplates: [],
  alignment: "left",
  attachments: [],
};

export const useCreateEmailStore = create<
  CreateEmailState & CreateEmailActions
>()(
  persist(
    (set) => ({
      ...initialState,
      setAttachments: (attachments) => set({ attachments }),
      setEditorData: (data) => set({ editorData: data }),
      setBody: (body) => set({ body }),
      setSubject: (subject) => set({ subject }),
      setRecipients: (recipients) => set({ recipients }),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      getUserTemplates: async () => {
        const response = await api("/templates");
        set({ userTemplates: response.data });
      },
      setAlignment: (alignment) => set({ alignment }),
      reset: () => set(initialState),
    }),
    {
      name: "create-email-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
