'use client';
import React, { useState } from 'react';
import { useConfig } from '@/components/Config/ConfigProvider';
import { Save, RefreshCw, Layout, Type, Link as LinkIcon, Image as ImageIcon, Upload, Palette, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const MediaManager = dynamic(() => import('@/components/Admin/MediaManager').then(m => m.MediaManager), { ssr: false });
const VisualHeroEditor = dynamic(() => import('@/components/Admin/VisualHeroEditor').then(m => m.VisualHeroEditor), { ssr: false });

export default function SiteEditorPage() {
    const { items, updateConfig, isLoading } = useConfig();
    const [editorMode, setEditorMode] = useState<'content' | 'hero'>('content');
    const [activeSection, setActiveSection] = useState<string>('all');
    const [saving, setSaving] = useState<string | null>(null);
    const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
    const [activeImageKey, setActiveImageKey] = useState<string | null>(null);

    const sections = Array.from(new Set(items.map(item => item.section)));

    if (isLoading && items.length === 0) {
        return (
            <div className="p-12 text-center text-gray-500">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                Loading configuration...
            </div>
        );
    }

    const handleSave = async (key: string, value: string) => {
        setSaving(key);
        await updateConfig(key, value);
        setTimeout(() => setSaving(null), 1000);
    };

    const handleImageSelect = (url: string) => {
        if (activeImageKey) {
            handleSave(activeImageKey, url);
            setIsMediaManagerOpen(false);
            setActiveImageKey(null);
        }
    };

    const openMediaManager = (key: string) => {
        setActiveImageKey(key);
        setIsMediaManagerOpen(true);
    };

    const isVisualHeroManagedKey = (key: string) =>
        /^hero_[1-3]_(media_scale|media_pos_x|media_pos_y|height|overlay_opacity|mobile_media|mobile_height|mobile_scale|mobile_pos_x|mobile_pos_y|title_size|subtitle_size|align|title|subtitle|cta|cta_kicker|link|layers)$/.test(key);

    const editorItems = items.filter(item => !isVisualHeroManagedKey(item.key));
    const filteredItems = activeSection === 'all' ? editorItems : editorItems.filter(item => item.section === activeSection);

    return (
        <div className="space-y-6">
            <MediaManager isOpen={isMediaManagerOpen} onClose={() => setIsMediaManagerOpen(false)} onSelect={handleImageSelect} />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-gray-900">Site Content</h1>
                    <p className="text-gray-500">Customize text, images, links, and hero layout across your store.</p>
                </div>
                <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden bg-white">
                    <button type="button" onClick={() => setEditorMode('content')} className={`px-4 py-2 text-sm font-medium ${editorMode === 'content' ? 'bg-silvoraa-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}>Content Fields</button>
                    <button type="button" onClick={() => setEditorMode('hero')} className={`px-4 py-2 text-sm font-medium ${editorMode === 'hero' ? 'bg-silvoraa-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}>Hero Visual Designer</button>
                </div>
            </div>

            {editorMode === 'hero' && (
                <>
                    <VisualHeroEditor />
                    <div className="bg-silvoraa-warmGray/10 border border-silvoraa-warmGray/20 rounded-xl p-6 flex items-start gap-4">
                        <div className="p-3 bg-white rounded-lg text-silvoraa-black shadow-sm mt-0.5"><Layout size={20} /></div>
                        <div>
                            <h3 className="text-base font-bold text-gray-900">Pro Design Studio</h3>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">You are using the <strong>Silvoraa Layer-Based Studio</strong>. Add multiple text and button layers, customize fonts, and drag elements to position them precisely. Changes are saved instantly.</p>
                        </div>
                    </div>
                </>
            )}

            {editorMode === 'content' && (
                <>
                    <div className="flex gap-2 border-b border-gray-100 pb-1 overflow-x-auto">
                        <button onClick={() => setActiveSection('all')} className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeSection === 'all' ? 'bg-white text-silvoraa-black border-b-2 border-silvoraa-gold' : 'text-gray-500 hover:text-gray-900'}`}>All Sections</button>
                        {sections.map(section => (
                            <button key={section} onClick={() => setActiveSection(section)} className={`px-4 py-2 text-sm font-medium rounded-t-lg capitalize transition-colors ${activeSection === section ? 'bg-white text-silvoraa-black border-b-2 border-silvoraa-gold' : 'text-gray-500 hover:text-gray-900'}`}>{section}</button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {filteredItems.map((item) => (
                                <motion.div layout key={item.key} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        {item.type === 'text' && <Type size={14} />}
                                        {item.type === 'image' && <ImageIcon size={14} />}
                                        {item.type === 'link' && <LinkIcon size={14} />}
                                        {item.type === 'color' && <Palette size={14} />}
                                        {item.type === 'select' && <Type size={14} />}
                                        {item.section}
                                    </div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">{item.label || item.key}</label>

                                    {item.type === 'image' ? (
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                                {item.value ? (
                                                    <div className="relative w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                                                        <img src={item.value} alt={item.key} className="w-full h-full object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 flex-shrink-0"><ImageIcon size={24} /></div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-500 break-all font-mono mb-3 line-clamp-2">{item.value || 'No image selected'}</p>
                                                    <button onClick={() => openMediaManager(item.key)} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                                                        <Upload size={14} /> Choose Image
                                                    </button>
                                                </div>
                                            </div>
                                            <input type="text" placeholder="Or paste URL manually..." className="w-full px-3 py-2 text-xs border border-gray-100 rounded text-gray-400 focus:text-gray-900 focus:border-silvoraa-gold outline-none" defaultValue={item.value} onBlur={(e) => { if (e.target.value !== item.value) handleSave(item.key, e.target.value); }} />
                                        </div>
                                    ) : item.type === 'text' ? (
                                        <textarea className="w-full min-h-[120px] p-3 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-silvoraa-gold focus:border-silvoraa-gold outline-none transition-all resize-y font-sans leading-relaxed" defaultValue={item.value} onBlur={(e) => { if (e.target.value !== item.value) handleSave(item.key, e.target.value); }} />
                                    ) : item.type === 'color' ? (
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                                <input type="color" className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-0 cursor-pointer" defaultValue={item.value} onBlur={(e) => { if (e.target.value !== item.value) handleSave(item.key, e.target.value); }} />
                                            </div>
                                            <input type="text" className="w-32 p-3 border border-gray-200 rounded-lg text-sm font-mono uppercase focus:ring-1 focus:ring-silvoraa-gold outline-none" defaultValue={item.value} maxLength={7} onBlur={(e) => { if (e.target.value !== item.value) handleSave(item.key, e.target.value); }} />
                                        </div>
                                    ) : item.type === 'select' ? (
                                        <div className="relative">
                                            <select className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-silvoraa-gold focus:border-silvoraa-gold outline-none transition-all appearance-none cursor-pointer" defaultValue={item.value} onChange={(e) => handleSave(item.key, e.target.value)}>
                                                {item.options?.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"><ChevronDown size={16} /></div>
                                        </div>
                                    ) : (
                                        <input type="text" className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-silvoraa-gold focus:border-silvoraa-gold outline-none transition-all" defaultValue={item.value} onBlur={(e) => { if (e.target.value !== item.value) handleSave(item.key, e.target.value); }} />
                                    )}

                                    <div className="mt-2 flex items-center justify-end h-6">
                                        {saving === item.key ? (
                                            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-green-600 flex items-center gap-1 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                                                <Save size={12} /> Saved
                                            </motion.span>
                                        ) : (
                                            <span className="text-xs text-silvoraa-warmGray/60 italic">auto-save enabled</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {filteredItems.length === 0 && (
                            <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">No editable content found for this section.</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
