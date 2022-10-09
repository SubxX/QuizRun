import { forwardRef } from 'react';
import { HTMLProps } from 'react';
import cn from 'classnames';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  variant?: 'primary';
  type?: 'submit' | 'reset' | 'button';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', children, className, type = 'button', ...rest },
    ref
  ) => {
    const classNames = cn(
      variant === 'primary' &&
        'bg-primary py-2 px-4 rounded-md text-sm text-white truncate text-opacity-80',
      className
    );

    return (
      <button
        {...rest}
        type={type}
        ref={ref}
        className={`ui-button ${classNames}`}
      >
        {children}
      </button>
    );
  }
);

export default Button;
