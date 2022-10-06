import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ReactElement } from "react";

type Props = {
  defaultOpen?: boolean;
  delayDuration?: number;
  disableHoverableContent?: boolean;
  children: ReactElement;
  sideOffset?: number;
  title?: string;
  align?: "start" | "center" | "end";
  side?: "right" | "top" | "bottom" | "left";
};

const ToolTip = ({
  defaultOpen,
  delayDuration,
  disableHoverableContent,
  children,
  sideOffset = 8,
  title,
  align = "start",
  side = "right",
}: Props) => {
  return (
    <TooltipPrimitive.Root
      defaultOpen={defaultOpen}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          align={align}
          side={side}
          sideOffset={sideOffset}
          className="tooltip-content"
        >
          <div className="bg-black px-4 py-2 rounded-md text-sm text-white text-opacity-80">
            {title}
          </div>
          <TooltipPrimitive.Arrow width={11} height={5} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

export default ToolTip;
