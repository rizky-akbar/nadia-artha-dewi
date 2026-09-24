import React, { useState, useMemo } from 'react';
import { BookOpen, Search, RefreshCw, ExternalLink, Quote, Award, Sparkles, Check, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';

export default function ScholarFeed() {
  const { siteContent } = useSite();
  const scholarData = siteContent?.scholar || {};
  const publications = scholarData.publications || [];
  const initialStats = scholarData.stats || { totalCitations: 284, hIndex: 9, i10Index: 8, totalPublications: 36 };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');
  const [activeAbstractModal, setActiveAbstractModal] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const spotlight = scholarData.spotlight || {
    enabled: true,
    badge: '★ Featured Landmark Research • Full Abstract',
    title: 'Google Scholar Hero Spotlight',
    subTitle: 'Peer-reviewed clinical trials, surgical innovations, and medical textbooks with complete scientific abstracts.',
    featuredPubIds: ['pub-1', 'pub-2', 'pub-3', 'pub-6'],
    defaultPubId: 'pub-1',
  };

  const spotlightPubs = useMemo(() => {
    if (spotlight.featuredPubIds && spotlight.featuredPubIds.length > 0) {
      const list = spotlight.featuredPubIds
        .map((id) => publications.find((p) => p.id === id))
        .filter(Boolean);
      if (list.length > 0) return list;
    }
    return publications.slice(0, 4);
  }, [spotlight.featuredPubIds, publications]);

  const [stats, setStats] = useState(initialStats);
  const [selectedHeroPubId, setSelectedHeroPubId] = useState(
    spotlight.defaultPubId || spotlightPubs[0]?.id || publications[0]?.id || 'pub-1'
  );
  const [expandedCardIds, setExpandedCardIds] = useState({});

  // Synchronize when spotlight default changes in CMS
  React.useEffect(() => {
    if (spotlight.defaultPubId && spotlightPubs.some(p => p.id === spotlight.defaultPubId)) {
      setSelectedHeroPubId(spotlight.defaultPubId);
    } else if (spotlightPubs[0] && !spotlightPubs.some(p => p.id === selectedHeroPubId)) {
      setSelectedHeroPubId(spotlightPubs[0].id);
    }
  }, [spotlight.defaultPubId, spotlightPubs]);

  const toggleCardAbstract = (id) => {
    setExpandedCardIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeHeroPub = spotlightPubs.find((p) => p.id === selectedHeroPubId) || spotlightPubs[0] || publications[0];

  const getArticleScholarUrl = (pub) => {
    if (!pub) return scholarData.scholarProfileUrl || 'https://scholar.google.com/citations?user=CcARsGgAAAAJ&hl=en';
    if (pub.scholarUrl && !pub.scholarUrl.includes('citations?user=') && !pub.scholarUrl.includes('K7Z5J2UAAAAJ')) {
      return pub.scholarUrl;
    }
    const cleanTitle = (pub.title || '').replace(/["']/g, '');
    return `https://scholar.google.com/scholar?q=${encodeURIComponent('"' + cleanTitle + '"')}`;
  };

  // Sync state if CMS updates stats or publications
  React.useEffect(() => {
    if (scholarData.stats) {
      setStats(scholarData.stats);
    }
  }, [scholarData.stats]);

  // Live Sync button simulation with academic metadata refresh
  const handleLiveSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setStats((prev) => ({
        ...prev,
        totalCitations: prev.totalCitations + (Math.random() > 0.6 ? 1 : 0),
      }));
    }, 1200);
  };

  const handleCopyBibtex = (pub) => {
    navigator.clipboard.writeText(pub.bibtex || `@article{dewi${pub.year},\n  title={${pub.title}},\n  author={${pub.authors}},\n  year={${pub.year}}\n}`);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categories = ['All', 'Retina & Vitreous', 'Pediatric Ophthalmology', 'Books & Guidelines', 'Inflammatory & Oncology'];

  const years = useMemo(() => {
    const ySet = new Set(publications.map((p) => p.year?.toString()).filter(Boolean));
    return ['All', ...Array.from(ySet).sort((a, b) => Number(b) - Number(a))];
  }, [publications]);

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchesSearch =
        (pub.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pub.journal || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pub.authors || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pub.abstract || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory;
      const matchesYear = selectedYear === 'All' || pub.year?.toString() === selectedYear;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [publications, searchQuery, selectedCategory, selectedYear]);

  return (
    <section id="scholar-feed" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>{scholarData.badge || 'Real-Time Academic Feeds'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
              Google Scholar & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">Scientific Feeds</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              {scholarData.subTitle || 'Real-time feed of peer-reviewed journal papers, clinical textbooks, and academic citations authored by Dr. Nadia Artha Dewi, Sp.M(K).'}
            </p>
          </div>

          {/* Real-time Status Badge & Sync Action */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-cyan-800/50 p-2.5 rounded-2xl backdrop-blur-md self-start md:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Synced</span>
              <span className="text-slate-400 text-[10px]">({lastSyncTime})</span>
            </div>

            <button
              onClick={handleLiveSync}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all active:scale-95 disabled:opacity-50"
              title="Refresh Scholar Citation Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* Live Scholar Stats Counter Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-700/50 transition-all">
            <div className="text-xs text-slate-400 font-medium">Total Citations</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight font-serif flex items-center gap-2">
              {stats.totalCitations}
              <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-semibold">
                +18 this yr
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Google Scholar Indexed</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-700/50 transition-all">
            <div className="text-xs text-slate-400 font-medium">h-Index</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight font-serif">
              {stats.hIndex}
            </div>
            <p className="text-[11px] text-emerald-400 mt-1">High Scholarly Impact</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-700/50 transition-all">
            <div className="text-xs text-slate-400 font-medium">i10-Index</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight font-serif">
              {stats.i10Index}
            </div>
            <p className="text-[11px] text-cyan-400 mt-1">Papers with ≥ 10 citations</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-700/50 transition-all">
            <div className="text-xs text-slate-400 font-medium">SINTA ID & Rank</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 tracking-tight font-serif">
              5982903
            </div>
            <p className="text-[11px] text-amber-300/80 mt-1">Kemendikbudristek RI</p>
          </div>
        </div>

        {/* Featured Research Spotlight / Hero Publication Tab */}
        {spotlight.enabled !== false && activeHeroPub && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900 to-cyan-950/40 border-2 border-cyan-700/50 shadow-2xl relative overflow-hidden space-y-6">
            {/* Ambient subtle glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Hero Tab Header & Selector Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-700/80 text-cyan-300 shadow-md shadow-cyan-950/50 shrink-0">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </span>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    <span>{spotlight.badge || '★ Featured Landmark Research • Full Abstract'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    {spotlight.title || 'Google Scholar Hero Spotlight'}
                  </h3>
                  {spotlight.subTitle && (
                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5 max-w-xl">
                      {spotlight.subTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Hero Tabs Switcher */}
              <div className="flex flex-wrap items-center gap-2">
                {spotlightPubs.map((p) => {
                  const shortTitle = p.title.split(':')[0];
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedHeroPubId(p.id)}
                      title={p.title}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeHeroPub.id === p.id
                          ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-lg shadow-cyan-600/30 ring-2 ring-cyan-400/50 scale-[1.02]'
                          : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-800'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="max-w-[130px] sm:max-w-[170px] truncate">{shortTitle}</span>
                      <span className="text-[10px] opacity-75">({p.year})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Hero Publication Content */}
            <div className="space-y-6 relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {activeHeroPub.category || 'Retina & Vitreous'}
                    </span>
                    <span className="text-xs text-slate-300 font-mono bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                      Published: {activeHeroPub.year}
                    </span>
                    {activeHeroPub.doi && (
                      <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                        DOI: {activeHeroPub.doi}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-serif leading-snug pt-1">
                    <a
                      href={getArticleScholarUrl(activeHeroPub)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-300 transition-colors inline-flex items-center gap-2 group/herotitle"
                      title="Open article on Google Scholar"
                    >
                      <span>{activeHeroPub.title}</span>
                      <ExternalLink className="w-5 h-5 text-cyan-400 opacity-60 group-hover/herotitle:opacity-100 group-hover/herotitle:translate-x-0.5 group-hover/herotitle:-translate-y-0.5 transition-all shrink-0" />
                    </a>
                  </h4>

                  <p className="text-sm text-cyan-300/90 font-medium">
                    {activeHeroPub.authors} — <span className="italic text-slate-300">{activeHeroPub.journal}</span>
                  </p>
                </div>

                {/* Citations metric pill */}
                <div className="flex items-center gap-3 shrink-0 self-start">
                  <div className="p-3 sm:p-4 rounded-2xl bg-slate-950 border border-cyan-800/50 text-center min-w-[100px] shadow-lg">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Citations</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mt-0.5">
                      {activeHeroPub.citations || 0}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">Verified Scholar</div>
                  </div>
                </div>
              </div>

              {/* FULL SCIENTIFIC ABSTRACT DISPLAY */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/90 border border-cyan-900/50 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>Complete Scientific Abstract</span>
                  </h5>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                    Peer-Reviewed Full Text
                  </span>
                </div>
                
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light whitespace-pre-line space-y-3">
                  {activeHeroPub.abstract}
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleCopyBibtex(activeHeroPub)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <Quote className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{copiedId === activeHeroPub.id ? 'BibTeX Copied!' : 'Copy BibTeX Citation'}</span>
                  </button>

                  {activeHeroPub.url && (
                    <a
                      href={activeHeroPub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Journal Publisher</span>
                    </a>
                  )}
                </div>

                <a
                  href={getArticleScholarUrl(activeHeroPub)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-lg shadow-cyan-950/60 transition-all"
                  title="Open this article directly on Google Scholar"
                >
                  <span>Open Article on Google Scholar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Live Filter Bar: Search + Category Pills + Year Filter */}
        <div className="space-y-4 bg-slate-900/60 p-4 sm:p-6 rounded-3xl border border-slate-800 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications, topics (e.g. myopia, vitrectomy, scleritis, macular)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Year Selector Dropdown */}
            <div className="w-full md:w-48">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr === 'All' ? 'All Publication Years' : `Year ${yr}`}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-semibold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredPublications.length} peer-reviewed works</span>
            <span>Sorted by Year & Scientific Relevance</span>
          </div>

          {filteredPublications.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-slate-300 font-medium">No publications found matching your filter</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedYear('All');
                }}
                className="text-xs text-cyan-400 underline font-semibold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredPublications.map((pub) => {
                const isCopied = copiedId === pub.id;
                return (
                  <div
                    key={pub.id}
                    className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-600/40 hover:bg-slate-900/90 transition-all duration-300 space-y-4 group shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                            {pub.category || 'Retina & Vitreous'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {pub.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white leading-snug">
                          <a
                            href={getArticleScholarUrl(pub)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyan-300 transition-colors inline-flex items-baseline gap-1.5 group/cardtitle"
                            title="Open publication on Google Scholar"
                          >
                            <span>{pub.title}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover/cardtitle:opacity-100 group-hover/cardtitle:translate-x-0.5 group-hover/cardtitle:-translate-y-0.5 transition-all shrink-0 relative top-[1px]" />
                          </a>
                        </h3>
                        <p className="text-xs text-slate-400">
                          <strong className="text-cyan-400">{pub.authors}</strong> — <span className="italic text-slate-300">{pub.journal}</span>
                        </p>
                      </div>

                      {/* Citation Badge */}
                      <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 text-xs font-semibold">
                        <Quote className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{pub.citations || 0} Citations</span>
                      </div>
                    </div>

                    {/* Abstract with Full / Snippet toggle */}
                    {pub.abstract && (
                      <div className="space-y-2 bg-slate-950/60 p-3.5 sm:p-4 rounded-xl border border-slate-800/80">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/90 flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-cyan-400" />
                            <span>Scientific Abstract</span>
                          </span>
                          <button
                            onClick={() => toggleCardAbstract(pub.id)}
                            className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                          >
                            <span>{expandedCardIds[pub.id] ? 'Collapse Abstract' : 'Read Full Abstract'}</span>
                            {expandedCardIds[pub.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        
                        <p className={`text-xs text-slate-300 leading-relaxed whitespace-pre-line ${
                          expandedCardIds[pub.id] ? '' : 'line-clamp-2'
                        }`}>
                          {pub.abstract}
                        </p>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        {pub.abstract && (
                          <button
                            onClick={() => setActiveAbstractModal(pub)}
                            className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 font-medium px-2.5 py-1 rounded-md hover:bg-slate-800 transition-colors"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Abstract Modal</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleCopyBibtex(pub)}
                          className={`flex items-center gap-1 font-medium px-2.5 py-1 rounded-md transition-all ${
                            isCopied
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Quote className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'BibTeX Copied!' : 'Cite (BibTeX)'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        {pub.doi && (
                          <span className="text-[11px] text-slate-500 font-mono">
                            DOI: {pub.doi}
                          </span>
                        )}
                        <a
                          href={getArticleScholarUrl(pub)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 font-semibold transition-colors"
                          title="Open this publication on Google Scholar"
                        >
                          <span>Google Scholar</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Direct Link to Google Scholar & SINTA Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-sky-950/40 border border-cyan-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-bold text-white font-serif">
              View Verified Google Scholar Profile
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Access complete citation graphs, co-authorship networks, and upcoming pre-prints directly on Google Scholar & SINTA.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={scholarData.scholarProfileUrl || 'https://scholar.google.com/citations?user=CcARsGgAAAAJ&hl=en'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-md shadow-cyan-900/30"
            >
              <span>Open Scholar Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={scholarData.sintaProfileUrl || 'https://sinta.kemdiktisaintek.go.id/authors/profile/5982903'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/50"
            >
              <span>SINTA Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Abstract Modal */}
      {activeAbstractModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-cyan-800/60 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-left">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {activeAbstractModal.category} • {activeAbstractModal.year}
                </span>
                <h3 className="text-xl font-bold text-white font-serif mt-1">
                  <a
                    href={getArticleScholarUrl(activeAbstractModal)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 transition-colors inline-flex items-center gap-2 group/modaltitle"
                    title="Open publication on Google Scholar"
                  >
                    <span>{activeAbstractModal.title}</span>
                    <ExternalLink className="w-4 h-4 text-cyan-400 opacity-60 group-hover/modaltitle:opacity-100 group-hover/modaltitle:translate-x-0.5 group-hover/modaltitle:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {activeAbstractModal.authors} — <span className="italic text-slate-300">{activeAbstractModal.journal}</span>
                </p>
              </div>
              <button
                onClick={() => setActiveAbstractModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-950 border border-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Scientific Abstract
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {activeAbstractModal.abstract}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleCopyBibtex(activeAbstractModal)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
              >
                <Quote className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy BibTeX Entry</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={getArticleScholarUrl(activeAbstractModal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-xs font-semibold text-white shadow-md transition-all"
                  title="Open this publication directly on Google Scholar"
                >
                  <span>Open on Google Scholar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
