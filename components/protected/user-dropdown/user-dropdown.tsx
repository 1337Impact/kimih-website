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
import { MdCardMembership } from "react-icons/md";
import { useUser } from "@/app/context/UserContext";

export default function UserDropdownMenu() {
  const { userData } = useUser();
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
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>{userData?.first_name} {userData?.last_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LucideClipboardList className="mr-2 h-6 w-4" />
            <span>Appointmentes</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MdCardMembership className="mr-2 h-6 w-4" />
            <span>Memberships</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-6 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-semibold text-red-500 hover:!text-red-600">
          <LogOut className="mr-2 h-6 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
