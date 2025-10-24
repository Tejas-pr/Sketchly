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
  ArrowLeftToLine,
} from "lucide-react";
import { Dropdownmenu } from "./dropdown-menu";
import { ModeToggle } from "./theme-toggle";
import { ProfileMenu } from "./profile-menu";
import { Draw } from "@/app/drawingJS/Draw";
import { useTheme } from "next-themes";
import { Shape, ShapeOption, Tools } from "@/lib/types";
import Zoom from "./zoom";
import DrawingEditors from "./drawing-editor";
import { SocialMedia } from "./social-media";
import { TotalUsers } from "./total-users";
import { AI } from "./ai";
import { getShapes, setShapes } from "@/lib/localStorage/localStorage";
import {
  clearCanvas,
  getAllShapesByRoom,
  getRoomIdBySlug,
} from "@/app/actions/room";
import { toast } from "@workspace/ui/components/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { useRouter } from "next/navigation";

export default function Canvas({ roomId }: CanvasProps) {
  const myRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedShape, setSelectedShape] = useState<Tools>("mousepointer");
  const { socket, newshapes, isConnected } = useSocket(roomId);
  const [drawing, setDrawing] = useState<Draw>();
  const { theme, systemTheme } = useTheme();
  const [smallScreen, setSmallScreen] = useState<boolean>(false);

  // Editors
  const [strokeColor, setStrokeColor] = useState<string>("#FFFFFF");
  const [strokeWidth, setStrokeWidth] = useState<number>(1);
  const [selectedFillStyle, setSelectedFillStyle] = useState<string>("solid");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<any>();
  const navigate = useRouter();

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    if (roomId) {
      getroomID();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!drawing || !newshapes) return;
    drawing.addShape(newshapes);
  }, [newshapes, drawing]);

  useEffect(() => {
    if (!drawing || !mounted) return;
    drawing.setSocket(socket);
    drawing.setRoomId(roomNumber);
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

  useEffect(() => {
    if (mounted && myRef.current) {
      const g = new Draw(myRef.current, socket);
      setDrawing(g);
      g.initMouseHandler();

      const initShapes = async () => {
        if (!drawing || !mounted) return;
        let saved: Shape[] | null = [];

        try {
          if (roomId) {
            const allRoomShapes = await handleAllShapes();
            if (allRoomShapes) saved = allRoomShapes;
          } else {
            saved = getShapes();
          }

          if (saved?.length) {
            saved.forEach((shape) => g.addShape(shape));
          }
        } catch (error) {
          console.error("Error loading shapes:", error);
          toast.error("Failed to load room shapes");
        }
      };

      initShapes();

      return () => g.destroy();
    }
  }, [roomId, mounted]);

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
    if (roomId) {
      clearCanvas(roomNumber);
      toast.success("Canvas cleared successfully!", {
        description: `All shapes in room ${roomId} have been removed for everyone.`,
      });
    }
  };

  const handleAllShapes = async (): Promise<Shape[] | null> => {
    try {
      const response = await getAllShapesByRoom(roomNumber);

      if (response.success && response.all_shapes?.length) {
        toast.success(
          `🧩 Loaded ${response.all_shapes.length} shapes from the room`
        );
        return response.all_shapes;
      } else {
        toast("No shapes found in this room yet.");
        return null;
      }
    } catch (e) {
      console.error("Error fetching room shapes:", e);
      toast.error("Error fetching room shapes");
      return null;
    }
  };

  const getroomID = async () => {
    if (roomId === undefined || roomId === null) {
      return;
    }
    const resolvedRoomId = await getRoomIdBySlug(roomId);
    if (resolvedRoomId === undefined) {
      toast("Unable to find the room id! Please try again.");
      return;
    }
    setRoomNumber(resolvedRoomId.room_details?.id);
  };

  return (
    <>
      <div className="absolute top-4 left-3 z-50">
        <Dropdownmenu onResetCanvas={handleResetCanvas} />
      </div>

      <div className="flex fixed top-4 right-3 items-center gap-2 z-50">
        <ProfileMenu />
        <ModeToggle />
        <SocialMedia />
        {roomId && <Tooltip>
          <TooltipTrigger>
            <button className="px-3 py-3 flex items-center justify-center rounded-md border-2 transition hover:cursor-pointer hover:bg-muted">
              <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-yellow-400" : "bg-red-400"} animate-pulse`} />
            </button>
          </TooltipTrigger>
          <TooltipContent>You are currently connected to room {roomId}.</TooltipContent>
        </Tooltip>}
        {roomId && <Tooltip>
          <TooltipTrigger>
            <button
              className="px-3 py-2 flex items-center justify-center rounded-md border-2 transition hover:cursor-pointer hover:bg-muted"
              onClick={() => navigate.push("/")}
            >
              <ArrowLeftToLine className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Exit room {roomId}.</TooltipContent>
        </Tooltip>}
      </div>

      <div className="hidden sm:flex fixed top-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-md justify-center">
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

      <div className="hidden md:block fixed bottom-20 sm:bottom-5 left-3 z-40">
        <Zoom drawing={drawing} />
      </div>

      <div className="hidden md:block fixed bottom-20 sm:bottom-5 right-3 z-40">
        <TotalUsers />
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <Dock
          magnification={smallScreen ? 40 : 80}
          className={`items-end pb-3 ${smallScreen ? "scale-65" : "scale-100"}`}
        >
          {shapes.map((item, idx) => (
            <div key={idx} onClick={() => setSelectedShape(item.id)}>
              <DockItem
                className={`aspect-square rounded-full bg-gray-200 dark:bg-[#232329] hover:cursor-pointer transition ${
                  selectedShape === item.id
                    ? "scale-110 ring-2 ring-orange-500"
                    : ""
                }`}
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon
                  className={`${
                    smallScreen ? "w-4 h-4" : "w-5 h-5"
                  } text-zinc-700 dark:text-zinc-200`}
                >
                  {item.icon}
                </DockIcon>
              </DockItem>
            </div>
          ))}
        </Dock>
      </div>

      <canvas
        ref={myRef}
        className={`fixed top-0 left-0 w-full h-full z-0 ${
          selectedShape !== "mousepointer" ? "cursor-crosshair" : "cursor-auto"
        }`}
      />
    </>
  );
}
