import { pulse } from '../../animations/animations';
import { styled } from '../../theme/stitches.config';

const Box = styled('div', {
  variants: {
    rounded: {
      full: {
        borderRadius: '$full',
      },
      lg: {
        borderRadius: '$lg',
      },
    },
    background: {
      primary: {
        background: '$primary',
      },
      blakish: {
        background: '$blackish',
      },
    },
    loading: {
      true: {
        opacity: 0.5,
        animation: `1020ms linear ${pulse} infinite`,
        background: '$blackish',
        borderRadius: '$lg',
      },
    },
  },
});

export default Box;
