import AS01Template from "@/emails/avian-summit/as01/as01";
import IBA01Template from "@/emails/iba/iba-01/iba01";
import IBS01Template from "@/emails/ibs/ibs-01/ibs01";
import KLV01Template from "@/emails/klv/klv01/klv01";
import KPCFAI01Template from "@/emails/kpc/kpc-fai/kpc-fai-01";
import KPC01Template, { KPCIS01Template } from "@/emails/kpc/kpc-is/kpc-is-01";
import KPCPA01Template from "@/emails/kpc/kpc-pa/kpc-pa-01";
import KPCTAX01Template from "@/emails/kpc/kpc-tax/kpc-tax-01";
import SkyshareLabsJPLTemplate from "@/emails/skyshare/jpl/jpl";
import YSOIA01Template from "@/emails/ysoia/ysoia-01/ysoia01";

export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://zk-ems.vercel.app.com"
    : "http://localhost:3000";

export const SITE_NAME = "ZK Summit EMS";
export const SITE_TITLE = "ZK Summit EMS - Send your emails with ease";
export const SITE_DESCRIPTION =
  "Send your emails with ease. No more hassle, just send and forget.";

export interface EmailTemplate {
  company: companies;
  template: (props: any) => React.JSX.Element;
  templateId: string;
}

export type companies =
  | "InnovatEd Business Academy"
  | "YourSkin School Of Integrated Aesthetics"
  | "Avian Summit Travel Corporation"
  | "Kids Learning Ville"
  | "KPC Tax & Accounting Services"
  | "KPC Importation Services"
  | "KPC Payment Assistance"
  | "KPC Finance & Accounting Institute"
  | "Skyshare Labs"
  | "InnovatEd Business Solutions"
  | "New Company"
  | "Company 1";

export type rules =
  | "cta_button"
  | "from_the_people"
  | "articles"
  | "upcoming_programs"
  | "discover_our_products"
  | "our_services"
  | "recent_posts"
  | "programs";

interface Company {
  id: string;
  name: companies;
}
interface CompanyRule {
  companies: Company[];
  rules: rules[];
}

// REMINDER: Add your email templates here with the template ID from the database.
export const emailTemplates: EmailTemplate[] = [
  {
    company: "InnovatEd Business Academy",
    template: IBA01Template,
    templateId: "cm9qshnfd00025exc7xh3jwvr",
  },
  {
    company: "YourSkin School Of Integrated Aesthetics",
    template: YSOIA01Template,
    templateId: "cm9ifit570003ntuks5sgl1n4",
  },
  {
    company: "Avian Summit Travel Corporation",
    template: AS01Template,
    templateId: "cm9sb0gr0000hlxhvpym5xgeb",
  },
  {
    company: "Kids Learning Ville",
    template: KLV01Template,
    templateId: "cm9tl5jo400024lihwc9t5q44",
  },
  {
    company: "KPC Tax & Accounting Services",
    template: KPCTAX01Template,
    templateId: "cm8mt5cwp0002ykq0k956i4bs",
  },
  {
    company: "KPC Importation Services",
    template: KPCIS01Template,
    templateId: "cm8fnh3xa0004220m4qnuu29e",
  },
  {
    company: "KPC Payment Assistance",
    template: KPCPA01Template,
    templateId: "cm8iiapml00022udm6ri6bj7s",
  },
  {
    company: "KPC Finance & Accounting Institute",
    template: KPCFAI01Template,
    templateId: "cm9tripip0003z9g9gd8v3w4h",
  },
  {
    company: "Skyshare Labs",
    template: SkyshareLabsJPLTemplate,
    templateId: "cm85kbyp50001yf6j8hh50f16",
  },
  {
    company: "InnovatEd Business Solutions",
    template: IBS01Template,
    templateId: "cm7d95epl0000b42bu0qvm3vg",
  },
  {
    company: "New Company",
    template: IBS01Template,
    templateId: "cmcu5hufj000suxnm8twe1asd",
  },
  {
    company: "Company 1",
    template: KPCFAI01Template,
    templateId: "cmcu5hufj000ruxnmpvbj7vz6",
  },
  {
    company: "Company 1",
    template: KPCFAI01Template,
    templateId: "cmcu5hufk0012uxnm97knwnd3",
  },
  {
    company: "Company 1",
    template: KPCFAI01Template,
    templateId: "cmcu5hufj000puxnmwe7vueya",
  },
];

export const companyRule: CompanyRule[] = [
  {
    companies: [
      { id: "cm9qsgh9y00015excd3o4dd61", name: "InnovatEd Business Academy" },
      {
        id: "cm9ifggvi0001ntukh0b5lucj",
        name: "YourSkin School Of Integrated Aesthetics",
      },
      {
        id: "cm9s5oq900004lxhvmy9qw89m",
        name: "Avian Summit Travel Corporation",
      },
      { id: "cm9s5oq900005lxhv1xtk0mlj", name: "Kids Learning Ville" },
      {
        id: "cm8mt25yg0000ykq0qt4fiuxf",
        name: "KPC Tax & Accounting Services",
      },
      { id: "cm8fnd9h80000220mva1ldp04", name: "KPC Importation Services" },
      { id: "cm8ii8g4e00002udmidlx0yq8", name: "KPC Payment Assistance" },
      {
        id: "cm9s5oq900006lxhva5qmswnx",
        name: "KPC Finance & Accounting Institute",
      },
      { id: "cm85ka8rf0000yf6jrxa15pia", name: "Skyshare Labs" },
      { id: "cm7d8o4dr0003ogx5jc9e2rm1", name: "InnovatEd Business Solutions" },
    ],
    rules: [
      "cta_button",
      "from_the_people",
      "articles",
      "upcoming_programs",
      "discover_our_products",
      "our_services",
      "recent_posts",
    ],
  },
  {
    companies: [
      { id: "cm9s5oq900005lxhv1xtk0mlj", name: "Kids Learning Ville" },
    ],
    rules: [
      "cta_button",
      "from_the_people",
      "articles",
      "upcoming_programs",
      "discover_our_products",
      "our_services",
      "recent_posts",
      "programs",
    ],
  },
];
