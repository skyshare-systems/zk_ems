import { ApiResponse } from "@/types/http";
import api from "../axios";
import { getErrorMessage } from "../utils";
import { Company } from "@prisma/client";
import { CompanyWithConfigs } from "@/store/company";

interface Params {
  params: string;
}
export const getCompanies = async ({ params }: Params) => {
  try {
    const response = await api.get<
      ApiResponse<
      CompanyWithConfigs[]
      >
    >(`/companies?${params}`);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
