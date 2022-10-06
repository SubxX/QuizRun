import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout, AuthLayout } from './layouts';
import Dashboard from './pages/dashbaord';
import Signin from './pages/signin';
import Signup from './pages/signup';

function App() {
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

// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
{
  /* <DropdownMenu.Root>
<DropdownMenu.Trigger asChild>
  <button>Open</button>
</DropdownMenu.Trigger>

<DropdownMenu.Content className="bg-blue-500 text-white shadow-xl p-2 rounded-md w-[200px] dropdown">
  <DropdownMenu.Item>Test</DropdownMenu.Item>
  <DropdownMenu.Item>Test 2</DropdownMenu.Item>
  <DropdownMenu.Item>Test 3</DropdownMenu.Item>
  <DropdownMenu.Arrow className="fill-blue-500" offset={12} />
</DropdownMenu.Content>
</DropdownMenu.Root> */
}
