import { useEffect } from 'react';
import { useSite } from '../context/SiteContext.jsx';

/**
 * Dynamic SEO Head Manager
 * Synchronously injects and updates document metadata, Open Graph,
 * Twitter Cards, and Schema.org JSON-LD Structured Data based on admin settings.
 */
export default function SEOHead() {
  const { siteContent, siteImages } = useSite();
  const seo = siteContent?.seo || {};

  useEffect(() => {
    // 1. Browser Tab / Window Title
    if (seo.metaTitle) {
      document.title = seo.metaTitle;
    }

    // Helper to find or create a <meta> tag
    const updateMetaTag = (identifier, content, isProperty = false) => {
      if (!content && content !== '') return;
      const attrName = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attrName}="${identifier}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, identifier);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to find or create a <link> tag
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Search Engine Meta Tags
    updateMetaTag('description', seo.metaDescription);
    updateMetaTag('keywords', seo.metaKeywords);
    updateMetaTag('author', seo.author || 'Dr. dr. Nadia Artha Dewi, Sp.M(K)');
    updateMetaTag('robots', seo.robots || 'index, follow');

    if (seo.googleSiteVerification) {
      updateMetaTag('google-site-verification', seo.googleSiteVerification);
    }

    // 3. Canonical URL
    if (seo.canonicalUrl) {
      updateLinkTag('canonical', seo.canonicalUrl);
    }

    // Resolve absolute image URL for Open Graph & Twitter
    const rawImage = seo.ogImage || siteImages?.doctorProfile || '/assets/dr_nadia_profile.jpg';
    const absoluteImageUrl = rawImage.startsWith('http')
      ? rawImage
      : `${window.location.origin}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

    // 4. Open Graph Meta Tags (Facebook, WhatsApp, LinkedIn)
    updateMetaTag('og:title', seo.ogTitle || seo.metaTitle, true);
    updateMetaTag('og:description', seo.ogDescription || seo.metaDescription, true);
    updateMetaTag('og:image', absoluteImageUrl, true);
    updateMetaTag('og:url', seo.canonicalUrl || window.location.href, true);
    updateMetaTag('og:type', seo.ogType || 'profile', true);
    updateMetaTag('og:site_name', 'Dr. dr. Nadia Artha Dewi, Sp.M(K) — Vitreo-Retina Consultant', true);

    // 5. Twitter / X Card Meta Tags
    updateMetaTag('twitter:card', seo.twitterCard || 'summary_large_image');
    updateMetaTag('twitter:title', seo.twitterTitle || seo.ogTitle || seo.metaTitle);
    updateMetaTag('twitter:description', seo.twitterDescription || seo.ogDescription || seo.metaDescription);
    updateMetaTag('twitter:image', absoluteImageUrl);

    // 6. Schema.org JSON-LD Structured Data for Physician / Doctor Rich Snippets
    let schemaScript = document.getElementById('doctor-schema-jsonld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'doctor-schema-jsonld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const specialties = (seo.medicalSpecialty || 'Ophthalmology, Vitreo-Retina Surgery')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': seo.schemaType || 'Physician',
      'name': 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
      'jobTitle': 'Vitreo-Retina Consultant Ophthalmologist',
      'image': absoluteImageUrl,
      'description': seo.metaDescription,
      'url': seo.canonicalUrl || window.location.origin,
      'medicalSpecialty': specialties,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': seo.clinicCity || 'Malang',
        'addressRegion': 'Jawa Timur',
        'addressCountry': seo.clinicCountry || 'Indonesia',
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

    schemaScript.textContent = JSON.stringify(jsonLdData, null, 2);

    // 7. Optional Google Analytics 4 Injection
    if (seo.googleAnalyticsId && /^G-[A-Za-z0-9]+$/.test(seo.googleAnalyticsId.trim())) {
      const gaId = seo.googleAnalyticsId.trim();
      let gaScript = document.getElementById('google-analytics-script');
      if (!gaScript) {
        gaScript = document.createElement('script');
        gaScript.id = 'google-analytics-script';
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(gaScript);

        const inlineGa = document.createElement('script');
        inlineGa.id = 'google-analytics-inline';
        inlineGa.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(inlineGa);
      }
    }
  }, [seo, siteImages]);

  // Head component operates via side-effect on document.head
  return null;
}
