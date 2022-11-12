import { Outlet } from 'react-router-dom';
import { UIBox } from '@quizrun/ui';

const AuthLayout = () => {
  return (
    <UIBox css={{ minHeight: '100vh', padding: '$4' }} className="flex-center">
      <Outlet />
    </UIBox>
  );
};

export default AuthLayout;
