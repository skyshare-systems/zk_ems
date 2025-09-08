import prisma from "@/lib/prisma";
import { createErrorResponse, Meta, createApiResponse } from "@/lib/utils";
import { CreateRecipientRequest } from "@/store/address-book-recipients";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const companyId = url.searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json(
        createErrorResponse("companyId query parameter is required"),
        { status: 400 }
      );
    }

    // pagination
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(url.searchParams.get("limit") || "10", 10));
    const search = url.searchParams.get("search")?.trim();

    const where: any = { companyId };

    if (search) {
      where.OR = [
        { emailAddress: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    const [totalCount, recipients] = await Promise.all([
      prisma.addressBookRecipient.count({ where }),
      prisma.addressBookRecipient.findMany({
        where,
        select: {
          id: true,
          name: true,
          emailAddress: true,
          photoUrl: true,
          groups: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPage = Math.ceil(totalCount / limit);
    const remaining = totalCount - page * limit;
    const hasNextPage = remaining > 0;

    const meta: Meta = {
      page,
      totalPage,
      remaining: Math.max(0, remaining),
      hasNextPage,
    };

    return NextResponse.json(
      createApiResponse("Recipients fetched successfully", recipients, meta)
    );
  } catch (error) {
    console.error("Error fetching address book recipients:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch recipients"),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emailAddress, name, photoUrl, companyId, groupIds } =
      body as CreateRecipientRequest;

    if (!companyId) {
      return NextResponse.json(createErrorResponse("companyId is required"), {
        status: 400,
      });
    }
    if (!emailAddress) {
      return NextResponse.json(
        createErrorResponse("emailAddress is required"),
        { status: 400 }
      );
    }

    // check company
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

    // check duplicate email
    const existingRecipient = await prisma.addressBookRecipient.findFirst({
      where: { emailAddress, companyId },
    });
    if (existingRecipient) {
      return NextResponse.json(
        createErrorResponse(
          `Recipient with email '${emailAddress}' already exists for this company.`
        ),
        { status: 400 }
      );
    }

    // validate groupIds
    if (groupIds?.length) {
      const existingGroups = await prisma.addressBookGroup.findMany({
        where: { id: { in: groupIds }, companyId },
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
        groups: groupIds?.length
          ? { connect: groupIds.map((id) => ({ id })) }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        emailAddress: true,
        photoUrl: true,
      },
    });

    return NextResponse.json(
      createApiResponse("Recipient created successfully", newRecipient),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating address book recipient:", error);
    return NextResponse.json(
      createErrorResponse("Failed to create recipient"),
      { status: 500 }
    );
  }
}
