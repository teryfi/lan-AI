import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, Sparkles, MessageCircle, ArrowLeft, Cpu,
  MoreVertical, Phone, Image as ImageIcon, Smile, Check, CheckCheck
} from 'lucide-react';
import { CONVERSATIONS, CHAT_MESSAGES } from '../data/mockData';
import { useApp } from '../store/AppContext';

const AI_RESPONSES = [
  'Здравствуйте! Чем могу помочь с вашим стилем?',
  'Для вашего цветотипа «Лето» рекомендую холодные, приглушённые тона: лавандовый, серо-голубой, мятный.',
  'При типе фигуры «Прямоугольник» отлично смотрятся вещи с чёткой талией — пояса, запахи, плиссировка.',
  'Для офисного образа в холодное время: базовое пальто, брюки прямого кроя, водолазка. Капсула на зиму от 3 предметов.',
  'Уход за мохером: стирка при 30°C деликатный режим, только горизонтальная сушка, хранение сложенным.',
];

type Message = {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
};

export default function Chat() {
  const { user } = useApp();
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(
    CHAT_MESSAGES.map(m => ({ ...m, status: 'read' as const }))
  );
  const [aiMode, setAiMode] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ text: string; isAi: boolean; id: string }[]>([
    {
      id: '0',
      text: 'Привет! Я ИИ-стилист FORMA. Спроси меня про стиль, уход за вещами или подбор образа 👗',
      isAi: true,
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: message,
      isMe: true,
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setMessages(prev => [...prev, newMsg]);
    setMessage('');

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Спасибо за сообщение! Отвечу в ближайшее время 😊',
        isMe: false,
        time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 2000);
  };

  const sendAiMessage = async () => {
    if (!aiInput.trim()) return;
    const userMsg = { id: Date.now().toString(), text: aiInput, isAi: false };
    setAiMessages(prev => [...prev, userMsg]);
    setAiInput('');
    setAiLoading(true);

    await new Promise(r => setTimeout(r, 1200));
    const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    setAiMessages(prev => [...prev, { id: Date.now().toString(), text: response, isAi: true }]);
    setAiLoading(false);
  };

  const TEMPLATE_RESPONSES = [
    'Здравствуйте! Рада помочь 😊',
    'Размер M есть в наличии!',
    'Доставка по России 3–5 дней.',
    'Примерка возможна в Москве.',
    'Принимаю заказ! Пришлю детали.',
  ];

  return (
    <div className="min-h-screen pt-16 flex" style={{ background: '#0a0a0a', fontFamily: '"Inter", sans-serif' }}>

      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 flex flex-col"
        style={{
          borderRight: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(14,14,14,0.9)',
        }}>

        <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h2 style={{ color: '#f5f5f0', fontSize: '18px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, marginBottom: '12px' }}>
            Сообщения
          </h2>
          {/* AI Assistant shortcut */}
          <button
            onClick={() => { setAiMode(true); setActiveConv(null); }}
            className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
            style={{
              background: aiMode ? 'rgba(167,139,250,0.12)' : 'rgba(255,255,255,0.03)',
              border: aiMode ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #e879a0)' }}>
              <Cpu size={16} className="text-white" />
            </div>
            <div className="text-left">
              <p style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500 }}>ИИ-стилист</p>
              <p style={{ color: 'rgba(245,245,240,0.35)', fontSize: '11px' }}>Задай вопрос про стиль</p>
            </div>
            <div className="w-2 h-2 rounded-full ml-auto" style={{ background: '#34d399' }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              onClick={() => { setActiveConv(conv.id); setAiMode(false); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left"
              style={{
                background: activeConv === conv.id ? 'rgba(255,255,255,0.06)' : 'transparent',
              }}
            >
              <div className="relative flex-shrink-0">
                <img src={conv.partnerAvatar} alt={conv.partnerName}
                  className="w-10 h-10 rounded-xl object-cover" />
                {conv.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                    style={{ background: '#34d399', borderColor: '#0a0a0a' }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500 }}>{conv.partnerName}</p>
                  <span style={{ color: 'rgba(245,245,240,0.3)', fontSize: '11px' }}>{conv.time}</span>
                </div>
                <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#e879a0' }}>
                  <span style={{ color: 'white', fontSize: '10px' }}>{conv.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* AI Assistant */}
        {aiMode && (
          <>
            <div className="flex items-center gap-3 p-4 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(14,14,14,0.8)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #e879a0)' }}>
                <Cpu size={18} className="text-white" />
              </div>
              <div>
                <p style={{ color: '#f5f5f0', fontSize: '15px', fontWeight: 500 }}>ИИ-стилист FORMA</p>
                <p style={{ color: '#34d399', fontSize: '12px' }}>● Онлайн · Отвечает мгновенно</p>
              </div>
              <div className="ml-auto px-3 py-1 rounded-full"
                style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
                <span style={{ color: '#a78bfa', fontSize: '11px' }}>AI заглушка</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {aiMessages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.isAi && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center mr-2 flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #e879a0)' }}>
                      <Cpu size={12} className="text-white" />
                    </div>
                  )}
                  <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl"
                    style={{
                      background: msg.isAi ? 'rgba(167,139,250,0.1)' : 'rgba(201,168,76,0.12)',
                      border: msg.isAi ? '1px solid rgba(167,139,250,0.2)' : '1px solid rgba(201,168,76,0.2)',
                      borderRadius: msg.isAi ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                    }}>
                    <p style={{ color: '#f5f5f0', fontSize: '14px', lineHeight: 1.6 }}>{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {aiLoading && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #e879a0)' }}>
                    <Cpu size={12} className="text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl flex gap-1"
                    style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '4px 16px 16px 16px' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full"
                        style={{ background: '#a78bfa' }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={aiEndRef} />
            </div>

            {/* AI Input */}
            <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <input
                  value={aiInput}
                  onChange={e => setAiInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendAiMessage()}
                  placeholder="Спроси про стиль, уход, подбор..."
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#f5f5f0', fontSize: '14px' }}
                />
                <button
                  onClick={sendAiMessage}
                  disabled={!aiInput.trim()}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: aiInput.trim() ? 'linear-gradient(135deg, #7c3aed, #e879a0)' : 'rgba(255,255,255,0.06)',
                  }}>
                  <Send size={14} style={{ color: aiInput.trim() ? 'white' : 'rgba(245,245,240,0.3)' }} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Regular chat */}
        {activeConv && !aiMode && (
          <>
            {(() => {
              const conv = CONVERSATIONS.find(c => c.id === activeConv);
              if (!conv) return null;
              return (
                <>
                  <div className="flex items-center gap-3 p-4 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(14,14,14,0.8)' }}>
                    <div className="relative">
                      <img src={conv.partnerAvatar} alt={conv.partnerName}
                        className="w-10 h-10 rounded-xl object-cover" />
                      {conv.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                          style={{ background: '#34d399', borderColor: '#0a0a0a' }} />
                      )}
                    </div>
                    <div>
                      <p style={{ color: '#f5f5f0', fontSize: '15px', fontWeight: 500 }}>{conv.partnerName}</p>
                      <p style={{ color: conv.online ? '#34d399' : 'rgba(245,245,240,0.35)', fontSize: '12px' }}>
                        {conv.online ? '● Онлайн' : 'Был(а) недавно'}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <button className="p-2 rounded-lg" style={{ color: 'rgba(245,245,240,0.4)' }}>
                        <Phone size={16} />
                      </button>
                      <button className="p-2 rounded-lg" style={{ color: 'rgba(245,245,240,0.4)' }}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {messages.map(msg => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        {!msg.isMe && (
                          <img src={conv.partnerAvatar} alt=""
                            className="w-7 h-7 rounded-lg object-cover mr-2 self-end" />
                        )}
                        <div className="max-w-xs lg:max-w-sm">
                          <div className="px-4 py-3"
                            style={{
                              background: msg.isMe ? 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(232,121,160,0.15))' : 'rgba(255,255,255,0.06)',
                              border: msg.isMe ? '1px solid rgba(201,168,76,0.25)' : '1px solid rgba(255,255,255,0.08)',
                              borderRadius: msg.isMe ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                            }}>
                            <p style={{ color: '#f5f5f0', fontSize: '14px', lineHeight: 1.5 }}>{msg.text}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                            <span style={{ color: 'rgba(245,245,240,0.25)', fontSize: '11px' }}>{msg.time}</span>
                            {msg.isMe && msg.status === 'read' && <CheckCheck size={12} style={{ color: '#c9a84c' }} />}
                            {msg.isMe && msg.status === 'delivered' && <CheckCheck size={12} style={{ color: 'rgba(245,245,240,0.3)' }} />}
                            {msg.isMe && msg.status === 'sent' && <Check size={12} style={{ color: 'rgba(245,245,240,0.3)' }} />}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Template responses */}
                  {user?.role === 'designer' && (
                    <div className="px-4 py-2 overflow-x-auto flex gap-2"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      {TEMPLATE_RESPONSES.map(t => (
                        <button
                          key={t}
                          onClick={() => setMessage(t)}
                          className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all hover:opacity-80"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,245,240,0.5)' }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <button style={{ color: 'rgba(245,245,240,0.3)' }}><ImageIcon size={18} /></button>
                      <input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                        placeholder="Написать сообщение..."
                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#f5f5f0', fontSize: '14px' }}
                      />
                      <button style={{ color: 'rgba(245,245,240,0.3)' }}><Smile size={18} /></button>
                      <button
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                        style={{
                          background: message.trim() ? 'linear-gradient(135deg, #c9a84c, #e879a0)' : 'rgba(255,255,255,0.06)',
                        }}>
                        <Send size={14} style={{ color: message.trim() ? 'white' : 'rgba(245,245,240,0.3)' }} />
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </>
        )}

        {/* Empty state */}
        {!activeConv && !aiMode && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <MessageCircle size={32} style={{ color: '#c9a84c' }} />
            </div>
            <h3 style={{ color: '#f5f5f0', fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>
              Выберите диалог
            </h3>
            <p style={{ color: 'rgba(245,245,240,0.35)', fontSize: '14px' }}>
              Или попробуйте ИИ-стилиста слева
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
