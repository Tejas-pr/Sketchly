

export function initDraw(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = "#121212";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    const handleMouseUp = () => {
        isClicked = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isClicked && ctx) {
            const width = e.offsetX - startX;
            const height = e.offsetY - startY;

            ctx.fillStyle = "#121212";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "white";
            ctx.strokeRect(startX, startY, width, height);
        }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
}