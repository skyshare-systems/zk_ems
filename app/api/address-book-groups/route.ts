import { NextRequest, NextResponse } from "next/server";
import { createApiResponse, createErrorResponse } from "@/lib/utils";
import prisma from "@/lib/prisma";

/**
 * GET groups
 */
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

    const where: any = { companyId };
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const totalCount = await prisma.addressBookGroup.count({ where });

    const groups = await prisma.addressBookGroup.findMany({
      where,
      include: { recipients: true },
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

/**
 * CREATE group (with recipients support)
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, tag, color, companyId, recipientIds } = body;

    if (!name || !tag || !color || !companyId) {
      return NextResponse.json(
        createErrorResponse("name, tag, color, and companyId are required"),
        { status: 400 },
      );
    }

    const group = await prisma.addressBookGroup.create({
      data: {
        name,
        tag,
        color,
        companyId,
        recipients: recipientIds
          ? {
              connect: recipientIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: { recipients: true },
    });

    return NextResponse.json(
      createApiResponse("Group created successfully", group),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(createErrorResponse("Failed to create group"), {
      status: 500,
    });
  }
}

/**
 * UPDATE group (supports recipients)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, tag, color, connectIds, disconnectIds, setIds } = body;

    if (!id) {
      return NextResponse.json(createErrorResponse("Group id is required"), {
        status: 400,
      });
    }

    const updatedGroup = await prisma.addressBookGroup.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(tag && { tag }),
        ...(color && { color }),
        ...(connectIds && {
          recipients: {
            connect: connectIds.map((rId: string) => ({ id: rId })),
          },
        }),
        ...(disconnectIds && {
          recipients: {
            disconnect: disconnectIds.map((rId: string) => ({ id: rId })),
          },
        }),
        ...(setIds && {
          recipients: {
            set: setIds.map((rId: string) => ({ id: rId })),
          },
        }),
      },
      include: { recipients: true },
    });

    return NextResponse.json(
      createApiResponse("Group updated successfully", updatedGroup),
    );
  } catch (error) {
    console.error("Error updating group:", error);
    return NextResponse.json(createErrorResponse("Failed to update group"), {
      status: 500,
    });
  }
}

/**
 *  DELETE group
 */
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(createErrorResponse("Group id is required"), {
        status: 400,
      });
    }

    await prisma.addressBookGroup.delete({ where: { id } });

    return NextResponse.json(
      createApiResponse("Group deleted successfully", null),
    );
  } catch (error) {
    console.error("Error deleting group:", error);
    return NextResponse.json(createErrorResponse("Failed to delete group"), {
      status: 500,
    });
  }
}
