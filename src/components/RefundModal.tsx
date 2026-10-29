import React, { useState, useEffect } from 'react';
import { RefundClaim } from '../types';
import {
  HelpCircle,
  Mail,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  FileCheck,
  ArrowRight
} from 'lucide-react';

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: {
    amount?: number;
    utr?: string;
    errorCode?: string;
  } | null;
  onSaveClaim: (claim: RefundClaim) => void;
  savedClaims: RefundClaim[];
}

export const RefundModal: React.FC<RefundModalProps> = ({
  isOpen,
  onClose,
  prefillData,
  onSaveClaim,
  savedClaims
}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [customerUpiId, setCustomerUpiId] = useState('');
  const [depositAmount, setDepositAmount] = useState<string>('1000');
  const [utrNumber, setUtrNumber] = useState('');
  const [errorCode, setErrorCode] = useState('ERR_NPCI_SETTLEMENT_TIMEOUT_504');
  const [reason, setReason] = useState('Wallet Deposit Failed but amount debited from bank');
  const [submittedClaim, setSubmittedClaim] = useState<RefundClaim | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle prefill updates
  useEffect(() => {
    if (prefillData) {
      if (prefillData.amount) setDepositAmount(prefillData.amount.toString());
      if (prefillData.utr) setUtrNumber(prefillData.utr);
      if (prefillData.errorCode) setErrorCode(prefillData.errorCode);
    }
  }, [prefillData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!customerUpiId.includes('@')) {
      setErrorMsg('Please provide a valid Customer UPI ID (e.g. name@okaxis) to receive your refund.');
      return;
    }
    const numAmount = Number(depositAmount);
    if (!numAmount || numAmount <= 0) {
      setErrorMsg('Please specify a valid deposit amount.');
      return;
    }
    const cleanUtr = utrNumber.replace(/\D/g, '');
    if (cleanUtr.length < 12) {
      setErrorMsg('12-digit transaction UTR is required.');
      return;
    }

    setErrorMsg('');

    const newTicketId = `REF-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newClaim: RefundClaim = {
      id: `claim-${Date.now()}`,
      ticketId: newTicketId,
      fullName: fullName.trim(),
      mobileNumber: cleanMobile,
      customerUpiId: customerUpiId.trim(),
      depositAmount: numAmount,
      utrNumber: cleanUtr,
      errorCode: errorCode.trim() || 'ERR_NPCI_SETTLEMENT_TIMEOUT_504',
      reason: reason.trim(),
      createdAt: Date.now(),
      status: 'UNDER_REVIEW'
    };

    // Save claim locally
    onSaveClaim(newClaim);
    setSubmittedClaim(newClaim);

    // Form submission action: Directly opens mailto link to priyanshu08221@gmail.com
    const emailTo = 'priyanshu08221@gmail.com';
    const emailSubject = encodeURIComponent('Urgent: Deposit Refund Claim Request');
    const emailBody = encodeURIComponent(
      `URGENT DEPOSIT REFUND CLAIM REQUEST\n` +
      `----------------------------------------\n` +
      `Ticket ID: ${newTicketId}\n` +
      `Full Name: ${fullName.trim()}\n` +
      `Mobile Number: +91 ${cleanMobile}\n` +
      `Refund Target UPI ID: ${customerUpiId.trim()}\n` +
      `Deposit Amount Debited: INR ${numAmount}\n` +
      `Bank UTR / Transaction Ref: ${cleanUtr}\n` +
      `Encountered Error Code: ${errorCode}\n` +
      `Reason / Description: ${reason}\n` +
      `Timestamp: ${new Date().toLocaleString('en-IN')}\n\n` +
      `Merchant Note: The user attempted deposit on Voucher Sale to merchant priyanshu-xy@fam. Please reconcile with bank records and issue reverse UPI credit.\n`
    );

    // Trigger mail client
    window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-rose-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                Deposit Failure Refund Claim
              </h3>
              <p className="text-[11px] text-rose-200">
                Official NPCI Reversal & Customer Support Desk
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

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {submittedClaim ? (
            /* --- SUBMITTED SUCCESS VIEW --- */
            <div className="space-y-4 text-center py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900">
                  Refund Claim Registered Successfully!
                </h4>
                <div className="inline-block bg-slate-100 text-slate-800 font-mono font-bold text-xs px-3 py-1 rounded-full border border-slate-300 mt-1">
                  Ticket ID: {submittedClaim.ticketId}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-800">{submittedClaim.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Refund UPI:</span>
                  <span className="font-mono font-bold text-slate-800">{submittedClaim.customerUpiId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Claimed:</span>
                  <span className="font-black text-rose-600">₹{submittedClaim.depositAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank UTR:</span>
                  <span className="font-mono font-bold text-slate-700">{submittedClaim.utrNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Support Desk:</span>
                  <span className="font-mono text-slate-700">priyanshu08221@gmail.com</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-snug">
                Your email client was triggered with pre-formatted dispute details.
                Our settlement desk will cross-verify with NPCI gateway within 2 to 24 hours.
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmittedClaim(null);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          ) : (
            /* --- REFUND FORM --- */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  If your bank debited money but your wallet deposit failed, enter your transaction UTR and UPI ID below. An official claim will be dispatched directly to <strong>priyanshu08221@gmail.com</strong>.
                </div>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Full Name (as per Bank Account) *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              {/* Mobile Number & Customer UPI ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Mobile Number (10 digits) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Customer UPI ID (for Refund) *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerUpiId}
                    onChange={(e) => setCustomerUpiId(e.target.value)}
                    placeholder="e.g. name@okhdfcbank"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Deposit Amount & 12-digit UTR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Deposit Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="1000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    12-digit Transaction UTR / Ref *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 482910482910"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Error Code (prefilled with ERR_NPCI_SETTLEMENT_TIMEOUT_504) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Encountered Error Code *
                </label>
                <input
                  type="text"
                  value={errorCode}
                  onChange={(e) => setErrorCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs font-mono font-bold text-rose-700"
                />
              </div>

              {/* Reason for Refund */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Reason for Refund *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                >
                  <option value="Wallet Deposit Failed but amount debited from bank">
                    Wallet Deposit Failed but amount debited from bank
                  </option>
                  <option value="NPCI Gateway Timeout 504 on UPI payment">
                    NPCI Gateway Timeout 504 on UPI payment
                  </option>
                  <option value="Duplicate payment debited on single UTR">
                    Duplicate payment debited on single UTR
                  </option>
                  <option value="Other settlement discrepancy">
                    Other settlement discrepancy
                  </option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Claim & Dispatch to Finance Desk</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-1.5">
                  Sends formatted claim email to: <strong>priyanshu08221@gmail.com</strong>
                </p>
              </div>
            </form>
          )}

          {/* Past Claims section if any */}
          {savedClaims.length > 0 && !submittedClaim && (
            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Your Previously Logged Claims ({savedClaims.length})</span>
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {savedClaims.map((c) => (
                  <div
                    key={c.id}
                    className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-[11px] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono font-bold text-slate-800">{c.ticketId}</span>
                      <span className="text-slate-400 ml-1.5">₹{c.depositAmount}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
