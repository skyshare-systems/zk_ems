import { Prisma } from "@prisma/client";

export type AddressBookRecipientWithGroupAndCompany = Prisma.AddressBookRecipientGetPayload<{
  include: { groups: true; company: true };
}>;

interface CreateAddressBookRecipientState {
 
}

