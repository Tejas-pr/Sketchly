"use client";
import { initDraw } from "@/app/drawingJS";
import { useEffect, useRef } from "react";

export default function Canvas() {
    const myRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (myRef.current) {
            initDraw(myRef.current);
        }
        
    }, [myRef]);

    return (
        <canvas
            ref={myRef}
            className="fixed top-0 left-0 w-full h-full"
        ></canvas>
    );
}
