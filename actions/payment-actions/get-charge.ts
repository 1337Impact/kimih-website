"use server";

import axios from "axios";

export default async function AGetChargeStatus(charge_id: string) {
    if (!charge_id) {
      return {
        error: "Charge ID is required",
      };
    }
    try {
      const response = await axios.get(
        `https://api.tap.company/v2/charges/${charge_id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`, // Ensure you have a valid secret key here
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
  
      console.log("Charge Response:", response.data);
  
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
  