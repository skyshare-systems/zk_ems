import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import api from '@/lib/axios';
import { Template } from '@prisma/client';

interface CreateEmailState {
  editorData: { blocks: any[] };
  body: string;
  subject: string;
  recipients: string[];
  selectedTemplate: Template | null;
  userTemplates: Template[];
  alignment: 'left' | 'center' | 'right';
  files: File[];
}

interface CreateEmailActions {
  setEditorData: (data: { blocks: any[] }) => void;
  setBody: (body: string) => void;
  setSubject: (subject: string) => void;
  setRecipients: (recipients: string[]) => void;
  setSelectedTemplate: (template: Template | null) => void;
  getUserTemplates: () => Promise<void>;
  setAlignment: (alignment: 'left' | 'center' | 'right') => void;
  setFiles: (file: File[]) => void;
  reset: () => void;
}

const initialState: CreateEmailState = {
  editorData: { blocks: [] },
  body: '',
  subject: '',
  recipients: [],
  selectedTemplate: null,
  userTemplates: [],
  alignment: 'left',
  files: [],
};

export const useCreateEmailStore = create<CreateEmailState & CreateEmailActions>()(
  persist(
    (set) => ({
      ...initialState,
      setFiles: (files) => set({ files }),
      setEditorData: (data) => set({ editorData: data }),
      setBody: (body) => set({ body }),
      setSubject: (subject) => set({ subject }),
      setRecipients: (recipients) => set({ recipients }),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      getUserTemplates: async () => {
        const response = await api('/templates');
        set({ userTemplates: response.data });
      },
      setAlignment: (alignment) => set({ alignment }),
      reset: () => set(initialState),
    }),
    {
      name: "create-email-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);