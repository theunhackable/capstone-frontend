"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuthStore from "@/store/authStore";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserAvatar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); // Redirect to login after logout
  };
  if (typeof window === "undefined") return null;
  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger suppressHydrationWarning>
        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarFallback>
            {user?.first_name?.charAt(0)}
            {user?.last_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-4 mr-20">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-14 h-14">
            <AvatarFallback>
              {user?.first_name?.charAt(0)}
              {user?.last_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="font-semibold text-lg">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <Button
            variant="destructive"
            className="mt-3 w-full flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
