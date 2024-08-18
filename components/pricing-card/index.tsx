import Link from "next/link";
import styles from "./styles.module.css";
import { FaCheck } from "react-icons/fa";

export default function PricingCard() {
  return (
    <div className={`${styles.card} bg-white p-6 rounded-lg shadow-lg`}>
      <h1 className="text-3xl font-semibold">Popular</h1>
      <p className="mt-4 text-xl text-gray-500">What You&apos;ll Get</p>
      <ul className="mt-6 pb-4 border-b border-dashed border-gray-400 space-y-2">
        <li className="flex items-center">
          <FaCheck className="h-4 w-4 text-gray-700 mr-2" />
          No subscription fees
        </li>
        <li className="flex items-center">
          <FaCheck className="h-4 w-4 text-gray-700 mr-2" />
          Only 2.5% on each successful booking
        </li>
        <li className="flex items-center">
          <FaCheck className="h-4 w-4 text-gray-700 mr-2" />
          You only pay when you profit
        </li>
        <li className="flex items-center">
          <FaCheck className="h-4 w-4 text-gray-700 mr-2" />
          Fully optimized platform
        </li>
        <li className="flex items-center">
          <FaCheck className="h-4 w-4 text-gray-700 mr-2" />
          Perfect for businesses of all sizes
        </li>
      </ul>
      <div className="mt-10 flex items-center text-lg">
        <h2 className="text-2xl">$0</h2>/<span className="text-lg">month</span>
      </div>
      <Link href="/business/signup">
        <button className={`${styles.cardButton}`}>Select</button>
      </Link>
    </div>
  );
}
