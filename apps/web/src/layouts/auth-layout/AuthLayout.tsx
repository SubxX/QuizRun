import { Navigate, Outlet } from 'react-router-dom';
import { UIBox } from '@quizrun/ui';
import { useUserStore } from '@web/store/user.store';

const AuthLayout = () => {
  const { user } = useUserStore();
  if (user) return <Navigate to="/" />;

  return (
    <UIBox css={{ minHeight: '100vh', padding: '$4' }} className="flex-center">
      <Outlet />
    </UIBox>
  );
};

export default AuthLayout;
