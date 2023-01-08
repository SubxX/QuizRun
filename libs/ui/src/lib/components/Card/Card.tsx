import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { styled } from '../../theme/stitches.config';
import { UIBox, UIFlexBox } from '../Box';
import { UIText } from '../Text';

const Card = styled('div', {
  borderRadius: '$lg',
  background: '$blackish',
  border: '1px solid $card',
  paddingTop: '$4',
  paddingBottom: '$4',
  spaceY: '$4',
  variants: {
    hover: {
      true: {
        cursor: 'pointer',
        transition: '0.25s ease transform,box-shadow',
        '&:hover': {
          transform: 'scale(1.015)',
          boxShadow: '0px 0px 33px 0px rgba(0,0,0,0.25)',
        },
      },
    },
  },
});

type CardHeaderProps = {
  title: string;
  subtitle?: string;
  Icon?: IconType;
  actions?: ReactNode;
};
const Header = ({ Icon, title, subtitle, actions }: CardHeaderProps) => {
  return (
    <UIBox css={{ padding: '0 $4' }}>
      <UIFlexBox items="center" css={{ fontSize: '$xl' }} gap={3}>
        {Icon && (
          <UIBox
            rounded="full"
            background="primary"
            css={{
              padding: '$2',
              lineHeight: 0,
              flex: 'none',
            }}
          >
            <Icon size={18} />
          </UIBox>
        )}
        <span className="flex-1">{title}</span>
        {Boolean(actions) && (
          <UIFlexBox gap="2" css={{ flex: 'none' }}>
            {actions}
          </UIFlexBox>
        )}
      </UIFlexBox>
      {Boolean(subtitle) && (
        <UIText fontSize="sm" css={{ marginTop: '$2', opacity: 0.5 }}>
          {subtitle}
        </UIText>
      )}
    </UIBox>
  );
};

const Content = styled(UIBox, { padding: '0 $4' });

export default Object.assign(Card, { Header, Content });
