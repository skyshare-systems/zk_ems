import { NextRequest, NextResponse } from "next/server";
import { createApiResponse, createErrorResponse } from "@/lib/utils";
import prisma from "@/lib/prisma";

/**
 * GET recipients emails for a specific group
 * Usage: /api/address-book-groups/recipients?groupId=xxx&companyId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const groupId = url.searchParams.get("groupId");
    const companyId = url.searchParams.get("companyId");

    if (!groupId || !companyId) {
      return NextResponse.json(
        createErrorResponse("groupId and companyId query parameters are required"),
        { status: 400 },
      );
    }

    const group = await prisma.addressBookGroup.findUnique({
      where: { id: groupId },
      include: { 
        recipients: {
          select: { emailAddress: true }
        }
      },
    });

    if (!group || group.companyId !== companyId) {
      return NextResponse.json(
        createErrorResponse("Group not found or access denied"),
        { status: 404 },
      );
    }

    const emails = group.recipients.map(recipient => recipient.emailAddress);

    const response = {
      groupName: group.name,
      recipients: emails,
    };

    return NextResponse.json(
      createApiResponse("Recipient emails fetched successfully", response),
    );
  } catch (error) {
    console.error("Error fetching recipient emails:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch recipient emails"),
      { status: 500 },
    );
  }
}