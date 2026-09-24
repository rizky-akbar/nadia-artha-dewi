import React, { useState } from 'react';
import { 
  X, Image as ImageIcon, FileText, Settings, Plus, Edit, Trash2, 
  RotateCcw, Upload, Download, Shield, LogOut, Check, Sparkles, 
  Eye, KeyRound, User, Stethoscope, GraduationCap, Compass, BookOpen, Building, Phone, Target, Tag, Star,
  Globe, Search, Share2, Link2, Copy, AlertCircle, CheckCircle2, Code2, ExternalLink
} from 'lucide-react';
import { useSite } from '../../context/SiteContext.jsx';
import { defaultSiteContent } from '../../data/defaultSiteContent.js';
import ArticleEditorModal from './ArticleEditorModal.jsx';

export default function AdminPanelModal() {
  const {
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    siteContent,
    updateSection,
    updateArraySection,
    resetSection,
    resetAllContent,
    exportBackupJSON,
    importBackupJSON,
    siteImages,
    updateImage,
    resetImage,
    resetAllImages,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    resetArticles,
    articleCategories,
    addArticleCategory,
    deleteArticleCategory,
    resetArticleCategories,
    logoutAdmin,
    adminPasscode,
    updatePasscode,
    showToast,
  } = useSite();

  const [activeTab, setActiveTab] = useState('hero');
  const [articleEditorOpen, setArticleEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('All');
  const [newCategoryInput, setNewCategoryInput] = useState('');

  // Custom URLs for images
  const [customUrls, setCustomUrls] = useState({
    doctorProfile: '',
    doctorConsultation: '',
    retinaNormal: '',
    retinaDiabetic: '',
  });

  // Passcode change
  const [newPasscode, setNewPasscode] = useState('');

  // Local state buffers for CMS sections
  const [heroForm, setHeroForm] = useState(siteContent.hero);
  const [aboutForm, setAboutForm] = useState(siteContent.about);
  const [specialtiesList, setSpecialtiesList] = useState(siteContent.specialties || []);
  const [educationList, setEducationList] = useState(siteContent.education || []);
  const [scholarStatsForm, setScholarStatsForm] = useState(siteContent.scholar.stats);
  const [scholarMetaForm, setScholarMetaForm] = useState({
    scholarProfileUrl: siteContent.scholar.scholarProfileUrl,
    sintaProfileUrl: siteContent.scholar.sintaProfileUrl,
  });
  const [publicationsList, setPublicationsList] = useState(siteContent.scholar.publications || []);
  const defaultScholarSpotlight = {
    enabled: true,
    badge: '★ Featured Landmark Research • Full Abstract',
    title: 'Google Scholar Hero Spotlight',
    subTitle: 'Peer-reviewed clinical trials, surgical innovations, and medical textbooks with complete scientific abstracts.',
    featuredPubIds: ['pub-1', 'pub-2', 'pub-3', 'pub-6'],
    defaultPubId: 'pub-1',
  };
  const [scholarSpotlightForm, setScholarSpotlightForm] = useState(
    siteContent.scholar?.spotlight || defaultScholarSpotlight
  );

  // Sync scholar state when context changes
  React.useEffect(() => {
    if (siteContent?.scholar) {
      if (siteContent.scholar.stats) setScholarStatsForm(siteContent.scholar.stats);
      if (siteContent.scholar.scholarProfileUrl || siteContent.scholar.sintaProfileUrl) {
        setScholarMetaForm({
          scholarProfileUrl: siteContent.scholar.scholarProfileUrl || '',
          sintaProfileUrl: siteContent.scholar.sintaProfileUrl || '',
        });
      }
      if (siteContent.scholar.publications) setPublicationsList(siteContent.scholar.publications);
      if (siteContent.scholar.spotlight) setScholarSpotlightForm(siteContent.scholar.spotlight);
    }
  }, [siteContent.scholar]);
  const [amslerForm, setAmslerForm] = useState(siteContent.amsler);
  const [practiceLocations, setPracticeLocations] = useState(siteContent.practice.locations || []);
  const [practiceEmergency, setPracticeEmergency] = useState({
    emergencyTitle: siteContent.practice.emergencyTitle,
    emergencyText: siteContent.practice.emergencyText,
    emergencyPhone: siteContent.practice.emergencyPhone,
  });
  const [contactForm, setContactForm] = useState(siteContent.contact);
  const [footerForm, setFooterForm] = useState(siteContent.footer);
  const [retinaForm, setRetinaForm] = useState(siteContent.retina || {});
  const [seoForm, setSeoForm] = useState(siteContent.seo || defaultSiteContent.seo);
  const [previewTab, setPreviewTab] = useState('google');
  const [copiedSchema, setCopiedSchema] = useState(false);

  React.useEffect(() => {
    if (siteContent?.seo) {
      setSeoForm(siteContent.seo);
    }
  }, [siteContent.seo]);

  // Modals / sub-editors
  const [editingPubIndex, setEditingPubIndex] = useState(null);
  const [pubForm, setPubForm] = useState({
    id: '',
    title: '',
    authors: '',
    journal: '',
    year: 2026,
    citations: 0,
    category: 'Retina & Vitreous',
    abstract: '',
    scholarUrl: '',
    doi: ''
  });

  if (!isAdminPanelOpen) return null;

  const handleClose = () => {
    setIsAdminPanelOpen(false);
    if (window.location.hash === '#admin') window.location.hash = '';
    if (window.location.pathname === '/admin') window.history.pushState(null, '', '/');
  };

  // Image Upload handler
  const handleFileUpload = (key, e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image file exceeds 5MB limit.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        updateImage(key, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = (key) => {
    const url = customUrls[key]?.trim();
    if (url) {
      updateImage(key, url);
      setCustomUrls((prev) => ({ ...prev, [key]: '' }));
    }
  };

  // Save Handlers for CMS Sections
  const handleSaveHero = (e) => {
    e.preventDefault();
    updateSection('hero', heroForm);
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateSection('about', aboutForm);
  };

  const handleSaveSpecialties = () => {
    updateArraySection('specialties', specialtiesList);
  };

  const handleAddSpecialty = () => {
    const newSpec = {
      title: 'New Clinical Specialty',
      desc: 'Clinical evaluation, diagnosis, and advanced therapeutic interventions.',
      tag: 'Specialty Care',
    };
    const updated = [...specialtiesList, newSpec];
    setSpecialtiesList(updated);
    updateArraySection('specialties', updated);
  };

  const handleDeleteSpecialty = (index) => {
    const updated = specialtiesList.filter((_, i) => i !== index);
    setSpecialtiesList(updated);
    updateArraySection('specialties', updated);
  };

  const handleSaveEducation = () => {
    updateArraySection('education', educationList);
  };

  const handleAddEducation = () => {
    const newEdu = {
      year: '2026',
      title: 'New Medical Credential / Degree',
      institution: 'University / Medical Center',
      description: 'Program details and clinical fellowship focus.',
    };
    const updated = [...educationList, newEdu];
    setEducationList(updated);
    updateArraySection('education', updated);
  };

  const handleDeleteEducation = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
    updateArraySection('education', updated);
  };

  const handleSaveRetina = (e) => {
    e.preventDefault();
    updateSection('retina', retinaForm);
    showToast('Saved Retina Explorer settings!');
  };

  const handleSaveScholar = (e) => {
    if (e) e.preventDefault();
    updateSection('scholar', {
      ...siteContent.scholar,
      stats: scholarStatsForm,
      scholarProfileUrl: scholarMetaForm.scholarProfileUrl,
      sintaProfileUrl: scholarMetaForm.sintaProfileUrl,
      publications: publicationsList,
      spotlight: scholarSpotlightForm,
    });
    showToast('Saved Google Scholar metrics & settings!');
  };

  const handleSaveSpotlight = (e) => {
    if (e) e.preventDefault();
    updateSection('scholar', {
      ...siteContent.scholar,
      stats: scholarStatsForm,
      scholarProfileUrl: scholarMetaForm.scholarProfileUrl,
      sintaProfileUrl: scholarMetaForm.sintaProfileUrl,
      publications: publicationsList,
      spotlight: scholarSpotlightForm,
    });
    showToast('Saved Hero Spotlight configuration!');
  };

  const handleToggleSpotlightPub = (pubId) => {
    const current = scholarSpotlightForm.featuredPubIds || [];
    let nextFeatured;
    let nextDefault = scholarSpotlightForm.defaultPubId;

    if (current.includes(pubId)) {
      if (current.length <= 1) {
        showToast('At least one publication must remain featured in the Hero Spotlight.', 'error');
        return;
      }
      nextFeatured = current.filter((id) => id !== pubId);
      if (nextDefault === pubId) {
        nextDefault = nextFeatured[0] || '';
      }
    } else {
      nextFeatured = [...current, pubId];
      if (!nextDefault) nextDefault = pubId;
    }

    const updated = {
      ...scholarSpotlightForm,
      featuredPubIds: nextFeatured,
      defaultPubId: nextDefault,
    };
    setScholarSpotlightForm(updated);
    updateSection('scholar', {
      ...siteContent.scholar,
      spotlight: updated,
    });
  };

  const handleSetDefaultSpotlightPub = (pubId) => {
    const current = scholarSpotlightForm.featuredPubIds || [];
    const nextFeatured = current.includes(pubId) ? current : [...current, pubId];
    const updated = {
      ...scholarSpotlightForm,
      featuredPubIds: nextFeatured,
      defaultPubId: pubId,
    };
    setScholarSpotlightForm(updated);
    updateSection('scholar', {
      ...siteContent.scholar,
      spotlight: updated,
    });
    showToast('Set as active default tab for Hero Spotlight!');
  };

  const handleSavePublication = (e) => {
    e.preventDefault();
    let updated;
    if (editingPubIndex !== null) {
      updated = [...publicationsList];
      updated[editingPubIndex] = pubForm;
    } else {
      const newId = `pub-${Date.now()}`;
      updated = [{ ...pubForm, id: newId }, ...publicationsList];
    }
    setPublicationsList(updated);
    updateSection('scholar', {
      ...siteContent.scholar,
      publications: updated,
      spotlight: scholarSpotlightForm,
    });
    setEditingPubIndex(null);
    setPubForm({
      id: '',
      title: '',
      authors: '',
      journal: '',
      year: 2026,
      citations: 0,
      category: 'Retina & Vitreous',
      abstract: '',
      scholarUrl: '',
      doi: ''
    });
    showToast('Saved publication to Google Scholar feed!');
  };

  const handleDeletePublication = (index) => {
    if (window.confirm('Delete this publication from scholar feed?')) {
      const pubToDelete = publicationsList[index];
      const updated = publicationsList.filter((_, i) => i !== index);
      setPublicationsList(updated);

      let updatedSpotlight = scholarSpotlightForm;
      if (pubToDelete && scholarSpotlightForm.featuredPubIds?.includes(pubToDelete.id)) {
        const nextFeatured = scholarSpotlightForm.featuredPubIds.filter(id => id !== pubToDelete.id);
        const nextDefault = scholarSpotlightForm.defaultPubId === pubToDelete.id 
          ? (nextFeatured[0] || '') 
          : scholarSpotlightForm.defaultPubId;
        updatedSpotlight = {
          ...scholarSpotlightForm,
          featuredPubIds: nextFeatured,
          defaultPubId: nextDefault,
        };
        setScholarSpotlightForm(updatedSpotlight);
      }

      updateSection('scholar', {
        ...siteContent.scholar,
        publications: updated,
        spotlight: updatedSpotlight,
      });
      showToast('Publication deleted from feed.');
    }
  };

  const handleSavePractice = (e) => {
    e.preventDefault();
    updateSection('practice', {
      ...siteContent.practice,
      locations: practiceLocations,
      ...practiceEmergency,
    });
    updateSection('contact', contactForm);
    updateSection('footer', footerForm);
  };

  const handleAddLocation = () => {
    const newLoc = {
      name: 'New Eye Clinic / Hospital',
      division: 'Poliklinik Mata & Konsultasi',
      type: 'Specialist Eye Clinic',
      address: 'Malang, Jawa Timur',
      phone: '(0341) 000000',
      schedule: [
        { days: 'Monday – Friday', hours: '09:00 – 15:00 WIB' }
      ],
      badge: 'Branch Clinic',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      mapsUrl: 'https://maps.google.com/',
    };
    const updated = [...practiceLocations, newLoc];
    setPracticeLocations(updated);
    updateSection('practice', { ...siteContent.practice, locations: updated });
  };

  const handleDeleteLocation = (index) => {
    const updated = practiceLocations.filter((_, i) => i !== index);
    setPracticeLocations(updated);
    updateSection('practice', { ...siteContent.practice, locations: updated });
  };

  // SEO Handlers
  const handleSaveSeo = (e) => {
    if (e) e.preventDefault();
    updateSection('seo', seoForm);
    showToast('SEO & Metadata settings saved! Applied live to website head.');
  };

  const handleResetSeo = () => {
    if (window.confirm('Reset all SEO settings to the recommended default values?')) {
      resetSection('seo');
      setSeoForm(defaultSiteContent.seo);
      showToast('SEO settings reset to default values.');
    }
  };

  const handleCopySchemaJson = () => {
    const rawImage = seoForm.ogImage || siteImages?.doctorProfile || '/assets/dr_nadia_profile.jpg';
    const absoluteImageUrl = rawImage.startsWith('http')
      ? rawImage
      : `${seoForm.canonicalUrl || 'https://nadia-artha-dewi.vercel.app'}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

    const specialties = (seoForm.medicalSpecialty || 'Ophthalmology, Vitreo-Retina Surgery')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const schemaObj = {
      '@context': 'https://schema.org',
      '@type': seoForm.schemaType || 'Physician',
      'name': 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
      'jobTitle': 'Vitreo-Retina Consultant Ophthalmologist',
      'image': absoluteImageUrl,
      'description': seoForm.metaDescription,
      'url': seoForm.canonicalUrl || 'https://nadia-artha-dewi.vercel.app',
      'medicalSpecialty': specialties,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': seoForm.clinicCity || 'Malang',
        'addressRegion': 'Jawa Timur',
        'addressCountry': seoForm.clinicCountry || 'Indonesia',
      },
      'hospitalAffiliation': [
        {
          '@type': 'Hospital',
          'name': 'RSUD Dr. Saiful Anwar Malang',
        },
        {
          '@type': 'MedicalOrganization',
          'name': 'Fakultas Kedokteran Universitas Brawijaya',
        },
      ],
      'sameAs': [
        'https://scholar.google.com/citations?user=CcARsGgAAAAJ&hl=en',
        'https://sinta.kemdiktisaintek.go.id/authors/profile/5982903',
      ],
    };

    navigator.clipboard.writeText(JSON.stringify(schemaObj, null, 2));
    setCopiedSchema(true);
    showToast('Schema.org JSON-LD copied to clipboard!');
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  // Article handlers
  const handleOpenNewArticle = () => {
    setEditingArticle(null);
    setArticleEditorOpen(true);
  };

  const handleOpenEditArticle = (art) => {
    setEditingArticle(art);
    setArticleEditorOpen(true);
  };

  const handleSaveArticle = (savedArticle) => {
    if (editingArticle) {
      updateArticle(savedArticle);
    } else {
      addArticle(savedArticle);
    }
  };

  const handleDeleteArticlePrompt = (art) => {
    if (window.confirm(`Delete article: "${art.title}"?`)) {
      deleteArticle(art.id);
    }
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCategoryInput.trim()) return;
    const success = addArticleCategory(newCategoryInput.trim());
    if (success) {
      setNewCategoryInput('');
    }
  };

  const handleDeleteCategoryPrompt = (categoryName) => {
    const count = articles.filter((a) => a.category === categoryName).length;
    let message = `Are you sure you want to delete category "${categoryName}"?`;
    if (count > 0) {
      const fallback = articleCategories.find((c) => c !== categoryName) || 'General Eye Health';
      message += `\n\nNotice: ${count} article(s) are currently tagged with "${categoryName}". They will automatically be reassigned to "${fallback}".`;
    }
    if (window.confirm(message)) {
      deleteArticleCategory(categoryName);
      if (articleCategoryFilter === categoryName) {
        setArticleCategoryFilter('All');
      }
    }
  };

  const filteredArticlesAdmin = articles.filter((art) => {
    const matchesCategory = articleCategoryFilter === 'All' || art.category === articleCategoryFilter;
    const matchesSearch =
      !articleSearch ||
      (art.title || '').toLowerCase().includes(articleSearch.toLowerCase()) ||
      (art.excerpt || '').toLowerCase().includes(articleSearch.toLowerCase()) ||
      (art.author || '').toLowerCase().includes(articleSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Backup file import
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = importBackupJSON(event.target.result);
        if (success) {
          // reload form state
          setTimeout(() => window.location.reload(), 800);
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePasscodeChange = (e) => {
    e.preventDefault();
    if (newPasscode.trim().length >= 4) {
      updatePasscode(newPasscode.trim());
      setNewPasscode('');
    } else {
      showToast('Passcode must be at least 4 characters.', 'error');
    }
  };

  const navTabs = [
    { id: 'hero', label: 'Hero & Identity', icon: User },
    { id: 'pictures', label: 'Picture Manager', icon: ImageIcon },
    { id: 'about', label: 'About & Specialties', icon: Stethoscope },
    { id: 'education', label: 'Education Milestones', icon: GraduationCap },
    { id: 'retina', label: 'Retina Explorer CMS', icon: Target },
    { id: 'scholar', label: 'Scholar & Publications', icon: BookOpen },
    { id: 'articles', label: 'Articles & Blog', icon: FileText },
    { id: 'amsler', label: 'Amsler Grid CMS', icon: Eye },
    { id: 'practice', label: 'Practice & Contact', icon: Building },
    { id: 'seo', label: 'SEO & Metadata', icon: Globe },
    { id: 'settings', label: 'Backup & Security', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-cyan-800/60 rounded-3xl max-w-6xl w-full max-h-[96vh] overflow-hidden shadow-2xl flex flex-col relative text-left">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-400 font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white font-serif tracking-tight">
                  Full-Site Content Management Suite
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  /admin CMS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live editor for text, statistics, specializations, publications, and clinic schedules
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportBackupJSON}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-xs font-semibold text-cyan-300 border border-cyan-800"
              title="Download JSON Backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-xs font-semibold text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-900 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation (Scrollable horizontally) */}
        <div className="flex items-center gap-1 px-4 sm:px-6 border-b border-slate-800 bg-slate-950 text-xs font-semibold overflow-x-auto no-scrollbar">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-400 font-bold bg-cyan-950/20'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* TAB 1: HERO & IDENTITY CMS */}
          {activeTab === 'hero' && (
            <form onSubmit={handleSaveHero} className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">Hero Section & Physician Identity</h3>
                  <p className="text-xs text-slate-400">Edit titles, headline wording, bio statement, and clinical achievement metrics.</p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-md"
                >
                  Save Hero Changes
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Doctor Full Name</label>
                  <input
                    type="text"
                    value={heroForm.doctorName}
                    onChange={(e) => setHeroForm({ ...heroForm, doctorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Degree / Subspecialty Badge</label>
                  <input
                    type="text"
                    value={heroForm.doctorDegree}
                    onChange={(e) => setHeroForm({ ...heroForm, doctorDegree: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Fellowship Badge Pill</label>
                <input
                  type="text"
                  value={heroForm.fellowshipBadge}
                  onChange={(e) => setHeroForm({ ...heroForm, fellowshipBadge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Headline Primary Text</label>
                  <input
                    type="text"
                    value={heroForm.headlineMain}
                    onChange={(e) => setHeroForm({ ...heroForm, headlineMain: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Headline Gradient Highlight</label>
                  <input
                    type="text"
                    value={heroForm.headlineGradient}
                    onChange={(e) => setHeroForm({ ...heroForm, headlineGradient: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Hero Bio Paragraph</label>
                <textarea
                  rows={3}
                  value={heroForm.bio}
                  onChange={(e) => setHeroForm({ ...heroForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500 leading-relaxed"
                />
              </div>

              {/* 3 Metrics Cards */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">3 Key Practice Metrics</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400">Metric 1</span>
                    <input
                      type="text"
                      value={heroForm.stat1Value}
                      onChange={(e) => setHeroForm({ ...heroForm, stat1Value: e.target.value })}
                      placeholder="Value (e.g. 20+ Years)"
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white"
                    />
                    <input
                      type="text"
                      value={heroForm.stat1Label}
                      onChange={(e) => setHeroForm({ ...heroForm, stat1Label: e.target.value })}
                      placeholder="Label (e.g. Clinical Experience)"
                      className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400">Metric 2</span>
                    <input
                      type="text"
                      value={heroForm.stat2Value}
                      onChange={(e) => setHeroForm({ ...heroForm, stat2Value: e.target.value })}
                      placeholder="Value (e.g. 4,500+)"
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white"
                    />
                    <input
                      type="text"
                      value={heroForm.stat2Label}
                      onChange={(e) => setHeroForm({ ...heroForm, stat2Label: e.target.value })}
                      placeholder="Label (e.g. Vitreoretinal Surgeries)"
                      className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400">Metric 3</span>
                    <input
                      type="text"
                      value={heroForm.stat3Value}
                      onChange={(e) => setHeroForm({ ...heroForm, stat3Value: e.target.value })}
                      placeholder="Value (e.g. 35+ Papers)"
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white"
                    />
                    <input
                      type="text"
                      value={heroForm.stat3Label}
                      onChange={(e) => setHeroForm({ ...heroForm, stat3Label: e.target.value })}
                      placeholder="Label (e.g. Academic Works)"
                      className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: PICTURE MANAGER */}
          {activeTab === 'pictures' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">Website Photography Manager</h3>
                  <p className="text-xs text-slate-400">Change doctor portraits, consultation photos, and retinal fundus diagnostic images.</p>
                </div>
                <button
                  onClick={resetAllImages}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800"
                >
                  Reset Images to Defaults
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'doctorProfile', title: 'Doctor Hero Profile Picture', src: siteImages.doctorProfile },
                  { key: 'doctorConsultation', title: 'Clinic Consultation & Examination Photo', src: siteImages.doctorConsultation },
                  { key: 'retinaNormal', title: 'Healthy Human Retina Fundus Image', src: siteImages.retinaNormal },
                  { key: 'retinaDiabetic', title: 'Diabetic Retinopathy Pathology Image', src: siteImages.retinaDiabetic },
                ].map((slot) => (
                  <div key={slot.key} className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{slot.title}</h4>
                        <button
                          onClick={() => resetImage(slot.key)}
                          className="text-xs text-slate-500 hover:text-cyan-400"
                          title="Reset to default asset"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 h-44 flex items-center justify-center">
                        <img src={slot.src} alt={slot.title} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <label className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-xs font-semibold text-cyan-300 border border-cyan-800 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(slot.key, e)}
                          className="hidden"
                        />
                      </label>

                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          placeholder="Or paste image URL..."
                          value={customUrls[slot.key] || ''}
                          onChange={(e) => setCustomUrls({ ...customUrls, [slot.key]: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <button
                          onClick={() => handleApplyUrl(slot.key)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-600 text-xs font-semibold text-white"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT & SPECIALTIES CMS */}
          {activeTab === 'about' && (
            <div className="space-y-8 max-w-4xl">
              <form onSubmit={handleSaveAbout} className="space-y-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white font-serif">Biography Narrative & Clinical Philosophy</h3>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                  >
                    Save Narrative
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Paragraph 1 (Opening Introduction)</label>
                  <textarea
                    rows={2}
                    value={aboutForm.bioP1}
                    onChange={(e) => setAboutForm({ ...aboutForm, bioP1: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Paragraph 2 (Fellowship & Surgical Training)</label>
                  <textarea
                    rows={2}
                    value={aboutForm.bioP2}
                    onChange={(e) => setAboutForm({ ...aboutForm, bioP2: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Paragraph 3 (Academic Leadership & Hospital Roles)</label>
                  <textarea
                    rows={2}
                    value={aboutForm.bioP3}
                    onChange={(e) => setAboutForm({ ...aboutForm, bioP3: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Physician Quote</label>
                  <textarea
                    rows={2}
                    value={aboutForm.quote}
                    onChange={(e) => setAboutForm({ ...aboutForm, quote: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500 italic"
                  />
                </div>
              </form>

              {/* Specialties List Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-serif">Clinical Specialties List</h3>
                    <p className="text-xs text-slate-400">Add, edit, or remove clinical subspecialties displayed on the profile.</p>
                  </div>
                  <button
                    onClick={handleAddSpecialty}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Specialty</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {specialtiesList.map((spec, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={spec.title}
                          onChange={(e) => {
                            const updated = [...specialtiesList];
                            updated[i] = { ...updated[i], title: e.target.value };
                            setSpecialtiesList(updated);
                          }}
                          placeholder="Specialty Title"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white"
                        />
                        <input
                          type="text"
                          value={spec.tag}
                          onChange={(e) => {
                            const updated = [...specialtiesList];
                            updated[i] = { ...updated[i], tag: e.target.value };
                            setSpecialtiesList(updated);
                          }}
                          placeholder="Tag (e.g. Microsurgery)"
                          className="w-36 px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-cyan-300"
                        />
                        <button
                          onClick={() => handleDeleteSpecialty(i)}
                          className="p-1.5 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={spec.desc}
                        onChange={(e) => {
                          const updated = [...specialtiesList];
                          updated[i] = { ...updated[i], desc: e.target.value };
                          setSpecialtiesList(updated);
                        }}
                        placeholder="Clinical Description..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSaveSpecialties}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                >
                  Save All Specialties
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION TIMELINE CMS */}
          {activeTab === 'education' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">Academic Qualifications & Fellowships</h3>
                  <p className="text-xs text-slate-400">Manage education records, university degrees, and surgical fellowship milestones.</p>
                </div>
                <button
                  onClick={handleAddEducation}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-3">
                {educationList.map((edu, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[i] = { ...updated[i], year: e.target.value };
                          setEducationList(updated);
                        }}
                        placeholder="Year"
                        className="w-24 px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-cyan-400"
                      />
                      <input
                        type="text"
                        value={edu.title}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[i] = { ...updated[i], title: e.target.value };
                          setEducationList(updated);
                        }}
                        placeholder="Degree / Fellowship Title"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white"
                      />
                      <button
                        onClick={() => handleDeleteEducation(i)}
                        className="p-1.5 text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[i] = { ...updated[i], institution: e.target.value };
                        setEducationList(updated);
                      }}
                      placeholder="Institution / University"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                    />

                    <textarea
                      rows={2}
                      value={edu.description}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[i] = { ...updated[i], description: e.target.value };
                        setEducationList(updated);
                      }}
                      placeholder="Milestone Description..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-400"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleSaveEducation}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
              >
                Save Education Timeline
              </button>
            </div>
          )}

          {/* TAB: RETINA EXPLORER CMS */}
          {activeTab === 'retina' && (
            <form onSubmit={handleSaveRetina} className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">Retina Explorer Diagnostic CMS</h3>
                  <p className="text-xs text-slate-400">Edit badge, headline title, patient subtext, and manage anatomical landmarks.</p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-md"
                >
                  Save Retina Settings
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Explorer Badge Label</label>
                  <input
                    type="text"
                    value={retinaForm.badge || ''}
                    onChange={(e) => setRetinaForm({ ...retinaForm, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Section Headline Title</label>
                  <input
                    type="text"
                    value={retinaForm.title || ''}
                    onChange={(e) => setRetinaForm({ ...retinaForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Clinical Subtitle / Patient Overview</label>
                <textarea
                  rows={3}
                  value={retinaForm.subTitle || ''}
                  onChange={(e) => setRetinaForm({ ...retinaForm, subTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-cyan-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Dual Clinical Imaging Modes (Active)</span>
                </div>
                <p className="text-slate-400">
                  <strong>Mode 1: Healthy Human Retina (OD Baseline)</strong> — Calibrated radar landmarks: Fovea Centralis (Foveola), Optic Disc / Neuroretinal Rim, Superotemporal Arteriolar Arcade, Inferotemporal Venular Arcade, Peripheral Ora Serrata.
                </p>
                <p className="text-slate-400">
                  <strong>Mode 2: Diabetic Retinopathy & Edema</strong> — Active pathology targets: Clinically Significant Macular Edema (CSME), Intraretinal Microaneurysms, Hard Lipid Exudates, Retinal Dot-and-Blot Hemorrhages, Cotton Wool Infarct Spots.
                </p>
                <p className="text-[11px] text-cyan-400/90 pt-1">
                  💡 <em>To change the optical fundus photographs used by the radar pins, switch to the <strong>Picture Manager</strong> tab.</em>
                </p>
              </div>
            </form>
          )}

          {/* TAB 5: SCHOLAR & PUBLICATIONS CMS */}
          {activeTab === 'scholar' && (
            <div className="space-y-8 max-w-4xl">
              {/* Stats and Links */}
              <form onSubmit={handleSaveScholar} className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white font-serif">Google Scholar & SINTA Metrics</h3>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500">
                    Save Scholar Metrics
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Total Citations</label>
                    <input
                      type="number"
                      value={scholarStatsForm.totalCitations}
                      onChange={(e) => setScholarStatsForm({ ...scholarStatsForm, totalCitations: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">h-Index</label>
                    <input
                      type="number"
                      value={scholarStatsForm.hIndex}
                      onChange={(e) => setScholarStatsForm({ ...scholarStatsForm, hIndex: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">i10-Index</label>
                    <input
                      type="number"
                      value={scholarStatsForm.i10Index}
                      onChange={(e) => setScholarStatsForm({ ...scholarStatsForm, i10Index: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Total Publications</label>
                    <input
                      type="number"
                      value={scholarStatsForm.totalPublications}
                      onChange={(e) => setScholarStatsForm({ ...scholarStatsForm, totalPublications: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Google Scholar Profile URL</label>
                    <input
                      type="text"
                      value={scholarMetaForm.scholarProfileUrl}
                      onChange={(e) => setScholarMetaForm({ ...scholarMetaForm, scholarProfileUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">SINTA Profile URL</label>
                    <input
                      type="text"
                      value={scholarMetaForm.sintaProfileUrl}
                      onChange={(e) => setScholarMetaForm({ ...scholarMetaForm, sintaProfileUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </form>

              {/* GOOGLE SCHOLAR HERO SPOTLIGHT CMS */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-cyan-950/40 border-2 border-cyan-800/60 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-700/80 text-cyan-300">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                        Google Scholar Hero Spotlight CMS
                      </h3>
                      <p className="text-xs text-slate-400">
                        Configure the high-visibility hero showcase banner with full scientific abstract tabs.
                      </p>
                    </div>
                  </div>

                  {/* Visibility Toggle Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = { ...scholarSpotlightForm, enabled: !scholarSpotlightForm.enabled };
                      setScholarSpotlightForm(next);
                      updateSection('scholar', { ...siteContent.scholar, spotlight: next });
                      showToast(next.enabled ? 'Hero Spotlight enabled on website!' : 'Hero Spotlight hidden from website.');
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      scholarSpotlightForm.enabled !== false
                        ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300 hover:bg-emerald-900/80'
                        : 'bg-rose-950/80 border-rose-800 text-rose-300 hover:bg-rose-900/80'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${scholarSpotlightForm.enabled !== false ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                    <span>{scholarSpotlightForm.enabled !== false ? 'Spotlight: Visible' : 'Spotlight: Hidden'}</span>
                  </button>
                </div>

                {/* Spotlight Header Texts */}
                <form onSubmit={handleSaveSpotlight} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-cyan-300">Spotlight Badge Label</label>
                      <input
                        type="text"
                        value={scholarSpotlightForm.badge || ''}
                        onChange={(e) => setScholarSpotlightForm({ ...scholarSpotlightForm, badge: e.target.value })}
                        placeholder="e.g. ★ Featured Landmark Research • Full Abstract"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-cyan-300">Spotlight Main Headline</label>
                      <input
                        type="text"
                        value={scholarSpotlightForm.title || ''}
                        onChange={(e) => setScholarSpotlightForm({ ...scholarSpotlightForm, title: e.target.value })}
                        placeholder="e.g. Google Scholar Hero Spotlight"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-cyan-300">Spotlight Subtitle / Overview</label>
                    <textarea
                      rows={2}
                      value={scholarSpotlightForm.subTitle || ''}
                      onChange={(e) => setScholarSpotlightForm({ ...scholarSpotlightForm, subTitle: e.target.value })}
                      placeholder="Peer-reviewed clinical trials, surgical innovations, and medical textbooks with complete scientific abstracts."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">
                      Currently featuring <strong className="text-cyan-300 font-mono">{(scholarSpotlightForm.featuredPubIds || []).length}</strong> publications in switcher tabs.
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Spotlight Texts</span>
                    </button>
                  </div>
                </form>

                {/* Featured Publications Selector Grid */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Select Publications For Spotlight Tabs
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Click paper card to toggle inclusion in the Hero switcher. Click the star icon to designate the default initial paper.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                    {publicationsList.map((pub) => {
                      const isFeatured = (scholarSpotlightForm.featuredPubIds || []).includes(pub.id);
                      const isDefault = scholarSpotlightForm.defaultPubId === pub.id;

                      return (
                        <div
                          key={pub.id}
                          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between gap-3 ${
                            isFeatured
                              ? 'bg-slate-900/90 border-cyan-700/80 shadow-md shadow-cyan-950/30 ring-1 ring-cyan-600/30'
                              : 'bg-slate-950/60 border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800">
                                  {pub.year}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {pub.citations} citations
                                </span>
                              </div>

                              {isFeatured && (
                                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700">
                                  Tab Featured
                                </span>
                              )}
                            </div>

                            <h5 className="text-xs font-bold text-white line-clamp-2 leading-snug" title={pub.title}>
                              {pub.title}
                            </h5>
                            <p className="text-[10px] text-slate-400 line-clamp-1">
                              {pub.authors} — {pub.journal}
                            </p>
                          </div>

                          {/* Bottom Actions: Toggle Feature & Set Default */}
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                            <button
                              type="button"
                              onClick={() => handleToggleSpotlightPub(pub.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                                isFeatured
                                  ? 'bg-cyan-600/20 hover:bg-rose-950/40 border border-cyan-600/40 hover:border-rose-700/60 text-cyan-300 hover:text-rose-300'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                              }`}
                            >
                              <BookOpen className="w-3 h-3" />
                              <span>{isFeatured ? 'Remove from Hero' : '+ Add to Hero Tabs'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSetDefaultSpotlightPub(pub.id)}
                              title={isDefault ? 'Currently default active tab' : 'Set as primary default active tab'}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                                isDefault
                                  ? 'bg-amber-950/80 border border-amber-600 text-amber-300 shadow-sm'
                                  : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-amber-300'
                              }`}
                            >
                              <Star className={`w-3 h-3 ${isDefault ? 'fill-amber-400 text-amber-400' : ''}`} />
                              <span>{isDefault ? 'Default Tab' : 'Make Default'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Add / Edit Publication Form */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-800/40 space-y-4">
                <h3 className="text-base font-bold text-white font-serif">
                  {editingPubIndex !== null ? 'Edit Publication' : 'Add New Publication to Scholar Feed'}
                </h3>
                <form onSubmit={handleSavePublication} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Paper Title..."
                    value={pubForm.title}
                    onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-semibold"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Authors (e.g. Nadia Artha Dewi, et al.)"
                      value={pubForm.authors}
                      onChange={(e) => setPubForm({ ...pubForm, authors: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Journal / Conference Name"
                      value={pubForm.journal}
                      onChange={(e) => setPubForm({ ...pubForm, journal: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Year"
                        value={pubForm.year}
                        onChange={(e) => setPubForm({ ...pubForm, year: Number(e.target.value) })}
                        className="w-20 px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                      <input
                        type="number"
                        placeholder="Citations"
                        value={pubForm.citations}
                        onChange={(e) => setPubForm({ ...pubForm, citations: Number(e.target.value) })}
                        className="w-24 px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">Google Scholar Direct Article URL (optional - auto-queried if empty)</label>
                        <input
                          type="url"
                          placeholder="https://scholar.google.com/scholar?q=..."
                          value={pubForm.scholarUrl || ''}
                          onChange={(e) => setPubForm({ ...pubForm, scholarUrl: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">DOI / Permanent Identifier (optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. 10.35465/ijr.2024.08"
                          value={pubForm.doi || ''}
                          onChange={(e) => setPubForm({ ...pubForm, doi: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-cyan-300">Complete Scientific Abstract (Full Text)</label>
                    <textarea
                      rows={6}
                      placeholder="Paste complete scientific abstract including Background, Methods, Results, and Conclusions..."
                      value={pubForm.abstract}
                      onChange={(e) => setPubForm({ ...pubForm, abstract: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    {editingPubIndex !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPubIndex(null);
                          setPubForm({ id: '', title: '', authors: '', journal: '', year: 2026, citations: 0, category: 'Retina & Vitreous', abstract: '', scholarUrl: '', doi: '' });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                    >
                      {editingPubIndex !== null ? 'Update Paper' : 'Add Paper to Feed'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Publications List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current Feed Publications ({publicationsList.length})
                </h4>
                {publicationsList.map((pub, index) => (
                  <div key={pub.id || index} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="space-y-0.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-cyan-400 font-mono font-bold">{pub.year}</span>
                        <span className="text-[10px] text-slate-400">• {pub.citations} citations</span>
                      </div>
                      <h5 className="text-xs font-bold text-white leading-snug line-clamp-1">{pub.title}</h5>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{pub.authors} — {pub.journal}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingPubIndex(index);
                          setPubForm(pub);
                        }}
                        className="p-1.5 text-slate-400 hover:text-cyan-400 bg-slate-950 rounded-lg border border-slate-800"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePublication(index)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-950 rounded-lg border border-slate-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ARTICLES & BLOG CRUD */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">Articles & Ophthalmology Blog Hub</h3>
                  <p className="text-xs text-slate-400">Write, edit, and manage educational articles displayed on the website.</p>
                </div>
                <button
                  onClick={handleOpenNewArticle}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-sky-600"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Article</span>
                </button>
              </div>

              {/* Category Management Card */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-800/40 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-bold text-white font-serif">Article Categories Manager</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Create, view, and organize custom article categories. Categories appear instantly in blog filters and article composition forms.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-[11px] font-mono font-semibold">
                      {articleCategories.length} Categories
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Reset all article categories to defaults?')) {
                          resetArticleCategories();
                        }
                      }}
                      className="text-[10px] text-slate-400 hover:text-slate-200 underline"
                      title="Reset categories to defaults"
                    >
                      Reset Defaults
                    </button>
                  </div>
                </div>

                {/* Add New Category Form */}
                <form onSubmit={handleAddCategorySubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      placeholder="Type new category name (e.g. Cataract Surgery, Glaucoma Care, Dry Eye Disease)..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!newCategoryInput.trim()}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 disabled:opacity-50 transition-all shrink-0 shadow-md shadow-cyan-950/40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Category</span>
                  </button>
                </form>

                {/* Current Categories Chips */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Current Categories (Click chip to filter articles below)
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {articleCategories.map((cat) => {
                      const articleCount = articles.filter((a) => a.category === cat).length;
                      const isFiltered = articleCategoryFilter === cat;
                      return (
                        <div
                          key={cat}
                          className={`flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-xl border text-xs transition-all ${
                            isFiltered
                              ? 'bg-cyan-950/90 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950'
                              : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setArticleCategoryFilter(isFiltered ? 'All' : cat)}
                            className="font-medium hover:text-cyan-300 flex items-center gap-1.5 text-left"
                            title={`Filter articles by "${cat}"`}
                          >
                            <span>{cat}</span>
                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono border ${
                              isFiltered 
                                ? 'bg-cyan-900/60 border-cyan-700 text-cyan-200' 
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}>
                              {articleCount}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteCategoryPrompt(cat)}
                            disabled={articleCategories.length <= 1}
                            className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title={articleCategories.length <= 1 ? "Cannot delete the only category" : `Delete category "${cat}"`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Articles Filter & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search articles by title, excerpt, or author..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <select
                  value={articleCategoryFilter}
                  onChange={(e) => setArticleCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">All Categories ({articles.length})</option>
                  {articleCategories.map((cat) => {
                    const count = articles.filter((a) => a.category === cat).length;
                    return (
                      <option key={cat} value={cat}>
                        {cat} ({count})
                      </option>
                    );
                  })}
                </select>
                {(articleSearch || articleCategoryFilter !== 'All') && (
                  <button
                    onClick={() => {
                      setArticleSearch('');
                      setArticleCategoryFilter('All');
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-400 hover:text-white"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {/* Articles List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Showing {filteredArticlesAdmin.length} of {articles.length} articles</span>
                  {articleCategoryFilter !== 'All' && (
                    <span className="text-cyan-400 font-medium">Filtered by: {articleCategoryFilter}</span>
                  )}
                </div>

                {filteredArticlesAdmin.length === 0 ? (
                  <div className="text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
                    <p className="text-xs text-slate-400">No articles found matching current filters.</p>
                    <button
                      onClick={() => {
                        setArticleSearch('');
                        setArticleCategoryFilter('All');
                      }}
                      className="text-xs text-cyan-400 underline font-semibold"
                    >
                      Reset search & category filter
                    </button>
                  </div>
                ) : (
                  filteredArticlesAdmin.map((art) => (
                    <div key={art.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-4 transition-all">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-slate-800">
                          <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[10px] text-cyan-400 font-semibold px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-800/60 inline-block">
                            {art.category} • {art.date}
                          </span>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{art.title}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{art.excerpt}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEditArticle(art)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticlePrompt(art)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 7: AMSLER GRID CMS */}
          {activeTab === 'amsler' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSection('amsler', amslerForm);
              }}
              className="space-y-5 max-w-3xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white font-serif">Amsler Grid Diagnostic Tool CMS</h3>
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500">
                  Save Amsler Text
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tool Title</label>
                <input
                  type="text"
                  value={amslerForm.title}
                  onChange={(e) => setAmslerForm({ ...amslerForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tool Subtext</label>
                <textarea
                  rows={2}
                  value={amslerForm.subTitle}
                  onChange={(e) => setAmslerForm({ ...amslerForm, subTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">4 Testing Instructions</h4>
                {['step1', 'step2', 'step3', 'step4'].map((sKey, i) => (
                  <div key={sKey} className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 w-6">#{i + 1}</span>
                    <input
                      type="text"
                      value={amslerForm[sKey]}
                      onChange={(e) => setAmslerForm({ ...amslerForm, [sKey]: e.target.value })}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-emerald-400">Normal Result Clinical Note</label>
                  <textarea
                    rows={2}
                    value={amslerForm.normalFeedback}
                    onChange={(e) => setAmslerForm({ ...amslerForm, normalFeedback: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-rose-400">Distorted / Wavy Result Warning Note</label>
                  <textarea
                    rows={2}
                    value={amslerForm.distortedFeedback}
                    onChange={(e) => setAmslerForm({ ...amslerForm, distortedFeedback: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 8: PRACTICE & CONTACT CMS */}
          {activeTab === 'practice' && (
            <form onSubmit={handleSavePractice} className="space-y-8 max-w-4xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">Practice Locations, Hours & WhatsApp</h3>
                  <p className="text-xs text-slate-400">Edit consultation hospitals, practice schedules, emergency hotline, and booking numbers.</p>
                </div>
                <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500">
                  Save All Practice Info
                </button>
              </div>

              {/* WhatsApp Contact */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Booking Configuration</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">WhatsApp Number (International format, e.g. 6281234567890)</label>
                    <input
                      type="text"
                      value={contactForm.whatsappNumber}
                      onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Display Phone Label</label>
                    <input
                      type="text"
                      value={contactForm.whatsappLabel}
                      onChange={(e) => setContactForm({ ...contactForm, whatsappLabel: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Banner */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Emergency Retinal Advisory Notice</h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={practiceEmergency.emergencyTitle}
                    onChange={(e) => setPracticeEmergency({ ...practiceEmergency, emergencyTitle: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-bold"
                  />
                  <textarea
                    rows={2}
                    value={practiceEmergency.emergencyText}
                    onChange={(e) => setPracticeEmergency({ ...practiceEmergency, emergencyText: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Hotline phone (e.g. (0341) 362101)"
                    value={practiceEmergency.emergencyPhone}
                    onChange={(e) => setPracticeEmergency({ ...practiceEmergency, emergencyPhone: e.target.value })}
                    className="w-48 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Locations List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">Hospital & Clinic Locations</h4>
                  <button
                    type="button"
                    onClick={handleAddLocation}
                    className="flex items-center gap-1 px-3 py-1 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Hospital</span>
                  </button>
                </div>

                {practiceLocations.map((loc, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={loc.name}
                        onChange={(e) => {
                          const updated = [...practiceLocations];
                          updated[i] = { ...updated[i], name: e.target.value };
                          setPracticeLocations(updated);
                        }}
                        placeholder="Hospital Name"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white"
                      />
                      <input
                        type="text"
                        value={loc.badge}
                        onChange={(e) => {
                          const updated = [...practiceLocations];
                          updated[i] = { ...updated[i], badge: e.target.value };
                          setPracticeLocations(updated);
                        }}
                        placeholder="Badge (e.g. Main Hospital)"
                        className="w-32 px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-cyan-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteLocation(i)}
                        className="p-1.5 text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={loc.division}
                        onChange={(e) => {
                          const updated = [...practiceLocations];
                          updated[i] = { ...updated[i], division: e.target.value };
                          setPracticeLocations(updated);
                        }}
                        placeholder="Division / Department"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                      />
                      <input
                        type="text"
                        value={loc.phone}
                        onChange={(e) => {
                          const updated = [...practiceLocations];
                          updated[i] = { ...updated[i], phone: e.target.value };
                          setPracticeLocations(updated);
                        }}
                        placeholder="Telephone"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                      />
                    </div>

                    <input
                      type="text"
                      value={loc.address}
                      onChange={(e) => {
                        const updated = [...practiceLocations];
                        updated[i] = { ...updated[i], address: e.target.value };
                        setPracticeLocations(updated);
                      }}
                      placeholder="Address..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                    />

                    {/* Schedule slots */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 font-semibold">Consultation Hours</span>
                      {(loc.schedule || []).map((sch, schI) => (
                        <div key={schI} className="flex gap-2">
                          <input
                            type="text"
                            value={sch.days}
                            onChange={(e) => {
                              const updated = [...practiceLocations];
                              updated[i].schedule[schI].days = e.target.value;
                              setPracticeLocations(updated);
                            }}
                            placeholder="Days (e.g. Monday, Wednesday)"
                            className="flex-1 px-2 py-1 rounded-md bg-slate-950 border border-slate-700 text-xs text-slate-200"
                          />
                          <input
                            type="text"
                            value={sch.hours}
                            onChange={(e) => {
                              const updated = [...practiceLocations];
                              updated[i].schedule[schI].hours = e.target.value;
                              setPracticeLocations(updated);
                            }}
                            placeholder="Hours (e.g. 08:00 – 13:00 WIB)"
                            className="w-44 px-2 py-1 rounded-md bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </form>
          )}

          {/* TAB: SEO & METADATA CMS */}
          {activeTab === 'seo' && (
            <form onSubmit={handleSaveSeo} className="space-y-6 max-w-4xl text-left">
              {/* Header & Sticky Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
                      <Globe className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-white font-serif">
                      Search Engine Optimization (SEO) & Social Sharing
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live editor for Google search snippets, Open Graph social share cards (WhatsApp, Facebook, LinkedIn), and Schema.org medical structured data.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetSeo}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-md shadow-cyan-950/50 transition-all"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save SEO Settings</span>
                  </button>
                </div>
              </div>

              {/* LIVE SIMULATOR / PREVIEW WIDGET */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-800/50 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Live Search & Social Preview
                    </span>
                  </div>

                  {/* Switch between Google and Social view */}
                  <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('google')}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        previewTab === 'google'
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Google Search
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('social')}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        previewTab === 'social'
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Social Share Card (WhatsApp / FB)
                    </button>
                  </div>
                </div>

                {previewTab === 'google' ? (
                  /* Google SERP Preview Card */
                  <div className="space-y-3">
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 font-sans">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="w-4 h-4 rounded-full bg-cyan-600/30 flex items-center justify-center text-[10px] text-cyan-300 font-bold">
                          👁
                        </div>
                        <span className="truncate max-w-[280px] sm:max-w-md font-mono text-[11px] text-slate-400">
                          {seoForm.canonicalUrl || 'https://nadia-artha-dewi.vercel.app'} › dr-nadia-artha-dewi
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                        {seoForm.metaTitle || 'Dr. dr. Nadia Artha Dewi, Sp.M(K) — Vitreo-Retina Consultant & Ophthalmologist'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {seoForm.metaDescription || 'Official medical profile and academic portfolio of Dr. dr. Nadia Artha Dewi, Sp.M(K) - Vitreo-Retina Consultant Ophthalmologist...'}
                      </p>
                    </div>

                    {/* Character length health metrics */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px]">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Title Length:</span>
                        <strong className={
                          (seoForm.metaTitle || '').length >= 40 && (seoForm.metaTitle || '').length <= 65
                            ? 'text-emerald-400'
                            : (seoForm.metaTitle || '').length > 65
                            ? 'text-amber-400'
                            : 'text-slate-300'
                        }>
                          {(seoForm.metaTitle || '').length} / 60 chars
                        </strong>
                        <span className="text-slate-500">
                          {(seoForm.metaTitle || '').length >= 40 && (seoForm.metaTitle || '').length <= 65 ? '✓ Optimal' : '(40-60 rec.)'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Description Length:</span>
                        <strong className={
                          (seoForm.metaDescription || '').length >= 120 && (seoForm.metaDescription || '').length <= 165
                            ? 'text-emerald-400'
                            : (seoForm.metaDescription || '').length > 165
                            ? 'text-amber-400'
                            : 'text-slate-300'
                        }>
                          {(seoForm.metaDescription || '').length} / 160 chars
                        </strong>
                        <span className="text-slate-500">
                          {(seoForm.metaDescription || '').length >= 120 && (seoForm.metaDescription || '').length <= 165 ? '✓ Optimal' : '(120-160 rec.)'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Robots:</span>
                        <span className="font-mono text-cyan-300">{seoForm.robots || 'index, follow'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Social Share Card Preview (WhatsApp / Facebook / LinkedIn) */
                  <div className="space-y-3">
                    <div className="max-w-md rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
                      <div className="aspect-[1.91/1] w-full bg-slate-900 relative overflow-hidden flex items-center justify-center">
                        <img
                          src={seoForm.ogImage || siteImages?.doctorProfile || '/assets/dr_nadia_profile.jpg'}
                          alt="Open Graph Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] text-cyan-300 font-mono">
                          OG Image
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1 bg-slate-900/90 border-t border-slate-800">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                          {new URL(seoForm.canonicalUrl || 'https://nadia-artha-dewi.vercel.app').hostname.toUpperCase()}
                        </div>
                        <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                          {seoForm.ogTitle || seoForm.metaTitle}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-2">
                          {seoForm.ogDescription || seoForm.metaDescription}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      This preview simulates how your website link card appears when sent on WhatsApp, Facebook, LinkedIn, Telegram, and X (Twitter).
                    </p>
                  </div>
                )}
              </div>

              {/* CARD 1: PRIMARY SEARCH ENGINE META TAGS */}
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">Primary Search Engine Meta Tags</h4>
                </div>

                <div className="space-y-4">
                  {/* Meta Title */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        Meta Page Title (Browser Title)
                      </label>
                      <span className="text-[11px] font-mono text-slate-400">
                        {(seoForm.metaTitle || '').length} / 60 characters
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={seoForm.metaTitle}
                      onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                      placeholder="e.g. Dr. dr. Nadia Artha Dewi, Sp.M(K) — Vitreo-Retina Consultant..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500 font-sans"
                    />
                    <p className="text-[10px] text-slate-400">
                      Recommendation: 50–60 characters. Include doctor's full name, credentials, subspecialty, and primary city (e.g. Malang).
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        Meta Description (Search Snippet)
                      </label>
                      <span className="text-[11px] font-mono text-slate-400">
                        {(seoForm.metaDescription || '').length} / 160 characters
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={seoForm.metaDescription}
                      onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                      placeholder="e.g. Official medical profile and academic portfolio of Dr. dr. Nadia Artha Dewi..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:border-cyan-500 font-sans leading-relaxed"
                    />
                    <p className="text-[10px] text-slate-400">
                      Recommendation: 130–160 characters. A concise, engaging summary explaining doctor's expertise to entice patients to click.
                    </p>
                  </div>

                  {/* Meta Keywords & Quick-Add Buttons */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Search Keywords (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={seoForm.metaKeywords}
                      onChange={(e) => setSeoForm({ ...seoForm, metaKeywords: e.target.value })}
                      placeholder="dokter mata malang, vitreo retina, spesialis retina, operasi katarak..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:border-cyan-500"
                    />

                    {/* Quick-add keyword pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400">Quick Add:</span>
                      {[
                        'dokter mata malang',
                        'vitreo-retina malang',
                        'spesialis retina',
                        'operasi vitrektomi',
                        'retinopati diabetik',
                        'amsler grid test',
                        'PERDAMI',
                        'RSUD Dr Saiful Anwar',
                        'FK Universitas Brawijaya',
                      ].map((kw) => {
                        const isAlreadyAdded = (seoForm.metaKeywords || '').toLowerCase().includes(kw.toLowerCase());
                        return (
                          <button
                            key={kw}
                            type="button"
                            disabled={isAlreadyAdded}
                            onClick={() => {
                              const curr = (seoForm.metaKeywords || '').trim();
                              const updated = curr ? `${curr}, ${kw}` : kw;
                              setSeoForm({ ...seoForm, metaKeywords: updated });
                            }}
                            className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                              isAlreadyAdded
                                ? 'bg-slate-950 border-slate-800 text-slate-600 cursor-default'
                                : 'bg-slate-900 border-slate-700 text-cyan-300 hover:bg-cyan-950 hover:border-cyan-700 cursor-pointer'
                            }`}
                          >
                            + {kw}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {/* Canonical URL */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        Canonical Website URL
                      </label>
                      <input
                        type="url"
                        value={seoForm.canonicalUrl}
                        onChange={(e) => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })}
                        placeholder="https://nadia-artha-dewi.vercel.app"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono focus:border-cyan-500"
                      />
                    </div>

                    {/* Robots Indexing Directive */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Robots Directives
                      </label>
                      <select
                        value={seoForm.robots}
                        onChange={(e) => setSeoForm({ ...seoForm, robots: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                      >
                        <option value="index, follow">index, follow (Standard)</option>
                        <option value="noindex, follow">noindex, follow (Unlisted)</option>
                        <option value="noindex, nofollow">noindex, nofollow (Private)</option>
                        <option value="index, nofollow">index, nofollow</option>
                      </select>
                    </div>
                  </div>

                  {/* Author Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Author / Physician Attribution
                    </label>
                    <input
                      type="text"
                      value={seoForm.author}
                      onChange={(e) => setSeoForm({ ...seoForm, author: e.target.value })}
                      placeholder="Dr. dr. Nadia Artha Dewi, Sp.M(K)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: SOCIAL MEDIA & OPEN GRAPH (OG) SETTINGS */}
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">Open Graph & Social Media Sharing (WhatsApp, FB, X)</h4>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* OG Title */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Open Graph Title
                      </label>
                      <input
                        type="text"
                        value={seoForm.ogTitle}
                        onChange={(e) => setSeoForm({ ...seoForm, ogTitle: e.target.value })}
                        placeholder="Inherits from Meta Title if blank"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                      />
                    </div>

                    {/* OG Type */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Open Graph Type
                      </label>
                      <select
                        value={seoForm.ogType}
                        onChange={(e) => setSeoForm({ ...seoForm, ogType: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                      >
                        <option value="profile">profile (Recommended for doctor)</option>
                        <option value="website">website</option>
                        <option value="article">article</option>
                      </select>
                    </div>
                  </div>

                  {/* OG Description */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Open Graph Description
                    </label>
                    <textarea
                      rows={2}
                      value={seoForm.ogDescription}
                      onChange={(e) => setSeoForm({ ...seoForm, ogDescription: e.target.value })}
                      placeholder="Inherits from Meta Description if blank"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:border-cyan-500"
                    />
                  </div>

                  {/* OG Image & Presets */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Social Card Image URL (OG Image)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={seoForm.ogImage}
                        onChange={(e) => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                        placeholder="/assets/dr_nadia_profile.jpg or https://..."
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono focus:border-cyan-500"
                      />
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-400">Quick Select Image:</span>
                      <button
                        type="button"
                        onClick={() => setSeoForm({ ...seoForm, ogImage: '/assets/dr_nadia_profile.jpg' })}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-700 text-slate-300 hover:text-cyan-300 transition-colors"
                      >
                        Doctor Portrait
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoForm({ ...seoForm, ogImage: '/assets/dr_nadia_consultation.jpg' })}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-700 text-slate-300 hover:text-cyan-300 transition-colors"
                      >
                        Clinical Consultation
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoForm({ ...seoForm, ogImage: '/assets/retina_pathology_diabetic.jpg' })}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-700 text-slate-300 hover:text-cyan-300 transition-colors"
                      >
                        Diabetic Fundus Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoForm({ ...seoForm, ogImage: '/assets/retina_fundus_normal.jpg' })}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-700 text-slate-300 hover:text-cyan-300 transition-colors"
                      >
                        Normal Retina Fundus
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Twitter Card Type */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Twitter / X Card Format
                      </label>
                      <select
                        value={seoForm.twitterCard}
                        onChange={(e) => setSeoForm({ ...seoForm, twitterCard: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                      >
                        <option value="summary_large_image">summary_large_image (Large Hero Card)</option>
                        <option value="summary">summary (Compact Square Thumbnail)</option>
                      </select>
                    </div>

                    {/* Twitter Title */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Twitter / X Card Title
                      </label>
                      <input
                        type="text"
                        value={seoForm.twitterTitle}
                        onChange={(e) => setSeoForm({ ...seoForm, twitterTitle: e.target.value })}
                        placeholder="Inherits from Open Graph Title"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: SCHEMA.ORG STRUCTURED DATA (JSON-LD) */}
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">Schema.org Medical Structured Data (JSON-LD)</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Google Rich Snippets
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Schema Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Entity Schema Type
                    </label>
                    <select
                      value={seoForm.schemaType}
                      onChange={(e) => setSeoForm({ ...seoForm, schemaType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                    >
                      <option value="Physician">Physician (Recommended for Medical Doctor)</option>
                      <option value="MedicalBusiness">MedicalBusiness</option>
                      <option value="MedicalOrganization">MedicalOrganization</option>
                      <option value="Person">Person</option>
                    </select>
                  </div>

                  {/* Medical Specialties */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Medical Specialties (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={seoForm.medicalSpecialty}
                      onChange={(e) => setSeoForm({ ...seoForm, medicalSpecialty: e.target.value })}
                      placeholder="Ophthalmology, Vitreo-Retina Surgery"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Hospital Affiliation */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Hospital & Academic Affiliation
                    </label>
                    <input
                      type="text"
                      value={seoForm.hospitalAffiliation}
                      onChange={(e) => setSeoForm({ ...seoForm, hospitalAffiliation: e.target.value })}
                      placeholder="RSUD Dr. Saiful Anwar Malang & FK Universitas Brawijaya"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                    />
                  </div>

                  {/* Clinic City & Country */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">City</label>
                      <input
                        type="text"
                        value={seoForm.clinicCity}
                        onChange={(e) => setSeoForm({ ...seoForm, clinicCity: e.target.value })}
                        placeholder="Malang"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Country</label>
                      <input
                        type="text"
                        value={seoForm.clinicCountry}
                        onChange={(e) => setSeoForm({ ...seoForm, clinicCountry: e.target.value })}
                        placeholder="Indonesia"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Live JSON-LD Code Inspector Box */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Live Generated JSON-LD Code
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopySchemaJson}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-cyan-300 transition-colors"
                      >
                        {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSchema ? 'Copied!' : 'Copy JSON-LD'}</span>
                      </button>
                      <a
                        href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(seoForm.canonicalUrl || 'https://nadia-artha-dewi.vercel.app')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800/60 text-[11px] font-semibold text-cyan-300 transition-colors"
                      >
                        <span>Google Rich Results Test</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-200/90 overflow-x-auto max-h-48 leading-relaxed">
{JSON.stringify({
  '@context': 'https://schema.org',
  '@type': seoForm.schemaType || 'Physician',
  'name': 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
  'jobTitle': 'Vitreo-Retina Consultant Ophthalmologist',
  'description': seoForm.metaDescription,
  'url': seoForm.canonicalUrl || 'https://nadia-artha-dewi.vercel.app',
  'image': seoForm.ogImage || '/assets/dr_nadia_profile.jpg',
  'medicalSpecialty': (seoForm.medicalSpecialty || 'Ophthalmology, Vitreo-Retina Surgery').split(',').map(s => s.trim()),
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': seoForm.clinicCity || 'Malang',
    'addressCountry': seoForm.clinicCountry || 'Indonesia'
  },
  'hospitalAffiliation': [
    { '@type': 'Hospital', 'name': 'RSUD Dr. Saiful Anwar Malang' },
    { '@type': 'MedicalOrganization', 'name': 'Fakultas Kedokteran Universitas Brawijaya' }
  ],
  'sameAs': [
    'https://scholar.google.com/citations?user=CcARsGgAAAAJ&hl=en',
    'https://sinta.kemdiktisaintek.go.id/authors/profile/5982903'
  ]
}, null, 2)}
                  </pre>
                </div>
              </div>

              {/* CARD 4: SEARCH ENGINE VERIFICATION & ANALYTICS */}
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">Search Console Verification & Analytics</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Google Search Console Verification */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Google Search Console Verification Token
                    </label>
                    <input
                      type="text"
                      value={seoForm.googleSiteVerification}
                      onChange={(e) => setSeoForm({ ...seoForm, googleSiteVerification: e.target.value })}
                      placeholder="e.g. ABc123dEfGhIjKlMnOpQrStUvWxYz..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono focus:border-cyan-500"
                    />
                    <p className="text-[10px] text-slate-400">
                      Injects <code className="text-cyan-400">&lt;meta name="google-site-verification" content="..."&gt;</code> to verify ownership in Google Search Console.
                    </p>
                  </div>

                  {/* Google Analytics 4 */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Google Analytics 4 Measurement ID
                    </label>
                    <input
                      type="text"
                      value={seoForm.googleAnalyticsId}
                      onChange={(e) => setSeoForm({ ...seoForm, googleAnalyticsId: e.target.value })}
                      placeholder="e.g. G-XXXXXXXXXX"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono focus:border-cyan-500"
                    />
                    <p className="text-[10px] text-slate-400">
                      Automatically injects Google Tag Manager (gtag.js) script into the document head when provided.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleResetSeo}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors"
                >
                  Reset Defaults
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-lg shadow-cyan-950/60 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Save All SEO Settings</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 9: BACKUP & SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <div className="space-y-2 pb-2 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white font-serif">Data Backup, Restore & Security</h3>
                <p className="text-xs text-slate-400">Export your customized website as a backup file or change your access passkey.</p>
              </div>

              {/* JSON Backup & Restore Box */}
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-cyan-800/40 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>One-Click Website Backup & Restore</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Export all your customized text, photography configurations, and published articles into a single JSON file. You can restore it anytime.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={exportBackupJSON}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>

                  <label className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Restore from Backup</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Change Passcode */}
              <form onSubmit={handlePasscodeChange} className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  <span>Change Admin Passkey</span>
                </h4>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Current code: {adminPasscode}</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter new 4+ character passkey..."
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                  />
                </div>
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500">
                  Update Passkey
                </button>
              </form>

              {/* Factory Reset */}
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-rose-900/40 space-y-3">
                <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Factory Reset</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Revert all modified texts, headlines, metrics, pictures, and articles back to the default original portfolio state.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={resetAllContent}
                    className="px-3 py-1.5 rounded-xl bg-rose-950 hover:bg-rose-900 text-xs font-semibold text-rose-200 border border-rose-800"
                  >
                    Reset All Site Texts
                  </button>
                  <button
                    onClick={resetAllImages}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    Reset Images
                  </button>
                  <button
                    onClick={resetArticles}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    Reset Articles
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Article Editor Modal */}
      <ArticleEditorModal
        isOpen={articleEditorOpen}
        onClose={() => setArticleEditorOpen(false)}
        onSave={handleSaveArticle}
        initialArticle={editingArticle}
      />
    </div>
  );
}
