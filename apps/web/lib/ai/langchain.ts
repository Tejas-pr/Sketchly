import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Shape } from "../types";
import { useTheme } from "next-themes";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  temperature: 0,
});

export async function generateShape(prompt: string, theme: string | undefined) {
  const template = `
      You are a specialized **Drawing Assistant** and **JSON Generator**.
      Your sole task is to analyze a drawing instruction and translate it into a single, valid JSON object.

      --- JSON Schema Reference (MUST ADHERE STRICTLY) ---
      // A drawing shape object must match exactly one of the following types:

      // 1. Rectangle
      { type: "rectangle", x: number, y: number, width: number, height: number, stroke: string, strokeWidth: number, fill: string }

      // 2. Circle
      { type: "circle", centerX: number, centerY: number, width: number, height: number, stroke: string, strokeWidth: number, fill: string }

      // 3. Triangle
      { type: "triangle", points: [ [number, number], [number, number], [number, number] ], stroke: string, strokeWidth: number, fill: string }

      // 4. Diamond
      { type: "diamond", points: [ [number, number], [number, number], [number, number], [number, number] ], stroke: string, strokeWidth: number, fill: string }

      // 5. Arrow
      { type: "arrow", x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number, headLength: number }

      // 6. Line
      { type: "line", x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number }

      // 7. Pencil (Freehand path)
      { type: "pencil", points: [ [number, number], [number, number], ... ] } // Requires at least 2 points

      // 8. Text
      { type: "text", x: number, y: number, text: string, font?: string, fontSize?: number, color?: string }

      --- Output Rules and Constraints ---
      1.  **STRICT JSON ONLY**: You must return a single, minified, valid JSON object. **DO NOT** include any prose, comments, markdown backticks, explanations, or any text other than the JSON object itself.
      2.  **Coordinate System**: All coordinates (x, y, centerX, centerY) and dimensions (width, height) should be **positive numbers** (e.g., between 0 and 800) unless the instruction explicitly suggests otherwise. Use simple integers where possible.
      3.  **Color Handling**:
          * The current website theme is **${theme}**.
          * Set the **stroke** and **fill** colors to ensure a **high-contrast** visibility against the theme color. Use standard CSS color names (e.g., "red", "blue") or hex codes.
      4.  **Omitted Parameters**: If a parameter (like 'fill' for a Line or 'font' for Text) is optional *and* not specified by the user instruction, you may omit it from the JSON. **DO NOT** use an empty string for omitted parameters; only use it for the "text" field if the prompt is empty.
      5.  **Default Values (If Ambiguous)**:
          * **strokeWidth**: Use a default of **4**.
          * **headLength** (for Arrow): Use a default of **20**.
          * **fill**: Use a default of **"transparent"** unless the shape is clearly meant to be solid (e.g., "a solid red circle").

      Instruction: "${prompt}"

      JSON Output:
  `;

  const res = await llm.invoke(template);
  let contentString: string;
  if (typeof res.content === "string") {
    contentString = res.content;
  } else if (Array.isArray(res.content)) {
    contentString = res.content
      .map((block) =>
        "text" in block ? block.text : ""
      )
      .join("");
  } else {
    console.error("Unknown content type from AI:", res.content);
    return null;
  }

  try {
    const shape = JSON.parse(contentString.replace(/```json\s*([\s\S]*?)```/, "$1").trim()) as Shape;
    return shape;
  } catch (err) {
    console.error("Failed to parse AI response:", err, contentString);
    return null;
  }
}
