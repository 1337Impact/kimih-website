// components/PaymentForm.tsx
"use client";
// import { use, useCallback, useEffect, useState } from "react";
//@ts-ignore
import { GoSellElements } from "@tap-payments/gosell";

export const dynamic = "force-dynamic";

const PaymentForm = () => {
  const callbackFunc = (response: any) => {
    console.log("Response:", response);
    const msg = document.getElementById("msg");
  };

  return (
    <div>
      <GoSellElements
        gateway={{
          publicKey: process.env.NEXT_PUBLIC_TAP_PUBLIC_KEY!,
          language: "en",
          supportedCurrencies: "all",
          supportedPaymentMethods: "all",
          notifications: "msg",
          callback: callbackFunc,
          onClose: () => {
            console.log("onClose Event");
          },
          backgroundImg: {
            url: "/logo.svg",
            opacity: "0.5",
          },
          labels: {
            cardNumber: "Card Number",
            expirationDate: "MM/YY",
            cvv: "CVV",
            cardHolder: "Name on Card",
            actionButton: "Pay",
          },
          style: {
            base: {
              color: "#535353",
              lineHeight: "18px",
              fontFamily: "sans-serif",
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "rgba(0, 0, 0, 0.26)",
                fontSize: "15px",
              },
            },
            invalid: {
              color: "red",
              iconColor: "#fa755a ",
            },
          },
        }}
        order={{
          amount: "100",
          currency: "BHD",
        }}
        transaction={{
          mode: "charge",
        }}
        charge={{
          threeDSecure: false,
          redirect: "/",
          post: "/",
          hashstring: "",
        }}
      />

      <p id="msg"></p>
      <button onClick={() => GoSellElements.submit()}>Submit</button>
    </div>
  );
};

export default PaymentForm;
