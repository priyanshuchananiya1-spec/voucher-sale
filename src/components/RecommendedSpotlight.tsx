import React from 'react';
import { Brand } from '../types';
import { BrandLogo } from './BrandLogo';
import { Star, ShieldCheck, Flame, Zap } from 'lucide-react';

interface RecommendedSpotlightProps {
  brands: Brand[];
  onSelectBrand: (brand: Brand) => void;
  onOpenReviews: (brand: Brand) => void;
}

export const RecommendedSpotlight: React.FC<RecommendedSpotlightProps> = ({
  brands,
  onSelectBrand,
  onOpenReviews
}) => {
  // Exact 8 brands in specific order
  const orderedIds = [
    'free-fire-max',
    'free-fire-india',
    'flipkart',
    'apple',
    'blinkit',
    'amazon',
    'swiggy',
    'zomato'
  ];

  const spotlightBrands = orderedIds
    .map((id) => brands.find((b) => b.id === id))
    .filter((b): b is Brand => Boolean(b));

  return (
    <div className="bg-gradient-to-b from-amber-500/5 via-white to-slate-50 border-y border-amber-200/60 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-500/20">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Top Recommended Spotlights
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  8 Hot Brands
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Official verified Indian vouchers with instant UTR settlement and up to 29% flat savings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 font-semibold self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Instant Code & PIN post 2-5 min verification</span>
          </div>
        </div>

        {/* 8-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {spotlightBrands.map((brand, idx) => {
            const isFFIndia = brand.id === 'free-fire-india';
            const isFFMax = brand.id === 'free-fire-max';

            return (
              <div
                key={brand.id}
                className={`group relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between p-3 shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                  isFFIndia
                    ? 'border-orange-300 ring-2 ring-orange-400/20 bg-gradient-to-b from-orange-50/40 via-white to-green-50/30'
                    : isFFMax
                    ? 'border-amber-300 ring-1 ring-amber-400/30 bg-amber-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Tiranga Ribbon for Free Fire India */}
                {isFFIndia && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-[9px] font-black text-slate-900 px-2 py-0.5 rounded-full shadow-xs border border-orange-200 flex items-center gap-1 whitespace-nowrap">
                    <span>🇮🇳</span>
                    <span>TIRANGA SPECIAL</span>
                  </div>
                )}

                {/* Top Badge */}
                <div className="flex items-center justify-between w-full mb-2.5">
                  <span className="text-[10px] font-black tracking-wide text-slate-400">
                    #{idx + 1}
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-md bg-rose-50 text-rose-700 border border-rose-200/80">
                    -{brand.discountPercentage}%
                  </span>
                </div>

                {/* Logo & Name */}
                <div className="flex flex-col items-center text-center my-1">
                  <div className="mb-2 transition-transform duration-200 group-hover:scale-105">
                    <BrandLogo logoType={brand.logoType} name={brand.name} size="md" />
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    {brand.name}
                  </h3>
                  <div className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                    {brand.diamondTiers
                      ? `300 💎 for ₹${brand.diamondTiers[0].price}`
                      : `Starts ₹${brand.denominations[0].toLocaleString('en-IN')}`}
                  </div>
                  {brand.gameSpecificNote && (
                    <div className="mt-1 px-1.5 py-0.5 rounded-md bg-amber-100/90 border border-amber-300 text-[8.5px] font-bold text-amber-950 leading-tight line-clamp-1">
                      {brand.id === 'free-fire-max'
                        ? 'Sirf FF MAX me use hoga'
                        : 'Sirf FF India me use hoga'}
                    </div>
                  )}
                </div>

                {/* Rating & Reviews Trigger */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenReviews(brand);
                    }}
                    className="flex items-center gap-1 text-[10px] text-slate-600 hover:text-amber-600 transition-colors font-semibold"
                    title={`View ${brand.reviewCount} verified reviews for ${brand.name}`}
                  >
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{brand.rating}</span>
                    <span className="text-slate-400 underline decoration-slate-300">
                      ({brand.reviewCount})
                    </span>
                  </button>

                  {/* Buy Button */}
                  <button
                    onClick={() => onSelectBrand(brand)}
                    className="w-full py-1.5 px-2 rounded-xl text-[11px] font-bold text-white bg-slate-900 hover:bg-amber-600 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Get Card</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
