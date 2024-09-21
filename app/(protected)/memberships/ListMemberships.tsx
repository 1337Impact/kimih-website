import formatDate, { addDaysToDate } from "@/utils/formating-utils/format-date";
import Link from "next/link";
import MembershipCard, { Membership } from "../components/MembershipCard";

export default function ListMemberships({
  memberships,
}: {
  memberships: Membership[];
}) {
  return (
    <div>
      <h1 className="text-xl font-semibold pl-1">Memberships:</h1>
      <div className="flex flex-col gap-4 mt-4 ml-2">
        {memberships.length ? (
          memberships.map((membership) => (
            <MembershipCard key={membership.id} membership={membership} />
          ))
        ) : (
          <div className="text-gray-600">No memberships found.</div>
        )}
      </div>
    </div>
  );
}
