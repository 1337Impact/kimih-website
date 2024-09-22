"use server";
import axios from "axios";

interface ChargeRequest {
  amount: number;
  currency: string;
  authId: string;
  destinationId: string | null;
}

export default async function ACreateCharge(data: ChargeRequest) {
  console.log("createCharge data:", data);
  const paymentAmount = data.amount * 0.97;
  try {
    const response = await axios.post(
      "https://api.tap.company/v2/charges/",
      {
        amount: data.amount,
        currency: data.currency,
        source: {
          id: data.authId,
        },
        destinations: data.destinationId && {
          destination: [
            {
              id: data.destinationId,
              amount: paymentAmount * 0.95,
              currency: data.currency,
            },
          ],
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
