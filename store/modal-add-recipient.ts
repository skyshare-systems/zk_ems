import { create } from "zustand";

interface RecipientModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModalAddRecipient = create<RecipientModalStore>((set) => ({
  isOpen: false,
  onOpen: () =>
    set({
      isOpen: true,
    }),
  onClose: () =>
    set({
      isOpen: false,
    }),
}));
