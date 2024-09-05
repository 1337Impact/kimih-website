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
import DiscountCode from "./DiscountCode";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";

export default function CartCard({
  activeStep,
  handlePrevious,
  handleNext,
  selected,
}: {
  activeStep: number;
  handlePrevious: () => void;
  handleNext: () => void;
  selected: Selected[];
}) {
  const discount = useSelector(
    (state: RootState) => state.checkoutSlice.checkoutData?.discount
  );
  const [total, setTotal] = useState<number>(0);
  const [discountedValue, setDiscountedValue] = useState<number>(0);

  useEffect(() => {
    setTotal(
      selected.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [selected, setTotal]);

  useEffect(() => {
    if (discount) {
      setDiscountedValue(total - (total * (discount.value / 100)));
    } else {
      setDiscountedValue(total);
    }
  }, [discount, total]);

  return (
    <div className="w-full flex flex-col border border-stroke rounded-lg p-4 h-[calc(100vh-250px)]">
      <h1 className="text-2xl font-semibold text-gray-800">Cart</h1>
      <div className="mt-4 flex-1">
        {selected.length ? (
          selected.map((item) => (
            <div
              key={item.id}
              className="pt-2 border-b flex items-center justify-between"
            >
              <h2 className="font-semibold text-gray-800">{item.name}</h2>
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
      {activeStep == 3 && (
        <>
          <DiscountCode />
          {!!discount.value && (
            <>
            <div className="mt-4 flex items-center justify-between">
              <h2 className=" text-gray-800">Price</h2>
              <p className="text-gray-600">{total} AED</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h2 className=" text-gray-800">Discount ({discount.value}%)</h2>
              <p className="text-green-600">{total * (discount.value / 100)} AED</p>
            </div>
            </>
          )}
        </>
      )}
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Total</h2>
        <p>
          {discountedValue.toFixed(2)}
          <span className="ml-1 text-gray-600">AED</span>
        </p>
      </div>

      <div className="w-full flex gap-2 mt-2">
        {activeStep > 0 && (
          <Button className="w-1/2" onClick={handlePrevious} variant="outline">
            Back
          </Button>
        )}
        <Button
          className="w-full"
          disabled={!selected.length}
          onClick={handleNext}
        >
          {activeStep < 3 ? "Continue" : "Place Order"}
        </Button>
      </div>
    </div>
  );
}

export function MobileCartCard({
  activeStep,
  handlePrevious,
  handleNext,
  selected,
}: {
  activeStep: number;
  handlePrevious: () => void;
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
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
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
        <div className="flex gap-2">
          {activeStep > 0 && (
            <Button onClick={handlePrevious} variant="outline">
              Back
            </Button>
          )}
          <Button disabled={!selected.length} onClick={handleNext}>
            {activeStep < 3 ? "Continue" : "Place Order"}
          </Button>
        </div>
      </div>
    </>
  );
}
