"use client";
import { Button } from "@workspace/ui/components/button";
import { authClient } from "@repo/auth/client";

export function SignoutButton() {
  const signout = async () => {
    await authClient.signOut();
    alert("Signed out!");
  };

  return (
    <Button onClick={signout} variant="destructive" size="default">
      Signout
    </Button>
  );
}
