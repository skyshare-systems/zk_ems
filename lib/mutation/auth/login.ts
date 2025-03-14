import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { loginSchema } from "@/schema/login";
import { ApiResponse } from "@/types/http";
import { User } from "@prisma/client";
import { z } from "zod";

export const authLogin = async ({
  username,
  password
}: z.infer<typeof loginSchema>) => {
  try {
    const response = await api.post<ApiResponse<User & {
      token: string
    }>>("/auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
