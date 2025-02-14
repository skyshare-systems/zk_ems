import { Prisma } from "@prisma/client";
import { getErrorMessage } from "../utils";
import api from "../axios";

export const updateSmtpCredential = async (
  input: Prisma.SmtpCredentialUpdateInput & {
    companyId: string;
  }
) => {
  try {
    const response = await api.patch("/smtp-credentials", input);

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
