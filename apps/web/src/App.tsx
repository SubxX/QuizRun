import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout, AuthLayout } from './layouts';
import Dashboard from './pages/dashbaord';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { globalStyles } from '@quizrun/ui';

function App() {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<p>Home</p>} />

        <Route element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
