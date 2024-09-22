"use server";

import { createClient } from "@supabase/supabase-js";
import AVoidPayment from "../payment-actions/void-payment";
import { Database } from "@/types/supabase";

export default async function ACancelAppointment(appointment_id: string) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );
  const { data, error } = await supabase
    .from("appointments")
    .select("payments(id, auth_id)")
    .eq("id", appointment_id)
    .single();

  if (error || !data)
    return { data: null, error: "Failed to cancel appointment" };
  if (!data.payments?.auth_id) return { data: null, error: "No payment found" };

  const response = await AVoidPayment(data.payments.auth_id);

  if (response.error) return { data: null, error: response.error };
  const { error: canceledError } = await supabase
    .from("payments")
    .update({ status: "CANCELED" })
    .eq("id", data.payments.id);

  return { data: "Payment has been canceled successfully!", error: null };
}
