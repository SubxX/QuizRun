import {
  forwardRef,
  HTMLProps,
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useRef,
} from 'react';
import { UILabel } from '../';
import Adornment from './Adornment';
import { styled } from '../../theme/stitches.config';
import { UIBox } from '../Box';

export const StyledInput = styled('input', {
  $$wh: '255, 255, 255',
  display: 'block',
  fontSize: '$sm',
  padding: '$2 $4',
  outline: 'none',
  border: '1px solid rgba($$wh,0.3)',
  borderRadius: '$md',
  background: '#6060601f',
  width: '100%',
  '&::placeholder': {
    color: 'rgba($$wh,0.3)',
  },
  '&:focus': {
    boxShadow: '0 0 0 3px #333',
    borderColor: '#707070',
  },
});

type Props = HTMLProps<HTMLInputElement> & {
  label?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { id, label, className, startAdornment, endAdornment, ...rest } = props;

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
    <UIBox>
      {Boolean(label) && <UILabel htmlFor={id}>{label}</UILabel>}
      <UIBox css={{ position: 'relative' }}>
        {Boolean(startAdornment) && (
          <Adornment ref={startAdornmentRef} css={{ left: '$2' }}>
            {startAdornment}
          </Adornment>
        )}
        <StyledInput {...rest} ref={inputRef} />
        {Boolean(endAdornment) && (
          <Adornment ref={endAdornmentRef} css={{ right: '$2' }}>
            {endAdornment}
          </Adornment>
        )}
      </UIBox>
    </UIBox>
  );
});

export default Input;
