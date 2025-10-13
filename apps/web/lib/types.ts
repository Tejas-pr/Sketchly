import { JSX } from "react";

// canvas
export type Shape = {
    type: "rectangle";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
}

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

export type Tools = "rectangle" | "circle" | "triangle" | "diamond" | "arrow" | "line" | "pencil" | null;

export type ShapeOption = {
  title: string;
  icon: JSX.Element;
  id: Tools;
};