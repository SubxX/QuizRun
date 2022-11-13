import { Navigate, useRoutes } from 'react-router-dom';
import { DashboardLayout, AuthLayout } from '../layouts';
import OrganizationDetails from '../pages/organization-details';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Organizations from '../pages/organizations';

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Organizations /> },
        { path: 'organization/:id', element: <OrganizationDetails /> },
      ],
    },
    {
      path: 'auth',
      element: <AuthLayout />,
      children: [
        { index: true, element: <Navigate to="/auth/signin" replace /> },
        { path: 'signin', element: <Signin /> },
        { path: 'signup', element: <Signup /> },
      ],
    },
    {
      path: '*',
      element: <p>404</p>,
    },
  ]);
  return routes;
};

export default Router;
