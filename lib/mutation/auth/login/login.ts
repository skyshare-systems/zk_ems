import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { ApiResponse, LoginRequest } from "@/types/http";
import { User } from "@prisma/client";

export const authLogin = async ({ username, password }: LoginRequest) => {
  try {
    const response = await api.post<ApiResponse<User>>("/auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
