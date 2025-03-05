"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { authLogin } from "@/lib/mutation/auth/login/login";
import { loginSchema } from "@/schema/login";
import { useUserStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "../ui/input";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const router = useRouter();
  const { setUser } = useUserStore();

  const { mutate, isPending } = useMutation({
    mutationFn: authLogin,
    mutationKey: ["login"],
    onSuccess: ({ data, message }) => {
      setUser(data);
      setIsRedirecting(true);
      localStorage.setItem("token", data.token);
      toast.success(message, {
        style: {
          background: "#00a650",
        },
        onDismiss(toast) {
          router.push("/dashboard?t=create-new-email");
        },
        onAutoClose: () => {
          router.push("/dashboard?t=create-new-email");
        },
      });
    },
    onError: (error: string) => {
      toast.error(error, {
        style: {
          background: "#e41414",
        },
      });
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate({
      username: values.username,
      password: values.password,
    });
  }

  useEffect(() => {
    localStorage.clear();

    return () => {
      setIsRedirecting(false);
    };
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full relative max-w-[320px] mx-auto flex flex-col p-4 items-start gap-4 self-stretch"
      >
        <div className="flex flex-col items-start gap-2 self-stretch w-full ">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Username"
                    className="ty-descriptions text-white/50 w-full border border-white/[.16] bg-white/[.04]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="ty-descriptions text-white/50 w-full border border-white/[.16] bg-white/[.04]"
                      {...field}
                    />

                    {showPassword ? (
                      <EyeOffIcon
                        size={14}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeIcon
                        size={14}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*   <Link
            href={"#"}
            className="text-white/50 ty-subtext text-center w-full"
          >
            Forgot Password
          </Link> */}
        </div>
        <Button
          disabled={isPending || isRedirecting}
          type="submit"
          className="bg-gold w-full relative"
        >
          <Image
            src={"/ellipse.svg"}
            width={314}
            height={128}
            alt="Ellipse"
            className="-z-10 absolute -top-3/4"
          />

          {isPending ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            <>
              <p className="ty-title text-[14px]">Login</p>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
