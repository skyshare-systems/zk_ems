import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage, Meta } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const companyId = searchParams.get("companyId");
    const title = searchParams.get("title");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (!userId) {
      return NextResponse.json(createApiResponse("User ID is required", null), {
        status: 400,
      });
    }

    if (!companyId) {
      return NextResponse.json(createApiResponse("User ID is required", null), {
        status: 400,
      });
    }

    //* is the user a member of the company
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        users: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        templates: {
          where: title
            ? {
                name: {
                  contains: title,
                  mode: "insensitive",
                },
              }
            : undefined,
        },
      },
    });

    const totalTemplates = await prisma.template.count({
      where: {
        companyId,
      },
    });

      const meta: Meta = {
      totalPage: Math.ceil(totalTemplates / parseInt(limit ?? "10")) ,
      page: parseInt(page ?? "1"),
      remaining: totalTemplates - (parseInt(page ?? "1") * parseInt(limit ?? "10")) < 0 ? 0 : totalTemplates - (parseInt(page ?? "1") * parseInt(limit ?? "10")),
    }

    if (!company) {
      return NextResponse.json(createApiResponse("Company not found", null), {
        status: 404,
      });
    }

    return NextResponse.json(
      createApiResponse("Templates found", company, meta),
      {
        status: 200,
      }
    );
  } catch (error) {
    return createErrorMessage(error);
  }
};
