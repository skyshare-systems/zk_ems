"use client";

import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [hasMounted, setHasMounted] = useState(false);
  const { user } = useUserStore(); // Ensure user state updates correctly
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && user === null) {
      router.replace("/auth/login"); // Use replace instead of push to prevent back navigation issues
    }
  }, [hasMounted, user, router]);

  if (!hasMounted) return null; // Prevents flickering before state is available

  return user ? <>{children}</> : null;
};

export default AuthProvider;
