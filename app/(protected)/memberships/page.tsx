import { createClient } from "@/utils/supabase/server";
import ListMemberships from "./ListMemberships";
import { Membership } from "../components/MembershipCard";

const getUserData = async () => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData || !userData.user) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();
  return data;
};

const getMembershipsData = async (): Promise<Membership[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("memberships")
    .select(
      "id, ref, created_at, status, memberships_catalog(membership_name, price, valid_for_days), payments(amount), business(id, name, currency)"
    )
    .order("created_at", { ascending: false });
  if (error || !data) return [] as Membership[];
  return data.map((appointment) => {
    return {
      id: appointment.id,
      ref: appointment.ref,
      created_at: appointment.created_at,
      membership_name: appointment.memberships_catalog?.membership_name,
      membership_price: appointment.memberships_catalog?.price,
      membership_validity: appointment.memberships_catalog?.valid_for_days,
      payment_amount: appointment.payments?.amount,
      business_id: appointment.business?.id,
      business_name: appointment.business?.name,
      currency: appointment.business?.currency || "",
      status: appointment.status,
    };
  });
};

export default async function Page() {
  const userData = await getUserData();
  const membershipsData = await getMembershipsData();
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-7 gap-6">
      <div className="col-span-7">
        <ListMemberships memberships={membershipsData} />
      </div>
    </div>
  );
}
