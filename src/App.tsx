import React, { useState, useEffect, useMemo } from 'react';
import { Brand, Order, RefundClaim, Review, UserSession, BrandCategory } from './types';
import { BRANDS_DATA } from './data/brandsData';
import { SAMPLE_REVIEWS, getReviewsForBrand } from './data/reviewsData';
import { Header } from './components/Header';
import { RecommendedSpotlight } from './components/RecommendedSpotlight';
import { FilterBar, QuickFilterType } from './components/FilterBar';
import { BrandCard } from './components/BrandCard';
import { WalletOfferModal } from './components/WalletOfferModal';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { PendingVerificationModal } from './components/PendingVerificationModal';
import { DepositModal } from './components/DepositModal';
import { RefundModal } from './components/RefundModal';
import { LoginModal } from './components/LoginModal';
import { ReviewsModal } from './components/ReviewsModal';
import { OrdersModal } from './components/OrdersModal';
import { RbiWatermark } from './components/RbiWatermark';
import { ToastContainer, ToastMessage } from './components/Toast';
import {
  ShieldCheck,
  Zap,
  Flame,
  Wallet,
  Clock,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Gift
} from 'lucide-react';

export default function App() {
  // --- Persistent State in LocalStorage ---
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem('vb_wallet_balance');
    return saved !== null ? Number(saved) : 0;
  });

  const [userSession, setUserSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem('vb_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      email: 'p7400230@gmail.com',
      displayName: 'Priyanshu',
      avatarLetter: 'P',
      isLoggedIn: false,
      loginTimestamp: 0
    };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('vb_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  const [refundClaims, setRefundClaims] = useState<RefundClaim[]>(() => {
    const saved = localStorage.getItem('vb_refund_claims');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  const [customReviews, setCustomReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('vb_custom_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {};
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('vb_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('vb_user_session', JSON.stringify(userSession));
  }, [userSession]);

  useEffect(() => {
    localStorage.setItem('vb_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('vb_refund_claims', JSON.stringify(refundClaims));
  }, [refundClaims]);

  useEffect(() => {
    localStorage.setItem('vb_custom_reviews', JSON.stringify(customReviews));
  }, [customReviews]);

  // --- Filtering & Search State ---
  const [selectedCategory, setSelectedCategory] = useState<BrandCategory>('All');
  const [quickFilter, setQuickFilter] = useState<QuickFilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // --- Active Modals State ---
  const [isWalletOfferOpen, setIsWalletOfferOpen] = useState(false);
  const [activeBrandForPurchase, setActiveBrandForPurchase] = useState<Brand | null>(null);
  const [selectedDenomForPurchase, setSelectedDenomForPurchase] = useState<number | undefined>(undefined);

  const [isUpiPaymentOpen, setIsUpiPaymentOpen] = useState(false);
  const [activeOrderContext, setActiveOrderContext] = useState<{
    brand: Brand;
    denomination: number;
    finalAmount: number;
    savings: number;
  } | null>(null);

  const [isPendingVerificationOpen, setIsPendingVerificationOpen] = useState(false);
  const [currentOrderInVerification, setCurrentOrderInVerification] = useState<Order | null>(null);

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [targetBrandForDeposit, setTargetBrandForDeposit] = useState<{ name: string; denom: number } | null>(null);

  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [refundPrefill, setRefundPrefill] = useState<{
    amount?: number;
    utr?: string;
    errorCode?: string;
  } | null>(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [activeBrandForReviews, setActiveBrandForReviews] = useState<Brand | null>(null);

  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // --- Toast System ---
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Filter Brands Logic ---
  const filteredBrands = useMemo(() => {
    return BRANDS_DATA.filter((brand) => {
      // Category match
      if (selectedCategory !== 'All' && brand.category !== selectedCategory) {
        return false;
      }

      // Quick filter match
      if (quickFilter === 'RECOMMENDED' && !brand.isRecommended) {
        return false;
      }
      if (quickFilter === 'SUPER_DEALS' && brand.discountPercentage < 25) {
        return false;
      }
      if (quickFilter === 'EVERYDAY_DEALS' && (brand.discountPercentage < 10 || brand.discountPercentage > 24)) {
        return false;
      }
      if (quickFilter === 'HIGH_TICKET' && !brand.isHighTicket && brand.denominations[0] < 5000) {
        return false;
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = brand.name.toLowerCase().includes(query);
        const matchesCategory = brand.category.toLowerCase().includes(query);
        const matchesTagline = brand.tagline.toLowerCase().includes(query);
        const matchesDenoms = brand.denominations.some((d) => d.toString().includes(query));
        return matchesName || matchesCategory || matchesTagline || matchesDenoms;
      }

      return true;
    });
  }, [selectedCategory, quickFilter, searchQuery]);

  // Count of pending orders
  const pendingOrdersCount = orders.filter((o) => o.status === 'WAITING_FOR_VERIFICATION').length;

  // --- Purchase Flow Handlers ---
  const handleInitiateBuy = (brand: Brand, denomination?: number) => {
    setActiveBrandForPurchase(brand);
    setSelectedDenomForPurchase(denomination);
    setIsWalletOfferOpen(true);
  };

  const handleProceedDirectUpi = (
    brand: Brand,
    denomination: number,
    finalAmount: number,
    savings: number
  ) => {
    setIsWalletOfferOpen(false);
    setActiveOrderContext({ brand, denomination, finalAmount, savings });
    setIsUpiPaymentOpen(true);
  };

  const handleOpenDepositForSavings = (brand: Brand, denomination: number) => {
    setIsWalletOfferOpen(false);
    setTargetBrandForDeposit({ name: brand.name, denom: denomination });
    setIsDepositOpen(true);
  };

  const handlePayWithWalletBalance = (
    brand: Brand,
    denomination: number,
    finalAmount: number,
    savings: number
  ) => {
    if (walletBalance < finalAmount) {
      showToast('error', 'Insufficient wallet balance for this voucher.');
      return;
    }

    // Deduct from wallet balance
    setWalletBalance((prev) => prev - finalAmount);
    setIsWalletOfferOpen(false);

    // Create verified order immediately since wallet is already paid!
    const generatedVoucherCode = `${brand.name.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();

    const diamondTier = brand.diamondTiers?.find((t) => t.price === denomination);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `VS-WAL-${Math.floor(100000 + Math.random() * 900000)}`,
      brandId: brand.id,
      brandName: brand.name,
      denomination,
      diamonds: diamondTier?.diamonds,
      discountPercentage: brand.discountPercentage + 2,
      finalAmount,
      savings,
      paymentMethod: 'WALLET',
      upiId: 'WALLET_DEBIT',
      utrNumber: `WAL-${Date.now().toString().slice(-8)}`,
      status: 'APPROVED',
      createdAt: Date.now(),
      estimatedVerificationTime: Date.now(),
      voucherCode: generatedVoucherCode,
      voucherPin: generatedPin,
      expiryDate: 'Oct 2027'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrderInVerification(newOrder);
    setIsPendingVerificationOpen(true);
    showToast('success', `₹${finalAmount} paid from Wallet. Extra 2% discount applied!`, 'Voucher Unlocked');
  };

  // Customer enters 12-digit UTR in Direct UPI
  const handleSubmitUtr = (utr: string) => {
    if (!activeOrderContext) return;
    const { brand, denomination, finalAmount, savings } = activeOrderContext;

    setIsUpiPaymentOpen(false);

    // Payment Verification Rule: DO NOT immediately unlock. Set status to WAITING_FOR_VERIFICATION.
    const generatedVoucherCode = `${brand.name.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();

    const diamondTier = brand.diamondTiers?.find((t) => t.price === denomination);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `VS-UPI-${Math.floor(100000 + Math.random() * 900000)}`,
      brandId: brand.id,
      brandName: brand.name,
      denomination,
      diamonds: diamondTier?.diamonds,
      discountPercentage: brand.discountPercentage,
      finalAmount,
      savings,
      paymentMethod: 'UPI',
      upiId: 'priyanshu-xy@fam',
      utrNumber: utr,
      status: 'WAITING_FOR_VERIFICATION',
      createdAt: Date.now(),
      estimatedVerificationTime: Date.now() + 4 * 60 * 1000,
      voucherCode: generatedVoucherCode,
      voucherPin: generatedPin,
      expiryDate: 'Oct 2027'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrderInVerification(newOrder);
    setIsPendingVerificationOpen(true);

    showToast(
      'info',
      'UTR received. Please wait 2 to 5 minutes while NPCI reconciles payment.',
      'Verification Initiated'
    );
  };

  // Demo simulation to approve order
  const handleSimulateApproval = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, status: 'APPROVED' };
        }
        return ord;
      })
    );
    if (currentOrderInVerification?.id === orderId) {
      setCurrentOrderInVerification((prev) => (prev ? { ...prev, status: 'APPROVED' } : null));
    }
    showToast('success', 'Banking confirmation verified. Voucher code and PIN unlocked!', 'Approval Complete');
  };

  // --- Reviews Handlers ---
  const handleOpenReviews = (brand: Brand) => {
    setActiveBrandForReviews(brand);
    setIsReviewsOpen(true);
  };

  const handleAddReview = (brandId: string, newReview: Review) => {
    setCustomReviews((prev) => {
      const existing = prev[brandId] || [];
      return {
        ...prev,
        [brandId]: [newReview, ...existing]
      };
    });
    showToast('success', 'Your review and payment proof have been published!', 'Review Posted');
  };

  const activeBrandReviewsList = useMemo(() => {
    if (!activeBrandForReviews) return [];
    const baseReviews = getReviewsForBrand(
      activeBrandForReviews.id,
      activeBrandForReviews.name,
      activeBrandForReviews.category
    );
    const added = customReviews[activeBrandForReviews.id] || [];
    return [...added, ...baseReviews];
  }, [activeBrandForReviews, customReviews]);

  // --- Refund Handlers ---
  const handleTriggerRefundFromDeposit = (data: {
    amount: number;
    utr: string;
    errorCode: string;
  }) => {
    setRefundPrefill(data);
    setIsRefundOpen(true);
  };

  const handleSaveClaim = (claim: RefundClaim) => {
    setRefundClaims((prev) => [claim, ...prev]);
    showToast(
      'info',
      `Claim ${claim.ticketId} dispatched to priyanshu08221@gmail.com`,
      'Claim Dispatched'
    );
  };

  // --- User Session Handlers ---
  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    showToast('success', `Welcome! Signed in as ${session.email}`, 'Gmail Login Successful');
  };

  const handleLogout = () => {
    setUserSession({
      email: 'p7400230@gmail.com',
      displayName: 'Priyanshu',
      avatarLetter: 'P',
      isLoggedIn: false,
      loginTimestamp: 0
    });
    showToast('info', 'You have been safely logged out of Gmail.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Header */}
      <Header
        walletBalance={walletBalance}
        userSession={userSession}
        pendingOrdersCount={pendingOrdersCount}
        onOpenDeposit={() => {
          setTargetBrandForDeposit(null);
          setIsDepositOpen(true);
        }}
        onOpenRefund={() => {
          setRefundPrefill(null);
          setIsRefundOpen(true);
        }}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {/* Top 8 Recommended Spotlight Strip */}
        <RecommendedSpotlight
          brands={BRANDS_DATA}
          onSelectBrand={handleInitiateBuy}
          onOpenReviews={handleOpenReviews}
        />

        {/* Quick Filter Bar + Categories + Search */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          quickFilter={quickFilter}
          onSelectQuickFilter={setQuickFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalFiltered={filteredBrands.length}
        />

        {/* Storefront Hero / Value Proposition Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 w-full">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-700/60">
            {/* Background glowing accents */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>150+ Verified Indian Digital Vouchers</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Save 10% to 30% Flat on Every Indian Brand Gift Card
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Instant delivery of PINs and codes. Direct UPI payments to merchant{' '}
                <strong className="text-amber-300 font-mono">priyanshu-xy@fam</strong> with NPCI 2-5 min verification. Plus extra 2% discount with wallet balance!
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <button
                onClick={() => {
                  setTargetBrandForDeposit(null);
                  setIsDepositOpen(true);
                }}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Wallet className="w-4 h-4 text-amber-100" />
                <span>Deposit & Get Extra 2% OFF</span>
              </button>

              <button
                onClick={() => {
                  setRefundPrefill(null);
                  setIsRefundOpen(true);
                }}
                className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/15 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Deposit Issue? File Refund Claim</span>
              </button>
            </div>
          </div>
        </div>

        {/* Brand Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
          {filteredBrands.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8 space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No brands found</h3>
              <p className="text-xs text-slate-500">
                No gift cards match your filter &quot;{searchQuery}&quot;. Try clearing filters to view all 150+ brands.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setQuickFilter('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBrands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  onSelectBrand={handleInitiateBuy}
                  onOpenReviews={handleOpenReviews}
                />
              ))}
            </div>
          )}
        </div>

        {/* RBI Certified Watermark at bottom center */}
        <RbiWatermark />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">Voucher Sale</span>
            <span>•</span>
            <span>150+ Authentic Indian Digital Vouchers</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Support: priyanshu08221@gmail.com • Merchant UPI: priyanshu-xy@fam
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}

      {/* 1. Wallet Offer Modal (Extra 2% prompt) */}
      <WalletOfferModal
        brand={activeBrandForPurchase}
        selectedDenomination={selectedDenomForPurchase}
        walletBalance={walletBalance}
        isOpen={isWalletOfferOpen}
        onClose={() => setIsWalletOfferOpen(false)}
        onProceedDirectUpi={handleProceedDirectUpi}
        onOpenDepositForSavings={handleOpenDepositForSavings}
        onPayWithWalletBalance={handlePayWithWalletBalance}
      />

      {/* 2. Direct UPI Payment Modal */}
      {activeOrderContext && (
        <UpiPaymentModal
          isOpen={isUpiPaymentOpen}
          onClose={() => setIsUpiPaymentOpen(false)}
          brand={activeOrderContext.brand}
          denomination={activeOrderContext.denomination}
          finalAmount={activeOrderContext.finalAmount}
          savings={activeOrderContext.savings}
          onSubmitUtr={handleSubmitUtr}
        />
      )}

      {/* 3. Pending Verification Modal (Wait for verification 2 to 5 mins) */}
      <PendingVerificationModal
        order={currentOrderInVerification}
        isOpen={isPendingVerificationOpen}
        onClose={() => setIsPendingVerificationOpen(false)}
        onSimulateApproval={handleSimulateApproval}
      />

      {/* 4. Deposit Modal (triggers ERR_NPCI_SETTLEMENT_TIMEOUT_504) */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onOpenRefundClaim={handleTriggerRefundFromDeposit}
        targetBrandForDeposit={targetBrandForDeposit}
      />

      {/* 5. Refund Claim Modal (mailto:priyanshu08221@gmail.com) */}
      <RefundModal
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
        prefillData={refundPrefill}
        onSaveClaim={handleSaveClaim}
        savedClaims={refundClaims}
      />

      {/* 6. Mobile + OTP Login Modal (linked to p7400230@gmail.com) */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 7. Customer Reviews Modal */}
      <ReviewsModal
        brand={activeBrandForReviews}
        reviews={activeBrandReviewsList}
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        onAddReview={handleAddReview}
      />

      {/* 8. Orders Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onSelectOrder={(order) => {
          setCurrentOrderInVerification(order);
          setIsPendingVerificationOpen(true);
        }}
      />
    </div>
  );
}
