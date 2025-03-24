import IBS01Template from "@/emails/ibs/ibs-01/ibs01";
import KPC01Template, { KPCIS01Template } from "@/emails/kpc/kpc-is/kpc-is-01";
import KPCPA01Template from "@/emails/kpc/kpc-pa/kpc-pa-01";
import KPCTAX01Template from "@/emails/kpc/kpc-tax/kpc-tax-01";
import SkyshareLabsJPLTemplate from "@/emails/skyshare/jpl/jpl";

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

type companies = "Skyshare Labs" | "IBS" | "KPC IS" | "KPC PA" | "KPC TAX";

// REMINDER: Add your email templates here with the template ID from the database.
export const emailTemplates: EmailTemplate[] = [
  {
    company: "Skyshare Labs",
    template: SkyshareLabsJPLTemplate,
    templateId: "cm85kbyp50001yf6j8hh50f16",
  },
  {
    company: "IBS",
    template: IBS01Template,
    templateId: "cm7d95epl0000b42bu0qvm3vg",
  },
  {
    company: "KPC IS",
    template: KPCIS01Template,
    templateId: "cm8fnh3xa0004220m4qnuu29e",
  },
  {
    company: "KPC PA",
    template: KPCPA01Template,
    templateId: "cm8iiapml00022udm6ri6bj7s",
  },
  {
    company: "KPC TAX",
    template: KPCTAX01Template,
    templateId: "cm8mt5cwp0002ykq0k956i4bs",
  },
];

export const rules = [
  {
    companies: [
      {
        id: "cm8fnd9h80000220mva1ldp04",
        name: "KPC IS",
      },
    ],
    rules: ["articles"],
  },
];
