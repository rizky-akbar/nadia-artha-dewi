import React from 'react';
import { Award, ShieldCheck, BookOpen, Sparkles, ChevronRight, Activity, Calendar, Compass } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';

export default function Hero({ onOpenAppointment }) {
  const { siteImages, siteContent } = useSite();
  const hero = siteContent?.hero || {};

  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center">
      {/* Background ambient lighting and decorative grids */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[90px]" />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Doctor credentials and introduction */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Medical Fellowship & Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-medium backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-white">{hero.fellowshipBadge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.15]">
                {hero.headlineMain} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
                  {hero.headlineGradient}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-200 font-medium font-sans">
                {hero.doctorName}, <span className="text-cyan-400 font-semibold">{hero.doctorDegree}</span>
              </p>
            </div>

            {/* Subheading & Clinical Philosophy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              {hero.bio}
            </p>

            {/* Quick credentials pill row (Dynamic Metrics) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-medium">{hero.stat1Label}</div>
                <div className="text-lg font-bold text-white tracking-tight">{hero.stat1Value}</div>
                <div className="text-[11px] text-cyan-400 font-medium">{hero.stat1Sub}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-medium">{hero.stat2Label}</div>
                <div className="text-lg font-bold text-white tracking-tight">{hero.stat2Value}</div>
                <div className="text-[11px] text-emerald-400 font-medium">{hero.stat2Sub}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-400 font-medium">{hero.stat3Label}</div>
                <div className="text-lg font-bold text-white tracking-tight">{hero.stat3Value}</div>
                <div className="text-[11px] text-amber-400 font-medium">{hero.stat3Sub}</div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenAppointment}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-lg shadow-cyan-600/30 hover:shadow-cyan-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>Book Consultation</span>
                <ChevronRight className="w-4 h-4 text-cyan-200" />
              </button>

              <a
                href="#retina-explorer"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-cyan-800/50 hover:border-cyan-500/60 transition-all hover:text-white group"
              >
                <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
                <span>Explore Interactive Retina</span>
              </a>

              <a
                href="#scholar-feed"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-slate-300 hover:text-cyan-300 transition-colors text-sm"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Google Scholar (Live)</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                PERDAMI Member
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                INANOS & INAVRS Specialist
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Head of Specialist Study Program (KPS)
              </span>
            </div>
          </div>

          {/* Right Column: Doctor Portrait in upscale eye clinic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glowing back-frame accent */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-600/30 via-sky-400/20 to-amber-500/20 rounded-3xl blur-xl opacity-80 animate-pulse" />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-950/60 bg-slate-950">
                <img
                  src={siteImages.doctorProfile}
                  alt={hero.doctorName}
                  className="w-full h-auto object-cover object-top aspect-[3/4] hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Gradient bottom overlay with name badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-cyan-900/40 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {hero.doctorName}, {hero.doctorDegree}
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      </h4>
                      <p className="text-xs text-cyan-300 font-medium">
                        {hero.subTitle}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        RSUD Dr. Saiful Anwar • FK Universitas Brawijaya
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold text-xs">
                      {hero.doctorDegree}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating achievement card top-left */}
              <div className="absolute -top-4 -left-4 sm:-left-6 hidden sm:flex items-center gap-3 py-2.5 px-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-800/40 shadow-xl">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Retina Microsurgery</div>
                  <div className="text-[11px] text-emerald-400 font-medium">25G / 27G Sutureless MIVS</div>
                </div>
              </div>

              {/* Floating achievement card bottom-right */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 hidden sm:flex items-center gap-3 py-2.5 px-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-amber-800/40 shadow-xl">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">SINTA Top Researcher</div>
                  <div className="text-[11px] text-amber-300 font-medium">ID: 5982903 • 280+ Citations</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
