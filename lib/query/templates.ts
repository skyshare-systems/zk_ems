import { ApiResponse } from "@/types/http";
import api from "../axios";
import { getErrorMessage } from "../utils";
import {  Company, Template } from "@prisma/client";
import { TemplateWithCompany } from "@/store/create-email";

interface Params {
  params: string;
}
export const getTemplates = async ({ params }: Params) => {
  try {
    const response = await api.get<
      ApiResponse<
      TemplateWithCompany[]
      >
    >(`/templates?${params}`);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
