"use server";

import axios from "axios";

interface ChargeRequest {
  amount: number;
  currency: string;
  description: string;
  reference: {
    transaction: string;
    order: string;
  };
  customer: {
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone: {
      country_code: string;
      number: string;
    };
  };
  merchant: {
    id: string;
  };
}

export default async function ACreateCharge(data: ChargeRequest) {
  console.log("createCharge data:", data);
  try {
    const response = await axios.post(
      "https://api.tap.company/v2/charges/",
      {
        amount: data.amount,
        currency: data.currency,
        customer_initiated: true,
        threeDSecure: true,
        save_card: false,
        // payment_agreement: {
        //   id: "sdfdsfdsfdfsdf", // Replace with your payment agreement ID
        // },
        description: data.description,
        metadata: {
          udf1: "Metadata 1",
        },
        reference: {
          transaction: "txn_01",
          order: "ord_01",
        },
        receipt: {
          email: true,
          sms: true,
        },
        customer: data.customer,
        merchant: data.merchant,
        source: {
          id: "src_card", // Change to the actual source ID
        },
        post: {
          url: "https://26d2-197-230-30-146.ngrok-free.app/api/verify-payment",
        },
        redirect: {
          url: "http://localhost:3000/payment/status",
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
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Charge Error (Response):", error.response.data);
      return;
      {
        message: error.response.data || "Error processing charge";
      }
    } else if (error.request) {
      console.error("Charge Error (No Response):", error.request);
      return;
      {
        message: "No response received from Tap Payments API";
      }
    } else {
      console.error("Charge Error (Message):", error.message);
      return;
      {
        message: "Error processing charge";
      }
    }
  }
}
