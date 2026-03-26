import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, EyeOff, Mail, Lock, User, Phone, Palette, ShoppingBag, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useApp, DEMO_DESIGNER, DEMO_CLIENT } from '../store/AppContext';

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useApp();

  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const initialRole = searchParams.get('role') as 'designer' | 'client' | null;

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'designer' | 'client' | null>(initialRole);
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const handleLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const user = role === 'designer' ? DEMO_DESIGNER : DEMO_CLIENT;
    login(user);
    navigate(role === 'designer' ? '/dashboard' : role === 'client' ? '/onboarding' : '/onboarding');
  };

  const handleQuickDemo = async (demoRole: 'designer' | 'client') => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user = demoRole === 'designer' ? DEMO_DESIGNER : DEMO_CLIENT;
    login(user);
    navigate(demoRole === 'designer' ? '/dashboard' : '/feed');
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#f5f5f0',
    padding: '14px 16px',
    fontSize: '15px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 pt-20"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(232,121,160,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-3xl p-8"
          style={{
            background: 'rgba(20,20,20,0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          }}>

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)' }}>
              <Sparkles size={18} className="text-white" />
            </div>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#f5f5f0', fontSize: '24px', fontWeight: 600, letterSpacing: '0.08em' }}>
              FORMA
            </span>
          </div>

          {/* Mode Toggle */}
          <div className="flex rounded-xl p-1 mb-8" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setStep(1); setRole(null); }}
                className="flex-1 py-2.5 rounded-lg transition-all duration-200"
                style={{
                  background: mode === m ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: mode === m ? '#f5f5f0' : 'rgba(245,245,240,0.4)',
                  fontSize: '14px',
                  fontWeight: mode === m ? 500 : 400,
                }}
              >
                {m === 'login' ? 'Войти' : 'Регистрация'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 style={{ color: '#f5f5f0', fontSize: '22px', fontWeight: 500, marginBottom: '6px' }}>
                  Добро пожаловать
                </h2>
                <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '14px', marginBottom: '28px' }}>
                  Войдите в свой аккаунт
                </p>

                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(245,245,240,0.3)' }} />
                    <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={{ ...inputStyle, paddingLeft: '44px' }}
                    />
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(245,245,240,0.3)' }} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Пароль"
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      style={{ ...inputStyle, paddingLeft: '44px', paddingRight: '44px' }}
                    />
                    <button onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: 'rgba(245,245,240,0.3)' }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl mb-6 transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #c9a84c, #e879a0)',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: 500,
                  }}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : <>Войти <ArrowRight size={16} /></>}
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                  <span style={{ color: 'rgba(245,245,240,0.3)', fontSize: '12px' }}>или войти как</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleQuickDemo('client')}
                    className="py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
                    style={{ background: 'rgba(232,121,160,0.1)', border: '1px solid rgba(232,121,160,0.2)', color: '#e879a0', fontSize: '14px' }}
                  >
                    <ShoppingBag size={15} /> Клиент
                  </button>
                  <button
                    onClick={() => handleQuickDemo('designer')}
                    className="py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c', fontSize: '14px' }}
                  >
                    <Palette size={15} /> Дизайнер
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step 1: Role selection */}
                {step === 1 && (
                  <div>
                    <h2 style={{ color: '#f5f5f0', fontSize: '22px', fontWeight: 500, marginBottom: '6px' }}>
                      Кто вы?
                    </h2>
                    <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '14px', marginBottom: '28px' }}>
                      Выберите роль для продолжения
                    </p>
                    <div className="space-y-4 mb-6">
                      {[
                        {
                          r: 'client' as const,
                          icon: <ShoppingBag size={24} />,
                          title: 'Клиент',
                          desc: 'Ищу стиль и персональный гардероб',
                          color: '#e879a0',
                        },
                        {
                          r: 'designer' as const,
                          icon: <Palette size={24} />,
                          title: 'Дизайнер',
                          desc: 'Хочу продвигать свои работы',
                          color: '#c9a84c',
                        },
                      ].map(item => (
                        <button
                          key={item.r}
                          onClick={() => setRole(item.r)}
                          className="w-full p-5 rounded-2xl text-left transition-all duration-200"
                          style={{
                            background: role === item.r ? `${item.color}12` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${role === item.r ? item.color + '40' : 'rgba(255,255,255,0.08)'}`,
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{ background: `${item.color}18`, color: item.color }}>
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <p style={{ color: '#f5f5f0', fontWeight: 500, fontSize: '16px' }}>{item.title}</p>
                              <p style={{ color: 'rgba(245,245,240,0.45)', fontSize: '13px', marginTop: '2px' }}>{item.desc}</p>
                            </div>
                            {role === item.r && (
                              <div className="w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ background: item.color }}>
                                <Check size={12} className="text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => role && setStep(2)}
                      disabled={!role}
                      className="w-full py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                      style={{
                        background: role ? 'linear-gradient(135deg, #c9a84c, #e879a0)' : 'rgba(255,255,255,0.06)',
                        color: role ? 'white' : 'rgba(245,245,240,0.3)',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: role ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Продолжить <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {/* Step 2: Account data */}
                {step === 2 && (
                  <div>
                    <button onClick={() => setStep(1)} className="flex items-center gap-1 mb-5"
                      style={{ color: 'rgba(245,245,240,0.4)', fontSize: '13px' }}>
                      <ArrowLeft size={14} /> Назад
                    </button>
                    <h2 style={{ color: '#f5f5f0', fontSize: '22px', fontWeight: 500, marginBottom: '6px' }}>
                      Создайте аккаунт
                    </h2>
                    <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '14px', marginBottom: '24px' }}>
                      {role === 'designer' ? 'Ваш дизайнерский профиль' : 'Ваши данные'}
                    </p>
                    <div className="space-y-3 mb-6">
                      {[
                        { icon: <User size={15} />, placeholder: 'Имя и фамилия', key: 'name', type: 'text' },
                        { icon: <Mail size={15} />, placeholder: 'Email', key: 'email', type: 'email' },
                        { icon: <Phone size={15} />, placeholder: 'Телефон', key: 'phone', type: 'tel' },
                        { icon: <Lock size={15} />, placeholder: 'Пароль', key: 'password', type: showPass ? 'text' : 'password' },
                      ].map(field => (
                        <div key={field.key} className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(245,245,240,0.3)' }}>
                            {field.icon}
                          </span>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={form[field.key as keyof typeof form]}
                            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                            style={{ ...inputStyle, paddingLeft: '44px' }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleLogin}
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl transition-all hover:opacity-90 flex items-center justify-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #c9a84c, #e879a0)',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: 500,
                      }}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : <>Создать аккаунт <ArrowRight size={16} /></>}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
