'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/Auth/AuthContext';
import {
    LayoutDashboard, ShoppingBag, Package, LogOut, Menu, X, ExternalLink, Users, TicketPercent, PanelLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_EMAILS = ['vaibhav.silvoraa@gmail.com', 'sid.silvoraa@gmail.com'];

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
    { icon: Package, label: 'Orders', path: '/admin/orders' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: TicketPercent, label: 'Discounts', path: '/admin/discounts' },
    { icon: PanelLeft, label: 'Site Editor', path: '/admin/site-editor' },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout, isAuthenticated, isLoading } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-silvoraa-black rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated || !user || !ADMIN_EMAILS.includes(user.email)) {
        router.replace('/auth');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-sm
                transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center px-6 border-b border-gray-50">
                        <span className="text-xl font-serif text-silvoraa-black tracking-wide">Silvoraa<span className="text-silvoraa-gold">.</span></span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden p-1 text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        <div className="mb-6">
                            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Management</p>
                            {navItems.map((item) => {
                                const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive ? 'bg-silvoraa-gold/10 text-silvoraa-black shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <item.icon size={18} className={isActive ? 'text-silvoraa-gold' : 'text-gray-400'} />
                                        {item.label}
                                        {isActive && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-silvoraa-gold" />}
                                    </Link>
                                );
                            })}
                        </div>

                        <div>
                            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Links</p>
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                                <ExternalLink size={18} className="text-gray-400" />
                                View Store
                            </a>
                        </div>
                    </nav>

                    <div className="p-4 border-t border-gray-50">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-silvoraa-black text-white flex items-center justify-center text-xs font-medium">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => logout()}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            <LogOut size={14} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-white border-b border-gray-100 lg:hidden">
                    <div className="flex items-center justify-between px-4 h-16">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
                                <Menu size={20} />
                            </button>
                            <span className="font-serif text-lg">Silvoraa Admin</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    <div className="max-w-6xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            )}
        </div>
    );
};
