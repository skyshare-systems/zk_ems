import { Prisma } from "@prisma/client";



export type AddressBookGroupWithRecipients = Prisma.AddressBookGroupGetPayload<{
  include: { recipients: true };
}>

export interface CreateRecipientRequest {
  emailAddress: string;
  name: string;
  photoUrl?: string;
  companyId: string;
  groupIds?: string[];
}

export interface CreateAddressBookGroup {
  name: string;
  companyId: string;
  tag?: string;
  color?: string;
  recipientIds?: string[];
}