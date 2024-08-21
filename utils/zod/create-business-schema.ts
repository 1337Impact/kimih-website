import { z } from "zod";

const urlSchema = z.string().regex(
    /^www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
    "Invalid URL format. ex: www.example.com"
  ).or(z.literal(""));

const createBusinessStep1Schema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  website: urlSchema,
  address: z.string().min(1, "Address is required"),
});

const createBusinessStep2Schema = z.object({
    services: z.array(z.string()).min(1, "Select at least one service to continue"),
});

const createBusinessFinalStepSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  website: urlSchema.optional(),
  address: z.string().min(1, "Address is required"),
  services: z.array(z.string()).min(1, "Select at least one service"),
});

export default createBusinessFinalStepSchema;
export { createBusinessStep1Schema, createBusinessStep2Schema };
