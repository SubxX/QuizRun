import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Router from './routes/Router';
import { globalStyles } from '@quizrun/ui';

function App() {
  globalStyles();

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
