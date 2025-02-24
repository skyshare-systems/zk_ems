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
import { updateStorageConfig } from "@/lib/mutation/storage";
import { useCompanyStore } from "@/store/company";
import { useStorageModalStore } from "@/store/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Modal } from "../modal";
import { Separator } from "../ui/separator";
import { Loader } from "lucide-react";

const StorageModal = () => {
  const { isOpen, onClose, onOpen } = useStorageModalStore();
  const { company } = useCompanyStore();

  const { mutate: updateCredentials, isPending } = useMutation({
    mutationKey: ["smtp-credentials"],
    mutationFn: updateStorageConfig,
    onSuccess: () => {
      toast.success("Storage Config updated successfully", {
        onAutoClose: () => {
          onClose()
        }
      });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const SmtpSchema = z.object({
    endpoint: z.string().nonempty({
      message: "Endpoint is required",
    }),
    region: z.string().nonempty({
      message: "Region is required",
    }),
    bucketName: z.string().nonempty({
      message: "Bucket name is required",
    }),
    credentials: z.object({
      accessKeyId: z.string().nonempty({
        message: "Access Key ID is required",
      }),
      secretAccessKey: z.string().nonempty({
        message: "Secret Access Key is required",
      }),
    }),
  });

  const form = useForm<z.infer<typeof SmtpSchema>>({
    resolver: zodResolver(SmtpSchema),
    defaultValues: {
      region: company?.storageConfig?.region ?? "",
      endpoint: company?.storageConfig?.endpoint ?? "",
      bucketName: company?.storageConfig?.bucketName ?? "",
      credentials: {
        accessKeyId: company?.storageConfig?.accessKeyId ?? "",
        secretAccessKey: company?.storageConfig?.secretAccessKey ?? "",
      },
    },
  });

  function onSubmit(values: z.infer<typeof SmtpSchema>) {
    if (!company) {
      return toast.error("Company not found");
    }

    updateCredentials({
      companyId: company?.id,
      region: values.region,
      endpoint: values.endpoint,
      bucketName: values.bucketName,
      accessKeyId: values.credentials.accessKeyId,
      secretAccessKey: values.credentials.secretAccessKey,
    });
  }

  return (
    <Modal
      description="Configure your Storage settings"
      isOpen={isOpen}
      onClose={onClose}
      title="Storage Settings"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center w-full"
        >
          <FormField
            control={form.control}
            name="endpoint"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Endpoint</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://sgp1.digitaloceanspaces.com"
                    {...field}
                    className="w-full flex-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`sgp1`}
                    {...field}
                    className="w-full flex-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bucketName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bucket Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`${company?.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-bucket`}
                    {...field}
                    className="w-full flex-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-gold self-stretch">Bucket Credentials</p>
          <FormField
            control={form.control}
            name="credentials.accessKeyId"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel>Access Key</FormLabel>
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
            name="credentials.secretAccessKey"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel>Secret Access Key</FormLabel>
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
                    href={"https://cloud.digitalocean.com/spaces"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital Ocean (recommended)
                  </Link>
                  <Link
                    href={"https://aws.amazon.com/s3/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AWS S3
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

export default StorageModal;
