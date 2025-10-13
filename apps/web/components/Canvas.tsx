"use client";
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
import { ModeToggle } from "./theme-toggle";
import { ProfileMenu } from "./profile-menu";
import { useLoader } from "@/providers/loader-provider";
import { Draw } from "@/app/drawingJS/Draw";
import { useTheme } from "next-themes";
import { ShapeOption, Tools } from "@/lib/types";

export default function Canvas({ roomId }: CanvasProps) {
  const myRef = useRef<HTMLCanvasElement>(null);
  const [selectedShape, setSelectedShape] = useState<Tools>(null);
  const { loading } = useLoader();
  const { socket, isConnected, error } = useSocket(roomId);
  const [drawing, setDrawing] = useState<Draw>();
  const { theme, systemTheme } = useTheme();
  const activeTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    drawing?.setTool(selectedShape);
    drawing?.setTheme(activeTheme);
  }, [selectedShape, drawing, activeTheme]);

  useEffect(() => {
    if (myRef.current) {
      // initDraw(myRef.current, roomId, selectedShape);
      const g = new Draw(myRef.current);
      setDrawing(g);
      g.initMouseHandler();
      return () => {
          g.destroy();
      }
    }
  }, [roomId]);

  if (roomId && loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#121212] z-50">
        <Spinner variant="bars" size={35} />
      </div>
    );
  }

  const shapes: ShapeOption[] = [
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

  const handleResetCanvas = () => {
    drawing?.clear();
  };

  return (
    <>
      <div className='absolute top-5 left-3 max-w-full z-50'>
          <Dropdownmenu onResetCanvas={handleResetCanvas} />
      </div>
      <div className='absolute top-5 right-3 max-w-full z-50'>
          <div className="flex items-center justify-center gap-5">
            <ProfileMenu />
            <ModeToggle />
          </div>
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
