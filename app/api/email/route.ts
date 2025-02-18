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

/**
 * Generates an HTML email template with uniform styling.
 */

const header = `
  <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
    <h1 style="color: #333;">Welcome to Our Newsletter</h1>
  </div>
`;

const footer = `
  <div
    class="footer-content"
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      align-self: stretch;
      background-color: #f4f4f4;
      padding: 20px;
      text-align: center;
    "
  >
    <p
      style="
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        text-align: center;
        color: #333;
      "
    >
      Grow Beyond Your Limits
    </p>
    <p
      style="
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        text-align: center;
        color: #666;
      "
    >
      The pioneering agency in delivering tailored business solutions that
      empower SMEs to scale, streamline, and succeed.
    </p>
    <p
      style="
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        text-align: center;
        color: #666;
      "
    >
      The pioneering agency in delivering tailored business solutions that
      empower SMEs to scale, streamline, and succeed.
    </p>
    <p
      style="
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        text-align: center;
        color: #666;
      "
    >
      The pioneering agency in delivering tailored business solutions that
      empower SMEs to scale, streamline, and succeed.
    </p>
    <p
      style="
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        text-align: center;
        color: #666;
      "
    >
      The pioneering agency in delivering tailored business solutions that
      empower SMEs to scale, streamline, and succeed.
    </p>
  </div>
`;


const generateEmailTemplate = (header: string, body: string, footer: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>

      /* 1. Use a more-intuitive box-sizing model */
      *, *::before, *::after {
        box-sizing: border-box;
      }

      /* 2. Remove default margin */
      * {
        margin: 0;
      }

      body {
        /* 3. Add accessible line-height */
        line-height: 1.5;
        /* 4. Improve text rendering */
        -webkit-font-smoothing: antialiased;
      }

      /* 5. Improve media defaults */
      img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
      }

      /* 6. Inherit fonts for form controls */
      input, button, textarea, select {
        font: inherit;
      }

      /* 7. Avoid text overflows */
      p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
      }

      /* 8. Improve line wrapping */
      p {
        text-wrap: pretty;
      }
      h1, h2, h3, h4, h5, h6 {
        text-wrap: balance;
      }

      /*
        9. Create a root stacking context
      */
      #root, #__next {
        isolation: isolate;
      }

        body {
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }

        .email-container {
            background-color: #f0f0f0;
            padding: 16px;
        }
        .email-content {
            background-color: #ffffff;
            max-width: 640px;
            padding: 20px;
            margin: 0 auto;
            border-radius: 8px;
            text-align: center;
        }
        .email-header,
        .email-footer {
            margin-bottom: 20px;
        }
        .email-body {
            padding: 20px;
            min-height: 100px;
            text-align: center;
        }
        img {
            max-width: 100% !important;
            height: auto !important;
            display: block;
            margin: 0 auto;
            object-fit: contain;
            border-radius: 8px;
        }
        @media screen and (max-width: 600px) {
            img {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-content">
            <div class="email-header">${header}</div>
            <div class="email-body">${body}</div>
            <div class="email-footer">${footer}</div>
        </div>
    </div>
</body>
</html>
`;

/**
 * Configures and returns an SMTP transporter.
 */


// CSS Reset
const cssReset = `
  body, table, td, div, p, a {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  img {
    border: 0;
    outline: none;
    text-decoration: none;
    -ms-interpolation-mode: bicubic;
  }

  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height: 100%;
  }

  [owa] .email-container {
    width: 100% !important;
  }
`;

// Combine header, content, and footer


const getTransporter = (smtp: { host: string; port: number; username: string; password: string }) => {
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
    const { subject, templateId, body, recipients } = (await req.json()) as EmailRequest;

    // Input validation
    if (!subject?.trim() || !templateId?.trim() || !body?.trim() || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(createApiResponse("Invalid request data", null), { status: 400 });
    }

    // Fetch template details
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      select: {
        style: true,
        header: true,
        footer: true,
        companyId: true,
        company: { select: { name: true } },
      },
    });

    if (!template) {
      return NextResponse.json(createApiResponse("Template not found", null), { status: 404 });
    }

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${cssReset}</style>
      </head>
      <body>
        ${header}
        ${body}
        ${template.footer}
      </body>
      </html>
    `;

    // Fetch SMTP credentials
    const smtp = await prisma.smtpCredential.findFirst({
      where: { company: { id: template.companyId } },
    });

    if (!smtp) {
      return NextResponse.json(createApiResponse("SMTP not found", null), { status: 404 });
    }

    // Generate email content
    const emailContent = generateEmailTemplate(template.header, body, template.footer);

    const inlinedHtml = juice(fullHtml);


    // Send email inside a database transaction
    await prisma.$transaction(async (prisma) => {
      const transporter = getTransporter(smtp);

      const emailResult = await transporter.sendMail({
        from: "support@coinkings.tech", // Use SMTP username as sender
        to: recipients,
        subject,
        html: inlinedHtml,
      });

      if (emailResult.rejected.length > 0) {
        console.error("Failed to send emails to:", emailResult.rejected);
      }

      // Store sent email details
      await prisma.sentEmail.create({
        data: {
          header: template.header,
          style: template.style,
          body,
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
    });

    return NextResponse.json(createApiResponse("Email sent successfully", null));
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(createErrorMessage(error), { status: 500 });
  }
}
