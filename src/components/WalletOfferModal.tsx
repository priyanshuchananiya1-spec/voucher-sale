import React, { useState, useEffect } from 'react';
import { Brand } from '../types';
import { BrandLogo } from './BrandLogo';
import { Wallet, QrCode, Sparkles, X, ShieldCheck, ArrowRight, Check, Gem } from 'lucide-react';

interface WalletOfferModalProps {
  brand: Brand | null;
  selectedDenomination?: number;
  walletBalance: number;
  isOpen: boolean;
  onClose: () => void;
  onProceedDirectUpi: (brand: Brand, denomination: number, finalAmount: number, savings: number) => void;
  onOpenDepositForSavings: (brand: Brand, denomination: number) => void;
  onPayWithWalletBalance: (brand: Brand, denomination: number, finalAmount: number, savings: number) => void;
}

export const WalletOfferModal: React.FC<WalletOfferModalProps> = ({
  brand,
  selectedDenomination,
  walletBalance,
  isOpen,
  onClose,
  onProceedDirectUpi,
  onOpenDepositForSavings,
  onPayWithWalletBalance
}) => {
  const [activeDenom, setActiveDenom] = useState<number>(1000);

  useEffect(() => {
    if (brand) {
      if (selectedDenomination && brand.denominations.includes(selectedDenomination)) {
        setActiveDenom(selectedDenomination);
      } else {
        setActiveDenom(brand.denominations[0]);
      }
    }
  }, [brand, selectedDenomination]);

  if (!isOpen || !brand) return null;

  const hasDiamondTiers = Boolean(brand.diamondTiers && brand.diamondTiers.length > 0);

  // Active Diamond Tier if applicable
  const activeDiamondTier = hasDiamondTiers
    ? brand.diamondTiers!.find((t) => t.price === activeDenom) || brand.diamondTiers![0]
    : null;

  // Calculation for Diamond Tier vs Standard Voucher
  let faceValue: number;
  let directUpiPrice: number;
  let standardDiscountAmount: number;
  let walletExtraDiscountAmount: number;
  let walletPrice: number;
  let totalWalletSavings: number;

  if (activeDiamondTier) {
    faceValue = activeDiamondTier.originalPrice || activeDiamondTier.price * 2;
    directUpiPrice = activeDiamondTier.price; // exact requested price: 120, 160, 340, 540
    standardDiscountAmount = faceValue - directUpiPrice;
    walletExtraDiscountAmount = Math.max(1, Math.round((directUpiPrice * 2) / 100));
    walletPrice = directUpiPrice - walletExtraDiscountAmount;
    totalWalletSavings = standardDiscountAmount + walletExtraDiscountAmount;
  } else {
    faceValue = activeDenom;
    const brandDiscountPct = brand.discountPercentage;
    standardDiscountAmount = Math.round((faceValue * brandDiscountPct) / 100);
    directUpiPrice = faceValue - standardDiscountAmount;
    walletExtraDiscountAmount = Math.round((faceValue * 2) / 100);
    walletPrice = directUpiPrice - walletExtraDiscountAmount;
    totalWalletSavings = standardDiscountAmount + walletExtraDiscountAmount;
  }

  const hasSufficientWallet = walletBalance >= walletPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Offer Highlight Strip */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-black/20 px-2 py-0.5 rounded text-amber-100">
                  Exclusive Reward Offer
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight mt-0.5">
                  Save More with Wallet Balance!
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hindi Requirement Prompt Text */}
          <div className="mt-3 bg-black/25 rounded-2xl p-3 border border-white/10">
            <p className="text-xs sm:text-sm font-bold text-amber-100 tracking-wide text-center">
              &quot;Wallet se purchase karne par extra 2% ka discount milega!&quot;
            </p>
            <p className="text-[11px] text-amber-200/80 text-center font-medium mt-0.5">
              Pay via your wallet balance to instantly unlock an additional 2% cash discount on top of {brand.discountPercentage}% brand discount.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Selected Brand Header */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <BrandLogo logoType={brand.logoType} name={brand.name} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-slate-900 text-sm truncate">{brand.name}</h4>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                  -{brand.discountPercentage}% OFF
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">{brand.tagline}</p>
            </div>
          </div>

          {/* Game Specific Note (Free Fire MAX vs Free Fire India) */}
          {brand.gameSpecificNote && (
            <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-2xl flex items-center gap-2 text-xs font-bold text-amber-950 shadow-2xs">
              <span className="text-sm">⚠️</span>
              <span className="leading-snug">{brand.gameSpecificNote}</span>
            </div>
          )}

          {/* Denomination / Diamond Pack Choice */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              {hasDiamondTiers ? 'Select Free Fire Diamonds Pack (💎)' : 'Select Voucher Denomination (₹)'}
            </label>

            {hasDiamondTiers ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {brand.diamondTiers!.map((tier) => {
                  const isSelected = activeDenom === tier.price;
                  return (
                    <button
                      key={tier.diamonds}
                      onClick={() => setActiveDenom(tier.price)}
                      className={`p-2.5 rounded-2xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 font-black text-sm">
                        <span>💎</span>
                        <span>{tier.diamonds}</span>
                      </div>
                      <div className={`text-xs font-extrabold mt-0.5 ${isSelected ? 'text-amber-100' : 'text-slate-900'}`}>
                        ₹{tier.price}
                      </div>
                      <div className={`text-[9px] line-through ${isSelected ? 'text-amber-200/70' : 'text-slate-400'}`}>
                        ₹{tier.originalPrice || tier.price * 2}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {brand.denominations.map((denom) => {
                  const isSelected = activeDenom === denom;
                  return (
                    <button
                      key={denom}
                      onClick={() => setActiveDenom(denom)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      ₹{denom.toLocaleString('en-IN')}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Side by side comparison: Direct UPI vs Wallet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Direct UPI Box */}
            <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-slate-500" />
                    Direct UPI
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">Standard</span>
                </div>
                <div className="text-lg font-black text-slate-900">
                  ₹{directUpiPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 space-y-0.5">
                  <div className="flex justify-between">
                    <span>{hasDiamondTiers ? 'Diamonds Pack:' : 'Face Value:'}</span>
                    <span className="font-medium">
                      {hasDiamondTiers ? `${activeDiamondTier?.diamonds} 💎` : `₹${activeDenom.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-rose-600">
                    <span>Discount Savings:</span>
                    <span>-₹{standardDiscountAmount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onProceedDirectUpi(brand, activeDenom, directUpiPrice, standardDiscountAmount)}
                className="mt-3 w-full py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              >
                Proceed with Direct UPI
              </button>
            </div>

            {/* Wallet Box with Extra 2% */}
            <div className="p-3.5 rounded-2xl border-2 border-amber-500 bg-gradient-to-b from-amber-50/60 to-white relative shadow-xs flex flex-col justify-between">
              <div className="absolute -top-2.5 right-3 bg-amber-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                EXTRA 2% CHEAPER
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <Wallet className="w-3.5 h-3.5 text-amber-600" />
                    Wallet Purchase
                  </span>
                  <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-1.5 rounded">
                    +2% OFF
                  </span>
                </div>
                <div className="text-lg font-black text-amber-700">
                  ₹{walletPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-slate-600 mt-1 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Direct UPI Price:</span>
                    <span className="line-through text-slate-400">₹{directUpiPrice}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Wallet Bonus (2%):</span>
                    <span>-₹{walletExtraDiscountAmount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 pt-0.5 border-t border-amber-200">
                    <span>Total Savings:</span>
                    <span>₹{totalWalletSavings}</span>
                  </div>
                </div>
              </div>

              {hasSufficientWallet ? (
                <button
                  onClick={() => onPayWithWalletBalance(brand, activeDenom, walletPrice, totalWalletSavings)}
                  className="mt-3 w-full py-2 px-3 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Pay ₹{walletPrice} from Wallet</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenDepositForSavings(brand, activeDenom)}
                  className="mt-3 w-full py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Deposit & Save Extra 2%</span>
                </button>
              )}
            </div>
          </div>

          {/* Current balance indicator */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <span>Your Current Wallet Balance:</span>
            <span className="font-bold text-slate-900">₹{walletBalance.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
