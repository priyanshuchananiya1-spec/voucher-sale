import { Review } from '../types';

export const SAMPLE_REVIEWS: Record<string, Review[]> = {
  'free-fire-india': [
    {
      id: 'rev-ffi-1',
      brandId: 'free-fire-india',
      authorName: 'Aarav Deshmukh',
      city: 'Pune, Maharashtra',
      rating: 5,
      date: '2 hours ago',
      comment: 'Official Indian server diamonds credited in my UID within 3 minutes of entering UTR! Got 29% flat discount. Genuine code.',
      verifiedPurchase: true,
      voucherAmount: 1200,
      helpfulCount: 42
    },
    {
      id: 'rev-ffi-2',
      brandId: 'free-fire-india',
      authorName: 'Rohan Sharma',
      city: 'Jaipur, Rajasthan',
      rating: 5,
      date: 'Yesterday',
      comment: 'Tiranga special edition diamond voucher worked instantly. Redeemed on Indian server without any VPN hassle. Super reliable!',
      verifiedPurchase: true,
      voucherAmount: 2500,
      helpfulCount: 38
    },
    {
      id: 'rev-ffi-3',
      brandId: 'free-fire-india',
      authorName: 'Karthik Reddy',
      city: 'Hyderabad, Telangana',
      rating: 5,
      date: '2 days ago',
      comment: 'Paid through PhonePe UPI to priyanshu-xy@fam, waited 3 mins for verification, code received on screen. Got the Booyah pass!',
      verifiedPurchase: true,
      voucherAmount: 800,
      helpfulCount: 19
    },
    {
      id: 'rev-ffi-4',
      brandId: 'free-fire-india',
      authorName: 'Vikas Patel',
      city: 'Ahmedabad, Gujarat',
      rating: 4,
      date: '3 days ago',
      comment: 'Took around 4 minutes for UTR approval, but diamonds are 100% genuine. Better than paying full price inside game.',
      verifiedPurchase: true,
      voucherAmount: 500,
      helpfulCount: 14
    }
  ],
  'free-fire-max': [
    {
      id: 'rev-ffm-1',
      brandId: 'free-fire-max',
      authorName: 'Ayush Verma',
      city: 'Lucknow, Uttar Pradesh',
      rating: 5,
      date: '1 hour ago',
      comment: 'Best discount for Free Fire MAX! Saved 27% on 3200 Diamonds pack. Code redeemed cleanly on Garena site.',
      verifiedPurchase: true,
      voucherAmount: 1800,
      helpfulCount: 56
    },
    {
      id: 'rev-ffm-2',
      brandId: 'free-fire-max',
      authorName: 'Nikhil Kumar',
      city: 'Patna, Bihar',
      rating: 5,
      date: '1 day ago',
      comment: 'Instant PIN code after UTR check. Highly recommended for all FF MAX squad players.',
      verifiedPurchase: true,
      voucherAmount: 1000,
      helpfulCount: 31
    },
    {
      id: 'rev-ffm-3',
      brandId: 'free-fire-max',
      authorName: 'Tanmay Roy',
      city: 'Kolkata, West Bengal',
      rating: 5,
      date: '3 days ago',
      comment: 'Saved around ₹500 on big diamond bundle. Garena accepted the code immediately.',
      verifiedPurchase: true,
      voucherAmount: 3200,
      helpfulCount: 24
    }
  ],
  'blinkit': [
    {
      id: 'rev-blk-1',
      brandId: 'blinkit',
      authorName: 'Sneha Kapur',
      city: 'Gurugram, Haryana',
      rating: 5,
      date: 'Today',
      comment: 'Saved 22% on daily groceries! Added voucher code directly in Blinkit wallet. Delivered in 11 minutes as usual.',
      verifiedPurchase: true,
      voucherAmount: 1000,
      helpfulCount: 29
    },
    {
      id: 'rev-blk-2',
      brandId: 'blinkit',
      authorName: 'Ankit Gupta',
      city: 'Noida, UP',
      rating: 5,
      date: '2 days ago',
      comment: 'Seamless UPI payment to priyanshu-xy@fam. 12-digit UTR verification took 2 minutes. Great saving.',
      verifiedPurchase: true,
      voucherAmount: 500,
      helpfulCount: 18
    }
  ],
  'zomato': [
    {
      id: 'rev-zom-1',
      brandId: 'zomato',
      authorName: 'Priya Iyer',
      city: 'Bengaluru, Karnataka',
      rating: 5,
      date: 'Yesterday',
      comment: '26% off on Zomato is insane! Ordered dinner for whole family and saved almost ₹520 on a ₹2,000 order.',
      verifiedPurchase: true,
      voucherAmount: 2000,
      helpfulCount: 64
    },
    {
      id: 'rev-zom-2',
      brandId: 'zomato',
      authorName: 'Devansh Nair',
      city: 'Kochi, Kerala',
      rating: 5,
      date: '3 days ago',
      comment: 'Applied during weekend dining out at high-end restaurant. Settled bill with voucher instantly.',
      verifiedPurchase: true,
      voucherAmount: 1000,
      helpfulCount: 22
    }
  ],
  'swiggy': [
    {
      id: 'rev-swg-1',
      brandId: 'swiggy',
      authorName: 'Megha Sen',
      city: 'Mumbai, Maharashtra',
      rating: 5,
      date: 'Today',
      comment: 'Swiggy Money balance updated immediately after voucher claim. Works on Instamart & Gourmet too!',
      verifiedPurchase: true,
      voucherAmount: 1000,
      helpfulCount: 45
    },
    {
      id: 'rev-swg-2',
      brandId: 'swiggy',
      authorName: 'Harsh Joshi',
      city: 'Indore, MP',
      rating: 4,
      date: '2 days ago',
      comment: 'Got 24% discount. Genuine card with 1 year validity. Will buy again for office lunches.',
      verifiedPurchase: true,
      voucherAmount: 500,
      helpfulCount: 17
    }
  ],
  'flipkart': [
    {
      id: 'rev-flp-1',
      brandId: 'flipkart',
      authorName: 'Rajesh Subramanian',
      city: 'Chennai, Tamil Nadu',
      rating: 5,
      date: '3 days ago',
      comment: 'Bought ₹10,000 Flipkart voucher for smartphone purchase. Saved ₹1,800 flat! Code was delivered securely.',
      verifiedPurchase: true,
      voucherAmount: 10000,
      helpfulCount: 88
    },
    {
      id: 'rev-flp-2',
      brandId: 'flipkart',
      authorName: 'Sunil Mathur',
      city: 'Chandigarh',
      rating: 5,
      date: '4 days ago',
      comment: 'Instant 16-digit card number and 6-digit PIN. Stacked easily during Big Billion Day sale.',
      verifiedPurchase: true,
      voucherAmount: 5000,
      helpfulCount: 52
    }
  ],
  'amazon': [
    {
      id: 'rev-amz-1',
      brandId: 'amazon',
      authorName: 'Aditi Chawla',
      city: 'New Delhi',
      rating: 5,
      date: 'Yesterday',
      comment: 'Amazon Pay balance added without any hassle. Saved 16% on electricity bills and shopping.',
      verifiedPurchase: true,
      voucherAmount: 5000,
      helpfulCount: 71
    },
    {
      id: 'rev-amz-2',
      brandId: 'amazon',
      authorName: 'Deepak Rao',
      city: 'Hyderabad',
      rating: 5,
      date: '2 days ago',
      comment: 'Genuine Amazon gift card with 1 year validity. Very professional verification process.',
      verifiedPurchase: true,
      voucherAmount: 2000,
      helpfulCount: 39
    }
  ],
  'apple': [
    {
      id: 'rev-apl-1',
      brandId: 'apple',
      authorName: 'Siddharth Trivedi',
      city: 'Mumbai, Maharashtra',
      rating: 5,
      date: '4 days ago',
      comment: 'Purchased ₹20,000 Apple Store code for MacBook purchase. Saved ₹2,400 with the 12% discount. High-ticket safety verified.',
      verifiedPurchase: true,
      voucherAmount: 20000,
      helpfulCount: 94
    },
    {
      id: 'rev-apl-2',
      brandId: 'apple',
      authorName: 'Ritu Menon',
      city: 'Bengaluru',
      rating: 5,
      date: 'Last week',
      comment: 'Redeemed in Apple App Store for iCloud+ and Final Cut Pro. Prompt UTR confirmation.',
      verifiedPurchase: true,
      voucherAmount: 10000,
      helpfulCount: 61
    }
  ]
};

