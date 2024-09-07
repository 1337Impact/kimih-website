import { NextResponse } from "next/server";
import axios from "axios";

export async function POST() {
  try {
    const response = await axios.post(
      "https://api.tap.company/v2/authorize/",
      {
        amount: 1,
        currency: "KWD",
        customer_initiated: "true",
        threeDSecure: true,
        save_card: false,
        statement_descriptor: "sample",
        metadata: {
          udf1: "test_data_1",
          udf2: "test_data_2",
          udf3: "test_data_3",
        },
        reference: {
          transaction: "txn_0001",
          order: "ord_0001",
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
          id: "1234",
        },
        source: {
          id: "src_card",
        },
        authorize_debit: false,
        auto: {
          type: "CAPTURE",
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

    console.log("Payment Authorization Response:", response.data);

    // Return the API response data
    return NextResponse.json(response.data);
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Payment Authorization Error (Response):",
        error.response.data
      );
      return NextResponse.json(
        {
          message:
            error.response.data || "Error processing payment authorization",
        },
        { status: error.response.status }
      );
    } else if (error.request) {
      console.error(
        "Payment Authorization Error (No Response):",
        error.request
      );
      return NextResponse.json(
        { message: "No response received from Tap Payments API" },
        { status: 500 }
      );
    } else {
      console.error("Payment Authorization Error (Message):", error.message);
      return NextResponse.json(
        { message: "Error processing payment authorization" },
        { status: 500 }
      );
    }
  }
}
