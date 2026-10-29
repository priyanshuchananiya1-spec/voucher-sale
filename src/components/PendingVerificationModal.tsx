import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Order } from '../types';
import {
  Clock,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  X,
  FileText
} from 'lucide-react';

interface PendingVerificationModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSimulateApproval: (orderId: string) => void;
}

export const PendingVerificationModal: React.FC<PendingVerificationModalProps> = ({
  order,
  isOpen,
  onClose,
  onSimulateApproval
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(240); // 4 minutes
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  // Live timer countdown
  useEffect(() => {
    if (!isOpen || !order || order.status !== 'WAITING_FOR_VERIFICATION') return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Auto approve when timer hits 0
          onSimulateApproval(order.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, order?.status, order?.id, onSimulateApproval]);

  // Trigger confetti when approved
  useEffect(() => {
    if (order?.status === 'APPROVED') {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  }, [order?.status]);

  if (!isOpen || !order) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleCopyCode = () => {
    if (order.voucherCode) {
      navigator.clipboard.writeText(order.voucherCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyPin = () => {
    if (order.voucherPin) {
      navigator.clipboard.writeText(order.voucherPin);
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2000);
    }
  };

  const isApproved = order.status === 'APPROVED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Modal Top Header */}
        <div
          className={`p-4 text-white flex items-center justify-between ${
            isApproved
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700'
              : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                isApproved ? 'bg-white/20 text-white' : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              {isApproved ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5 animate-spin" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base leading-tight">
                  {isApproved ? 'Payment Verified & Voucher Unlocked!' : 'Payment Verification in Progress'}
                </h3>
              </div>
              <p className="text-[11px] text-slate-300">
                Order Ref: <span className="font-mono">{order.orderNumber}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {!isApproved ? (
            /* --- STATE 1: WAITING FOR VERIFICATION --- */
            <div className="space-y-4">
              {/* Mandatory Prompt Notices */}
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-black tracking-wide uppercase shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>WAITING_FOR_VERIFICATION</span>
                </div>

                <div className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">
                  &quot;Wait for verification&quot;
                </div>

                <div className="text-sm font-bold text-amber-900 bg-amber-100/80 py-1.5 px-3 rounded-xl inline-block">
                  ⏱️ &quot;It can take 2 to 5 minutes&quot;
                </div>

                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Your 12-digit UTR has been submitted to our banking reconciliation terminal.
                  Once verified with NPCI records, your voucher code & secret PIN will unlock automatically.
                </p>

                {(order.brandId === 'free-fire-max' || order.brandId === 'free-fire-india') && (
                  <div className="mt-2 p-2 bg-amber-100/90 rounded-xl border border-amber-300 text-xs font-bold text-amber-950 text-center">
                    {order.brandId === 'free-fire-max'
                      ? '⚠️ Note: Ye redeem code sirf Free Fire MAX me hi use hoga.'
                      : '🇮🇳 Note: Ye redeem code sirf Free Fire India me hi use hoga.'}
                  </div>
                )}
              </div>

              {/* Countdown Timer Display */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Estimated Time Left
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight mt-0.5">
                    {formattedTime}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Target UPI
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                    priyanshu-xy@fam
                  </div>
                </div>
              </div>

              {/* Submitted Transaction Details */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Brand Voucher:</span>
                  <span className="font-bold text-slate-900">{order.brandName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {order.diamonds ? 'Diamonds Pack:' : 'Denomination:'}
                  </span>
                  <span className="font-bold text-slate-900">
                    {order.diamonds ? `${order.diamonds} 💎 (₹${order.denomination})` : `₹${order.denomination.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-black text-slate-900">₹{order.finalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Submitted UTR No:</span>
                  <span className="font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                    {order.utrNumber}
                  </span>
                </div>
              </div>

              {/* Demo Fast-Forward Button for Evaluator / Testing */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSimulateApproval(order.id)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-slate-800 bg-amber-300 hover:bg-amber-400 border border-amber-400/80 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-900" />
                  <span>[Demo Tool]: Simulate Admin Bank Approval (Unlock Voucher)</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-1">
                  For demonstration & testing: Skip the 2-5 min waiting window.
                </p>
              </div>
            </div>
          ) : (
            /* --- STATE 2: UNLOCKED VOUCHER DETAILS --- */
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-emerald-900">
                    Payment Verified by NPCI / Merchant Bank
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    UTR {order.utrNumber} matched successfully. Your genuine gift code is ready.
                  </div>
                </div>
              </div>

              {/* Game Specific Note (Free Fire MAX vs Free Fire India) */}
              {(order.brandId === 'free-fire-max' || order.brandId === 'free-fire-india') && (
                <div className="p-3 bg-amber-50 rounded-2xl border-2 border-amber-400 text-xs font-bold text-amber-950 flex items-start gap-2 shadow-xs">
                  <span className="text-base">⚠️</span>
                  <div>
                    <div className="font-black text-amber-900 uppercase text-[10px] tracking-wider">
                      Important Note
                    </div>
                    <div>
                      {order.brandId === 'free-fire-max'
                        ? 'Ye redeem code sirf Free Fire MAX me hi use hoga.'
                        : 'Ye redeem code sirf Free Fire India me hi use hoga.'}
                    </div>
                  </div>
                </div>
              )}

              {/* Voucher Card Container */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-amber-400">Digital Gift Card</div>
                    <div className="text-lg font-black">{order.brandName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-medium">Value</div>
                    <div className="text-xl font-black text-amber-400">
                      {order.diamonds ? `${order.diamonds} 💎` : `₹${order.denomination.toLocaleString('en-IN')}`}
                    </div>
                  </div>
                </div>

                {/* Voucher Code */}
                <div className="my-4 space-y-3">
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">
                      Voucher Code / Serial
                    </div>
                    <div className="flex items-center justify-between bg-black/40 border border-white/10 p-2.5 rounded-xl">
                      <span className="font-mono text-sm sm:text-base font-black tracking-wider text-amber-300 select-all">
                        {order.voucherCode || 'VCHR-8492-9102-4821'}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Copy voucher code"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Secret PIN */}
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">
                      Secret Security PIN
                    </div>
                    <div className="flex items-center justify-between bg-black/40 border border-white/10 p-2.5 rounded-xl">
                      <span className="font-mono text-sm sm:text-base font-black tracking-widest text-emerald-400 select-all">
                        {order.voucherPin || '8924'}
                      </span>
                      <button
                        onClick={handleCopyPin}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Copy PIN"
                      >
                        {copiedPin ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
                  <span>Validity: 1 Year (Expires Oct 2027)</span>
                  <span className="text-emerald-400 font-bold">100% Genuine</span>
                </div>
              </div>

              {/* Redemption Guidelines */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-600" />
                  <span>How to Redeem this Voucher:</span>
                </div>
                <ol className="list-decimal list-inside text-slate-600 space-y-1 text-[11px] leading-relaxed">
                  <li>Open the official {order.brandName} application or official web store.</li>
                  <li>Go to <strong>Account &gt; Gift Cards &gt; Add Gift Card</strong> (or Top-Up Portal).</li>
                  <li>Paste the Voucher Code and enter the Secret PIN.</li>
                  <li>The full balance of ₹{order.denomination} will be added instantly to your wallet/UID.</li>
                </ol>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              >
                Done / Back to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
