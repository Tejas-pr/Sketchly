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
import {
  LogIn,
  LogOut,
  Menu,
  Trash,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
} from "@workspace/ui/components/card";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { LiveCollaboration } from "./live-collaboration";
import { toast } from "@workspace/ui/components/sonner";
import { DropdownmenuProps } from "@/lib/interfaces";

export function Dropdownmenu({ onResetCanvas }: DropdownmenuProps) {
  const router = useRouter();
  const [popupType, setPopupType] = useState<
    "login" | "signup" | "live-collaboration" | null
  >(null);

  const signout = async () => {
    await authClient.signOut();
    router.push("/");
    toast("Successfully Signed out!!");
  };

  const handleClosePopup = () => {
    setPopupType(null);
  }

  return (
    <>
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md 
                       hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 
                       transition-colors duration-200"
          >
            <Menu size={17} className="text-gray-800 dark:text-gray-200" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>
            <div className="flex items-center justify-start gap-2 font-semibold text-gray-800 dark:text-gray-100">
              SKETCHLY
            </div>
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setPopupType("live-collaboration")}>
              <Users />
              Live collaboration
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => {
              onResetCanvas();
            }} className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <Trash className="text-gray-700 dark:text-gray-300" />
              Reset the canvas
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

          <DropdownMenuItem
            onClick={() => setPopupType("login")}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogIn className="text-gray-700 dark:text-gray-300" />
            Login
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setPopupType("signup")}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <UserRoundPlus className="text-gray-700 dark:text-gray-300" />
            Signup
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

          <DropdownMenuItem
            onClick={signout}
            variant="destructive"
          >
            <LogOut className="text-gray-700 dark:text-gray-300" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Popup Overlay + Card */}
      {popupType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Card
            className="relative w-[400px] bg-white dark:bg-[#1c1c1f] 
                       border border-gray-300 dark:border-gray-700 
                       text-gray-900 dark:text-white shadow-lg"
          >
            <X
              onClick={() => setPopupType(null)}
              className="absolute top-3 right-3 w-5 h-5 cursor-pointer 
                         text-gray-500 dark:text-gray-400 
                         hover:text-gray-900 dark:hover:text-white 
                         transition-colors duration-200"
            />

            <CardContent className="pt-1">
              {popupType === "login" && <LoginForm onSuccess={handleClosePopup} />}
              {popupType === "signup" && <SignupForm onSuccess={handleClosePopup} />}
              {popupType === "live-collaboration" && <LiveCollaboration />}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
