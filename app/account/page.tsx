"use client";
import React, { useState, useRef } from 'react';

import { useAuth, Order } from '@/components/Auth/AuthContext';
import { Package, Heart, Settings, LogOut, Hexagon, Crown, Clock, MapPin, CreditCard, Camera, Edit2, Save, X, Star } from 'lucide-react';
import Link from 'next/link';

const AccountPage : React.FC = () => {
    const { user, logout, updateProfile, toggleWishlist } = useAuth();
    const [activeTab, setActiveTab] = useState<'collection' | 'wishlist' | 'settings'>('collection');

    // Edit States
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!user) {
        // Will be handled by useEffect redirect in a client component
        return null;
    }

    // Handlers
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProfile({ avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameSave = () => {
        if (tempName.trim()) {
            updateProfile({ name: tempName });
        }
        setIsEditingName(false);
    };

    const handleAddressUpdate = (field: string, value: string) => {
        updateProfile({
            address: {
                street: user.address?.street || '',
                city: user.address?.city || '',
                state: user.address?.state || '',
                zip: user.address?.zip || '',
                phone: user.address?.phone || '',
                [field]: value
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] pt-24 pb-20">
            

            {/* Header / Profile Hero */}
            <div className="container mx-auto px-6 mb-16">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden transition-all duration-500 hover:shadow-lg">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-silvoraa-gold/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    {/* Avatar with Edit Overlay */}
                    <div className="relative z-10 group cursor-pointer" onClick={handleAvatarClick}>
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-2 bg-white shadow-xl shadow-gray-200/50 relative overflow-hidden">
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover transition-opacity duration-300 group-hover:opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-silvoraa-black" />
                            </div>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

                        <div className="absolute bottom-2 right-2 w-8 h-8 bg-silvoraa-black text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white pointer-events-none">
                            <Settings className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Editable Info */}
                    <div className="text-center md:text-left flex-1 relative z-10 w-full md:w-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100/80 rounded-full mb-4">
                            <Crown className="w-3.5 h-3.5 text-silvoraa-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-silvoraa-warmGray">Silver Tier Member</span>
                        </div>

                        {isEditingName ? (
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <input
                                    autoFocus
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="text-3xl font-serif border-b-2 border-silvoraa-gold outline-none bg-transparent w-full md:w-auto text-center md:text-left"
                                />
                                <button onClick={handleNameSave} className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100"><Save className="w-4 h-4" /></button>
                                <button onClick={() => setIsEditingName(false)} className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"><X className="w-4 h-4" /></button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-3 group">
                                <h1 className="text-4xl lg:text-5xl font-serif text-silvoraa-black">
                                    {user.name}
                                </h1>
                                <button
                                    onClick={() => { setTempName(user.name); setIsEditingName(true); }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-silvoraa-black"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <p className="text-gray-400 max-w-md mx-auto md:mx-0 font-medium">
                            Member since {new Date(user.joinedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                        </p>
                    </div>

                    {/* Real Stats */}
                    <div className="flex gap-8 relative z-10 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8 justify-center md:justify-start">
                        <div className="text-center w-24">
                            <p className="text-3xl font-serif text-silvoraa-gold mb-1">{user.orders.length}</p>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Orders</p>
                        </div>
                        <div className="text-center w-24">
                            <p className="text-3xl font-serif text-silvoraa-gold mb-1">{user.wishlist.length}</p>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Wishlist</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Sidebar Navigation */}
                <div className="lg:col-span-3">
                    <nav className="space-y-2 sticky top-32 z-30">
                        <button
                            onClick={() => setActiveTab('collection')}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${activeTab === 'collection' ? 'bg-silvoraa-black text-white shadow-xl shadow-silvoraa-black/10' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Package className={`w-5 h-5 ${activeTab === 'collection' ? 'text-silvoraa-gold' : 'group-hover:text-silvoraa-black'}`} />
                            <span className="font-bold uppercase tracking-widest text-xs">My Collection</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('wishlist')}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${activeTab === 'wishlist' ? 'bg-silvoraa-black text-white shadow-xl shadow-silvoraa-black/10' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Heart className={`w-5 h-5 ${activeTab === 'wishlist' ? 'text-silvoraa-gold' : 'group-hover:text-silvoraa-black'}`} />
                            <span className="font-bold uppercase tracking-widest text-xs">Wishlist</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${activeTab === 'settings' ? 'bg-silvoraa-black text-white shadow-xl shadow-silvoraa-black/10' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-silvoraa-gold' : 'group-hover:text-silvoraa-black'}`} />
                            <span className="font-bold uppercase tracking-widest text-xs">Concierge</span>
                        </button>

                        <div className="pt-8 mt-8 border-t border-gray-100">
                            <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                <LogOut className="w-5 h-5" />
                                <span className="font-bold uppercase tracking-widest text-xs">Sign Out</span>
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="lg:col-span-9 min-h-[500px]">

                    {/* MY COLLECTION (REAL ORDERS) */}
                    {activeTab === 'collection' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <h2 className="text-2xl font-serif text-silvoraa-black mb-2">My Collection</h2>
                                <p className="text-gray-400 text-sm">Track your shipments and view purchase history.</p>
                            </div>

                            {user.orders.length === 0 ? (
                                <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Package className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-serif mb-2">Your collection appears empty.</h3>
                                    <p className="text-sm text-gray-500 mb-6">Start your journey with a timeless piece.</p>
                                    <Link href="/shop" className="px-6 py-3 bg-silvoraa-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-silvoraa-gold transition-colors">
                                        Explore the Gallery
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {user.orders.map((order, i) => (
                                        <div key={order.id} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-wrap justify-between items-center mb-6 pb-6 border-b border-gray-100">
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Order {order.id}</p>
                                                    <p className="text-sm font-medium">{new Date(order.date).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
                                                    <Hexagon className="w-3 h-3 fill-current" />
                                                    {order.status}
                                                </div>
                                            </div>
                                            <div className="flex gap-4 overflow-x-auto pb-2">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex gap-4 min-w-[200px] items-center group cursor-pointer">
                                                        <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden relative border border-gray-100">
                                                            <img src={item.product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                            <span className="absolute bottom-0 right-0 bg-silvoraa-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-tl-lg font-bold">x{item.quantity}</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-serif text-silvoraa-black group-hover:text-silvoraa-gold transition-colors">{item.product.title}</p>
                                                            <p className="text-xs text-gray-400 uppercase">{item.product.stone}</p>
                                                            {order.status === 'delivered' && (
                                                                <Link
                                                                    href={`/product/${item.product.handle}#reviews`}
                                                                    className="text-[10px] font-bold uppercase tracking-widest text-silvoraa-gold hover:underline flex items-center gap-1 mt-1"
                                                                >
                                                                    <Star className="w-3 h-3" /> Write Review
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                                <p className="font-serif text-lg">Total: <span className="font-bold">₹{order.total.toFixed(2)}</span></p>
                                                <button className="px-5 py-2 bg-silvoraa-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-silvoraa-gold transition-colors">Track Status</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* REAL WISHLIST */}
                    {activeTab === 'wishlist' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <h2 className="text-2xl font-serif text-silvoraa-black mb-2">Your Curated Wishlist</h2>
                                <p className="text-gray-400 text-sm">Pieces you've saved for later.</p>
                            </div>

                            {user.wishlist.length === 0 ? (
                                <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Heart className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-serif mb-2">Your wishlist awaits.</h3>
                                    <p className="text-sm text-gray-500 mb-6">Save your favorites by clicking the heart icon on any product.</p>
                                    <Link href="/shop" className="px-6 py-3 bg-silvoraa-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-silvoraa-gold transition-colors">
                                        Browse Collection
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {user.wishlist.map(product => (
                                        <div key={product.id} className="bg-white p-4 rounded-3xl border border-gray-100 flex gap-4 group relative hover:shadow-lg transition-all duration-300">
                                            <button
                                                onClick={() => toggleWishlist(product)}
                                                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm text-red-500 hover:bg-red-50 transition-colors z-20"
                                                title="Remove"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>

                                            <div className="w-28 h-28 rounded-2xl bg-gray-50 overflow-hidden shrink-0">
                                                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h3 className="font-serif text-lg mb-1">{product.title}</h3>
                                                <p className="text-xs text-silvoraa-warmGray uppercase mb-3">{product.stone}</p>
                                                <Link href={`/products/${product.handle}`} className="text-xs font-bold uppercase tracking-widest text-silvoraa-gold hover:underline">View Piece</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* REAL SETTINGS */}
                    {activeTab === 'settings' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <h2 className="text-2xl font-serif text-silvoraa-black mb-2">Concierge & Settings</h2>
                                <p className="text-gray-400 text-sm">Manage your personal details and preferences.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Shipping Address Card */}
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-silvoraa-gold/30 transition-colors">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-gray-500" />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
                                    <div className="space-y-3 mb-6">
                                        <input
                                            placeholder="Street Address"
                                            value={user.address?.street || ''}
                                            onChange={(e) => handleAddressUpdate('street', e.target.value)}
                                            className="w-full p-2 border-b border-gray-200 outline-none focus:border-silvoraa-gold text-sm transition-colors"
                                        />
                                        <div className="flex gap-2">
                                            <input
                                                placeholder="City"
                                                value={user.address?.city || ''}
                                                onChange={(e) => handleAddressUpdate('city', e.target.value)}
                                                className="w-full p-2 border-b border-gray-200 outline-none focus:border-silvoraa-gold text-sm transition-colors"
                                            />
                                            <input
                                                placeholder="Zip Code"
                                                value={user.address?.zip || ''}
                                                onChange={(e) => handleAddressUpdate('zip', e.target.value)}
                                                className="w-full p-2 border-b border-gray-200 outline-none focus:border-silvoraa-gold text-sm transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center gap-1">
                                        <Save className="w-3 h-3" /> Auto-saved
                                    </p>
                                </div>

                                {/* Order History Card */}
                                <div className="bg-white p-8 rounded-3xl border border-gray-100">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                        <Clock className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Private Archive</h3>
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                        Your history is stored securely. Need a comprehensive report of your collection valuation?
                                    </p>
                                    <button disabled className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold uppercase tracking-widest cursor-not-allowed">Generate Report</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};


export default AccountPage;
