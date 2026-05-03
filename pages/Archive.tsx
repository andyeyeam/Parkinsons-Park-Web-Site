import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft, Calendar, Tag, User, ExternalLink, X, ChevronDown, Archive as ArchiveIcon } from 'lucide-react';

interface ArchivePost {
  id: number;
  title: string;
  date: string;
  year: number;
  slug: string;
  link: string;
  author: string;
  categories: string[];
  tags: string[];
  mainCategory: string;
  excerpt: string;
  content: string;
  images: string[];
}

interface ArchiveData {
  generated: string;
  totalPosts: number;
  categories: { name: string; count: number }[];
  years: { year: number; count: number }[];
  posts: ArchivePost[];
}

const MAIN_CATS = ['Events', 'Ecology', 'History', 'All Our Stories', 'Friends', 'Regeneration', 'Facilities', 'Bird Watch', 'Interesting Features'];

const categoryColour = (cat: string) => {
  const map: Record<string, string> = {
    Events: 'bg-amber-100 text-amber-800',
    Ecology: 'bg-emerald-100 text-emerald-800',
    History: 'bg-stone-200 text-stone-800',
    'All Our Stories': 'bg-purple-100 text-purple-800',
    Friends: 'bg-blue-100 text-blue-800',
    Regeneration: 'bg-orange-100 text-orange-800',
    Facilities: 'bg-cyan-100 text-cyan-800',
    'Bird Watch': 'bg-sky-100 text-sky-800',
    'Interesting Features': 'bg-rose-100 text-rose-800',
  };
  return map[cat] || 'bg-stone-100 text-stone-600';
};

// ── Post modal ────────────────────────────────────────────────────────────────

// ── Image lightbox ────────────────────────────────────────────────────────────

const Lightbox: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/40 rounded-full p-2 transition-colors"
        aria-label="Close image"
      >
        <X className="w-6 h-6" />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
};

const WP_NOTICE_KEY = 'archive_wp_notice_dismissed';

// ── WordPress redirect notice ─────────────────────────────────────────────────

