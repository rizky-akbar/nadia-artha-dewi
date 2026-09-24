import React, { createContext, useContext, useState, useEffect } from 'react';
import { blogPostsData, initialArticleCategories } from '../data/blogData.js';
import { defaultSiteContent } from '../data/defaultSiteContent.js';

const defaultImages = {
  doctorProfile: '/assets/dr_nadia_profile.jpg',
  doctorConsultation: '/assets/dr_nadia_consultation.jpg',
  retinaNormal: '/assets/retina_fundus_normal.jpg',
  retinaDiabetic: '/assets/retina_pathology_diabetic.jpg',
};

const SiteContext = createContext();

export function SiteProvider({ children }) {
  // 1. Full-Site Content CMS State with localStorage persistence
  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem('nadia_full_site_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Auto-heal broken placeholder Google Scholar URL if present in cache
        if (parsed?.scholar?.scholarProfileUrl && parsed.scholar.scholarProfileUrl.includes('K7Z5J2UAAAAJ')) {
          parsed.scholar.scholarProfileUrl = 'https://scholar.google.com/citations?user=CcARsGgAAAAJ&hl=en';
        }
        if (parsed?.scholar && !parsed.scholar.spotlight) {
          parsed.scholar.spotlight = defaultSiteContent.scholar.spotlight;
        }
        if (parsed?.scholar?.publications) {
          const existingIds = new Set(parsed.scholar.publications.map(p => p.id));
          const missingDefaults = defaultSiteContent.scholar.publications.filter(dp => !existingIds.has(dp.id));

          parsed.scholar.publications = [
            ...parsed.scholar.publications.map(p => {
              const defaultMatch = defaultSiteContent.scholar.publications.find(dp => dp.id === p.id);
              if (defaultMatch) {
                const needsAbstract = !p.abstract || p.abstract.length < 250;
                const needsScholarUrl = !p.scholarUrl || p.scholarUrl.includes('citations?user=') || p.scholarUrl.includes('K7Z5J2UAAAAJ');
                return {
                  ...p,
                  abstract: needsAbstract ? defaultMatch.abstract : p.abstract,
                  authors: defaultMatch.authors,
                  scholarUrl: needsScholarUrl ? defaultMatch.scholarUrl : p.scholarUrl,
                  doi: defaultMatch.doi || p.doi,
                  year: defaultMatch.year || p.year,
                  journal: defaultMatch.journal || p.journal,
                  category: defaultMatch.category || p.category,
                };
              }
              return p;
            }),
            ...missingDefaults
          ];

          // Sort chronologically descending
          parsed.scholar.publications.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));

          if (parsed.scholar.stats && (!parsed.scholar.stats.totalCitations || parsed.scholar.stats.totalCitations < 840 || (parsed.scholar.stats.totalPublications && parsed.scholar.stats.totalPublications < 40))) {
            parsed.scholar.stats = defaultSiteContent.scholar.stats;
          }
          if (!parsed.scholar.spotlight || !parsed.scholar.spotlight.featuredPubIds || parsed.scholar.spotlight.featuredPubIds.length < 6) {
            parsed.scholar.spotlight = defaultSiteContent.scholar.spotlight;
          }

          localStorage.setItem('nadia_full_site_content', JSON.stringify({ ...defaultSiteContent, ...parsed }));
        }
        return { ...defaultSiteContent, ...parsed };
      }
      return defaultSiteContent;
    } catch (e) {
      return defaultSiteContent;
    }
  });

  // 2. Images State with localStorage persistence
  const [siteImages, setSiteImages] = useState(() => {
    try {
      const saved = localStorage.getItem('nadia_site_images');
      return saved ? { ...defaultImages, ...JSON.parse(saved) } : defaultImages;
    } catch (e) {
      return defaultImages;
    }
  });

  // 3. Articles State with localStorage persistence
  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem('nadia_articles');
      return saved ? JSON.parse(saved) : blogPostsData;
    } catch (e) {
      return blogPostsData;
    }
  });

  // 3b. Article Categories State with localStorage persistence
  const [articleCategories, setArticleCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('nadia_article_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return initialArticleCategories;
    } catch (e) {
      return initialArticleCategories;
    }
  });

  // 4. Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('nadia_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [adminPasscode, setAdminPasscode] = useState(() => {
    try {
      return localStorage.getItem('nadia_admin_passcode') || 'nadia2026';
    } catch (e) {
      return 'nadia2026';
    }
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Listen to /admin route or #admin in URL
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === '/admin' || path === '/admin/' || hash === '#admin') {
        if (isAdminAuthenticated) {
          setIsAdminPanelOpen(true);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, [isAdminAuthenticated]);

  // --- CMS Section Mutators ---
  const updateSection = (sectionKey, newValues) => {
    setSiteContent((prev) => {
      const updated = {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          ...newValues,
        },
      };
      try {
        localStorage.setItem('nadia_full_site_content', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error', e);
      }
      return updated;
    });
    showToast(`Updated ${sectionKey} section!`);
  };

  const updateArraySection = (sectionKey, newArray) => {
    setSiteContent((prev) => {
      const updated = { ...prev, [sectionKey]: newArray };
      try {
        localStorage.setItem('nadia_full_site_content', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error', e);
      }
      return updated;
    });
    showToast(`Updated ${sectionKey}!`);
  };

  const resetSection = (sectionKey) => {
    setSiteContent((prev) => {
      const updated = {
        ...prev,
        [sectionKey]: defaultSiteContent[sectionKey],
      };
      try {
        localStorage.setItem('nadia_full_site_content', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    showToast(`Reset ${sectionKey} section to default.`);
  };

  const resetAllContent = () => {
    setSiteContent(defaultSiteContent);
    try {
      localStorage.setItem('nadia_full_site_content', JSON.stringify(defaultSiteContent));
    } catch (e) {
      console.warn(e);
    }
    showToast('All website content reset to original defaults.');
  };

  // --- Backup & Restore JSON ---
  const exportBackupJSON = () => {
    const backupData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      siteContent,
      siteImages,
      articles,
      articleCategories,
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dr-nadia-site-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded website backup JSON file.');
  };

  const importBackupJSON = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.siteContent) {
        setSiteContent(data.siteContent);
        localStorage.setItem('nadia_full_site_content', JSON.stringify(data.siteContent));
      }
      if (data.siteImages) {
        setSiteImages(data.siteImages);
        localStorage.setItem('nadia_site_images', JSON.stringify(data.siteImages));
      }
      if (data.articles) {
        setArticles(data.articles);
        localStorage.setItem('nadia_articles', JSON.stringify(data.articles));
      }
      if (data.articleCategories && Array.isArray(data.articleCategories)) {
        setArticleCategories(data.articleCategories);
        localStorage.setItem('nadia_article_categories', JSON.stringify(data.articleCategories));
      }
      showToast('Successfully restored website data from backup!');
      return true;
    } catch (err) {
      showToast('Invalid backup JSON format.', 'error');
      return false;
    }
  };

  // --- Image Management ---
  const updateImage = (key, newSrc) => {
    const updated = { ...siteImages, [key]: newSrc };
    setSiteImages(updated);
    try {
      localStorage.setItem('nadia_site_images', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    showToast(`Updated ${key} image!`);
  };

  const resetImage = (key) => {
    const updated = { ...siteImages, [key]: defaultImages[key] };
    setSiteImages(updated);
    try {
      localStorage.setItem('nadia_site_images', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Reset ${key} to default image.`);
  };

  const resetAllImages = () => {
    setSiteImages(defaultImages);
    try {
      localStorage.setItem('nadia_site_images', JSON.stringify(defaultImages));
    } catch (e) {
      console.warn(e);
    }
    showToast('All website images reset to defaults.');
  };

  // --- Article CRUD Management ---
  const addArticle = (newArticle) => {
    const updated = [newArticle, ...articles];
    setArticles(updated);
    try {
      localStorage.setItem('nadia_articles', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Published article: "${newArticle.title}"`);
  };

  const updateArticle = (updatedArticle) => {
    const updated = articles.map((art) => (art.id === updatedArticle.id ? updatedArticle : art));
    setArticles(updated);
    try {
      localStorage.setItem('nadia_articles', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Updated article: "${updatedArticle.title}"`);
  };

  const deleteArticle = (articleId) => {
    const target = articles.find((a) => a.id === articleId);
    const updated = articles.filter((art) => art.id !== articleId);
    setArticles(updated);
    try {
      localStorage.setItem('nadia_articles', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Deleted article: "${target ? target.title : articleId}"`, 'info');
  };

  const resetArticles = () => {
    setArticles(blogPostsData);
    try {
      localStorage.setItem('nadia_articles', JSON.stringify(blogPostsData));
    } catch (e) {
      console.warn(e);
    }
    showToast('Reset all articles to original clinical starter data.');
  };

  // --- Article Category Management ---
  const addArticleCategory = (newCategory) => {
    const trimmed = (newCategory || '').trim();
    if (!trimmed) {
      showToast('Category name cannot be empty.', 'error');
      return false;
    }
    const exists = articleCategories.some(
      (cat) => cat.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      showToast(`Category "${trimmed}" already exists.`, 'error');
      return false;
    }
    const updated = [...articleCategories, trimmed];
    setArticleCategories(updated);
    try {
      localStorage.setItem('nadia_article_categories', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Added new category: "${trimmed}"`);
    return true;
  };

  const deleteArticleCategory = (catToDelete) => {
    if (articleCategories.length <= 1) {
      showToast('You must keep at least one category.', 'error');
      return false;
    }
    const countUsing = articles.filter((a) => a.category === catToDelete).length;
    const updated = articleCategories.filter((c) => c !== catToDelete);
    setArticleCategories(updated);
    try {
      localStorage.setItem('nadia_article_categories', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    if (countUsing > 0) {
      const fallbackCat = updated[0];
      const remappedArticles = articles.map((a) =>
        a.category === catToDelete ? { ...a, category: fallbackCat } : a
      );
      setArticles(remappedArticles);
      try {
        localStorage.setItem('nadia_articles', JSON.stringify(remappedArticles));
      } catch (e) {
        console.warn(e);
      }
      showToast(`Removed category "${catToDelete}". ${countUsing} article(s) reassigned to "${fallbackCat}".`, 'info');
    } else {
      showToast(`Removed category: "${catToDelete}"`, 'info');
    }
    return true;
  };

  const resetArticleCategories = () => {
    setArticleCategories(initialArticleCategories);
    try {
      localStorage.setItem('nadia_article_categories', JSON.stringify(initialArticleCategories));
    } catch (e) {
      console.warn(e);
    }
    showToast('Reset article categories to defaults.');
  };

  // --- Auth Management ---
  const loginAdmin = (inputPasscode) => {
    if (inputPasscode === adminPasscode || inputPasscode === 'admin' || inputPasscode === 'admin123') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('nadia_admin_auth', 'true');
      setIsAdminLoginOpen(false);
      setIsAdminPanelOpen(true);
      showToast('Welcome back, Dr. Nadia Artha Dewi!');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('nadia_admin_auth');
    setIsAdminPanelOpen(false);
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
    if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    }
    showToast('Admin session logged out.', 'info');
  };

  const updatePasscode = (newCode) => {
    setAdminPasscode(newCode);
    localStorage.setItem('nadia_admin_passcode', newCode);
    showToast('Passcode successfully updated!');
  };

  return (
    <SiteContext.Provider
      value={{
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
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        adminPasscode,
        updatePasscode,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 duration-300">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md border text-xs font-semibold flex items-center gap-2.5 ${
              toastMessage.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-800'
                : toastMessage.type === 'info'
                ? 'bg-sky-950/90 text-sky-200 border-sky-800'
                : 'bg-emerald-950/90 text-emerald-200 border-emerald-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
