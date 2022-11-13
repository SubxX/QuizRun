import { styled } from '../../theme/stitches.config';

const Text = styled('p', {
  variants: {
    color: {
      white: {
        color: '$white',
      },
      'custom-white': {
        color: '$custom-white',
      },
      primary: {
        color: '$primary',
      },
      'white-muted': {
        color: '$white-muted',
      },
      'light-white': {
        color: '$light-white',
      },
    },
    fontSize: {
      xs: {
        fontSize: '$xs',
      },
      sm: {
        fontSize: '$sm',
      },
      base: {
        fontSize: '$base',
      },
      lg: {
        fontSize: '$lg',
      },
      xl: {
        fontSize: '$xl',
      },
      '2xl': {
        fontSize: '$2xl',
      },
      '3xl': {
        fontSize: '$3xl',
      },
    },
    font: {
      untitled: {
        fontFamily: '$untitled',
      },
      mono: {
        fontFamily: '$mono',
      },
    },
    weight: {
      medium: {
        fontWeight: '$medium',
      },
      semibold: {
        fontWeight: '$semibold',
      },
      bold: {
        fontWeight: '$bold',
      },
    },
  },
});

export default Text;
