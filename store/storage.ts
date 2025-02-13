import { create } from "zustand";

interface StorageModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStorageModalStore = create<StorageModal>((set) => ({
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