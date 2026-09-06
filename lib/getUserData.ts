import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

export type UserData = Tables<"profiles">;
 
export const getUserData = async () => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData || !userData.user) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();
  return data;
};
