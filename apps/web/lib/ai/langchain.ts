import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Shape } from "../types";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  temperature: 0,
});

export async function generateShape(
  prompt: string,
  theme: string | undefined,
  selectedFillStyle: string,
  strokeColorvalue: string,
  strokeWidth: number
) {

  const template = `
    You are a specialized **Drawing Assistant** and **JSON Generator**.
    Your sole task is to analyze a drawing instruction and translate it into one or more valid JSON objects
    that strictly follow the schema below.

    --- JSON Schema Reference (STRICTLY FOLLOW) ---
    Each drawable shape must exactly match one of the following:

    1. Rectangle
    { "type": "rectangle", "x": number, "y": number, "width": number, "height": number, "stroke": string, "strokeWidth": number, "fill": string, "fillStyle": string }

    2. Circle / Ellipse
    { "type": "circle", "centerX": number, "centerY": number, "width": number, "height": number, "stroke": string, "strokeWidth": number, "fill": string, "fillStyle": string }

    3. Triangle
    { "type": "triangle", "points": [ [number, number], [number, number], [number, number] ], "stroke": string, "strokeWidth": number, "fill": string, "fillStyle": string }

    4. Diamond
    { "type": "diamond", "points": [ [number, number], [number, number], [number, number], [number, number] ], "stroke": string, "strokeWidth": number, "fill": string, "fillStyle": string }

    5. Arrow
    { "type": "arrow", "x1": number, "y1": number, "x2": number, "y2": number, "stroke": string, "strokeWidth": number, "headLength": number }

    6. Line
    { "type": "line", "x1": number, "y1": number, "x2": number, "y2": number, "stroke": string, "strokeWidth": number }

    7. Pencil (Freehand path)
    { "type": "pencil", "points": [ [number, number], [number, number], ... ], "stroke": string, "strokeWidth": number }

    8. Text
    { "type": "text", "x": number, "y": number, "text": string, "font"?: string, "fontSize"?: number, "color"?: string }

    ⚠️ Never output { "type": "eraser" } — it is not a drawable shape.

    --- Drawing Logic Rules ---
    1. **STRICT JSON ONLY** — Output only valid JSON (no text, markdown, or commentary).
    2. **Output Format**:
      - For single-shape drawings → output one JSON object.
      - For composite objects (like "house", "tree", "car", "stickman", etc.) → output a JSON array of multiple shape objects.
    3. **Coordinate System** — All values must be between 0 and 800.
    4. **Color Handling**:
      - Theme: **${theme}**
      - Stroke color: **${strokeColorvalue}**
      - Fill color must contrast with the theme.
    5. **Fill Style**:
      - Always **"${selectedFillStyle}"**, meaning shapes use solid fills.
      - Include "fillStyle": "solid" in every shape object.
    6. **Defaults**:
      - strokeWidth: ${strokeWidth}
      - headLength (arrows): 20
      - fill: "transparent" unless solid color is used
      - font: "Arial", fontSize: 20 for text
    7. **Composite Object Rule**:
      - If the instruction describes a complex or named object (e.g., “draw a house”),
        decompose it into simple base shapes arranged logically.
        Example: a triangle (roof) above a rectangle (body).
      - All parts should be positioned coherently within the 0–800 canvas area.

    Instruction: "${prompt}"

    JSON Output:
`;

  const res = await llm.invoke(template);
  let contentString: string;
  if (typeof res.content === "string") {
    contentString = res.content;
  } else if (Array.isArray(res.content)) {
    contentString = res.content.map((block) => ("text" in block ? block.text : "")).join("");
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
