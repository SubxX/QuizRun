import { HashRouter as RouterRoot } from 'react-router-dom';
import Router from './routes/Router';
import { globalStyles } from '@quizrun/ui';
import useAuthListener from './hooks/useAuthListener';
import NotificationsSystem, {
  atalhoTheme,
  useNotifications,
  setUpNotifications,
} from 'reapop';

setUpNotifications({
  defaultProps: {
    position: 'bottom-center',
    dismissible: true,
    dismissAfter: 2000,
  },
});

// All initlizer related hooks goes here
const Initilizer = () => {
  useAuthListener();
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div>
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dismissNotification(id)}
        theme={atalhoTheme}
      />
    </div>
  );
};

function App() {
  globalStyles();

  return (
    <RouterRoot>
      <Initilizer />
      <Router />
    </RouterRoot>
  );
}

export default App;
