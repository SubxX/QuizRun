import { UIBox, UIText, UIIconButton, UIFlexBox } from '@quizrun/ui';
import { ReactNode } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  backButton?: boolean;
};

const Header = ({ subtitle, title, backButton, actions }: Props) => {
  const navigate = useNavigate();

  return (
    <UIFlexBox as="header" gap="3" items="center" css={{ marginBottom: '$8' }}>
      {backButton && (
        <UIIconButton
          onClick={navigate.bind(this, -1)}
          css={{ alignSelf: 'flex-start' }}
        >
          <IoIosArrowBack />
        </UIIconButton>
      )}

      <UIBox css={{ flex: 1 }}>
        <UIText as="h4" fontSize="2xl" weight="medium" className="truncate">
          {title}
        </UIText>
        {Boolean(subtitle) && (
          <UIText as="p" fontSize="sm" color="white-muted">
            {subtitle}
          </UIText>
        )}
      </UIBox>

      {Boolean(actions) && actions}
    </UIFlexBox>
  );
};

export default Header;
