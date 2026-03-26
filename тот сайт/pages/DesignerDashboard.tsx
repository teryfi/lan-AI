import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Upload, Package, BarChart3, MessageSquare,
  CreditCard, TrendingUp, Eye, Heart, ShoppingBag, Users,
  Plus, Star, CheckCircle, ArrowUpRight, MapPin, Cpu, Layers
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid
} from 'recharts';
import { ANALYTICS_DATA, FASHION_ITEMS, DESIGNERS, CONVERSATIONS } from '../data/mockData';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router';

const TABS = [
  { id: 'overview', label: 'Обзор', icon: <LayoutDashboard size={16} /> },
  { id: 'works', label: 'Работы', icon: <Package size={16} /> },
  { id: 'analytics', label: 'Аналитика', icon: <BarChart3 size={16} /> },
  { id: 'chat', label: 'Сообщения', icon: <MessageSquare size={16} /> },
  { id: 'monetize', label: 'Монетизация', icon: <CreditCard size={16} /> },
];

const CHART_COLORS = ['#c9a84c', '#e879a0', '#a78bfa', '#34d399', '#fb923c'];

export default function DesignerDashboard() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadMode, setUploadMode] = useState(false);

  const myItems = FASHION_ITEMS.filter(i => i.designerId === 'd1');

  const statCards = [
    {
      label: 'Просмотров (7 дней)',
      value: '6 030',
      change: '+18%',
      icon: <Eye size={18} />,
      color: '#c9a84c',
    },
    {
      label: 'Добавлений в капсулы',
      value: '342',
      change: '+31%',
      icon: <Layers size={18} />,
      color: '#a78bfa',
    },
    {
      label: 'Лайков',
      value: '1 876',
      change: '+12%',
      icon: <Heart size={18} />,
      color: '#e879a0',
    },
    {
      label: 'Заказов',
      value: '47',
      change: '+8%',
      icon: <ShoppingBag size={18} />,
      color: '#34d399',
    },
  ];

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0a0a0a', fontFamily: '"Inter", sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={user?.avatar} alt={user?.name}
                className="w-14 h-14 rounded-2xl object-cover" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: '#c9a84c' }}>
                <CheckCircle size={12} className="text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 style={{ color: '#f5f5f0', fontSize: '22px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}>
                  {user?.name}
                </h1>
              </div>
              <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '13px' }}>
                {user?.specialty} · {user?.location}
              </p>
            </div>
          </div>
          <button
            onClick={() => setUploadMode(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #e879a0)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            <Upload size={16} /> Загрузить работу
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto"
          style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
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
                flexShrink: 0,
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
          >
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {statCards.map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-5 rounded-2xl"
                      style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: `${card.color}18`, color: card.color }}>
                          {card.icon}
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs"
                          style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}>
                          {card.change}
                        </span>
                      </div>
                      <p style={{ color: '#f5f5f0', fontSize: '24px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}>
                        {card.value}
                      </p>
                      <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '12px', marginTop: '4px' }}>
                        {card.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Activity chart */}
                  <div className="lg:col-span-2 p-6 rounded-2xl"
                    style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 style={{ color: '#f5f5f0', fontSize: '16px', fontWeight: 500 }}>Активность за 7 дней</h3>
                      <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(245,245,240,0.4)' }}>
                        <span style={{ color: '#c9a84c' }}>● Просмотры</span>
                        <span style={{ color: '#e879a0' }}>● Клики</span>
                        <span style={{ color: '#34d399' }}>● Сохранен��я</span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={ANALYTICS_DATA.weeklyViews}>
                        <defs>
                          <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#e879a0" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#e879a0" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="day" tick={{ fill: 'rgba(245,245,240,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'rgba(245,245,240,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f5f5f0' }}
                          labelStyle={{ color: 'rgba(245,245,240,0.6)' }}
                        />
                        <Area type="monotone" dataKey="views" stroke="#c9a84c" strokeWidth={2} fill="url(#viewsGrad)" />
                        <Area type="monotone" dataKey="clicks" stroke="#e879a0" strokeWidth={2} fill="url(#clicksGrad)" />
                        <Area type="monotone" dataKey="saves" stroke="#34d399" strokeWidth={2} fill="none" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Geo */}
                  <div className="p-6 rounded-2xl"
                    style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center gap-2 mb-5">
                      <MapPin size={15} style={{ color: '#c9a84c' }} />
                      <h3 style={{ color: '#f5f5f0', fontSize: '16px', fontWeight: 500 }}>География</h3>
                    </div>
                    <div className="space-y-3">
                      {ANALYTICS_DATA.geoData.map(geo => (
                        <div key={geo.city}>
                          <div className="flex justify-between mb-1">
                            <span style={{ color: 'rgba(245,245,240,0.7)', fontSize: '13px' }}>{geo.city}</span>
                            <span style={{ color: '#c9a84c', fontSize: '13px', fontWeight: 500 }}>{geo.percent}%</span>
                          </div>
                          <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${geo.percent}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full rounded-full"
                              style={{ background: 'linear-gradient(90deg, #c9a84c, #e879a0)' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Revenue chart + Demographics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl"
                    style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <h3 style={{ color: '#f5f5f0', fontSize: '16px', fontWeight: 500, marginBottom: '20px' }}>
                      Выручка по месяцам
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={ANALYTICS_DATA.monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: 'rgba(245,245,240,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'rgba(245,245,240,0.3)', fontSize: 11 }} axisLine={false} tickLine={false}
                          tickFormatter={v => `${v / 1000}K`} />
                        <Tooltip
                          contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f5f5f0' }}
                          formatter={(v: number) => [`${v.toLocaleString()} ₽`, 'Выручка']}
                        />
                        <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                          {ANALYTICS_DATA.monthlyRevenue.map((_, i) => (
                            <Cell key={i} fill={i === ANALYTICS_DATA.monthlyRevenue.length - 1 ? '#c9a84c' : 'rgba(201,168,76,0.3)'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-6 rounded-2xl"
                    style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <h3 style={{ color: '#f5f5f0', fontSize: '16px', fontWeight: 500, marginBottom: '20px' }}>
                      Демография
                    </h3>
                    <div className="flex items-center gap-6">
                      <ResponsiveContainer width={140} height={140}>
                        <PieChart>
                          <Pie data={ANALYTICS_DATA.ageData} cx={65} cy={65} innerRadius={40} outerRadius={65} dataKey="percent" paddingAngle={3}>
                            {ANALYTICS_DATA.ageData.map((_, i) => (
                              <Cell key={i} fill={CHART_COLORS[i]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-2.5">
                        {ANALYTICS_DATA.ageData.map((age, i) => (
                          <div key={age.range} className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                            <span style={{ color: 'rgba(245,245,240,0.6)', fontSize: '13px' }}>{age.range}</span>
                            <span style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500, marginLeft: 'auto' }}>{age.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WORKS TAB */}
            {activeTab === 'works' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ color: '#f5f5f0', fontSize: '20px', fontWeight: 500 }}>
                    Мои работы ({myItems.length})
                  </h2>
                  <button
                    onClick={() => setUploadMode(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c' }}
                  >
                    <Plus size={14} /> Загрузить
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {myItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-2xl overflow-hidden"
                      style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div className="relative" style={{ aspectRatio: '3/4' }}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        {item.limited && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs"
                            style={{ background: 'rgba(232,121,160,0.9)', color: 'white' }}>
                            Лимит
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <p style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500 }}>{item.name}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span style={{ color: '#c9a84c', fontSize: '13px' }}>{item.price.toLocaleString()} ₽</span>
                          <div className="flex items-center gap-1">
                            <Heart size={11} style={{ color: '#e879a0' }} />
                            <span style={{ color: 'rgba(245,245,240,0.4)', fontSize: '11px' }}>{item.likes}</span>
                          </div>
                        </div>
                        <div className="mt-2 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="h-full rounded-full" style={{
                            width: `${Math.random() * 60 + 20}%`,
                            background: 'linear-gradient(90deg, #c9a84c, #e879a0)',
                          }} />
                        </div>
                        <p style={{ color: 'rgba(245,245,240,0.3)', fontSize: '10px', marginTop: '4px' }}>
                          {Math.floor(Math.random() * 8 + 1)} из {Math.floor(Math.random() * 5 + 15)} продано
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Upload card */}
                  <button
                    onClick={() => setUploadMode(true)}
                    className="rounded-2xl flex flex-col items-center justify-center transition-all hover:border-opacity-50"
                    style={{
                      border: '2px dashed rgba(255,255,255,0.1)',
                      aspectRatio: '3/4',
                      color: 'rgba(245,245,240,0.3)',
                    }}
                  >
                    <Plus size={24} className="mb-2" />
                    <span style={{ fontSize: '13px' }}>Добавить работу</span>
                  </button>
                </div>
              </div>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Конверсия в заявки', value: '7.8%', trend: '+2.1%', color: '#a78bfa' },
                    { label: 'Средний чек', value: '14 200 ₽', trend: '+5%', color: '#c9a84c' },
                    { label: 'Подписчиков', value: '2 847', trend: '+234', color: '#e879a0' },
                  ].map(m => (
                    <div key={m.label} className="p-6 rounded-2xl"
                      style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '13px', marginBottom: '8px' }}>{m.label}</p>
                      <p style={{ color: '#f5f5f0', fontSize: '32px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}>{m.value}</p>
                      <p style={{ color: '#34d399', fontSize: '12px', marginTop: '4px' }}>↑ {m.trend} за месяц</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl"
                  style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 style={{ color: '#f5f5f0', fontSize: '16px', fontWeight: 500, marginBottom: '20px' }}>
                    Топ работ по добавлению в капсулы
                  </h3>
                  <div className="space-y-3">
                    {myItems.map((item, i) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <span style={{ color: 'rgba(245,245,240,0.2)', fontSize: '13px', width: '20px' }}>{i + 1}</span>
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500 }}>{item.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                              <div className="h-full rounded-full"
                                style={{ width: `${[85, 62, 48][i] || 30}%`, background: 'linear-gradient(90deg, #c9a84c, #e879a0)' }} />
                            </div>
                            <span style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 500, flexShrink: 0 }}>
                              {[127, 89, 54][i] || 30} добавлений
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CHAT TAB */}
            {activeTab === 'chat' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ color: '#f5f5f0', fontSize: '20px', fontWeight: 500 }}>Сообщения</h2>
                  <button
                    onClick={() => navigate('/chat')}
                    className="px-4 py-2 rounded-xl text-sm"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c' }}
                  >
                    Открыть чат →
                  </button>
                </div>
                <div className="space-y-3">
                  {CONVERSATIONS.map(conv => (
                    <div key={conv.id}
                      className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:translate-x-1"
                      style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}
                      onClick={() => navigate('/chat')}>
                      <div className="relative">
                        <img src={conv.partnerAvatar} alt={conv.partnerName}
                          className="w-11 h-11 rounded-xl object-cover" />
                        {conv.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                            style={{ background: '#34d399', borderColor: '#0a0a0a' }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p style={{ color: '#f5f5f0', fontSize: '14px', fontWeight: 500 }}>{conv.partnerName}</p>
                          <span style={{ color: 'rgba(245,245,240,0.3)', fontSize: '12px' }}>{conv.time}</span>
                        </div>
                        <p style={{ color: 'rgba(245,245,240,0.45)', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {conv.lastMessage}
                        </p>
                      </div>
                      {conv.unread > 0 && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: '#e879a0' }}>
                          <span style={{ color: 'white', fontSize: '10px' }}>{conv.unread}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MONETIZE TAB */}
            {activeTab === 'monetize' && (
              <div className="space-y-6">
                {/* Balance card */}
                <div className="p-8 rounded-3xl overflow-hidden relative"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,121,160,0.1))', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <div className="absolute right-0 top-0 w-64 h-64 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                  <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '14px', marginBottom: '8px' }}>Баланс к выводу</p>
                  <p style={{ color: '#f5f5f0', fontSize: '48px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, marginBottom: '4px' }}>
                    84 600 ₽
                  </p>
                  <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '13px', marginBottom: '24px' }}>
                    Комиссия платформы: 12% · Последний вывод: 15 марта
                  </p>
                  <button className="px-6 py-3 rounded-xl text-sm font-medium"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)', color: 'white' }}>
                    Вывести средства
                  </button>
                </div>

                {/* Pricing settings */}
                <div className="p-6 rounded-2xl"
                  style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 style={{ color: '#f5f5f0', fontSize: '16px', fontWeight: 500, marginBottom: '20px' }}>
                    Настройки цен
                  </h3>
                  <div className="space-y-4">
                    {myItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500 }}>{item.name}</p>
                        </div>
                        <input
                          type="number"
                          defaultValue={item.price}
                          className="w-28 text-right"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '10px',
                            color: '#c9a84c',
                            padding: '6px 12px',
                            fontSize: '14px',
                            fontWeight: 500,
                            outline: 'none',
                          }}
                        />
                        <span style={{ color: 'rgba(245,245,240,0.3)', fontSize: '13px' }}>₽</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 px-5 py-2.5 rounded-xl text-sm"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c' }}>
                    Сохранить цены
                  </button>
                </div>

                {/* Commission info */}
                <div className="p-5 rounded-2xl flex items-start gap-3"
                  style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.15)' }}>
                  <Cpu size={16} style={{ color: '#a78bfa', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ color: '#a78bfa', fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>
                      Комиссия за ИИ-продвижение
                    </p>
                    <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '13px', lineHeight: 1.5 }}>
                      Когда ИИ включает вашу работу в капсулу и клиент совершает покупку,
                      комиссия составляет 12%. Органические продажи — 8%.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setUploadMode(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-xl rounded-3xl p-8"
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={e => e.stopPropagation()}
            >
              <h2 style={{ color: '#f5f5f0', fontSize: '22px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, marginBottom: '24px' }}>
                Загрузить работу
              </h2>

              {/* Drop zone */}
              <div className="border-2 border-dashed rounded-2xl p-10 text-center mb-6 cursor-pointer"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <Upload size={32} className="mx-auto mb-3" style={{ color: 'rgba(245,245,240,0.2)' }} />
                <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '14px' }}>
                  Перетащите фото или нажмите для загрузки
                </p>
                <p style={{ color: 'rgba(245,245,240,0.25)', fontSize: '12px', marginTop: '4px' }}>
                  JPG, PNG, WebP · до 20 МБ
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Название', placeholder: 'Платье «Силуэт»' },
                  { label: 'Цена', placeholder: '12 000' },
                  { label: 'Категория', placeholder: 'Платья' },
                  { label: 'Материал', placeholder: 'Шёлк, вискоза' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ color: 'rgba(245,245,240,0.5)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                      {f.label}
                    </label>
                    <input
                      placeholder={f.placeholder}
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

              <div className="mb-6">
                <label style={{ color: 'rgba(245,245,240,0.5)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                  Описание
                </label>
                <textarea
                  placeholder="Опишите изделие, особенности пошива, вдохновение..."
                  rows={3}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#f5f5f0',
                    padding: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setUploadMode(false)}
                  className="flex-1 py-3 rounded-xl text-sm"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,245,240,0.5)' }}>
                  Отмена
                </button>
                <button
                  onClick={() => setUploadMode(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)', color: 'white' }}>
                  Опубликовать
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
