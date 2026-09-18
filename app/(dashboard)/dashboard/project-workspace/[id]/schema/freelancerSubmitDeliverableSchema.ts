import z from "zod";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const fileSchema = z
  .instanceof(File, {
    message: "Invalid file",
  })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "File size must not exceed 20 MB",
  )
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    "Only PNG, JPG, PDF, ZIP, DOC and DOCX files are allowed",
  );

export const deliverySchema = z.object({
  note: z.string().trim().min(10, "Please provide at least 10 characters"),

  file: z.array(fileSchema).length(1, "Please select one file"),
});

export type IDeliverySchema = z.infer<typeof deliverySchema>;
