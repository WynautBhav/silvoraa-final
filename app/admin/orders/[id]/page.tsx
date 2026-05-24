'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/appwrite';
import { ArrowLeft, Package, Truck, Mail, MapPin, Calendar, CreditCard, Save } from 'lucide-react';
import { Order } from '@/types';

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params?.id as string;
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [savedMsg, setSavedMsg] = useState(false);

    useEffect(() => { if (id) fetchOrder(id); }, [id]);

    const fetchOrder = async (orderId: string) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*, user:profiles(full_name, email)')
                .eq('id', orderId)
                .single();
            if (error) throw error;
            if (data) {
                const orderData = data as unknown as Order;
                setOrder(orderData);
                if (orderData.tracking_number) setTrackingNumber(orderData.tracking_number);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus: string) => {
        if (!order) return;
        setIsUpdating(true);
        try {
            const { error } = await supabase.from('orders').update({ status: newStatus as any }).eq('id', order.id);
            if (error) throw error;
            setOrder({ ...order, status: newStatus as Order['status'] });
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSaveTracking = async () => {
        if (!order) return;
        setIsUpdating(true);
        try {
            const { error } = await supabase.from('orders').update({ tracking_number: trackingNumber } as any).eq('id', order.id);
            if (error) throw error;
            setSavedMsg(true);
            setTimeout(() => setSavedMsg(false), 2000);
        } catch (error) {
            console.error('Error saving tracking:', error);
            alert('Failed to save tracking number');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-gray-200 border-t-silvoraa-black rounded-full animate-spin" /></div>;

    if (!order) return (
        <div className="text-center py-12">
            <h2 className="text-xl font-serif text-silvoraa-black">Order not found</h2>
            <Link href="/admin/orders" className="text-sm text-gray-500 hover:text-silvoraa-black mt-2 inline-block">Return to Orders</Link>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="p-2 -ml-2 text-gray-400 hover:text-silvoraa-black transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-serif text-silvoraa-black">Order #{order.id.slice(0, 8)}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'cancelled' ? 'bg-red-100 text-red-700' : order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(order.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                    <span className="text-sm text-gray-500 pl-2">Status:</span>
                    <select value={order.status} onChange={(e) => handleStatusUpdate(e.target.value)} disabled={isUpdating} className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-silvoraa-gold focus:border-silvoraa-gold block p-2 outline-none capitalize min-w-[140px]">
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50">
                            <h2 className="font-medium text-gray-900 flex items-center gap-2"><Package className="w-4 h-4 text-gray-400" /> Ordered Items</h2>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {order.items && Array.isArray(order.items) ? (
                                order.items.map((item: any, index: number) => (
                                    <div key={index} className="p-6 flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                                            {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                                            <p className="text-xs text-gray-500">{formatCurrency(item.price)} each</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-gray-500 text-sm">No items data found.</div>
                            )}
                        </div>
                        <div className="bg-gray-50 p-6 border-t border-gray-100">
                            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Subtotal</span><span className="font-medium">{formatCurrency(order.total)}</span></div>
                            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Shipping</span><span className="font-medium">Free</span></div>
                            <div className="flex justify-between text-base pt-3 border-t border-gray-200 mt-3"><span className="font-bold text-gray-900">Total</span><span className="font-bold text-silvoraa-black">{formatCurrency(order.total)}</span></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-gray-400" /> Customer Details</h2>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Contact</p>
                            <p className="text-sm text-gray-900 font-medium">{order.user?.full_name || order.shipping_address?.fullName || 'Guest'}</p>
                            <a href={`mailto:${order.user?.email}`} className="text-sm text-silvoraa-gold hover:underline flex items-center gap-1 mt-0.5">
                                <Mail className="w-3 h-3" />{order.user?.email || 'No email provided'}
                            </a>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> Shipping Address</h2>
                        {order.shipping_address ? (
                            <div className="text-sm text-gray-600 leading-relaxed">
                                <p className="font-medium text-gray-900">{(order.shipping_address as any).full_name || order.shipping_address.fullName}</p>
                                <p>{(order.shipping_address as any).street || order.shipping_address.addressLine1}</p>
                                {(order.shipping_address.addressLine2) && <p>{order.shipping_address.addressLine2}</p>}
                                <p>{order.shipping_address.city}, {order.shipping_address.state} {(order.shipping_address as any).zip || order.shipping_address.postalCode}</p>
                                <p>{order.shipping_address.country}</p>
                                <p className="mt-2 text-gray-500">{order.shipping_address.phone}</p>
                            </div>
                        ) : <div className="text-sm text-gray-400 italic">No shipping address available</div>}
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2"><Truck className="w-4 h-4 text-gray-400" /> Fulfillment</h2>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tracking Number</label>
                        <div className="flex items-center gap-2">
                            <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="Enter tracking #" className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-silvoraa-gold focus:border-silvoraa-gold outline-none" />
                            <button onClick={handleSaveTracking} disabled={isUpdating} className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50">
                                <Save className="w-4 h-4" />
                            </button>
                        </div>
                        {savedMsg && <p className="text-xs text-green-600 mt-1">✓ Saved!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
