import { z } from "zod";

export const ProductSchema = z.object({
  products: z.array(
    z.object({
      image: z.string().min(1, {
        message: "Image is required",
      }),
      name: z.string().min(1, {
        message: "Name is required",
      }),
      description: z.string().min(1, {
        message: "Description is required",
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
});
