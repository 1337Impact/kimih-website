"use server";

import axios from "axios";

export default async function AVoidPayment(auth_id: string) {
  console.log("voidAutorization data:", auth_id);
  try {
    const response = await axios.post(
      `https://api.tap.company/v2/authorize/${auth_id}/void`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log("voidAutorization response:", response.data);
    return { data: "Payment has been voided successfully", error: null };
  } catch (error: any) {
    console.error("voidAutorization error:", error.response.data);
    return { data: null, error: "Error void payment" };
  }
}
