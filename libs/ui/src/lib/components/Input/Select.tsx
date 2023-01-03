import { forwardRef, ReactNode } from 'react';
import * as RUISelect from '@radix-ui/react-select';
import { styled } from '@stitches/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { UIBox } from '../Box';
import { UILabel } from '../Label';
import { TbAlertOctagon } from 'react-icons/tb';
import { ToolTip } from '../Tooltip';

const SelectContent = styled(RUISelect.Content, {
  overflow: 'hidden',
  backgroundColor: '#333',
  border: '1px solid $blackish',
  borderRadius: '$lg',
  padding: '$1',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  zIndex: 4,
});

const ViewPort = styled(RUISelect.Viewport, { padding: 5 });

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  color: '#fff',
  cursor: 'default',
};

const SelectScrollUpButton = styled(
  RUISelect.ScrollUpButton,
  scrollButtonStyles
);

const SelectScrollDownButton = styled(
  RUISelect.ScrollDownButton,
  scrollButtonStyles
);

const SelectTrigger = styled(RUISelect.SelectTrigger, {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '$2 $4',
  fontSize: '$sm',
  borderRadius: '$md',
  gap: 5,
  background: '#6060601f',
  border: '1px solid rgba($white-rgb,0.3)',
  width: '100%',
  '&::placeholder': {
    color: 'rgba($white-rgb,0.3)',
  },
  '&:focus': {
    boxShadow: '0 0 0 3px #333',
    borderColor: '#707070',
  },
  '&[data-placeholder]': { color: 'rgba($white-rgb,0.3)' },
  '&[aria-invalid="true"]': {
    borderColor: '$error',
    paddingRight: '$2',
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

const SelectIcon = styled(RUISelect.SelectIcon, { display: 'flex' });

const StyledItemIndicator = styled(RUISelect.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledItem = styled(RUISelect.Item, {
  fontSize: 12,
  lineHeight: 1,
  color: '$white-muted',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    opacity: '0.5',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$primary',
    color: '#fff',
  },
});

// Key components
const Select = RUISelect.Root;

type TriggerProps = RUISelect.SelectTriggerProps & {
  label?: string;
  error?: string;
};
const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ label, placeholder, error, ...rest }, forwardedRef) => (
    <UIBox>
      {Boolean(label) && <UILabel>{label}</UILabel>}

      <SelectTrigger
        aria-invalid={Boolean(error)}
        aria-label={label}
        ref={forwardedRef}
        {...rest}
      >
        <UIBox css={{ flex: 1, textAlign: 'left' }}>
          <RUISelect.Value placeholder={placeholder} />
        </UIBox>
        <SelectIcon>
          <AiOutlineCaretDown size={14} />
        </SelectIcon>
        {Boolean(error) && (
          <ToolTip title={error} align="center" side="bottom">
            <UIBox css={{ display: 'inline-flex', color: '$error' }}>
              <TbAlertOctagon />
            </UIBox>
          </ToolTip>
        )}
      </SelectTrigger>
    </UIBox>
  )
);

const Content = ({ children }: { children: ReactNode }) => (
  <RUISelect.Portal>
    <SelectContent>
      <SelectScrollUpButton>
        <BiChevronUp />
      </SelectScrollUpButton>
      <ViewPort>{children}</ViewPort>
      <SelectScrollDownButton>
        <BiChevronDown />
      </SelectScrollDownButton>
    </SelectContent>
  </RUISelect.Portal>
);

const Item = forwardRef<HTMLDivElement, RUISelect.SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <StyledItem {...props} ref={forwardedRef}>
        <RUISelect.ItemText>{children}</RUISelect.ItemText>
        <StyledItemIndicator>
          <AiOutlineCheck />
        </StyledItemIndicator>
      </StyledItem>
    );
  }
);

const Group = RUISelect.Group;

const Label = styled(RUISelect.Label, {
  padding: '0 25px',
  fontSize: 12,
  lineHeight: '25px',
  color: '$white-muted',
});

const Separator = styled(RUISelect.Separator, {
  height: 1,
  backgroundColor: 'rgba($white-rgb,0.15)',
  margin: 5,
});

export default Object.assign(Select, {
  Trigger,
  Content,
  Item,
  Group,
  Label,
  Separator,
});
