import React from 'react';
import { Brand } from '../types';
import { BrandLogo } from './BrandLogo';
import { Star, ShieldCheck, Zap, ArrowRight, Gem, AlertCircle } from 'lucide-react';

interface BrandCardProps {
  brand: Brand;
  onSelectBrand: (brand: Brand, denomination?: number) => void;
  onOpenReviews: (brand: Brand) => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  onSelectBrand,
  onOpenReviews
}) => {
  const isFFIndia = brand.id === 'free-fire-india';
  const hasDiamondTiers = Boolean(brand.diamondTiers && brand.diamondTiers.length > 0);

  const minPrice = hasDiamondTiers
    ? brand.diamondTiers![0].price
    : brand.denominations[0];

  const discountedMinPrice = hasDiamondTiers
    ? brand.diamondTiers![0].price
    : Math.round(minPrice * (1 - brand.discountPercentage / 100));

  const originalMinPrice = hasDiamondTiers
    ? brand.diamondTiers![0].originalPrice || 240
    : minPrice;

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between p-4 shadow-xs hover:shadow-lg hover:-translate-y-0.5 ${
        isFFIndia
          ? 'border-orange-300 ring-2 ring-orange-400/20 bg-gradient-to-b from-orange-50/20 via-white to-green-50/20'
          : hasDiamondTiers
          ? 'border-amber-300 ring-1 ring-amber-400/20 bg-gradient-to-b from-amber-50/15 via-white to-amber-50/15'
          : brand.isHighTicket
          ? 'border-slate-300 ring-1 ring-slate-900/10'
          : 'border-slate-200 hover:border-amber-300'
      }`}
    >
      {/* Top Tag & Discount Badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
            {brand.category}
          </span>
          {brand.specialBadge && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                isFFIndia
                  ? 'bg-orange-50 text-orange-700 border-orange-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              {brand.specialBadge}
            </span>
          )}
          {hasDiamondTiers && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <span>💎</span>
              <span>TOP-UP PACKS</span>
            </span>
          )}
          {brand.isHighTicket && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
              HIGH TICKET
            </span>
          )}
        </div>

        <div className="flex flex-col items-end">
          <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-rose-500 text-white shadow-xs tracking-tight">
            -{brand.discountPercentage}% OFF
          </span>
          <span className="text-[9px] text-slate-400 font-medium mt-0.5">Instant UPI</span>
        </div>
      </div>

      {/* Brand Logo & Name Header */}
      <div className="flex items-center gap-3 mb-2.5">
        <BrandLogo logoType={brand.logoType} name={brand.name} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-base leading-tight truncate group-hover:text-amber-600 transition-colors">
            {brand.name}
          </h3>
          <p className="text-xs text-slate-500 truncate mt-0.5">
            {brand.tagline}
          </p>
        </div>
      </div>

      {/* Game Specific Note (Free Fire MAX vs Free Fire India) */}
      {brand.gameSpecificNote && (
        <div className="mb-2 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300/80 text-[11px] font-bold text-amber-950 flex items-start gap-1.5 leading-snug shadow-2xs">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>{brand.gameSpecificNote}</span>
        </div>
      )}

      {/* Reviews Trigger */}
      <div className="flex items-center justify-between py-2 border-y border-slate-100 my-2 text-xs">
        <button
          onClick={() => onOpenReviews(brand)}
          className="flex items-center gap-1.5 text-slate-700 hover:text-amber-600 font-semibold cursor-pointer group/rev transition-colors"
          title={`Click to read ${brand.reviewCount} verified reviews for ${brand.name}`}
        >
          <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded-md border border-amber-200/60 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{brand.rating}</span>
          </div>
          <span className="underline decoration-slate-300 group-hover/rev:decoration-amber-500 text-slate-500">
            {brand.reviewCount} verified reviews
          </span>
        </button>

        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>In Stock</span>
        </span>
      </div>

      {/* Denominations selector preview */}
      <div className="my-2">
        <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center justify-between">
          <span>{hasDiamondTiers ? 'Select Diamond Pack' : 'Popular Denominations'}</span>
          <span className="text-slate-400 text-[10px]">
            {hasDiamondTiers ? '300💎 starting at ₹120' : `Min ₹${minPrice.toLocaleString('en-IN')}`}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {hasDiamondTiers ? (
            brand.diamondTiers!.map((tier) => (
              <button
                key={tier.diamonds}
                onClick={() => onSelectBrand(brand, tier.price)}
                className="px-2 py-1 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 hover:border-amber-400 border border-amber-300 text-amber-950 transition-colors cursor-pointer flex items-center gap-1"
                title={`${tier.diamonds} Diamonds for ₹${tier.price}`}
              >
                <span>💎</span>
                <span>{tier.diamonds}</span>
                <span className="text-[10px] text-amber-700 font-semibold">₹{tier.price}</span>
              </button>
            ))
          ) : (
            brand.denominations.slice(0, 4).map((denom) => {
              const priceWithDiscount = Math.round(denom * (1 - brand.discountPercentage / 100));
              return (
                <button
                  key={denom}
                  onClick={() => onSelectBrand(brand, denom)}
                  className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title={`Pay ₹${priceWithDiscount} for ₹${denom}`}
                >
                  ₹{denom.toLocaleString('en-IN')}
                </button>
              );
            })
          )}
          {!hasDiamondTiers && brand.denominations.length > 4 && (
            <span className="text-[11px] text-slate-400 font-medium px-1">
              +{brand.denominations.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Price breakdown & Buy Action */}
      <div className="mt-3 pt-2.5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">
            {hasDiamondTiers ? '300 Diamonds at' : 'Starting at'}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-900">
              ₹{discountedMinPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{originalMinPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <button
          onClick={() => onSelectBrand(brand)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-amber-600 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          {hasDiamondTiers ? (
            <>
              <Gem className="w-3.5 h-3.5 text-amber-400" />
              <span>Get Diamonds</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Buy Voucher</span>
            </>
          )}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
