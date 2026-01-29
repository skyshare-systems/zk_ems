import prisma from "@/lib/prisma";
import { createErrorResponse, createApiResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

interface BulkRecipient {
  emailAddress: string;
  name?: string;
  photoUrl?: string;
  groups?: string[]; // Array of group tags or IDs
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyId, recipients } = body as {
      companyId: string;
      recipients: BulkRecipient[];
    };

    if (!companyId) {
      return NextResponse.json(createErrorResponse("companyId is required"), {
        status: 400,
      });
    }

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        createErrorResponse("recipients array is required and must not be empty"),
        { status: 400 }
      );
    }

    // Get company with image for default photoUrl
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { id: true, image: true },
    });
    if (!company) {
      return NextResponse.json(
        createErrorResponse(`Company with id '${companyId}' does not exist.`),
        { status: 400 }
      );
    }

    // Get all groups for this company to map tags to IDs
    const companyGroups = await prisma.addressBookGroup.findMany({
      where: { companyId },
      select: { id: true, tag: true, name: true },
    });
    const groupTagToId = new Map<string, string>();
    companyGroups.forEach((g) => {
      groupTagToId.set(g.tag.toLowerCase(), g.id);
      groupTagToId.set(g.name.toLowerCase(), g.id);
      groupTagToId.set(g.id, g.id); // Also allow direct ID
    });

    // Get existing emails for this company to skip duplicates
    const existingRecipients = await prisma.addressBookRecipient.findMany({
      where: { companyId },
      select: { emailAddress: true },
    });
    const existingEmails = new Set(
      existingRecipients.map((r) => r.emailAddress.toLowerCase())
    );

    // Filter out duplicates and prepare data
    const recipientsWithoutGroups: { emailAddress: string; name: string; photoUrl?: string; companyId: string }[] = [];
    const recipientsWithGroups: { emailAddress: string; name: string; photoUrl?: string; companyId: string; groupIds: string[] }[] = [];
    const duplicates: string[] = [];
    const invalidEmails: string[] = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const recipient of recipients) {
      const email = recipient.emailAddress?.trim().toLowerCase();

      if (!email || !emailRegex.test(email)) {
        invalidEmails.push(recipient.emailAddress || "empty");
        continue;
      }

      if (existingEmails.has(email)) {
        duplicates.push(email);
        continue;
      }

      // Check if we've already added this email in current batch
      const alreadyAdded = recipientsWithoutGroups.some((r) => r.emailAddress === email) ||
                          recipientsWithGroups.some((r) => r.emailAddress === email);
      if (alreadyAdded) {
        duplicates.push(email);
        continue;
      }

      // Map group tags to IDs
      const groupIds: string[] = [];
      if (recipient.groups && Array.isArray(recipient.groups)) {
        for (const groupTag of recipient.groups) {
          const groupId = groupTagToId.get(groupTag.toLowerCase().trim());
          if (groupId && !groupIds.includes(groupId)) {
            groupIds.push(groupId);
          }
        }
      }

      const recipientData = {
        emailAddress: email,
        name: recipient.name || email.split("@")[0],
        photoUrl: recipient.photoUrl || company.image || undefined,
        companyId,
      };

      if (groupIds.length > 0) {
        recipientsWithGroups.push({ ...recipientData, groupIds });
      } else {
        recipientsWithoutGroups.push(recipientData);
      }
    }

    let createdCount = 0;

    // Bulk create recipients without groups
    if (recipientsWithoutGroups.length > 0) {
      const chunkSize = 500;
      for (let i = 0; i < recipientsWithoutGroups.length; i += chunkSize) {
        const chunk = recipientsWithoutGroups.slice(i, i + chunkSize);
        await prisma.addressBookRecipient.createMany({
          data: chunk,
          skipDuplicates: true,
        });
        createdCount += chunk.length;
      }
    }

    // Create recipients with groups one by one (createMany doesn't support relations)
    for (const recipient of recipientsWithGroups) {
      try {
        await prisma.addressBookRecipient.create({
          data: {
            emailAddress: recipient.emailAddress,
            name: recipient.name,
            photoUrl: recipient.photoUrl,
            companyId: recipient.companyId,
            groups: {
              connect: recipient.groupIds.map((id) => ({ id })),
            },
          },
        });
        createdCount++;
      } catch (e) {
        // Skip if duplicate
        console.error("Error creating recipient with groups:", e);
      }
    }

    return NextResponse.json(
      createApiResponse("Bulk import completed", {
        created: createdCount,
        duplicatesSkipped: duplicates.length,
        invalidSkipped: invalidEmails.length,
        total: recipients.length,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error bulk importing recipients:", error);
    return NextResponse.json(
      createErrorResponse("Failed to bulk import recipients"),
      { status: 500 }
    );
  }
}
