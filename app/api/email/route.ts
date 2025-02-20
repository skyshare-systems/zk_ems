import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import juice from "juice";

// Type definitions for better type safety
interface EmailRequest {
  subject: string;
  templateId: string;
  body: string;
  recipients: string[];
}

const getTransporter = (smtp: {
  host: string;
  port: number;
  username: string;
  password: string;
}) => {
  return nodemailer.createTransport({
    host: "email-smtp.eu-west-1.amazonaws.com",
    port: 587,
    auth: {
      user: "AKIA33FBU3VU5BFLWDFZ",
      pass: "BO3dk7L8/ZbjC0OHaHkdtvcNTEsn0XvxOjn4G1avUPxj",
    },
  });
};

export async function POST(req: NextRequest) {
  try {
    const { subject, templateId, body, recipients } =
      (await req.json()) as EmailRequest;

    // Input validation
  /*   if (
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
    } */

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

    const modifiedBody = body.replace(
      /<img(?![^>]*\bwidth\b)([^>]*)>/gi,
      '<img width="100%" style="border-radius:12px" $1>'
    );

    console.log({ modifiedBody });

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
    <div 
        class="email-container" 
        style="
            box-sizing: border-box;
            background-color: #f0f0f0;
            padding: 16px;
        "
    >
        <!-- Centered White Container -->
        <div 
            class="email-content" 
            style="
                box-sizing: border-box;
                background-color: #ffffff;
                width: 100%;
                max-width: 640px;
                padding: 20px;
                margin: 0 auto;
                border-radius: 8px;
                text-align: center;
            "
        >
            <!-- Header -->
            <div class="email-header" style="margin-bottom: 20px;">
                ${template.header}
            </div>

            <!-- Email Body -->
            <div 
                class="email-body" 
                style="
                    box-sizing: border-box;
                    padding: 20px;
                    min-height: 100px;
                    text-align: center;
                    width: 100%;
                "
            >
                <div style="max-width: 100%;
                            width: 100%;">
                    ${modifiedBody}
                </div>
            </div>

            <!-- Footer -->
            <div class="email-footer" style="margin-top: 20px;">
                ${template.footer}
            </div>
        </div>
    </div>
    </body>
      </html>
    `;

    // Fetch SMTP credentials
    const smtp = await prisma.smtpCredential.findFirst({
      where: { company: { id: template.companyId } },
    });

    if (!smtp) {
      return NextResponse.json(createApiResponse("SMTP not found", null), {
        status: 404,
      });
    }

    const inlinedHtml = juice(fullHtml);

    // Send email inside a database transaction
    await prisma.$transaction(async (prisma) => {
      const transporter = getTransporter(smtp);

      try {
        // Store sent email details
        const sentEmail = await prisma.sentEmail.create({
          data: {
            header: template.header,
            body: modifiedBody,
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
        console.log({ sentEmail });
      } catch (error) {
        console.log({ error });
      }

    /*   const emailResult = await transporter.sendMail({
        from: "support@coinkings.tech", // Use SMTP username as sender
        to: recipients,
        subject,
        html: inlinedHtml,
      });
 */
    /*   if (emailResult.rejected.length > 0) {
        console.error("Failed to send emails to:", emailResult.rejected);
      } */
    });

    return NextResponse.json(
      createApiResponse("Email sent successfully", null)
    );
  } catch (error) {
    return NextResponse.json({
      error
    });
  }
}
