import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { AuthenticationError } from "./exceptions";
import { z } from "zod";
import { fromZonedTime } from "date-fns-tz";
import { compareAsc, format, isValid, parseISO } from "date-fns";
import { companies, companyRule, emailTemplates, rules } from "./constant";
import { render } from "@react-email/render";
import { useCreateEmailStore } from "@/store/create-email";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get local time zone

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function localizedTime(date: Date, formatString: string) {
  const localCreatedAt = fromZonedTime(date, timeZone);

  return format(localCreatedAt, formatString);
}

export const createErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(createApiResponse("Invalid input", null), {
      status: 400,
    });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return NextResponse.json(
      createApiResponse("Database is unreachable", null),
      { status: 500 },
    );
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      createApiResponse("Invalid input", { errors: error.errors }),
      { status: 400 },
    );
  }

  if (error instanceof AuthenticationError) {
    return NextResponse.json(createApiResponse(error.message, null), {
      status: 401,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json(createApiResponse("Database error", null), {
      status: 500,
    });
  }

  return NextResponse.json(createApiResponse("Internal server error", error), {
    status: 500,
  });
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    } else if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong";
};

export interface Meta {
  page: number;
  totalPage: number;
  remaining: number;
  hasNextPage?: boolean;
}

export const createApiResponse = <T>(message: string, data: T, meta?: Meta) => {
  return { message, data, meta };
};

export const createErrorResponse = (message: string) => {
  return { message };
};

export const updateFontHtml = (htmlTemplate: string) => {
  const updatedHtml = htmlTemplate.replace(
    /(@font-face\s*{[^}]*font-family:\s*'([^']+)'\s*;[^}]*})\s*\*\s*{([^}]*)font-family:\s*'([^']+)'([^}]*)}/g,
    (_, fontFaceRule, fontFamily, beforeFont, matchedFont, afterFont) =>
      `${fontFaceRule}\n.font-${matchedFont.toLowerCase().replace(/\s+/g, "-")}{${beforeFont} font-family: '${matchedFont}'${afterFont}}`,
  );

  return updatedHtml;
};

// Get template by ID and render with props
export const getTemplateLookup = async (
  templateId: string,
  props: any,
): Promise<string> => {
  const selectedTemplate = emailTemplates.find(
    (template) => template.templateId === templateId,
  );

  if (!selectedTemplate) {
    throw new Error(`Template with ID "${templateId}" not found.`);
  }

  return render(selectedTemplate.template(props));
};

export function verifyPermission({
  companyId,
  rules,
}: {
  companyId: string;
  rules: rules[];
}): boolean {
  const isAllowed = companyRule.some(
    (rule) =>
      rule.rules.some((rule) => rules.includes(rule)) &&
      rule.companies.some((company) => company.id === companyId),
  );

  return isAllowed;
}

type InputDate = string | Date;
type Input = InputDate[] | { date: InputDate }[];

