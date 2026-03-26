import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../store/AppContext';

const BODY_TYPES = ['Песочные часы', 'Прямоугольник', 'Груша', 'Яблоко', 'Перевёрнутый треугольник'];
const COLOR_TYPES = ['Весна', 'Лето', 'Осень', 'Зима'];
const STYLES = ['Минимализм', 'Casual Chic', 'Boho', 'Streetwear', 'Романтика', 'Классика', 'Авангард', 'Спорт'];
const SEASONS = ['Весна', 'Лето', 'Осень', 'Зима'];
const BUDGETS = [
  { label: 'До 5 000 ₽', value: '0-5000' },
  { label: '5 000–15 000 ₽', value: '5000-15000' },
  { label: '15 000–30 000 ₽', value: '15000-30000' },
  { label: '30 000–60 000 ₽', value: '30000-60000' },
  { label: 'Свыше 60 000 ₽', value: '60000+' },
];

const STEPS = [
  { id: 1, title: 'Твои параметры', subtitle: 'Расскажи о себе' },
  { id: 2, title: 'Тип фигуры', subtitle: 'Поможем с посадкой вещей' },
  { id: 3, title: 'Цветотип', subtitle: 'Для правильной палитры' },
  { id: 4, title: 'Стиль', subtitle: 'Что тебе близко?' },
  { id: 5, title: 'Сезон и бюджет', subtitle: 'Финальные штрихи' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    height: 165,
    weight: 55,
    bodyType: '',
    colorType: '',
    stylePrefs: [] as string[],
    seasons: [] as string[],
    budget: '',
  });

  const toggleArr = (key: 'stylePrefs' | 'seasons', val: string) => {
    setData(d => ({
      ...d,
      [key]: d[key].includes(val) ? d[key].filter(v => v !== val) : [...d[key], val],
    }));
  };

  const finish = async () => {
    completeOnboarding({
      height: data.height,
      weight: data.weight,
      bodyType: data.bodyType,
      colorType: data.colorType,
      stylePrefs: data.stylePrefs,
      budget: data.budget,
    });
    navigate('/feed');
  };

  const canNext = () => {
    if (step === 1) return data.height > 0 && data.weight > 0;
    if (step === 2) return !!data.bodyType;
    if (step === 3) return !!data.colorType;
    if (step === 4) return data.stylePrefs.length > 0;
    if (step === 5) return !!data.budget;
    return true;
  };

  const chipStyle = (active: boolean, color = '#c9a84c') => ({
    padding: '10px 18px',
    borderRadius: '100px',
    border: `1px solid ${active ? color + '60' : 'rgba(255,255,255,0.1)'}`,
    background: active ? `${color}15` : 'rgba(255,255,255,0.04)',
    color: active ? color : 'rgba(245,245,240,0.6)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20"
      style={{ background: '#0a0a0a' }}>

      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: step > s.id
                    ? 'linear-gradient(135deg, #c9a84c, #e879a0)'
                    : step === s.id
                      ? 'rgba(201,168,76,0.2)'
                      : 'rgba(255,255,255,0.06)',
                  border: step === s.id ? '1px solid rgba(201,168,76,0.5)' : 'none',
                }}
              >
                {step > s.id
                  ? <Check size={14} className="text-white" />
                  : <span style={{ color: step === s.id ? '#c9a84c' : 'rgba(245,245,240,0.3)', fontSize: '12px' }}>{s.id}</span>
                }
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-px" style={{ background: step > s.id ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.08)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8"
          style={{
            background: 'rgba(20,20,20,0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
            minHeight: '420px',
          }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)' }}>
                  <Sparkles size={12} className="text-white" />
                </div>
                <span style={{ color: 'rgba(245,245,240,0.4)', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Шаг {step} из {STEPS.length}
                </span>
              </div>
              <h2 style={{ color: '#f5f5f0', fontSize: '26px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, marginBottom: '4px' }}>
                {STEPS[step - 1].title}
              </h2>
              <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '14px', marginBottom: '28px' }}>
                {STEPS[step - 1].subtitle}
              </p>

              {/* Step 1: Height & Weight */}
              {step === 1 && (
                <div className="space-y-6">
                  {[
                    { label: 'Рост (см)', key: 'height', min: 140, max: 210, step: 1 },
                    { label: 'Вес (кг)', key: 'weight', min: 40, max: 150, step: 1 },
                  ].map(field => (
                    <div key={field.key}>
                      <div className="flex justify-between mb-3">
                        <label style={{ color: 'rgba(245,245,240,0.7)', fontSize: '14px' }}>{field.label}</label>
                        <span style={{
                          color: '#c9a84c',
                          fontSize: '18px',
                          fontFamily: '"Cormorant Garamond", serif',
                          fontWeight: 600,
                        }}>
                          {data[field.key as 'height' | 'weight']}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={data[field.key as 'height' | 'weight']}
                        onChange={e => setData(d => ({ ...d, [field.key]: +e.target.value }))}
                        className="w-full"
                        style={{ accentColor: '#c9a84c' }}
                      />
                      <div className="flex justify-between mt-1">
                        <span style={{ color: 'rgba(245,245,240,0.25)', fontSize: '11px' }}>{field.min}</span>
                        <span style={{ color: 'rgba(245,245,240,0.25)', fontSize: '11px' }}>{field.max}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Body Type */}
              {step === 2 && (
                <div className="flex flex-wrap gap-3">
                  {BODY_TYPES.map(bt => (
                    <button key={bt} onClick={() => setData(d => ({ ...d, bodyType: bt }))}
                      style={chipStyle(data.bodyType === bt)}>
                      {bt}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3: Color Type */}
              {step === 3 && (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { type: 'Весна', colors: ['#f4a261', '#e9c46a', '#fcd5ce'], desc: 'Тёплые, яркие, насыщенные' },
                    { type: 'Лето', colors: ['#a8c8e8', '#c9b8d8', '#d4e5d0'], desc: 'Холодные, мягкие, пастельные' },
                    { type: 'Осень', colors: ['#8b4513', '#c0784b', '#6b8e23'], desc: 'Тёплые, глубокие, землистые' },
                    { type: 'Зима', colors: ['#1a1a2e', '#e0e0e0', '#dc143c'], desc: 'Холодные, яркие, контрастные' },
                  ].map(ct => (
                    <button
                      key={ct.type}
                      onClick={() => setData(d => ({ ...d, colorType: ct.type }))}
                      className="p-4 rounded-2xl text-left transition-all duration-200"
                      style={{
                        background: data.colorType === ct.type ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${data.colorType === ct.type ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      <div className="flex gap-1 mb-3">
                        {ct.colors.map(c => (
                          <div key={c} className="w-6 h-6 rounded-full" style={{ background: c }} />
                        ))}
                      </div>
                      <p style={{ color: '#f5f5f0', fontSize: '15px', fontWeight: 500 }}>{ct.type}</p>
                      <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '12px', marginTop: '4px' }}>{ct.desc}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 4: Style */}
              {step === 4 && (
                <div>
                  <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '13px', marginBottom: '16px' }}>
                    Можно выбрать несколько
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {STYLES.map(s => (
                      <button key={s} onClick={() => toggleArr('stylePrefs', s)}
                        style={chipStyle(data.stylePrefs.includes(s), '#a78bfa')}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Season & Budget */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <p style={{ color: 'rgba(245,245,240,0.7)', fontSize: '14px', marginBottom: '12px' }}>Сезон</p>
                    <div className="flex gap-3 flex-wrap">
                      {SEASONS.map(s => (
                        <button key={s} onClick={() => toggleArr('seasons', s)}
                          style={chipStyle(data.seasons.includes(s), '#e879a0')}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(245,245,240,0.7)', fontSize: '14px', marginBottom: '12px' }}>Бюджет на капсулу</p>
                    <div className="space-y-2">
                      {BUDGETS.map(b => (
                        <button
                          key={b.value}
                          onClick={() => setData(d => ({ ...d, budget: b.value }))}
                          className="w-full px-4 py-3 rounded-xl text-left flex items-center justify-between transition-all"
                          style={{
                            background: data.budget === b.value ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${data.budget === b.value ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
                            color: data.budget === b.value ? '#c9a84c' : 'rgba(245,245,240,0.7)',
                            fontSize: '14px',
                          }}
                        >
                          {b.label}
                          {data.budget === b.value && <Check size={14} style={{ color: '#c9a84c' }} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/feed')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all"
            style={{ color: 'rgba(245,245,240,0.4)', fontSize: '14px', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <ArrowLeft size={15} />
            {step === 1 ? 'Пропустить' : 'Назад'}
          </button>
          <button
            onClick={() => step < STEPS.length ? setStep(s => s + 1) : finish()}
            disabled={!canNext()}
            className="flex items-center gap-2 px-8 py-3 rounded-xl transition-all hover:opacity-90"
            style={{
              background: canNext() ? 'linear-gradient(135deg, #c9a84c, #e879a0)' : 'rgba(255,255,255,0.06)',
              color: canNext() ? 'white' : 'rgba(245,245,240,0.3)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: canNext() ? 'pointer' : 'not-allowed',
            }}
          >
            {step === STEPS.length ? 'Готово!' : 'Далее'}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
