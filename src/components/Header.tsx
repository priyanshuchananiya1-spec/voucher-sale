import React from 'react';
import { UserSession } from '../types';
import {
  Wallet,
  ShieldCheck,
  User as UserIcon,
  HelpCircle,
  Clock,
  Sparkles,
  LogIn,
  LogOut,
  PlusCircle
} from 'lucide-react';

interface HeaderProps {
  walletBalance: number;
  userSession: UserSession;
  pendingOrdersCount: number;
  onOpenDeposit: () => void;
  onOpenRefund: () => void;
  onOpenOrders: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  walletBalance,
  userSession,
  pendingOrdersCount,
  onOpenDeposit,
  onOpenRefund,
  onOpenOrders,
  onOpenLogin,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-[11px] sm:text-xs py-1.5 px-4 font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              Limited Offer
            </span>
            <span className="truncate">
              ⚡ <strong>Wallet se purchase karne par extra 2% ka discount milega!</strong> (UPI: <code className="bg-black/20 px-1 py-0.5 rounded font-mono">priyanshu-xy@fam</code>)
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px] text-amber-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>RBI Verified NPCI Gateway</span>
            </span>
            <span className="opacity-60">•</span>
            <span>2-5 Mins Verification</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white font-black shadow-md shadow-orange-500/20 text-lg">
              VS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  Voucher<span className="text-amber-600"> Sale</span>
                </span>
                <span className="hidden sm:inline-block text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Direct UPI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
                150+ Authentic Indian Gift Cards & Gaming Vouchers
              </p>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wallet Balance Widget */}
          <div className="flex items-center bg-amber-50/70 border border-amber-200/80 rounded-xl p-1 pr-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="ml-2 mr-2">
              <div className="text-[9px] font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                <span>Wallet</span>
                <span className="text-[8px] bg-amber-200/80 text-amber-900 font-bold px-1 rounded">
                  +2% OFF
                </span>
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 leading-none">
                ₹{walletBalance.toLocaleString('en-IN')}
              </div>
            </div>
            <button
              onClick={onOpenDeposit}
              className="p-1 rounded-lg hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
              title="Deposit funds in wallet for extra 2% discount"
            >
              <PlusCircle className="w-4 h-4 text-amber-700" />
            </button>
          </div>

          {/* Refund Claim Link */}
          <button
            onClick={onOpenRefund}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
            title="File a refund claim if bank debited but wallet deposit timed out"
          >
            <HelpCircle className="w-4 h-4 text-rose-500" />
            <span>Refund Claim</span>
          </button>

          {/* Track Orders / Verification Status */}
          <button
            onClick={onOpenOrders}
            className="relative flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
            title="Check pending UTR verifications & unlocked vouchers"
          >
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="hidden md:inline">Track Orders</span>
            {pendingOrdersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          {/* Gmail User Profile */}
          {userSession.isLoggedIn ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                {userSession.avatarLetter || userSession.email[0]?.toUpperCase() || 'U'}
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {userSession.displayName}
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]">
                  {userSession.email}
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Log out of Gmail"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-amber-600 px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>Gmail Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
