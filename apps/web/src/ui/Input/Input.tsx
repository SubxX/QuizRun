import { forwardRef, HTMLProps } from "react";

type Props = HTMLProps<HTMLInputElement> & {
  label?: string;
  containerClassname?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, containerClassname, label, ...rest }, ref) => (
    <div className={`relative ${containerClassname}`}>
      {Boolean(label) && (
        <label className="text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      <input {...rest} ref={ref} />
    </div>
  )
);

export default Input;
