import { rules } from "@/lib/constant";
import { Articles, useCreateEmailStore } from "@/store/create-email";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { PlusIcon, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useDebounce } from "react-use";
import { ArticleSchema } from "@/schema/articles";

const ArticleEditor = () => {
  const { selectedTemplate, setArticles } = useCreateEmailStore();

  const isArticlesAllowed = rules.some(
    (rule) =>
      rule.rules.includes("articles") &&
      rule.companies.some(
        (company) => company.id === selectedTemplate?.company.id,
      ),
  );

  const form = useForm<z.infer<typeof ArticleSchema>>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {
      articles: [
        {
          heading: "",
          content: "",
          articleLink: "",
        },
      ],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "articles",
    control: form.control,
  });

  useEffect(() => {
    setArticles(form.watch("articles"));
  }, [setArticles, form]);

  const onSubmit = (values: z.infer<typeof ArticleSchema>) => {
    console.log(values);
  };

  if (!selectedTemplate || !isArticlesAllowed) return null;
  return (
    <div className="flex p-4 flex-col justify-center items-center gap-2 self-stretch bg-black/[.04]">
      <div className="flex items-center gap-2 self-stretch mb-4">
        <p className="ty-title flex-1 text-black/50">ARTICLE</p>

        <Button
          disabled={!form.formState.isValid}
          onClick={() => {
            append({ heading: "", content: "", articleLink: "" });
          }}
          type="button"
          className="bg-black flex px-3 py-2 gap-2 hover:bg-black/80"
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
                      <FormLabel className="max-w-[96px]  w-full shrink-0">
                        Heading
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                          placeholder="The Long Haul: How KPC built a shipping empire, one box at a tim|"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`articles.${index}.content`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px]  w-full shrink-0">
                        <div className="flex flex-col">
                          <p className="ty-descriptions">Content</p>
                          <p className="ty-subtext text-black/50">
                            Put the first paragraph only
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          className="w-full border-black/[.08]  placeholder:text-black/[.80] focus:border-gold"
                          placeholder="TManila is busy with the constant motion of commerce. Trucks rumble down choked streets, carrying goods that fuel the city’s appetite. At the heart of this flow is KPC Importation Services, a company that moves mountains – or at least, a staggering number of packages – every single month. They’ve become a fixture in the lives of countless Filipinos, a name whispered with a certain assurance when it comes to getting things from point A to point B."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`articles.${index}.articleLink`}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center gap-4 p-2">
                      <FormLabel className="max-w-[96px]  w-full shrink-0">
                        Article Link
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border-black/[.08] placeholder:text-black/[.80] focus:border-gold"
                          placeholder="https://randomrepublika.com/the-long-haul-how-kpc-built-a-shipping-empire-one-box-at-a-time/?fbclid=IwY2xjawI-IJVleHRuA2FlbQIxMAABHY9N9kkuzagH0vPewlgf0aDqDBMElhMC5X7Oxy-tQErAwhS6GP8IC7lHoA_aem_XxLlAlhJJb5ynX84Cv6krg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
