import { styled, theme } from '../../theme/stitches.config';
import Box from './Box';

const columns = new Array(12).fill(null).reduce(
  (acc, _, index) => {
    const col = index + 1;
    acc[col] = { gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` };
    return acc;
  },
  { none: { gridTemplateColumns: 'none' } }
);

const gap = Object.values(theme.space).reduce((acc, space) => {
  acc[space.token] = { gap: space.value };
  return acc;
}, {} as any);

const GridBox = styled(Box, {
  display: 'grid',
  variants: {
    columns,
    gap,
  },
});

export default GridBox;
