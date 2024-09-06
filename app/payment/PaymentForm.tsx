// components/PaymentForm.tsx
"use client";
import { use, useCallback, useEffect, useState } from "react";
// import  "./styles.css";
//@ts-ignore
import { GoSellElements } from "@tap-payments/gosell";

export const dynamic = "force-dynamic";

const PaymentForm = () => {
  const callbackFunc = (response: any) => {
    console.log("Response:", response);
    const msg = document.getElementById("msg");
    // if (response.status === "success") {
    //   msg!.innerText = "Payment successful!";
    // } else {
    //   msg!.innerText = "Payment failed!";
    // }
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
      {/* <div id="element-container"></div>
  <div id="error-handler" role="alert"></div>
  <div id="success" style=" display: none;;position: relative;float: left;">
        Success! Your token is <span id="token"></span>
  </div> */}
      <button onClick={() => GoSellElements.submit()}>Submit</button>
    </div>
  );
};

export default PaymentForm;

// import { useState, useEffect, useCallback } from 'react';

// export default function PaymentForm2() {
//   const [cardSDK, setCardSDK] = useState<any>(null);

//   useEffect(() => {
//     const loadTapSDK = () => {
//       const script = document.createElement('script');
//       script.src = 'https://tap-sdks.b-cdn.net/card/1.0.2/index.js';
//       script.async = true;
//       script.onload = initializeCardSDK;
//       document.body.appendChild(script);
//     };

//     const initializeCardSDK = () => {
//       if (!window.CardSDK) {
//         console.error('CardSDK is not loaded');
//         return;
//       }
//       setCardSDK(window.CardSDK);
//       const { renderTapCard, Theme, Currencies, Direction, Edges, Locale } = window.CardSDK;

//       const { unmount } = renderTapCard('card-sdk-id', {
//         publicKey: process.env.NEXT_PUBLIC_TAP_PUBLIC_KEY!,
//         transaction: {
//           amount: 1, // Example amount, adjust as necessary
//           currency: Currencies.SAR,
//         },
//         acceptance: {
//           supportedBrands: ['AMERICAN_EXPRESS', 'VISA', 'MASTERCARD', 'MADA'],
//           supportedCards: 'ALL',
//         },
//         fields: {
//           cardHolder: true,
//         },
//         addons: {
//           displayPaymentBrands: true,
//           loader: true,
//           saveCard: true,
//         },
//         interface: {
//           locale: Locale.EN,
//           theme: Theme.LIGHT,
//           edges: Edges.CURVED,
//           direction: Direction.LTR,
//         },
//         onReady: () => console.log('onReady'),
//         onFocus: () => console.log('onFocus'),
//         onBinIdentification: (data: any) => console.log('onBinIdentification', data),
//         onValidInput: (data: any) => console.log('onValidInputChange', data),
//         onInvalidInput: (data: any) => console.log('onInvalidInput', data),
//         onError: (data: any) => console.log('onError', data),
//         onSuccess: (data: any) => console.log('onSuccess', data),
//       });
//     };

//     if (typeof window !== 'undefined' && !window.CardSDK) {
//       loadTapSDK();
//     } else if (window.CardSDK) {
//       initializeCardSDK();
//     }

//     return () => {
//       const cardElement = document.getElementById('card-sdk-id');
//       if (cardElement) {
//         while (cardElement.firstChild) {
//           cardElement.removeChild(cardElement.firstChild);
//         }
//       }
//     };
//   }, []);

//   const handleSubmit = useCallback(() => {
//     if (!cardSDK) {
//       console.error('CardSDK is not loaded');
//       return;
//     }

//     // Tokenize card details using the callback method
//     cardSDK.tokenize();
//   }, [cardSDK]);

//   const handlePayment = (token: string) => {
//     // Call your backend API to process the payment with the token
//     fetch('/api/process-payment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         token,
//         amount: 1, // Example amount
//         currency: 'SAR',
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('Payment processed:', data);
//       })
//       .catch((error) => {
//         console.error('Payment error:', error);
//       });
//   };

//   return (
//     <div>
//       <div id="card-sdk-id"></div>
//       {/* <button id="card-v2" onClick={handleSubmit}>
//         Submit
//       </button> */}
// 	  <button id="card-v2" onClick="window.CardSDK.tokenize()">Submit</button>
//     </div>
//   );
// }
