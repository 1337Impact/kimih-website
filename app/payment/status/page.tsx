"use client";
import AGetChargeStatus from "@/actions/payment-actions/get-charge";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const charge_id = searchParams.get("tap_id");
    console.log("charge_id", charge_id);
    if (!charge_id) {
      return;
    }
    const fetchStatus = async () => {
      const res = await AGetChargeStatus(charge_id);
      setStatus(res);
    };
    // fetchStatus();
  }, [searchParams]);
  
  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div className="max-w-[500px]">
        {status ? (
          <div>
            <h1>Payment Status: {status.status}</h1>
            <h2>Payment ID: {status.id}</h2>
          </div>
        ) : (
          <h1>Fetching Payment Status...</h1>
        )}
      </div>
    </div>
  );
}
