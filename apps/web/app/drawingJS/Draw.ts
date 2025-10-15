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

  private stroke = "";
  private strokeWidth = 1;
  private fillStyle = "dots";
  private fillColor: string | undefined;

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
    this.shapes.forEach((shape) => {
      if (shape.type === "rectangle") {

        this.rc.rectangle(shape.x, shape.y, shape.width, shape.height, {
          stroke: this.stroke,
          strokeWidth: this.strokeWidth,
          fill: this.fillColor,
          fillStyle: this.fillStyle,
        });
      } else if (shape.type === "circle") {
        // this.rc.ellipse(shape.centerX, shape.centerY, shape.width, shape.height, {
        //   stroke: this.stroke,
        //   strokeWidth: this.strokeWidth,
        //   fill: this.fillColor || this.stroke,
        //   fillStyle: this.fillStyle,
        // });
      }
    });
  }

  // --- Mouse Handlers ---

  private handleMouseDown = (e: MouseEvent) => {
    this.isDrawing = true;
    this.startX = e.offsetX;
    this.startY = e.offsetY;
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDrawing) return;

    this.redrawShapes();

    const width = e.offsetX - this.startX;
    const height = e.offsetY - this.startY;

    if (this.tool === "rectangle") {
      this.rc.rectangle(this.startX, this.startY, width, height, {
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        fillStyle: this.fillStyle,
        fill: this.fillColor
      });
    } else if (this.tool === "circle") {
      const radius = Math.max(width, height) / 2;
      const cx = this.startX + radius;
      const cy = this.startY + radius;
      this.rc.ellipse(cx, cy, width, height, {
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        fill: this.fillColor || this.stroke,
        fillStyle: this.fillStyle
      });
    }
  };

  private handleMouseUp = (e: MouseEvent) => {
    this.isDrawing = false;
    const width = e.offsetX - this.startX;
    const height = e.offsetY - this.startY;

    if (this.tool === "rectangle") {
      this.shapes.push({
        type: "rectangle",
        x: this.startX,
        y: this.startY,
        width,
        height,
      });
    } else if (this.tool === "circle") {
      const radius = Math.sqrt(width * width + height * height) / 2;
      const cx = this.startX + width / 2;
      const cy = this.startY + height / 2;
      this.shapes.push({
        type: "circle",
        centerX: cx,
        centerY: cy,
        radius
      });
    }
  };
}
