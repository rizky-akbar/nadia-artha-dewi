import React from 'react';
import { Award, GraduationCap, Building2, Stethoscope, Microscope, CheckCircle2, ChevronRight, BookOpen, HeartPulse } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';

export default function AboutSection() {
  const { siteImages, siteContent } = useSite();
  const about = siteContent?.about || {};
  const specialties = siteContent?.specialties || [];
  const education = siteContent?.education || [];

  // Icon mapper helper
  const getIconForSpecialty = (index) => {
    const icons = [Microscope, Stethoscope, HeartPulse, BookOpen, Award, CheckCircle2];
    return icons[index % icons.length];
  };

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Main Biography & Clinical Excellence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Clinic Wide Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 bg-slate-950 group">
              <img
                src={siteImages.doctorConsultation}
                alt="Dr. Nadia Artha Dewi performing slit lamp biomicroscopy examination"
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10">
                <p className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">
                  State-of-the-Art Care
                </p>
                <p className="text-sm font-bold text-white mt-0.5">
                  Slit-Lamp Biomicroscopy & Optical Examination
                </p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Empathetic patient consultation at RSUD Dr. Saiful Anwar Eye Center.
                </p>
              </div>
            </div>

            {/* Academic Leadership Callout Box */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  {about.leadershipTitle}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {about.leadershipDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
              <span>{about.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight">
              {about.headline}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              {about.bioP1}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {about.bioP2}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {about.bioP3}
            </p>

            {/* Quote card */}
            <div className="p-5 rounded-2xl bg-cyan-950/30 border-l-4 border-cyan-400 text-slate-200 italic text-sm leading-relaxed">
              "{about.quote}"
              <div className="not-italic text-xs font-semibold text-cyan-400 mt-2">
                — {about.quoteAuthor}
              </div>
            </div>
          </div>

        </div>

        {/* Clinical Specialties Grid (Dynamic from CMS) */}
        <div id="specialties" className="space-y-8 pt-8 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Clinical Subspecialties & Surgical Focus
            </h3>
            <p className="text-slate-400 text-sm">
              Advanced diagnostics and high-precision interventions utilizing contemporary micro-surgical systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {specialties.map((spec, index) => {
              const IconComp = getIconForSpecialty(index);
              return (
                <div
                  key={index}
                  className="p-6 rounded-3xl bg-slate-950/70 border border-slate-800 hover:border-cyan-600/50 hover:bg-slate-900/80 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-cyan-950/40"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                      {spec.tag}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {spec.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education & Fellowship Milestones (Dynamic from CMS) */}
        <div className="space-y-8 pt-8 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Academic Qualifications & Fellowship Training
            </h3>
            <p className="text-slate-400 text-sm">
              Continuous rigorous medical training across premier institutions in Indonesia and Japan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative space-y-2.5"
              >
                <div className="text-xs font-bold text-cyan-400 font-mono tracking-wider">
                  {edu.year}
                </div>
                <h4 className="text-base font-bold text-white leading-snug">
                  {edu.title}
                </h4>
                <p className="text-xs font-medium text-slate-300">
                  {edu.institution}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
