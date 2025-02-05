import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Please enter a valid username",
  }).max(50),
  password: z.string({
    message: "Please enter a valid password",
  }),
});