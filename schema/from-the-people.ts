import { z } from "zod";

export const FromThePeopleSchema = z.object({
  fromThePeople: z.array(
    z.object({
      reviewerName: z.string().min(1, {
        message: "Reviewer name is required",
      }),
      reviewerImage: z.string().min(1, {
        message: "Reviewer image is required",
      }),
      rating: z.coerce.number().min(1, {
        message: "Rating is required."
      }).max(5,{
        message: "Rating must be between 1 and 5."
      })
      .optional(),
      tourLocation: z.string().optional(),
      dates: z
        .array(
          z.object({
            date: z.coerce.date(),
          }),
        )
        .optional(),
      review: z.string().min(1, {
        message: "Review is required",
      }),
      courseTaken: z.string().optional(),
    }),
  ),
});
