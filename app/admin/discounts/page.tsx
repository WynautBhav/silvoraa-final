'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/appwrite';
import { Coupon } from '@/types';
import { Plus, Trash2, Loader2, TicketPercent, CheckCircle, XCircle } from 'lucide-react';

export default function DiscountsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    const [newCode, setNewCode] = useState('');
    const [newType, setNewType] = useState<'percentage' | 'fixed'>('percentage');
    const [newValue, setNewValue] = useState(10);
    const [newMinOrder, setNewMinOrder] = useState(0);

    useEffect(() => { fetchCoupons(); }, []);

    const fetchCoupons = async () => {
        try {
            const { data, error } = await (supabase
                .from('coupons' as any)
                .select('*')
                .order('created_at', { ascending: false })) as any;
            if (error) throw error;
            setCoupons(data || []);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const code = newCode.toUpperCase().trim();
            if (!code) return;
            const { error } = await supabase.from('coupons' as any).insert([{
                code,
                discount_type: newType,
                value: Number(newValue),
                min_order_amount: Number(newMinOrder),
                is_active: true
            }]);
            if (error) throw error;
            setNewCode('');
            setNewValue(10);
            fetchCoupons();
            alert('Coupon created successfully!');
        } catch (error: any) {
            console.error('Error creating coupon:', error);
            alert('Failed to create coupon: ' + error.message);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this coupon?')) return;
        try {
            const { error } = await supabase.from('coupons' as any).delete().eq('id', id);
            if (error) throw error;
            fetchCoupons();
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    const handleToggleActive = async (coupon: Coupon) => {
        try {
            const { error } = await supabase.from('coupons' as any).update({ is_active: !coupon.is_active }).eq('id', coupon.id);
            if (error) throw error;
            fetchCoupons();
        } catch (error) {
            console.error('Error updating coupon:', error);
        }
    };

    if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-silvoraa-gold" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-gray-900">Discounts & Promos</h1>
                    <p className="text-gray-500">Manage coupon codes for your customers.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                    <h2 className="font-serif text-lg text-gray-900 mb-4 pb-2 border-b border-gray-50 flex items-center gap-2">
                        <Plus size={18} /> Create New Coupon
                    </h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Code</label>
                            <input type="text" value={newCode} onChange={e => setNewCode(e.target.value.toUpperCase())} placeholder="e.g. WELCOME10" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Type</label>
                                <select value={newType} onChange={(e: any) => setNewType(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:border-silvoraa-gold outline-none">
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed">Fixed Amount (₹)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Value</label>
                                <input type="number" min="1" value={newValue} onChange={e => setNewValue(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-silvoraa-gold outline-none" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Min. Order Amount (₹)</label>
                            <input type="number" min="0" value={newMinOrder} onChange={e => setNewMinOrder(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-silvoraa-gold outline-none" />
                        </div>
                        <button type="submit" disabled={isCreating} className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-silvoraa-black hover:bg-gray-800 rounded-lg transition-all shadow-lg shadow-gray-200 disabled:opacity-70">
                            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Create Coupon
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    {coupons.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <TicketPercent className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No active coupons found.</p>
                        </div>
                    ) : (
                        coupons.map(coupon => (
                            <div key={coupon.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:shadow-sm transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${coupon.is_active ? 'bg-silvoraa-gold/10 text-silvoraa-gold' : 'bg-gray-100 text-gray-400'}`}>
                                        <TicketPercent size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 font-mono tracking-wide">{coupon.code}</h3>
                                        <p className="text-sm text-gray-500">
                                            {coupon.discount_type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                                            {coupon.min_order_amount > 0 && ` • Min Order: ₹${coupon.min_order_amount}`}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="text-xs text-gray-400 flex items-center gap-1"><CheckCircle size={10} /> {coupon.used_count} uses</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${coupon.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {coupon.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleToggleActive(coupon)} className={`p-2 rounded-lg transition-colors ${coupon.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`} title={coupon.is_active ? 'Deactivate' : 'Activate'}>
                                        {coupon.is_active ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                    </button>
                                    <button onClick={() => handleDelete(coupon.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
