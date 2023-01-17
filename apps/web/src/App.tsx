import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { globalStyles } from '@quizrun/ui';
import useAuthListener from './hooks/useAuthListener';

// All initlizer related hooks goes here
const Initilizer = () => {
  useAuthListener();
  return null;
};

function App() {
  globalStyles();

  return (
    <BrowserRouter>
      <Initilizer />
      <Router />
    </BrowserRouter>
  );
}

export default App;
