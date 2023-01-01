import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { UIBox } from '@quizrun/ui';
import { useEffect } from 'react';
import { useUserStore } from '@web/store/user.store';
import ErrorView from './components/ErrorView';
import useInitilzer from './hooks/useInitilzer';

const DashboardLayout = () => {
  const { loading, error, checkSession, user } = useUserStore();
  const { initlize } = useInitilzer();

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (user?.id) initlize();
  }, [user]);

  if (loading) return <p>Loading</p>;
  if (error?.message === '401') return <Navigate to="/auth/signin" />;
  if (error) return <ErrorView />;

  return (
    <UIBox css={{ height: '100vh', display: 'flex' }}>
      <Sidebar />
      <UIBox as="main" css={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </UIBox>
    </UIBox>
  );
};

export default DashboardLayout;
