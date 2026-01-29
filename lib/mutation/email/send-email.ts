import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { Mode } from "@/store/create-email";
import { Template } from "@prisma/client";

export interface SendEmailProps {
  subject: string;
  selectedTemplate: Template;
  recipients: string[];
  body: string;
  attachments?: File[];
  alignment?: "left" | "center" | "right";
  signal?: AbortSignal;
  mode?: Mode;
  selectedSentEmail?: string;
  props?: Record<string, unknown>;
}

export const sendEmail = async ({
  body,
  recipients,
  selectedTemplate,
  subject,
  attachments = [],
  alignment = "left",
  signal,
  mode = "create",
  selectedSentEmail,
  ...props
}: SendEmailProps) => {
  try {
    const response = await api.post(
      "/email",
      {
        subject,
        templateId: selectedTemplate.id,
        recipients,
        body,
        attachments,
        alignment,
        mode,
        selectedSentEmail,
        ...props,
      },
      {
        signal,
      },
    );

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
  signal,
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
      formData.append("attachments", attachment),
    );

    const response = await api.post("/email/skyshare", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      signal,
    });

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
