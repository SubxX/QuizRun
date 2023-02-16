import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { Dialog as DialogRoot } from '@radix-ui/react-dialog';
import { QueryClientProvider } from 'react-query';
import { NotificationsProvider } from 'reapop';
import { queryClient } from '@web/modules/queryClient';

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider>
        <DialogRoot>
          <TooltipProvider delayDuration={200}>
            <App />
          </TooltipProvider>
        </DialogRoot>
      </NotificationsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
