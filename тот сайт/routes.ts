import { createBrowserRouter } from 'react-router';
import Root from './Root';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import ClientFeed from './pages/ClientFeed';
import AISearch from './pages/AISearch';
import DesignerDashboard from './pages/DesignerDashboard';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: 'auth', Component: Auth },
      { path: 'onboarding', Component: Onboarding },
      { path: 'feed', Component: ClientFeed },
      { path: 'search', Component: AISearch },
      { path: 'dashboard', Component: DesignerDashboard },
      { path: 'chat', Component: Chat },
      { path: 'profile', Component: Profile },
    ],
  },
]);
