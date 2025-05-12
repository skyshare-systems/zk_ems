import {
  cn,
  colorizeButton,
  isCourseTakenFieldVisible,
  isDatesOfTravelFieldVisible,
  isRatingFieldVisible,
  isTourLocationFieldVisible,
  verifyPermission,
} from "@/lib/utils";
import { ArticleSchema } from "@/schema/articles";
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
import { FromThePeopleSchema } from "@/schema/from-the-people";
import ImageUploader from "./modals/image-uploader-no-context";
import Image from "next/image";
import { companies } from "@/lib/constant";
import { FromThePeopleDates } from "./from-the-people-dates";
import { NestedDates } from "./nested-dates";

const FromThePeopleEditor = () => {
  const { selectedTemplate, fromThePeople, setFromThePeople, isRearranging } =
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
    <div
      className={cn(
        "flex p-4 flex-col justify-center items-center gap-2 self-stretch bg-black/[.04] relative",
        // isRearranging && "border border-dashed",
      )}
    >
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
          <p className="ty-title flex-1 text-black/50">From The People</p>

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
                              placeholder="John Doe"
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
                                type="number"
                                inputMode="numeric" // helps on mobile for numeric keypad
                                max={5}
                                min={1}
                                className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder="5"
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
                              placeholder="This workshop transformed my understanding of finance!"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {isTourLocationFieldVisible(
                    selectedTemplate.company.name as companies,
                  ) && (
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
                                placeholder="Tokyo - Osaka, Japan"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  )}

                  {isDatesOfTravelFieldVisible(
                    selectedTemplate.company.name as companies,
                  ) && (
                    <NestedDates
                      fieldName="fromThePeople"
                      control={form.control}
                      index={index}
                      label="Dates of Travel"
                    />
                  )}

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
                                  <X size={14} color="white" />
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
      )}
    </div>
  );
};

export default FromThePeopleEditor;
