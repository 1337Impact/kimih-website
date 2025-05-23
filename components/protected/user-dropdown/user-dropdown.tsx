import { LogOut, LucideClipboardList, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { UserData } from "@/lib/getUserData";
import Link from "next/link";
import { MdCardMembership } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import LanguageSwitcher from "./language-switcher";

export default function UserDropdownMenu({ userData }: { userData: UserData }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/customer");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-12 h-12 cursor-pointer">
          <AvatarImage src={userData?.avatar_url!} alt="@shadcn" />
          <AvatarFallback className="font-bold text-violet-400">
            {`${userData?.first_name![0]}${
              userData?.last_name![0]
            }`.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 z-[999]">
        <DropdownMenuLabel>
          {userData?.first_name} {userData?.last_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="flex items-center" href="/profile">
              <FiUser className="mr-2 h-6 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center" href="/appointments">
              <LucideClipboardList className="mr-2 h-6 w-4" />
              <span>Appointmentes</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center" href="/memberships">
              <MdCardMembership className="mr-2 h-6 w-4" />
              <span>Memberships</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center" href="/settings">
              <Settings className="mr-2 h-6 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LanguageSwitcher />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-semibold text-red-500 hover:!text-red-600">
          <LogOut className="mr-2 h-6 w-4" />
          <button onClick={handleSignOut}>Log out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
