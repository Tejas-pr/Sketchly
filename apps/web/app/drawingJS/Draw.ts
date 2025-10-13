import { Shape, Tools } from "@/lib/types";

export class Draw {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private clicked: boolean;
    private startX: number;
    private startY: number;
    private selectedTool: string | null;
    private selectedTheme: string | null | undefined;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        // Set canvas size to match window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const ctx = this.canvas.getContext("2d");
        if(!ctx) {
            throw new Error("Could not get 2D context");
        }
        this.ctx = ctx;
        this.clicked = false;
        this.startX = 0;
        this.startY = 0;
        this.existingShapes = [];
        this.selectedTool = "";
        this.selectedTheme = "dark";
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.renderBackground();
            this.clearCanvas();
        });
    }

    initMouseHandler() {
        this.canvas.addEventListener("mousedown", this.mouseDown);
        this.canvas.addEventListener("mousemove", this.mouseMove);
        this.canvas.addEventListener("mouseup", this.mouseUp);
    }

    setTool(tool: Tools | null) {
        this.selectedTool = tool;
    }

    private renderBackground() {
        if (this.selectedTheme === "dark") {
            this.ctx.fillStyle = "#121212";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.fillStyle = "#ffffff";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    setTheme(theme: string | undefined) {
        this.selectedTheme = theme;
        this.renderBackground();
        this.ctx.strokeStyle = theme === "dark" ? "#ffffff" : "#000000";
    }

    mouseDown = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.offsetX;
        this.startY = e.offsetY;
    }

    mouseMove = (e: MouseEvent) => {
        if(this.clicked) {
            const width = e.offsetX - this.startX;
            const height = e.offsetY - this.startY;
            console.log(">>>>>>>>>width", width);
            console.log(">>>>>>>>>height", height);
            this.clearCanvas();
            const selectedShape = this.selectedTool;
            const selectedTool = this.selectedTool;

            if (selectedTool === "rectangle") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);   
            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();                
            } else if (selectedShape === 'triangle') {
                return;
            } else if (selectedShape === 'diamond') {
                return;
            } else if (selectedShape === 'arrow') {
                return;
            } else if (selectedShape === 'line') {
                return;
            } else if (selectedShape === 'pencil') {
                return;
            }
        }
    }

    mouseUp = (e: MouseEvent) => {
        this.clicked = false;
        const width = e.offsetX - this.startX;
        const height = e.offsetY - this.startY;

        const selectedShape = this.selectedTool;
        let shape: Shape | null = null;
        
        if (selectedShape === 'rectangle') {
            shape = {
                type: "rectangle",
                x: this.startX,
                y: this.startY,
                width,
                height
            }
        } else if (selectedShape === 'circle') {
            const radius = Math.sqrt(width * width + height * height) / 2;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;

            shape = {
                type: "circle",
                centerX,
                centerY,
                radius
            };
        } else if (selectedShape === 'triangle') {
            return;
        } else if (selectedShape === 'diamond') {
            return;
        } else if (selectedShape === 'arrow') {
            return;
        } else if (selectedShape === 'line') {
            return;
        } else if (selectedShape === 'pencil') {
            return;
        }

        if(!shape) {
            return;
        }

        this.existingShapes.push(shape);
        console.log(">>>>>>>>>>>>", this.existingShapes);
    }

    clearCanvas() {
        // fill with background color based on theme
        if (this.selectedTheme === "dark") {
            this.ctx.fillStyle = "#121212";
        } else {
            this.ctx.fillStyle = "#ffffff";
        }
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // re-draw existing shapes
        this.existingShapes.forEach((shape) => {
            if (shape.type === "rectangle") {
            this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
            this.ctx.beginPath();
            this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.closePath();
            }
        });
    }


    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDown)
        this.canvas.removeEventListener("mouseup", this.mouseUp)
        this.canvas.removeEventListener("mousemove", this.mouseMove)
    }

    clear() {
        this.clicked = false;
        this.existingShapes = [];
        this.clearCanvas();
    }
}