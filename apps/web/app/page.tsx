import { SignoutButton } from "@/components/signout";

export default async function Page() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Logout button at top-right */}
      <div className="absolute top-4 right-4">
        <SignoutButton />
      </div>

      {/* Centered title */}
      <h1 className="text-9xl font-extrabold text-center">SKETCHLY</h1>
    </div>
  );
}
