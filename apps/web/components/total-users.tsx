"use client";

import { useEffect, useState } from "react";
import { User, Globe } from "lucide-react";
import { CountingNumber } from "@workspace/ui/components/ui/shadcn-io/counting-number";
import { getVisit, totalUsers } from "@/app/actions/actions";

export function TotalUsers() {
  const [userCount, setUserCount] = useState<number>(0);
  const [visite, setVisite] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await totalUsers();
      const visite = await getVisit();
      setUserCount(count);
      setVisite(visite);
    };
    fetchCount();
  }, []);

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/30 p-2 shadow-sm w-fit">
      {/* Visitors */}
      <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-background/80 hover:bg-accent/40 transition-colors">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        <p className="text-xs text-muted-foreground">Visitors:</p>
        <CountingNumber
          number={visite}
          inView={true}
          transition={{ stiffness: 100, damping: 30 }}
          className="text-sm font-semibold text-primary"
        />
      </div>

      {/* AI Users */}
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-background/80 hover:bg-accent/40 transition-colors">
        <User className="w-4 h-4 text-muted-foreground" />
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        <p className="text-xs text-muted-foreground">AI Users:</p>
        <CountingNumber
          number={userCount}
          inView={true}
          transition={{ stiffness: 100, damping: 30 }}
          className="text-sm font-semibold text-primary"
        />
      </div>
    </div>
  );
}
