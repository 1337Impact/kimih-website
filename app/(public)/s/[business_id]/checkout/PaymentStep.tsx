"use client";
import React, { useState } from "react";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ cardNumber, expiryDate, cvc });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Payment Information
      </h2>

      <div className="mb-4">
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 1234 1234 1234"
          maxLength={19}
          className="p-2 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Expiration Date
          </label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            className="p-2 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="cvc"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="CVC"
            maxLength={4}
            className="p-2 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
