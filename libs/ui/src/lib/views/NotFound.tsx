import { ReactNode } from 'react';
import { UIBox, UIText } from '../components';

type Props = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

const NotFoundView = ({ title, description, children }: Props) => (
  <UIBox css={{ spaceY: '$2', textAlign: 'center', maxWidth: '400px' }}>
    <UIText css={{ fontSize: '120px', letterSpacing: '10px', lineHeight: 1 }}>
      {title ?? '404'}
    </UIText>
    <UIText fontSize="sm" color="white-muted">
      {description ??
        `The resource you are trying to access is either doesnot exist or not available for you. We apologize for any inconvenience caused by us.`}
    </UIText>
    {children}
  </UIBox>
);

export default NotFoundView;
