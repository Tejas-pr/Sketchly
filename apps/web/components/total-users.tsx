"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { CountingNumber } from "@workspace/ui/components/ui/shadcn-io/counting-number";
import { totalUsers } from "@/app/actions/actions";

export function TotalUsers() {
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await totalUsers();
      setUserCount(count);
    };
    fetchCount();
  }, []);

  return (
    <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-2 bg-background text-foreground shadow-sm">
      <User className="w-5 h-5 text-muted-foreground" />
      <div className="h-2 w-2 rounded-full bg-green-500" />
      <p className="text-sm font-medium">Total AI users:</p>
      <CountingNumber
        number={userCount}
        inView={true}
        transition={{ stiffness: 100, damping: 30 }}
        className="text-lg font-semibold text-primary"
      />
    </div>
  );
}
