import { forwardRef, HTMLProps } from 'react';
import cn from 'classnames';

type Props = HTMLProps<HTMLInputElement> & {
  label?: string;
  containerClassname?: string;
  labelClassName?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, containerClassname, label, labelClassName, ...rest }, ref) => {
    const labelClassNames = cn(
      'text-white text-opacity-30 mb-1.5 block text-sm',
      labelClassName
    );
    return (
      <div className={`relative ${containerClassname}`}>
        {Boolean(label) && (
          <label htmlFor={id} className={labelClassNames}>
            {label}
          </label>
        )}
        <input {...rest} ref={ref} />
      </div>
    );
  }
);

export default Input;
