import { cn, colorizeButton, verifyPermission } from "@/lib/utils";
import { useCreateEmailStore } from "@/store/create-email";
import { zodResolver } from "@hookform/resolvers/zod";
import { Move, PlusIcon, X } from "lucide-react";
import { useCallback, useEffect } from "react";
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
import { UpcomingProgramsSchema } from "@/schema/upcoming-program";
import { NestedUpcomingDates } from "./upcoming-program-dates";
import { NestedDates } from "./nested-dates";
import Image from "next/image";

const UpcomingProgramEditor = () => {
  const {
    selectedTemplate,
    setUpcomingPrograms,
    upcomingPrograms,
    isRearranging,
  } = useCreateEmailStore();

  const form = useForm<z.infer<typeof UpcomingProgramsSchema>>({
    resolver: zodResolver(UpcomingProgramsSchema),
    mode: "onBlur",
    defaultValues: { upcomingPrograms: [...upcomingPrograms] },
  });

  const { append, remove, fields } = useFieldArray({
    name: "upcomingPrograms",
    control: form.control,
  });

  const watchUpcomingPrograms = form.watch("upcomingPrograms");

  useEffect(() => {
    setUpcomingPrograms([...watchUpcomingPrograms]);

    form.trigger();
  }, [watchUpcomingPrograms, setUpcomingPrograms, form]);

  const onSubmit = (values: z.infer<typeof UpcomingProgramsSchema>) => {
    console.log(values);
  };

  if (!selectedTemplate) return null;

  const isUpcomingProgramsAllowed = verifyPermission({
    companyId: selectedTemplate.company.id,
    rules: ["upcoming_programs"],
  });

  if (!selectedTemplate || !isUpcomingProgramsAllowed) return null;

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
          <p className="ty-title flex-1 text-black/50">Upcoming Programs</p>

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
                dates: [
                  {
                    date: new Date(),
                  },
                ],
                externalLink: "",
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
              {fields.map((field, index) => {
                return (
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
                    <FormField
                      control={form.control}
                      name={`upcomingPrograms.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="w-full flex items-center gap-4 p-2">
                          <FormLabel className="max-w-[96px] w-full shrink-0">
                            Title
                          </FormLabel>
                          <div className="flex flex-col gap-2 w-full">
                            <FormControl>
                              <Input
                                className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                                placeholder="3-Day Corporate Finance Management Program"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`upcomingPrograms.${index}.externalLink`}
                      render={({ field }) => (
                        <FormItem className="w-full flex items-center gap-4 p-2">
                          <FormLabel className="max-w-[96px] w-full shrink-0">
                            External Link
                          </FormLabel>
                          <div className="flex flex-col gap-2 w-full">
                            <FormControl>
                              <Input
                                className="w-full border-black/[.08] placeholder:text-black/[.32] focus:border-gold placeholder:ty-descriptions"
                                placeholder="https://"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <NestedDates
                      fieldName="upcomingPrograms"
                      control={form.control}
                      index={index}
                      label="Dates"
                    />
                  </div>
                );
              })}
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default UpcomingProgramEditor;
