import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@workspace/ui/components/button-group";
import { Button } from "@workspace/ui/components/button";

export default function Zoom() {
  return (
    <div>
      <div className="flex items-center justify-center gap-5">
        <ButtonGroup>
          <Button size="icon" variant="secondary">
            +
          </Button>
          <ButtonGroupSeparator />
          <Button variant="secondary">100 %</Button>
          <ButtonGroupSeparator />
          <Button size="icon" variant="secondary">
            -
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
