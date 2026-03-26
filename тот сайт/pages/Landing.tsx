import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Sparkles, ArrowRight, Star, CheckCircle, Cpu, TrendingUp,
  Users, Palette, ShoppingBag, Heart, MessageCircle, Zap
} from 'lucide-react';
import { useApp, DEMO_DESIGNER, DEMO_CLIENT } from '../store/AppContext';
import { DESIGNERS } from '../data/mockData';

const HERO_WORDS = ['дизайнеров', 'коллекции', 'стиль', 'вдохновение'];

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % HERO_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const quickLogin = (role: 'designer' | 'client') => {
    login(role === 'designer' ? DEMO_DESIGNER : DEMO_CLIENT);
    navigate(role === 'designer' ? '/dashboard' : '/feed');
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1768825182160-d5481c5ebd19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600&q=80"
            alt="hero"
            className="w-full h-full object-cover"
            style={{ opacity: 0.15 }}
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.95) 100%)'
          }} />
          {/* Decorative glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,121,160,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
          >
            <Sparkles size={14} style={{ color: '#c9a84c' }} />
            <span style={{ color: '#c9a84c', fontSize: '13px', letterSpacing: '0.05em' }}>
              Платформа на базе искусственного интеллекта
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 600,
              color: '#f5f5f0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '8px',
            }}>
              Открывай новых
            </h1>
            <div style={{ height: 'clamp(56px, 9vw, 112px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.h1
                key={wordIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(48px, 8vw, 96px)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #c9a84c, #e879a0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {HERO_WORDS[wordIdx]}
              </motion.h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ color: 'rgba(245,245,240,0.55)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.7 }}
          >
            ИИ подбирает персональные капсулы гардероба из коллекций молодых дизайнеров.
            Твой стиль — их возможность.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={() => quickLogin('client')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #e879a0)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 500,
                boxShadow: '0 8px 32px rgba(201,168,76,0.25)',
              }}
            >
              <Sparkles size={18} />
              Подобрать гардероб
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => quickLogin('designer')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f5f5f0',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              <Palette size={18} />
              Я дизайнер
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center justify-center gap-8 flex-wrap"
          >
            {[
              { value: '1 200+', label: 'дизайнеров' },
              { value: '48K+', label: 'работ' },
              { value: '94%', label: 'точность ИИ' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '32px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #c9a84c, #e879a0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stat.value}
                </div>
                <div style={{ color: 'rgba(245,245,240,0.4)', fontSize: '13px' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '24px', height: '40px', border: '2px solid rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: '4px', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Как это работает
            </p>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              color: '#f5f5f0',
              lineHeight: 1.2,
            }}>
              Три шага до идеального гардероба
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: <Users size={28} />,
                title: 'Расскажи о себе',
                desc: 'Укажи параметры: рост, тип фигуры, цветотип, предпочтения в стиле и бюджет.',
                color: '#c9a84c',
              },
              {
                step: '02',
                icon: <Cpu size={28} />,
                title: 'ИИ анализирует',
                desc: 'Алгоритм изучает тысячи работ молодых дизайнеров и формирует персональную подборку.',
                color: '#a78bfa',
              },
              {
                step: '03',
                icon: <ShoppingBag size={28} />,
                title: 'Получи капсулу',
                desc: 'Готовая капсула с совместимыми вещами от авторов — сохрани, поделись или закажи.',
                color: '#e879a0',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-3xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="text-7xl mb-6" style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  color: 'rgba(255,255,255,0.04)',
                  fontWeight: 700,
                  lineHeight: 1,
                }}>
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${item.color}18`, color: item.color }}>
                  {item.icon}
                </div>
                <h3 style={{ color: '#f5f5f0', fontSize: '20px', fontWeight: 500, marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '15px', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Designers */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Авторы на платформе
              </p>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 600,
                color: '#f5f5f0',
              }}>
                Дизайнеры
              </h2>
            </div>
            <button
              onClick={() => { login(DEMO_CLIENT); navigate('/feed'); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
              style={{ color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)', fontSize: '14px' }}
            >
              Все дизайнеры <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGNERS.map((designer, i) => (
              <motion.div
                key={designer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => { login(DEMO_CLIENT); navigate('/feed'); }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={designer.cover}
                    alt={designer.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
                  }} />
                  {designer.verified && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: '#c9a84c' }}>
                      <CheckCircle size={12} className="text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-1">
                      <img src={designer.avatar} alt={designer.name}
                        className="w-8 h-8 rounded-full object-cover border-2"
                        style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                      <div>
                        <p style={{ color: '#f5f5f0', fontSize: '14px', fontWeight: 500 }}>{designer.name}</p>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{designer.handle}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                  <span style={{ color: 'rgba(245,245,240,0.5)', fontSize: '13px' }}>{designer.specialty}</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} style={{ color: '#c9a84c', fill: '#c9a84c' }} />
                    <span style={{ color: '#c9a84c', fontSize: '13px' }}>{designer.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 600,
              color: '#f5f5f0',
              marginBottom: '16px',
            }}>
              Всё в одном месте
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
              Платформа закрывает потребности и дизайнеров, и покупателей
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Cpu size={22} />, color: '#a78bfa', title: 'ИИ-подборщик', desc: 'Персональные капсулы на основе ваших параметров и предпочтений' },
              { icon: <TrendingUp size={22} />, color: '#c9a84c', title: 'Аналитика продаж', desc: 'Дизайнеры получают детальную статистику просмотров и продаж' },
              { icon: <Heart size={22} />, color: '#e879a0', title: 'Социальная лента', desc: 'Лайки, комментарии, подписки — как Instagram для моды' },
              { icon: <MessageCircle size={22} />, color: '#34d399', title: 'Прямой чат', desc: 'Общайся с дизайнерами напрямую без посредников' },
              { icon: <Zap size={22} />, color: '#fb923c', title: 'Быстрый заказ', desc: 'От просмотра до заказа — один клик с сохранением истории' },
              { icon: <Palette size={22} />, color: '#60a5fa', title: 'Конструктор капсул', desc: 'Собирай и редактируй свой гардероб как настоящий стилист' },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feat.color}15`, color: feat.color }}>
                  {feat.icon}
                </div>
                <h3 style={{ color: '#f5f5f0', fontSize: '17px', fontWeight: 500, marginBottom: '8px' }}>{feat.title}</h3>
                <p style={{ color: 'rgba(245,245,240,0.45)', fontSize: '14px', lineHeight: 1.6 }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            color: '#f5f5f0',
            marginBottom: '24px',
            lineHeight: 1.1,
          }}>
            Начни находить<br />
            <span style={{
              background: 'linear-gradient(135deg, #c9a84c, #e879a0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>свой стиль</span>
          </h2>
          <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: 1.6 }}>
            Более 1 200 независимых дизайнеров уже ждут тебя. Бесплатно. Без скрытых условий.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => quickLogin('client')}
              className="px-10 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #e879a0)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 500,
                boxShadow: '0 8px 32px rgba(232,121,160,0.3)',
              }}
            >
              Подобрать гардероб — бесплатно
            </button>
            <button
              onClick={() => navigate('/auth?mode=register&role=designer')}
              className="px-10 py-4 rounded-2xl transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(245,245,240,0.8)',
                fontSize: '16px',
              }}
            >
              Зарегистрироваться как дизайнер
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)' }}>
              <Sparkles size={14} className="text-white" />
            </div>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#f5f5f0', fontSize: '18px', fontWeight: 600, letterSpacing: '0.08em' }}>
              FORMA
            </span>
          </div>
          <p style={{ color: 'rgba(245,245,240,0.3)', fontSize: '13px' }}>
            © 2026 FORMA. Платформа для молодых дизайнеров.
          </p>
          <div className="flex gap-6">
            {['О нас', 'Контакты', 'Политика'].map(link => (
              <button key={link} style={{ color: 'rgba(245,245,240,0.35)', fontSize: '13px' }}>{link}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
