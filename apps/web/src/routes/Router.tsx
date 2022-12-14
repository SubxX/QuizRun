import { Navigate, useRoutes } from 'react-router-dom';
import { DashboardLayout, AuthLayout } from '../layouts';
import OrganizationDetails from '../pages/organization-details';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Organizations from '../pages/organizations';
import EmailConfirmed from '@web/pages/email-confirmed';
import NotFoundPage from '@web/pages/404';
import QuizDetailsTeacher from '@web/pages/quiz-details-teacher';

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Organizations /> },
        { path: 'organization/:id', element: <OrganizationDetails /> },
        { path: 'email-confirmed', element: <EmailConfirmed /> },
        { path: 'quiz-details/:id', element: <QuizDetailsTeacher /> },
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
      element: <NotFoundPage />,
    },
  ]);
  return routes;
};

export default Router;
