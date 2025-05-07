import { z, ZodType } from "zod";
import { AuthTypes } from "../types/AuthTypes";

export const AuthFormSchema: ZodType<AuthTypes> = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(20, {
      message: "First name must be at most 20 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(20, {
      message: "First name must be at most 20 characters.",
    }),
  email: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
      message:
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.",
    }),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
      message:
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.",
    }),
});

export type IAuthFormSchema = z.infer<typeof AuthFormSchema>;
