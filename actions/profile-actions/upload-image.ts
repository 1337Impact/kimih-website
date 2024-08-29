"use server";
import { createClient } from "@/utils/supabase/server";

export default async function AUploadProfileImage(data: any) {
  const supabase = createClient();
  console.log(data);
  return { data: "all good", error: null };
}