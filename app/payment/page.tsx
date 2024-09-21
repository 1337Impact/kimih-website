"use client";

import ACreateCharge from "@/actions/payment-actions/create-charge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import PaymentForm from "./PaymentForm";
import { useEffect } from "react";
import { getPreviousDateAndVoid } from "@/utils/formating-utils/format-date";

const calculateVoidAfter = (time: Date) => {
  if (!time) return 0;
  const now = new Date();
  const diff = time.getTime() - now.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  return hours + 24;
};

function PaymentIndex() {
  const router = useRouter();

  useEffect(() => {
    console.log("test 0: ", getPreviousDateAndVoid(new Date()));
    console.log("test 0.5: ", getPreviousDateAndVoid(new Date('2024-09-22T00:00:00Z')));
    console.log("test 1: ", getPreviousDateAndVoid(new Date('2024-09-24T00:00:00Z')));
    console.log("test 2: ", getPreviousDateAndVoid(new Date('2024-09-26T00:00:00Z')));
    console.log("test 3: ", getPreviousDateAndVoid(new Date('2024-09-30T00:00:00Z')));
    console.log("test 4: ", getPreviousDateAndVoid(new Date('2026-10-04T00:00:00Z')));
    console.log("test 5: ", getPreviousDateAndVoid(new Date('2026-09-30T00:00:00Z')));

    // console.log("test 0: ", calculateVoidAfter(new Date()));
    // console.log("test 0.5: ", calculateVoidAfter(new Date('2024-09-22T00:00:00Z')));
    // console.log("test 1: ", calculateVoidAfter(new Date('2024-09-24T00:00:00Z')));
    // console.log("test 2: ", calculateVoidAfter(new Date('2024-09-26T00:00:00Z')));
    // console.log("test 3: ", calculateVoidAfter(new Date('2024-09-30T00:00:00Z')));
    // console.log("test 4: ", calculateVoidAfter(new Date('2026-10-04T00:00:00Z')));
    // console.log("test 5: ", calculateVoidAfter(new Date('2026-09-30T00:00:00Z')));
  }, []);

  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div className="max-w-[500px]">
      <PaymentForm />
      </div>
    </div>
  );
}

export default PaymentIndex;
