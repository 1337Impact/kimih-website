"use client";
import { useEffect } from "react";

const PaymentForm = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.CardSDK) return;
    const { renderTapCard, Theme, Currencies, Direction, Edges, Locale } =
      window.CardSDK;
    const { unmount } = renderTapCard("card-sdk-id", {
      publicKey: "pk_test_X6Rs1Ale7vaK3gBNtFpwjzSW",
      merchant: {
        id: "merchant_WCEQ1724103mCzR9uT80992",
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
      onSuccess: (data : any) => console.log("onSuccess", data),
    });
  }, []);

  const handleSubmit = () => {
    const res = window.CardSDK.tokenize();
  };

  return (
    <div>
      <div id="card-sdk-id"></div>
      <p id="msg"></p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PaymentForm;
