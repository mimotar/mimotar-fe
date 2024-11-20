import { z } from "zod";

const editProfileInfoFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must not exceed 100 characters"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{7,15}$/, "Invalid phone number")
    .min(1, "Phone number is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address must not exceed 255 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must not exceed 100 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country must not exceed 100 characters"),
  postalCode: z
    .string()
    .regex(/^\d{4,10}$/, "Invalid postal code")
    .min(1, "postal Code is required"),
  idNumber: z
    .string()
    .regex(/^\d{5,20}$/, "Invalid ID number")
    .min(1, "Id Number is required"),

  // If countryCode.flag needs validation, you can add it here
});

export default editProfileInfoFormSchema;
export type editProfileInfoFormSchemaType = z.infer<
  typeof editProfileInfoFormSchema
>;
