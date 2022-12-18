import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Router from './routes/Router';
import { globalStyles } from '@quizrun/ui';
import useAuthListener from './hooks/useAuthListener';

function App() {
  globalStyles();
  useAuthListener();

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
