import {
  forwardRef,
  HTMLProps,
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useRef,
} from 'react';
import { inputStyles } from './styles';
import { UILabel } from '../';
import Adornment from './Adornment';

type Props = HTMLProps<HTMLInputElement> & {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    id,
    containerClassName,
    label,
    labelClassName,
    className,
    startAdornment,
    endAdornment,
    ...rest
  } = props;

  const _ref = useRef<HTMLInputElement>(null);
  const inputRef = (ref ?? _ref) as MutableRefObject<HTMLInputElement>;

  const startAdornmentRef = useRef<HTMLDivElement>(null);
  const endAdornmentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const width = (startAdornmentRef.current?.offsetWidth || 0) + 16;
    if (inputRef.current) inputRef.current.style.paddingLeft = `${width}px`;
  }, [startAdornment]);

  useLayoutEffect(() => {
    const width = (endAdornmentRef.current?.offsetWidth || 0) + 16;
    if (inputRef.current) inputRef.current.style.paddingRight = `${width}px`;
  }, [endAdornmentRef]);

  return (
    <div className={`${containerClassName ?? ''}`}>
      {Boolean(label) && (
        <UILabel htmlFor={id} className={labelClassName}>
          {label}
        </UILabel>
      )}
      <div className="relative">
        {Boolean(startAdornment) && (
          <Adornment ref={startAdornmentRef} intent="start">
            {startAdornment}
          </Adornment>
        )}
        <input
          {...rest}
          ref={inputRef}
          className={inputStyles({ class: className })}
        />
        {Boolean(endAdornment) && (
          <Adornment ref={endAdornmentRef} intent="end">
            {endAdornment}
          </Adornment>
        )}
      </div>
    </div>
  );
});

export default Input;
