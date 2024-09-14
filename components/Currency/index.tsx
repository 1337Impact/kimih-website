"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Currency(props: { currency?: string }) {
  const currency = useSelector(
    (state: RootState) => state.checkoutSlice.checkoutData?.currency
  );
  return <span>{props.currency || currency}</span>;
}
