import { z } from "zod";
import { urlSchema } from "../create-business-schema";

const updateBusiness = z.object({
  business_name: z.string().min(1, "Business name is required"),
  website: urlSchema.optional(),
  address: z.string().min(1, "Address is required"),
});

export default updateBusiness;
