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
  // Convert offset to page number (API expects page, not offset)
  const page = Math.floor(offset / limit) + 1;

  const params = {
    companyId,
    limit,
    page,
    search,
    groupIds: groupIds?.length ? groupIds.join(",") : undefined, // normalize array → comma-separated
  };

  const res = await axios.get("/api/address-book-recipient", { params });
  return res.data;
}
