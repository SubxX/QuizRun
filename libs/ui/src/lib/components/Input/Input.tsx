import {
  forwardRef,
  HTMLProps,
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useRef,
} from 'react';
import { ToolTip, UILabel } from '../';
import Adornment from './Adornment';
import { styled } from '../../theme/stitches.config';
import { UIBox } from '../Box';
import { TbAlertOctagon } from 'react-icons/tb';

export const StyledInput = styled('input', {
  display: 'block',
  fontSize: '$sm',
  padding: '$2 $4',
  outline: 'none',
  border: '1px solid rgba($white-rgb,0.3)',
  borderRadius: '$md',
  background: '#6060601f',
  width: '100%',
  '&::placeholder': {
    color: 'rgba($white-rgb,0.3)',
  },
  '&:focus': {
    boxShadow: '0 0 0 3px #333',
    borderColor: '#707070',
  },
  '&[aria-invalid="true"]': {
    borderColor: '$error',
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

type Props = HTMLProps<HTMLInputElement> & {
  label?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { id, label, className, startAdornment, endAdornment, error, ...rest } =
    props;

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
  }, [endAdornment]);

  return (
    <UIBox>
      {Boolean(label) && <UILabel htmlFor={id}>{label}</UILabel>}
      <UIBox css={{ position: 'relative' }}>
        {Boolean(startAdornment) && (
          <Adornment ref={startAdornmentRef} css={{ left: '$2' }}>
            {startAdornment}
          </Adornment>
        )}
        <StyledInput aria-invalid={Boolean(error)} {...rest} ref={inputRef} />

        <Adornment ref={endAdornmentRef} css={{ right: '$2' }}>
          {endAdornment}
          {Boolean(error) && (
            <ToolTip title={error} align="center" side="bottom">
              <UIBox css={{ display: 'inline-flex', color: '$error' }}>
                <TbAlertOctagon />
              </UIBox>
            </ToolTip>
          )}
        </Adornment>
      </UIBox>
    </UIBox>
  );
});

export default Input;
