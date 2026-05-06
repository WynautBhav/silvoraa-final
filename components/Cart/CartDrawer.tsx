'use client';
import React, { useState } from 'react';
import { useCart } from '@/components/Cart/CartContext';
import { X, Minus, Plus, Trash2, TicketPercent, Loader2 } from 'lucide-react';
import { Button } from '../UI/Button';

const CouponInput = () => {
  const { applyCoupon } = useCart();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleApply = async () => {
    if (!code) return;
    setLoading(true);
    setMsg(null);
    const success = await applyCoupon(code);
    if (success) {
      setMsg({ type: 'success', text: 'Coupon applied!' });
      setCode('');
    } else {
      setMsg({ type: 'error', text: 'Invalid code' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Discount code"
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-silvoraa-gold uppercase"
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
        />
        <button
          onClick={handleApply}
          disabled={loading || !code}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
        </button>
      </div>
      {msg && (
        <p className={`text-xs ${msg.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
          {msg.text}
        </p>
      )}
    </div>
  );
};

export const CartDrawer: React.FC = () => {
  const { items, isOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-serif text-2xl">Shopping Bag ({items.length})</h2>
          <button onClick={toggleCart} className="text-gray-400 hover:text-black" aria-label="Close cart">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-silvoraa-warmGray">
              <p className="mb-4">Your bag is empty.</p>
              <Button variant="secondary" onClick={toggleCart}>Continue Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="w-20 h-20 bg-gray-50 flex-shrink-0">
                  <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg leading-tight mb-1">{item.product.title}</h3>
                    <p className="text-xs text-silvoraa-warmGray uppercase">{item.product.stone}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-gray-300 hover:text-red-500 self-start"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-silvoraa-softWhite">
            {/* Discount Code Input */}
            <div className="flex justify-between mb-2 text-lg font-serif">
              <span>Subtotal</span>
              <span>₹{useCart().subtotal.toFixed(2)}</span>
            </div>

            {useCart().appliedCoupon ? (
              <div className="flex items-center justify-between text-sm text-green-600 mb-4 bg-green-50 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <TicketPercent size={14} />
                  <span>Code <b>{useCart().appliedCoupon?.code}</b> applied</span>
                </div>
                <button onClick={useCart().removeCoupon} className="text-xs hover:underline">Remove</button>
              </div>
            ) : (
              <div className="mb-4">
                <CouponInput />
              </div>
            )}

            {useCart().discountAmount > 0 && (
              <div className="flex justify-between mb-2 text-sm text-green-600">
                <span>Discount</span>
                <span>-₹{useCart().discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between mb-4 text-lg font-serif font-bold text-gray-900 border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>₹{useCart().cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-silvoraa-warmGray mb-6 text-center">Shipping & taxes calculated at checkout.</p>
            <Button className="w-full">Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
};