"use server";

import Canvas from "@/components/Canvas";
import { MyPageProps } from "@/lib/types";

export default async function CanvasPage({ params }: MyPageProps) {
  const resolvedParams = await params;
  const roomId = resolvedParams.roomId;

  return <Canvas roomId={roomId} />;
}
