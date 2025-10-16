import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import { Draw } from "@/app/drawingJS/Draw";

export default function Zoom({ drawing }: { drawing?: Draw }) {
  const [scale, setScale] = useState(1);

  const handleZoom = (delta: number) => {
    if (!drawing) return;
    drawing.zoom(delta);
    setScale(drawing.scale);
  };
  
  const handleReset = () => {
    if (!drawing) return;
    drawing.zoom(1);
    setScale(1);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-5">
        <ButtonGroup>
          <Button onClick={() => handleZoom(0.1)} size="icon" variant="secondary">
            +
          </Button>
          <ButtonGroupSeparator />
          <Button onClick={handleReset} variant="secondary">{Math.round(scale * 100)}%</Button>
          <ButtonGroupSeparator />
          <Button onClick={() => handleZoom(-0.1)} size="icon" variant="secondary">
            -
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
