import { z } from "zod";

export const PostsSchema = z.object({
  posts: z.array(
    z.object({
      description: z.string().min(1, {
        message: "Description is required",
      }),
      image: z.string().min(1, {
        message: "Post image is required",
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
