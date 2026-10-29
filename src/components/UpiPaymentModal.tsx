import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Brand } from '../types';
import { BrandLogo } from './BrandLogo';
import { Copy, Check, ShieldCheck, AlertCircle, ArrowRight, X, ExternalLink } from 'lucide-react';

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand | null;
  denomination: number;
  finalAmount: number;
  savings: number;
  onSubmitUtr: (utr: string) => void;
}

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({
  isOpen,
  onClose,
  brand,
  denomination,
  finalAmount,
  savings,
  onSubmitUtr
}) => {
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const FIXED_UPI_ID = 'priyanshu-xy@fam';
  const upiIntentString = `upi://pay?pa=${FIXED_UPI_ID}&pn=VoucherSale&am=${finalAmount}&cu=INR&tn=VoucherSale%20${brand?.name || 'Voucher'}`;

  // Generate QR Code with qrcode library
  useEffect(() => {
    if (isOpen && finalAmount > 0) {
      QRCode.toDataURL(upiIntentString, {
        width: 260,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation error:', err));
    }
  }, [isOpen, finalAmount, upiIntentString]);

  if (!isOpen || !brand) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(FIXED_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(finalAmount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUtr = utrNumber.trim().replace(/\s+/g, '');
    
    // Strict 12-digit check
    if (!/^\d{12}$/.test(cleanUtr)) {
      setErrorMsg('Please enter a valid 12-digit numeric UTR / Ref Number from your UPI app receipt.');
      return;
    }
    setErrorMsg('');
    onSubmitUtr(cleanUtr);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/40">
              UPI
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                Scan UPI QR to Pay
              </h3>
              <p className="text-[11px] text-slate-300">
                Official NPCI Instant UPI Payment Gateway
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

        {/* Order Summary Strip */}
        <div className="bg-amber-500/10 border-b border-amber-200/60 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo logoType={brand.logoType} name={brand.name} size="sm" />
            <div>
              <div className="text-xs font-bold text-slate-900">{brand.name}</div>
              <div className="text-[10px] text-slate-500">
                {brand.diamondTiers?.find((t) => t.price === denomination)
                  ? `${brand.diamondTiers.find((t) => t.price === denomination)?.diamonds} Diamonds Pack (Saved ₹${savings})`
                  : `₹${denomination.toLocaleString('en-IN')} Voucher (Saved ₹${savings})`}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Payable Amount</div>
            <div className="text-base font-black text-slate-900">
              ₹{finalAmount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Game Specific Note Warning (Free Fire MAX vs Free Fire India) */}
        {brand.gameSpecificNote && (
          <div className="bg-amber-50 border-b border-amber-300 px-3.5 py-2 text-xs font-bold text-amber-950 flex items-center gap-2">
            <span className="text-sm">⚠️</span>
            <span>{brand.gameSpecificNote}</span>
          </div>
        )}

        {/* QR Code and Payment Details */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* QR Code Display */}
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white rounded-2xl border-2 border-slate-800 shadow-md relative">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`Scan QR to pay ₹${finalAmount} to ${FIXED_UPI_ID}`}
                  className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
                  Generating dynamic QR...
                </div>
              )}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                Scan with any UPI App
              </div>
            </div>

            {/* Fixed UPI ID Box */}
            <div className="mt-4 w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Fixed Merchant UPI ID</div>
                <div className="text-xs font-mono font-black text-slate-900">
                  {FIXED_UPI_ID}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="flex items-center gap-1 text-[11px] font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-2.5 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                {copiedUpi ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy UPI</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct UPI App Triggers */}
            <div className="mt-3 w-full">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 text-center">
                Or Tap to Pay Directly with UPI App
              </div>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={upiIntentString}
                  className="py-1.5 px-2 rounded-xl text-[11px] font-bold text-center bg-[#5f259f]/10 text-[#5f259f] border border-[#5f259f]/30 hover:bg-[#5f259f]/20 transition-colors flex items-center justify-center gap-1"
                >
                  <span>PhonePe</span>
                </a>
                <a
                  href={upiIntentString}
                  className="py-1.5 px-2 rounded-xl text-[11px] font-bold text-center bg-[#1a73e8]/10 text-[#1a73e8] border border-[#1a73e8]/30 hover:bg-[#1a73e8]/20 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Google Pay</span>
                </a>
                <a
                  href={upiIntentString}
                  className="py-1.5 px-2 rounded-xl text-[11px] font-bold text-center bg-[#00b9f1]/10 text-[#002e6e] border border-[#00b9f1]/30 hover:bg-[#00b9f1]/20 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Paytm</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form for 12-Digit UTR */}
          <form onSubmit={handleSubmit} className="pt-2 border-t border-slate-100 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-800">
                  Enter 12-Digit Transaction UTR / Ref No.
                </label>
                <span className="text-[10px] text-amber-600 font-semibold">
                  Required for verification
                </span>
              </div>
              <input
                type="text"
                maxLength={12}
                value={utrNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setUtrNumber(val);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="e.g. 429381920194"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono tracking-wider focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400"
              />
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                Find this 12-digit number in your PhonePe / GPay / Paytm payment details labeled as &quot;UTR&quot; or &quot;UPI Ref ID&quot;.
              </p>
            </div>

            {errorMsg && (
              <div className="flex items-start gap-1.5 text-xs text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={utrNumber.length < 12}
              className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                utrNumber.length === 12
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md active:scale-98'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Submit UTR & Verify Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Verification Notice */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verification takes 2 to 5 minutes post submission</span>
          </div>
        </div>
      </div>
    </div>
  );
};
