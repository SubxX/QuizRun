import { styled, UIAvatar } from '@quizrun/ui';
import { ComponentProps } from '@stitches/react';

const SelectorWrapper = styled('div', {
  position: 'relative',
  '&::after': {
    content: '',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: '$white',
    borderRadius: '0 $2xl $2xl 0',
    width: '0px',
    transition: '0.15s ease width',
    height: '80%',
    left: '-$2',
  },
  variants: {
    active: {
      true: {
        '&::after': {
          width: '4px',
        },
      },
    },
  },
});

type SelectorWrapperType = ComponentProps<typeof SelectorWrapper>;

const StyledSessionSelector = ({
  children,
  active,
  ...rest
}: SelectorWrapperType) => {
  return (
    <SelectorWrapper {...rest} active={active}>
      <UIAvatar size="sm" color={active ? 'primary' : 'default'}>
        {children}
      </UIAvatar>
    </SelectorWrapper>
  );
};

export default StyledSessionSelector;
