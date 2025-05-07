import { companies } from "@/lib/constant";

export const chunkArray = <T>(array: T[], size: number) => {
  // if (size <= 0 || array.length === 0) {
  //   throw new Error("Recent Posts, Articles, Services, Products, Upcoming Programs, and From The People should not be empty.");
  // }

  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size),
  );
};

export type SectionType =
  | "fromThePeople"
  | "articles"
  | "upcomingPrograms"
  | "products"
  | "services"
  | "posts";

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
  "InnovatEd Business Academy": [
    "fromThePeople",
    "articles",
    "upcomingPrograms",
    "products",
    "services",
    "posts",
  ],
  "YourSkin School Of Integrated Aesthetics": [
    "fromThePeople",
    "articles",
    "upcomingPrograms",
    "products",
    "services",
    "posts",
  ],
  "Avian Summit Travel Corporation": [
    "articles",
    "upcomingPrograms",
    "services",
    "fromThePeople",
    "posts",
  ],
  "Kids Learning Ville": [
    "upcomingPrograms",
    "services",
    "products",
    "articles",
    "fromThePeople",
    "posts",
  ],
  "InnovatEd Business Solutions": ["articles", "fromThePeople", "services"],
  "Skyshare Labs": ["articles", "fromThePeople", "services"],
  default: [
    "fromThePeople",
    "articles",
    "upcomingPrograms",
    "products",
    "services",
    "posts",
  ],
};

export const getDefaultOrder = (
  sectionOrder: SectionType[],
  companyName: companies,
  isSectionOrderUpdated: boolean,
) => {
  const defaultOrder =
    defaultSectionOrders[companyName] || defaultSectionOrders["default"];

  if (isSectionOrderUpdated) {
    return sectionOrder;
  }

  return defaultOrder;
};
