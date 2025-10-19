// LOCAL STORAGE FOR SHAPES;

import { Shape } from "../types";

const TTL = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_KEY = "sketchly-canvas-shapes";
const now = new Date();

export const getShapes = (): Shape[] | null => {
    try {
        const shapes = localStorage.getItem(STORAGE_KEY);
        if (!shapes) return null;

        const data = JSON.parse(shapes) as {
            value: Shape[];
            expiry: number;
        }

        if (now.getTime() > data.expiry) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }

        return data.value;
    } catch (e) {
        console.error("Failed to get shapes from localStorage", e);
        return null;
    }
};

export const setShapes = (shapes: Shape[]) => {
    try {
        const data = {
            value: shapes,
            expiry: new Date().getTime() + TTL,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Failed to save shapes to localStorage", e);
    }
};

export const resetAllShapes = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error("Failed to save shapes to localStorage", e);
    }
}