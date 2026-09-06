import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  first_name?: string | null;
  last_name?: string | null;
  job_title: string | null | undefined;
  avatar_url: string | null | undefined;
}

function getInitials(firstName?: string | null, lastName?: string | null) {
  const initials = `${firstName?.trim()?.[0] ?? ""}${
    lastName?.trim()?.[0] ?? ""
  }`.toUpperCase();
  return initials || "?";
}

export default function TeamList({
  teamMembers,
}: {
  teamMembers: TeamMember[];
}) {
  return (
    <section className="bg-white w-full">
      <div className="pt-8 px-4 mx-auto text-center lg:pt-8 lg:px-6">
        <div className="mx-auto my-6 max-w-screen">
          <h2 className="mb-2 text-2xl tracking-tight font-extrabold text-gray-900 ">
            Our team
          </h2>
          <div className="mt-6 md:mt-10 grid grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center text-gray-500"
              >
                <Avatar className="w-24 h-24 cursor-pointer">
                  <AvatarImage
                    src={member.avatar_url ?? undefined}
                    alt={`${member.first_name ?? ""} ${member.last_name ?? ""}`.trim()}
                  />
                  <AvatarFallback className="font-bold text-3xl text-violet-400">
                    {getInitials(member.first_name, member.last_name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-2 mb-1 text-lg font-bold tracking-tight text-gray-800 ">
                  {member.first_name} {member.last_name}
                </h3>
                <p>{member.job_title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
