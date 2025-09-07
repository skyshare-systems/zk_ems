import { ApiResponse } from "@/types/http";
import api from "../axios";
import { getErrorMessage } from "../utils";
import { AddressBookRecipient } from "@prisma/client";
import { AddressBookRecipientWithGroupAndCompany } from "@/store/address-book-recipients";



interface Params {
  params: {
    companyId: string | undefined;
    limit: number;
    offset: number;
    search: string | undefined;
  };
}

export const getAddressBookRecipients = async ({ params }: Params) => {
  try {
    const response = await api.get<ApiResponse<AddressBookRecipientWithGroupAndCompany[]>>(
      "/address-book-recipient",
      {
        params
      }
    );

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
