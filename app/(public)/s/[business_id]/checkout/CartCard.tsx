"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Selected } from "../ServicesCard/types";
import { Button } from "@/components/ui/button";

export default function CartCard({
  handleNext,
  selected,
}: {
  handleNext: () => void;
  selected: Selected[];
}) {

  return (
    <div className="w-full h-full flex flex-col border border-stroke rounded-lg p-4 min-h-[400px] max-h-[calc(100vh-200px)]">
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
      <Button disabled={!selected.length} className="mt-4" onClick={handleNext}>
        Continue
      </Button>
    </div>
  );
}

export function MobileCartCard({
  handleNext,
  selected,
}: {
  handleNext: () => void;
  selected: Selected[];
}) {

  return (
    <>
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
              onClick={handleNext}
            >
              Continue
            </Button>
            <DrawerClose className="w-full border border-stroke bg-gray-100 hover:bg-gray-200 rounded-md p-2">
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="w-full h-20 p-4 flex items-center justify-between fixed z-[999] bottom-0 left-0 bg-white shadow-lg">
        <h1 className="text-lg">
          Total:{" "}
          <span className="text-gray-700 text-[1rem] font-semibold">
            {selected.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}{" "}
            AED
          </span>
        </h1>
        <Button disabled={!selected.length} onClick={handleNext}>
          Continue
        </Button>
      </div>
    </>
  );
}
