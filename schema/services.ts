
import { z } from "zod";

export const ServicesSchema = z.object({
  services: z.array(
    z.object({
      title: z.string().min(1, {
        message: "Title is required",
      }),
      description: z.string().min(1, {
        message: "Description is required",
      }),
      image: z.string(),
      link: z
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
})
