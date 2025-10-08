import { create } from "zustand";

interface GroupModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModalCreateGroup = create<GroupModalStore>((set) => ({
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
