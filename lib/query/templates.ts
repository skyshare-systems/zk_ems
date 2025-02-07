import { ApiResponse } from "@/types/http";
import api from "../axios";
import { getErrorMessage } from "../utils";
import {  Company, Template } from "@prisma/client";

interface Params {
  params: string;
}
export const getTemplates = async ({ params }: Params) => {
  try {
    const response = await api.get<
      ApiResponse<
      Company & { templates: Template[] }
      >
    >(`/templates?${params}`);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
