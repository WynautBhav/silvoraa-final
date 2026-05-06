"use client";
import React, { useState, useEffect } from 'react';

import { useCart } from '@/components/Cart/CartContext';
import { useAuth } from '@/components/Auth/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ShieldCheck, Truck, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import * as orderService from '@/services/orderService';
import { trackBeginCheckout, trackPurchase, GAItem } from '@/hooks/useAnalytics';

const CheckoutPage : React.FC = () => {
    const { items, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    // Fire begin_checkout when checkout page loads
    useEffect(() => {
        if (items.length > 0) {
            const gaItems: GAItem[] = items.map(item => ({
                item_id: item.product.id,
                item_name: item.product.title,
                price: item.product.price,
                item_category: item.product.type,
                quantity: item.quantity,
            }));
            trackBeginCheckout(cartTotal, gaItems);
        }
    }, []);

    const shipping = 0;
    const tax = cartTotal * 0.18;
    const total = cartTotal + tax + shipping;

    const handlePayment = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            // Prepare order items
            const orderItems = items.map(item => ({
                product_id: item.product.id,
                product_title: item.product.title,
                product_image: item.product.image,
                product_price: item.product.price,
                quantity: item.quantity,
            }));

            // Prepare shipping address
            const shippingAddress = {
                full_name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email || user?.email || '',
                phone: formData.phone,
                street: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
                country: 'India',
            };

            // Create order in Supabase
            if (isAuthenticated && user) {
                const order: any = await orderService.createOrder(
                    user.id,
                    orderItems,
                    shippingAddress,
                    'card',
                    cartTotal,
                    tax,
                    shipping
                );


                // Fire purchase event
                const transactionId = order?.id || `txn_${Date.now()}`;
                const gaItems: GAItem[] = items.map(item => ({
                    item_id: item.product.id,
                    item_name: item.product.title,
                    price: item.product.price,
                    item_category: item.product.type,
                    quantity: item.quantity,
                }));
                trackPurchase(transactionId, total, gaItems);

                // Update order status to processing (simulating payment success)
                await orderService.updateOrderStatus(order.id, 'confirmed');
            } else {
                // Fire purchase event for guest checkout
                const transactionId = `guest_${Date.now()}`;
                const gaItems: GAItem[] = items.map(item => ({
                    item_id: item.product.id,
                    item_name: item.product.title,
                    price: item.product.price,
                    item_category: item.product.type,
                    quantity: item.quantity,
                }));
                trackPurchase(transactionId, total, gaItems);
            }

            // Clear cart and redirect
            clearCart();
            router.push('/account');
        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(err.message || 'Failed to process order. Please try again.');
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-gray-300" />
                </div>
                <h1 className="text-2xl font-display text-silvoraa-black mb-2">Your Bag is Empty</h1>
                <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added any treasures yet.</p>
                <Link href="/shop" className="px-8 py-3 bg-silvoraa-black text-white text-xs font-display uppercase tracking-widest rounded-full hover:bg-silvoraa-gold transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

                {/* LEFT: Forms (White) */}
                <div className="lg:col-span-7 px-6 py-12 lg:p-20 order-2 lg:order-1">
                    <div className="max-w-xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-8 text-xs font-display uppercase tracking-widest text-silvoraa-warmGray">
                            <Link href="/shop" className="hover:text-silvoraa-gold">Cart</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className={step === 1 ? 'text-silvoraa-black' : ''}>Information</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className={step === 2 ? 'text-silvoraa-black' : ''}>Payment</span>
                        </div>

                        <h1 className="text-3xl font-display text-silvoraa-black mb-8">
                            {step === 1 ? 'Shipping Address' : 'Payment Method'}
                        </h1>

                        {step === 1 ? (
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase font-display text-gray-400">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-silvoraa-gold/20 outline-none transition"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase font-display text-gray-400">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-silvoraa-gold/20 outline-none transition"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs uppercase font-display text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-silvoraa-gold/20 outline-none transition"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs uppercase font-display text-gray-400">Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-silvoraa-gold/20 outline-none transition"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs uppercase font-display text-gray-400">Address</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-silvoraa-gold/20 outline-none transition"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1 space-y-1">
                                        <label className="text-xs uppercase font-display text-gray-400">Zip Code</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.zip}
                                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-silvoraa-gold/20 outline-none transition"
                                        />
                                    </div>
                                    <div className="col-span-1 space-y-1">
                                        <label className="text-xs uppercase font-display text-gray-400">City</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-silvoraa-gold/20 outline-none transition"
                                        />
                                    </div>
                                    <div className="col-span-1 space-y-1">
                                        <label className="text-xs uppercase font-display text-gray-400">State</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-silvoraa-gold/20 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-5 bg-silvoraa-black text-white font-display uppercase tracking-widest rounded-xl hover:bg-silvoraa-gold shadow-lg shadow-silvoraa-gold/10 transition-all mt-8">
                                    Continue to Payment
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="text-sm">{error}</p>
                                    </div>
                                )}

                                <div className="p-6 border border-silvoraa-gold/30 bg-silvoraa-gold/5 rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-display uppercase text-gray-500 mb-1">Contact</p>
                                        <p className="font-medium text-silvoraa-black">{formData.email || user?.email || 'Not provided'}</p>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-xs font-display text-silvoraa-gold hover:underline">Change</button>
                                </div>

                                <div className="p-6 border border-gray-200 bg-gray-50/50 rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-display uppercase text-gray-500 mb-1">Ship to</p>
                                        <p className="font-medium text-silvoraa-black">{formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-xs font-display text-silvoraa-gold hover:underline">Change</button>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-display">Payment Method</h3>
                                    <div className="p-4 border border-gray-200 rounded-xl flex items-center gap-4 cursor-pointer hover:border-silvoraa-gold transition-colors ring-2 ring-silvoraa-gold/10 bg-white">
                                        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-silvoraa-gold rounded-full" />
                                        </div>
                                        <span className="font-medium">Credit / Debit Card</span>
                                    </div>
                                    <div className="p-4 border border-gray-200 bg-gray-50 rounded-xl flex items-center gap-4 opacity-60">
                                        <div className="w-5 h-5 rounded-full border border-gray-300" />
                                        <span className="font-medium">UPI / Net Banking (Coming Soon)</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="w-full py-5 bg-green-600 text-white font-display uppercase tracking-widest rounded-xl hover:bg-green-700 shadow-xl shadow-green-600/20 transition-all mt-8 flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                                    {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                                </button>
                            </div>
                        )}

                        <div className="mt-12 flex items-center gap-8 justify-center opacity-40 grayscale">
                            {/* Trust Badges Mock */}
                            <div className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4" /> Secure SSL</div>
                            <div className="flex gap-2 items-center"><Truck className="w-4 h-4" /> Free Shipping</div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Summary (Gray/Premium) */}
                <div className="lg:col-span-5 bg-[#FAF9F6] px-6 py-12 lg:p-20 order-1 lg:order-2 border-l border-[#E6E1D6]">
                    <div className="max-w-md mx-auto sticky top-20">
                        <h2 className="text-2xl font-display text-silvoraa-black mb-8">Order Summary</h2>

                        <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item, idx) => (
                                <div key={`${item.product.id}-${idx}`} className="flex gap-4">
                                    <div className="w-20 h-20 bg-white rounded-lg p-1 shadow-sm relative">
                                        <img src={item.product.image} className="w-full h-full object-cover rounded-md" />
                                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-silvoraa-gold text-white text-[10px] font-display flex items-center justify-center rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-display text-silvoraa-black">{item.product.title}</h4>
                                        <p className="text-xs text-gray-500 uppercase">{item.product.stone}</p>
                                    </div>
                                    <span className="font-display text-silvoraa-black">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-8 border-t border-[#E6E1D6]">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">GST (18%)</span>
                                <span className="font-medium">₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-display pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span className="font-display text-silvoraa-black">₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
