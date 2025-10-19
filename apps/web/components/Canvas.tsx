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
  Pencil,
  MousePointer2,
  Eraser,
  TypeOutline,
} from "lucide-react";
import { Dropdownmenu } from "./dropdown-menu";
import { ModeToggle } from "./theme-toggle";
import { ProfileMenu } from "./profile-menu";
import { useLoader } from "@/providers/loader-provider";
import { Draw } from "@/app/drawingJS/Draw";
import { useTheme } from "next-themes";
import { Shape, ShapeOption, Tools } from "@/lib/types";
import Zoom from "./zoom";
import DrawingEditors from "./drawing-editor";
import { SocialMedia } from "./social-media";
import { TotalUsers } from "./total-users";
import { AI } from "./ai";
import { getShapes, setShapes } from "@/lib/localStorage/localStorage";

export default function Canvas({ roomId }: CanvasProps) {
  const myRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedShape, setSelectedShape] = useState<Tools>("mousepointer");
  const { loading } = useLoader();
  const { socket, isConnected, error } = useSocket(roomId);
  const [drawing, setDrawing] = useState<Draw>();
  const { theme, systemTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState<string>("dark");

  // Editors
  const [strokeColor, setStrokeColor] = useState<string>("#FFFFFF");
  const [strokeWidth, setStrokeWidth] = useState<number>(1);
  const [selectedFillStyle, setSelectedFillStyle] = useState<string>("solid");
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && myRef.current) {
      const g = new Draw(myRef.current);
      setDrawing(g);
      g.initMouseHandler();

      const saved = getShapes();
      if (saved) {
        saved.forEach((shape) => g.addShape(shape));
      }
      return () => g.destroy();
    }
  }, [roomId, mounted]);

  useEffect(() => {
    if (drawing && mounted) {
      drawing.setTool(selectedShape);
      drawing.setEditorValues({
        strokeColor,
        strokeWidth,
        selectedFillStyle,
        backgroundColor,
      });

      const themeToUse = theme === "system" ? systemTheme : theme;
      if (themeToUse) {
        setActiveTheme(themeToUse);
        drawing.setTheme(themeToUse);
      }
    }
  }, [
    selectedShape,
    drawing,
    theme,
    systemTheme,
    mounted,
    strokeColor,
    strokeWidth,
    selectedFillStyle,
    backgroundColor,
  ]);

  if (!mounted || (roomId && loading)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#121212] z-50">
        <Spinner variant="bars" size={25} />
      </div>
    );
  }

  const shapes: ShapeOption[] = [
    {
      title: "Rectangle",
      icon: (
        <Square
          className={`h-full w-full ${selectedShape === "rectangle" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "rectangle",
    },
    {
      title: "Circle",
      icon: (
        <Circle
          className={`h-full w-full ${selectedShape === "circle" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "circle",
    },
    {
      title: "Triangle",
      icon: (
        <Triangle
          className={`h-full w-full ${selectedShape === "triangle" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "triangle",
    },
    {
      title: "Diamond",
      icon: (
        <Diamond
          className={`h-full w-full ${selectedShape === "diamond" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "diamond",
    },
    {
      title: "Arrow",
      icon: (
        <ArrowRight
          className={`h-full w-full ${selectedShape === "arrow" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "arrow",
    },
    {
      title: "Line",
      icon: (
        <Minus
          className={`h-full w-full ${selectedShape === "line" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "line",
    },
    {
      title: "Pencil",
      icon: (
        <Pencil
          className={`h-full w-full ${selectedShape === "pencil" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "pencil",
    },
    {
      title: "Mouse Pointer",
      icon: (
        <MousePointer2
          className={`h-full w-full ${selectedShape === "mousepointer" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "mousepointer",
    },
    {
      title: "Text",
      icon: (
        <TypeOutline
          className={`h-full w-full ${selectedShape === "text" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "text",
    },
    {
      title: "Eraser",
      icon: (
        <Eraser
          className={`h-full w-full ${selectedShape === "eraser" ? "text-orange-500" : "text-neutral-600 dark:text-neutral-300"}`}
        />
      ),
      id: "eraser",
    },
  ];

  const handleResetCanvas = () => {
    drawing?.clear();
  };

  return (
    <>
      <div className="absolute top-5 left-3 max-w-full z-50">
        <Dropdownmenu onResetCanvas={handleResetCanvas} />
      </div>

      <div className="fixed top-5 right-20 -translate-x-1/2 z-40 w-full max-w-md flex justify-center">
        <AI
          onShapeCreated={(newshape) => {
            if (drawing) {
              drawing.addShape(newshape);
              const currentShapes = drawing.getAllShapes();
              setShapes(currentShapes);
            }
          }}
        />
      </div>

      <div className="fixed top-5 right-3 max-w-full z-50">
        <div className="flex items-center justify-center gap-2">
          <ProfileMenu />
          <ModeToggle />
          <SocialMedia />
        </div>
      </div>

      <div className="fixed left-3 top-1/2 -translate-y-1/2 h-[500px] flex items-center z-40">
        <DrawingEditors
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          selectedFillStyle={selectedFillStyle}
          setSelectedFillStyle={setSelectedFillStyle}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
        />
      </div>

      <div className="fixed bottom-5 left-3 max-w-full z-40">
        <Zoom drawing={drawing} />
      </div>

      <div className="fixed bottom-5 right-3 max-w-full z-40">
        <TotalUsers />
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <Dock className="items-end pb-3">
          {shapes.map((item, idx) => (
            <div key={idx} onClick={() => setSelectedShape(item.id)}>
              <DockItem className="aspect-square rounded-full bg-gray-200 dark:bg-[#232329] hover:cursor-pointer">
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            </div>
          ))}
        </Dock>
      </div>

      <canvas
        ref={myRef}
        className={`fixed top-0 left-0 w-full h-full z-0 ${selectedShape !== "mousepointer" ? "cursor-crosshair" : ""}`}
      ></canvas>
    </>
  );
}
