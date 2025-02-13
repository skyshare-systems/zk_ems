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

    const smtp = await prisma.smtpCredential.findFirst({
      where: {
        company: {
          id: template.companyId,
        },
      },
    });

    if (!smtp) {
      return NextResponse.json(createApiResponse("SMTP not found", null), {
        status: 404,
      });
    }

const emailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        img {
            max-width: 100% !important;
            height: auto !important;
            display: block;
            margin: 0 auto;
            object-fit: contain;
            width: auto;
            border-radius: 8px;
        }
        
        @media screen and (max-width: 600px) {
            img {
                width: 100%;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
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
                            width: 100%;
                            position: relative;
                            display: inline-block;">
                    ${body}
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
`


    await prisma.$transaction(async (prisma) => {
      /* const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        auth: {
          user: smtp.username,
          pass: smtp.password,
        },
      });

          const emailResult = await transporter.sendMail({
        from: smtp.from,
        to: recipients,
        subject,
        html: emailContent,
      }); */

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

      await prisma.sentEmail.create({
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
          },
        },
      });
    });

    return NextResponse.json(createApiResponse("Email sent successfully", ""));
  } catch (error) {
    return NextResponse.json(createErrorMessage(error), { status: 500 });
  }
}
