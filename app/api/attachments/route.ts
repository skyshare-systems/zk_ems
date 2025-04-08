import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";
import prisma from "@/lib/prisma";
import { createErrorMessage } from "@/lib/utils";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

interface FileUpload extends File {
  arrayBuffer: () => Promise<ArrayBuffer>;
}

export const POST = authorize(async (request: AuthenticatedRequest) => {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file") as FileUpload[];
    const filename = formData.get("filename") as string;
    const companyId = formData.get("companyId") as string;

    if (!companyId) {
      return NextResponse.json(
        { message: "No company ID provided" },
        { status: 400 }
      );
    }

    if (!files.length) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    // Fetch storage credentials for the company
    const bucketCredentials = await prisma.storageConfig.findFirst({
      where: { company: { id: companyId } },
    });

    console.log({bucketCredentials})


    if (!bucketCredentials) {
      return NextResponse.json(
        { message: "No bucket credentials found" },
        { status: 400 }
      );
    }

    const { endpoint, region, accessKeyId, secretAccessKey, bucketName } =
      bucketCredentials;

    if (
      !endpoint ||
      !region ||
      !accessKeyId ||
      !secretAccessKey ||
      !bucketName
    ) {
      return NextResponse.json(
        { message: "Invalid bucket credentials" },
        { status: 400 }
      );
    }

    const s3Client = new S3Client({
      endpoint,
      region,
      credentials: { accessKeyId, secretAccessKey },
    });

    const file: any = files[0];

    console.log({
      bucketName
    })

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filename,
      Body: await file.arrayBuffer(),
      ACL: "public-read",
      ContentType: file.type || "application/octet-stream",
    });

    await s3Client.send(command);

    let fileUrl = "";

    if (endpoint.includes("amazonaws.com")) {
      // AWS S3 URL format: https://{bucket}.s3.{region}.amazonaws.com/{filename}
      fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${filename}`;
    } else {
      // DigitalOcean Spaces URL format: https://{bucket}.{region}.digitaloceanspaces.com/{filename}
      fileUrl = `https://${bucketName}.${region}.digitaloceanspaces.com/${filename}`;
    }

    return NextResponse.json({ filepath: fileUrl });
  } catch (error) {
    console.log({error});
    return NextResponse.json(createErrorMessage(error), {
      status: 500,
    });
  }
});
