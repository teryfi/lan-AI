import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Bell, MessageCircle, Search, Menu, X,
  User, LayoutDashboard, LogOut, Heart, Layers, Cpu
} from 'lucide-react';
import { useApp, DEMO_DESIGNER, DEMO_CLIENT } from '../../store/AppContext';

export function Navbar() {
  const { user, isAuthenticated, logout, notifications } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isDesigner = user?.role === 'designer';
  const isLanding = location.pathname === '/';

  const clientLinks = [
    { to: '/feed', label: 'Лента', icon: <Layers size={16} /> },
    { to: '/search', label: 'ИИ-подбор', icon: <Cpu size={16} /> },
    { to: '/profile', label: 'Мой профиль', icon: <User size={16} /> },
  ];

  const designerLinks = [
    { to: '/dashboard', label: 'Дашборд', icon: <LayoutDashboard size={16} /> },
    { to: '/feed', label: 'Лента', icon: <Layers size={16} /> },
    { to: '/profile', label: 'Профиль', icon: <User size={16} /> },
  ];

  const navLinks = isDesigner ? designerLinks : clientLinks;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)' }}>
              <Sparkles size={16} className="text-white" />
            </div>
            <span style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '22px',
              fontWeight: 600,
              color: '#f5f5f0',
              letterSpacing: '0.08em',
            }}>
              FORMA
            </span>
          </Link>

          {/* Center Nav Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200"
                  style={{
                    color: location.pathname === link.to ? '#f5f5f0' : 'rgba(245,245,240,0.5)',
                    background: location.pathname === link.to ? 'rgba(255,255,255,0.08)' : 'transparent',
                    fontSize: '14px',
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button
                  onClick={() => navigate('/chat')}
                  className="relative p-2 rounded-lg transition-all duration-200"
                  style={{ color: 'rgba(245,245,240,0.6)' }}
                >
                  <MessageCircle size={20} />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                    style={{ background: '#e879a0', fontSize: '10px' }}>
                    {notifications}
                  </span>
                </button>

                {/* Notifications Bell */}
                <button className="relative p-2 rounded-lg transition-all"
                  style={{ color: 'rgba(245,245,240,0.6)' }}>
                  <Bell size={20} />
                </button>

                {/* User Avatar */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-xl transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span className="hidden md:block pr-1"
                      style={{ color: '#f5f5f0', fontSize: '13px' }}>
                      {user?.name?.split(' ')[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl py-2 z-50"
                        style={{
                          background: '#141414',
                          border: '1px solid rgba(255,255,255,0.08)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                        }}
                      >
                        <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                          <p style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500 }}>{user?.name}</p>
                          <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '12px' }}>
                            {isDesigner ? 'Дизайнер' : 'Клиент'}
                          </p>
                        </div>
                        {[
                          { icon: <User size={14} />, label: 'Профиль', to: '/profile' },
                          ...(isDesigner ? [{ icon: <LayoutDashboard size={14} />, label: 'Дашборд', to: '/dashboard' }] : []),
                          { icon: <Heart size={14} />, label: 'Избранное', to: '/profile' },
                        ].map(item => (
                          <button
                            key={item.label}
                            onClick={() => { navigate(item.to); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 transition-all"
                            style={{ color: 'rgba(245,245,240,0.7)', fontSize: '13px' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                          >
                            {item.icon} {item.label}
                          </button>
                        ))}
                        <div className="border-t mt-1" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                          <button
                            onClick={() => { logout(); navigate('/'); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 mt-1 transition-all"
                            style={{ color: '#e879a0', fontSize: '13px' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(232,121,160,0.08)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                          >
                            <LogOut size={14} /> Выйти
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth"
                  className="px-4 py-2 rounded-xl transition-all duration-200"
                  style={{ color: 'rgba(245,245,240,0.7)', fontSize: '14px' }}>
                  Войти
                </Link>
                <Link to="/auth?mode=register"
                  className="px-5 py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #c9a84c, #e879a0)',
                    color: 'white',
                    fontSize: '14px',
                  }}>
                  Начать бесплатно
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'rgba(245,245,240,0.7)' }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
            style={{ background: 'rgba(10,10,10,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {isAuthenticated ? navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ color: 'rgba(245,245,240,0.8)', fontSize: '15px', background: 'rgba(255,255,255,0.04)' }}
                >
                  {link.icon} {link.label}
                </Link>
              )) : (
                <>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}
                    className="text-center px-4 py-3 rounded-xl"
                    style={{ color: 'rgba(245,245,240,0.7)', fontSize: '15px', background: 'rgba(255,255,255,0.04)' }}>
                    Войти
                  </Link>
                  <Link to="/auth?mode=register" onClick={() => setMobileOpen(false)}
                    className="text-center px-4 py-3 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)', color: 'white', fontSize: '15px' }}>
                    Начать бесплатно
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
