import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(createApiResponse("User ID is required", null), {
        status: 400,
      });
    }

    const userCompanies = await prisma.company.findMany({
      where: {
        users: {
          some: { id: userId },
        },
      },
      select: { id: true },
    });

    if (userCompanies.length === 0) {
      return NextResponse.json(
        createApiResponse("User is not associated with any company", []),
        { status: 403 }
      );
    }

    const companyIds = userCompanies.map((company) => company.id);

    const templates = await prisma.template.findMany({
      where: {
        companies: {
          some: { companyId: { in: companyIds } },
        },
      },
    });

    return NextResponse.json(
      createApiResponse("Templates found", templates),
      { status: 200 }
    );

  } catch (error) {
    return createErrorMessage(error);
  }
};
