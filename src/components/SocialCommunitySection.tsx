import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SOCIAL_POSTS, COMPANY_INFO } from '../data/companyData';
import { SocialPost, SocialComment } from '../types';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Instagram,
  Facebook,
  ExternalLink,
  Sparkles,
  MapPin,
  CheckCircle2,
  Send,
  X,
  Smile,
  Flame,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SocialCommunitySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [posts, setPosts] = useState<SocialPost[]>(SOCIAL_POSTS);
  const [activeModalPost, setActiveModalPost] = useState<SocialPost | null>(null);
  const [newCommentText, setNewCommentText] = useState<{ [postId: string]: string }>({});
  const [modalCommentText, setModalCommentText] = useState('');
  const [likedPosts, setLikedPosts] = useState<{ [id: string]: boolean }>(() => {
    const initial: { [id: string]: boolean } = {};
    SOCIAL_POSTS.forEach((p) => {
      if (p.initialLiked) initial[p.id] = true;
    });
    return initial;
  });
  const [savedPosts, setSavedPosts] = useState<{ [id: string]: boolean }>({});
  const [doubleTapHeart, setDoubleTapHeart] = useState<{ [id: string]: boolean }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { t } = useLanguage();

  const categories = [
    { id: 'all', label: t('social.cat.all', 'Sve Objave') },
    { id: 'scena', label: t('social.cat.scena', 'Magazin SCENA+') },
    { id: 'alati', label: t('social.cat.alati', 'BH Digitalni Alati') },
    { id: 'stecak', label: t('social.cat.stecak', 'Kultura & Stećci') },
    { id: 'projekti', label: t('social.cat.projekti', 'Projekti & Bojanka') },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isCurrentlyLiked = !!likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isCurrentlyLiked }));
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isCurrentlyLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
          };
        }
        return p;
      })
    );

    if (activeModalPost && activeModalPost.id === postId) {
      setActiveModalPost((prev) =>
        prev
          ? {
              ...prev,
              likes: isCurrentlyLiked ? Math.max(0, prev.likes - 1) : prev.likes + 1,
            }
          : null
      );
    }
  };

  const handleDoubleTap = (postId: string) => {
    if (!likedPosts[postId]) {
      handleLike(postId);
    }
    setDoubleTapHeart((prev) => ({ ...prev, [postId]: true }));
    setTimeout(() => {
      setDoubleTapHeart((prev) => ({ ...prev, [postId]: false }));
    }, 800);
  };

  const handleSave = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSaved = !savedPosts[postId];
    setSavedPosts((prev) => ({ ...prev, [postId]: isSaved }));
    showToast(isSaved ? 'Objava sačuvana u vaše favorite!' : 'Objava uklonjena iz favorita.');
  };

  const handleShare = (post: SocialPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = post.postUrl || window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Link objave kopiran u međuspremnik! 📋');
    } else {
      showToast(`Podijelite: ${url}`);
    }
  };

  const handleAddComment = (postId: string, text: string) => {
    if (!text.trim()) return;

    const newComment: SocialComment = {
      id: `c-${Date.now()}`,
      author: 'posjetilac_bih',
      text: text.trim(),
      timeAgo: 'Upravo sada',
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updatedComments = [...(p.comments || []), newComment];
          return {
            ...p,
            comments: updatedComments,
            commentsCount: updatedComments.length,
          };
        }
        return p;
      })
    );

    if (activeModalPost && activeModalPost.id === postId) {
      setActiveModalPost((prev) =>
        prev
          ? {
              ...prev,
              comments: [...(prev.comments || []), newComment],
              commentsCount: (prev.comments?.length || 0) + 1,
            }
          : null
      );
    }

    setNewCommentText((prev) => ({ ...prev, [postId]: '' }));
    setModalCommentText('');
    showToast('Komentar uspješno objavljen! 💬');
  };

  return (
    <section id="zajednica" className="py-24 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase backdrop-blur-md">
            <Instagram className="w-3.5 h-3.5" />
            <span>{t('social.badge', 'INSTAGRAM & DRUŠTVENE MREŽE')}</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] uppercase tracking-tight">
            {t('social.title1', 'Povežite se sa')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#C9A84C]">{t('social.title2', 'B&H Assistant Zajednicom')}</span>
          </h2>

          <p className="text-sm sm:text-base text-[#F5F0E8]/70 font-sans leading-relaxed">
            {t(
              'social.subtitle',
              'Pratite naše najnovije digitalne projekte, e-izdanja magazina SCENA+, behind-the-scenes momente i priče bh. inovacija na Instagramu @bh.asst i zvaničnoj Facebook stranici.'
            )}
          </p>
        </div>

        {/* Instagram Profile Hero Header Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0F2038] to-[#162B4A] border border-[#1A3152] p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Cyber Pattern Grid */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#00C9A7 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Avatar & Bio */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Instagram Story Gradient Ring around Avatar */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#C9A84C] via-[#E1306C] to-[#00C9A7] shadow-lg shadow-[#00C9A7]/20 shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-[#0A1628] border-2 border-[#0F2038] p-0.5">
                  <SafeImage
                    src={IMAGES.logo}
                    alt="B&H Assistant d.o.o. Instagram"
                    fallbackTitle="B&H"
                    fallbackSubtitle="Assistant"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#00C9A7] border-2 border-[#0A1628] flex items-center justify-center text-[#0A1628]">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

              {/* Handle & Details */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F5F0E8] flex items-center gap-2">
                    <span>@{COMPANY_INFO.instagramHandle}</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-[10px] font-mono">
                      Zvanični Profil
                    </span>
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#F5F0E8]/80 font-sans max-w-xl">
                  <strong className="text-[#00C9A7] font-semibold">B&H Assistant d.o.o. Zenica</strong> • Spajamo IT, kulturu stećaka i besplatne alate za građane BiH. Izdavači magazina SCENA+.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-[#F5F0E8]/60 pt-1">
                  <span className="flex items-center gap-1.5 text-[#C9A84C]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Zenica, Bosna i Hercegovina</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#00C9A7]">
                    <Globe className="w-3.5 h-3.5" />
                    <span>bh-assistant.ba</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons & Follow */}
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] hover:opacity-90 text-white font-syne font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#E1306C]/20 flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Instagram className="w-4 h-4" />
                <span>Pratite na Instagramu</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={COMPANY_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#1877F2]/15 hover:bg-[#1877F2] border border-[#1877F2]/40 text-[#1877F2] hover:text-white font-syne font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook Stranica</span>
              </a>
            </div>

          </div>

          {/* Social Stats Strip */}
          <div className="mt-6 pt-6 border-t border-[#1A3152] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-2.5 rounded-xl bg-[#0A1628]/60 border border-[#1A3152]/50">
              <div className="font-syne font-extrabold text-lg sm:text-xl text-[#00C9A7]">100% BH</div>
              <div className="text-[11px] font-mono text-[#F5F0E8]/60 uppercase">Domaći Brand</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0A1628]/60 border border-[#1A3152]/50">
              <div className="font-syne font-extrabold text-lg sm:text-xl text-[#F5F0E8]">3 Besplatna</div>
              <div className="text-[11px] font-mono text-[#F5F0E8]/60 uppercase">Digitalna Alata</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0A1628]/60 border border-[#1A3152]/50">
              <div className="font-syne font-extrabold text-lg sm:text-xl text-[#C9A84C]">SCENA+</div>
              <div className="text-[11px] font-mono text-[#F5F0E8]/60 uppercase">Urbani Magazin</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0A1628]/60 border border-[#1A3152]/50">
              <div className="font-syne font-extrabold text-lg sm:text-xl text-[#00C9A7]">ZEDP</div>
              <div className="text-[11px] font-mono text-[#F5F0E8]/60 uppercase">Zenica Poslovanje</div>
            </div>
          </div>

        </div>

        {/* Categories Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20 font-bold'
                  : 'bg-[#0F2038] text-[#F5F0E8]/70 hover:text-[#F5F0E8] border border-[#1A3152] hover:border-[#00C9A7]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Instagram-Style Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const isSaved = !!savedPosts[post.id];
            const showHeartAnim = !!doubleTapHeart[post.id];

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 group"
              >
                {/* Post Top Author Bar */}
                <div className="p-4 flex items-center justify-between border-b border-[#1A3152]/70 bg-[#0A1628]/40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#0A1628] border border-[#00C9A7]/50 p-0.5 shrink-0">
                      <SafeImage
                        src={IMAGES.logo}
                        alt="bh.asst"
                        fallbackTitle="B&H"
                        fallbackSubtitle="A"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-syne font-bold text-xs text-[#F5F0E8]">
                          {COMPANY_INFO.instagramHandle}
                        </span>
                        <CheckCircle2 className="w-3 h-3 text-[#00C9A7] fill-current" />
                      </div>
                      {post.location && (
                        <p className="text-[10px] text-[#F5F0E8]/50 font-sans truncate max-w-[150px]">
                          {post.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#0A1628] border border-[#00C9A7]/30 text-[#00C9A7] text-[10px] font-mono font-bold">
                    {post.categoryLabel}
                  </span>
                </div>

                {/* Media Image with Double-Tap to Like */}
                <div
                  onDoubleClick={() => handleDoubleTap(post.id)}
                  onClick={() => setActiveModalPost(post)}
                  className="relative aspect-square sm:aspect-[4/3] bg-[#0A1628] overflow-hidden cursor-pointer flex items-center justify-center p-2 group-hover:opacity-95"
                >
                  <SafeImage
                    src={post.image}
                    alt={post.caption}
                    fallbackTitle="B&H Assistant"
                    fallbackSubtitle={post.categoryLabel}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Overlay with Instagram Indicator */}
                  <div className="absolute inset-0 bg-[#0A1628]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-[#F5F0E8]">
                    <div className="flex items-center gap-2 font-syne font-bold text-sm">
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'fill-white'}`} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 font-syne font-bold text-sm">
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>{post.comments?.length || post.commentsCount}</span>
                    </div>
                  </div>

                  {/* Popping Double Tap Heart Animation */}
                  <AnimatePresence>
                    {showHeartAnim && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.3, opacity: 1 }}
                        exit={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                      >
                        <Heart className="w-20 h-20 text-red-500 fill-red-500 drop-shadow-2xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Post Action Buttons */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Like Button */}
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        aria-label="Lajkuj objavu"
                        className="p-1.5 rounded-lg hover:bg-[#1A3152]/50 text-[#F5F0E8] transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 transition-transform active:scale-125 ${
                            isLiked ? 'text-red-500 fill-red-500' : 'hover:text-red-400'
                          }`}
                        />
                      </button>

                      {/* Comment Button */}
                      <button
                        onClick={() => setActiveModalPost(post)}
                        aria-label="Komentariši objavu"
                        className="p-1.5 rounded-lg hover:bg-[#1A3152]/50 text-[#F5F0E8] hover:text-[#00C9A7] transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={(e) => handleShare(post, e)}
                        aria-label="Podijeli objavu"
                        className="p-1.5 rounded-lg hover:bg-[#1A3152]/50 text-[#F5F0E8] hover:text-[#00C9A7] transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Bookmark / Save Button */}
                    <button
                      onClick={(e) => handleSave(post.id, e)}
                      aria-label="Sačuvaj objavu"
                      className="p-1.5 rounded-lg hover:bg-[#1A3152]/50 text-[#F5F0E8] hover:text-[#C9A84C] transition-colors"
                    >
                      <Bookmark className={`w-5 h-5 ${isSaved ? 'text-[#C9A84C] fill-[#C9A84C]' : ''}`} />
                    </button>
                  </div>

                  {/* Likes Count */}
                  <div className="text-xs font-syne font-bold text-[#F5F0E8]">
                    {post.likes} {post.likes === 1 ? 'oznaka sviđanja' : 'oznaka sviđanja'}
                  </div>

                  {/* Caption */}
                  <div className="text-xs text-[#F5F0E8]/85 font-sans leading-relaxed line-clamp-3">
                    <strong className="text-[#00C9A7] font-semibold mr-1.5 font-syne">
                      {COMPANY_INFO.instagramHandle}
                    </strong>
                    {post.caption}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[11px] font-mono text-[#00C9A7]/80 hover:text-[#00C9A7] cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Comments Count Link */}
                  {(post.comments?.length || post.commentsCount) > 0 && (
                    <button
                      onClick={() => setActiveModalPost(post)}
                      className="text-[11px] text-[#F5F0E8]/50 hover:text-[#00C9A7] font-sans block pt-1 text-left"
                    >
                      Pogledaj sve komentare ({post.comments?.length || post.commentsCount})
                    </button>
                  )}

                  {/* Inline Comment Input Box */}
                  <div className="pt-2 border-t border-[#1A3152]/60 flex items-center gap-2">
                    <input
                      id={`comment-input-${post.id}`}
                      name={`comment_${post.id}`}
                      aria-label="Ostavi komentar na objavu"
                      type="text"
                      placeholder="Ostavi komentar..."
                      value={newCommentText[post.id] || ''}
                      onChange={(e) => setNewCommentText({ ...newCommentText, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(post.id, newCommentText[post.id] || '');
                        }
                      }}
                      className="w-full bg-[#0A1628] border border-[#1A3152] rounded-xl px-3 py-1.5 text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#00C9A7]/60"
                    />
                    <button
                      onClick={() => handleAddComment(post.id, newCommentText[post.id] || '')}
                      disabled={!(newCommentText[post.id] || '').trim()}
                      className="p-1.5 rounded-lg bg-[#00C9A7]/20 hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Date Stamp */}
                  <div className="text-[10px] font-mono text-[#F5F0E8]/40 uppercase pt-1">
                    {post.date}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Live Hashtag Ticker & Community Callout */}
        <div className="rounded-2xl bg-[#0F2038]/70 border border-[#1A3152] p-6 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-[#00C9A7]">
            <span className="px-3 py-1 rounded-lg bg-[#0A1628] border border-[#00C9A7]/20 hover:border-[#00C9A7] transition-colors">
              #BHAssistant
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0A1628] border border-[#C9A84C]/20 text-[#C9A84C] hover:border-[#C9A84C] transition-colors">
              #SCENAPlus
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0A1628] border border-[#00C9A7]/20 hover:border-[#00C9A7] transition-colors">
              #ZenicaDigital
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0A1628] border border-[#00C9A7]/20 hover:border-[#00C9A7] transition-colors">
              #BHKonver
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0A1628] border border-[#C9A84C]/20 text-[#C9A84C] hover:border-[#C9A84C] transition-colors">
              #StećakOrnamenti
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0A1628] border border-[#00C9A7]/20 hover:border-[#00C9A7] transition-colors">
              #ZENTAXI
            </span>
          </div>

          <p className="text-xs text-[#F5F0E8]/60 font-sans max-w-xl mx-auto">
            Označite <strong className="text-[#00C9A7]">@bh.asst</strong> na svojim objavama o dizajnu, tehnologiji i kulturi Zenice da biste bili predstavljeni na našem zvaničnom kanalu.
          </p>
        </div>

      </div>

      {/* Post Detail Lightbox Modal */}
      <AnimatePresence>
        {activeModalPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalPost(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0F2038] border border-[#1A3152] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalPost(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#0A1628]/80 text-[#F5F0E8] hover:bg-[#00C9A7] hover:text-[#0A1628] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Post Image */}
              <div className="md:w-1/2 bg-[#0A1628] flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-[#1A3152]">
                <SafeImage
                  src={activeModalPost.image}
                  alt={activeModalPost.caption}
                  fallbackTitle="B&H Assistant"
                  fallbackSubtitle={activeModalPost.categoryLabel}
                  className="max-h-[360px] md:max-h-[520px] w-full object-contain rounded-2xl"
                />
              </div>

              {/* Right Column: Details & Comments Feed */}
              <div className="md:w-1/2 flex flex-col justify-between p-6 bg-[#0F2038] overflow-y-auto">
                <div className="space-y-4">
                  
                  {/* Author Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-[#1A3152]">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0A1628] border border-[#00C9A7]/50 p-0.5 shrink-0">
                      <SafeImage
                        src={IMAGES.logo}
                        alt="bh.asst"
                        fallbackTitle="B&H"
                        fallbackSubtitle="A"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-syne font-bold text-sm text-[#F5F0E8]">
                          {COMPANY_INFO.instagramHandle}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9A7] fill-current" />
                      </div>
                      <p className="text-xs text-[#F5F0E8]/50 font-sans">
                        {activeModalPost.location || 'Zenica, BiH'}
                      </p>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-[#F5F0E8]/90 font-sans leading-relaxed">
                      {activeModalPost.caption}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeModalPost.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs font-mono text-[#00C9A7]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Comments Stream */}
                  <div className="pt-3 border-t border-[#1A3152] space-y-3 max-h-48 overflow-y-auto pr-2">
                    <h4 className="text-xs font-mono text-[#C9A84C] font-semibold uppercase">
                      Komentari zajednice ({activeModalPost.comments?.length || 0})
                    </h4>
                    {activeModalPost.comments && activeModalPost.comments.length > 0 ? (
                      activeModalPost.comments.map((c) => (
                        <div key={c.id} className="p-2.5 rounded-xl bg-[#0A1628]/60 border border-[#1A3152] space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-syne font-bold text-[#00C9A7]">@{c.author}</span>
                            <span className="text-[#F5F0E8]/40 font-mono">{c.timeAgo}</span>
                          </div>
                          <p className="text-xs text-[#F5F0E8]/80 font-sans">{c.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#F5F0E8]/40 font-sans italic">
                        Budi prvi koji će ostaviti komentar!
                      </p>
                    )}
                  </div>

                </div>

                {/* Modal Footer / Add Comment */}
                <div className="pt-4 border-t border-[#1A3152] space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLike(activeModalPost.id)}
                        className="p-1.5 rounded-lg text-[#F5F0E8]"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            likedPosts[activeModalPost.id] ? 'text-red-500 fill-red-500' : 'hover:text-red-400'
                          }`}
                        />
                      </button>
                      <span className="text-xs font-syne font-bold text-[#F5F0E8]">
                        {activeModalPost.likes} oznaka sviđanja
                      </span>
                    </div>

                    <a
                      href={activeModalPost.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#00C9A7] hover:underline flex items-center gap-1"
                    >
                      <span>Otvori na Instagramu</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="modal-comment-input"
                      name="modalComment"
                      aria-label="Napiši komentar na objavu"
                      type="text"
                      placeholder="Napiši komentar kao posjetilac..."
                      value={modalCommentText}
                      onChange={(e) => setModalCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(activeModalPost.id, modalCommentText);
                        }
                      }}
                      className="w-full bg-[#0A1628] border border-[#1A3152] rounded-xl px-3 py-2 text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#00C9A7]"
                    />
                    <button
                      onClick={() => handleAddComment(activeModalPost.id, modalCommentText)}
                      disabled={!modalCommentText.trim()}
                      className="px-4 py-2 rounded-xl bg-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs hover:bg-[#00E5BE] transition-colors disabled:opacity-30 disabled:pointer-events-none shrink-0"
                    >
                      Objavi
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/50 text-[#00C9A7] text-xs font-syne font-bold shadow-2xl shadow-black/80 flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
