import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { LoaderView, UIBox } from '@quizrun/ui';
import ErrorView from './components/ErrorView';
import { useUserQuery } from '@web/queries/auth.queries';

const DashboardLayout = () => {
  const { error, isLoading } = useUserQuery();

  if (isLoading) return <LoaderView />;

  if ((error as Error)?.message === '401')
    return <Navigate to="/auth/signin" />;

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
