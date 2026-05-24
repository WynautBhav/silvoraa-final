'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/appwrite';
import { Search, Plus, Filter, Edit, Trash2, Download, Upload, Check, X, Save, Pencil } from 'lucide-react';
import { Product, ProductType } from '@/types';
import { ImportProductsModal } from '@/app/admin/products/components/ImportProductsModal';
import { exportProductsToCsv } from '@/lib/csvHelper';

// Helper to get image URL with correct extension
const getImageUrl = (path: string | null | undefined) => {
    if (!path) return '';
    let fixedPath = path;
    if (fixedPath.endsWith('.jpg')) fixedPath = fixedPath.replace('.jpg', '.webp');
    if (fixedPath.endsWith('.png')) fixedPath = fixedPath.replace('.png', '.webp');
    return fixedPath;
};

// Helper to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('All');
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    // Bulk Edit State
    const [isBulkEditing, setIsBulkEditing] = useState(false);
    const [pendingEdits, setPendingEdits] = useState<Record<string, Partial<Product>>>({});
    const [isSavingBulk, setIsSavingBulk] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts((data as any) || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.handle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || product.type === selectedType;
        return matchesSearch && matchesType;
    });

    const uniqueTypes = ['All', ...Array.from(new Set(products.map(p => p.type))).filter(Boolean)];

    const handleExport = () => {
        const csvContent = exportProductsToCsv(products);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `silvoraa_products_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Bulk Edit Logic
    const handleBulkEditChange = (id: string, field: keyof Product, value: any) => {
        setPendingEdits(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const handleSaveBulkEdits = async () => {
        const idsToUpdate = Object.keys(pendingEdits);
        if (idsToUpdate.length === 0) {
            setIsBulkEditing(false);
            return;
        }

        if (!window.confirm(`Save changes to ${idsToUpdate.length} products?`)) return;

        setIsSavingBulk(true);
        try {
            // Process updates in parallel (or consider batching if too many)
            const updates = idsToUpdate.map(id => {
                const changes = {
                    ...pendingEdits[id],
                    updated_at: new Date().toISOString()
                };
                return supabase.from('products').update(changes as any).eq('id', id);
            });

            await Promise.all(updates);

            // Success
            setPendingEdits({});
            setIsBulkEditing(false);
            fetchProducts();
        } catch (error) {
            console.error('Error saving bulk edits:', error);
            alert('Failed to save some changes. Check console.');
        } finally {
            setIsSavingBulk(false);
        }
    };

    const handleCancelBulkEdit = () => {
        if (Object.keys(pendingEdits).length > 0) {
            if (!window.confirm('Discard unsaved changes?')) return;
        }
        setPendingEdits({});
        setIsBulkEditing(false);
    };

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-silvoraa-black mb-2">Inventory</h1>
                    <p className="text-sm text-gray-500">Manage your entire catalog from one place.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Standard Actions */}
                    {!isBulkEditing ? (
                        <>
                            <button
                                onClick={() => setIsBulkEditing(true)}
                                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all shadow-sm font-medium text-sm"
                            >
                                <Pencil className="w-4 h-4" />
                                Bulk Edit
                            </button>
                            <button
                                onClick={handleExport}
                                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all shadow-sm font-medium text-sm"
                            >
                                <Download className="w-4 h-4" />
                                Export All
                            </button>
                            <button
                                onClick={() => setIsImportModalOpen(true)}
                                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all shadow-sm font-medium text-sm"
                            >
                                <Upload className="w-4 h-4" />
                                Import
                            </button>
                            <Link href="/admin/products/new" className="flex items-center justify-center gap-2 bg-silvoraa-black text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
                                <Plus className="w-5 h-5" />
                                <span className="text-sm font-semibold tracking-wide">Add New</span>
                            </Link>
                        </>
                    ) : (
                        /* Bulk Edit Actions */
                        <>
                            <div className="text-sm text-gray-500 mr-2">
                                {Object.keys(pendingEdits).length} changes pending
                            </div>
                            <button
                                onClick={handleCancelBulkEdit}
                                disabled={isSavingBulk}
                                className="flex items-center justify-center gap-2 bg-white text-red-600 border border-red-100 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-all shadow-sm font-medium text-sm"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveBulkEdits}
                                disabled={isSavingBulk}
                                className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSavingBulk ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span> : <Save className="w-4 h-4" />}
                                Save Changes
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-2 mb-8 max-w-2xl">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name, handle, or tag..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-none bg-transparent rounded-xl text-sm focus:ring-0 placeholder:text-gray-400"
                    />
                </div>
                <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                <div className="relative w-full md:w-48">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full appearance-none bg-transparent border-none py-3 pl-4 pr-10 text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
                    >
                        {uniqueTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-40">Category</th>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-40">Price</th>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-40">Status / Stock</th>
                                <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="flex justify-center py-20">
                                            <div className="w-8 h-8 border-2 border-gray-200 border-t-silvoraa-gold rounded-full animate-spin" />
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => {
                                    // Use first image if main image is missing
                                    const displayImage = product.image || (product.images && product.images.length > 0 ? product.images[0] : null);

                                    // Get current values (either from pendingEdits or product)
                                    const currentPrice = pendingEdits[product.id]?.price ?? product.price;
                                    const currentInventory = pendingEdits[product.id]?.inventory ?? product.inventory;
                                    const currentType = pendingEdits[product.id]?.type ?? product.type;
                                    const isEdited = !!pendingEdits[product.id];

                                    return (
                                        <tr key={product.id} className={`transition-colors group ${isEdited ? 'bg-yellow-50/50' : 'hover:bg-gray-50/50'}`}>
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-5">
                                                    <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                                        {displayImage ? (
                                                            <img className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" src={getImageUrl(displayImage)} alt={product.title} />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400 bg-gray-50">No Img</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900 mb-1">{product.title}</div>
                                                        <div className="text-xs text-gray-500 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-silvoraa-gold"></span>
                                                            {product.stone || 'No Stone'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                {isBulkEditing ? (
                                                    <select
                                                        value={currentType}
                                                        onChange={(e) => handleBulkEditChange(product.id, 'type', e.target.value)}
                                                        className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:border-silvoraa-gold focus:ring-1 focus:ring-silvoraa-gold outline-none cursor-pointer bg-white"
                                                    >
                                                        {Object.values(ProductType).map(type => (
                                                            <option key={type} value={type}>{type}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-md">
                                                        {product.type}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900 font-serif">
                                                {isBulkEditing ? (
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={currentPrice}
                                                            onChange={(e) => handleBulkEditChange(product.id, 'price', Number(e.target.value))}
                                                            className="w-24 pl-6 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:border-silvoraa-gold focus:ring-1 focus:ring-silvoraa-gold outline-none"
                                                        />
                                                    </div>
                                                ) : (
                                                    formatCurrency(product.price)
                                                )}
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                {isBulkEditing ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={currentInventory}
                                                            onChange={(e) => handleBulkEditChange(product.id, 'inventory', Number(e.target.value))}
                                                            className="w-20 px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:border-silvoraa-gold focus:ring-1 focus:ring-silvoraa-gold outline-none"
                                                        />
                                                        <span className="text-xs text-gray-400">pcs</span>
                                                    </div>
                                                ) : (
                                                    product.inventory === 0 ? (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                                                            Out of Stock
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
                                                            {product.inventory} In Stock
                                                        </span>
                                                    )
                                                )}
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                {!isBulkEditing && (
                                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                        <Link href={`/admin/products/${product.id}`} className="p-2 text-gray-400 hover:text-silvoraa-black hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        {/* Add delete logic if needed here, currently just UI */}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-24 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-3">
                                            <Search className="w-12 h-12 text-gray-200" />
                                            <p className="text-base font-medium">No products found</p>
                                            <p className="text-sm">Try adjusting your filters or search terms</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ImportProductsModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onSuccess={() => {
                    setIsImportModalOpen(false);
                    fetchProducts();
                }}
            />
        </div>
    );
};

