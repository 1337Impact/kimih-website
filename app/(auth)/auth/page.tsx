import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";

export default function Page() {
  return (
    <main className="w-full flex items-center justify-center min-h-[80vh]">
      {/* <div className=""></div> */}
      <div className="w-[400px] flex flex-col">
        <div>
          <Link href={"/"} className="flex justify-center items-center gap-2 mb-4 group">
            <Image
              width={600}
              height={600}
              src="/logo.svg"
              alt="logo"
              className="h-20 w-20"
            />
            <h1 className="text-4xl font-bold text-black w-0 opacity-0 group-hover:opacity-100 group-hover:w-[110px] transform duration-700 ease-in-out">
              Kimih
            </h1>
          </Link>
        </div>
        <h1 className="text-2xl text-gray-900 font-bold text-center mt-5">
          Sign up/log in
        </h1>
        <Link href={"/auth/customer"}>
          <div className="w-full group mt-5 flex justify-between border-2 border-slate-500 rounded-lg p-5 hover:bg-gray-100">
            <div className="">
              <h1 className="text-lg font-semibold">For everyone</h1>
              <h2 className="text-gray-600">
                Sign up for free and start using our app
              </h2>
            </div>
            <MdOutlineArrowForwardIos className="text-xl mt-2 transform group-hover:translate-x-2 ease-in-out duration-200" />
          </div>
        </Link>
        <Link href={"/auth/business"}>
          <div className="w-full group mt-3 flex justify-between border-2 border-slate-500 rounded-lg p-5 hover:bg-gray-100">
            <div className="">
              <h1 className="text-lg font-semibold">For business</h1>
              <h2 className="text-gray-600">Grow your business with our app</h2>
            </div>
            <MdOutlineArrowForwardIos className="text-xl mt-2 transform group-hover:translate-x-2 ease-in-out duration-200" />
          </div>
        </Link>
      </div>
    </main>
  );
}
