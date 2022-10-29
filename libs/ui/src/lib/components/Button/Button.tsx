import { forwardRef } from 'react';
import { HTMLProps } from 'react';
import { buttonStyles } from './styles';
import { VariantProps } from 'cva';
import { ImSpinner9 } from 'react-icons/im';

type ButtonProps = HTMLProps<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    type?: 'submit' | 'reset' | 'button';
    loading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      type = 'button',
      intent,
      disabled,
      loading,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        {...rest}
        type={type}
        ref={ref}
        className={buttonStyles({
          class: className,
          intent,
          disabled: isDisabled,
        })}
      >
        {loading && <ImSpinner9 className="animate-spin text-white" />}
        {children}
      </button>
    );
  }
);

export default Button;
