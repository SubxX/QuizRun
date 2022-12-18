import * as RUIDialog from '@radix-ui/react-dialog';
import { styled } from '../../theme/stitches.config';
import { AiOutlineClose } from 'react-icons/ai';
import { UIIconButton } from '../Button';
import { fadeIn, fadeOut, contentShow } from '../../animations/animations';
import { UIBox } from '../Box';
import { ReactNode, forwardRef } from 'react';

const DialogContent = styled(RUIDialog.Content, {
  backgroundColor: '$blackish',
  borderRadius: '$lg',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: '$5',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  spaceY: '$3',
  '&:focus': { outline: 'none' },
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

export const Content = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children, ...props }, forwardedRef) => (
    <RUIDialog.Portal>
      <DialogOverlay />
      <DialogContent {...props} ref={forwardedRef}>
        {children}
      </DialogContent>
    </RUIDialog.Portal>
  )
);

type HeaderProps = {
  title: string;
  description?: string;
  closeButton?: boolean;
};
const Header = ({ title, description, closeButton = true }: HeaderProps) => (
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
      <RUIDialog.Close asChild>
        <UIIconButton aria-label="Close" rounded css={{ flex: 'none' }}>
          <AiOutlineClose />
        </UIIconButton>
      </RUIDialog.Close>
    )}
  </UIBox>
);

export default Object.assign(Dialog, { Trigger, Header, Content });
