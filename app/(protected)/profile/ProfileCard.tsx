import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface UserData {
  avatar_url: string | null;
  created_at: string | null;
  email: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
  phone: string | null;
  updated_at: string | null;
}

export default function ProfileCard({ userData }: { userData: UserData }) {
  return (
    <div className="border border-gray-300 rounded-2xl px-4 py-6 shadow-lg">
      <div className="w-full h-full flex flex-col items-center gap-2 md:gap-4">
        <Avatar className="w-32 md:w-40 h-32 md:h-40 cursor-pointer">
          <AvatarImage src={userData?.avatar_url!} alt="@shadcn" />
          <AvatarFallback className="font-bold text-3xl text-violet-400">
            {`${userData?.first_name![0]}${
              userData?.last_name![0]
            }`.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-lg md:text-lg font-semibold text-gray-700">
          {userData.first_name} {userData.last_name}
        </h1>
        <div className="mt-2 md:mt-4 w-full flex flex-col gap-2 max-w-[300px]">
          <div className="w-full border border-stroke rounded-xl bg-gray-100 px-5 py-2 md:py-3">
            <h2 className="text-xs md:text-sm text-gray-500">First name</h2>
            <p className="max-md:text-sm text-gray-700 tracking-wide">{userData.first_name}</p>
          </div>
          <div className="w-full border border-stroke rounded-xl bg-gray-100 px-5 py-2 md:py-3">
            <h2 className="text-xs md:text-sm text-gray-500">Last name</h2>
            <p className="max-md:text-sm text-gray-700 tracking-wide">{userData.last_name}</p>
          </div>
          <div className="w-full border border-stroke rounded-xl bg-gray-100 px-5 py-2 md:py-3">
            <h2 className="text-xs md:text-sm text-gray-500">Email address</h2>
            <p className="max-md:text-sm text-gray-700 tracking-wide notranslate">{userData.email}</p>
          </div>
          <div className="w-full border border-stroke rounded-xl bg-gray-100 px-5 py-2 md:py-3">
            <h2 className="text-xs md:text-sm text-gray-500">Phone number</h2>
            <p className="max-md:text-sm text-gray-700 tracking-wide">
              +{userData.phone || "N/A"}
            </p>
          </div>
        </div>
        <Link href={"/settings"}>
          <p className="underline text-blue-500 hover:!text-blue-600">
            Edit profile
          </p>
        </Link>
      </div>
    </div>
  );
}
