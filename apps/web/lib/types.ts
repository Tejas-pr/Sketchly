import { JSX } from "react";

// Common shape properties
export type BaseShape = {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fillStyle?: string;
};

// Rectangle
export type Rectangle = BaseShape & {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
};

// Circle / Ellipse
export type Circle = BaseShape & {
  type: "circle";
  centerX: number;
  centerY: number;
  width: number;
  height: number;
};

// Straight Line
export type Line = BaseShape & {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

// Triangle (3 points)
export type Triangle = BaseShape & {
  type: "triangle";
  points: [ [number, number], [number, number], [number, number] ];
};

// Diamond (4 points)
export type Diamond = BaseShape & {
  type: "diamond";
  points: [ [number, number], [number, number], [number, number], [number, number] ];
};

// Arrow
export type Arrow = BaseShape & {
  type: "arrow";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  headLength?: number;
};

// Pencil (freehand)
export type Pencil = BaseShape & {
  type: "pencil";
  points: [number, number][];
};

// Text
export type TextShape = BaseShape & {
  type: "text";
  x: number;
  y: number;
  text: string;
  font?: string;
  fontSize?: number;
  color?: string;
};

// ✅ Eraser is not an actual drawn shape, but we include a placeholder type
export type Eraser = {
  type: "eraser";
  x: number;
  y: number;
  size: number;
};

// Union of all drawable shapes
export type Shape =
  | Rectangle
  | Circle
  | Line
  | Triangle
  | Diamond
  | Arrow
  | Pencil
  | TextShape;

// (Eraser is a tool, not a shape stored in shapes[])
export type Tools =
  | "rectangle"
  | "circle"
  | "triangle"
  | "diamond"
  | "arrow"
  | "line"
  | "pencil"
  | "text"
  | "eraser"
  | "mousepointer"
  | null;

// Toolbar options
export type ShapeOption = {
  title: string;
  icon: JSX.Element;
  id: Tools;
};

// Page props (Next.js-style)
export type MyPageProps = {
  params: Promise<{ roomId: string }>;
};

// --- Session-related types ---
export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
};

export type Session = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export type SessionData = {
  user: User;
  session: Session;
} | null;
