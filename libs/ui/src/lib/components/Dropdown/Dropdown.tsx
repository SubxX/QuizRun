import * as RUIDropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from '../../theme/stitches.config';
import { forwardRef } from 'react';
import {
  slideUpAndFade,
  slideDownAndFade,
  slideLeftAndFade,
  slideRightAndFade,
} from '../../animations/animations';
import { ComponentProps } from '@stitches/react';

const DropdownMenu = RUIDropdownMenu.Root;
const Trigger = RUIDropdownMenu.Trigger;

const contentStyles = {
  minWidth: 190,
  backgroundColor: '#333',
  border: '1px solid $blackish',
  borderRadius: '$lg',
  padding: '$1',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
};
const DropdownMenuContent = styled(RUIDropdownMenu.Content, contentStyles);
const DropdownMenuArrow = styled(RUIDropdownMenu.Arrow, { fill: '#333' });

type DDContent = ComponentProps<typeof DropdownMenuContent>;
export const Content = forwardRef<HTMLDivElement, DDContent>(
  ({ children, ...props }, forwardedRef) => (
    <RUIDropdownMenu.Portal>
      <DropdownMenuContent sideOffset={5} {...props} ref={forwardedRef}>
        {children}
        <DropdownMenuArrow />
      </DropdownMenuContent>
    </RUIDropdownMenu.Portal>
  )
);

const itemStyles = {
  all: 'unset',
  fontSize: 12,
  lineHeight: 1,
  color: '$white-muted',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 26,
  padding: '0 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',
  cursor: 'pointer',

  '&[data-disabled]': {
    opacity: '0.5',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    backgroundColor: '$primary',
    color: '#fff',
  },
  variants: {
    color: {
      danger: {
        '&[data-highlighted]': {
          backgroundColor: 'rgba(205, 43, 48, 0.1)',
          color: 'rgb(205, 43, 49)',
        },
      },
    },
  },
};

const Item = styled(RUIDropdownMenu.Item, itemStyles);
const CheckboxItem = styled(RUIDropdownMenu.CheckboxItem, itemStyles);
const RadioItem = styled(RUIDropdownMenu.RadioItem, itemStyles);

const Label = styled(RUIDropdownMenu.Label, {
  paddingLeft: 25,
  fontSize: '$xs',
  lineHeight: '25px',
  color: '#fff',
});

const Separator = styled(RUIDropdownMenu.Separator, {
  height: 1,
  backgroundColor: 'rgba($white-rgb,0.15)',
  margin: 5,
});

const ItemIndicator = styled(RUIDropdownMenu.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
  color: 'inherit',
});

export default Object.assign(DropdownMenu, {
  Trigger,
  Content,
  Item,
  CheckboxItem,
  RadioItem,
  Label,
  Separator,
  ItemIndicator,
  RightSlot,
});
