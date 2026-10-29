export type BrandCategory =
  | 'All'
  | 'Quick Commerce'
  | 'Food & Dining'
  | 'E-Commerce'
  | 'Gaming & Apps'
  | 'Electronics'
  | 'Fashion & Apparel'
  | 'Entertainment & OTT'
  | 'Travel & Cabs'
  | 'Health & Beauty'
  | 'Jewelry & Luxury';

export interface DiamondTier {
  diamonds: number;
  price: number;
  originalPrice?: number;
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  category: BrandCategory;
  discountPercentage: number; // strictly 10% to 30%
  denominations: number[]; // e.g. [300, 500, 1000, 2000, 5000] or [5000, 10000, 25000, 50000]
  diamondTiers?: DiamondTier[]; // e.g. 300->120, 500->160, 1000->340, 2000->540
  isRecommended: boolean; // Top 8 recommended spotlight
  isHighTicket?: boolean;
  reviewCount: number; // 200-400 for top/major, 50-150 for minor
  rating: number; // 4.5 to 4.9
  accentColor: string;
  logoType: string;
  terms: string;
  deliveryTime: string;
  inStock: boolean;
  specialBadge?: string;
  gameSpecificNote?: string;
}

export interface Review {
  id: string;
  brandId: string;
  authorName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  voucherAmount: number;
  helpfulCount: number;
}

export type OrderStatus = 'WAITING_FOR_VERIFICATION' | 'APPROVED' | 'REJECTED';

export interface Order {
  id: string;
  orderNumber: string;
  brandId: string;
  brandName: string;
  denomination: number;
  diamonds?: number;
  discountPercentage: number;
  finalAmount: number;
  savings: number;
  paymentMethod: 'UPI' | 'WALLET';
  upiId: string;
  utrNumber: string;
  status: OrderStatus;
  createdAt: number;
  estimatedVerificationTime: number; // timestamp
  voucherCode?: string;
  voucherPin?: string;
  expiryDate?: string;
}

export interface RefundClaim {
  id: string;
  ticketId: string;
  fullName: string;
  mobileNumber: string;
  customerUpiId: string;
  depositAmount: number;
  utrNumber: string;
  errorCode: string;
  reason: string;
  createdAt: number;
  status: 'UNDER_REVIEW' | 'REFUNDED' | 'REJECTED';
}

export interface UserSession {
  email: string;
  displayName: string;
  avatarLetter: string;
  isLoggedIn: boolean;
  loginTimestamp: number;
}

