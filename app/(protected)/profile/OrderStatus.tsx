"use client";

import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const getPaymentStatus = async (tap_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("payments")
    .select("status")
    .eq("auth_id", tap_id)
    .single();
  console.log("Payment status data:", data);
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

export default function OrderStatus() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const tap_id = searchParams.get("tap_id");
    console.log("tap_id", tap_id);
    if (tap_id) {
      getPaymentStatus(tap_id).then((data) => {
        if (data?.status === "AUTHORIZED" || data?.status === "CAPTURED") {
          toast({
            title: "Payment successful",
            description: "Your payment has been successfully processed",
            variant: "success",
          });
        } else {
          toast({
            title: "Payment failed",
            description: "Your payment has failed",
            variant: "destructive",
          });
        }
      });
    }
  }, [searchParams, toast]);

  return <div />;
}
