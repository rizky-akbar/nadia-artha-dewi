import React from 'react';
import { Eye, Shield, Award, Heart, BookOpen, ExternalLink, ArrowUp } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';

export default function Footer() {
  const { siteContent } = useSite();
  const footer = siteContent?.footer || {};
  const hero = siteContent?.hero || {};
  const scholar = siteContent?.scholar || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-cyan-950/80 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Doctor Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 flex items-center justify-center shadow-md shadow-cyan-500/20">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {hero.doctorName || 'Dr. dr. Nadia Artha Dewi'}
                </h3>
                <p className="text-xs text-cyan-400 font-medium">
                  {hero.primaryTitle || 'Sp.M(K)'} • {hero.subSpecialty || 'Vitreo-Retina Consultant'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {footer.bio || 'Dedicated to restoring and safeguarding human vision through precision vitreoretinal microsurgery, modern diagnostic imaging, and cutting-edge pediatric myopia control research.'}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p><strong>Department:</strong> {footer.department || 'Departemen Ilmu Kesehatan Mata FKUB'}</p>
              <p><strong>Hospital:</strong> {footer.hospital || 'RSUD Dr. Saiful Anwar Malang'}</p>
              <p><strong>City:</strong> {footer.city || 'Malang, Jawa Timur, Indonesia'}</p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Site Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  Biography & Qualifications
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-cyan-400 transition-colors">
                  Clinical Subspecialties
                </a>
              </li>
              <li>
                <a href="#retina-explorer" className="hover:text-cyan-400 transition-colors text-cyan-300 font-medium">
                  ★ Interactive Retina Explorer
                </a>
              </li>
              <li>
                <a href="#scholar-feed" className="hover:text-cyan-400 transition-colors">
                  Real-Time Google Scholar Feed
                </a>
              </li>
              <li>
                <a href="#articles" className="hover:text-cyan-400 transition-colors">
                  Eye Health Articles & Blog
                </a>
              </li>
              <li>
                <a href="#amsler-tool" className="hover:text-cyan-400 transition-colors">
                  Amsler Grid Macular Self-Test
                </a>
              </li>
              <li>
                <a href="#practice-schedule" className="hover:text-cyan-400 transition-colors">
                  Practice Hours & Hospital Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Academic Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Academic & Research Profiles
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href={scholar.scholarProfileUrl || "https://scholar.google.com/citations?user=CcARsGgAAAAJ&hl=en"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Google Scholar Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={scholar.sintaProfileUrl || "https://sinta.kemdiktisaintek.go.id/authors/profile/5982903"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>SINTA Indonesia (ID: 5982903)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ub.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Universitas Brawijaya Faculty Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://perdami.or.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>PERDAMI National Registry</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Professional Memberships */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Affiliations
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                <strong className="text-white block">PERDAMI</strong>
                Persatuan Dokter Spesialis Mata Indonesia
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                <strong className="text-white block">INAVRS / INANOS</strong>
                Indonesian Vitreo-Retina & Neuro-Ophthalmology
              </div>
            </div>
          </div>

        </div>

        {/* Medical Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Medical Disclaimer:</strong> {footer.disclaimer || 'The information, clinical articles, interactive retinal models, and Amsler Grid diagnostic tools provided on this website are intended solely for educational, academic, and patient awareness purposes. They do not constitute formal medical diagnosis or replace a personalized in-clinic ophthalmic examination. For acute vision changes, please visit an ophthalmology emergency room immediately.'}
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <p>
              © {footer.copyrightYear || new Date().getFullYear()} {hero.doctorName || 'Dr. dr. Nadia Artha Dewi'}, {hero.primaryTitle || 'Sp.M(K)'}. All rights reserved.
            </p>
            <a
              href="#admin"
              className="text-slate-600 hover:text-cyan-400 transition-colors text-[11px] flex items-center gap-1 font-mono"
              title="Doctor & Staff Portal (/admin)"
            >
              <span>• /admin</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
