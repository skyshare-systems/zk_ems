"use client";

import { cn, colorizeButton, verifyPermission } from "@/lib/utils";
import { useCreateEmailStore } from "@/store/create-email";
import { zodResolver } from "@hookform/resolvers/zod";
import { Move, PlusIcon, X } from "lucide-react";
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
import { ProgramsSchema } from "@/schema/programs";
import ImageUploader from "./modals/image-uploader-no-context";
import Image from "next/image";

const OurProgramsEditor = () => {
  const { selectedTemplate, programs, setPrograms, isRearranging } =
    useCreateEmailStore();

  const form = useForm<z.infer<typeof ProgramsSchema>>({
    resolver: zodResolver(ProgramsSchema),
    mode: "onChange",
    defaultValues: { programs: [...programs] },
  });

  const { append, remove, fields, update } = useFieldArray({
    name: "programs",
    control: form.control,
  });

  const watchPrograms = form.watch("programs");

  useEffect(() => {
    setPrograms([...watchPrograms]);
    form.trigger();
  }, [watchPrograms, setPrograms, form]);

  const onSubmit = (values: z.infer<typeof ProgramsSchema>) => {
    console.log(values);
  };

  if (!selectedTemplate) return null;

  const isOurProgramAllowed = verifyPermission({
    companyId: selectedTemplate.company.id,
    rules: ["programs"],
  });

  if (!selectedTemplate || !isOurProgramAllowed) return null;

  return (
    <div className="flex p-4 flex-col justify-center items-center gap-2 self-stretch bg-black/[.04]">
      {!isRearranging && (
        <div className="w-full cursor-grab">
          <Image
            src={"/assets/draggable.png"}
            width={80}
            height={8}
            alt="draggable"
            className="mx-auto pointer-events-none"
          />
        </div>
      )}

      <div
        className={cn(
          "flex items-center gap-2 self-stretch",
          !isRearranging && "mb-4",
        )}
      >
        <div className="flex justify-between items-center w-full">
          <p className="ty-title flex-1 text-black/50">Our Programs</p>

          {isRearranging && (
            <div className="flex gap-2 items-center">
              <Move size={14} color="black" />
              <p className="text-[#000205] text-[12.8px]">Drag to sort</p>
            </div>
          )}
        </div>

        {!isRearranging && (
          <Button
            disabled={!form.formState.isValid}
            onClick={() =>
              append({
                title: "",
                link: "",
                description: "",
                image: "",
              })
            }
            type="button"
            className={cn(
              "flex px-3 py-2 gap-2",
              colorizeButton(selectedTemplate.company.name),
            )}
          >
            <PlusIcon color="white" />
            <span className="text-white ty-subtitle">Add a program</span>
          </Button>
        )}
      </div>

      {!isRearranging && (
        <div className="w-full text-black">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {fields.map((field, index) => (
                <div
                  className="flex flex-col items-start rounded-lg border border-black/[.08] w-full flex-1 relative"
                  key={field.id}
                >
                  {fields.length > 0 && (
                    <div
                      onClick={() => remove(index)}
                      className="h-5 w-5 rounded-full flex justify-center items-center absolute bg-red-400 top-0 right-0 -m-2 cursor-pointer"
                    >
                      <X size={14} color="white" />
                    </div>
                  )}

                  {/* Program Title */}
                  <FormField
                    control={form.control}
                    name={`programs.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="w-full flex items-center gap-4 p-2">
                        <FormLabel className="max-w-[96px] w-full shrink-0">
                          Program Title
                        </FormLabel>
                        <div className="flex flex-col gap-2 w-full">
                          <FormControl>
                            <Input
                              className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                              placeholder="Sample Program Title..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* External Link */}
                  <FormField
                    control={form.control}
                    name={`programs.${index}.link`}
                    render={({ field }) => (
                      <FormItem className="w-full flex items-center gap-4 p-2">
                        <FormLabel className="max-w-[96px] w-full shrink-0">
                          External Link
                        </FormLabel>
                        <div className="flex flex-col gap-2 w-full">
                          <FormControl>
                            <Input
                              className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                              placeholder="https://site.com"
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
                    name={`programs.${index}.description`}
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
                              placeholder="Short program description..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Progrprograms Image */}
                  <FormField
                    control={form.control}
                    name={`programs.${index}.image`}
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
                                  <X size={14} color="white" />
                                </div>
                                <Image
                                  alt="Program Image"
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
                                      ...watchPrograms[index],
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
      )}
    </div>
  );
};

export default OurProgramsEditor;
