"use client";

import { useEffect, useState } from "react";
import ConfirmEmailBlast from "../modals/confirm-email-blast";
import SmtpModal from "../modals/smtp";
import StorageModal from "../modals/storage";
import ConfirmResetModal from "../modals/confirm-reset";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ConfirmEmailBlast />
      <SmtpModal />
      <StorageModal />
      <ConfirmResetModal />
    </>
  );
};

export default ModalProvider;
