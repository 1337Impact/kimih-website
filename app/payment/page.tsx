"use client";

import ACreateCharge from "@/actions/payment-actions/create-charge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

function PaymentIndex() {
  const router = useRouter();
  const createChange = async () => {
    const res = await ACreateCharge({
      amount: 1,
      currency: "KWD",
      description: "Test Description",
      reference: {
        transaction: "txn_01",
        order: "ord_01",
      },
      customer: {
        first_name: "Mohammed",
        middle_name: "Doe",
        last_name: "Benkhattab",
        email: "mobenkhattab@gmail.com",
        phone: {
          country_code: "965",
          number: "50000000",
        },
      },
      merchant: {
        id: "1234",
      },
    });
    if (!res.error) {
      router.push(res.transaction.url);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div className="max-w-[500px]">
        <Button onClick={createChange}>pay</Button>
      </div>
    </div>
  );
}

export default PaymentIndex;
