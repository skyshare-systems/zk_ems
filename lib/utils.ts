import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { AuthenticationError } from "./exceptions";
import { z } from "zod";
import { fromZonedTime } from "date-fns-tz";
import { compareAsc, format, parseISO } from "date-fns";
import { companyRule, emailTemplates, rules } from "./constant";
import { render } from "@react-email/render";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get local time zone

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function localizedTime(date: Date, formatString: string) {
  const localCreatedAt = fromZonedTime(date, timeZone);

  return format(localCreatedAt, formatString);
}

export const createErrorMessage = (error: unknown) => {
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

export function formatDateRanges(dates: { date: Date }[]): string {
  if (!dates || dates.length === 0) return "";

  const sortedDates = dates
    .map(d => d.date)
    .sort((a, b) => a.getTime() - b.getTime());

  const ranges: Date[][] = [];
  let tempGroup: Date[] = [sortedDates[0]];

  const oneDay = 86400000;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = sortedDates[i - 1];
    const current = sortedDates[i];
    const diff = current.getTime() - prev.getTime();

    if (diff === oneDay || (current.getMonth() === prev.getMonth() && diff <= 7 * oneDay)) {
      tempGroup.push(current);
    } else {
      ranges.push(tempGroup);
      tempGroup = [current];
    }
  }

  ranges.push(tempGroup); // Push the last group

  const formattedRanges = ranges.map(group => formatGroup(group));
  return formattedRanges.join(" • ");
}

function formatGroup(dates: Date[]): string {
  const sameMonth = dates.every(d => d.getMonth() === dates[0].getMonth());
  const sameYear = dates.every(d => d.getFullYear() === dates[0].getFullYear());

  if (dates.length === 1) {
    return format(dates[0], "MMMM d, yyyy");
  }

  // More than 7 days apart? Use & notation
  const isNonConsecutive = dates.some((d, i, arr) => {
    if (i === 0) return false;
    return d.getTime() - arr[i - 1].getTime() > 86400000;
  });

  if (isNonConsecutive) {
    const parts = dates.map(d =>
      format(d, sameMonth ? "d" : "MMMM d")
    );
    return `${format(dates[0], "MMMM")} ${parts.join(" & ")}, ${dates[0].getFullYear()}`;
  }

  // Consecutive range within a week
  return `${format(dates[0], "MMMM d")}-${format(
    dates[dates.length - 1],
    sameMonth ? "d, yyyy" : "MMMM d, yyyy"
  )}`;
}
