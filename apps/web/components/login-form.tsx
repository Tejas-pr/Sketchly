"use client";

import { Info, Shapes, Github } from "lucide-react";
import { authClient } from "@repo/auth/client";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";
import { LoginFormProps, SignIn } from "@/lib/interfaces";
import { toast } from "@workspace/ui/components/sonner";
import { useRouter } from "next/navigation";

export function LoginForm({
  onSuccess,
  className,
  ...props
}: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SignIn>({
    email: "",
    password: "",
  });

  const login_with_google = async () => {
    try {
      const response = await authClient.signIn.social({
        provider: "google",
      });
      if (!response.error) {
        onSuccess?.();
        toast.success("Signed in successfully with Google!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  const login_with_github = async () => {
    try {
      const response = await authClient.signIn.social({
        provider: "github",
      });
      if (!response.error) {
        onSuccess?.();
        toast.success("Signed in successfully with GitHub!");
      }
    } catch (e) {
      console.error(e);
      toast.error("GitHub sign-in failed. Please try again.");
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });
      if (!response.error) {
        onSuccess?.();
        toast.success("Logged in successfully! 🎉");
      }
    } catch (e) {
      console.error(e);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto transition-colors",
        "bg-white text-gray-900 border-gray-200",
        "dark:bg-[#1c1c1f] dark:text-gray-100 dark:border-gray-700",
        className
      )}
      {...props}
    >
      <form onSubmit={login} className="flex flex-col gap-6">
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                <Shapes className="size-6 text-primary" />
              </div>
              <span className="text-xl font-semibold">sketchly.</span>
            </a>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back to sketchly
            </h1>
            <FieldDescription className="text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-primary hover:underline transition-colors"
              >
                Sign up
              </a>
            </FieldDescription>
          </div>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="sketchlylove@love.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Field>

          {/* Submit */}
          <Field className="mb-2">
            <Button type="submit" className="w-full hover:cursor-pointer">
              Log in
            </Button>
          </Field>

          <FieldSeparator>Or</FieldSeparator>

          {/* Social Logins */}
          <Field className="grid gap-4 sm:grid-cols-2 mt-2">
            <Button
              onClick={login_with_github}
              variant="outline"
              type="button"
              className="flex items-center gap-2 w-full hover:cursor-pointer"
            >
              <Github className="w-5 h-5" />
              Github
            </Button>

            <Button
              onClick={login_with_google}
              variant="outline"
              type="button"
              className="flex items-center gap-2 w-full hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Google
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center text-xs text-muted-foreground mt-4 pt-6">
        By loggin in, you agree to our{" "}
        <a href="/policy" className="underline hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/policy" className="underline hover:text-primary">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
