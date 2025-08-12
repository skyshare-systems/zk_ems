import { Prisma } from "@prisma/client";

export type AddressBookRecipientWithGroupAndCompany = Prisma.AddressBookRecipientGetPayload<{
  include: { groups: true; company: true };
}>;


export interface CreateRecipientRequest {
  emailAddress: string;
  name: string;
  photoUrl?: string;
  companyId: string;
  groupIds?: string[];
}