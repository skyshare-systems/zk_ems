import axios from "axios";

interface AddressBookRecipientParams {
  companyId: string;
  limit: number;
  offset: number;
  search?: string;
  groupIds?: string[]; // allow multiple
}

export async function getAddressBookRecipients({
  companyId,
  limit,
  offset,
  search,
  groupIds,
}: AddressBookRecipientParams) {
  const params = {
    companyId,
    limit,
    offset,
    search,
    groupIds: groupIds?.length ? groupIds.join(",") : undefined, // normalize array → comma-separated
  };

  const res = await axios.get("/api/address-book-recipient", { params });
  return res.data;
}
