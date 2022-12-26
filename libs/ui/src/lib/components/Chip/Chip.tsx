import { forwardRef } from 'react';
import { styled } from '../../theme/stitches.config';
import { ComponentProps } from '@stitches/react';
import { BsCheck2 } from 'react-icons/bs';

const StyledChip = styled('div', {
  background: 'rgba(96, 96, 96,0.15)',
  fontSize: '$xs',
  borderRadius: '$full',
  padding: '$1 $3',
  color: '$white-muted',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  spaceX: '$1',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 3px #333',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: 'rgba(96, 96, 96,0.5)',
        color: '$white',
      },
    },
  },
});

type ChipProps = ComponentProps<typeof StyledChip> & {
  selected?: boolean;
  as?: string;
};

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ children, selected, ...rest }, ref) => {
    return (
      <StyledChip {...rest} ref={ref} tabIndex={0} role="button">
        {selected && <BsCheck2 size={16} />}
        <span>{children}</span>
      </StyledChip>
    );
  }
);

export default Chip;
