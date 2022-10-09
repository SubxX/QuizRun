import { forwardRef, HTMLProps, ReactNode } from "react";
import cn from "classnames";
import { ImSpinner9 } from "react-icons/im";

type Props = HTMLProps<HTMLButtonElement> & {
  type?: "submit" | "reset" | "button";
  children: ReactNode;
  isRounded?: boolean;
  isLoading?: boolean;
};

const IconButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      type = "button",
      className,
      isRounded,
      isLoading,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const classNames = cn(
      "bg-white bg-opacity-10 w-10 h-10 flex-center transition-colors text-white text-opacity-50",
      isDisabled
        ? "opacity-80 cursor-default pointer-events-none"
        : "hover:bg-opacity-[.15] hover:text-opacity-80",
      isRounded ? "rounded-full" : "rounded-lg",
      className
    );

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={classNames}
        disabled={isDisabled}
      >
        {isLoading ? <ImSpinner9 className="animate-spin" /> : children}
      </button>
    );
  }
);

export default IconButton;
