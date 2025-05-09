import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const eventData = JSON.parse(body);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );
    console.log("Charge Webhook event data:", eventData.id, eventData.status);

    if (eventData.status === "DECLINED" || eventData.status === "FAILED") {
      console.error("Payment is DECLINED, deleting payment...");
      const { data, error } = await supabase
        .from("payments")
        .delete()
        .eq("charge_id", eventData.id);
      if (error) {
        console.error("Error updating payment status:", error);
      }
    } else if (eventData.status === "CAPTURED") {
      console.log("Payment captured, updating payment status");
      const { data, error } = await supabase
        .from("payments")
        .update({ status: eventData.status, charge_id: eventData.id })
        .eq("charge_id", eventData.id);
      if (error) {
        console.error("Error updating payment status:", error);
      }
    } else if (eventData.status === "AUTHORIZED") {
      console.log("Payment authorized, updating payment status");
      const { data, error } = await supabase
        .from("payments")
        .update({ status: eventData.status })
        .eq("charge_id", eventData.id);
      if (error) {
        console.error("Error updating payment status:", error);
      }
    }

    return NextResponse.json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);

    return NextResponse.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}
