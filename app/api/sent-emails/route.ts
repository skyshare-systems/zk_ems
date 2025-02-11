import prisma from "@/lib/prisma";
import { withSession } from "@/lib/session";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");

    if (!companyId || !userId) {
      return createErrorMessage("Company or User not found");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) { 
      return createErrorMessage("User not found");
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return createErrorMessage("Company not found");
    }

    const sentEmails = await prisma.sentEmail.findMany({
      where: { companyId },
      include: {
        _count: {
          select: { recipients: true }, 
        },
        template: true,
        recipients: true,
      },
    });


    return NextResponse.json(
      createApiResponse("Sent emails found", sentEmails),
      { status: 200 }
    );
  } catch (error) {
    return createErrorMessage(error);
  }
};

