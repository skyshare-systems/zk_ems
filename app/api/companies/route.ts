import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage, Meta } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(createApiResponse("User not found", null), {
        status: 404,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(createApiResponse("User not found", null), {
        status: 404,
      });
    }

    const count = await prisma.company.count({
      where: {
        users: {
          some: { id: userId },
        },
      }
    });
    
    const totalPages = Math.ceil(count / limit);

    if (page > totalPages) {
      return NextResponse.json(createApiResponse("Page not found", null), {
        status: 404,
      });
    }

    const companies = await prisma.company.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        users: {
          some: { id: userId },
        },
      },

    
    });

    const meta: Meta = {
      page: Number(page),
      totalPage: totalPages,
      remaining: count - Number(page) < limit ? count - Number(page) : limit,
      hasNextPage: Number(page) < totalPages,
    };

    return NextResponse.json(
      createApiResponse("Companies found",  companies , meta),
      { status: 200 }
    );
  } catch (error) {
    return createErrorMessage(error);
  }
};
