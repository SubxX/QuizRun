import { styled } from '../../theme/stitches.config';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { UIButton } from '../Button';
import { UIFlexBox } from '../Box';
import { ReactNode } from 'react';
import {
  fadeIn,
  fadeOut,
  contentShow,
  contentHide,
} from '../../animations/animations';
import useBoolean from '../../hooks/useBoolean';

const AlertDialogOverlay = styled(RadixAlertDialog.Overlay, {
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

const AlertDialogContent = styled(RadixAlertDialog.Content, {
  backgroundColor: '$blackish',
  borderRadius: '$lg',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: '$5',
  '&:focus': { outline: 'none' },
  '&[data-state="open"]': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${contentHide} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const AlertDialogTitle = styled(RadixAlertDialog.Title, {
  margin: 0,
  color: '$white',
  fontSize: '$lg',
  fontWeight: '$bold',
});

const AlertDialogDescription = styled(RadixAlertDialog.Description, {
  margin: '$2 0 $4 0',
  color: '$white-muted',
  fontSize: '$sm',
});

type Props = {
  children: ReactNode;
  onResolve?: () => void;
  onReject?: () => void;
  title?: string;
  subtitle?: string;
  extraContent?: any;
};

const AlertDialog = ({
  children,
  onResolve,
  onReject,
  extraContent,
  title,
  subtitle,
}: Props) => {
  const { value: open, set: setOpen } = useBoolean(); // Alert Dialog state
  const { value: loading, set: setLoading } = useBoolean(); // Resolve function loading state

  const closeDialog = () => {
    if (loading) return;
    setOpen(false);
  };

  const resolve = async () => {
    try {
      setLoading(true);
      await onResolve?.();
      closeDialog();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RadixAlertDialog.Root open={open} onOpenChange={setOpen}>
      <RadixAlertDialog.Trigger asChild>{children}</RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal>
        <AlertDialogOverlay onClick={closeDialog} />
        <AlertDialogContent>
          <AlertDialogTitle>
            {title ?? 'Are you absolutely sure?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {subtitle ?? 'You are about to perform this action'}
          </AlertDialogDescription>
          {extraContent}
          <UIFlexBox justify="end" gap={3}>
            <RadixAlertDialog.Cancel asChild disabled={loading}>
              <UIButton onClick={onReject} color="light">
                Cancel
              </UIButton>
            </RadixAlertDialog.Cancel>

            <UIButton onClick={resolve} color="danger" loading={loading}>
              Yes confirm!
            </UIButton>
          </UIFlexBox>
        </AlertDialogContent>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};

export default AlertDialog;
