import { NextRequest, NextResponse } from "next/server";
import { createApiResponse, createErrorResponse } from "@/lib/utils"; // You may need to create these helper functions if they don't exist
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const companyId = url.searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json(
        createErrorResponse("companyId query parameter is required"),
        { status: 400 },
      );
    }

    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        createErrorResponse("page and limit must be positive integers"),
        { status: 400 },
      );
    }

    const search = url.searchParams.get("search")?.trim();

    // Build the where condition with search support
    const where: any = {
      companyId,
    };

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const totalCount = await prisma.addressBookGroup.count({ where });

    const groups = await prisma.addressBookGroup.findMany({
      where,
      include: {
        recipients: true,
        // company: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPage = Math.ceil(totalCount / limit);
    const remaining = totalCount - page * limit;
    const hasNextPage = remaining > 0;

    const meta = {
      page,
      totalPage,
      remaining: remaining > 0 ? remaining : 0,
      hasNextPage,
    };

    return NextResponse.json(
      createApiResponse(
        "Address book groups fetched successfully",
        groups,
        meta,
      ),
    );
  } catch (error) {
    console.error("Error fetching address book groups:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch address book groups"),
      { status: 500 },
    );
  }
}
