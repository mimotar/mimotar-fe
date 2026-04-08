import { z } from "zod";

const editProfileInfoFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").trim(),

  // email: z.string().email("Enter a valid email address").trim(),

  phone_no: z.string().min(7, "Enter a valid phone number").trim(),

  address: z.string().min(3, "Address must be at least 3 characters").trim(),

  city: z.string().min(2, "City must be at least 2 characters").trim(),

  country: z.string().min(2, "Country must be at least 2 characters").trim(),

  postal_code: z.string().min(3, "Postal code is too short").trim(),

  id_number: z
    .string()
    .min(4, "ID number must be at least 4 characters")
    .trim(),
});

export type IEditProfileInfoFormSchemaType = z.infer<
  typeof editProfileInfoFormSchema
>;

export default editProfileInfoFormSchema;
