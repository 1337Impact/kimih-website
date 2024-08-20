"use server";

import { createClient } from "@/utils/supabase/server";

export default async function ACreateAccount(signUpData: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
}) {
  const supabase = createClient();
  const { first_name, last_name, email, password, phone, role } = signUpData;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        phone,
        email,
        user_role: role || "user",
      },
    },
  });
  if (error) {
    console.log(error);
    return { error: error.message, data: null };
  }
  return { data, error: null };
}
