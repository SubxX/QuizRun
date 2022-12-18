import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { Dialog as DialogRoot } from '@radix-ui/react-dialog';

ReactDOM.render(
  <React.StrictMode>
    <DialogRoot>
      <TooltipProvider delayDuration={200}>
        <App />
      </TooltipProvider>
    </DialogRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
