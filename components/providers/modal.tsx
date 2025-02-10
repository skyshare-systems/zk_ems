"use client";

import { useEffect, useState } from "react";
import ConfirmEmailBlast from "../modals/confirm-email-blast";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ConfirmEmailBlast />
    </>
  );
};

export default ModalProvider;
