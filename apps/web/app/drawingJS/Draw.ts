import { Shape, Tools } from "@/lib/types";
import rough from "roughjs";

export class Draw {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private rc: any;

  private shapes: Shape[] = [];
  private isDrawing = false;
  private startX = 0;
  private startY = 0;

  private tool: Tools | null = null;
  private theme: string | undefined = "dark";

  private stroke = "#000000";
  private strokeWidth = 1;
  private fillStyle = "solid";
  private fillColor: string | undefined = "";

  private currentPencilPoints: [number, number][] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.rc = rough.canvas(canvas);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    this.ctx = ctx;

    this.setupResizeHandler();
  }

  private setupResizeHandler() {
    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.renderBackground();
      this.redrawShapes();
    });
  }

  // --- Public API ---
  initMouseHandler() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
  }

  setTool(tool: Tools | null) {
    this.tool = tool;
  }

  setEditorValues(values: {
    strokeColor?: string;
    strokeWidth?: number;
    selectedFillStyle?: string;
    backgroundColor?: string;
  }) {
    if (values.strokeColor) this.stroke = values.strokeColor;
    if (values.strokeWidth) this.strokeWidth = values.strokeWidth;
    if (values.selectedFillStyle) this.fillStyle = values.selectedFillStyle;
    if (values.backgroundColor) this.fillColor = values.backgroundColor;
  }

  setTheme(theme: string | undefined) {
    this.theme = theme;
    this.renderBackground();
    this.redrawShapes();
  }

  clear() {
    this.shapes = [];
    this.renderBackground();
  }

  // --- Private Methods ---
  private renderBackground() {
    this.ctx.fillStyle = this.theme === "dark" ? "#121212" : "#ffffff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private redrawShapes() {
    this.renderBackground();
    for (let shape of this.shapes) {
      this.drawShape(shape);
    }
  }

  private drawShape(shape: Shape) {
    let options = {
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth,
      fill: shape.fill,
      fillStyle: shape.fillStyle,
    };

    if (shape.type === "rectangle") {
      this.rc.rectangle(shape.x, shape.y, shape.width, shape.height, options);
    } else if (shape.type === "circle") {
      this.rc.ellipse(shape.centerX, shape.centerY, shape.width, shape.height, options);
    } else if (shape.type === "line") {
      this.rc.line(shape.x1, shape.y1, shape.x2, shape.y2, options);
    } else if (shape.type === "triangle") {
      this.rc.polygon(shape.points, options);
    } else if (shape.type === "arrow") {
      this.drawArrow(shape, options);
    } else if (shape.type === "pencil") {
      for (let i = 1; i < shape.points.length; i++) {
        const [x1, y1] = shape.points[i - 1]!;
        const [x2, y2] = shape.points[i]!;
        this.rc.line(x1, y1, x2, y2, options);
      }
    }
  }

  private createShape(startX: number, startY: number, endX: number, endY: number): Shape | null {
    const width = endX - startX;
    const height = endY - startY;

    if (this.tool === "rectangle") {
      return {
        type: "rectangle",
        x: startX,
        y: startY,
        width,
        height,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        fill: this.fillColor,
        fillStyle: this.fillStyle,
      };
    } else if (this.tool === "circle") {
      return {
        type: "circle",
        centerX: startX + width / 2,
        centerY: startY + height / 2,
        width,
        height,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        fill: this.fillColor,
        fillStyle: this.fillStyle,
      };
    } else if (this.tool === "line") {
      return {
        type: "line",
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
      };
    } else if (this.tool === "triangle") {
      const topX = (startX - endX) / 2;
      const topY = startY;
      const leftX = startX;
      const leftY = endY;
      const rightX = endX;
      const rightY = endY;

      return {
        type: "triangle",
        points: [
          [topX, topY],
          [leftX, leftY],
          [rightX, rightY]
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        fill: this.fillColor,
        fillStyle: this.fillStyle,
      }
    } else if (this.tool === "arrow") {
      return {
        type: "arrow",
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        headLength: 10,
      };
    }
    return null;
  }

  // --- Mouse Handlers ---
  private handleMouseDown = (e: MouseEvent) => {
    this.isDrawing = true;
    this.startX = e.offsetX;
    this.startY = e.offsetY;
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDrawing) return;

    if (this.tool === "pencil") {
      this.currentPencilPoints.push([e.offsetX, e.offsetY]);
      this.redrawShapes();
      this.drawShape({
        type: "pencil",
        points: this.currentPencilPoints,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
      });
    }
    else {
      const shape = this.createShape(this.startX, this.startY, e.offsetX, e.offsetY);
      this.redrawShapes();
      if (shape) this.drawShape(shape);
    }
  };

  private handleMouseUp = (e: MouseEvent) => {
    this.isDrawing = false;

    if (this.tool === "pencil") {
      this.shapes.push({
        type: "pencil",
        points: this.currentPencilPoints,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
      });
      this.currentPencilPoints = [];
    } else {
      const shape = this.createShape(this.startX, this.startY, e.offsetX, e.offsetY);
      if (shape) this.shapes.push(shape);
    }

    this.redrawShapes();
  };


  private drawArrow(shape: Extract<Shape, { type: "arrow" }>, options: any) {
    const { x1, y1, x2, y2, headLength = 10 } = shape;

    // Draw main line
    this.rc.line(x1, y1, x2, y2, options);

    // Calculate angle
    const angle = Math.atan2(y2 - y1, x2 - x1);

    // Arrowhead points
    const arrowPoint1X = x2 - headLength * Math.cos(angle - Math.PI / 6);
    const arrowPoint1Y = y2 - headLength * Math.sin(angle - Math.PI / 6);

    const arrowPoint2X = x2 - headLength * Math.cos(angle + Math.PI / 6);
    const arrowPoint2Y = y2 - headLength * Math.sin(angle + Math.PI / 6);

    // Draw arrowhead
    this.rc.line(x2, y2, arrowPoint1X, arrowPoint1Y, options);
    this.rc.line(x2, y2, arrowPoint2X, arrowPoint2Y, options);
  }
}
