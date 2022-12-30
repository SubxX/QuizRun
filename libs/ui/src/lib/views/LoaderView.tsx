import { UIBox, UIText } from '../components';
import { ComponentProps } from '@stitches/react';
import { rotate } from '../animations/animations';
import { ImSpinner9 } from 'react-icons/im';

type Props = ComponentProps<typeof UIBox> & { text?: string };

const LoaderView = ({ text, css, ...rest }: Props) => {
  return (
    <UIBox
      className="h-full flex-center"
      css={{ spaceX: '$3', ...css }}
      {...rest}
    >
      <UIText color="white-muted">{text ?? 'Loading'}</UIText>
      <ImSpinner9
        display="block"
        style={{ animation: `${rotate} 1s linear infinite` }}
      />
    </UIBox>
  );
};

export default LoaderView;
