import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
export async function checkUserByEmail(email: string) {
  console.log("Checking user by email:", email);
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email);

  if (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

  return data.length > 0;
}

export async function loginWithEmail(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    throw error;
  }
  return data.user;
}
