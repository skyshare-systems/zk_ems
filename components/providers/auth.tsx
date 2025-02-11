'use client';

import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
/*   const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);
 */
  return <>{children}</>;
};

export default AuthProvider;
