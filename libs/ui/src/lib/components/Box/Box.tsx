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
  },
});

export default Box;
