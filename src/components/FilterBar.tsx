import React from 'react';
import { BrandCategory } from '../types';
import { Search, Flame, Sparkles, Tag, Gem, X } from 'lucide-react';

export type QuickFilterType =
  | 'ALL'
  | 'RECOMMENDED'
  | 'SUPER_DEALS'
  | 'EVERYDAY_DEALS'
  | 'HIGH_TICKET';

interface FilterBarProps {
  selectedCategory: BrandCategory;
  onSelectCategory: (category: BrandCategory) => void;
  quickFilter: QuickFilterType;
  onSelectQuickFilter: (filter: QuickFilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFiltered: number;
}

const CATEGORIES: BrandCategory[] = [
  'All',
  'Quick Commerce',
  'Food & Dining',
  'E-Commerce',
  'Gaming & Apps',
  'Electronics',
  'Fashion & Apparel',
  'Entertainment & OTT',
  'Travel & Cabs',
  'Health & Beauty',
  'Jewelry & Luxury'
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  quickFilter,
  onSelectQuickFilter,
  searchQuery,
  onSearchChange,
  totalFiltered
}) => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col gap-3">
        {/* Row 1: Search & Quick Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 150+ brands (Free Fire, Blinkit, Zomato, Flipkart, Apple...)"
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Bar (Prompt Requirement) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs no-scrollbar">
            <button
              onClick={() => onSelectQuickFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                quickFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Brands
            </button>

            <button
              onClick={() => onSelectQuickFilter('RECOMMENDED')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                quickFilter === 'RECOMMENDED'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Recommended (8)</span>
            </button>

            <button
              onClick={() => onSelectQuickFilter('SUPER_DEALS')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                quickFilter === 'SUPER_DEALS'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-700 border border-rose-200/80 hover:bg-rose-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Super Deals (25-30% OFF)</span>
            </button>

            <button
              onClick={() => onSelectQuickFilter('EVERYDAY_DEALS')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                quickFilter === 'EVERYDAY_DEALS'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Everyday Deals (10-24% OFF)</span>
            </button>

            <button
              onClick={() => onSelectQuickFilter('HIGH_TICKET')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                quickFilter === 'HIGH_TICKET'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-800 border border-purple-200/80 hover:bg-purple-100'
              }`}
            >
              <Gem className="w-3.5 h-3.5" />
              <span>High Ticket (10k+)</span>
            </button>
          </div>
        </div>

        {/* Row 2: Category Pills & Brand Counter */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs no-scrollbar flex-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-800 border border-amber-300 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center text-xs text-slate-500 font-medium shrink-0">
            <span>Showing <strong className="text-slate-800">{totalFiltered}</strong> brands</span>
          </div>
        </div>
      </div>
    </div>
  );
};
