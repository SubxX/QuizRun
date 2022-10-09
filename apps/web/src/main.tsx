import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';

ReactDOM.render(
  <React.StrictMode>
    <TooltipProvider delayDuration={200}>
      <App />
    </TooltipProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
