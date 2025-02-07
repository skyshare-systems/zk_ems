import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { subject, templateId, body, recipients } = await req.json();

  

    const template = await prisma.template.findUnique({
      where: {
        id: templateId,
      }
    })

    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 });
    }

    
    const emailContent = `${template.header}<div style="padding: 20px; min-height: 100px;">${body}</div>${template.footer}`;

    // Configure SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: "email-smtp.eu-west-1.amazonaws.com",
      port: 587,
      auth: {
        user: "AKIA33FBU3VU5BFLWDFZ",
        pass: "BO3dk7L8/ZbjC0OHaHkdtvcNTEsn0XvxOjn4G1avUPxj"
      }
    })

    console.log({recipients})
    // Send Email
    const info = await transporter.sendMail({
      from: "support@coinkings.tech",
      to: recipients,
      subject,
      html: emailContent, // Send as HTML
    });

    return NextResponse.json({ success: true, message: "" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: 'Internal' }, { status: 500 });
  }
}
