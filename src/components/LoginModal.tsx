import React, { useState, useEffect } from 'react';
import { UserSession } from '../types';
import {
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  ArrowRight,
  UserCheck,
  KeyRound
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [emailInput, setEmailInput] = useState('p7400230@gmail.com');
  const [step, setStep] = useState<'SELECT' | 'CODE'>('SELECT');
  const [generatedCode, setGeneratedCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [showEmailBanner, setShowEmailBanner] = useState(false);

  const DEFAULT_GMAIL = 'p7400230@gmail.com';

  useEffect(() => {
    let timer: any;
    if (step === 'CODE' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  // Direct 1-Click Google Sign In with standard account
  const handleQuickGoogleSignIn = (selectedEmail: string, displayName = 'Priyanshu') => {
    const session: UserSession = {
      email: selectedEmail,
      displayName,
      avatarLetter: (displayName[0] || selectedEmail[0]).toUpperCase(),
      isLoggedIn: true,
      loginTimestamp: Date.now()
    };
    onLoginSuccess(session);
    onClose();
  };

  // Send Email verification code to any typed Gmail
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg('Please enter a valid email address (e.g., name@gmail.com).');
      return;
    }

    setErrorMsg('');
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(randomCode);
    setStep('CODE');
    setCountdown(30);
    setShowEmailBanner(true);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCode !== generatedCode) {
      setErrorMsg('Incorrect verification code. Please check your Gmail notification.');
      return;
    }

    const nameFromEmail = emailInput.split('@')[0];
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const session: UserSession = {
      email: emailInput.trim().toLowerCase(),
      displayName: capitalizedName,
      avatarLetter: capitalizedName.charAt(0).toUpperCase(),
      isLoggedIn: true,
      loginTimestamp: Date.now()
    };

    onLoginSuccess(session);
    onClose();
  };

  const handleAutoFillCode = () => {
    setUserCode(generatedCode);
    setErrorMsg('');
  };

  const handleResend = () => {
    if (countdown > 0) return;
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(randomCode);
    setUserCode('');
    setCountdown(30);
    setShowEmailBanner(true);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      {/* Simulated Gmail Incoming Email Notification Banner */}
      {showEmailBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 max-w-md w-full px-4 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="w-4 h-4 fill-current" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-0.5">
                <span>Gmail • Voucher Sale Security</span>
                <span>Just Now</span>
              </div>
              <p className="text-slate-200">
                <strong className="text-amber-400 font-mono tracking-widest text-sm mr-1.5">
                  {generatedCode}
                </strong>
                is your login security code for <span className="font-mono text-slate-300">{emailInput}</span>.
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Valid for 10 minutes</span>
                <button
                  type="button"
                  onClick={handleAutoFillCode}
                  className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] hover:bg-amber-400 cursor-pointer transition-colors"
                >
                  Auto-fill Code
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowEmailBanner(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Modal Window */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                Gmail Account Login
              </h3>
              <p className="text-[11px] text-slate-400">
                Sign in with your Google / Gmail ID
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 'SELECT' ? (
            <div className="space-y-4">
              {/* 1-Click Fast Google Sign-in with default account */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Fast 1-Click Google Sign-in
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickGoogleSignIn(DEFAULT_GMAIL, 'Priyanshu')}
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-slate-50/70 hover:bg-amber-50/30 transition-all flex items-center justify-between text-left group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    {/* Google G multicolored SVG */}
                    <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Priyanshu</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                          Registered
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono truncate">
                        {DEFAULT_GMAIL}
                      </div>
                    </div>
                  </div>

                  <div className="text-amber-600 font-bold text-xs group-hover:translate-x-0.5 transition-transform flex items-center">
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-2 text-[10px] uppercase font-bold text-slate-400 shrink-0">
                  Or enter another Gmail ID
                </span>
                <div className="border-t border-slate-200 w-full" />
              </div>

              {/* Custom Gmail Form */}
              <form onSubmit={handleSendCode} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Gmail Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="yourname@gmail.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Send Security Code to Gmail</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* Step 2: Code Verification */
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Enter Security Code from Gmail
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('SELECT')}
                    className="text-[10px] text-amber-700 hover:underline font-semibold"
                  >
                    Change Email
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 mb-2 font-mono">
                  Code dispatched to: <strong>{emailInput}</strong>
                </div>

                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={6}
                  value={userCode}
                  onChange={(e) => {
                    setUserCode(e.target.value.replace(/\D/g, ''));
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="6-digit code"
                  className="w-full px-4 py-2.5 text-center bg-slate-50 border border-slate-200 rounded-xl text-lg font-mono font-black tracking-widest focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />

                <div className="flex items-center justify-between mt-2 text-xs">
                  <button
                    type="button"
                    onClick={handleAutoFillCode}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-fill ({generatedCode})</span>
                  </button>

                  <div className="text-[11px] text-slate-400">
                    {countdown > 0 ? (
                      <span>Resend in {countdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-amber-700 font-bold hover:underline cursor-pointer"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={userCode.length < 6}
                className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  userCode.length === 6
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Verify & Sign In</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Google Account Secured Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};
