"use client";

import { useSocket } from "@/hooks/useSocker";
import { useEffect, useRef, useState } from "react";
import { CanvasProps } from "@/lib/interfaces";
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
import { Draw } from "@/app/drawingJS/Draw";
import { useTheme } from "next-themes";
import { ShapeOption, Tools } from "@/lib/types";
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
  const { socket } = useSocket(roomId);
  const [drawing, setDrawing] = useState<Draw>();
  const { theme, systemTheme } = useTheme();

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
      if (saved) saved.forEach((shape) => g.addShape(shape));

      return () => g.destroy();
    }
  }, [roomId, mounted]);

  useEffect(() => {
    if (!drawing || !mounted) return;

    drawing.setTool(selectedShape);
    drawing.setEditorValues({
      strokeColor,
      strokeWidth,
      selectedFillStyle,
      backgroundColor,
    });

    const themeToUse = theme === "system" ? systemTheme : theme;
    if (themeToUse) {
      drawing.setTheme(themeToUse);
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

  const shapes: ShapeOption[] = [
    { title: "Rectangle", icon: <Square />, id: "rectangle" },
    { title: "Circle", icon: <Circle />, id: "circle" },
    { title: "Triangle", icon: <Triangle />, id: "triangle" },
    { title: "Diamond", icon: <Diamond />, id: "diamond" },
    { title: "Arrow", icon: <ArrowRight />, id: "arrow" },
    { title: "Line", icon: <Minus />, id: "line" },
    { title: "Pencil", icon: <Pencil />, id: "pencil" },
    { title: "Mouse Pointer", icon: <MousePointer2 />, id: "mousepointer" },
    { title: "Text", icon: <TypeOutline />, id: "text" },
    { title: "Eraser", icon: <Eraser />, id: "eraser" },
  ];

  const handleResetCanvas = () => {
    drawing?.clear();
  };

  return (
    <>
      {/* Top Left Menu */}
      <div className="absolute top-4 left-3 z-50">
        <Dropdownmenu onResetCanvas={handleResetCanvas} />
      </div>

      {/* Top Right Controls */}
      <div className="fixed top-4 right-3 flex items-center gap-2 z-50">
        <ProfileMenu />
        <ModeToggle />
        <SocialMedia />
      </div>

      {/* Center Top AI Tool (hidden on small screens) */}
      <div className="hidden sm:flex fixed top-5 right-20 -translate-x-1/2 z-40 w-full max-w-md justify-center">
        <AI
          onShapeCreated={(newShape) => {
            if (drawing) {
              drawing.addShape(newShape);
              const currentShapes = drawing.getAllShapes();
              setShapes(currentShapes);
            }
          }}
        />
      </div>

      {/* Editor Sidebar (desktop) */}
      <div className="hidden lg:flex fixed left-3 top-1/2 -translate-y-1/2 h-auto max-h-[85vh] overflow-y-auto z-40">
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

      {/* Mobile Editor Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-2 pb-3">
        <div className="bg-zinc-900/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-t-2xl shadow-lg p-3">
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
      </div>

      {/* Zoom (bottom-left, adjusts for mobile) */}
      <div className="fixed bottom-20 sm:bottom-5 left-3 z-40">
        <Zoom drawing={drawing} />
      </div>

      {/* Total Users (bottom-right) */}
      <div className="fixed bottom-20 sm:bottom-5 right-3 z-40">
        <TotalUsers />
      </div>

      {/* Dock Toolbar */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <Dock className="items-end pb-3 flex-wrap sm:flex-nowrap">
          {shapes.map((item, idx) => (
            <div key={idx} onClick={() => setSelectedShape(item.id)}>
              <DockItem
                className={`aspect-square rounded-full bg-gray-200 dark:bg-[#232329] hover:cursor-pointer transition ${
                  selectedShape === item.id ? "scale-110 ring-2 ring-orange-500" : ""
                }`}
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-200">
                  {item.icon}
                </DockIcon>
              </DockItem>
            </div>
          ))}
        </Dock>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={myRef}
        className={`fixed top-0 left-0 w-full h-full z-0 ${
          selectedShape !== "mousepointer" ? "cursor-crosshair" : "cursor-auto"
        }`}
      />
    </>
  );
}
