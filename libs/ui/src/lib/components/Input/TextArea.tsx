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
import { styled, theme } from '../../theme/stitches.config';
import { UIBox } from '../Box';
import { TbAlertOctagon } from 'react-icons/tb';

export const StyledTextarea = styled('textarea', {
  display: 'block',
  fontSize: '$sm',
  padding: '$2',
  outline: 'none',
  border: '1px solid rgba($white-rgb,0.3)',
  borderRadius: '$md',
  background: '#6060601f',
  width: '100%',
  resize: 'none',
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
});

type Props = HTMLProps<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { id, label, className, error, ...rest } = props;

  const _ref = useRef<HTMLTextAreaElement>(null);
  const inputRef = (ref ?? _ref) as MutableRefObject<HTMLTextAreaElement>;

  const endAdornmentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const width = (endAdornmentRef.current?.offsetWidth || 0) + 16;
    if (inputRef.current) inputRef.current.style.paddingRight = `${width}px`;
  }, [error]);

  return (
    <UIBox>
      {Boolean(label) && <UILabel htmlFor={id}>{label}</UILabel>}
      <UIBox css={{ position: 'relative' }}>
        <StyledTextarea
          aria-invalid={Boolean(error)}
          rows={2}
          {...rest}
          ref={inputRef}
        />

        <Adornment
          ref={endAdornmentRef}
          css={{ right: '$2', transform: 'none', top: 'initial', bottom: '$2' }}
        >
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

export default Textarea;
