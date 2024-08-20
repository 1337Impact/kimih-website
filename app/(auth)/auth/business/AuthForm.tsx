"use client";
import Image from "next/image";
import AuthWithEmail from "./AuthWithEmail";
import { createClient } from "@/utils/supabase/client";

const loginWithFacebook = async () => {
  const supabase = createClient();
  const data = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/create-account`,
    },
  });
  console.log("Login with facebook");
};

const loginWithGoogle = async () => {
  const supabase = createClient();
  const data = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/create-account`,
    },
  });
  console.log("Login with google: ", data);
};

export default function AuthForm() {
  return (
    <div className="mt-10">
      <AuthWithEmail />
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
