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

export const updateAddressBookRecipient = async ({
  recipientId,
  companyId,
  data,
}: {
  recipientId: string;
  companyId: string;
  data: any;
}) => {
  const response = await api.patch(`/address-book-recipient`, {
    companyId,
    ...data,
    
  }, {
    params: { recipientId },
  });
  return response.data;
};

export const deleteAddressBookRecipient = async ({
  recipientId,
  companyId,
}: {
  recipientId: string;
  companyId: string;
}) => {
  const response = await api.delete(`/address-book-recipient`, {
    params: { companyId, recipientId },
  });
  return response.data;
};