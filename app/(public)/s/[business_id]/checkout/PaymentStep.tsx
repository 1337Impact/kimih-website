"use client";
import { useEffect } from "react";

const PaymentStep = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.CardSDK) return;
    const { renderTapCard, Theme, Direction, Edges, Locale } =
      window.CardSDK;
    const { unmount } = renderTapCard("card-sdk-id", {
      publicKey: process.env.NEXT_PUBLIC_TAP_PUBLIC_KEY,
      merchant: {
        id: process.env.NEXT_PUBLIC_TAP_MERCHANT_KEY,
      },
      transaction: {
        amount: 1,
        currency: "AED",
      },
      customer: {
        id: "",
      },
      acceptance: {
        supportedBrands: ["VISA", "MASTERCARD", "AMERICAN_EXPRESS"],
        supportedCards: "ALL",
      },
      fields: {
        cardHolder: true,
      },
      addons: {
        displayPaymentBrands: true,
        loader: true,
        saveCard: false,
      },
      interface: {
        locale: Locale.EN,
        theme: Theme.LIGHT,
        edges: Edges.CURVED,
        direction: Direction.LTR,
      },
      // onReady: () => console.log("onReady"),
      // onFocus: () => console.log("onFocus"),
      // onBinIdentification: (data) => console.log("onBinIdentification", data),
      // onValidInput: (data) => console.log("onValidInputChange", data),
      // onInvalidInput: (data) => console.log("onInvalidInput", data),
      // onError: (data) => console.log("onError", data),
      onSuccess: onSuccess,
    });
  }, [onSuccess]);

  return (
    <div className="max-w-md mx-auto p-2 mt-10">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Payment Informations
      </h2>
      <div className="mb-4">
        <div>
          <div id="card-sdk-id" />
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
