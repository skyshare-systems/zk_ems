import { GenerateTemplateRequest } from "@/app/api/templates/generateTemplate/route";
import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { ApiResponse } from "@/types/http";


export interface GenerateTemplateResponse {
  html: string;
}
export const generateTemplate = async ({
  body,
  templateId,
  ...props
}: GenerateTemplateRequest) => {
  try {
    const response = await api.post<ApiResponse<GenerateTemplateResponse>>("/templates/generateTemplate", {
      body,
      templateId,
      ...props
    });

    console.log({...props})
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
