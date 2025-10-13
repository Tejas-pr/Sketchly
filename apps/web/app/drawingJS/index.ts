import { Shape } from "@/lib/types";

export function initDraw(canvas: HTMLCanvasElement, roomId?: string, selectedShape?:string | null) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const existingShapes: Shape[] = [];

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        clearCanvas(existingShapes, canvas, ctx);
    };

    resizeCanvas(); // Initial render
    window.addEventListener("resize", resizeCanvas);

    let isClicked = false;
    let startX = 0;
    let startY = 0;

    const handleMouseDown = (e: MouseEvent) => {
        isClicked = true;
        startX = e.offsetX;
        startY = e.offsetY;
    };

    const handleMouseUp = (e: MouseEvent) => {
        isClicked = false;
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;

        // when you lift the mouse then add that to the above array
        existingShapes.push({
            type: "rectangle",
            x: startX,
            y: startY,
            width,
            height
        })
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isClicked && ctx) {
            const width = e.offsetX - startX;
            const height = e.offsetY - startY;
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "white";
            ctx.strokeRect(startX, startY, width, height);
        }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
}

// clear and render canvas
function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // After clearing drawing new shapes render the shapes that are in the array
    existingShapes.map((shape) => {
        if(shape.type === "rectangle") {
            ctx.strokeStyle = "white";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}