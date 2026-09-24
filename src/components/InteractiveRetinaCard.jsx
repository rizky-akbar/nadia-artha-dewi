import React, { useState } from 'react';
import { Eye, Info, Sparkles, Target, AlertCircle, CheckCircle2, ChevronRight, Activity, Zap } from 'lucide-react';
import { retinaModes } from '../data/retinaData.js';
import { useSite } from '../context/SiteContext.jsx';

export default function InteractiveRetinaCard() {
  const { siteImages, siteContent } = useSite();
  const retinaContent = siteContent?.retina || {};
  const [activeModeId, setActiveModeId] = useState('normal');
  const availableModes = retinaContent.modes || retinaModes;
  const activeMode = availableModes.find((m) => m.id === activeModeId) || availableModes[0];
  const [activeHotspot, setActiveHotspot] = useState(activeMode.hotspots[0]);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  // Dynamic fundus image based on siteImages
  const currentFundusImage = activeModeId === 'diabetic' 
    ? siteImages.retinaDiabetic 
    : siteImages.retinaNormal;

  // When switching modes, default to the first hotspot of that mode
  const handleModeChange = (modeId) => {
    setActiveModeId(modeId);
    const mode = availableModes.find((m) => m.id === modeId) || availableModes[0];
    setActiveHotspot(mode.hotspots[0]);
    setHoveredHotspot(null);
  };

  const displayedHotspot = hoveredHotspot || activeHotspot;

  return (
    <section id="retina-explorer" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950/70">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>{retinaContent.badge || 'Interactive Ophthalmic Diagnostics'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
            {retinaContent.title?.includes('Living Retina') ? (
              <>
                {retinaContent.title.replace('Living Retina', '')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
                  Living Retina
                </span>
              </>
            ) : (
              retinaContent.title || 'Explore the Living Retina'
            )}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            {retinaContent.subTitle || 'Hover over the anatomical landmarks and clinical hotspots below to explore human retinal microstructure, vascular arcades, and pathological lesions examined by Vitreo-Retina specialists.'}
          </p>
        </div>

        {/* Mode Selector Tabs (Healthy vs Diabetic Retinopathy) */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
          <button
            onClick={() => handleModeChange('normal')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeModeId === 'normal'
                ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-lg shadow-cyan-600/30 ring-2 ring-cyan-400/40'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-800/60'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${activeModeId === 'normal' ? 'text-white' : 'text-emerald-400'}`} />
            <span>Healthy Human Retina (OD)</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/25 text-cyan-200">Baseline</span>
          </button>

          <button
            onClick={() => handleModeChange('diabetic')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeModeId === 'diabetic'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-lg shadow-rose-600/30 ring-2 ring-rose-400/40'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-rose-800/60'
            }`}
          >
            <AlertCircle className={`w-4 h-4 ${activeModeId === 'diabetic' ? 'text-white' : 'text-rose-400'}`} />
            <span>Diabetic Retinopathy & Edema</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/25 text-rose-200">Pathology</span>
          </button>
        </div>

        {/* Main Interactive Grid Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Column: High-Res Fundus Image with Radar Hotspots */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 p-2 sm:p-4 shadow-2xl shadow-cyan-950/50">
              
              {/* Ophthalmic Camera Viewport Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-square flex items-center justify-center select-none group">
                
                {/* Clinical Fundus Photograph */}
                <img
                  src={currentFundusImage}
                  alt={activeMode.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Circular Vignette Overlay representing ophthalmic indirect fundus lens */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

                {/* Heads-Up Display (HUD) Overlays */}
                <div className="absolute top-4 left-4 flex items-center gap-2 py-1 px-2.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 font-mono pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>50° WIDEFIELD OPTICAL FUNDUS</span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2 py-1 px-2.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-cyan-300 font-mono pointer-events-none">
                  <span>SCALE: 1.0 mm</span>
                </div>

                {/* Hotspots positioned over the fundus photo */}
                {activeMode.hotspots.map((spot) => {
                  const isHovered = hoveredHotspot?.id === spot.id;
                  const isActive = activeHotspot?.id === spot.id;
                  const isHighlighted = isHovered || isActive;

                  return (
                    <div
                      key={spot.id}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                      onMouseEnter={() => setHoveredHotspot(spot)}
                      onMouseLeave={() => setHoveredHotspot(null)}
                      onClick={() => setActiveHotspot(spot)}
                    >
                      {/* Pulsating outer radar ring */}
                      <span
                        className={`absolute -inset-3 rounded-full transition-opacity duration-300 ${
                          isHighlighted ? 'opacity-100' : 'opacity-60'
                        } ${
                          activeModeId === 'diabetic'
                            ? 'bg-rose-500/30 hotspot-pulse'
                            : 'bg-cyan-400/30 hotspot-pulse'
                        }`}
                      />

                      {/* Interactive Pin center */}
                      <div
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-lg ${
                          isHighlighted
                            ? activeModeId === 'diabetic'
                              ? 'bg-rose-500 text-white border-white scale-125 ring-4 ring-rose-500/40'
                              : 'bg-cyan-500 text-white border-white scale-125 ring-4 ring-cyan-500/40'
                            : activeModeId === 'diabetic'
                            ? 'bg-slate-900/90 text-rose-300 border-rose-400/80 hover:scale-110'
                            : 'bg-slate-900/90 text-cyan-300 border-cyan-400/80 hover:scale-110'
                        }`}
                      >
                        <Target className="w-4 h-4" />
                      </div>

                      {/* Hover Floating Pill Tag */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap px-2.5 py-1 rounded-md text-xs font-semibold shadow-xl backdrop-blur-md pointer-events-none transition-all duration-200 border ${
                          isHighlighted
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-1'
                        } ${
                          activeModeId === 'diabetic'
                            ? 'bg-rose-950/90 text-rose-100 border-rose-600/60'
                            : 'bg-slate-900/95 text-cyan-200 border-cyan-500/60'
                        }`}
                      >
                        {spot.name.split(' (')[0]}
                      </div>
                    </div>
                  );
                })}

                {/* Bottom Helper Bar on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs text-slate-300 pointer-events-none">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Hover or click radar targets to inspect micro-structures</span>
                  </div>
                  <span className="text-[11px] text-cyan-400 font-mono">
                    ACTIVE: {displayedHotspot.name.split(' (')[0]}
                  </span>
                </div>
              </div>

              {/* Quick Select Buttons beneath image for touch accessibility */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
                <span className="text-xs text-slate-400 font-medium py-1">Quick Select:</span>
                {activeMode.hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      displayedHotspot.id === spot.id
                        ? activeModeId === 'diabetic'
                          ? 'bg-rose-600 text-white'
                          : 'bg-cyan-600 text-white'
                        : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {spot.name.split(' (')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Clinical metrics row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activeMode.keyStats.map((stat, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
                  <div className="text-[11px] text-slate-400 font-medium">{stat.label}</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Hovering & Clinical Inspection Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Hotspot Deep-Dive Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-cyan-800/30 shadow-xl backdrop-blur-md space-y-6 transition-all duration-300">
              
              {/* Header with Category Badge */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-2 border ${displayedHotspot.badgeColor}`}>
                    <Zap className="w-3.5 h-3.5" />
                    <span>{displayedHotspot.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-serif">
                    {displayedHotspot.name}
                  </h3>
                  {displayedHotspot.latinName && (
                    <p className="text-xs text-cyan-400/90 italic font-mono mt-0.5">
                      {displayedHotspot.latinName}
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-300">
                  <Activity className="w-6 h-6" />
                </div>
              </div>

              {/* Anatomy / Pathology Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Anatomical Definition
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {displayedHotspot.shortDesc}
                </p>
              </div>

              {/* Clinical Significance */}
              <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Clinical & Biomolecular Significance
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {displayedHotspot.clinicalSignificance}
                </p>
              </div>

              {/* Patient Symptoms */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  Symptoms Patient Might Notice
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-rose-950/20 p-3 rounded-xl border border-rose-900/30">
                  {displayedHotspot.symptomsIfDamaged}
                </p>
              </div>

              {/* Dr. Nadia's Specialist Intervention */}
              <div className="space-y-2 border-t border-slate-800 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Dr. Nadia's Surgical & Clinical Protocol
                  </h4>
                  <span className="text-[10px] text-cyan-300 font-medium">Sp.M(K) Approach</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/90 p-3.5 rounded-xl border border-cyan-900/40">
                  {displayedHotspot.specialistTreatment}
                </p>
              </div>

              {/* Call to action inside card */}
              <div className="pt-2">
                <a
                  href="#practice-schedule"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 transition-all shadow-md shadow-cyan-900/40"
                >
                  <span>Schedule Retinal Fundus Examination</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
