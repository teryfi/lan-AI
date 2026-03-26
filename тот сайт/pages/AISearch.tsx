import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Send, Filter, X, Plus, Trash2, Share2, ShoppingBag,
  Star, ChevronDown, Cpu, Check, Download, Heart
} from 'lucide-react';
import { FASHION_ITEMS, AI_CAPSULE_RESULTS, DESIGNERS } from '../data/mockData';
import { useApp } from '../store/AppContext';

type Item = typeof FASHION_ITEMS[0];

export default function AISearch() {
  const { user, addCapsule, savedItems, toggleSave } = useApp();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [capsuleItems, setCapsuleItems] = useState<Item[]>([]);
  const [activeResult, setActiveResult] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [filters, setFilters] = useState({
    style: '',
    season: '',
    maxPrice: 50000,
    size: '',
  });

  const aiQueries = [
    'Деловой образ для офиса на зиму',
    'Лёгкая капсула в стиле boho для отпуска',
    'Минималистичный гардероб 10 предметов',
    'Street look для городских прогулок',
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    await new Promise(r => setTimeout(r, 2200));
    setLoading(false);
    setSearched(true);
  };

  const addToCapsule = (item: Item) => {
    if (!capsuleItems.find(i => i.id === item.id)) {
      setCapsuleItems(prev => [...prev, item]);
    }
  };

  const removeFromCapsule = (id: string) => {
    setCapsuleItems(prev => prev.filter(i => i.id !== id));
  };

  const saveCapsule = () => {
    if (capsuleItems.length === 0) return;
    addCapsule({
      id: Date.now().toString(),
      name: query || 'Моя капсула',
      items: capsuleItems.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        designerId: item.designerId,
        designerName: item.designerName,
        category: item.category,
      })),
      createdAt: new Date().toISOString(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const capsuleTotal = capsuleItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0a0a0a', fontFamily: '"Inter", sans-serif' }}>
      {/* Hero banner */}
      <div className="relative py-16 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(167,139,250,0.08) 0%, transparent 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)' }}>
            <Cpu size={12} style={{ color: '#a78bfa' }} />
            <span style={{ color: '#a78bfa', fontSize: '12px' }}>Нейросеть · GPT-powered</span>
          </div>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 600,
            color: '#f5f5f0',
            marginBottom: '12px',
          }}>
            ИИ-подбор капсулы
          </h1>
          <p style={{ color: 'rgba(245,245,240,0.45)', fontSize: '16px' }}>
            Опишите желаемый образ — ИИ найдёт идеальные вещи от молодых авторов
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="flex items-center gap-3 p-2 pl-5 rounded-2xl"
              style={{
                background: 'rgba(20,20,20,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
              }}>
              <Sparkles size={18} style={{ color: '#c9a84c', flexShrink: 0 }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Опишите образ или стиль (например: деловой образ на зиму до 20 000 ₽)"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f5f5f0',
                  fontSize: '15px',
                }}
              />
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="p-2 rounded-xl transition-all"
                style={{ color: 'rgba(245,245,240,0.4)', background: 'rgba(255,255,255,0.04)' }}
              >
                <Filter size={16} />
              </button>
              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:opacity-90"
                style={{
                  background: query.trim() ? 'linear-gradient(135deg, #c9a84c, #e879a0)' : 'rgba(255,255,255,0.06)',
                  color: query.trim() ? 'white' : 'rgba(245,245,240,0.3)',
                  fontSize: '14px',
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                <Send size={14} />
                Подобрать
              </button>
            </div>
          </div>

          {/* Quick queries */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {aiQueries.map(q => (
              <button
                key={q}
                onClick={() => setQuery(q)}
                className="px-3 py-1.5 rounded-full text-xs transition-all hover:opacity-80"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(245,245,240,0.5)',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Filters */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-5 rounded-2xl overflow-hidden"
                style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Стиль', key: 'style', opts: ['Все', 'Минимализм', 'Boho', 'Streetwear', 'Классика'] },
                    { label: 'Сезон', key: 'season', opts: ['Все', 'Зима', 'Весна', 'Лето', 'Осень'] },
                    { label: 'Размер', key: 'size', opts: ['Все', 'XS', 'S', 'M', 'L', 'XL'] },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ color: 'rgba(245,245,240,0.5)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                        {f.label}
                      </label>
                      <select
                        value={filters[f.key as keyof typeof filters] as string}
                        onChange={e => setFilters(prev => ({ ...prev, [f.key]: e.target.value }))}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          color: '#f5f5f0',
                          padding: '8px 12px',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      >
                        {f.opts.map(o => <option key={o} value={o === 'Все' ? '' : o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label style={{ color: 'rgba(245,245,240,0.5)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                      Макс. цена: {filters.maxPrice.toLocaleString()} ₽
                    </label>
                    <input
                      type="range" min={1000} max={100000} step={1000}
                      value={filters.maxPrice}
                      onChange={e => setFilters(prev => ({ ...prev, maxPrice: +e.target.value }))}
                      style={{ width: '100%', accentColor: '#c9a84c' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center py-20"
            >
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #c9a84c22, #e879a022)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles size={32} style={{ color: '#c9a84c' }} />
                </motion.div>
              </div>
              <h3 style={{ color: '#f5f5f0', fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>
                ИИ анализирует запрос...
              </h3>
              <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '14px', marginBottom: '24px' }}>
                Подбираем вещи из 48 000+ работ дизайнеров
              </p>
              <div className="flex gap-2">
                {['Анализ параметров', 'Поиск совместимостей', 'Формирование капсул'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.5 }}
                    className="px-3 py-1.5 rounded-full text-xs"
                    style={{
                      background: 'rgba(167,139,250,0.1)',
                      border: '1px solid rgba(167,139,250,0.2)',
                      color: '#a78bfa',
                    }}
                  >
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {searched && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* AI Results Capsules */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)' }}>
                  <Sparkles size={12} className="text-white" />
                </div>
                <h2 style={{ color: '#f5f5f0', fontSize: '20px', fontWeight: 500 }}>
                  ИИ сформировал {AI_CAPSULE_RESULTS.length} капсулы
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {AI_CAPSULE_RESULTS.map((result, i) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="rounded-3xl overflow-hidden cursor-pointer transition-all hover:translate-y-[-2px]"
                    style={{
                      background: 'rgba(20,20,20,0.9)',
                      border: activeResult === result.id ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.07)',
                      boxShadow: activeResult === result.id ? '0 0 30px rgba(201,168,76,0.1)' : 'none',
                    }}
                    onClick={() => setActiveResult(activeResult === result.id ? null : result.id)}
                  >
                    {/* Images grid */}
                    <div className="grid grid-cols-3 gap-0.5 h-48">
                      {result.items.map(itemId => {
                        const item = FASHION_ITEMS.find(f => f.id === itemId);
                        return item ? (
                          <div key={itemId} className="overflow-hidden">
                            <img src={item.image} alt={item.name}
                              className="w-full h-full object-cover" />
                          </div>
                        ) : null;
                      })}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 style={{ color: '#f5f5f0', fontSize: '16px', fontWeight: 500 }}>{result.name}</h3>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
                          <Star size={10} style={{ color: '#34d399', fill: '#34d399' }} />
                          <span style={{ color: '#34d399', fontSize: '11px', fontWeight: 600 }}>
                            {result.matchScore}%
                          </span>
                        </div>
                      </div>
                      <p style={{ color: 'rgba(245,245,240,0.45)', fontSize: '13px', lineHeight: 1.5, marginBottom: '12px' }}>
                        {result.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {result.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded-full text-xs"
                            style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(245,245,240,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: '#c9a84c', fontSize: '15px', fontWeight: 600 }}>
                          {result.totalPrice.toLocaleString()} ₽
                        </span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            result.items.forEach(id => {
                              const item = FASHION_ITEMS.find(f => f.id === id);
                              if (item) addToCapsule(item);
                            });
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all hover:opacity-80"
                          style={{
                            background: 'linear-gradient(135deg, #c9a84c22, #e879a022)',
                            border: '1px solid rgba(201,168,76,0.3)',
                            color: '#c9a84c',
                          }}
                        >
                          <Plus size={13} /> В конструктор
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* All items */}
            <h2 style={{ color: '#f5f5f0', fontSize: '20px', fontWeight: 500, marginBottom: '20px' }}>
              Все найденные вещи
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              {FASHION_ITEMS.filter(item =>
                !filters.style || item.style === filters.style
              ).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <img src={item.image} alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)'
                    }} />
                    {item.limited && (
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs"
                        style={{ background: 'rgba(232,121,160,0.9)', color: 'white' }}>
                        Лимитировано
                      </div>
                    )}
                    <button
                      onClick={() => toggleSave(item.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                    >
                      <Heart size={13}
                        style={{
                          color: savedItems.includes(item.id) ? '#e879a0' : 'rgba(255,255,255,0.7)',
                          fill: savedItems.includes(item.id) ? '#e879a0' : 'none',
                        }}
                      />
                    </button>
                    {/* Compatibility badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                      <span style={{ color: '#34d399', fontSize: '11px', fontWeight: 600 }}>
                        {Math.round(item.compatibility * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>
                      {item.name}
                    </p>
                    <p style={{ color: 'rgba(245,245,240,0.35)', fontSize: '11px', marginBottom: '8px' }}>
                      {item.designerName}
                    </p>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#c9a84c', fontSize: '13px', fontWeight: 600 }}>
                        {item.price.toLocaleString()} ₽
                      </span>
                      <button
                        onClick={() => addToCapsule(item)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{
                          background: capsuleItems.find(i => i.id === item.id)
                            ? 'linear-gradient(135deg, #c9a84c, #e879a0)'
                            : 'rgba(255,255,255,0.06)',
                          border: capsuleItems.find(i => i.id === item.id)
                            ? 'none'
                            : '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {capsuleItems.find(i => i.id === item.id)
                          ? <Check size={11} className="text-white" />
                          : <Plus size={11} style={{ color: 'rgba(245,245,240,0.6)' }} />
                        }
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {!searched && !loading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <Sparkles size={32} style={{ color: '#c9a84c' }} />
            </div>
            <h3 style={{ color: '#f5f5f0', fontSize: '22px', fontWeight: 500, marginBottom: '8px' }}>
              Опишите, что ищете
            </h3>
            <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '15px' }}>
              Например: «Тёплая капсула для офиса и прогулок, бюджет 25 000 ₽»
            </p>
          </div>
        )}
      </div>

      {/* Capsule Constructor Panel */}
      <AnimatePresence>
        {capsuleItems.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            style={{ width: 'min(680px, calc(100vw - 32px))' }}
          >
            <div className="rounded-3xl p-5"
              style={{
                background: 'rgba(14,14,14,0.97)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                backdropFilter: 'blur(20px)',
              }}>
              <div className="flex items-center gap-4">
                {/* Preview items */}
                <div className="flex -space-x-2 flex-shrink-0">
                  {capsuleItems.slice(0, 4).map(item => (
                    <div key={item.id} className="relative">
                      <img src={item.image} alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover border-2"
                        style={{ borderColor: '#0a0a0a' }} />
                      <button
                        onClick={() => removeFromCapsule(item.id)}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: '#e879a0' }}>
                        <X size={8} className="text-white" />
                      </button>
                    </div>
                  ))}
                  {capsuleItems.length > 4 && (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border-2"
                      style={{ background: 'rgba(255,255,255,0.08)', borderColor: '#0a0a0a' }}>
                      <span style={{ color: 'rgba(245,245,240,0.6)', fontSize: '11px' }}>+{capsuleItems.length - 4}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p style={{ color: '#f5f5f0', fontSize: '14px', fontWeight: 500 }}>
                    Моя капсула · {capsuleItems.length} {capsuleItems.length === 1 ? 'предмет' : 'предметов'}
                  </p>
                  <p style={{ color: '#c9a84c', fontSize: '13px' }}>
                    {capsuleTotal.toLocaleString()} ₽
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(245,245,240,0.6)' }}>
                    <Share2 size={16} />
                  </button>
                  <button className="p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(245,245,240,0.6)' }}>
                    <Download size={16} />
                  </button>
                  <button
                    onClick={saveCapsule}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:opacity-90"
                    style={{
                      background: savedSuccess
                        ? 'rgba(52,211,153,0.2)'
                        : 'linear-gradient(135deg, #c9a84c, #e879a0)',
                      border: savedSuccess ? '1px solid rgba(52,211,153,0.4)' : 'none',
                      color: savedSuccess ? '#34d399' : 'white',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {savedSuccess ? <><Check size={15} /> Сохранено!</> : <><ShoppingBag size={15} /> Сохранить</>}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
