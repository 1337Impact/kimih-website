import { createClient } from "@/utils/supabase/client";

export async function getBusinessCurrency(business_id: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("business")
    .select("currency")
    .eq("id", business_id)
    .single();
    console.log(data?.currency);
  return data?.currency || "";
}
