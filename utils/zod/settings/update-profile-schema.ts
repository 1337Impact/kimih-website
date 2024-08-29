import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const updateProfile = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(30, "First name cannot exceed 30 characters"),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(30, "Last name cannot exceed 30 characters"),
  phone: z.string().regex(phoneRegex, 'Invalid phone number!'),
  email: z.string().email("Invalid email address"),
});

const updatePassword = z.object({
    currentPassword: z.string().min(1, "Password must not be empty"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

export { updatePassword };
export default updateProfile;
