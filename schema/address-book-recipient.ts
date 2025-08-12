import { z } from "zod";

export const addRecipientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  photoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  groupIds: z.array(z.string()).default([]),
});

