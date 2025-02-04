"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { loginSchema } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { authLogin } from "@/lib/mutation/auth/login/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: authLogin,
    mutationKey: ["login"],
    onSuccess: (vars) => {
      toast.success(vars.message, {
        style: {
          background: "#00a650",
        },
        duration: 1500,
        onAutoClose: () => {
          router.push("/dashboard")
        }
        
      })
    },
    onError: (error: string) => {
      toast.error(error, {
        style: {
          background: "#e41414",
        }
      })
    }
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

   function onSubmit(values: z.infer<typeof loginSchema>) {
     // Do something with the form values.
     // ✅ This will be type-safe and validated.
     console.log(values);
   
    mutate({
      username: values.username,
      password: values.password,
    })
    }

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
          <Link
            href={"#"}
            className="text-white/50 ty-subtext text-center w-full"
          >
            Forgot Password
          </Link>
        </div>
        <Button type="submit" className="bg-gold w-full relative">
          <Image
            src={"/ellipse.svg"}
            width={314}
            height={128}
            alt="Ellipse"
            className="-z-10 w-full max-w-[218px] mx-auto absolute top-0 -left-1/translate-x-1/2 "
          />
          <p className="ty-title text-[14px]">Login</p>
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
