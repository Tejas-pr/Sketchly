import { authClient } from "@repo/auth/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { LogIn, LogOut, Menu, Shapes, Trash, UserRoundPlus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export function Dropdownmenu() {
  const router = useRouter();
  const authNavigate = (type: string) => {
    if (type === "signup") {
      router.push("/signup");
    }

    if (type === "login") {
      router.push("/login");
    }
  };
  const signout = async () => {
    await authClient.signOut();
    alert("Signed out!");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-[#232329] p-2 rounded-sm hover:cursor-pointer hover:bg-[#37373e]">
          <Menu size={17} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>
          <div className="flex items-center justify-start gap-2">
            SKETCHLY
            {/* <Shapes size={17}/> */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            Live collaboration
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash />
            Reset the canvas
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => authNavigate('login')}>
          <LogIn />
          Login
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => authNavigate('signup')}>
          <UserRoundPlus />
          Signup
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signout} variant="destructive">
            <LogOut />
            Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
