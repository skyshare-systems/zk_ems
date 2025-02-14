import { Prisma } from "@prisma/client";
import { getErrorMessage } from "../utils";
import api from "../axios";

export const updateStorageConfig = async (
  input: Prisma.StorageConfigUpdateInput & {
    companyId: string;
  }
) => {
  try {
    const response = await api.patch("/storage-config", input);

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
