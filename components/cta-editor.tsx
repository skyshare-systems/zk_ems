import { verifyPermission } from "@/lib/utils";
import { CtaSchema } from "@/schema/cta";
import { useCreateEmailStore } from "@/store/create-email";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const CtaEditor = () => {
  const { selectedTemplate, setCta, cta } = useCreateEmailStore();

  const form = useForm<z.infer<typeof CtaSchema>>({
    resolver: zodResolver(CtaSchema),
    mode: "onBlur",
    defaultValues: {
      link: cta.link || "",
      text: cta.text || "",
    },
  });

  const watchCtaLink = form.watch("link");
  const watchCtaText = form.watch("text");

  const onSubmit = (values: z.infer<typeof CtaSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    setCta({
      link: watchCtaLink,
      text: watchCtaText,
    });
    form.trigger();
  }, [form, setCta, watchCtaLink, watchCtaText]);

  if (!selectedTemplate) return null;

  const isCtaAllowed = verifyPermission({
    companyId: selectedTemplate.company.id,
    rules: ["cta_button"],
  });

  if (!selectedTemplate || !isCtaAllowed) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-4 justify-normal items-center gap-2 self-stretch bg-black/[.04]"
      >
        <div className="flex items-center gap-2 self-stretch">
          <p className="ty-title flex-1 text-black opacity-50">CTA BUTTON</p>
        </div>

        <div className="flex flex-col items-start rounded-lg border w-full border-black/[.08]">
          <FormField
            control={form.control}
            name={`text`}
            render={({ field }) => (
              <FormItem className="w-full flex items-center gap-4 p-2">
                <FormLabel className="max-w-[96px] w-full shrink-0 text-black">
                  Button Text
                </FormLabel>
                <div className="flex flex-col gap-2 w-full">
                  <FormControl>
                    <Input
                      className="w-full border-black/[.08] text-background placeholder:text-black/[.80] focus:border-gold text-ellipsis line-clamp-1"
                      placeholder="Learn More"
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
            name={`link`}
            render={({ field }) => (
              <FormItem className="w-full flex items-center gap-4 p-2">
                <FormLabel className="max-w-[96px] w-full shrink-0 text-black">
                  Link
                </FormLabel>
                <div className="flex flex-col gap-2 w-full">
                  <FormControl>
                    <Input
                      className="w-full border-black/[.08] text-background placeholder:text-black/[.80] focus:border-gold"
                      placeholder="https://randomrepublika.com/the-long-haul-how-kpc-built-a-shipping-empire-one-box-at-a-time/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CtaEditor;
