import { createClient } from "@/utils/supabase/client";
import { Selected } from "../../ServicesCard/types";
import { FaStar, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import DiscountCode from "./DiscountCode";
import ShowDate from "./ShowDate";

const getBusinessData = async (business_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("business")
    .select("name, address, images")
    .eq("id", business_id)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

export default function Confirmation({
  selected,
  business_id,
  selectedTime,
  handlePrevious,
}: {
  business_id: string;
  selected: Selected[];
  selectedTime: Date | null;
  handlePrevious: () => void;
}) {
  const totalDuration = selected.reduce((sum, item) => {
    return sum + (item.duration || 0);
  }, 0);

  const checkoutData = useSelector(
    (state: RootState) => state.checkoutSlice.checkoutData
  );
  const isMembershipOnly = useSelector(
    (state: RootState) => state.checkoutSlice.checkoutData?.isMembershipOnly
  );
  const [businessData, setBusinessData] = useState<any | null>(null);

  useEffect(() => {
    getBusinessData(business_id).then((data) => setBusinessData(data));
  }, [business_id]);

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
      setDiscountedValue(total - total * (discount.value / 100));
    } else {
      setDiscountedValue(total);
    }
  }, [discount, total]);

  if (!businessData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mt-6 bg-white p-6 rounded-lg shadow-md max-w-[700px] mx-auto">
      <div className="flex items-center space-x-4">
        <img
          src={businessData.images.length ? businessData.images[0] : ""}
          alt="Business"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <h2 className="text-lg font-bold">{businessData.name}</h2>
          <p className="text-sm text-gray-500">{businessData.address}</p>
        </div>
      </div>
      {!isMembershipOnly && (
        <ShowDate selectedTime={selectedTime} totalDuration={totalDuration} />
      )}

      <div className="mt-6 space-y-4">
        {selected.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>
              {!isMembershipOnly && (
                <p className="text-sm text-gray-500">
                  {Math.floor(item.duration! / 60)} hr, {item.duration! % 60}{" "}
                  min with {checkoutData.professional?.name}
                </p>
              )}
            </div>
            <p className="font-semibold">{item.price * item.quantity} AED</p>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <DiscountCode />
        {!!discount.value && (
          <>
            <div className="mt-4 flex items-center justify-between">
              <h2 className=" text-gray-800">Price</h2>
              <p className="text-gray-600">{total} AED</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h2 className=" text-gray-800">Discount ({discount.value}%)</h2>
              <p className="text-green-600">
                {(total * (discount.value / 100)).toFixed(2)} AED
              </p>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Total</h2>
        <p>
          {discountedValue.toFixed(2)}
          <span className="ml-1 text-gray-600">AED</span>
        </p>
      </div>
      <div className="flex items-center gap-6 mt-4">
        <Button onClick={handlePrevious} className="w-1/3" variant={"outline"}>
          back
        </Button>
        <Button className="w-2/3 bg-green-500 hover:bg-green-700 text-white py-2 rounded-lg">
          Pay now
        </Button>
      </div>
    </div>
  );
}
