
import { z } from "zod";

export const ProgramsSchema = z.object({
  programs: z.array(
    z.object({
      title: z.string().min(1, {
        message: "Title is required",
      }),
      description: z.string().min(1, {
        message: "Description is required",
      }),
      image: z.string().min(1, {
        message: "Program image is required",
      }),
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
