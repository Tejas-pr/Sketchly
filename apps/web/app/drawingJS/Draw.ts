"use client";

import { strokeColors } from "@/lib/editor-tools";
import { resetAllShapes, setShapes } from "@/lib/localStorage/localStorage";
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
  private fillStyle = "solid";
  private fillColor: string | undefined = "";

  private currentPencilPoints: [number, number][] = [];

  private socket: WebSocket | null;
  private roomId: number | null | undefined;

  // zoom
  public scale = 1; // zoom level
  private offsetX = 0; // panning offset
  private offsetY = 0;
  private isPanning = false;
  private panStart: [number, number] = [0, 0];

  constructor(canvas: HTMLCanvasElement, socket?: WebSocket | null) {
    this.canvas = canvas;
    this.rc = rough.canvas(canvas);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.socket = socket || null;
    this.roomId = null;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    this.ctx = ctx;
    this.canvas.style.touchAction = "none";

    this.setupResizeHandler();
  }

  public setRoomId(id: number | undefined) {
    this.roomId = id;
  }

  private setupResizeHandler() {
    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.renderBackground();
      this.redrawShapes();
    });
  }

  initMouseHandler() {
    this.canvas.addEventListener("pointerdown", this.handlePointerDown);
    this.canvas.addEventListener("pointermove", this.handlePointerMove);
    this.canvas.addEventListener("pointerup", this.handlePointerUp);
    this.canvas.addEventListener("wheel", this.handleWheel, { passive: false });

    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  destroy() {
    this.canvas.removeEventListener("pointerdown", this.handlePointerDown);
    this.canvas.removeEventListener("pointermove", this.handlePointerMove);
    this.canvas.removeEventListener("pointerup", this.handlePointerUp);
  }

  setTool(tool: Tools | null) {
    this.tool = tool;
  }

  setEditorValues(values: {
    strokeColorvalue?: string;
    strokeWidth?: number;
    selectedFillStyle?: string;
    backgroundColor?: string;
  }) {
    if (values.strokeColorvalue) this.stroke = values.strokeColorvalue;
    if (values.strokeWidth) this.strokeWidth = values.strokeWidth;
    if (values.selectedFillStyle) this.fillStyle = values.selectedFillStyle;
    if (values.backgroundColor) this.fillColor = values.backgroundColor;
  }

  setTheme(theme: string | undefined) {
    this.theme = theme;

    if (theme === "dark") {
      this.stroke = "#ffffff";
    } else {
      this.stroke = "#000000";
    }

    this.renderBackground();
    this.redrawShapes();
  }

  clear() {
    this.shapes = [];
    this.renderBackground();
    resetAllShapes();
  }

  // --- Private Methods ---
  private renderBackground() {
    this.ctx.fillStyle = this.theme === "dark" ? "#121212" : "#ffffff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private redrawShapes() {
    this.renderBackground();
    this.applyTransform();
    for (let shape of this.shapes) {
      this.drawShape(shape);
    }
  }

  private drawShape(shape: Shape) {
    const options = {
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth,
      fill: shape.fill,
      fillStyle: shape.fillStyle,
    };

    switch (shape.type) {
      case "rectangle":
        this.rc.rectangle(shape.x, shape.y, shape.width, shape.height, options);
        break;

      case "circle":
        this.rc.ellipse(shape.centerX, shape.centerY, shape.width, shape.height, options);
        break;

      case "line":
        this.rc.line(shape.x1, shape.y1, shape.x2, shape.y2, options);
        break;

      case "triangle":
      case "diamond":
        this.rc.polygon(shape.points, options);
        break;

      case "arrow":
        this.drawArrow(shape, options);
        break;

      case "pencil":
        for (let i = 1; i < shape.points.length; i++) {
          const [x1, y1] = shape.points[i - 1]!;
          const [x2, y2] = shape.points[i]!;
          this.rc.line(x1, y1, x2, y2, options);
        }
        break;

      case "text":
        this.ctx.font = "16px sans-serif";
        this.ctx.fillStyle = shape.fill || "#000";
        this.ctx.fillText(shape.text, shape.x, shape.y);
        break;
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
    }

    if (this.tool === "circle") {
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
    }

    if (this.tool === "line") {
      return {
        type: "line",
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
      };
    }

    if (this.tool === "triangle") {
      const topX = startX + width / 2;
      const topY = startY;
      const leftX = startX;
      const leftY = endY;
      const rightX = endX;
      const rightY = endY;

      return {
        type: "triangle",
        points: [
          [topX, topY],
          [rightX, rightY],
          [leftX, leftY],
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        fill: this.fillColor,
        fillStyle: this.fillStyle,
      };
    }

    if (this.tool === "arrow") {
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

    if (this.tool === "diamond") {
      const cx = startX + width / 2;
      const cy = startY + height / 2;
      const halfWidth = Math.abs(width) / 2;
      const halfHeight = Math.abs(height) / 2;

      return {
        type: "diamond",
        points: [
          [cx, cy - halfHeight],
          [cx + halfWidth, cy],
          [cx, cy + halfHeight],
          [cx - halfWidth, cy],
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        fill: this.fillColor,
        fillStyle: this.fillStyle,
      };
    }

    if (this.tool === "text") {
      const text = prompt("Enter text:") || "";
      return {
        type: "text",
        x: startX,
        y: startY,
        text,
        stroke: this.stroke,
        fill: this.stroke,
      };
    }

    return null;
  }

  // --- Helper: Erase Logic ---
  private eraseShapeAt(x: number, y: number) {
    const before = this.shapes.length;
    this.shapes = this.shapes.filter((shape) => !this.isPointInShape(x, y, shape));
    if (before !== this.shapes.length) {
      this.redrawShapes();
    }
  }

  private isPointInShape(x: number, y: number, shape: Shape): boolean {
    if (shape.type === "rectangle") {
      return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
    }

    if (shape.type === "circle") {
      const dx = x - shape.centerX;
      const dy = y - shape.centerY;
      const rx = Math.abs(shape.width / 2);
      const ry = Math.abs(shape.height / 2);
      return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
    }

    if (shape.type === "line" || shape.type === "arrow") {
      const { x1, y1, x2, y2 } = shape;
      const A = x - x1;
      const B = y - y1;
      const C = x2 - x1;
      const D = y2 - y1;
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      const param = lenSq !== 0 ? dot / lenSq : -1;
      let xx, yy;

      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      const dx = x - xx;
      const dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy) < 8;
    }

    if (shape.type === "triangle" || shape.type === "diamond") {
      return this.isPointInPolygon(shape.points, x, y);
    }

    if (shape.type === "pencil") {
      for (let i = 1; i < shape.points.length; i++) {
        const [x1, y1] = shape.points[i - 1]!;
        const [x2, y2] = shape.points[i]!;
        const dist = this.pointToSegmentDistance(x, y, x1, y1, x2, y2);
        if (dist < 8) return true;
      }
    }

    // ✅ NEW: Handle text erasing
    if (shape.type === "text") {
      this.ctx.font = shape.font || "16px sans-serif";
      const metrics = this.ctx.measureText(shape.text);

      const textWidth = metrics.width;
      const textHeight =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || 16;

      return (
        x >= shape.x &&
        x <= shape.x + textWidth &&
        y <= shape.y &&
        y >= shape.y - textHeight
      );
    }

    return false;
  }

  private isPointInPolygon(points: [number, number][] | undefined, x: number, y: number): boolean {
    if (!points || points.length < 3) return false;

    let inside = false;

    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const current = points[i];
      const prev = points[j];
      if (!current || !prev) continue;

      const [xi, yi] = current;
      const [xj, yj] = prev;

      const intersect =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  }

  private pointToSegmentDistance(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    const param = lenSq !== 0 ? dot / lenSq : -1;
    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // --- Arrow Drawing ---
  private drawArrow(shape: Extract<Shape, { type: "arrow" }>, options: any) {
    const { x1, y1, x2, y2, headLength = 10 } = shape;
    this.rc.line(x1, y1, x2, y2, options);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowPoint1X = x2 - headLength * Math.cos(angle - Math.PI / 6);
    const arrowPoint1Y = y2 - headLength * Math.sin(angle - Math.PI / 6);
    const arrowPoint2X = x2 - headLength * Math.cos(angle + Math.PI / 6);
    const arrowPoint2Y = y2 - headLength * Math.sin(angle + Math.PI / 6);
    this.rc.line(x2, y2, arrowPoint1X, arrowPoint1Y, options);
    this.rc.line(x2, y2, arrowPoint2X, arrowPoint2Y, options);
  }

  private applyTransform() {
    this.ctx.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);
  }
  zoom(delta: number, centerX?: number, centerY?: number) {
    const oldScale = this.scale;
    this.scale = Math.min(Math.max(this.scale + delta, 0.2), 5); // limit zoom

    // Zoom toward a specific point (mouse cursor)
    if (centerX !== undefined && centerY !== undefined) {
      this.offsetX = centerX - ((centerX - this.offsetX) / oldScale) * this.scale;
      this.offsetY = centerY - ((centerY - this.offsetY) / oldScale) * this.scale;
    }

    this.redrawShapes();
  }

  private handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    this.zoom(delta, e.offsetX, e.offsetY);
  };

  private getRealCoords(x: number, y: number): [number, number] {
    return [(x - this.offsetX) / this.scale, (y - this.offsetY) / this.scale];
  }

  // Add shape to the canvas and redraw
  public addShape(shape: Shape) {
    this.shapes.push(shape);
    this.redrawShapes();
  }

  public getAllShapes(): Shape[] {
    return this.shapes;
  }


  private handlePointerDown = (e: PointerEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.startX = x;
    this.startY = y;
    this.isDrawing = true;

    if (this.tool === "eraser") {
      this.eraseShapeAt(x, y);
    }
  };

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.isDrawing) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (this.tool === "eraser") {
      this.eraseShapeAt(x, y);
      return;
    }

    if (this.tool === "pencil") {
      this.currentPencilPoints.push([x, y]);
      this.redrawShapes();
      this.drawShape({
        type: "pencil",
        points: this.currentPencilPoints,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
      });
    } else {
      const shape = this.createShape(this.startX, this.startY, x, y);
      this.redrawShapes();
      if (shape) this.drawShape(shape);
    }
  };

  private handlePointerUp = (e: PointerEvent) => {
    this.isDrawing = false;

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (this.tool === "eraser") return;

    if (this.tool === "pencil") {
      const pencil_data = {
        type: "pencil" as const,
        points: this.currentPencilPoints,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
      };

      this.shapes.push(pencil_data);
      this.currentPencilPoints = [];

      if (this.socket && this.socket.readyState === WebSocket.OPEN && this.roomId !== null) {
        const message = {
          type: "shape",
          roomId: this.roomId,
          shapes: JSON.stringify(pencil_data),
        };
        this.socket.send(JSON.stringify(message));
      }
    } else {
      const shape = this.createShape(this.startX, this.startY, x, y);
      if (shape) this.shapes.push(shape);

      if (this.socket && this.socket.readyState === WebSocket.OPEN && this.roomId !== null) {
        const message = {
          type: "shape",
          roomId: this.roomId,
          shapes: JSON.stringify(shape),
        };
        this.socket.send(JSON.stringify(message));
      }
    }

    this.redrawShapes();
    setShapes(this.shapes);
  };

  public setSocket(socket: WebSocket | null) {
    this.socket = socket;
  }

}
