import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";

interface Payload {
  token: string;
  userId: string;
}
export const logOut = async ({ token, userId }: Payload) => {
  try {
    const response = await api.post("/auth/logout", {
      token,
      userId,
    });

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
