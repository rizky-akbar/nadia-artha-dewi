import React, { useState } from 'react';
import { Grid, Eye, AlertTriangle, CheckCircle2, RefreshCw, Calendar, ChevronRight } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';

export default function AmslerGridTool({ onOpenAppointment }) {
  const { siteContent } = useSite();
  const amslerContent = siteContent?.amsler || {};
  const [testResult, setTestResult] = useState('none');
  const [simulatedDistortion, setSimulatedDistortion] = useState(false);

  const resetTest = () => {
    setTestResult('none');
    setSimulatedDistortion(false);
  };

  return (
    <section id="amsler-tool" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Grid className="w-3.5 h-3.5 text-cyan-400" />
            <span>{amslerContent.badge || 'Self-Screening Diagnostic Tool'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
            {amslerContent.title?.includes('Amsler Grid') ? (
              <>
                {amslerContent.title.replace('Amsler Grid', '')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                  Amsler Grid
                </span>
                {amslerContent.title.endsWith('Test') && !amslerContent.title.replace('Amsler Grid', '').includes('Test') ? ' Test' : ''}
              </>
            ) : (
              amslerContent.title || 'Interactive Amsler Grid Test'
            )}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            {amslerContent.subTitle || 'The standard diagnostic test used by vitreo-retina specialists to detect early macular degeneration, foveal swelling, and central visual distortion (metamorphopsia).'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Instructions and Interactive Result */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white font-serif flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                <span>How to Perform the Test:</span>
              </h3>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>{amslerContent.step1 || 'Wear your normal reading glasses or contact lenses if prescribed.'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>{amslerContent.step2 || 'Position yourself approximately 35–40 cm (14 inches) from your screen.'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>{amslerContent.step3 || 'Cover your left eye with your hand. Stare steadily at the white center dot. Repeat for the other eye.'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <span>{amslerContent.step4 || 'While looking at the center dot, observe the surrounding lines. Are any lines bent, wavy, blurry, or missing?'}</span>
                </li>
              </ol>

              {/* Patient Response Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  What do you observe with each eye?
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTestResult('normal')}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      testResult === 'normal'
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                        : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>All lines are straight</span>
                  </button>

                  <button
                    onClick={() => setTestResult('distorted')}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      testResult === 'distorted'
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                        : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-rose-700'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Lines look wavy / missing</span>
                  </button>
                </div>
              </div>

              {/* Clinical Feedback Box */}
              {testResult !== 'none' && (
                <div
                  className={`p-5 rounded-2xl border transition-all animate-in fade-in space-y-3 ${
                    testResult === 'distorted'
                      ? 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                      : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {testResult === 'distorted' ? (
                      <>
                        <AlertTriangle className="w-5 h-5 text-rose-400" />
                        <span>Possible Macular Distortion (Metamorphopsia)</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Normal Central Grid Response</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {testResult === 'distorted'
                      ? (amslerContent.distortedFeedback || 'Distorted, wavy, or absent grid lines can indicate underlying macular edema, epiretinal membrane, wet macular degeneration, or central serous chorioretinopathy. An urgent Spectral-Domain OCT scan with a vitreo-retina consultant is strongly advised.')
                      : (amslerContent.normalFeedback || 'No evident central metamorphopsia detected on this screen. However, this screening does not replace comprehensive dilated fundus examination, especially for diabetic individuals or high myopes.')}
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={onOpenAppointment}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-600 to-sky-600 text-white hover:from-cyan-500 hover:to-sky-500 shadow-md transition-all"
                    >
                      Schedule Macular OCT Evaluation
                    </button>
                    <button
                      onClick={resetTest}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Actual Amsler Grid SVG Display with Distortion Toggle */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-black border-2 border-cyan-800/40 shadow-2xl shadow-cyan-950/60 w-full max-w-md space-y-4">
              
              {/* Simulation Banner */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>STANDARD AMSLER GRID (20x20)</span>
                <button
                  onClick={() => setSimulatedDistortion(!simulatedDistortion)}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium"
                >
                  {simulatedDistortion ? 'Reset to Normal Grid' : 'Simulate Wavy Vision'}
                </button>
              </div>

              {/* The Grid */}
              <div className="relative aspect-square w-full bg-black border border-white/40 flex items-center justify-center overflow-hidden rounded-xl">
                
                {/* SVG Grid */}
                <svg
                  viewBox="0 0 400 400"
                  className={`w-full h-full ${simulatedDistortion ? 'animate-pulse' : ''}`}
                >
                  {/* Grid Lines */}
                  {Array.from({ length: 21 }).map((_, i) => {
                    const coord = i * 20;
                    if (simulatedDistortion && i >= 7 && i <= 13) {
                      // Curved distorted lines to illustrate macular degeneration
                      return (
                        <g key={i}>
                          <path
                            d={`M 0 ${coord} Q 200 ${coord + (i % 2 === 0 ? 15 : -15)} 400 ${coord}`}
                            stroke="#ffffff"
                            strokeWidth="1"
                            fill="none"
                          />
                          <path
                            d={`M ${coord} 0 Q ${coord + (i % 2 === 0 ? -15 : 15)} 200 ${coord} 400`}
                            stroke="#ffffff"
                            strokeWidth="1"
                            fill="none"
                          />
                        </g>
                      );
                    }
                    return (
                      <g key={i}>
                        <line x1="0" y1={coord} x2="400" y2={coord} stroke="#ffffff" strokeWidth="1" />
                        <line x1={coord} y1="0" x2={coord} y2="400" stroke="#ffffff" strokeWidth="1" />
                      </g>
                    );
                  })}

                  {/* Central Fixation Dot */}
                  <circle cx="200" cy="200" r="5" fill="#ffffff" />

                  {/* Distorted blind spot simulation if active */}
                  {simulatedDistortion && (
                    <circle cx="215" cy="185" r="22" fill="#000000" opacity="0.8" />
                  )}
                </svg>

              </div>

              <div className="text-center text-[11px] text-slate-400 font-mono">
                FOCUS DIRECTLY AT CENTER WHITE DOT
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