const WpRedirectNotice: React.FC<{ url: string; onConfirm: () => void; onCancel: () => void }> = ({ url, onConfirm, onCancel }) => {
  const [dontShow, setDontShow] = useState(false);

  const handleConfirm = () => {
    if (dontShow) localStorage.setItem(WP_NOTICE_KEY, '1');
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl p-7" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 rounded-full p-2 shrink-0">
            <ExternalLink className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-bold text-stone-900 text-lg">Leaving this site</h3>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed mb-2">
          You are about to visit the original Friends of Parkinson's Park WordPress site where this post was first published.
        </p>
        <p className="text-stone-400 text-xs mb-6 break-all">{url}</p>
        <label className="flex items-center gap-2.5 mb-6 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={dontShow}
            onChange={e => setDontShow(e.target.checked)}
            className="w-4 h-4 rounded accent-emerald-700 cursor-pointer"
          />
          <span className="text-sm text-stone-500 group-hover:text-stone-700 transition-colors">
            Don't show this message again
          </span>
        </label>
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" /> Visit WordPress site
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-stone-600 bg-stone-100 hover:bg-stone-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Post modal ────────────────────────────────────────────────────────────────

const PostModal: React.FC<{ post: ArchivePost; onClose: () => void }> = ({ post, onClose }) => {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [showWpNotice, setShowWpNotice] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { lightbox ? setLightbox(null) : onClose(); }
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose, lightbox]);

  // Intercept clicks on images inside the rendered HTML content
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest('img');
      if (img) {
        e.stopPropagation();
        setLightbox({ src: img.src, alt: img.alt || '' });
      }
    };
    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, []);

  // Style images in content as clickable once mounted
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.querySelectorAll('img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.title = 'Click to enlarge';
    });
  }, [post.content]);

  const date = new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
        <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl" onClick={e => e.stopPropagation()}>
          {/* Modal header */}
          <div className="bg-emerald-900 text-white p-8 rounded-t-3xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-emerald-200 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map(c => (
                <span key={c} className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColour(c)}`}>{c}</span>
              ))}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">{post.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-emerald-200 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{date}</span>
              {post.author && <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>}
              {post.link && (
                <button
                  onClick={() => {
                    if (localStorage.getItem(WP_NOTICE_KEY)) {
                      window.open(post.link, '_blank', 'noopener,noreferrer');
                    } else {
                      setShowWpNotice(true);
                    }
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> View original post
                </button>
              )}
            </div>
          </div>

          {/* Modal body */}
          <div className="p-8">
            <div
              ref={contentRef}
              className="prose prose-stone max-w-none prose-img:rounded-xl prose-img:shadow-md prose-a:text-emerald-700 prose-headings:text-stone-900"
              dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
            />

            {post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-stone-400 shrink-0" />
                  {post.tags.map(t => (
                    <span key={t} className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}

      {showWpNotice && (
        <WpRedirectNotice
          url={post.link}
          onConfirm={() => {
            setShowWpNotice(false);
            window.open(post.link, '_blank', 'noopener,noreferrer');
          }}
          onCancel={() => setShowWpNotice(false)}
        />
      )}
    </>
  );
};

// ── Post card ─────────────────────────────────────────────────────────────────

const PostCard: React.FC<{ post: ArchivePost; onClick: () => void }> = ({ post, onClick }) => {
  const date = new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const thumb = post.images[0];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer overflow-hidden flex flex-col"
    >
      {thumb && (
        <div className="h-44 overflow-hidden">
          <img src={thumb} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
      )}
      {!thumb && (
        <div className="h-20 bg-gradient-to-br from-emerald-50 to-stone-100 flex items-center justify-center">
          <span className="text-emerald-300 text-3xl font-bold">{post.title[0]}</span>
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.categories.slice(0, 2).map(c => (
            <span key={c} className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${categoryColour(c)}`}>{c}</span>
          ))}
        </div>
        <h3 className="font-bold text-stone-900 leading-snug mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-stone-500 text-xs leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
          <span className="text-xs text-stone-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{date}</span>
          {post.images.length > 1 && (
            <span className="text-xs text-stone-400">{post.images.length} photos</span>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Archive page ─────────────────────────────────────────────────────────

const Archive: React.FC = () => {
  const [data, setData] = useState<ArchiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedYear, setSelectedYear] = useState(Number(searchParams.get('year')) || 0);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [showAllTags, setShowAllTags] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedPost, setSelectedPost] = useState<ArchivePost | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    fetch('/archive-data.json')
      .then(r => { if (!r.ok) throw new Error('Archive data not found'); return r.json(); })
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  // Build sorted tag list (tags with 2+ posts)
  const availableTags = useMemo(() => {
    if (!data) return [];
    const counts: Record<string, number> = {};
    for (const post of data.posts) {
      for (const tag of post.tags) counts[tag] = (counts[tag] || 0) + 1;
    }
    return Object.entries(counts)
      .filter(([, c]) => c >= 2)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [data]);

  const visibleTags = showAllTags ? availableTags : availableTags.slice(0, 20);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    let posts = [...data.posts];

    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.categories.some(c => c.toLowerCase().includes(q)) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      posts = posts.filter(p => p.categories.includes(selectedCategory));
    }

    if (selectedYear) {
      posts = posts.filter(p => p.year === selectedYear);
    }

    if (selectedTags.size > 0) {
      posts = posts.filter(p => p.tags.some(t => selectedTags.has(t)));
    }

    if (sortOrder === 'oldest') posts.reverse();

    return posts;
  }, [data, search, selectedCategory, selectedYear, selectedTags, sortOrder]);

  const visible = filtered.slice(0, visibleCount);

  // Reset visible count when filters change
  useEffect(() => { setVisibleCount(24); }, [search, selectedCategory, selectedYear, selectedTags, sortOrder]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-600">Loading archive…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <p className="text-stone-600 mb-4">{error}</p>
        <p className="text-sm text-stone-400">Run <code>npm run build:archive</code> to generate the archive data.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-stone-50 pb-24">
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-emerald-800/50 rounded-2xl mb-6 backdrop-blur-sm border border-emerald-700">
            <ArchiveIcon className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Post Archive</h1>
          <p className="text-xl text-emerald-100 max-w-3xl font-light leading-relaxed mb-10">
            A complete record of every post published by the Friends of Parkinson's Park since the group was founded in 2011.
          </p>

          {/* About the archive */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <div className="bg-emerald-800/50 border border-emerald-700/60 rounded-2xl p-6">
              <div className="text-3xl font-bold text-emerald-300 mb-1">{data?.totalPosts ?? 460}</div>
              <div className="text-emerald-100 font-semibold mb-2">Posts</div>
              <p className="text-emerald-200 text-sm leading-relaxed">From the very first meeting in October 2011 through to 2026 — every update, event report, and ecological observation.</p>
            </div>
            <div className="bg-emerald-800/50 border border-emerald-700/60 rounded-2xl p-6">
              <div className="text-3xl font-bold text-emerald-300 mb-1">1,087</div>
              <div className="text-emerald-100 font-semibold mb-2">Photographs</div>
              <p className="text-emerald-200 text-sm leading-relaxed">All original images from the WordPress site, preserved here alongside their posts so the full visual record is available in one place.</p>
            </div>
            <div className="bg-emerald-800/50 border border-emerald-700/60 rounded-2xl p-6">
              <div className="text-3xl font-bold text-emerald-300 mb-1">15</div>
              <div className="text-emerald-100 font-semibold mb-2">Years of History</div>
              <p className="text-emerald-200 text-sm leading-relaxed">The archive spans the full life of FOPP — from early regeneration work with Bellway through to the park's recognition as a Fields in Trust Local Favourite.</p>
            </div>
          </div>

          <div className="mt-8 max-w-3xl bg-emerald-800/30 border border-emerald-700/40 rounded-2xl p-5 text-sm text-emerald-200 leading-relaxed">
            <span className="font-semibold text-white">Where this comes from: </span>
            This archive was exported from the Friends of Parkinson's Park WordPress site at
            <a href="https://friendsofparkinsonspark.wordpress.com" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white underline mx-1">friendsofparkinsonspark.wordpress.com</a>
            in May 2026. All posts are preserved in their original form, including text, images, categories, and tags. Use the filters below to search and browse by topic or year.
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts, topics, tags…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-600 outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === 'all' ? 'bg-emerald-700 text-white shadow-md' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
            >
              All ({data?.totalPosts})
            </button>
            {MAIN_CATS.map(cat => {
              const count = data?.categories.find(c => c.name === cat)?.count || 0;
              if (!count) return null;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? 'all' : cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === cat ? 'bg-emerald-700 text-white shadow-md' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Label (tag) multi-select */}
          <div className="border-t border-stone-100 pt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-stone-400" />
                <span className="text-sm font-semibold text-stone-600">Labels</span>
                {selectedTags.size > 0 && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                    {selectedTags.size} selected
                  </span>
                )}
              </div>
              {selectedTags.size > 0 && (
                <button
                  onClick={() => setSelectedTags(new Set())}
                  className="text-xs text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear labels
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {visibleTags.map(({ name, count }) => {
                const active = selectedTags.has(name);
                return (
                  <button
                    key={name}
                    onClick={() => toggleTag(name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      active
                        ? 'bg-emerald-700 text-white shadow-md'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {active && <X className="w-2.5 h-2.5" />}
                    {name}
                    <span className={`text-[10px] ${active ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
              {availableTags.length > 20 && (
                <button
                  onClick={() => setShowAllTags(v => !v)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all"
                >
                  {showAllTags ? 'Show fewer' : `+${availableTags.length - 20} more labels`}
                </button>
              )}
            </div>
          </div>

          {/* Year + sort row */}
          <div className="flex flex-wrap gap-3 items-center border-t border-stone-100 pt-5">
            <div className="relative">
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(Number(e.target.value))}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-semibold text-stone-700 focus:ring-2 focus:ring-emerald-600 outline-none cursor-pointer"
              >
                <option value={0}>All years</option>
                {data?.years.map(y => (
                  <option key={y.year} value={y.year}>{y.year} ({y.count})</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value as 'newest' | 'oldest')}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-semibold text-stone-700 focus:ring-2 focus:ring-emerald-600 outline-none cursor-pointer"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>

            <span className="text-sm text-stone-400 ml-auto">
              {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} found
              {selectedTags.size > 0 && (
                <span className="ml-1 text-emerald-600 font-semibold">· {selectedTags.size} label{selectedTags.size > 1 ? 's' : ''} active</span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-stone-300">
            <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-stone-400">No posts found</h3>
            <p className="text-stone-400 mt-2 text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visible.map(post => (
                <PostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount(v => v + 24)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-4 rounded-full font-bold transition-all shadow-md"
                >
                  Load more ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Post modal */}
      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default Archive;
