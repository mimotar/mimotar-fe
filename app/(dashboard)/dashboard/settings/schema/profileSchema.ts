import z from "zod";

export const ProfileDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),

  phone_no: z.string().min(7, "Phone number must be at least 7 characters"),

  address: z.string().min(3, "Address is required"),

  city: z.string().min(2, "City is required"),

  country: z.string().min(2, "Country is required"),

  postal_code: z.string().min(2, "Postal code is required"),

  id_number: z.string().min(2, "ID number is required"),
});

export type ProfileDetailsFormValues = z.infer<typeof ProfileDetailsSchema>;
