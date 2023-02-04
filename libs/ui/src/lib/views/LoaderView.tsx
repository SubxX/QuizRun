import { UIBox, UIText } from '../components';
import { ComponentProps } from '@stitches/react';
import { styled } from '../theme/stitches.config';
import { loaderSpin } from '../animations/animations';

const LoaderElement = styled('div', {
  transform: 'rotateZ(45deg)',
  perspective: '1000px',
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  color: '#fff',
  display: 'block',
  userSelect: 'none',
  margin: 'auto',
  '&:before, &:after': {
    content: '',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'inherit',
    height: 'inherit',
    borderRadius: '50%',
    transform: 'rotateX(70deg)',
    animation: `1s ${loaderSpin} linear infinite`,
  },
  '&:after': {
    color: '$primary',
    transform: 'rotateY(70deg)',
    animationDelay: '0.4s',
  },
});

type Props = ComponentProps<typeof UIBox> & { text?: string };

const LoaderView = ({ text, css, ...rest }: Props) => {
  return (
    <UIBox
      css={{
        spaceY: '$3',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 5,
        ...css,
      }}
      {...rest}
    >
      <LoaderElement />
      <UIText
        color="white-muted"
        fontSize="xs"
        css={{ letterSpacing: '0.25rem' }}
      >
        {text ?? 'LOADING'}
      </UIText>
    </UIBox>
  );
};

export default LoaderView;
