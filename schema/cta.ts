import { z } from "zod";

export const CtaSchema = z.object({
  text: z.string().min(1,{
    message: "Text is required",
  }),
  link: z.string().refine(
    (value) =>
      /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value),
    {
      message: "Please enter a valid URL",
    },
  ),
})