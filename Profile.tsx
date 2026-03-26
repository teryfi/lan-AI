import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Edit3, Settings, Heart, Layers, History, MessageCircle,
  MapPin, Users, Package, Star, Share2, CheckCircle,
  Camera, Bell, Shield, CreditCard, LogOut, Sparkles, Bookmark
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { FASHION_ITEMS } from '../data/mockData';

const TABS = [
  { id: 'capsules', label: 'Мои капсулы', icon: <Layers size={15} /> },
  { id: 'favorites', label: 'Избранное', icon: <Heart size={15} /> },
  { id: 'history', label: 'История', icon: <History size={15} /> },
  { id: 'settings', label: 'Настройки', icon: <Settings size={15} /> },
];

export default function Profile() {
  const { user, logout, myCapsules, savedItems } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('capsules');
  const [editMode, setEditMode] = useState(false);

  const savedFashionItems = FASHION_ITEMS.filter(item => savedItems.includes(item.id));

  const isDesigner = user?.role === 'designer';

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0a0a0a', fontFamily: '"Inter", sans-serif' }}>
      {/* Profile Header */}
      <div className="relative">
        {/* Cover */}
        <div className="h-48 lg:h-64 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,121,160,0.1), rgba(167,139,250,0.1))' }}>
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 50%, #0a0a0a 100%)' }} />
          {/* Decorative */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-6">
            {/* Avatar */}
            <div className="relative group">
              <img src={user.avatar} alt={user.name}
                className="w-24 h-24 rounded-2xl object-cover border-4"
                style={{ borderColor: '#0a0a0a' }} />
              <button className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                style={{ background: 'rgba(0,0,0,0.6)' }}>
                <Camera size={18} className="text-white" />
              </button>
              {isDesigner && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: '#c9a84c' }}>
                  <CheckCircle size={12} className="text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 style={{ color: '#f5f5f0', fontSize: '24px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}>
                  {user.name}
                </h1>
                <span className="px-2.5 py-1 rounded-full text-xs"
                  style={{
                    background: isDesigner ? 'rgba(201,168,76,0.12)' : 'rgba(232,121,160,0.12)',
                    border: isDesigner ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(232,121,160,0.3)',
                    color: isDesigner ? '#c9a84c' : '#e879a0',
                  }}>
                  {isDesigner ? 'Дизайнер' : 'Клиент'}
                </span>
              </div>
              {user.location && (
                <div className="flex items-center gap-1 mb-2">
                  <MapPin size={13} style={{ color: 'rgba(245,245,240,0.3)' }} />
                  <span style={{ color: 'rgba(245,245,240,0.4)', fontSize: '13px' }}>{user.location}</span>
                </div>
              )}
              {isDesigner && user.bio && (
                <p style={{ color: 'rgba(245,245,240,0.55)', fontSize: '14px', maxWidth: '400px', lineHeight: 1.5 }}>
                  {user.bio}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,245,240,0.7)' }}
              >
                <Edit3 size={14} /> Редактировать
              </button>
              <button className="p-2.5 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,245,240,0.6)' }}>
                <Share2 size={15} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 flex-wrap">
            {[
              { label: 'Подписчики', value: (user.followers || 0).toLocaleString() },
              { label: 'Подписки', value: (user.following || 0).toLocaleString() },
              ...(isDesigner ? [
                { label: 'Работ', value: user.works?.toString() || '0' },
                { label: 'Рейтинг', value: user.rating?.toString() || '—' },
              ] : [
                { label: 'Капсул', value: myCapsules.length.toString() },
                { label: 'Избранное', value: savedItems.length.toString() },
              ]),
            ].map(stat => (
              <div key={stat.label}>
                <p style={{ color: '#f5f5f0', fontSize: '20px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}>
                  {stat.value}
                </p>
                <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '12px' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Client params */}
          {!isDesigner && user.bodyType && (
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: `${user.height} см`, icon: '📏' },
                { label: `${user.weight} кг`, icon: '⚖️' },
                { label: user.bodyType || '', icon: '👤' },
                { label: user.colorType || '', icon: '🎨' },
                ...(user.stylePrefs || []).map(s => ({ label: s, icon: '✨' })),
              ].filter(p => p.label).map(param => (
                <span key={param.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,245,240,0.6)' }}>
                  {param.icon} {param.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-1 mb-8"
          style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '4px', border: '1px solid rgba(255,255,255,0.06)', display: 'inline-flex' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap"
              style={{
                background: activeTab === tab.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: activeTab === tab.id ? '#f5f5f0' : 'rgba(245,245,240,0.4)',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? 500 : 400,
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pb-20"
          >
            {/* Capsules */}
            {activeTab === 'capsules' && (
              <div>
                {myCapsules.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.15)' }}>
                      <Layers size={24} style={{ color: '#a78bfa' }} />
                    </div>
                    <h3 style={{ color: '#f5f5f0', fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>
                      Нет капсул
                    </h3>
                    <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '14px', marginBottom: '20px' }}>
                      Создайте первую капсулу с помощью ИИ-подбора
                    </p>
                    <button
                      onClick={() => navigate('/search')}
                      className="px-6 py-3 rounded-xl text-sm flex items-center gap-2 mx-auto"
                      style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)', color: 'white' }}
                    >
                      <Sparkles size={14} /> Создать капсулу
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myCapsules.map(capsule => (
                      <div key={capsule.id} className="p-5 rounded-2xl"
                        style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div className="flex -space-x-2 mb-4">
                          {capsule.items.slice(0, 4).map(item => (
                            <img key={item.id} src={item.image} alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover border-2"
                              style={{ borderColor: '#141414' }} />
                          ))}
                        </div>
                        <h3 style={{ color: '#f5f5f0', fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>{capsule.name}</h3>
                        <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '13px' }}>
                          {capsule.items.length} предметов ·{' '}
                          {capsule.items.reduce((s, i) => s + i.price, 0).toLocaleString()} ₽
                        </p>
                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 py-2 rounded-lg text-xs"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,245,240,0.6)' }}>
                            Открыть
                          </button>
                          <button className="px-3 py-2 rounded-lg"
                            style={{ background: 'rgba(201,168,76,0.08)', color: '#c9a84c' }}>
                            <Share2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Favorites */}
            {activeTab === 'favorites' && (
              <div>
                {savedFashionItems.length === 0 ? (
                  <div className="text-center py-20">
                    <Heart size={32} className="mx-auto mb-4" style={{ color: 'rgba(245,245,240,0.2)' }} />
                    <h3 style={{ color: '#f5f5f0', fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Нет избранного</h3>
                    <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '14px' }}>
                      Лайкайте вещи в ленте или поиске
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {savedFashionItems.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="rounded-2xl overflow-hidden"
                        style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <p style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500 }}>{item.name}</p>
                          <p style={{ color: '#c9a84c', fontSize: '13px', marginTop: '4px' }}>{item.price.toLocaleString()} ₽</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* History */}
            {activeTab === 'history' && (
              <div className="space-y-3">
                {[
                  { query: 'Деловой образ для офиса на зиму', date: '24 марта 2026', results: 3 },
                  { query: 'Капсула boho для отпуска', date: '20 марта 2026', results: 2 },
                  { query: 'Минимальный гардероб 10 предметов', date: '15 марта 2026', results: 4 },
                ].map((h, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all"
                    style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(201,168,76,0.1)' }}>
                      <Sparkles size={16} style={{ color: '#c9a84c' }} />
                    </div>
                    <div className="flex-1">
                      <p style={{ color: '#f5f5f0', fontSize: '14px', fontWeight: 500 }}>{h.query}</p>
                      <p style={{ color: 'rgba(245,245,240,0.35)', fontSize: '12px' }}>{h.date} · {h.results} капсулы</p>
                    </div>
                    <button onClick={() => navigate('/search')}
                      style={{ color: 'rgba(245,245,240,0.3)', fontSize: '13px' }}>
                      Повторить →
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-4 max-w-xl">
                {[
                  {
                    icon: <Edit3 size={17} />, color: '#c9a84c',
                    title: 'Редактировать профиль',
                    desc: 'Имя, фото, биография, соц. сети',
                    onClick: () => setEditMode(true),
                  },
                  {
                    icon: <Bell size={17} />, color: '#a78bfa',
                    title: 'Уведомления',
                    desc: 'Настройки push и email уведомлений',
                    onClick: () => { },
                  },
                  {
                    icon: <Shield size={17} />, color: '#34d399',
                    title: 'Приватность',
                    desc: 'Видимость профиля, блокировки',
                    onClick: () => { },
                  },
                  {
                    icon: <CreditCard size={17} />, color: '#fb923c',
                    title: 'Оплата',
                    desc: 'Способы оплаты, история транзакций',
                    onClick: () => { },
                  },
                ].map(item => (
                  <button key={item.title}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all hover:translate-x-1"
                    style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${item.color}12`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p style={{ color: '#f5f5f0', fontSize: '14px', fontWeight: 500 }}>{item.title}</p>
                      <p style={{ color: 'rgba(245,245,240,0.35)', fontSize: '12px' }}>{item.desc}</p>
                    </div>
                    <span style={{ color: 'rgba(245,245,240,0.2)' }}>›</span>
                  </button>
                ))}

                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
                  style={{ background: 'rgba(212,24,61,0.06)', border: '1px solid rgba(212,24,61,0.15)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(212,24,61,0.1)', color: '#e879a0' }}>
                    <LogOut size={17} />
                  </div>
                  <p style={{ color: '#e879a0', fontSize: '14px', fontWeight: 500 }}>Выйти из аккаунта</p>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setEditMode(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-md rounded-3xl p-8"
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={e => e.stopPropagation()}
            >
              <h2 style={{ color: '#f5f5f0', fontSize: '20px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, marginBottom: '24px' }}>
                Редактировать профиль
              </h2>
              <div className="space-y-4 mb-6">
                {[
                  { label: 'Имя', defaultValue: user.name },
                  { label: 'Email', defaultValue: user.email },
                  { label: 'Город', defaultValue: user.location },
                  ...(isDesigner ? [{ label: 'Биография', defaultValue: user.bio }] : []),
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ color: 'rgba(245,245,240,0.5)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                      {f.label}
                    </label>
                    <input
                      defaultValue={f.defaultValue}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        color: '#f5f5f0',
                        padding: '10px 12px',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setEditMode(false)}
                  className="flex-1 py-3 rounded-xl text-sm"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,245,240,0.5)' }}>
                  Отмена
                </button>
                <button onClick={() => setEditMode(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)', color: 'white' }}>
                  Сохранить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
