"use server";
import axios from "axios";

interface AuthorizeRequest {
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
  tokenizedId: string;
  voidAfter: number;
}

export default async function ACreateAuthorize(data: AuthorizeRequest) {
  console.log("createAutorization data:", data);
  try {
    const response = await axios.post(
      "https://api.tap.company/v2/authorize/",
      {
        amount: data.amount,
        currency: data.currency,
        customer_initiated: true,
        threeDSecure: true,
        save_card: false,
        description: data.description,
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
        auto: {
          type: "VOID",
          time: data.voidAfter < 168 ? data.voidAfter : 168,
        },
        source: {
          id: data.tokenizedId, // Change to the actual source ID
        },
        post: {
          url: `${process.env.NEXT_PUBLIC_URL}/api/payment-webhook/auth`,
        },
        redirect: {
          url: `${process.env.NEXT_PUBLIC_URL}/profile`,
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

    console.log("Authorize Response:", response.data);

    // Return the API response data
    return { data: response.data};
  } catch (error: any) {
    if (error.response) {
      console.error("Authorize Error (Response):", error.response.data);
      return {
        error: error.response.data.errors[0] || "Error processing charge"
      }
    } else if (error.request) {
      console.error("Authorize Error (No Response):", error.request);
      return {
        error: "No response received from Tap Payments API"
      }
    } else {
      console.error("Authorize Error (Message):", error.message);
      return {
        error: "Error processing charge"
      }
    }
  }
}
