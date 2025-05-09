import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface ChargeRequest {
  amount: number;
  currency: string;
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

export async function POST(req: NextRequest) {
  const request = await req.json();
  try {
    const response = await axios.post(
      "https://api.tap.company/v2/charges/",
      {
        amount: 1,
        currency: "KWD",
        customer_initiated: true,
        threeDSecure: true,
        save_card: false,
        // payment_agreement: {
        //   id: "sdfdsfdsfdfsdf", // Replace with your payment agreement ID
        // },
        description: "Test Description",
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
          id: "1234", // Replace with your merchant ID if needed
        },
        source: {
          id: "src_card", // Change to the actual source ID
        },
        post: {
          url: "https://26d2-197-230-30-146.ngrok-free.app/api/verify-payment",
        },
        redirect: {
          url: "http://localhost:3000",
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
    return NextResponse.json(response.data);
  } catch (error : any) {
    // Improved error logging to capture all error types
    if (error.response) {
      console.error("Charge Error (Response):", error.response.data);
      return NextResponse.json(
        { message: error.response.data || "Error processing charge" },
        { status: error.response.status }
      );
    } else if (error.request) {
      console.error("Charge Error (No Response):", error.request);
      return NextResponse.json(
        { message: "No response received from Tap Payments API" },
        { status: 500 }
      );
    } else {
      console.error("Charge Error (Message):", error.message);
      return NextResponse.json(
        { message: "Error processing charge" },
        { status: 500 }
      );
    }
  }
}
