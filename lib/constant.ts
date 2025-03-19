import IBS01Template from "@/emails/ibs/ibs-01/ibs01";
import KPC01Template from "@/emails/kpc/kps-01/kpc01";
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

type companies = "Skyshare Labs" | "IBS" | "KPC IS";

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
    template: KPC01Template,
    templateId: "cm8fnh3xa0004220m4qnuu29e",
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
