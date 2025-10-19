"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Minus } from "lucide-react";
import {
  strokeColors,
  strokeWidths,
  fillStyles,
  backgroundColors,
} from "@/lib/editor-tools";

export default function DrawingEditors({
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  selectedFillStyle,
  setSelectedFillStyle,
  backgroundColor,
  setBackgroundColor,
}: {
  strokeColor?: string;
  setStrokeColor: (v: string) => void;
  strokeWidth?: number;
  setStrokeWidth: (v: number) => void;
  selectedFillStyle?: string;
  setSelectedFillStyle: (v: string) => void;
  backgroundColor?: string;
  setBackgroundColor: (v: string) => void;
}) {
  return (
    <div
      className="
        w-full md:w-56
        rounded-xl p-3 md:p-4 flex flex-col gap-3 md:gap-4 shadow-lg border
        bg-white text-zinc-900 border-zinc-200
        dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800
        max-h-[90vh] overflow-y-auto
      "
    >
      {/* --- Stroke --- */}
      <div>
        <h3 className="text-sm font-medium mb-2">Stroke</h3>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap overflow-x-auto pb-1">
          {strokeColors.map((color, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  className={`min-w-6 w-6 h-6 rounded-md border-2 transition hover:cursor-pointer
                    ${
                      strokeColor === color.value
                        ? "border-orange-500 scale-110"
                        : "border-zinc-300 dark:border-zinc-700"
                    }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setStrokeColor(color.value)}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {color.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* --- Stroke Width --- */}
      <div>
        <h3 className="text-sm font-medium mb-2">Stroke Width</h3>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap overflow-x-auto pb-1">
          {strokeWidths.map((width, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  className={`min-w-6 w-6 h-6 rounded-md border-2 transition flex items-center justify-center hover:cursor-pointer
                    ${
                      strokeWidth === width
                        ? "border-orange-500 scale-110"
                        : "border-zinc-300 dark:border-zinc-700"
                    }`}
                  onClick={() => setStrokeWidth(width)}
                >
                  <Minus
                    strokeWidth={width}
                    className="w-4 h-4 text-zinc-800 dark:text-zinc-200"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {width}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* --- Background Colors --- */}
      <div>
        <h3 className="text-sm font-medium mb-2">Background Colors</h3>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap overflow-x-auto pb-1">
          {backgroundColors.map((bgcolor, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  className={`min-w-6 w-6 h-6 rounded-md border-2 transition hover:cursor-pointer
                    ${
                      backgroundColor === bgcolor.value
                        ? "border-orange-500 scale-110"
                        : "border-zinc-300 dark:border-zinc-700"
                    }`}
                  style={{ backgroundColor: bgcolor.value }}
                  onClick={() => setBackgroundColor(bgcolor.value)}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {bgcolor.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* --- Fill Style --- */}
      <div>
        <h3 className="text-sm font-medium mb-2">Fill Style</h3>
        <Select
          onValueChange={(value) => setSelectedFillStyle(value)}
          value={selectedFillStyle}
        >
          <SelectTrigger
            className="
              w-full md:w-[180px] border-zinc-300 text-zinc-800
              dark:border-zinc-700 dark:text-zinc-100
            "
          >
            <SelectValue placeholder="Select a fill style" />
          </SelectTrigger>
          <SelectContent className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            <SelectGroup>
              <SelectLabel>Fill Styles</SelectLabel>
              {fillStyles.map((style, i) => (
                <SelectItem key={i} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
