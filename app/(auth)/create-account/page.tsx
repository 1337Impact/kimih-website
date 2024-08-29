import Image from "next/image";
import Link from "next/link";
import CreateAccountForm from "./CreateAccountForm";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="relative w-full flex justify-center min-h-screen">
      <Image
        width={1000}
        height={1000}
        src="/assets/images/auth-business-side-image.jpg"
        alt="logo"
        className="max-lg:hidden object-cover h-screen w-1/2"
      />
      <div className="lg:w-1/2 flex mt-20 mb-20 justify-center">
        <div className="mx-2 sm:w-[380px] sm:mx-auto flex flex-col">
          <div>
            <div
              className="flex justify-center items-center gap-2 mb-4 group"
            >
              <Image
                width={600}
                height={600}
                src="/logo.svg"
                alt="logo"
                className="h-20 w-20"
              />
              <h1 className="text-4xl font-bold text-black w-0 opacity-0 group-hover:opacity-100 group-hover:w-[110px] transform duration-1000 ease-in-out">
                Kimih
              </h1>
            </div>
          </div>
          <h1 className="text-2xl text-gray-900 font-bold text-center mt-5">
            Create account
          </h1>
          <Suspense>
            <CreateAccountForm />
          </Suspense>
        </div>
        <div className="absolute bottom-4 text-center justify-center pt-4 border-t border-[rgba(255,255,255,0.1)] z-10">
          <p className="mb-1 text-sm">
            &copy; 2024 Kimih.com - All rights reserved.
          </p>
          <nav className="footer-nav">
            <Link
              href="/privacy-policy"
              className="text-blue-600 transition-all duration-300 ease-in-out hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-blue-600 transition-all duration-300 ease-in-out hover:underline ml-5"
            >
              Terms & Conditions
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
