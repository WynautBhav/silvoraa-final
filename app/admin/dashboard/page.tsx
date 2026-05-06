'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3, Package, ShoppingBag, Users, Plus, Settings, ArrowRight, DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { supabase } from '@/lib/appwrite';

// Helper to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

// Helper for Chart Data
const getLast7Days = () => {
    const dates: string[] = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
};

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalSales: 0,
        activeOrders: 0,
        totalProducts: 0,
        totalCustomers: 0
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [salesData, setSalesData] = useState<{ date: string; amount: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // 1. Total Sales (Sum of all non-cancelled orders)
            const { data: allSalesData } = await supabase
                .from('orders')
                .select('total')
                .neq('status', 'cancelled');

            const totalSales = allSalesData?.reduce((sum: number, order: any) => sum + (order.total || 0), 0) || 0;

            // 2. Active Orders
            const  { data: activeOrders } = await supabase
                .from('orders')
                .select('*')
                .in('status', ['pending', 'processing', 'shipped']);

            // 3. Total Products
            const  { data: totalProducts } = await supabase
                .from('products')
                .select('*');

            // 4. Total Customers
            const  { data: totalCustomers } = await supabase
                .from('profiles')
                .select('*');

            // 5. Recent Orders
            const { data: recent } = await supabase
                .from('orders')
                .select(`
                    id,
                    created_at,
                    total,
                    status,
                    user:profiles(full_name, email)
                `)
                .order('created_at', { ascending: false })
                .limit(5);

            // 6. Sales Chart Data (Last 7 Days)
            const today = new Date();
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);

            const { data: chartSales } = await supabase
                .from('orders')
                .select('created_at, total')
                .neq('status', 'cancelled')
                .gte('created_at', lastWeek.toISOString());

            const last7Days = getLast7Days();
            const dailySales = last7Days.map(date => {
                const dayTotal = chartSales
                    ?.filter((order: any) => order.created_at.startsWith(date))
                    .reduce((sum: number, order: any) => sum + (order.total || 0), 0) || 0;
                return { date, amount: dayTotal };
            });

            setStats({
                totalSales,
                activeOrders: activeOrders || 0,
                totalProducts: totalProducts || 0,
                totalCustomers: totalCustomers || 0
            });
            setRecentOrders(recent || []);
            setSalesData(dailySales);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const statCards = [
        {
            label: 'Total Sales',
            value: formatCurrency(stats.totalSales),
            icon: Wallet,
            color: 'bg-emerald-500',
            textColor: 'text-emerald-500'
        },
        {
            label: 'Active Orders',
            value: stats.activeOrders.toString(),
            icon: ShoppingBag,
            color: 'bg-blue-500',
            textColor: 'text-blue-500'
        },
        {
            label: 'Total Products',
            value: stats.totalProducts.toString(),
            icon: Package,
            color: 'bg-purple-500',
            textColor: 'text-purple-500'
        },
        {
            label: 'Total Customers',
            value: stats.totalCustomers.toString(),
            icon: Users,
            color: 'bg-orange-500',
            textColor: 'text-orange-500'
        }
    ];

    // Helper for max value in chart
    const maxSales = Math.max(...salesData.map(d => d.amount), 1);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-silvoraa-black rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-serif text-silvoraa-black mb-1">Dashboard</h1>
                    <p className="text-sm text-gray-500">Welcome back to your overview.</p>
                </div>
                <div className="text-sm text-gray-400">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-opacity-10 ${stat.textColor.replace('text-', 'bg-')}`}>
                                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                            </div>
                            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +0%
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-silvoraa-black mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Sales Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-lg text-silvoraa-black">Sales Overview (Last 7 Days)</h2>
                    <select className="text-sm border border-gray-200 rounded-lg px-2 py-1">
                        <option>Last 7 Days</option>
                    </select>
                </div>

                <div className="h-64 flex items-end justify-between gap-2 sm:gap-4">
                    {salesData.map((day, i) => {
                        const heightPercent = (day.amount / maxSales) * 100;
                        const dateLabel = new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short' });
                        return (
                            <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
                                <div className="relative w-full bg-gray-50 rounded-t-lg sm:rounded-lg overflow-hidden flex items-end transition-all group-hover:bg-gray-100 h-full">
                                    <div
                                        className="w-full bg-silvoraa-gold/80 group-hover:bg-silvoraa-gold transition-all duration-500 ease-out rounded-t-sm"
                                        style={{ height: `${Math.max(heightPercent, 0)}%` }}
                                    ></div>

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {formatCurrency(day.amount)}
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">{dateLabel}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="font-serif text-lg text-silvoraa-black">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-sm text-silvoraa-gold hover:text-silvoraa-black transition-colors flex items-center gap-1 font-medium">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-6">
                        {recentOrders.length > 0 ? (
                            <div className="space-y-6">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-silvoraa-gold/10 group-hover:text-silvoraa-gold transition-colors">
                                                <ShoppingBag className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-silvoraa-black">
                                                    Order #{order.id.slice(0, 8)}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    by {order.user?.full_name || order.user?.email || 'Guest'} • {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-silvoraa-black">{formatCurrency(order.total)}</p>
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                                                ${order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                                                        'bg-blue-100 text-blue-600'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400 text-sm">
                                No recent orders found.
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="font-serif text-lg text-silvoraa-black mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link href="/admin/products/new" className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-silvoraa-gold/30 hover:bg-silvoraa-gold/5 transition-all group">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-md group-hover:bg-white group-hover:shadow-sm transition-all">
                                <Plus className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-sm font-medium text-silvoraa-black">Add New Product</span>
                                <span className="block text-xs text-gray-500">Create a new listing</span>
                            </div>
                        </Link>

                        <Link href="/admin/editor" className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-silvoraa-gold/30 hover:bg-silvoraa-gold/5 transition-all group">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-md group-hover:bg-white group-hover:shadow-sm transition-all">
                                <Settings className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-sm font-medium text-silvoraa-black">Edit Site Content</span>
                                <span className="block text-xs text-gray-500">Update banners & text</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

