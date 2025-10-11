import { SignupForm } from "@/components/signup-form";
import { FlickeringGrid } from "@workspace/ui/components/ui/shadcn-io/flickering-grid";

export default function SignupPage() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background */}
      <FlickeringGrid
        className="absolute inset-0"
        squareSize={5}
        gridGap={6}
        flickerChance={0.4}
        color="rgb(100, 100, 100)"
        maxOpacity={0.2}
      />

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-lg dark:bg-[#1c1c1f] dark:text-gray-100 dark:border-gray-700">
        <SignupForm />
      </div>
    </div>
  );
}
