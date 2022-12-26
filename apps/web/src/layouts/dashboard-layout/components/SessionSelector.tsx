import { styled } from '@quizrun/ui';

const StyledSessionSelector = styled('button', {
  height: '48px',
  width: '48px',
  position: 'relative',
  cursor: 'pointer',
  background: 'rgba($white-rgb,0.1)',
  borderRadius: '$full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

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
  '&[data-active="true"]': {
    borderRadius: '$2xl',
    cursor: 'default',
    background: '$primary',
    '&::after': {
      width: '4px',
    },
  },
  '&:hover': {
    background: '$primary',
    borderRadius: '$2xl',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.8,
  },
});

export default StyledSessionSelector;
