import prisma from "@/lib/prisma";
import { createApiResponse, updateFontHtml } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";
import { generateTemplate } from "@/lib/generateTemplate";
import { Attachment } from "nodemailer/lib/mailer";
import { render } from "@react-email/render";
import SkyshareLabsJPLTemplate from "@/emails/skyshare/jpl/jpl";
import { emailTemplates } from "@/lib/constant";
import { getTemplateLookup } from "../../templates/generateTemplate/route";

export const POST = authorize(async (request: AuthenticatedRequest) => {
  try {
    const formData = await request.formData();

    const subject = formData.get("subject") as string;
    const templateId = formData.get("templateId") as string;
    const body = formData.get("body") as string;
    const alignment = formData.get("alignment") as string;
    const recipients = formData.getAll("recipients") as string[];
    const attachments = formData.getAll("attachments") as File[];
    const props = formData.getAll("props") as string[];

    if (!subject || !templateId || !body || recipients.length === 0) {
      return NextResponse.json(
        createApiResponse("Invalid request data", null),
        { status: 400 },
      );
    }

    const userData = await prisma.user.findUnique({
      where: { id: request.user?.id },
      include: { companies: { select: { company: true } } },
    });

    if (!userData) {
      return NextResponse.json(createApiResponse("User not found", null), {
        status: 404,
      });
    }

    const isAuthorized = userData.companies.some(
      (company) => company.company.name === "Skyshare Labs",
    );
    if (!isAuthorized) {
      return NextResponse.json(createApiResponse("Unauthorized access", null), {
        status: 401,
      });
    }

    const template = await prisma.template.findUnique({
      where: { id: templateId },
      select: {
        header: true,
        footer: true,
        companyId: true,
        company: { select: { name: true } },
      },
    });

    if (!template || template.company.name !== "Skyshare Labs") {
      return NextResponse.json(
        createApiResponse("Template not found or unauthorized", null),
        { status: 404 },
      );
    }

    const htmlTemplate = await getTemplateLookup(templateId, {
      body,
      ...props,
    });
    const updatedHtml = updateFontHtml(htmlTemplate);

    const transporter = createEmailTransporter();

    const arrayFileName = attachments.map((file) => file.name);

    await prisma.sentEmail.create({
      data: {
        subject,
        header: template.header,
        body: updatedHtml,
        footer: template.footer,
        templateId,
        companyId: template.companyId,
        attachments: arrayFileName,
        recipients: {
          createMany: {
            data: recipients.map((email) => ({ emailAddress: email })),
          },
        },
      },
    });

    await sendEmail(transporter, subject, updatedHtml, recipients, attachments);

    return NextResponse.json(
      createApiResponse("Email sent successfully", null),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(createApiResponse("Internal Server Error", null), {
      status: 500,
    });
  }
});

function createEmailTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jameslucas@skysharelabs.com",
      pass: "hxtipxsopsizpmvp",
    },
  });
}

async function sendEmail(
  transporter: nodemailer.Transporter,
  subject: string,
  html: string,
  recipients: string[],
  attachments: File[],
) {
  const formattedAttachments: Attachment[] = await Promise.all(
    attachments.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  return transporter.sendMail({
    from: "jameslucas@skysharelabs.com",
    to: ["ijohnpaul2000@gmail.com", ...recipients],
    subject,
    html,
    attachments: formattedAttachments,
  });
}
