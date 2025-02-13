import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  try {
    const {  host, bucketName, accessKeyId, secretAccessKey, companyId } =
      (await request.json()) as Prisma.StorageConfigUpdateInput & {
        companyId: string;
      };


      const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

    if (!host || !bucketName || !accessKeyId || !secretAccessKey || !companyId) {
      return createErrorMessage("Invalid request data");
    }

    const storageConfig = await prisma.storageConfig.findFirst({
      where: {
        company: {
          id: companyId,
        },
      },
    });

    if (!storageConfig) {
      return createErrorMessage("Storage config not found");
    }

    const updateStorageConfig = await prisma.storageConfig.update({
      where: {
        id: storageConfig.id,
      },
      data: {
        host,
        bucketName,
        accessKeyId,
        secretAccessKey
      },
    });

    return NextResponse.json(createApiResponse("SMTP credentials updated", updateStorageConfig));
    
  } catch (error) {
    return createErrorMessage(error);
  }
};
