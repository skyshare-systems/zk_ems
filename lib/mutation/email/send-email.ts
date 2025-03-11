import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { Template } from "@prisma/client";
import { marked } from "marked";



interface SendEmailProps {
  subject: string;
  selectedTemplate: Template;
  recipients: string[];
  body: string;
  attachments?: File[];
  alignment?: "left" | "center" | "right";
}

export const sendEmail = async ({
  body,
  recipients,
  selectedTemplate,
  subject,
  attachments = [],
  alignment = "left",
}: SendEmailProps) => {
  try {
    const response = await api.post("/email", {
      subject: subject,
      templateId: selectedTemplate?.id,
      recipients: recipients,
      body: marked(body),
      attachments: attachments,
      alignment: alignment,
    });

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};