// Generates fallback realistic reviews if specific ones aren't listed
export function getReviewsForBrand(brandId: string, brandName: string, category: string): Review[] {
  if (SAMPLE_REVIEWS[brandId]) {
    return SAMPLE_REVIEWS[brandId];
  }
  return [
    {
      id: `rev-${brandId}-1`,
      brandId,
      authorName: 'Gaurav K.',
      city: 'Mumbai, MH',
      rating: 5,
      date: '1 day ago',
      comment: `Got the ${brandName} voucher at great discount. Verified UTR and claimed immediately on official app.`,
      verifiedPurchase: true,
      voucherAmount: 1000,
      helpfulCount: 16
    },
    {
      id: `rev-${brandId}-2`,
      brandId,
      authorName: 'Pooja Bhatt',
      city: 'Delhi NCR',
      rating: 5,
      date: '3 days ago',
      comment: `100% genuine code for ${brandName}. Verified under RBI settlement norms. Highly satisfied!`,
      verifiedPurchase: true,
      voucherAmount: 500,
      helpfulCount: 12
    },
    {
      id: `rev-${brandId}-3`,
      brandId,
      authorName: 'Arjun Das',
      city: 'Kolkata, WB',
      rating: 4,
      date: 'Last week',
      comment: `Smooth experience. UTR verified within 3 minutes and received working voucher PIN.`,
      verifiedPurchase: true,
      voucherAmount: 2000,
      helpfulCount: 9
    }
  ];
}
