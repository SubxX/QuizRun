import * as RUIDialog from '@radix-ui/react-dialog';
import { styled } from '../../theme/stitches.config';
import { AiOutlineClose } from 'react-icons/ai';
import { UIIconButton } from '../Button';
import {
  fadeIn,
  fadeOut,
  contentShow,
  slideInFromLeft,
  slideOutToLeft,
} from '../../animations/animations';
import { UIBox } from '../Box';
import { ReactNode, forwardRef } from 'react';
import { VariantProps } from '@stitches/react';

const DialogContent = styled(RUIDialog.Content, {
  backgroundColor: '$blackish',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  animationDuration: '150ms',
  '&:focus': { outline: 'none' },

  variants: {
    drawer: {
      true: {
        willChange: 'transform',
        width: '100%',
        height: '100vh',
        top: 0,
        right: 0,
        '@media(min-width:500px)': {
          width: 400,
        },
        '&[data-state="open"]': {
          animationName: `${slideInFromLeft}`,
        },
        '&[data-state="closed"]': {
          animationName: `${slideOutToLeft}`,
        },
      },
      false: {
        width: '90vw',
        maxWidth: '400px',
        maxHeight: '85vh',
        padding: '$5',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animationName: `${contentShow}`,
        spaceY: '$3',
        overflowY: 'auto',
        borderRadius: '$lg',
      },
    },
  },
  defaultVariants: {
    drawer: false,
  },
});

const DialogTitle = styled(RUIDialog.Title, { fontSize: '$2xl' });
const DialogDescription = styled(RUIDialog.Description, {
  color: '$light-white',
  fontSize: '$sm',
  marginTop: '$1',
});

const DialogOverlay = styled(RUIDialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0,0.60)',
  position: 'fixed',
  inset: 0,
  '&[data-state="open"]': {
    animation: `${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const Dialog = RUIDialog.Root;
const Trigger = RUIDialog.Trigger;
const Close = RUIDialog.Close;

export const Content = forwardRef<
  HTMLDivElement,
  { children: ReactNode } & VariantProps<typeof DialogContent>
>(({ children, ...props }, forwardedRef) => (
  <RUIDialog.Portal>
    <DialogOverlay />
    <DialogContent {...props} ref={forwardedRef}>
      {children}
    </DialogContent>
  </RUIDialog.Portal>
));

type HeaderProps = {
  title: string;
  description?: string;
  closeButton?: boolean;
};
const Header = ({ title, description, closeButton = false }: HeaderProps) => (
  <UIBox
    css={{
      display: 'flex',
      justifyContent: 'space-between',
      spaceX: '$2',
    }}
  >
    <div>
      <DialogTitle>{title}</DialogTitle>
      {Boolean(description) && (
        <DialogDescription>{description}</DialogDescription>
      )}
    </div>
    {closeButton && (
      <Close asChild>
        <UIIconButton aria-label="Close" rounded css={{ flex: 'none' }}>
          <AiOutlineClose />
        </UIIconButton>
      </Close>
    )}
  </UIBox>
);

export default Object.assign(Dialog, { Trigger, Header, Content });
