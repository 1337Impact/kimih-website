"use server";
import { createClient } from "@/utils/supabase/server";

export async function ACreateReview(reviewData: {
  rating: number;
  comment: string;
  business_id: string;
  appointment_id: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .insert(reviewData)
    .select("id")
    .single();

  if (error) {
    console.log(error);
    return { error: error.message, data: null };
  }
  return { data, error: null };
}

export default async function ADeleteReview(review_id: string) {
  console.log("review data: ", review_id);
  const supabase = createClient();
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", review_id);
  if (error) {
    return { data: null, error: error.message };
  }
  return { data: "Review has been deleted succesfully", error: null };
}
