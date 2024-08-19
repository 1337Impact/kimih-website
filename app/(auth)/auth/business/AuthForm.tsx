"use client";
import Image from "next/image";
import { useState } from "react";

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const loginWithFacebook = () => {
  console.log("Login with facebook");
};

const loginWithGoogle = () => {
  console.log("Login with google");
};

export default function AuthForm() {
  const [error, setError] = useState(false);
  const handleFormSubmit = (e: any) => {
    const email = e.target.email.value;
    setError(false);
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(true);
      return;
    }
    e.target.reset();
    console.log(e.target.email.value);
  };
  return (
    <div className="mt-10">
      <form onSubmit={handleFormSubmit} className="">
        <input
          className="w-full rounded-lg p-2 border-2 border-gray-700"
          placeholder="Enter your email"
          name="email"
        />
        {error && (
          <p className="text-red-500 text-sm">Please enter a valid email</p>
        )}
        <button
          type="submit"
          className="mt-3 w-full rounded-lg p-[9px] bg-gray-900 text-white border-2 border-gray-700 hover:bg-gray-800"
        >
          Continue
        </button>
      </form>
      <br />
      <button
        onClick={loginWithFacebook}
        type="button"
        className="relative flex items-center justify-center gap-2 mt-3 w-full font-bold rounded-lg p-3 border-2 border-gray-700 hover:bg-gray-100"
      >
        <Image
          className="w-6 h-6 absolute left-3"
          width={42}
          height={42}
          src="/assets/icons/auth-facebook.svg"
          alt="facebook"
        />
        Continue with Facebook
      </button>
      <button
        onClick={loginWithGoogle}
        type="button"
        className="relative flex items-center justify-center gap-2 mt-3 w-full font-bold rounded-lg p-3 border-2 border-gray-700 hover:bg-gray-100"
      >
        <Image
          className="w-6 h-6 absolute left-3"
          width={42}
          height={42}
          src="/assets/icons/auth-google.svg"
          alt="facebook"
        />
        Continue with Google
      </button>
    </div>
  );
}
