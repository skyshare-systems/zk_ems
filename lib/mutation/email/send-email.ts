import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { Template } from "@prisma/client";
import { marked } from "marked";

interface SendEmailProps {
  subject: string;
  selectedTemplate: Template;
  recipients: string[];
  body: string;
}

export const sendEmail = async ({
  body,
  recipients,
  selectedTemplate,
  subject,
}: SendEmailProps) => {
  try {
    const response = await api.post("/email", {
      subject: subject,
      templateId: selectedTemplate?.id,
      recipients: recipients,
      body: marked(body),
    });

    return response.data
  } catch (error) {
    throw getErrorMessage(error);
  }
};
