import { verifyPermission } from "@/lib/utils";
import { useCreateEmailStore } from "@/store/create-email";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, X } from "lucide-react";
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
import { NestedDates } from "./upcoming-program-dates";

const UpcomingProgramEditor = () => {
  const { selectedTemplate, setUpcomingPrograms, upcomingPrograms } =
    useCreateEmailStore();

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
  console.log({
    watchUpcomingPrograms,
  });

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
      <div className="flex items-center gap-2 self-stretch mb-4">
        <p className="ty-title flex-1 text-black/50">Upcoming Programs</p>
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
          className="bg-black flex px-3 py-2 gap-2 hover:bg-black/80"
        >
          <PlusIcon color="white" />
          <span className="text-white ty-subtitle">Add a program</span>
        </Button>
      </div>

      <div className="w-full text-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {fields.map((field, index) => {
              return (
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
                              placeholder="The Long Haul: How KPC built a shipping empire..."
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
                          Article Link
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

                  <NestedDates control={form.control} index={index} />
                </div>
              );
            })}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpcomingProgramEditor;
