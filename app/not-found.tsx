import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-gray-800">Not Found</h2>
      <Image
        src="/assets/images/404-not-found.svg"
        alt="404"
        width={600}
        height={600}
      />
      <Link className="text-gray-400 hover:text-blue-600 hover:underline" href="/">Return Home</Link>
    </div>
  );
}
