"use server";
import { TeamMember } from "@/app/(public)/s/[business_id]/checkout/SelectProfessional";
import { Selected } from "@/app/(public)/s/[business_id]/ServicesCard/types";
import { createClient } from "@/utils/supabase/server";

export default async function ACreateAppointment({
  business_id,
  services_memberships,
  team_member,
  time,
}: {
  business_id: string;
  services_memberships: Selected[];
  time: Date;
  team_member: TeamMember;
}) {
  const paymentAmount = services_memberships.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const supabase = createClient();
  console.log("appointment data: ", {
    paymentAmount,
    services: services_memberships,
    professional: team_member,
    time: time,
  });
  // tmp code
  const payment = await supabase
    .from("payments")
    .insert({
      amount: paymentAmount,
      business_id: business_id,
    })
    .select("id")
    .single();

  if (payment.error) {
    console.error("error inserting payment", payment.error);
    return { data: null, error: payment.error.message };
  }

  const services = services_memberships.filter(
    (service) => service.type === "service"
  );
  const memberships = services_memberships.filter(
    (service) => service.type === "membership"
  );

  if (services.length) {
    const { data, error } = await supabase.from("appointments").insert(
      services.map((service) => ({
        services_id: service.id,
        team_member_id: team_member.id,
        scheduled_date: time.toISOString(),
        business_id: business_id,
        payment_id: payment.data.id,
      }))
    );
    if (error) {
      console.error("error inserting services", error);
      return { data: null, error: error.message };
    }
  }

  if (memberships.length) {
    const { data, error } = await supabase.from("memberships").insert(
      memberships.map((membership) => ({
        memberships_catalog_id: membership.id,
        business_id: business_id,
        payment_id: payment.data.id,
      }))
    );
    if (error) {
      console.error("error inserting memberships", error);
      return { data: null, error: error.message };
    }
  }

  return { data: { payment_id: payment.data.id }, error: null };
}
