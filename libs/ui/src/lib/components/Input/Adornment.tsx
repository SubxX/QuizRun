import { forwardRef, HTMLProps } from 'react';
import { VariantProps } from 'cva';
import { adornmentStyles } from './styles';

interface AdornmentProps
  extends HTMLProps<HTMLDivElement>,
    VariantProps<typeof adornmentStyles> {}

const Adornment = forwardRef<HTMLDivElement, AdornmentProps>(
  ({ children, className, intent }, ref) => {
    return (
      <div className={adornmentStyles({ class: className, intent })} ref={ref}>
        {children}
      </div>
    );
  }
);

export default Adornment;
