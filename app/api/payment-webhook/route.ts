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
    console.log("Webhook event data:", eventData.id, eventData.status);

    if (eventData.status !== "CAPTURED") {
      console.log("Payment not captured, ignoring webhook");
      const { data, error } = await supabase
        .from("payments")
        .delete()
        .eq("charge_id", eventData.id);
      if (error) {
        console.error("Error updating payment status:", error);
      }
    } else {
      console.log("Payment captured, updating payment status");
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
