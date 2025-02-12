import { ApiResponse } from "@/types/http";
import api from "../axios"
import { getErrorMessage } from "../utils"

interface Params {
  params: string;
}

export const getAnalytics = async ({params}:Params) => {
  try {
    const response = await api.get<ApiResponse<{
      count: number,
      month: string
    }>>('/sent-emails/analytics' + params);

    return response.data
  } catch (error) {
    throw getErrorMessage(error)
  }
}