export function formatDateRanges(dates: Input): string {
  if (!dates || dates.length === 0) return "";

  // Normalize and parse all dates
  const dateObjects = dates
    .map((d) => {
      const rawDate = typeof d === "object" && "date" in d ? d.date : d;
      const parsed = typeof rawDate === "string" ? parseISO(rawDate) : rawDate;
      return isValid(parsed) ? parsed : null;
    })
    .filter((d): d is Date => d instanceof Date);

  if (dateObjects.length === 0) return "";

  // Sort by time
  const sortedDates = dateObjects.sort((a, b) => a.getTime() - b.getTime());

  const groups: Date[][] = [];
  let currentGroup: Date[] = [sortedDates[0]];
  const oneDay = 86400000;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = sortedDates[i - 1];
    const curr = sortedDates[i];
    const diff = curr.getTime() - prev.getTime();

    if (diff <= 7 * oneDay) {
      currentGroup.push(curr);
    } else {
      groups.push(currentGroup);
      currentGroup = [curr];
    }
  }
  groups.push(currentGroup);

  const formatted = groups.map((group) => {
    if (group.length === 1) {
      return format(group[0], "MMMM d, yyyy");
    }

    const sameMonth = group.every(
      (d) =>
        d.getMonth() === group[0].getMonth() &&
        d.getFullYear() === group[0].getFullYear(),
    );
    const start = group[0];
    const end = group[group.length - 1];

    const useAmpersand = end.getTime() - start.getTime() > 7 * oneDay;

    if (useAmpersand && sameMonth) {
      const days = group.map((d) => format(d, "d")).join(" & ");
      return `${format(start, "MMMM")} ${days}, ${format(start, "yyyy")}`;
    }

    if (!useAmpersand) {
      const endFormat = sameMonth ? "d, yyyy" : "MMMM d, yyyy";
      return `${format(start, "MMMM d")}-${format(end, endFormat)}`;
    }

    // Fallback for different months and more than a week apart
    return group.map((d) => format(d, "MMMM d, yyyy")).join(" • ");
  });

  return formatted.join(" • ");
}

export const colorizeButton = (companyName: string) => {

  const colorMap: Record<string, string> = {
    "InnovatEd Business Academy": "bg-[#09316F] hover:bg-opacity-90",
    "YourSkin School Of Integrated Aesthetics":
      "bg-[#3467A9] hover:bg-opacity-90",
    "Avian Summit Travel Corporation": "bg-[#18365A] hover:bg-opacity-90",
    "Kids Learning Ville": "bg-[#00A19B] hover:bg-opacity-90",
    "KPC Tax & Accounting Services": "bg-[#000205] hover:bg-opacity-90",
    "KPC Importation Services": "bg-[#000205] hover:bg-opacity-90",
    "KPC Payment Assistance": "bg-[#000205] hover:bg-opacity-90",
    "KPC Finance & Accounting Institute": "bg-[#000205] hover:bg-opacity-90",
    "Skyshare Labs": "bg-[#000205] hover:bg-opacity-90",
    "InnovatEd Business Solutions": "bg-[#000205] hover:bg-opacity-90",
  };

  return colorMap[companyName] || "bg-black"; // Default color if company name not found
};

export const shortenMonth = (date: Date) => {
  const month = format(date, "MMMM");
  const shortMonth = month.substring(0, 3).toUpperCase();
  return shortMonth;
};

export const isRatingFieldVisible = (companyName: companies): boolean => {
  const allowedCompanies: companies[] = [
    "YourSkin School Of Integrated Aesthetics",
    "KPC Tax & Accounting Services",
    "KPC Importation Services",
    "KPC Payment Assistance",
    "KPC Finance & Accounting Institute"
  ];

  return allowedCompanies.includes(companyName);
};

export const isCourseTakenFieldVisible = (companyName: companies): boolean => {
  const allowedCompanies: companies[] = [
    "YourSkin School Of Integrated Aesthetics",
  ];

  return allowedCompanies.includes(companyName);
};

export const isTourLocationFieldVisible = (companyName: companies): boolean => {
  const allowedCompanies: companies[] = ["Avian Summit Travel Corporation"];

  return allowedCompanies.includes(companyName);
};

export const isDatesOfTravelFieldVisible = (
  companyName: companies,
): boolean => {
  const allowedCompanies: companies[] = ["Avian Summit Travel Corporation"];

  return allowedCompanies.includes(companyName);
};
export const isArticleDateFieldVisible = (companyName: companies): boolean => {
  const allowedCompanies: companies[] = ["InnovatEd Business Academy"];

  return allowedCompanies.includes(companyName);
};


export const isArticlePhotoFieldHidden = (companyName: companies): boolean => {
  const hiddenCompanies: companies[] = [
    "KPC Importation Services",
    "KPC Finance & Accounting Institute"
  ]

  return !hiddenCompanies.includes(companyName);
}
