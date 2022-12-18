import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { UIBox } from '@quizrun/ui';
import { useEffect } from 'react';
import { useUserStore } from '@web/store/user.store';
import ErrorView from './components/ErrorView';

const DashboardLayout = () => {
  const { loading, error, checkSession } = useUserStore();

  useEffect(() => {
    checkSession();
  }, []);

  if (error?.message === '401') return <Navigate to="/auth/signin" />;
  if (error) return <ErrorView />;
  if (loading) return <p>Loading</p>;

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
