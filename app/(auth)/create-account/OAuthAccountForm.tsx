"use client";
import { useEffect, useState } from "react";
import createAccountSchema, { OAuthCreateAccount } from "@/utils/zod/create-account-schema";
import PhoneNumberInput from "@/components/phone-number-input";
import Link from "next/link";
import ACreateAccount, { AUpdateAccount } from "@/actions/create-account";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";

export default function OAuthAccountForm() {
  const router = useRouter();
  const supabase = createClient();

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email:  "",
    phone: "",
    terms: false,
  });

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    terms: "",
    post_error: "",
  });

  useEffect(() => {
      const getUser = async () => {
        const { data: userData, error } = await supabase.auth.getUser();
        setData((prev) => ({
          ...prev,
          email: userData.user?.user_metadata.email,
          first_name: userData.user?.user_metadata.full_name,
          last_name: userData.user?.user_metadata.name,
        }));
        console.log("User data: ", userData);
        if (error) console.error("Error fetching user:", error);
      };
      getUser();
  }, [supabase]);
  const handleChange = (e: any) => {
    if (e.target.id === "terms") {
      setData({ ...data, terms: !data.terms });
      return;
    }
    if (e.target.id === "email") {
      setData({ ...data, email: e.target.value.toLocaleLowerCase() });
      return;
    }
    setData({ ...data, [e.target.id]: e.target.value });
  };

  async function handleSubmit() {
    console.log(data);
    setError({
      first_name: "",
      last_name: "",
      phone: "",
      terms: "",
      post_error: "",
    });
    const result = OAuthCreateAccount.safeParse(data);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        setError((prev) => ({ ...prev, [err.path[0]]: err.message }));
      });
      return;
    }
    const { terms, ...signUpData } = data;
    const { error, data: res } = await AUpdateAccount(signUpData);
    if (error) {
      setError((prev) => ({ ...prev, ["post_error"]: error }));
      return;
    }
    router.push("/profile");
  }

  return (
    <div>
      <div>
        {error.post_error && (
          <p className="flex items-center justify-center my-1 gap-1 text-red-400 text-lg font-medium text-center -mb-[8px]">
            <MdErrorOutline />
            {error.post_error}
          </p>
        )}
        <div className="mt-2 mb-3 w-full">
          <label
            className="block text-gray-600 text-sm font-bold mb-1"
            htmlFor="first_name"
          >
            First Name
          </label>
          <input
            className="border-2 rounded w-full py-1 px-3 text-gray-600 border-gray-500 placeholder-gray-300"
            id="first_name"
            type="text"
            placeholder="First Name"
            value={data.first_name}
            onChange={handleChange}
          />
          {error.first_name && (
            <p className="text-red-400 font-medium text-xs -mb-[8px]">
              {error.first_name}
            </p>
          )}
        </div>
        <div className="mb-3 w-full">
          <label
            className="block text-gray-600 text-sm font-bold mb-1"
            htmlFor="last_name"
          >
            Last Name
          </label>
          <input
            className="border-2 rounded w-full py-1 px-3 text-gray-600 border-gray-500 placeholder-gray-300"
            id="last_name"
            type="text"
            placeholder="Last Name"
            value={data.last_name}
            onChange={handleChange}
          />
          {error.last_name && (
            <p className="text-red-400 font-medium text-xs -mb-[8px]">
              {error.last_name}
            </p>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label
          className="block text-gray-600 text-sm font-bold mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="border-2 rounded w-full py-1 px-3 text-gray-500 bg-gray-100 hover:cursor-not-allowed border-gray-500 placeholder-gray-300"
          id="email"
          type="email"
          required={false}
          placeholder="Email"
          disabled
          value={data.email}
        />
      </div>
      <div className="mb-3">
        <label
          className="block text-gray-600 text-sm font-bold mb-1"
          htmlFor="phone"
        >
          Phone
        </label>
        <PhoneNumberInput value={data.phone} handleChange={handleChange} />
        {error.phone && (
          <p className="text-red-400 font-medium text-xs -mb-[8px]">
            {error.phone}
          </p>
        )}
      </div>
      <div className="flex">
        <input
          className="mr-1"
          id="terms"
          type="checkbox"
          onChange={handleChange}
        />
        <p className="text-gray-600 text-sm">
          Accept{" "}
          <Link
            href="/privacy-policy"
            className="px-1 inline text-themeBlue underline transition-all duration-300 ease-in-out hover:text-violet-600"
          >
            Privacy Policy
          </Link>
          And
          <Link
            href="/terms-and-conditions"
            className="px-1 inline text-themeBlue underline transition-all duration-300 ease-in-out hover:text-violet-600"
          >
            Terms & Conditions
          </Link>
          .
        </p>
      </div>
      {error.terms && (
        <p className="text-red-400 font-medium text-xs -mb-[8px]">
          {error.terms}
        </p>
      )}
      <button
        className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Create
      </button>
    </div>
  );
}
