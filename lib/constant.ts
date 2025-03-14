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
  template: (props: any) => React.JSX.Element;
  templateId: string;
}

// REMINDER: Add your email templates here with the template ID from the database.
export const emailTemplates: EmailTemplate[] = [
  {
    template: SkyshareLabsJPLTemplate,
    templateId: "cm85kbyp50001yf6j8hh50f16",
  },
];
