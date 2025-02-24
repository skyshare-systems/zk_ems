import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";
import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const monthToText = (month: number): string =>
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][month] || "Unknown";

const getMonthDateRange = (date: Date = new Date()) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  firstDay.setHours(0, 0, 0, 0);
  lastDay.setHours(23, 59, 59, 999);

  return { firstDay, lastDay };
};

export const GET = authorize(async (request: AuthenticatedRequest) => {
  try {
    const companyId = request.nextUrl.searchParams.get("companyId");
    if (!companyId) return createErrorMessage("Company not found");

    const { firstDay, lastDay } = getMonthDateRange();

    const sentEmailsCount = await prisma.recipient.count({
      where: {
        sentEmail: {
          companyId,
          AND: [
            {
              createdAt: {
                gte: firstDay,
                lte: lastDay,
              },
            },
          ],
        },
      },
    });

    return NextResponse.json(
      createApiResponse("Sent emails found", {
        count: sentEmailsCount,
        month: monthToText(firstDay.getMonth()),
        /*   dateRange: {
          from: firstDay.toISOString(),
          to: lastDay.toISOString()
        } */
      })
    );
  } catch (error) {
    return createErrorMessage(error);
  }
});
