'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/appwrite';
import { ArrowLeft, Save, Trash2, Plus, Loader2, Star, X, Sparkles } from 'lucide-react';
import { Product, ProductType, StoneType } from '@/types';

export default function ProductEditorPage() {
    const params = useParams();
    const id = params?.id as string;
    const isNew = id === 'new';
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const [formData, setFormData] = useState<Partial<Product>>({
        title: '', handle: '', price: 0,
        description: '', description_text: '', specifications: {},
        care_guide: '', stone_benefits: '', style_note: '',
        image: '', images: [],
        type: ProductType.RING, stone: StoneType.AMETHYST,
        inventory: 0, tags: [], benefits: []
    });

    useEffect(() => {
        if (!isNew && id) fetchProduct(id);
        fetchAllProducts();
    }, [id]);

    const fetchAllProducts = async () => {
        const { data } = await supabase.from('products').select('*');
        if (data) setAllProducts(data);
    };

    const fetchProduct = async (productId: string) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from('products').select('*').eq('id', productId).single();
            if (error) throw error;
            if (data) {
                const pd = data as any;
                setFormData({ ...pd, images: pd.images || [], specifications: typeof pd.specifications === 'object' ? pd.specifications : {} });
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            alert('Failed to load product');
            router.push('/admin/products');
        } finally {
            setIsLoading(false);
        }
    };

    const getImageUrl = (path: string | null | undefined) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        let fixedPath = path;
        if (fixedPath.endsWith('.jpg')) fixedPath = fixedPath.replace('.jpg', '.webp');
        if (fixedPath.endsWith('.png')) fixedPath = fixedPath.replace('.png', '.webp');
        return fixedPath;
    };

    const STONE_BENEFITS_MAP: Record<string, string> = {
        [StoneType.AMETHYST]: "Calm\nBalance\nInner Peace",
        [StoneType.CITRINE]: "Optimism\nAbundance\nClarity",
        [StoneType.CZ]: "Focus\nClarity\nBrilliance",
        [StoneType.GARNET]: "Vitality\nPassion\nStrength",
        [StoneType.IOLITE]: "Vision\nExpression\nRestoration",
        [StoneType.LAPIS]: "Wisdom\nTruth\nIntuition",
        [StoneType.TOPAZ]: "Confidence\nJoy\nGood Fortune",
        [StoneType.TOURMALINE]: "Protection\nGrounding\nBalance",
    };

    const STANDARD_CARE_GUIDE = `Natural Variation:\nAs this piece features natural gemstones, slight variations in color and pattern are to be expected.\n\nCare Guide:\nAvoid direct contact with water, perfumes, and harsh chemicals. Store in a cool, dry place.`;

    const handleSmartFill = () => {
        const newSpecs: Record<string, string> = { ...formData.specifications };
        if (!newSpecs['Material']) newSpecs['Material'] = '925 Sterling Silver';
        if (!newSpecs['Finish']) newSpecs['Finish'] = 'High Polish Silver';
        if (formData.stone && !newSpecs['Gemstone']) newSpecs['Gemstone'] = `Natural ${formData.stone.replace(/_/g, ' ')}`;
        if (formData.type && !newSpecs['Style']) newSpecs['Style'] = formData.type;

        const newBenefits = formData.stone_benefits || (formData.stone ? STONE_BENEFITS_MAP[formData.stone] : '') || "Beauty\nElegance\nCharm";
        const newCare = formData.care_guide || STANDARD_CARE_GUIDE;
        const newStyleNote = formData.style_note || 'Layer with fine chains for an effortless look.';

        setFormData(prev => ({ ...prev, specifications: newSpecs, stone_benefits: newBenefits, care_guide: newCare, style_note: newStyleNote }));
        alert(`Smart Fill Complete!\n\nExtracted:\n- Specs: ${Object.keys(newSpecs).length}\n- Benefits & Care: Updated`);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setIsUploading(true);
        const newImages: string[] = [];
        try {
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i];
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage.from('products').upload(fileName, file);
                if (uploadError) throw uploadError;
                const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
                newImages.push(publicUrl);
            }
            setFormData(prev => {
                const updatedImages = [...(prev.images || []), ...newImages];
                return { ...prev, images: updatedImages, image: prev.image || updatedImages[0] || '' };
            });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image.');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const handleSetPrimary = (img: string) => setFormData(prev => ({ ...prev, image: img }));
    const handleRemoveImage = (indexToRemove: number) => {
        setFormData(prev => {
            const currentImages = prev.images || [];
            const newImages = currentImages.filter((_, i) => i !== indexToRemove);
            const newPrimary = prev.image === currentImages[indexToRemove] ? (newImages[0] || '') : prev.image;
            return { ...prev, images: newImages, image: newPrimary };
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'title' && isNew) {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, title: value, handle: slug }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const productData = {
                ...formData, price: Number(formData.price), inventory: Number(formData.inventory || 0),
                updated_at: new Date().toISOString(), images: formData.images || [], tags: formData.tags || [],
                benefits: formData.benefits || [], specifications: formData.specifications || {}
            };
            if (isNew) (productData as any).created_at = new Date().toISOString();
            const { error } = await supabase.from('products').upsert(isNew ? [productData] : productData);
            if (error) throw error;
            router.push('/admin/products');
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Delete this product permanently?')) return;
        setIsSaving(true);
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            router.push('/admin/products');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-silvoraa-gold" /></div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md py-4 border-b border-gray-200/50 -mx-4 px-4 sm:static sm:bg-transparent sm:py-0 sm:border-0 sm:mx-0 sm:px-0">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 -ml-2 text-gray-400 hover:text-silvoraa-black transition-colors rounded-full hover:bg-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-serif text-silvoraa-black">{isNew ? 'Create Product' : 'Edit Product'}</h1>
                        <p className="text-sm text-gray-500">{isNew ? 'Add a new piece to your collection' : 'Manage product details'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {!isNew && <button type="button" onClick={handleDelete} disabled={isSaving} className="px-4 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">Delete</button>}
                    <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-silvoraa-black hover:bg-gray-800 rounded-lg transition-all shadow-lg shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Media Gallery */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-serif text-lg text-gray-900">Media Gallery</h2>
                            <span className="text-xs text-gray-400">{formData.images?.length || 0} items</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                            {formData.image && (
                                <div className="col-span-2 row-span-2 relative group aspect-square rounded-lg overflow-hidden border-2 border-silvoraa-gold/20 bg-gray-50">
                                    <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-silvoraa-gold text-white text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-sm">Primary</div>
                                    <img src={getImageUrl(formData.image)} alt="Primary" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                            )}
                            {(formData.images || []).map((img, index) => {
                                const isPrimary = img === formData.image;
                                return (
                                    <div key={index} className={`relative group aspect-square rounded-lg overflow-hidden border ${isPrimary ? 'border-silvoraa-gold ring-2 ring-silvoraa-gold/20' : 'border-gray-200'} bg-gray-50`}>
                                        <img src={getImageUrl(img)} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                            {!isPrimary && <button type="button" onClick={() => handleSetPrimary(img)} className="p-1.5 bg-white text-gray-900 rounded-full hover:bg-silvoraa-gold hover:text-white transition-colors" title="Set as Primary"><Star className="w-3 h-3" /></button>}
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="p-1.5 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors" title="Remove"><X className="w-3 h-3" /></button>
                                        </div>
                                    </div>
                                );
                            })}
                            <label className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:border-silvoraa-gold/50 hover:bg-silvoraa-gold/5 transition-all group">
                                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
                                <div className={`p-3 rounded-full bg-white mb-2 shadow-sm group-hover:scale-110 transition-transform ${isUploading ? 'animate-pulse' : ''}`}>
                                    {isUploading ? <Loader2 className="w-5 h-5 text-silvoraa-gold animate-spin" /> : <Plus className="w-5 h-5 text-gray-400 group-hover:text-silvoraa-gold" />}
                                </div>
                                <span className="text-xs font-medium text-gray-500 group-hover:text-silvoraa-gold">Add Media</span>
                            </label>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                            <h2 className="font-serif text-lg text-gray-900">Content & Storytelling</h2>
                            <button type="button" onClick={handleSmartFill} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-silvoraa-gold bg-silvoraa-gold/10 hover:bg-silvoraa-gold/20 rounded-full transition-colors">
                                <Sparkles className="w-3.5 h-3.5" /> Smart Fill
                            </button>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Product Title</label>
                            <input name="title" type="text" required value={formData.title} onChange={handleChange} placeholder="e.g. Ethereal Amethyst Ring" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description (Intro)</label>
                            <textarea name="description_text" rows={4} value={formData.description_text || ''} onChange={handleChange} placeholder="The main hook. Tell the story of the piece..." className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none" />
                        </div>

                        {/* Specifications Builder */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Specifications</label>
                            <div className="space-y-2">
                                {Object.entries(formData.specifications || {}).map(([key, val], idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input type="text" value={key} onChange={(e) => { const newSpecs = { ...formData.specifications }; const oldValue = newSpecs[key]; delete newSpecs[key]; newSpecs[e.target.value] = oldValue; setFormData(prev => ({ ...prev, specifications: newSpecs })); }} placeholder="Spec Name" className="w-1/3 px-3 py-2 text-xs border border-gray-200 rounded-md focus:border-silvoraa-gold outline-none" />
                                        <input type="text" value={val} onChange={(e) => { const newSpecs = { ...formData.specifications, [key]: e.target.value }; setFormData(prev => ({ ...prev, specifications: newSpecs })); }} placeholder="Value" className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-md focus:border-silvoraa-gold outline-none" />
                                        <button type="button" onClick={() => { const newSpecs = { ...formData.specifications }; delete newSpecs[key]; setFormData(prev => ({ ...prev, specifications: newSpecs })); }} className="p-2 text-red-500 hover:text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => { const newKey = `Spec ${Object.keys(formData.specifications || {}).length + 1}`; setFormData(prev => ({ ...prev, specifications: { ...(prev.specifications || {}), [newKey]: '' } })); }} className="text-xs text-silvoraa-gold font-bold uppercase tracking-wider flex items-center gap-1 mt-2 hover:underline">
                                    <Plus className="w-3 h-3" /> Add Specification
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Gemstone Benefits</label>
                                <textarea name="stone_benefits" rows={3} value={formData.stone_benefits || ''} onChange={handleChange} placeholder="Benefits for this piece..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Stylist Note</label>
                                <textarea name="style_note" rows={3} value={formData.style_note || ''} onChange={handleChange} placeholder="How to wear this..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none resize-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Care Guide</label>
                            <textarea name="care_guide" rows={3} value={formData.care_guide || ''} onChange={handleChange} placeholder="Care instructions and notes..." className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none" />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="font-serif text-lg text-gray-900 border-b border-gray-50 pb-2 mb-4">Pricing & Inventory</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input name="price" type="number" min="0" required value={formData.price} onChange={handleChange} className="w-full pl-7 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Stock</label>
                                <input name="inventory" type="number" min="0" value={formData.inventory} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5">
                        <h2 className="font-serif text-lg text-gray-900 border-b border-gray-50 pb-2">Classification</h2>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none bg-white cursor-pointer">
                                {Object.values(ProductType).map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Gemstone</label>
                            <select name="stone" value={formData.stone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none bg-white cursor-pointer">
                                {Object.values(StoneType).map(stone => <option key={stone} value={stone}>{stone}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="font-serif text-lg text-gray-900 border-b border-gray-50 pb-2">Tags</h2>
                        <input type="text" placeholder="Type and press Enter..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const val = e.currentTarget.value.trim();
                                    if (val && !formData.tags?.includes(val)) {
                                        setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), val] }));
                                        e.currentTarget.value = '';
                                    }
                                }
                            }} />
                        <div className="flex flex-wrap gap-2">
                            {(formData.tags || []).map((tag, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                    {tag}
                                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, tags: prev.tags?.filter((_, i) => i !== idx) }))} className="text-gray-400 hover:text-red-500 ml-0.5"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                            {(formData.tags || []).length === 0 && <span className="text-xs text-gray-400 italic">No tags added yet.</span>}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="font-serif text-lg text-gray-900 border-b border-gray-50 pb-2">SEO Preview</h2>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">URL Handle</label>
                            <div className="text-xs text-silvoraa-gold mb-1 truncate font-mono bg-gray-50 p-1.5 rounded border border-gray-100">silvoraa.com/product/{formData.handle || '...'}</div>
                            <input name="handle" type="text" value={formData.handle} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
