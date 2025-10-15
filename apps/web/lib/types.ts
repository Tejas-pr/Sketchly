import { JSX } from "react";

// canvas
type BaseShape = {
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    fillStyle?: string;
};

type Rectangle = BaseShape & {
    type: "rectangle";
    x: number;
    y: number;
    width: number;
    height: number;
};

type Circle = BaseShape & {
    type: "circle";
    centerX: number;
    centerY: number;
    width: number;
    height: number;
};

type Line = BaseShape & {
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

type Triangle = BaseShape & {
    type: "triangle";
    points: [
        number[], number[], number[]
    ]
};

type Arrow = BaseShape & {
    type: "arrow";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    headLength?: number;
};

type Pencil = BaseShape & {
    type: "pencil";
    points: [number, number][]
};

export type Shape = Rectangle | Circle | Line | Triangle | Arrow | Pencil;

export type MyPageProps = {
    params: Promise<{ roomId: string }>;
};

// Session types
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

export type Tools = "rectangle" | "circle" | "triangle" | "diamond" | "arrow" | "line" | "pencil" | "mousepointer" | "text" | "eraser" | null;

export type ShapeOption = {
    title: string;
    icon: JSX.Element;
    id: Tools;
};