import { forwardRef, HTMLProps, ReactNode } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { iconButtonStyles } from './styles';
import { VariantProps } from 'cva';

type Props = HTMLProps<HTMLButtonElement> &
  VariantProps<typeof iconButtonStyles> & {
    type?: 'submit' | 'reset' | 'button';
    children: ReactNode;
    loading?: boolean;
  };

const IconButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    children,
    type = 'button',
    className,
    rounded,
    loading,
    disabled,
    ...rest
  } = props;
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={iconButtonStyles({
        class: className,
        disabled: isDisabled,
        rounded,
      })}
      disabled={isDisabled}
    >
      {loading ? <ImSpinner9 className="animate-spin" /> : children}
    </button>
  );
});

export default IconButton;
