import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ReactElement } from 'react';
import {
  slideDownAndFade,
  slideLeftAndFade,
  slideRightAndFade,
  slideUpAndFade,
  fadeOut,
} from '../../animations/animations';
import { styled } from '../../theme/stitches.config';

const TooltipContent = styled(TooltipPrimitive.Content, {
  borderRadius: '$md',
  padding: '$2 $3',
  fontSize: '$xs',
  color: 'rgba($white-rgb,0.8)',
  backgroundColor: '#000',
  userSelect: 'none',
  animationDuration: '250ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="delayed-open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
  '&[data-state="closed"]': {
    animationName: fadeOut,
  },
});

type Props = {
  defaultOpen?: boolean;
  delayDuration?: number;
  disableHoverableContent?: boolean;
  children: ReactElement;
  sideOffset?: number;
  title?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'right' | 'top' | 'bottom' | 'left';
};

const ToolTip = ({
  delayDuration = 0.25,
  children,
  sideOffset = 8,
  title,
  align = 'center',
  side = 'right',
  ...rest
}: Props) => {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration} {...rest}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        {Boolean(title) && (
          <TooltipContent align={align} side={side} sideOffset={sideOffset}>
            {title}
            <TooltipPrimitive.Arrow width={11} height={5} />
          </TooltipContent>
        )}
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

export default ToolTip;
