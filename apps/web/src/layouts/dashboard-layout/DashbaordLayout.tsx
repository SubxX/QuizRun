import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { UIBox } from '@quizrun/ui';

const DashboardLayout = () => {
  return (
    <UIBox css={{ height: '100vh', display: 'flex', overflowY: 'auto' }}>
      <Sidebar />
      <UIBox as="main" css={{ flex: 1 }}>
        <Outlet />
      </UIBox>
    </UIBox>
  );
};

export default DashboardLayout;
