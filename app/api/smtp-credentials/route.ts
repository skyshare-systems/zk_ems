import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";
import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = authorize(async (request: AuthenticatedRequest) => {
  try {
    const { from, host, port, username, password, companyId } =
      (await request.json()) as Prisma.SmtpCredentialUpdateInput & {
        companyId: string;
      };

    if (!from || !host || !port || !username || !password || !companyId) {
      return NextResponse.json(
        createErrorMessage({ error: "Invalid Request Data." }),
        { status: 500 },
      );
    }

    const smtp = await prisma.smtpCredential.findFirst({
      where: {
        company: {
          id: companyId,
        },
      },
    });

    if (!smtp) {
      return NextResponse.json(
        createErrorMessage({ error: "SMTP Credentials not found." }),
        { status: 500 },
      );
    }

    const updatedSmtp = await prisma.smtpCredential.update({
      where: {
        id: smtp.id,
      },
      data: {
        from,
        host,
        port,
        username: username,
        password: password,
      },
    });

    return NextResponse.json(
      createApiResponse("SMTP credentials updated", updatedSmtp),
    );
  } catch (error) {
    return NextResponse.json(createErrorMessage(error), { status: 500 });
  }
});
