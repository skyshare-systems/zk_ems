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

    // multiple groupIds (comma-separated in query string)
    const groupIds = url.searchParams.get("groupIds")?.split(",").filter(Boolean) || [];

    const where: any = { companyId };

    if (search) {
      where.OR = [
        { emailAddress: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    if (groupIds.length > 0) {
      where.groups = {
        some: {
          id: { in: groupIds },
        },
      };
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
          groups: {
            select: {
              id: true,
              name: true,
            },
          },
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

/**
 * PATCH using query ?recipientId=...
 * Body must include companyId, and can include name, emailAddress, photoUrl, groupIds (final set).
 */
export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const recipientId = url.searchParams.get("recipientId");
    if (!recipientId) {
      return NextResponse.json(
        createErrorResponse("recipientId query parameter is required"),
        { status: 400 }
      );
    }

    const body = await request.json();
    const { companyId, name, emailAddress, photoUrl, groupIds } = body as {
      companyId?: string;
      name?: string;
      emailAddress?: string;
      photoUrl?: string | null;
      groupIds?: string[];
    };

    if (!companyId) {
      return NextResponse.json(createErrorResponse("companyId is required"), {
        status: 400,
      });
    }

    // Ensure recipient exists and belongs to company
    const recipient = await prisma.addressBookRecipient.findFirst({
      where: { id: recipientId, companyId },
      select: { id: true, emailAddress: true },
    });
    if (!recipient) {
      return NextResponse.json(
        createErrorResponse("Recipient not found for this company."),
        { status: 404 }
      );
    }

    // If email changes, enforce uniqueness per companyId
    if (emailAddress && emailAddress !== recipient.emailAddress) {
      const dup = await prisma.addressBookRecipient.findFirst({
        where: { companyId, emailAddress, NOT: { id: recipientId } },
        select: { id: true },
      });
      if (dup) {
        return NextResponse.json(
          createErrorResponse(
            `Recipient with email '${emailAddress}' already exists for this company.`
          ),
          { status: 400 }
        );
      }
    }

    // Validate groups (if provided)
    if (Array.isArray(groupIds) && groupIds.length) {
      const groups = await prisma.addressBookGroup.findMany({
        where: { id: { in: groupIds }, companyId },
        select: { id: true },
      });
      const existing = new Set(groups.map((g) => g.id));
      const invalid = groupIds.filter((id) => !existing.has(id));
      if (invalid.length) {
        return NextResponse.json(
          createErrorResponse(
            `Invalid groupIds: ${invalid.join(", ")}. They do not exist or don't belong to the company.`
          ),
          { status: 400 }
        );
      }
    }

    const updated = await prisma.addressBookRecipient.update({
      where: { id: recipientId },
      data: {
        name,
        emailAddress,
        photoUrl: photoUrl ?? undefined,
        ...(Array.isArray(groupIds)
          ? { groups: { set: groupIds.map((id) => ({ id })) } }
          : {}),
      },
      select: {
        id: true,
        name: true,
        emailAddress: true,
        photoUrl: true,
        groups: { select: { id: true, name: true, color: true } },
      },
    });

    return NextResponse.json(
      createApiResponse("Recipient updated successfully", updated)
    );
  } catch (err) {
    console.error("PATCH /address-book-recipient error", err);
    return NextResponse.json(
      createErrorResponse("Failed to update recipient"),
      { status: 500 }
    );
  }
}

/**
 * DELETE using query ?recipientId=...&companyId=...
 */
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const recipientId = url.searchParams.get("recipientId");
    const companyId = url.searchParams.get("companyId");

    if (!recipientId || !companyId) {
      return NextResponse.json(
        createErrorResponse("recipientId and companyId query parameters are required"),
        { status: 400 }
      );
    }

    const exists = await prisma.addressBookRecipient.findFirst({
      where: { id: recipientId, companyId },
      select: { id: true },
    });
    if (!exists) {
      return NextResponse.json(
        createErrorResponse("Recipient not found for this company."),
        { status: 404 }
      );
    }

    await prisma.addressBookRecipient.delete({ where: { id: recipientId } });

    return NextResponse.json(
      createApiResponse("Recipient deleted successfully", { id: recipientId })
    );
  } catch (err) {
    console.error("DELETE /address-book-recipient error", err);
    return NextResponse.json(
      createErrorResponse("Failed to delete recipient"),
      { status: 500 }
    );
  }
}
