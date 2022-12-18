import { forwardRef } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { styled } from '../../theme/stitches.config';
import { ComponentProps } from '@stitches/react';
import { UIBox } from '../Box';
import { rotate } from '../../animations/animations';

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
  cursor: 'pointer',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '&:focus': {
    boxShadow: '0 0 0 3px #333',
  },
  variants: {
    color: {
      primary: {
        backgroundColor: '$primary',
        color: '$white',
      },
      danger: {
        backgroundColor: 'rgba(205, 43, 48, 0.1)',
        color: 'rgb(205, 43, 49)',
        '&:focus': {
          boxShadow: '0 0 0 3px rgba(205, 43, 49,0.4)',
        },
      },
      light: {
        backgroundColor: 'rgba($white-rgb,0.1)',
        color: '$white',
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
        {loading && (
          <UIBox
            css={{
              marginRight: '$2',
              transformOrigin: 'center',
              animation: `${rotate} 1s linear infinite`,
            }}
          >
            <ImSpinner9 display="block" />
          </UIBox>
        )}
        {children}
      </StyledButton>
    );
  }
);

export default Button;
