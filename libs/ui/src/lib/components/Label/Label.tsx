import { HTMLProps } from 'react';
import { labelStyles } from './styles';

type Props = HTMLProps<HTMLLabelElement>;

const Label = ({ children, className, ...rest }: Props) => {
  return (
    <label className={labelStyles({ class: className })} {...rest}>
      {children}
    </label>
  );
};

export default Label;
