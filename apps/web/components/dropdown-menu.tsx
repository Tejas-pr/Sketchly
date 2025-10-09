"use client";

import { useState } from "react";
import { authClient } from "@repo/auth/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { LogIn, LogOut, Menu, Trash, UserRoundPlus, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { LiveCollaboration } from "./live-collaboration";
import { toast } from "@workspace/ui/components/sonner";

export function Dropdownmenu() {
  const router = useRouter();
  const [popupType, setPopupType] = useState<"login" | "signup" | "live-collaboration" | null>(null);

  const signout = async () => {
    await authClient.signOut();
    router.push("/");
    toast("Successfully Signed out!!");
  };

  return (
    <>
      {/* Dropdown Menu */}
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
            </div>
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setPopupType("live-collaboration")}>
              <Users />
              Live collaboration
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash />
              Reset the canvas
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setPopupType("login")}>
            <LogIn />
            Login
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPopupType("signup")}>
            <UserRoundPlus />
            Signup
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={signout}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Center Popup Card */}
      {popupType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]">
          <Card className="relative w-[400px] bg-[#1c1c1f] border border-gray-700 text-white">
            <X
              onClick={() => setPopupType(null)}
              className="absolute top-3 right-3 w-5 h-5 cursor-pointer text-gray-400 hover:text-white"
            />
            <CardContent className="pt-1">
              {popupType === "login" && <LoginForm />}
              {popupType === "signup" && <SignupForm />}
              {popupType === "live-collaboration" && <LiveCollaboration />}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
