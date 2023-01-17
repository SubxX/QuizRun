import { Navigate, Outlet } from 'react-router-dom';
import { UIBox } from '@quizrun/ui';
import { AUTH_TOKEN_KEY } from '@web/supabase/supabaseClient';

const AuthLayout = () => {
  const user = localStorage.getItem(AUTH_TOKEN_KEY);
  if (user) return <Navigate to="/" />;

  return (
    <UIBox css={{ minHeight: '100vh', padding: '$4' }} className="flex-center">
      <Outlet />
    </UIBox>
  );
};

export default AuthLayout;
