import * as RadixSeparator from '@radix-ui/react-separator';
import { styled } from '../../theme/stitches.config';

const Separator = styled(RadixSeparator.Root, {
  backgroundColor: 'rgba($white-rgb,0.15)',
  '&[data-orientation="horizontal"]': {
    height: '1px',
    width: '100%',
  },
  '&[data-orientation="vertical"]': {
    height: '100%',
    width: '1px',
  },
});

export default Separator;
