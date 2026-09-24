import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Image as ImageIcon, Sparkles, BookOpen, CheckCircle2, Quote, Tag } from 'lucide-react';
import { useSite } from '../../context/SiteContext.jsx';

export default function ArticleEditorModal({ isOpen, onClose, onSave, initialArticle }) {
  const { articleCategories, addArticleCategory } = useSite();
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: articleCategories?.[0] || 'Retina Care',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop',
    author: 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
    tagsString: 'Retina, Ophthalmology, Clinical Care',
    intro: '',
    subheadings: [
      { title: 'Clinical Overview & Pathophysiology', body: '' },
      { title: 'Diagnostic Criteria & Modern Imaging', body: '' }
    ],
    takeawaysString: 'Early detection prevents visual loss.\nSchedule regular dilated eye exams.\nConsult an ophthalmologist if floaters appear.',
    doctorAdvice: 'Never treat vision distortion as normal aging. Early intervention preserves sight.'
  });

  useEffect(() => {
    if (initialArticle) {
      setFormData({
        title: initialArticle.title || '',
        excerpt: initialArticle.excerpt || '',
        category: initialArticle.category || 'Retina Care',
        date: initialArticle.date || '',
        readTime: initialArticle.readTime || '5 min read',
        imageUrl: initialArticle.imageUrl || '',
        author: initialArticle.author || 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
        tagsString: (initialArticle.tags || []).join(', '),
        intro: initialArticle.content?.intro || '',
        subheadings: initialArticle.content?.subheadings && initialArticle.content.subheadings.length > 0
          ? initialArticle.content.subheadings
          : [{ title: 'Section 1', body: '' }],
        takeawaysString: (initialArticle.content?.clinicalTakeaways || []).join('\n'),
        doctorAdvice: initialArticle.content?.doctorAdvice || ''
      });
    } else {
      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        category: 'Retina Care',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        readTime: '5 min read',
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop',
        author: 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
        tagsString: 'Retina, Ophthalmology, Clinical Care',
        intro: '',
        subheadings: [
          { title: 'Clinical Overview & Pathophysiology', body: '' },
          { title: 'Diagnostic Criteria & Modern Imaging', body: '' }
        ],
        takeawaysString: 'Early detection prevents visual loss.\nSchedule regular dilated eye exams.\nConsult an ophthalmologist if floaters appear.',
        doctorAdvice: 'Never treat vision distortion as normal aging. Early intervention preserves sight.'
      });
    }
  }, [initialArticle, isOpen]);

  if (!isOpen) return null;

  // Handle local file image upload
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => ({ ...prev, imageUrl: uploadEvent.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add / remove subheadings
  const handleAddSubheading = () => {
    setFormData((prev) => ({
      ...prev,
      subheadings: [...prev.subheadings, { title: '', body: '' }]
    }));
  };

  const handleCreateCategory = (e) => {
    e?.preventDefault();
    if (!newCategoryName.trim()) return;
    const ok = addArticleCategory(newCategoryName.trim());
    if (ok) {
      setFormData((prev) => ({ ...prev, category: newCategoryName.trim() }));
      setNewCategoryName('');
      setIsAddingNewCategory(false);
    }
  };

  const handleRemoveSubheading = (index) => {
    setFormData((prev) => ({
      ...prev,
      subheadings: prev.subheadings.filter((_, i) => i !== index)
    }));
  };

  const handleSubheadingChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.subheadings];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, subheadings: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tags = formData.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const clinicalTakeaways = formData.takeawaysString
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const articlePayload = {
      id: initialArticle ? initialArticle.id : `blog-${Date.now()}`,
      title: formData.title,
      excerpt: formData.excerpt,
      category: formData.category,
      date: formData.date,
      readTime: formData.readTime,
      imageUrl: formData.imageUrl,
      author: formData.author,
      tags: tags.length > 0 ? tags : ['Ophthalmology'],
      content: {
        intro: formData.intro || formData.excerpt,
        subheadings: formData.subheadings.filter((s) => s.title.trim().length > 0),
        clinicalTakeaways: clinicalTakeaways.length > 0 ? clinicalTakeaways : ['Annual retinal exam is recommended.'],
        doctorAdvice: formData.doctorAdvice || 'Consult your ophthalmologist for personalized medical care.'
      }
    };

    onSave(articlePayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-cyan-800/60 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
            {initialArticle ? 'Edit Clinical Article' : 'Write New Ophthalmology Article'}
          </span>
          <h3 className="text-2xl font-bold text-white font-serif">
            {initialArticle ? 'Update Article Details' : 'Publish Article to Blog Hub'}
          </h3>
          <p className="text-xs text-slate-400">
            Articles authored here will immediately appear in the website's public blog cards with reader modal support.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Article Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Modern Approaches to Macular Hole Peeling Surgery"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Card Excerpt / Short Summary *</label>
            <textarea
              rows={2}
              required
              placeholder="Brief summary that appears on the blog card..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category, Date, Read Time in 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Category</label>
                <button
                  type="button"
                  onClick={() => setIsAddingNewCategory(!isAddingNewCategory)}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  {isAddingNewCategory ? 'Cancel' : '+ New Category'}
                </button>
              </div>

              {isAddingNewCategory ? (
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    autoFocus
                    placeholder="New category..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCreateCategory();
                      }
                    }}
                    className="flex-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/60 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    className="px-2.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shrink-0"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {articleCategories?.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  {formData.category && !articleCategories?.includes(formData.category) && (
                    <option value={formData.category}>{formData.category} (Custom)</option>
                  )}
                </select>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Publication Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Estimated Read Time</label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g. 5 min read"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Cover Image URL & File Upload */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>Cover Image</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-8 space-y-2">
                <input
                  type="text"
                  placeholder="Paste image URL (https://...)"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Or upload local file:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="text-[11px] text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-cyan-950 file:text-cyan-300 hover:file:bg-cyan-900 cursor-pointer"
                  />
                </div>
              </div>

              {/* Image Preview thumbnail */}
              <div className="sm:col-span-4 flex justify-center">
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-black border border-slate-700">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Tags (comma-separated)</label>
            <input
              type="text"
              placeholder="Retina, Vitrectomy, Diabetes, Vision Care"
              value={formData.tagsString}
              onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Full Article Content: Intro */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Article Introduction Paragraph</label>
            <textarea
              rows={3}
              placeholder="In-depth opening context discussing the clinical challenge..."
              value={formData.intro}
              onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Subheadings list */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Article Sections & Subheadings
              </label>
              <button
                type="button"
                onClick={handleAddSubheading}
                className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Section</span>
              </button>
            </div>

            {formData.subheadings.map((sub, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 relative">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    placeholder={`Section ${i + 1} Heading`}
                    value={sub.title}
                    onChange={(e) => handleSubheadingChange(i, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-cyan-500"
                  />
                  {formData.subheadings.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSubheading(i)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-lg"
                      title="Remove section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <textarea
                  rows={2}
                  placeholder={`Section ${i + 1} Body Content...`}
                  value={sub.body}
                  onChange={(e) => handleSubheadingChange(i, 'body', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            ))}
          </div>

          {/* Clinical Takeaways checklist (one line per takeaway) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Key Clinical Takeaways (one item per line)</span>
            </label>
            <textarea
              rows={3}
              placeholder="First takeaway point...&#10;Second takeaway point...&#10;Third takeaway point..."
              value={formData.takeawaysString}
              onChange={(e) => setFormData({ ...formData, takeawaysString: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Doctor Advice quote */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-cyan-400" />
              <span>Doctor's Concluding Clinical Advice</span>
            </label>
            <input
              type="text"
              placeholder="Direct clinical takeaway quote for patients..."
              value={formData.doctorAdvice}
              onChange={(e) => setFormData({ ...formData, doctorAdvice: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 italic"
            />
          </div>

          {/* Submit & Cancel */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-lg shadow-cyan-900/40"
            >
              <Save className="w-4 h-4" />
              <span>{initialArticle ? 'Save Changes' : 'Publish Article'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
