import { AuthenticatedRequest, authorize } from "@/lib/auth.middleware";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import SkyshareLabsJPLTemplate from "@/emails/skyshare/jpl/jpl";
import { createApiResponse, createErrorMessage, getTemplateLookup } from "@/lib/utils";
import React from "react";
import { emailTemplates } from "@/lib/constant";

// Request body interface
export interface GenerateTemplateRequest {
  body: string;
  templateId: string;
}


// POST handler
export const POST = authorize(async (request: AuthenticatedRequest) => {
  try {
    const { body, templateId, ...props } =
      (await request.json()) as GenerateTemplateRequest;

      console.log({propsTest2: props})

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
