import { IconType } from 'react-icons';
import { styled } from '../../theme/stitches.config';
import { UIBox } from '../Box';
import { UIText } from '../Text';

const Card = styled('div', {
  borderRadius: '$lg',
  background: '$blackish',
  border: '1px solid $card',
  paddingTop: '$4',
  paddingBottom: '$4',
  spaceY: '$4',
});

type CardHeaderProps = {
  title: string;
  subtitle: string;
  Icon: IconType;
};
const Header = ({ Icon, title, subtitle }: CardHeaderProps) => {
  return (
    <UIBox css={{ padding: '0 $4' }}>
      <UIBox
        css={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '$xl',
        }}
      >
        {Icon && (
          <UIBox
            rounded="full"
            background="primary"
            css={{
              padding: '$2',
              marginRight: '$3',
            }}
          >
            <Icon size={18} />
          </UIBox>
        )}
        <span>{title}</span>
      </UIBox>
      <UIText fontSize="sm" css={{ marginTop: '$2', opacity: 0.5 }}>
        {subtitle}
      </UIText>
    </UIBox>
  );
};

const Content = styled(UIBox, { padding: '0 $4' });

export default Object.assign(Card, { Header, Content });
