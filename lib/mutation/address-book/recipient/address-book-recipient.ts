import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { CreateRecipientRequest } from "@/store/address-book-recipients";
import { ApiResponse } from "@/types/http";
import { AddressBookRecipient } from "@prisma/client";



export const createAddressBookRecipient = async (
  data: CreateRecipientRequest,
) => {
  try {

    const response = await api.post<ApiResponse<AddressBookRecipient>>('/address-book-recipient', data);
    
    return response.data
  } catch (error) {
    throw getErrorMessage(error)
  }

};
