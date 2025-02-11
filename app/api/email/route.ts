import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Type definitions for better type safety
interface EmailRequest {
  subject: string;
  templateId: string;
  body: string;
  recipients: string[];
}

export async function POST(req: NextRequest) {
  try {
    const { subject, templateId, body, recipients } =
      (await req.json()) as EmailRequest;

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
        { status: 400 }
      );
    }

    // Fetch template with company data
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      select: {
        header: true,
        footer: true,
        companyId: true,
        company: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!template) {
      return NextResponse.json(createApiResponse("Template not found", null), {
        status: 404,
      });
    }

    // Construct email content
    const emailContent = `
      ${template.header}
      <div style="padding: 20px; min-height: 100px;">${body}</div>
      ${template.footer}
    `.trim();

    // Create email transporter once

    await prisma.$transaction(async (prisma) => {
    const transporter = nodemailer.createTransport({
        host: "email-smtp.eu-west-1.amazonaws.com",
        port: 587,
        auth: {
          user: "AKIA33FBU3VU5BFLWDFZ",
          pass: "BO3dk7L8/ZbjC0OHaHkdtvcNTEsn0XvxOjn4G1avUPxj",
        },
      });

  
      const emailResult = await transporter.sendMail({
        from: "support@coinkings.tech",
        to: recipients,
        subject,
        html: emailContent,
      });

      if (emailResult.rejected.length > 0) {
        console.error("Failed to send emails to:", emailResult.rejected);
      } 

  

      const sentEmail = await prisma.sentEmail.create({
        data: {
          email: emailContent,
          templateId,
          companyId: template.companyId,
          recipients: {
            createMany: {
              data: recipients.map((recipient) => ({
                emailAddress: recipient,
              })),
            },
          }
        },
      });

      console.log({sentEmail})
/* 
      await prisma.recipient.createMany({
        data: recipients.map((recipient) => ({
          emailAddress: recipient,
          sentEmailId: sentEmail.id, // Associate with created SentEmail
        })),
      }); */
    });

    return NextResponse.json(createApiResponse("Email sent successfully", ""));
  } catch (error) {

    return NextResponse.json(createErrorMessage(error), { status: 500 });
  }
}
