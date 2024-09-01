"use client";
import { useRouter } from "next/navigation";
import { Selected } from "./types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

export function MobileCartCard({
  business_id,
  selected,
}: {
  business_id: string;
  selected: Selected[];
}) {
  const router = useRouter();

  return (
    <Drawer>
      <DrawerTrigger className="rounded-full bg-black opacity-95 text-white p-3 shadow-md fixed z-[999] bottom-24 right-[38.7px] hover-scale">
        <MdOutlineLocalGroceryStore size={28} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <h1 className="text-2xl font-semibold text-gray-800">Cart</h1>
          </DrawerTitle>
        </DrawerHeader>
        <div className="w-full h-full flex flex-col p-4 min-h-[400px]">
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
              {selected.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
              <span className="ml-1 text-gray-600">AED</span>
            </p>
          </div>
        </div>
        <DrawerFooter>
          <Button
            disabled={!selected.length}
            className="mt-4"
            onClick={() => router.push(`/s/${business_id}/checkout`)}
          >
            Continue
          </Button>
          <DrawerClose className="w-full border border-stroke bg-gray-100 hover:bg-gray-200 rounded-md p-2">
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function CartCard({
  business_id,
  selected,
}: {
  business_id: string;
  selected: Selected[];
}) {
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
        onClick={() => router.push(`/s/${business_id}/checkout`)}
      >
        Checkout
      </Button>
    </div>
  );
}
