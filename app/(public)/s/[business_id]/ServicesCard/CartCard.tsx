"use client";
import { useRouter } from "next/navigation";
import { Selected } from "./types";
import { Button } from "@/components/ui/button";

export default function CartCard({ selected }: { selected: Selected[] }) {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col border border-stroke rounded-lg p-4 min-h-[400px]">
      <h1 className="text-2xl font-semibold text-gray-800">Cart</h1>
      <div className="mt-4 flex-1">
        {selected.length ? (
          selected.map((item) => (
            <div
              key={item.id}
              className="pt-2 border-b flex items-center justify-between"
            >
              <h2 className="font-semibold text-gray-800">
                {item.name} x{item.quantity}
              </h2>
              <p>
                {item.price * item.quantity}
                <span className="ml-1 text-gray-600">AED</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items in cart</p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Total</h2>
        <p>
          {selected.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          <span className="ml-1 text-gray-600">AED</span>
        </p>
      </div>
      <Button
        disabled={!selected.length}
        className="mt-4"
        onClick={() =>
          router.push(
            `/checkout?items=${encodeURIComponent(JSON.stringify(selected))}`
          )
        }
      >
        Checkout
      </Button>
    </div>
  );
}
