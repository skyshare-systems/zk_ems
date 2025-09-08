import { Company, Prisma } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


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


interface AddressBookGroupStore {
  group: AddressBookGroupWithRecipients | null;
  setGroup: (group: AddressBookGroupWithRecipients | null) => void;
}

export const useAddressBookGroupStore = create<AddressBookGroupStore>()(
  persist(
    (set) => ({
      group: null,
      setGroup: (group) => set({ group }),
    }),
    {
      name: "address-book-group-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);