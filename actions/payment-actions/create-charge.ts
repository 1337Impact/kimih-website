"use server";
import axios from "axios";

interface ChargeRequest {
  amount: number;
  currency: string;
  authId: string;
}

export default async function ACreateCharge(data: ChargeRequest) {
  console.log("createCharge data:", data);
  try {
    const response = await axios.post(
      "https://api.tap.company/v2/charges/",
      {
        amount: data.amount,
        currency: data.currency,
        source: {
          id: data.authId,
        },
        post: {
          url: `${process.env.NEXT_PUBLIC_URL}/api/payment-webhook/charge`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`, // Ensure you have a valid secret key here
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("Charge Response:", response.data);

    // Return the API response data
    return { data: response.data };
  } catch (error: any) {
    if (error.response) {
      console.error("Charge Error (Response):", error.response.data);
      return {
        error: error.response.data || "Error processing charge",
      };
    } else if (error.request) {
      console.error("Charge Error (No Response):", error.request);
      return {
        error: "No response received from Tap Payments API",
      };
    } else {
      console.error("Charge Error (Message):", error.message);
      return {
        error: "Error processing charge",
      };
    }
  }
}
