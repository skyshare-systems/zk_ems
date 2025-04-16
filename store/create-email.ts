import api from "@/lib/axios";
import { GenerateTemplateResponse } from "@/lib/mutation/template/generateTemplate";
import { Company, Prisma, Template } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TemplateWithCompany = Prisma.TemplateGetPayload<{
  include: { company: true };
}>;

export interface Cta {
  link: string;
  text: string;
}

export interface FromThePeople {
  reviewerName: string;
  reviewerImage: string;
  rating?: number;
  review: string;
  [key: string]: unknown; // Program Name, Dates, Location
}

export interface Articles {
  heading: string;
  content: string;
  articleLink: string;
  [key: string]: string; // Dates, Image
}

export interface UpcomingPrograms {
  title: string;
  externalLink: string;
  dates: {
    date: Date;
  }[];
}
export interface UpcomingProgramsWithYear extends UpcomingPrograms {
  [year: string]: string | { date: Date }[] | undefined;
}

export interface Product {
  image: string;
  name: string;
  description: string;
  link: string;
}

export interface Service {
  image: string;
  title: string;
  description: string;
  link: string;
}

export interface Post {
  image: string;
  description: string;
}

interface CreateEmailState {
  editorData: { blocks: any[] };
  body: string;
  subject: string;
  recipients: string[];
  selectedTemplate: TemplateWithCompany | null;
  userTemplates: Template[];
  alignment: "left" | "center" | "right";
  attachments: File[];
  preview: GenerateTemplateResponse;
  articles: Articles[];
  cta: Cta;
  fromThePeople: FromThePeople[];
  upcomingPrograms: UpcomingPrograms[];
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
  setPreview: (preview: string) => void;
  setArticles: (articles: Articles[]) => void;
  setCta: (cta: Cta) => void;
  setFromThePeople: (fromThePeople: FromThePeople[]) => void;
  setUpcomingPrograms: (upcomingPrograms: UpcomingPrograms[]) => void;
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
  preview: {
    html: "",
  },
  articles: [],
  cta: {
    link: "",
    text: "",
  },
  fromThePeople: [],
  upcomingPrograms: [],
};

export const useCreateEmailStore = create<
  CreateEmailState & CreateEmailActions
>()(
  persist(
    (set, get) => ({
      ...initialState,
      setArticles: (articles) => set({ articles }),
      setCta: (cta) => set({ cta }),
      setFromThePeople: (fromThePeople) => set({ fromThePeople }),
      setUpcomingPrograms: (upcomingPrograms) => set({ upcomingPrograms }),
      setPreview: (preview) => set({ preview: { html: preview } }),
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
