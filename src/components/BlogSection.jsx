import React, { useState } from 'react';
import { Newspaper, Clock, Calendar, ArrowRight, Tag, CheckCircle2, Quote, Sparkles, BookOpen, X } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';

export default function BlogSection() {
  const { articles, siteImages, articleCategories } = useSite();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', ...(articleCategories || ['Retina Care', 'Pediatric Vision', 'Surgical Innovations', 'General Eye Health'])];

  const filteredPosts = selectedCategory === 'All'
    ? articles
    : articles.filter((post) => post.category === selectedCategory);

  return (
    <section id="articles" className="py-20 lg:py-28 relative overflow-hidden bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ophthalmic Knowledge & Patient Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
              Clinical Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">Eye Health Articles</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Evidence-based educational guides on pediatric myopia prevention, diabetic eye care, and modern vitreoretinal surgical techniques.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md shadow-cyan-600/30'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl overflow-hidden bg-slate-950/80 border border-slate-800/80 hover:border-cyan-600/40 hover:bg-slate-950 transition-all duration-300 flex flex-col group shadow-xl hover:shadow-cyan-950/30"
            >
              {/* Card Image Cover */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-800 text-cyan-300 shadow-md">
                    {post.category}
                  </span>
                </div>

                {/* Read Time & Date */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif group-hover:text-cyan-300 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags & Action Button */}
                <div className="pt-4 border-t border-slate-800/80 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-slate-400 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cyan-400/90 font-medium">
                      By {post.author.split(',')[0]}
                    </span>
                    <button
                      onClick={() => setActiveArticle(post)}
                      className="flex items-center gap-2 text-xs font-semibold text-white px-3.5 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-800/80 hover:border-cyan-600 transition-all group/btn"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-950 border border-cyan-800/50 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 space-y-6 relative">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Header */}
            <div className="space-y-3 pr-8">
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                <span>{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500">
                  <img src={siteImages.doctorProfile} alt={activeArticle.author} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{activeArticle.author}</div>
                  <div className="text-[11px] text-cyan-400">Vitreo-Retina Consultant & Author</div>
                </div>
              </div>
            </div>

            {/* Article Hero Image */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 h-64 sm:h-80">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Intro paragraph */}
            <div className="text-base text-slate-200 leading-relaxed font-light border-l-2 border-cyan-500 pl-4 italic">
              {activeArticle.content.intro}
            </div>

            {/* Subheadings and body sections */}
            <div className="space-y-6 pt-2">
              {activeArticle.content.subheadings.map((sub, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
                    {sub.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {sub.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Clinical Takeaways checklist */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-cyan-900/50 space-y-3">
              <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Key Clinical Takeaways for Patients
              </h4>
              <ul className="space-y-2">
                {activeArticle.content.clinicalTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Doctor Advice Quote Box */}
            <div className="p-5 rounded-2xl bg-cyan-950/40 border-l-4 border-cyan-400 text-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                <Quote className="w-4 h-4 text-cyan-400" />
                Specialist Clinical Advice
              </div>
              <p className="text-sm italic">
                "{activeArticle.content.doctorAdvice}"
              </p>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Published by Dr. dr. Nadia Artha Dewi, Sp.M(K)
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white border border-slate-700"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
