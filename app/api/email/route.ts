import prisma from "@/lib/prisma";
import {
  createApiResponse,
  createErrorMessage,
  getTemplateLookup,
  updateFontHtml,
} from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import juice from "juice";
import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";

// Type definitions for better type safety
interface EmailRequest {
  subject: string;
  templateId: string;
  body: string;
  recipients: string[];
  alignment: "left" | "center" | "right";
  props: Record<string, any>;
}

const getTransporter = (smtp: {
  host: string;
  port: number;
  username: string;
  password: string;
}) => {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    auth: {
      user: smtp.username,
      pass: smtp.password,
    },
  });
};

export const POST = authorize(async (request: AuthenticatedRequest) => {
  try {
    const { subject, templateId, body, recipients, alignment, ...props } =
      (await request.json()) as EmailRequest;


    // Input validation
    if (
      !subject?.trim() ||
      !templateId?.trim() ||
      !body?.trim() ||
      !Array.isArray(recipients) ||
      recipients.length === 0
    ) {
      return NextResponse.json(
        createApiResponse("Invalid request data", null),
        { status: 400 },
      );
    }

    // Fetch template details
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      select: {
        header: true,
        footer: true,
        companyId: true,
        company: { select: { name: true } },
      },
    });

    if (!template) {
      return NextResponse.json(createApiResponse("Template not found", null), {
        status: 404,
      });
    }

    const htmlTemplate = await getTemplateLookup(templateId, {
      body,
      ...props,
    });

    const updatedHtml = updateFontHtml(htmlTemplate);

    // Fetch SMTP credentials
    const smtp = await prisma.smtpCredential.findFirst({
      where: { company: { id: template.companyId } },
    });

    if (!smtp) {
      return NextResponse.json(createApiResponse("SMTP not found", null), {
        status: 404,
      });
    }

    // Send email inside a database transaction
    const transporter = getTransporter(smtp);

    // Store sent email details
    const sentEmail = await prisma.sentEmail.create({
      data: {
        subject,
        header: template.header,
        body: updatedHtml,
        footer: template.footer,
        templateId,
        companyId: template.companyId,
        recipients: {
          createMany: {
            data: recipients.map((email) => ({ emailAddress: email })),
          },
        },
      },
    });

    const emailResult = await transporter.sendMail({
      from: smtp.from, // Use SMTP username as sender
      to: [...recipients],
      subject,
      html: updatedHtml,
      
    });

    if (emailResult.rejected.length > 0) {
      console.error("Failed to send emails to:", emailResult.rejected);
    }


    return NextResponse.json(
      createApiResponse("Email sent successfully", null),
    );
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
});
