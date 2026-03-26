import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, MessageCircle, Bookmark, Share2, MoreHorizontal,
  TrendingUp, Sparkles, Search, Filter, Users, Star, CheckCircle
} from 'lucide-react';
import { FEED_POSTS, DESIGNERS } from '../data/mockData';
import { useApp } from '../store/AppContext';

export default function ClientFeed() {
  const { savedItems, toggleSave } = useApp();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(FEED_POSTS);
  const [feedMode, setFeedMode] = useState<'algo' | 'chrono'>('algo');
  const [activeDesigner, setActiveDesigner] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setPosts(p => p.map(post =>
      post.id === id
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">

          {/* Main Feed */}
          <div className="flex-1 max-w-xl mx-auto">
            {/* Stories / Designer Highlights */}
            <div className="mb-8">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {/* AI suggestion story */}
                <div className="flex-shrink-0 text-center">
                  <button
                    onClick={() => navigate('/search')}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #a78bfa, #e879a0)' }}
                  >
                    <Sparkles size={22} className="text-white" />
                  </button>
                  <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '11px' }}>ИИ-подбор</p>
                </div>

                {DESIGNERS.map(d => (
                  <div key={d.id} className="flex-shrink-0 text-center">
                    <button
                      onClick={() => setActiveDesigner(activeDesigner === d.id ? null : d.id)}
                      className="w-16 h-16 rounded-2xl overflow-hidden mb-2 transition-all hover:scale-105"
                      style={{
                        padding: '2px',
                        background: activeDesigner === d.id
                          ? 'linear-gradient(135deg, #c9a84c, #e879a0)'
                          : 'rgba(255,255,255,0.1)',
                      }}
                    >
                      <img src={d.avatar} alt={d.name} className="w-full h-full object-cover rounded-xl" />
                    </button>
                    <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '11px', maxWidth: '64px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {d.name.split(' ')[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feed toggle */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'algo', label: '✦ Для тебя' },
                { id: 'chrono', label: '⏱ Свежее' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setFeedMode(m.id as 'algo' | 'chrono')}
                  className="px-4 py-2 rounded-xl transition-all text-sm"
                  style={{
                    background: feedMode === m.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: feedMode === m.id ? '#f5f5f0' : 'rgba(245,245,240,0.4)',
                    border: feedMode === m.id ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: 'rgba(20,20,20,0.8)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <img src={post.designerAvatar} alt={post.designerName}
                        className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p style={{ color: '#f5f5f0', fontSize: '14px', fontWeight: 500 }}>{post.designerName}</p>
                          <CheckCircle size={13} style={{ color: '#c9a84c' }} />
                        </div>
                        <p style={{ color: 'rgba(245,245,240,0.35)', fontSize: '12px' }}>{post.timeAgo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1.5 rounded-lg text-xs transition-all"
                        style={{
                          border: '1px solid rgba(201,168,76,0.3)',
                          color: '#c9a84c',
                        }}
                      >
                        Подписаться
                      </button>
                      <button style={{ color: 'rgba(245,245,240,0.3)' }}>
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)'
                    }} />
                    {/* Tags overlay */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full text-xs"
                          style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1.5 transition-all hover:scale-110"
                        >
                          <motion.div
                            animate={{ scale: post.isLiked ? [1, 1.4, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Heart
                              size={22}
                              style={{
                                color: post.isLiked ? '#e879a0' : 'rgba(245,245,240,0.6)',
                                fill: post.isLiked ? '#e879a0' : 'none',
                              }}
                            />
                          </motion.div>
                          <span style={{ color: 'rgba(245,245,240,0.6)', fontSize: '13px' }}>
                            {formatCount(post.likes)}
                          </span>
                        </button>

                        <button
                          onClick={() => navigate('/chat')}
                          className="flex items-center gap-1.5"
                          style={{ color: 'rgba(245,245,240,0.6)' }}
                        >
                          <MessageCircle size={22} />
                          <span style={{ fontSize: '13px' }}>{post.comments}</span>
                        </button>

                        <button className="flex items-center gap-1.5" style={{ color: 'rgba(245,245,240,0.6)' }}>
                          <Share2 size={20} />
                        </button>
                      </div>

                      <button
                        onClick={() => toggleSave(post.id)}
                        className="transition-all hover:scale-110"
                      >
                        <Bookmark
                          size={22}
                          style={{
                            color: savedItems.includes(post.id) ? '#c9a84c' : 'rgba(245,245,240,0.6)',
                            fill: savedItems.includes(post.id) ? '#c9a84c' : 'none',
                          }}
                        />
                      </button>
                    </div>

                    <p style={{ color: 'rgba(245,245,240,0.7)', fontSize: '13px', lineHeight: 1.5 }}>
                      <span style={{ color: '#f5f5f0', fontWeight: 500 }}>{post.designerName}</span>{' '}
                      {post.caption}
                    </p>

                    <button
                      onClick={() => navigate('/search')}
                      className="mt-3 w-full py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(245,245,240,0.6)',
                      }}
                    >
                      <Sparkles size={13} className="inline mr-1.5" style={{ color: '#c9a84c' }} />
                      Добавить в капсулу
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            {/* AI Promo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl p-6 mb-6 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(232,121,160,0.12))',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
              onClick={() => navigate('/search')}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e879a0)' }}>
                  <Sparkles size={14} className="text-white" />
                </div>
                <span style={{ color: '#c9a84c', fontSize: '13px', fontWeight: 500 }}>ИИ-подбор</span>
              </div>
              <p style={{ color: '#f5f5f0', fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>
                Собери капсулу гардероба
              </p>
              <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '13px', lineHeight: 1.5, marginBottom: '16px' }}>
                ИИ подберёт персональные вещи от авторов под твои параметры
              </p>
              <div className="flex items-center gap-1" style={{ color: '#c9a84c', fontSize: '13px' }}>
                Попробовать <span>→</span>
              </div>
            </motion.div>

            {/* Trending Designers */}
            <div className="rounded-3xl p-6"
              style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={16} style={{ color: '#c9a84c' }} />
                <h3 style={{ color: '#f5f5f0', fontSize: '15px', fontWeight: 500 }}>Популярные дизайнеры</h3>
              </div>
              <div className="space-y-4">
                {DESIGNERS.map((d, i) => (
                  <div key={d.id} className="flex items-center gap-3">
                    <span style={{ color: 'rgba(245,245,240,0.2)', fontSize: '12px', width: '16px' }}>{i + 1}</span>
                    <img src={d.avatar} alt={d.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p style={{ color: '#f5f5f0', fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {d.name}
                        </p>
                        {d.verified && <CheckCircle size={11} style={{ color: '#c9a84c', flexShrink: 0 }} />}
                      </div>
                      <p style={{ color: 'rgba(245,245,240,0.35)', fontSize: '11px' }}>{d.followers.toLocaleString()} подписчиков</p>
                    </div>
                    <button className="px-2.5 py-1 rounded-lg text-xs transition-all hover:opacity-80"
                      style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}>
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
