import {
  cn,
  colorizeButton,
  isCourseTakenFieldVisible,
  isRatingFieldVisible,
  verifyPermission,
} from "@/lib/utils";
import { ArticleSchema } from "@/schema/articles";
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
import { FromThePeopleSchema } from "@/schema/from-the-people";
import ImageUploader from "./modals/image-uploader-no-context";
import Image from "next/image";
import { companies } from "@/lib/constant";
import { NestedDates } from "./upcoming-program-dates";

const FromThePeopleEditor = () => {
  const { selectedTemplate, fromThePeople, setFromThePeople } =
    useCreateEmailStore();

  const form = useForm<z.infer<typeof FromThePeopleSchema>>({
    resolver: zodResolver(FromThePeopleSchema),
    mode: "onTouched", // Enables real-time validation
    defaultValues: { fromThePeople: [...fromThePeople] },
  });

  const { append, remove, update, fields } = useFieldArray({
    name: "fromThePeople",
    control: form.control,
  });

  const watchFromThePeople = form.watch("fromThePeople");

  useEffect(() => {
    setFromThePeople([...watchFromThePeople]);
    form.trigger(); // Triggers validation on every change
  }, [watchFromThePeople, setFromThePeople, form]);

  const onSubmit = (values: z.infer<typeof FromThePeopleSchema>) => {
    console.log(values);
  };

  if (!selectedTemplate) return null;

  const isFromThePeopleAllowed = verifyPermission({
    companyId: selectedTemplate.company.id,
    rules: ["from_the_people"],
  });

  if (!selectedTemplate || !isFromThePeopleAllowed) return null;

  return (
    <div className="flex p-4 flex-col justify-center items-center gap-2 self-stretch bg-black/[.04]">
      <div className="flex items-center gap-2 self-stretch mb-4">
        <p className="ty-title flex-1 text-black/50">From The People</p>
        <Button
          disabled={!form.formState.isValid}
          onClick={() =>
            append({
              reviewerName: "",
              reviewerImage: "",
              rating: 0,
              review: "",
            })
          }
          type="button"
          className={cn(
            "flex px-3 py-2 gap-2 ",
            colorizeButton(selectedTemplate.company.name),
          )}
        >
          <PlusIcon color="white" />
          <span className="text-white ty-subtitle">Add a review</span>
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

                {/* REVIEWERS NAME */}
                <FormField
                  control={form.control}
                  name={`fromThePeople.${index}.reviewerName`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        Reviewer’s Name
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

                {isRatingFieldVisible(
                  selectedTemplate.company.name as companies,
                ) && (
                  <FormField
                    control={form.control}
                    name={`fromThePeople.${index}.rating`}
                    render={({ field }) => (
                      <FormItem className="w-full flex items-center gap-4 p-2">
                        <FormLabel className="max-w-[96px] w-full shrink-0">
                          Rating
                        </FormLabel>
                        <div className="flex flex-col gap-2 w-full">
                          <FormControl>
                            <Input
                              className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                              placeholder="https://randomrepublika.com/the-long-haul..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                )}

                {isCourseTakenFieldVisible(
                  selectedTemplate.company.name as companies,
                ) && (
                  <FormField
                    control={form.control}
                    name={`fromThePeople.${index}.courseTaken`}
                    render={({ field }) => (
                      <FormItem className="w-full flex items-center gap-4 p-2">
                        <FormLabel className="max-w-[96px] w-full shrink-0">
                          Course Taken
                        </FormLabel>
                        <div className="flex flex-col gap-2 w-full">
                          <FormControl>
                            <Input
                              className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                              placeholder="8-Day Full Course Aesthetic Program and Courses"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name={`fromThePeople.${index}.review`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        Review
                      </FormLabel>
                      <div className="flex flex-col gap-2 w-full">
                        <FormControl>
                          <Textarea
                            rows={4}
                            className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                            placeholder="Manila is busy with the constant motion of commerce..."
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
                  name={`fromThePeople.${index}.tourLocation`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        Tour Location
                      </FormLabel>
                      <div className="flex flex-col gap-2 w-full">
                        <FormControl>
                          <Input
                            className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                            placeholder="8-Day Full Course Aesthetic Program and Courses"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <NestedDates control={form.control} index={index} label="Dates of Travel" />

                <FormField
                  control={form.control}
                  name={`fromThePeople.${index}.reviewerImage`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        <div className="flex flex-col">
                          <p className="ty-descriptions">
                            Reviewer&rsquo;s Image
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
                                    ...watchFromThePeople[index],
                                    reviewerImage: url,
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

export default FromThePeopleEditor;
