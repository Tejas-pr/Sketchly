"use client";
import { initDraw } from "@/app/drawingJS";
import { useSocket } from "@/hooks/useSocker";
import { useEffect, useRef, useState } from "react";
import { CanvasProps } from "@/lib/interfaces";
import { Spinner } from "@workspace/ui/components/ui/shadcn-io/spinner";
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@workspace/ui/components/ui/shadcn-io/dock";
import {
  Square,
  Circle,
  Triangle,
  Diamond,
  ArrowRight,
  Minus,
} from "lucide-react";
import { Dropdownmenu } from "./dropdown-menu";

export default function Canvas({ roomId }: CanvasProps) {
  const myRef = useRef<HTMLCanvasElement>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const { socket, isConnected, isLoading, error } = useSocket(roomId);

  useEffect(() => {
    if (myRef.current) {
      initDraw(myRef.current, roomId);
    }
  }, [roomId]);

  if (roomId && isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#121212] z-50">
        <Spinner variant="bars" size={35} />
      </div>
    );
  }

  const shapes = [
    {
      title: "Rectangle",
      icon: (
        <Square
          className={`h-full w-full ${
            selectedShape === "rectangle"
              ? "text-orange-500"
              : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      id: "rectangle",
    },
    {
      title: "Circle",
      icon: (
        <Circle
          className={`h-full w-full ${
            selectedShape === "circle"
              ? "text-orange-500"
              : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      id: "circle",
    },
    {
      title: "Triangle",
      icon: (
        <Triangle
          className={`h-full w-full ${
            selectedShape === "triangle"
              ? "text-orange-500"
              : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      id: "triangle",
    },
    {
      title: "Diamond",
      icon: (
        <Diamond
          className={`h-full w-full ${
            selectedShape === "diamond"
              ? "text-orange-500"
              : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      id: "diamond",
    },
    {
      title: "Arrow",
      icon: (
        <ArrowRight
          className={`h-full w-full ${
            selectedShape === "arrow"
              ? "text-orange-500"
              : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      id: "arrow",
    },
    {
      title: "Line",
      icon: (
        <Minus
          className={`h-full w-full ${
            selectedShape === "line"
              ? "text-orange-500"
              : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      id: "line",
    },
  ];

  return (
    <>
      <div className='absolute top-5 left-3 max-w-full z-50'>
        <Dropdownmenu />
      </div>
      <div className='absolute bottom-5 left-1/2 max-w-full -translate-x-1/2 z-50'>
        <Dock className='items-end pb-3'>
          {shapes.map((item, idx) => (
            <div key={idx} onClick={() => setSelectedShape(item.id)}>
              <DockItem
                className='aspect-square rounded-full bg-gray-200 dark:bg-[#232329] hover:cursor-pointer'
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            </div>
          ))}
        </Dock>
      </div>

      {/* Canvas */}
      <canvas
        ref={myRef}
        className="fixed top-0 left-0 w-full h-full"
      ></canvas>
    </>
  );
}
