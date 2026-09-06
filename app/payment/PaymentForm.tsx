"use client";
import { useCallback, useRef } from "react";
import Script from "next/script";

const PaymentForm = () => {
  const unmountRef = useRef<(() => void) | undefined>();

  const initCard = useCallback(() => {
    if (typeof window === "undefined" || !window.CardSDK) return;
    const { renderTapCard, Theme, Direction, Edges, Locale } =
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
      onSuccess: (data: any) => console.log("onSuccess", data),
    });
    unmountRef.current = unmount;
  }, []);

  const handleSubmit = () => {
    window.CardSDK.tokenize();
  };

  return (
    <div>
      <Script
        src="https://tap-sdks.b-cdn.net/card/1.0.2/index.js"
        strategy="afterInteractive"
        onLoad={initCard}
      />
      <div id="card-sdk-id"></div>
      <p id="msg"></p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PaymentForm;
