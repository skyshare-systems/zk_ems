import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";
import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = authorize(async (request: AuthenticatedRequest) => {
  try {
    const {
      endpoint,
      region,
      bucketName,
      accessKeyId,
      secretAccessKey,
      companyId,
    } = (await request.json()) as Prisma.StorageConfigUpdateInput & {
      companyId: string;
    };

    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    if (
      !endpoint ||
      !region ||
      !bucketName ||
      !accessKeyId ||
      !secretAccessKey ||
      !companyId
    ) {
      return NextResponse.json(
        createErrorMessage({ error: "Invalid Request Data" }),
        { status: 500 },
      );
    }

    const storageConfig = await prisma.storageConfig.findFirst({
      where: {
        company: {
          id: companyId,
        },
      },
    });

    if (!storageConfig) {
      return NextResponse.json(
        createErrorMessage({ error: "Storage Config is not found." }),
        { status: 500 },
      );
    }

    const updateStorageConfig = await prisma.storageConfig.update({
      where: {
        id: storageConfig.id,
      },
      data: {
        endpoint,
        region,
        bucketName,
        accessKeyId,
        secretAccessKey,
      },
    });

    return NextResponse.json(
      createApiResponse("SMTP credentials updated", updateStorageConfig),
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(createErrorMessage(error), { status: 500 });
  }
});
