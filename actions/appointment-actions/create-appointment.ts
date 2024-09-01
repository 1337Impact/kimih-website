import { TeamMember } from "@/app/(public)/s/[business_id]/checkout/SelectProfessional";
import { Selected } from "@/app/(public)/s/[business_id]/ServicesCard/types";

export default async function ACreateAppointment({
  services_memberships,
  team_member,
  time,
}: {
  services_memberships: Selected[];
  team_member: TeamMember;
  time: Date;
}) {
  console.log("appointment data: ", {
    services: services_memberships,
    professional: team_member,
    time: time,
  });
  return null;
}
