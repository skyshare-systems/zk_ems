import LoginForm from "@/components/forms/login";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-4 self-stretch flex-1 bg-[hsla(224, 83%, 1%, 1)]">
      <div className="flex flex-col items-center">
        <Image
          src={"/auth/login/zk-logo.png"}
          width={184}
          height={128}
          alt="ZK Logo"
        />
        <p className="text-[20px] opacity-50">Email Marketing System</p>
      </div>

      <LoginForm />
    </main>
  );
};

export default LoginPage;
