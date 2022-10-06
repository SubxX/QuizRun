import { forwardRef } from "react";
import { HTMLProps } from "react";

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  variant?: "primary";
  type?: "submit" | "reset" | "button";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", children, className, type = "button", ...rest },
    ref
  ) => (
    <button
      {...rest}
      type={type}
      ref={ref}
      className={`ui-button ${variant} ${className}`}
    >
      {children}
    </button>
  )
);

export default Button;
