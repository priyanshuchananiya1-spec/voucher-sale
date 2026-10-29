import React, { useState } from 'react';
import { Brand, Review } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  Star,
  ShieldCheck,
  Search,
  ThumbsUp,
  X,
  MessageSquarePlus,
  Send,
  CheckCircle2,
  Receipt
} from 'lucide-react';

interface ReviewsModalProps {
  brand: Brand | null;
  reviews: Review[];
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (brandId: string, review: Review) => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  brand,
  reviews,
  isOpen,
  onClose,
  onAddReview
}) => {
  const [filterRating, setFilterRating] = useState<number | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWriteReview, setShowWriteReview] = useState(false);

  // New review form states
  const [authorName, setAuthorName] = useState('');
  const [city, setCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [comment, setComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!isOpen || !brand) return null;

  const filteredReviews = reviews.filter((r) => {
    const matchesRating = filterRating === 'ALL' || r.rating === filterRating;
    const matchesSearch =
      searchQuery === '' ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      brandId: brand.id,
      authorName: authorName.trim(),
      city: city.trim() || 'Mumbai, Maharashtra',
      rating: newRating,
      date: 'Just now',
      comment: comment.trim(),
      verifiedPurchase: true,
      voucherAmount: brand.denominations[0],
      helpfulCount: 1
    };

    onAddReview(brand.id, newRev);
    setFormSubmitted(true);
    setTimeout(() => {
      setShowWriteReview(false);
      setFormSubmitted(false);
      setAuthorName('');
      setCity('');
      setComment('');
      setNewRating(5);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <BrandLogo logoType={brand.logoType} name={brand.name} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg leading-tight">{brand.name}</h3>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full">
                  Verified Reviews
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-0.5">
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-white">{brand.rating}</span>
                </div>
                <span>•</span>
                <span className="font-semibold text-slate-200">
                  {brand.reviewCount} customer ratings
                </span>
                <span className="hidden sm:inline-block text-slate-400">• 100% Genuine</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rating Breakdown & Search Controls */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
              <button
                onClick={() => setFilterRating('ALL')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  filterRating === 'ALL'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                All ({reviews.length})
              </button>
              {[5, 4, 3].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setFilterRating(stars)}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-all ${
                    filterRating === stars
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </button>
              ))}
            </div>

            {/* Write a Review Button */}
            <button
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>{showWriteReview ? 'Hide Form' : 'Write a Review'}</span>
            </button>
          </div>

          {/* Search within reviews */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in reviews (e.g. instant, UTR, diamond, delivery, dinner)..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Write a Review Form Collapsible */}
        {showWriteReview && (
          <div className="p-4 bg-amber-50/50 border-b border-amber-200 animate-in fade-in duration-200 shrink-0">
            {formSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 py-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Thank you! Your verified review has been published.</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Add Your Experience</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-0.5 text-slate-300 hover:text-amber-400"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= newRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City (e.g. Pune, MH)"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <textarea
                  required
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details of code delivery speed, redemption ease, and discount..."
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWriteReview(false)}
                    className="px-3 py-1.5 rounded-xl text-xs text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching reviews found for your filter.
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2"
              >
                {/* Author Info & Rating */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{rev.authorName}</span>
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Verified Buyer</span>
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">{rev.city}</div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">{rev.date}</span>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {rev.comment}
                </p>

                {/* Attached Payment Proof & Redemption Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-[10px]">
                  <div className="flex items-center gap-1 text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    <Receipt className="w-3 h-3 text-emerald-600" />
                    <span>₹{rev.voucherAmount} Voucher</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    <ShieldCheck className="w-3 h-3 text-sky-600" />
                    <span>UPI Settlement: priyanshu-xy@fam</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-slate-400">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.helpfulCount} found helpful</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
