"use client";

import { verifyPermission } from "@/lib/utils";
import { useCreateEmailStore } from "@/store/create-email";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, X } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ServicesSchema } from "@/schema/services";
import ImageUploader from "./modals/image-uploader-no-context";
import Image from "next/image";

const OurServicesEditor = () => {
  const { selectedTemplate, services, setServices } = useCreateEmailStore();

  const form = useForm<z.infer<typeof ServicesSchema>>({
    resolver: zodResolver(ServicesSchema),
    mode: "onChange",
    defaultValues: { services: [...services] },
  });

  const { append, remove, fields, update } = useFieldArray({
    name: "services",
    control: form.control,
  });

  const watchServices = form.watch("services");

  useEffect(() => {
    setServices([...watchServices]);
    form.trigger();
  }, [watchServices, setServices, form]);

  const onSubmit = (values: z.infer<typeof ServicesSchema>) => {
    console.log(values);
  };

  if (!selectedTemplate) return null;

  const isFromThePeopleAllowed = verifyPermission({
    companyId: selectedTemplate.company.id,
    rules: ["our_services"],
  });

  if (!selectedTemplate || !isFromThePeopleAllowed) return null;

  return (
    <div className="flex p-4 flex-col justify-center items-center gap-2 self-stretch bg-black/[.04]">
      <div className="flex items-center gap-2 self-stretch mb-4">
        <p className="ty-title flex-1 text-black/50">Our Services</p>
        <Button
          disabled={!form.formState.isValid}
          onClick={() =>
            append({
              description: "",
              image: "",
              link: "",
              title: "",
            })
          }
          type="button"
          className="bg-black flex px-3 py-2 gap-2 hover:bg-black/80"
        >
          <PlusIcon color="white" />
          <span className="text-white ty-subtitle">Add a product</span>
        </Button>
      </div>

      <div className="w-full text-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {fields.map((field, index) => (
              <div
                className="flex flex-col items-start rounded-lg border border-black/[.08] w-full flex-1 relative"
                key={field.id}
              >
                {fields.length > 1 && (
                  <div
                    onClick={() => remove(index)}
                    className="h-5 w-5 rounded-full flex justify-center items-center absolute bg-red-400 top-0 right-0 -m-2 cursor-pointer"
                  >
                    <X size={14} />
                  </div>
                )}

                {/* Product Name */}
                <FormField
                  control={form.control}
                  name={`services.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        Services Title
                      </FormLabel>
                      <div className="flex flex-col gap-2 w-full">
                        <FormControl>
                          <Input
                            className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                            placeholder="Product name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Product Link */}
                <FormField
                  control={form.control}
                  name={`services.${index}.link`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        External Link
                      </FormLabel>
                      <div className="flex flex-col gap-2 w-full">
                        <FormControl>
                          <Input
                            className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                            placeholder="https://example.com/product"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name={`services.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        <div className="flex flex-col gap-2">
                          <p>Description</p>
                          <p className="text-[12.24px] text-black/50">
                            First paragraph only
                          </p>
                        </div>
                      </FormLabel>
                      <div className="flex flex-col gap-2 w-full">
                        <FormControl>
                          <Textarea
                            rows={4}
                            className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                            placeholder="Short product description..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Product Image */}
                <FormField
                  control={form.control}
                  name={`services.${index}.image`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        <div className="flex flex-col">
                          <p className="ty-descriptions">Photo</p>
                          <p className="ty-subtext text-black/50">
                            External Link
                          </p>
                        </div>
                      </FormLabel>
                      <div className="flex flex-col gap-2 w-full">
                        <FormControl>
                          {field.value ? (
                            <div className="relative w-fit">
                              <div
                                onClick={() => field.onChange("")}
                                className="h-5 w-5 rounded-full flex justify-center items-center absolute bg-red-400 top-0 right-0 -m-2 cursor-pointer"
                              >
                                <X size={14} />
                              </div>
                              <Image
                                alt="Product Image"
                                src={field.value}
                                width={100}
                                height={100}
                                className="rounded-lg mb-2 h-[100px] w-[100px] object-cover"
                              />
                            </div>
                          ) : (
                            <div className="max-w-[250px] w-full">
                              <ImageUploader
                                onUploadComplete={(url) =>
                                  update(index, {
                                    ...watchServices[index],
                                    image: url,
                                  })
                                }
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OurServicesEditor;
