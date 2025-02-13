import { create } from "zustand";

interface SmtpModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSmtpModalStore = create<SmtpModalStore>((set) => ({
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