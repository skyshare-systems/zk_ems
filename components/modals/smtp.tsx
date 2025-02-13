import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSmtpModalStore } from "@/store/smtp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Modal } from "../modal";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useCompanyStore } from "@/store/company";
import { useMutation } from "@tanstack/react-query";
import { updateSmtpCredential } from "@/lib/mutation/smtp";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const SmtpModal = () => {
  const { isOpen, onClose, onOpen } = useSmtpModalStore();
  const { company } = useCompanyStore();

  const { mutate: updateCredentials, isPending } = useMutation({
    mutationKey: ["smtp-credentials"],
    mutationFn: updateSmtpCredential,
    onSuccess: () => {
      toast.success("SMTP credentials updated successfully");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const SmtpSchema = z.object({
    host: z.string().nonempty({
      message: "Host is required",
    }),
    port: z.number().int(),
    auth: z.object({
      user: z.string().nonempty({
        message: "Username is required",
      }),
      pass: z.string().nonempty({
        message: "Password is required",
      }),
    }),
    from: z.string().email({
      message: "Invalid email address",
    }),
  });

  const form = useForm<z.infer<typeof SmtpSchema>>({
    resolver: zodResolver(SmtpSchema),
    defaultValues: {
      host: company?.smtpCredential?.host ?? "",
      port: company?.smtpCredential?.port ?? 587,
      auth: {
        user: company?.smtpCredential?.username ?? "",
        pass: company?.smtpCredential?.password ?? "",
      },
      from: company?.smtpCredential?.from ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof SmtpSchema>) {
    if (!company) {
      return toast.error("Company not found");
    }

    updateCredentials({
      companyId: company?.id,
      host: values.host,
      port: values.port,
      username: values.auth.user,
      password: values.auth.pass,
      from: values.from,
    });
  }

  return (
    <Modal
      description="Configure your SMTP settings"
      isOpen={isOpen}
      onClose={onClose}
      title="SMTP Settings"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel>
                  From{" "}
                  <span className="ty-subtitle text-white/50">
                    (Sender of the email)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={`${
                      company?.name.toLowerCase().replace(/\s+/g, "-") +
                      "@email.com"
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email-smtp.eu-west-1.amazonaws.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input placeholder="587" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-gold self-stretch">SMTP Credentials</p>

          <FormField
            control={form.control}
            name="auth.user"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ANG7D9VSX8DF1SUGZJMI"
                    {...field}
                    className="flex-1 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="auth.pass"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="7#Bnj*R8IsT6*1KieZ6^S8LHmo&9o8Kj^H!"
                    {...field}
                    className="flex-1 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-gold">
            {isPending ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <p className="ty-descriptions">Submit</p>
            )}
          </Button>

          <div className="flex flex-col gap-4 w-full">
            <Separator />
            <div className="flex flex-col justify-center items-center text-center gap-2 w-full">
              <div className=" flex flex-col flex-1">
                <p className="text-gold">References</p>
                <div className="flex flex-col text-white/50">
                  <Link
                    href={"https://console.aws.amazon.com/ses"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AWS SES
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gold">Need help</p>
                <Link
                  href={"mailto:tech@skysharelabs.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default SmtpModal;
