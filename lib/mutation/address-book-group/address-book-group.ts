import api from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { CreateAddressBookGroup } from "@/store/address-book-groups";
import { ApiResponse } from "@/types/http";
import { AddressBookGroup } from "@prisma/client";

export const createAddressBookGroup = async (
  data: CreateAddressBookGroup,
) => {
  try {
    const response = await api.post<ApiResponse<AddressBookGroup>>('/address-book-groups', data);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

interface UpdateGroupPayload {
  id: string;
  name?: string;
  tag?: string;
  color?: string;
  connectIds?: string[];
  disconnectIds?: string[];
  setIds?: string[];
}

export const updateAddressBookGroup = async (data: UpdateGroupPayload) => {
  try {
    const response = await api.put<ApiResponse<AddressBookGroup>>(
      "/address-book-groups",
      data
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const deleteAddressBookGroup = async (id: string) => {
  try {
    const response = await api.delete<ApiResponse<void>>(
      `/address-book-groups?id=${id}`
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};