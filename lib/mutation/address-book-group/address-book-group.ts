import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { CreateAddressBookGroup } from "@/store/address-book-groups";
import { CreateRecipientRequest } from "@/store/address-book-recipients";
import { ApiResponse } from "@/types/http";
import { AddressBookGroup, AddressBookRecipient } from "@prisma/client";



export const createAddressBookGroup = async (
  data: CreateAddressBookGroup,
) => {
  try {

    const response = await api.post<ApiResponse<AddressBookGroup>>('/address-book-groups', data);

    return response.data
  } catch (error) {
    throw getErrorMessage(error)
  }

};
