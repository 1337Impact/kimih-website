import { createClient } from "@/utils/supabase/client";

export interface UserData {
  avatar_url: string | null;
  created_at: string | null;
  email: string | null;
  first_name: string | null;
  id: string;
  isCompleted: boolean;
  last_name: string | null;
  phone: string | null;
  role: string | null;
  updated_at: string | null;
}
 
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
