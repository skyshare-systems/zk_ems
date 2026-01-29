import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";
import prisma from "@/lib/prisma";
import {
  createApiResponse,
  getTemplateLookup,
  updateFontHtml,
} from "@/lib/utils";
import { Mode, TemplateWithCompany } from "@/store/create-email";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Type definitions for better type safety
interface EmailRequest {
  subject: string;
  templateId: string;
  body: string;
  recipients: string[];
  alignment?: "left" | "center" | "right";
  mode?: Mode;
  selectedSentEmail?: string | null; // Changed from selectedSentEmailId
  props?: Record<string, any>;
  // Add other properties from your payload
  attachments?: any[];
  cta?: { link: string; text: string };
  fromThePeople?: any[];
  articles?: any[];
  upcomingPrograms?: any[];
  products?: any[];
  services?: any[];
  posts?: any[];
  sectionOrder?: string[];
  isSectionOrderUpdated?: boolean;
  programs?: any[];
}

const getTransporter = (smtp: {
  host: string;
  port: number;
  username: string;
  password: string;
  from: string;
}) => {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    auth: {
      user: smtp.username,
      pass: smtp.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const POST = authorize(async (request: AuthenticatedRequest) => {
  try {
    const requestData = (await request.json()) as EmailRequest;
    
    const {
      subject,
      templateId,
      body,
      recipients,
      alignment,
      mode = "normal", // Default mode if not provided
      selectedSentEmail, // Changed from selectedSentEmailId
      ...props
    } = requestData;

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

    // Only fetch sent email template if mode is forward and selectedSentEmail is provided
    let sentEmailTemplate = null;
    if (mode === "forward" && selectedSentEmail) {
      sentEmailTemplate = await prisma.sentEmail.findUnique({
        where: {
          id: selectedSentEmail,
        },
      });

      if (!sentEmailTemplate) {
        return NextResponse.json(
          createApiResponse("Sent email not found", null),
          {
            status: 404,
          },
        );
      }
    }

    // Generate email content
    let emailContent: string;

    // For forward mode with no edits, use the original sent email body
    // For forward mode with edits (body differs), regenerate the template
    const sentEmailFormData = sentEmailTemplate?.formData as any;
    const originalBody = sentEmailFormData?.rawBody || "";
    const hasEdits = body && body !== originalBody;

    if (mode === "forward" && sentEmailTemplate && !hasEdits) {
      // Simple forward - use original email body
      emailContent = sentEmailTemplate.body;
    } else {
      // New email or edited forward - generate from template
      const htmlTemplate = await getTemplateLookup(templateId, {
        body,
        ...props,
      });
      emailContent = updateFontHtml(htmlTemplate);
    }

    // Fetch SMTP credentials
    const smtp = await prisma.smtpCredential.findFirst({
      where: { company: { id: template.companyId } },
    });

    if (!smtp) {
      return NextResponse.json(createApiResponse("SMTP not found", null), {
        status: 404,
      });
    }

    // Create transporter
    const transporter = getTransporter(smtp);

    // Build formData to store structured data for future editing
    const formData = {
      rawBody: body,
      articles: props.articles || [],
      fromThePeople: props.fromThePeople || [],
      upcomingPrograms: props.upcomingPrograms || [],
      products: props.products || [],
      services: props.services || [],
      posts: props.posts || [],
      programs: props.programs || [],
      cta: props.cta || { link: "", text: "" },
      sectionOrder: props.sectionOrder || [],
      isSectionOrderUpdated: props.isSectionOrderUpdated || false,
    };

    // Store sent email details in database transaction
    const sentEmail = await prisma.sentEmail.create({
      data: {
        subject,
        header: template.header,
        body: emailContent,
        footer: template.footer,
        templateId,
        companyId: template.companyId,
        formData,
        recipients: {
          createMany: {
            data: recipients.map((email) => ({ emailAddress: email })),
          },
        },
      },
    });

    // Send email
    const emailResult = await transporter.sendMail({
      from: smtp.from,
      to: recipients,
      subject,
      html: emailContent,
    });

    if (emailResult.rejected.length > 0) {
      console.error("Failed to send emails to:", emailResult.rejected);
      return NextResponse.json(
        createApiResponse("Some emails failed to send", {
          rejected: emailResult.rejected,
          accepted: emailResult.accepted,
        }),
        { status: 207 }, // Multi-status
      );
    }

    return NextResponse.json(
      createApiResponse("Email sent successfully", {
        sentEmailId: sentEmail.id,
        messageId: emailResult.messageId,
      }),
    );
  } catch (error) {
    console.error("Email sending error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      createApiResponse(`Failed to send email: ${errorMessage}`, null),
      { status: 500 }
    );
  }
});