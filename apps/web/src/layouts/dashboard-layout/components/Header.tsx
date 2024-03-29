import { UIBox, UIText, UIIconButton, UIFlexBox, config } from '@quizrun/ui';
import { ReactNode } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { CSS } from '@stitches/react';

type Props = {
  title: string;
  subtitle?: string;
  actions?: ReactNode | null;
  backButton?: boolean;
  css?: CSS<typeof config>;
  isSticky?: boolean;
};

const stickyStyles = {
  background: '$dark',
  padding: '$4 0',
  marginBottom: '$5',
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 1,
  borderBottom: '1px solid rgba($white-rgb,0.1)',
};

const Header = ({
  subtitle,
  title,
  backButton,
  actions,
  css = {},
  isSticky,
}: Props) => {
  const navigate = useNavigate();

  return (
    <UIFlexBox
      as="header"
      gap="3"
      items="center"
      css={{ marginBottom: '$8', ...(isSticky ? stickyStyles : {}), ...css }}
    >
      {backButton && (
        <UIIconButton
          onClick={navigate.bind(this, -1)}
          css={{ alignSelf: 'flex-start', flex: 'none' }}
        >
          <IoIosArrowBack />
        </UIIconButton>
      )}

      <UIBox css={{ flex: 1 }}>
        <UIText
          as="h4"
          fontSize="lg"
          weight="medium"
          className="truncate"
          css={{
            whiteSpace: 'normal',
            '@md': { fontSize: '$2xl' },
          }}
        >
          {title}
        </UIText>
        {Boolean(subtitle) && (
          <UIText as="p" fontSize="sm" color="white-muted">
            {subtitle}
          </UIText>
        )}
      </UIBox>

      {Boolean(actions) && (
        <UIFlexBox css={{ alignSelf: 'flex-start', flex: 'none' }} gap="2">
          {actions}
        </UIFlexBox>
      )}
    </UIFlexBox>
  );
};

export default Header;
