import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";
import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage, Meta } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = authorize( async (request: AuthenticatedRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const title = searchParams.get("title");

    if (!companyId || !userId) {
      return NextResponse.json(createErrorMessage({error:"Company or User not found"}),{status: 500});
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(createErrorMessage({error:"User not found"}),{status: 500});
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json(createErrorMessage({error:"Company not found"}),{status: 500});
    }

    const sentEmails = await prisma.sentEmail.findMany({
      where: {
        companyId,
        template: title
          ? {
              name: {
                contains: title,
                mode: "insensitive",
              },
            }
          : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: { recipients: true },
        },
        template: true,
        recipients: true,
      },
      take: parseInt(limit ?? "10"),
      skip: (parseInt(page ?? "1") - 1) * parseInt(limit ?? "10"),
    });

    const totalSentEmails = await prisma.sentEmail.count({
      where: {
        companyId,
        template: {
          name: {
            contains: title ?? "",
            mode: "insensitive",
          },
        },
      },
    });

    const meta: Meta = {
      totalPage: Math.ceil(totalSentEmails / parseInt(limit ?? "10")),
      page: parseInt(page ?? "1"),
      remaining:
        totalSentEmails - parseInt(page ?? "1") * parseInt(limit ?? "10") < 0
          ? 0
          : totalSentEmails - parseInt(page ?? "1") * parseInt(limit ?? "10"),
    };

    return NextResponse.json(
      createApiResponse("Sent emails found", sentEmails, meta),
      { status: 200 }
    );
  } catch (error) {
                   return NextResponse.json(createErrorMessage(error), { status: 500 });

  }
})
