"use client";

import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  const { user } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true)
  },[])

  if (hasMounted && !user) {
    return <>{router.push("/auth/login")}</>;
  }

  return <>{children}</>;
};

export default AuthProvider;
