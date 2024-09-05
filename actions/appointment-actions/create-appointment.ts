"use server";
import { TeamMember } from "@/app/(public)/s/[business_id]/checkout/SelectProfessional";
import { Selected } from "@/app/(public)/s/[business_id]/ServicesCard/types";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { sendAppointmentEmail } from "./send-email";

export default async function ACreateAppointment({
  business_id,
  services_memberships,
  team_member,
  time,
  discount,
}: {
  business_id: string;
  services_memberships: Selected[];
  time: Date;
  team_member: TeamMember;
  discount: {
    id: string;
    value: number;
  };
}) {
  const supabase = createClient();
  const {data : {user : clientData}} = await supabase.auth.getUser();

  const paymentAmount = services_memberships.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // tmp code
  const payment = await supabase
    .from("payments")
    .insert({
      amount: paymentAmount * (1 - discount.value / 100),
      business_id: business_id,
      discount_id: discount.id || null,
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
        scheduled_date: format(time, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
        business_id: business_id,
        payment_id: payment.data.id,
        price_paid: discount.value
          ? service.price - (service.price * discount.value) / 100
          : service.price,
      }))
    );
    if (error) {
      console.error("error inserting services", error);
      return { data: null, error: error.message };
    }
    for (const service of services) {
      sendAppointmentEmail({
        workerEmail: "mbenkhat@student.1337.ma",
        appointmentDate: time.toDateString(),
        serviceName: service.name,
        clientName: clientData?.user_metadata.full_name || "client name",
      });
    }
  }

  if (memberships.length) {
    const { data, error } = await supabase.from("memberships").insert(
      memberships.map((membership) => ({
        memberships_catalog_id: membership.id,
        business_id: business_id,
        payment_id: payment.data.id,
        price_paid: discount.value
          ? membership.price - (membership.price * discount.value) / 100
          : membership.price,
      }))
    );
    if (error) {
      console.error("error inserting memberships", error);
      return { data: null, error: error.message };
    }
  }

  return { data: { payment_id: payment.data.id }, error: null };
}
