import { Navigate, useRoutes } from 'react-router-dom';
import { DashboardLayout, AuthLayout } from '../layouts';
import OrganizationDetails from '../pages/organization-details';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Organizations from '../pages/organizations';
import EmailConfirmed from '@web/pages/email-confirmed';
import NotFoundPage from '@web/pages/404';
import TakeQuiz from '@web/pages/take-quiz';
import QuizLeaderboard from '@web/pages/quiz-leaderboard';
import AllQuizes from '@web/pages/quizes';
import ChangePassword from '@web/pages/change-password';

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <AllQuizes /> },
        { path: 'organizations', element: <Organizations /> },
        { path: 'organization/:id', element: <OrganizationDetails /> },
        { path: 'quiz/:id', element: <TakeQuiz /> },
        { path: 'quiz/:id/leaderboard', element: <QuizLeaderboard /> },
        { path: 'change-password', element: <ChangePassword /> },
      ],
    },
    {
      path: 'auth',
      element: <AuthLayout />,
      children: [
        { index: true, element: <Navigate to="/auth/signin" replace /> },
        { path: 'signin', element: <Signin /> },
        { path: 'signup', element: <Signup /> },
        { path: 'email-confirmed', element: <EmailConfirmed /> },
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
