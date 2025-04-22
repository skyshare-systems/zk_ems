import { cn, colorizeButton, verifyPermission } from "@/lib/utils";
import { ArticleSchema } from "@/schema/articles";
import { useCreateEmailStore } from "@/store/create-email";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusIcon, X } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import Image from "next/image";
import ImageUploader from "./modals/image-uploader-no-context";

const ArticleEditor = () => {
  const { selectedTemplate, setArticles, articles } = useCreateEmailStore();

  const form = useForm<z.infer<typeof ArticleSchema>>({
    resolver: zodResolver(ArticleSchema),
    mode: "onBlur",
    defaultValues: { articles: [...articles] },
  });

  const { append, remove, update, fields } = useFieldArray({
    name: "articles",
    control: form.control,
  });

  const watchArticles = form.watch("articles");

  useEffect(() => {
    setArticles([...watchArticles]);
    form.trigger();
  }, [watchArticles, setArticles, form]);

  const onSubmit = (values: z.infer<typeof ArticleSchema>) => {
    console.log(values);
  };

  if (!selectedTemplate) return null;

  const isArticlesAllowed = verifyPermission({
    companyId: selectedTemplate.company.id,
    rules: ["articles"],
  });

  if (!selectedTemplate || !isArticlesAllowed) return null;

  return (
    <div className="flex p-4 flex-col justify-center items-center gap-2 self-stretch bg-black/[.04]">
      <div className="flex items-center gap-2 self-stretch mb-4">
        <p className="ty-title flex-1 text-black/50">ARTICLE</p>
        <Button
          disabled={!form.formState.isValid}
          onClick={() => append({ heading: "", content: "", articleLink: "" })}
          type="button"
          className={cn(
            "flex px-3 py-2 gap-2",
            colorizeButton(selectedTemplate.company.name),
          )}
        >
          <PlusIcon color="white" />
          <span className="text-white ty-subtitle">Add an article</span>
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
                <FormField
                  control={form.control}
                  name={`articles.${index}.heading`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        Heading
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
                  name={`articles.${index}.content`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        <div className="flex flex-col">
                          <p className="ty-descriptions">Content</p>
                          <p className="ty-subtext text-black/50">
                            Put the first paragraph only
                          </p>
                        </div>
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
                  name={`articles.${index}.articleLink`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        Article Link
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

                {/* Date */}
                <FormField
                  control={form.control}
                  name={`articles.${index}.date`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal  border-black/[.08] bg-transparent",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`articles.${index}.image`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px] w-full shrink-0">
                        <div className="flex flex-col">
                          <p className="ty-descriptions">Photo</p>
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
                                alt="Article Image"
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
                                    ...watchArticles[index],
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

export default ArticleEditor;
