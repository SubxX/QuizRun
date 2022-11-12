import { forwardRef } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { styled } from '../../theme/stitches.config';
import { ComponentProps } from '@stitches/react';

const StyledButton = styled('button', {
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '$sm',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  transition: 'colors 0.25s ease',
  textAlign: 'center',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  variants: {
    color: {
      primary: {
        backgroundColor: '$primary',
        color: '$white',
        '&:disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',
        },
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

type ButtonProps = ComponentProps<typeof StyledButton> & { loading?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, loading, children, ...rest }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <StyledButton {...rest} ref={ref} disabled={isDisabled}>
        {loading && <ImSpinner9 className="animate-spin text-white mr-2" />}
        {children}
      </StyledButton>
    );
  }
);

export default Button;
