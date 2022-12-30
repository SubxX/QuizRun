import { forwardRef } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { styled } from '../../theme/stitches.config';
import { ComponentProps } from '@stitches/react';
import { rotate } from '../../animations/animations';

const StyledIconButton = styled('button', {
  background: 'rgba($white-rgb,0.1)',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgb($white-rgb,0.5)',
  transition: 'color 0.25s ease',
  cursor: 'pointer',
  '&:not(:disabled):hover,&:not(:disabled):focus': {
    background: 'rgba($white-rgb,0.15)',
    color: 'rgba($white-rgb,0.8)',
  },
  '&:disabled': {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
  variants: {
    rounded: {
      true: {
        borderRadius: '$full',
      },
      false: {
        borderRadius: '$lg',
      },
    },
    size: {
      base: {
        width: 40,
        height: 40,
      },
      sm: {
        width: 30,
        height: 30,
      },
    },
  },
  defaultVariants: {
    rounded: false,
    size: 'base',
  },
});

type Props = ComponentProps<typeof StyledIconButton> & { loading?: boolean };

const IconButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, loading, disabled, ...rest } = props;
  const isDisabled = disabled || loading;

  return (
    <StyledIconButton {...rest} ref={ref} disabled={isDisabled}>
      {loading ? (
        <ImSpinner9
          size={16}
          style={{ animation: `${rotate} 1s linear infinite` }}
        />
      ) : (
        children
      )}
    </StyledIconButton>
  );
});

export default IconButton;
