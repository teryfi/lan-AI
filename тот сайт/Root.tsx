import { Outlet, useLocation, Navigate } from 'react-router';
import { Navbar } from './components/layout/Navbar';
import { useApp } from './store/AppContext';

const PROTECTED_ROUTES = ['/feed', '/search', '/dashboard', '/chat', '/profile'];
const DESIGNER_ONLY = ['/dashboard'];

export default function Root() {
  const { isAuthenticated, user } = useApp();
  const location = useLocation();

  const hideNavbar = location.pathname === '/onboarding';

  // Guard: not authenticated
  if (PROTECTED_ROUTES.some(r => location.pathname.startsWith(r)) && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Guard: client tries to access designer-only
  if (DESIGNER_ONLY.some(r => location.pathname.startsWith(r)) && user?.role !== 'designer') {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}