import { companies } from "@/lib/constant";

export const chunkArray = <T>(array: T[], size: number) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};

export type SectionType =
  | "fromThePeople"
  | "articles"
  | "upcomingPrograms"
  | "products"
  | "services"
  | "posts"
  | "programs";

export const defaultSectionOrders: Record<
  companies | "default",
  SectionType[]
> = {
  "KPC Importation Services": [
    "articles",
    "upcomingPrograms",
    "services",
    "fromThePeople",
    "posts",
  ],
  "KPC Payment Assistance": [
    "articles",
    "upcomingPrograms",
    "services",
    "fromThePeople",
    "posts",
  ],
  "KPC Tax & Accounting Services": [
    "services",
    "fromThePeople",
    "articles",
    "upcomingPrograms",
    "posts",
  ],
  "KPC Finance & Accounting Institute": [
    "services",
    "upcomingPrograms",
    "articles",
    "fromThePeople",
    "posts",
  ],
  "YourSkin School Of Integrated Aesthetics": [
    "articles",
    "services",
    "fromThePeople",
    "upcomingPrograms",
    "posts",
  ],
  "InnovatEd Business Academy": [
    "articles",
    "services",
    "upcomingPrograms",
    "fromThePeople",
    "posts",
  ],
  "Avian Summit Travel Corporation": [
    "fromThePeople",
    "articles",
    "upcomingPrograms",
    "products",
    "services",
    "posts",
  ],
  "Kids Learning Ville": [
    "upcomingPrograms",
    "programs",
    "services",
    "products",
    "articles",
    "fromThePeople",
    "posts",
  ],
  "InnovatEd Business Solutions": [
    "fromThePeople",
    "articles",
    "upcomingPrograms",
    "products",
    "services",
    "posts",
  ],
  "Skyshare Labs": ["articles", "fromThePeople", "services"],
  default: [
    "fromThePeople",
    "articles",
    "upcomingPrograms",
    "products",
    "services",
    "posts",
    "programs",
  ],
};

export const getDefaultOrder = (
  sectionOrder: SectionType[],
  companyName: companies,
  isSectionOrderUpdated: boolean
) => {
  const defaultOrder =
    defaultSectionOrders[companyName] || defaultSectionOrders["default"];

  if (isSectionOrderUpdated) {
    return sectionOrder;
  }

  return defaultOrder;
};

interface EditorParams {
  companyName: companies;
  sectionType: SectionType;
}

const defaultSectionLabels: Record<SectionType, string> = {
  fromThePeople: "FROM THE PEOPLE",
  articles: "ARTICLES",
  upcomingPrograms: "UPCOMING PROGRAMS",
  products: "OUR PRODUCTS",
  services: "OUR SERVICES",
  posts: "OUR RECENT POSTS",
  programs: "PROGRAMS",
};

const labelOverrides: Partial<
  Record<companies, Partial<Record<SectionType, string>>>
> = {
  "YourSkin School Of Integrated Aesthetics": {
    upcomingPrograms: "UPCOMING COURSES SCHEDULE",
  },
  "Avian Summit Travel Corporation": {
    upcomingPrograms: "UPCOMING DEPARTURES",
    fromThePeople: "FEEDBACK",
    products: "OUR TOUR PACKAGES",
  },
};

export const getEditorLabel = ({
  companyName,
  sectionType,
}: EditorParams): string => {
  const override = labelOverrides[companyName]?.[sectionType];
  return override ?? defaultSectionLabels[sectionType];
};
