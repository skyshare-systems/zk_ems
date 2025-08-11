import prisma from "@/lib/prisma";
import { createErrorResponse, Meta, createApiResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
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
      where.OR = [
        { emailAddress: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    const totalCount = await prisma.addressBookRecipient.count({ where });

    const recipients = await prisma.addressBookRecipient.findMany({
      where,
      include: {
        groups: true,
        company: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPage = Math.ceil(totalCount / limit);
    const remaining = totalCount - page * limit;
    const hasNextPage = remaining > 0;

    const meta: Meta = {
      page,
      totalPage,
      remaining: remaining > 0 ? remaining : 0,
      hasNextPage,
    };

    return NextResponse.json(
      createApiResponse(
        "Address book recipients fetched successfully",
        recipients,
        meta,
      ),
    );
  } catch (error) {
    console.error("Error fetching address book recipients:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch address book recipients"),
      { status: 500 },
    );
  }
}


interface CreateRecipientRequest {
  emailAddress: string;
  name: string;
  photoUrl?: string;
  companyId: string;
  groupIds?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      emailAddress,
      name,
      photoUrl,
      companyId,
      groupIds,
    }= body as CreateRecipientRequest;

    if (!companyId) {
      return NextResponse.json(
        createErrorResponse("companyId is required"),
        { status: 400 }
      );
    }

    if (!emailAddress) {
      return NextResponse.json(
        createErrorResponse("emailAddress is required"),
        { status: 400 }
      );
    }

    // Check if company exists
    const companyExists = await prisma.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });

    if (!companyExists) {
      return NextResponse.json(
        createErrorResponse(`Company with id '${companyId}' does not exist.`),
        { status: 400 }
      );
    }

    // Check if recipient email already exists for this company
    const existingRecipient = await prisma.addressBookRecipient.findFirst({
      where: {
        emailAddress,
        companyId,
      },
    });

    if (existingRecipient) {
      return NextResponse.json(
        createErrorResponse(
          `Recipient with email '${emailAddress}' already exists for this company.`
        ),
        { status: 400 }
      );
    }

    // If groupIds provided, check if all exist and belong to company
    if (groupIds && groupIds.length > 0) {
      const existingGroups = await prisma.addressBookGroup.findMany({
        where: {
          id: { in: groupIds },
          companyId,
        },
        select: { id: true },
      });

      const existingGroupIds = existingGroups.map((g) => g.id);

      const invalidGroupIds = groupIds.filter((id) => !existingGroupIds.includes(id));
      if (invalidGroupIds.length > 0) {
        return NextResponse.json(
          createErrorResponse(
            `Invalid groupIds: ${invalidGroupIds.join(", ")}. They do not exist or don't belong to the company.`
          ),
          { status: 400 }
        );
      }
    }

    const newRecipient = await prisma.addressBookRecipient.create({
      data: {
        emailAddress,
        name,
        photoUrl,
        companyId,
        groups: groupIds && groupIds.length > 0
          ? {
              connect: groupIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });

    return NextResponse.json(
      createApiResponse("Address book recipient created successfully", newRecipient),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating address book recipient:", error);
    return NextResponse.json(
      createErrorResponse("Failed to create address book recipient"),
      { status: 500 }
    );
  }
}
