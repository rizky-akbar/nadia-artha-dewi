import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, ArrowRight, KeyRound } from 'lucide-react';
import { useSite } from '../../context/SiteContext.jsx';

export default function AdminLoginModal() {
  const { isAdminLoginOpen, setIsAdminLoginOpen, loginAdmin } = useSite();
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAdminLoginOpen) return null;

  const handleClose = () => {
    setIsAdminLoginOpen(false);
    setErrorMsg('');
    setPasscode('');
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
    if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (!success) {
      setErrorMsg('Incorrect passkey. Please try again.');
    } else {
      setErrorMsg('');
      setPasscode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-cyan-800/60 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 space-y-6 relative">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Emblem & Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-900/30">
            <KeyRound className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-white font-serif tracking-tight">
            Doctor & Staff Portal
          </h3>
          <p className="text-xs text-slate-400">
            Internal administration suite for Dr. dr. Nadia Artha Dewi, Sp.M(K)
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Admin Passcode</span>
              <span className="text-[11px] text-cyan-400 font-mono">Default: nadia2026</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="Enter access passcode..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400 font-medium bg-rose-950/30 border border-rose-900/50 p-2.5 rounded-xl">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-lg shadow-cyan-900/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
          >
            <span>Unlock Admin Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-900 text-center">
          <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Protected local administration route
          </span>
        </div>

      </div>
    </div>
  );
}
