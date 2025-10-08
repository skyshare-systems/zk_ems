import { AddressBookGroupWithRecipients } from "@/store/address-book-groups";
import { ApiResponse } from "@/types/http";
import api from "../axios";
import { getErrorMessage } from "../utils";

interface Params {
  params: string;
}

export const getAddressBookGroup = async ({ params }: Params) => {
  try {
    const response = await api.get<
      ApiResponse<AddressBookGroupWithRecipients[]>
    >("/address-book-groups?" + params);

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const getAddressBookGroupAll = async () => {
  try {
    const response = await api.get<
      ApiResponse<AddressBookGroupWithRecipients[]>
    >("/address-book-groups?");

    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
