"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/store";
import { setCheckoutData, setDiscount } from "@/store/checkoutSlice";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const applyDiscountCode = async (
  business_id: string,
  discount_code: string
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_discounts")
    .select("id, discount_value")
    .eq("business_id", business_id)
    .eq("discount_code", discount_code)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

export default function DiscountCode() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const business_id = useSelector(
    (state: RootState) => state.checkoutSlice.checkoutData?.business_id
  );
  const discount = useSelector(
    (state: RootState) => state.checkoutSlice.checkoutData?.discount
  );
  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmission = async () => {
    const discount = await applyDiscountCode(business_id, value);
    if (discount) {
      dispatch(
        setDiscount({
          id: discount.id,
          value: discount.discount_value,
        })
      );
      toast({
        variant: "success",
        title: "Discount applied",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid discount code",
      });
      setValue("");
    }
  };

  const handleReset = () => {
    dispatch(setDiscount({ id: "", value: 0 }));
    setValue("");
  };

  return (
    <div className="w-full flex border border-black rounded-lg">
      <input
        className="w-full border border-black rounded-lg rounded-r-none px-2"
        value={value}
        onChange={handleChange}
        placeholder="Enter discount code"
      />
      {discount?.value ? (
        <Button onClick={handleReset} className="rounded-l-none">
          Reset
        </Button>
      ) : (
        <Button onClick={handleSubmission} className="rounded-l-none">
          Apply
        </Button>
      )}
    </div>
  );
}
