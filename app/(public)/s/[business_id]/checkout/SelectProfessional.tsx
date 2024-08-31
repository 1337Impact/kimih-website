"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";

export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  job_title: string | null | undefined;
  avatar_url: string | null | undefined;
}

const getTeamData = async (business_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("id, first_name, last_name, avatar_url, job_title")
    .eq("business_id", business_id);
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

const SelectProfessional = ({
  setSelectedProfessional,
  business_id,
}: {
  setSelectedProfessional: (professional: TeamMember) => void;
  business_id: string;
}) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selected, setSelected] = useState<string | null>();

  useEffect(() => {
    getTeamData(business_id).then((data) => {
      if (data) {
        setTeamMembers(data);
      }
    });
  }, []);

  const handleSelectProfessional = (professional: TeamMember) => {
    setSelectedProfessional(professional);
    setSelected(professional.id);
  };

  return (
    <div className="flex gap-4">
      <div className="mt-6 grid grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div
            onClick={() => handleSelectProfessional(member)}
            key={index}
            className={`${
              selected === member.id ? "bg-violet-100" : ""
            } flex flex-col items-center hover:bg-violet-50 border border-stroke shadow-md p-2 rounded-2xl text-center text-gray-500 max-w-[170px] cursor-pointer`}
          >
            <Avatar className="w-20 h-20 md:w-24 md:h-24 cursor-pointer">
              <AvatarImage src={member?.avatar_url!} alt={member.first_name} />
              <AvatarFallback className="font-bold text-2xl text-violet-400">
                {`${member?.first_name![0]}${
                  member?.last_name![0]
                }`.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="mt-3 mb-1 text-xs md:text-sm font-bold tracking-tight text-gray-800 ">
              {member.first_name} {member.last_name}
            </h3>
            <p className="max-md:text-xs">{member.job_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectProfessional;
