"use client";

import { useRouter } from "next/navigation";
import PaymentForm from "./PaymentForm";

function PaymentIndex() {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div className="max-w-[500px]">
      <PaymentForm />
      </div>
    </div>
  );
}

export default PaymentIndex;
