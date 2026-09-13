import { z } from "zod";

export const extendDeadlineSchema = z.object({
  deadline: z.string().min(1, "Deadline is required"),
  reason: z
    .string()
    .min(1, "Reason is required")
    .min(10, "Reason must be at least 10 characters")
    .max(60, "Reason must be 60 characters"),
});
