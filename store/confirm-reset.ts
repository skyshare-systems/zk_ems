import { create } from "zustand";

interface ConfirmResetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useConfirmResetStore = create<ConfirmResetStore>((set) => ({
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