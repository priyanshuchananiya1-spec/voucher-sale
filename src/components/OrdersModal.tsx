import React from 'react';
import { Order } from '../types';
import { Clock, CheckCircle2, Copy, X, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectOrder
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                Track Orders & Verifications
              </h3>
              <p className="text-[11px] text-slate-400">
                Live status of UPI UTR verifications & unlocked vouchers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs space-y-2">
              <Clock className="w-8 h-8 mx-auto text-slate-300" />
              <div className="font-bold text-slate-600">No Orders Yet</div>
              <p className="text-slate-400 max-w-xs mx-auto">
                Once you select a brand voucher and submit your 12-digit UTR, you can track verification status here.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const isWaiting = order.status === 'WAITING_FOR_VERIFICATION';
              return (
                <div
                  key={order.id}
                  onClick={() => {
                    onSelectOrder(order);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                    isWaiting
                      ? 'bg-amber-50/60 border-amber-300 hover:border-amber-400'
                      : 'bg-emerald-50/60 border-emerald-300 hover:border-emerald-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-slate-900">{order.brandName}</span>
                        <span className="text-xs font-bold text-slate-500">
                          {order.diamonds ? `${order.diamonds} 💎 (₹${order.denomination})` : `₹${order.denomination.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Ref: {order.orderNumber} • Paid ₹{order.finalAmount} via {order.paymentMethod}
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        isWaiting
                          ? 'bg-amber-200 text-amber-900 border border-amber-300 animate-pulse'
                          : 'bg-emerald-200 text-emerald-900 border border-emerald-300'
                      }`}
                    >
                      {isWaiting ? 'Verifying (2-5m)' : 'Voucher Ready'}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-600">
                      UTR: {order.utrNumber}
                    </span>
                    <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1 hover:underline">
                      <span>{isWaiting ? 'View Status' : 'View Code & PIN'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
