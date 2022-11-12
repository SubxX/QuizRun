import { styled } from '../../theme/stitches.config';

const Adornment = styled('div', {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
  opacity: 0.5,
});

export default Adornment;
