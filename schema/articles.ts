import { z } from "zod";

  export const ArticleSchema = z.object({
    articles: z.array(
      z.object({
        heading: z.string().min(1, {
          message: "Heading is required",
        }),
        content: z.string().min(1, {
          message: "Content is required",
        }),
        date: z.coerce.date().optional(),
        image: z.string().optional(),
        articleLink: z
          .string()
          .refine(
            (value) =>
              /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value),
            {
              message: "Please enter a valid URL",
            },
          ),
      }),
    ),
  });