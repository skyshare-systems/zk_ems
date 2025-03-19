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
  props?: Record<string, unknown>;
}

export const sendEmail = async ({
  body,
  recipients,
  selectedTemplate,
  subject,
  attachments = [],
  alignment = "left",
  ...props
}: SendEmailProps) => {
  try {
    const response = await api.post("/email", {
      subject,
      templateId: selectedTemplate.id,
      recipients,
      body: marked(body),
      attachments,
      alignment,
      ...props,
    });

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};


export const sendEmailSkyshare = async ({
  body,
  recipients,
  selectedTemplate,
  subject,
  attachments = [],
  alignment = "left",
  ...props
}: SendEmailProps) => {
  try {
    const formData = new FormData();

    formData.append("subject", subject);
    formData.append("templateId", selectedTemplate.id);
    formData.append("body", body);
    formData.append("alignment", alignment);
    
    recipients.forEach((recipient) => formData.append("recipients", recipient));

    attachments.forEach((attachment) =>
      formData.append("attachments", attachment)
    );

  /*   for (const key in props) {
      formData.append(key, props[key]);
    } */

    const response = await api.post("/email/skyshare", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

