import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import SkyshareLabsJPLTemplate from "@/emails/skyshare/jpl/jpl";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import React from "react";
import { emailTemplates } from "@/lib/constant";

// Request body interface
export interface GenerateTemplateRequest {
  body: string;
  templateId: string;
}

// Get template by ID and render with props
export const getTemplateLookup = (templateId: string, props: any): Promise<string> => {
  const selectedTemplate = emailTemplates.find(
    (template) => template.templateId === templateId,
  );

  if (!selectedTemplate) {
    throw new Error(`Template with ID "${templateId}" not found.`);
  }

  return render(selectedTemplate.template(props));
};

// POST handler
export const POST = authorize(async (request: AuthenticatedRequest) => {
  try {
    const { body, templateId, ...props } =
      (await request.json()) as GenerateTemplateRequest;

    const htmlTemplate = await getTemplateLookup(templateId, {
      body,
      ...props,
    });

    return NextResponse.json(
      createApiResponse("Template generated successfully", {
        html: htmlTemplate,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(createErrorMessage(error), { status: 500 });
  }
});
