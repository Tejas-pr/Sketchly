"use client";

import { Slider } from "@workspace/ui/components/slider";
import { Button } from "@workspace/ui/components/button";
import { ChevronUp, ChevronDown, Layers } from "lucide-react";

export default function DrawingEditors() {
  const strokeColors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#F87171", "#E5E7EB"];
  const backgroundColors = ["#78350F", "#14532D", "#1E3A8A", "#78350F", "transparent"];

  return (
    <div className="w-56 bg-zinc-900 text-zinc-100 rounded-xl p-4 flex flex-col gap-4 shadow-lg">
      {/* Stroke */}
      <div>
        <h3 className="text-sm font-medium mb-2">Stroke</h3>
        <div className="flex gap-2 flex-wrap">
          {strokeColors.map((c, i) => (
            <button
              key={i}
              className="w-6 h-6 rounded-md border border-zinc-700"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Background */}
      <div>
        <h3 className="text-sm font-medium mb-2">Background</h3>
        <div className="flex gap-2 flex-wrap">
          {backgroundColors.map((c, i) => (
            <button
              key={i}
              className={`w-6 h-6 rounded-md border border-zinc-700 ${
                c === "transparent" ? "bg-[linear-gradient(45deg,#444_25%,transparent_25%,transparent_75%,#444_75%,#444)]" : ""
              }`}
              style={c !== "transparent" ? { backgroundColor: c } : {}}
            />
          ))}
        </div>
      </div>

      {/* Stroke width */}
      <div>
        <h3 className="text-sm font-medium mb-2">Stroke width</h3>
        <div className="flex gap-2">
          <button className="w-10 h-8 rounded-md bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <div className="w-4 h-0.5 bg-zinc-400"></div>
          </button>
          <button className="w-10 h-8 rounded-md bg-indigo-700 flex items-center justify-center border border-zinc-700">
            <div className="w-4 h-1 bg-zinc-100"></div>
          </button>
          <button className="w-10 h-8 rounded-md bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <div className="w-4 h-1.5 bg-zinc-400"></div>
          </button>
        </div>
      </div>

      {/* Stroke style */}
      <div>
        <h3 className="text-sm font-medium mb-2">Stroke style</h3>
        <div className="flex gap-2">
          <button className="w-10 h-8 rounded-md bg-indigo-700 flex items-center justify-center border border-zinc-700">
            <div className="w-4 h-0.5 bg-zinc-100"></div>
          </button>
          <button className="w-10 h-8 rounded-md bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <div className="w-4 border-t-2 border-dashed border-zinc-400"></div>
          </button>
          <button className="w-10 h-8 rounded-md bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <div className="w-4 border-t-2 border-dotted border-zinc-400"></div>
          </button>
        </div>
      </div>

      {/* Sloppiness */}
      <div>
        <h3 className="text-sm font-medium mb-2">Sloppiness</h3>
        <div className="flex gap-2">
          {["~", "~~", "~~~"].map((s, i) => (
            <button
              key={i}
              className={`w-10 h-8 rounded-md border border-zinc-700 ${
                i === 1 ? "bg-indigo-700" : "bg-zinc-800"
              } flex items-center justify-center text-zinc-300`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Edges */}
      <div>
        <h3 className="text-sm font-medium mb-2">Edges</h3>
        <div className="flex gap-2">
          <button className="w-10 h-8 rounded-md border border-zinc-700 bg-zinc-800 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-dashed border-zinc-400"></div>
          </button>
          <button className="w-10 h-8 rounded-md border border-zinc-700 bg-indigo-700 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-solid border-zinc-100"></div>
          </button>
        </div>
      </div>

      {/* Opacity */}
      <div>
        <h3 className="text-sm font-medium mb-2">Opacity</h3>
        <div className="flex flex-col gap-2">
          <Slider defaultValue={[100]} max={100} step={1} />
          <div className="flex justify-between text-xs text-zinc-400">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* Layers */}
      <div>
        <h3 className="text-sm font-medium mb-2">Layers</h3>
        <div className="flex gap-2">
          <Button size="icon" className="bg-zinc-800 hover:bg-zinc-700">
            <Layers size={16} />
          </Button>
          <Button size="icon" className="bg-zinc-800 hover:bg-zinc-700">
            <ChevronDown size={16} />
          </Button>
          <Button size="icon" className="bg-zinc-800 hover:bg-zinc-700">
            <ChevronUp size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
