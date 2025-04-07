import { z } from "zod";

export const UpcomingProgramsSchema = z.object({
  upcomingPrograms: z.array(
    z.object({
      title: z.string().min(1, { message: "Title is required" }),
      dates: z.array(
        z.object({
          date: z.coerce.date(),
        }),
      ),
      externalLink: z
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
