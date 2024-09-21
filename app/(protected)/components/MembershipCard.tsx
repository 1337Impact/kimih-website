import Link from "next/link";
import { useEffect, useState } from "react";

export type Membership = {
  id: string;
  ref: string;
  created_at: string;
  membership_name: string | null | undefined;
  membership_price: number | null | undefined;
  membership_validity: number | null | undefined;
  payment_amount: number | null | undefined;
  business_id: string | null | undefined;
  business_name: string | null | undefined;
  currency: string;
  status: string | null | undefined;
};

const MembershipCard = ({ membership }: { membership: Membership }) => {
  // const [status, setStatus] = useState({
  //   status: "Pending",
  //   color: "#808080",
  // });
  // useEffect(() => {
  //   setStatus(getAppointmentStatus(appointment));
  // }, [appointment]);

  return (
    <div
      className="border border-gray-200 p-6 bg-white rounded-xl shadow-md flex flex-col space-y-2 hover-scale-2"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{membership.membership_name}</h3>
        <span className="text-white bg-violet-500 py-2 px-4 rounded-lg">
          {membership.membership_validity} days
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-700">
          Price: {membership.membership_price} {membership.currency}
        </span>
      </div>
      <div className="flex gap-1 justify-start text-sm text-gray-600 ">
        At:
        <Link href={`/s/${membership.business_id}`} className="hover:underline">
          {membership.business_name}
        </Link>
      </div>
    </div>
  );
};

export default MembershipCard;