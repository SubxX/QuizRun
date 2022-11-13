import { styled, theme } from '../../theme/stitches.config';
import Box from './Box';

const gap = Object.values(theme.space).reduce((acc, space) => {
  acc[space.token] = { gap: space.value };
  return acc;
}, {} as any);

const FlexBox = styled(Box, {
  display: 'flex',
  variants: {
    inline: {
      true: {
        display: 'inline-flex',
      },
    },
    justify: {
      around: {
        justifyContent: 'space-around',
      },
      between: {
        justifyContent: 'space-between',
      },
      center: {
        justifyContent: 'center',
      },
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
    },
    items: {
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'end',
      },
      start: {
        alignItems: 'start',
      },
    },
    gap,
  },
});

export default FlexBox;
