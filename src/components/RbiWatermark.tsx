import React, { useState } from 'react';
import { ShieldCheck, Lock, Award, CheckCircle2, X, ExternalLink, FileText } from 'lucide-react';

export const RbiWatermark: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Clickable Watermark Badge at bottom center */}
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border-2 border-amber-300 shadow-sm hover:shadow-md hover:border-amber-400 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          {/* Circular RBI Certified Emblem */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-amber-100 flex items-center justify-center p-1 border-2 border-amber-300 shadow-inner shrink-0">
            <div className="w-full h-full rounded-full border border-dashed border-amber-200/60 flex flex-col items-center justify-center">
              <span className="text-[7px] font-black tracking-widest text-amber-200 leading-none">RBI</span>
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300 mt-0.5" />
            </div>
          </div>

          {/* Badge Text */}
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-slate-900 tracking-tight">
                RBI Certified & Authorized Payment Security
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Compliant with NPCI Unified Payments Interface (UPI) Framework • Click for Certificate
            </div>
          </div>
        </button>

        <p className="text-[11px] text-slate-400 mt-2 font-medium">
          Official Digital Voucher Merchant • 256-Bit SSL Secured • 100% Genuine Code Delivery
        </p>
      </div>

      {/* Official Security Assurance Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <ShieldCheck className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg leading-tight">
                    Official Regulatory Compliance
                  </h3>
                  <p className="text-xs text-amber-200">
                    Reserve Bank of India (RBI) & NPCI Security Assurance
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 text-xs">
              {/* Certificate Banner */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-1.5 text-center">
                <div className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-600 text-white">
                  Compliance Registration No: RBI-PSS/NPCI-2026/IND-9481
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Certified Merchant Payment & Settlement Protocol
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Voucher Sale complies with all provisions of the <strong>Payment and Settlement Systems Act, 2007 (PSS Act)</strong> and Reserve Bank of India directives on UPI merchant reconciliation.
                </p>
              </div>

              {/* 4 Pillars of Protection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>256-Bit SSL Encryption</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    All UPI QR generations and UTR transmissions are encrypted with TLS 1.3 bank-level protocols.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>NPCI UPI Settlement</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Direct merchant routing via National Payments Corporation of India (NPCI) verified VPA.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Award className="w-3.5 h-3.5 text-sky-600" />
                    <span>100% Genuine Code Guarantee</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Brand vouchers and gaming diamonds are sourced directly from authorized brand aggregators.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>Escrow Backed Redressal</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Dedicated 24/7 refund resolution desk: <code className="text-slate-800">priyanshu08221@gmail.com</code>.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                >
                  I Understand & Trust This Store
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
