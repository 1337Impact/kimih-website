import ACreateCharge from "@/actions/payment-actions/create-charge";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 10;

export async function GET() {
  console.log("Cron Job: GET request received");
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  const { data, error } = await supabase
    .from("payments")
    .select("amount, auth_id, charge_date, business(currency)")
    .eq("charge_date", new Date().toISOString().split("T")[0])
    .eq("status", "AUTHORIZED");

  data?.forEach(async (payment) => {
    if (!payment.auth_id) {
      console.error("Payment does not have an auth_id:", payment);
      return;
    }
    console.log("Payment:", payment);
    try {
      const { data, error } = await ACreateCharge({
        amount: payment.amount,
        currency: payment.business?.currency || "AED",
        authId: payment.auth_id,
      });
      if (error) {
        console.error("Error updating payment status:", error);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  });

  return NextResponse.json({ ok: true, data, error });
}
