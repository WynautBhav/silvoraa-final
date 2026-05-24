'use client';
import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Plus, Minus, PenTool, ShieldCheck, Sparkles, Gem, ChevronDown, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';

interface ParsedSection {
    title: string;
    content: string;
    type: 'intro' | 'features' | 'benefits' | 'style' | 'care';
}

interface ProductDescriptionProps {
    product: Product;
    mode?: 'main' | 'extras';
}

// Helper to fix HTML entities in titles (e.g., &amp; -> &)
const decodeHtmlEntities = (str: string) => {
    return str.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
};

// Helper to parse the raw HTML into structured data (LEGACY FALLBACK)
const parseProductHtml = (html: string): ParsedSection[] => {
    const sections: ParsedSection[] = [];
    const regex = /<h2>\s*<strong>\s*(.*?):?\s*<\/strong>\s*<\/h2>([\s\S]*?)(?=<h2>|$)/g;

    let match;
    while ((match = regex.exec(html)) !== null) {
        const rawTitle = match[1].trim().replace(/:$/, '');
        const title = decodeHtmlEntities(rawTitle);
        let content = match[2].trim();

        let type: ParsedSection['type'] = 'care'; // Default

        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('description')) {
            type = 'intro';
        } else if (lowerTitle.includes('features')) {
            type = 'features';
        } else if (lowerTitle.includes('benefits')) {
            type = 'benefits';
        } else if (lowerTitle.includes('style')) {
            type = 'style';
        } else if (lowerTitle.includes('variation') || lowerTitle.includes('care')) {
            type = 'care';
        }

        sections.push({ title, content, type });
    }
    return sections;
};

// Reusable Grid Component for bulleted lists (Specs & Benefits)
const BulletPointGrid: React.FC<{ items: string[]; columns?: number }> = ({ items, columns = 1 }) => {
    return (
        <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : ''} gap-5`}>
            {items.map((item, idx) => {
                const parts = item.split(':');
                const label = parts[0];
                const value = parts.slice(1).join(':');

                return (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50/50 hover:bg-white rounded-xl border border-gray-100/50 hover:border-gray-200 transition-colors">
                        <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-silvoraa-gold" />
                        <div className="text-sm leading-relaxed text-silvoraa-warmGray w-full">
                            {value ? (
                                <>
                                    <span className="font-bold text-silvoraa-black uppercase tracking-wide text-xs block mb-1">{label}</span>
                                    {value}
                                </>
                            ) : (
                                item
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Component for beautiful vertical lists (Care & Variation)
const EditorialList: React.FC<{ content: string; isHtml?: boolean }> = ({ content, isHtml }) => {
    const items = isHtml
        ? content.replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ').split('•').map(l => decodeHtmlEntities(l.trim())).filter(l => l.length > 5)
        : content.split('\n').filter(l => l.trim().length > 0);

return (
        <div className="flex flex-col gap-4">
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 group">
                    <div className="flex-shrink-0 mt-1.5 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-silvoraa-gold" />
                    </div>
                    <p className="text-sm leading-relaxed text-silvoraa-warmGray group-hover:text-silvoraa-black transition-colors">
                        {item}
                    </p>
                </div>
            ))}
        </div>
    );
};

// Accordion Section Component
interface AccordionSectionProps {
    title: string;
    icon?: React.ReactNode;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, icon, defaultOpen = false, children }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    React.useEffect(() => {
        setIsOpen(defaultOpen);
    }, [defaultOpen]);

    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-50/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon && <span className="text-silvoraa-gold">{icon}</span>}
                    <span className="text-base md:text-lg font-bold uppercase tracking-[0.15em] text-silvoraa-black">
                        {title}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                >
                    <ChevronDown className="w-5 h-5 text-silvoraa-warmGray" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 md:px-6 pb-6">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Main Info Component
export const ProductDescriptionMain: React.FC<ProductDescriptionProps> = ({ product }) => {
    // Check if new structured data is populated
    const hasStructuredData = !!product.description_text;

    if (hasStructuredData) {
        // --- RENDER NEW STRUCTURED DATA ---
        return (
            <div className="mt-8 mb-8">
                {/* Intro */}
                {product.description_text && (
                    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <p className="text-lg leading-relaxed text-silvoraa-warmGray font-light">
                            {product.description_text}
                        </p>
                    </div>
                )}

                {/* Specs */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 mb-4">
                        <AccordionSection title="Specifications" icon={<Gem className="w-5 h-5" />} defaultOpen={true}>
                            <BulletPointGrid
                                items={Object.entries(product.specifications).map(([k, v]) => `${k}: ${v}`)}
                                columns={2}
                            />
                        </AccordionSection>
                    </div>
                )}

                {/* Benefits */}
                {product.stone_benefits && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 mb-4">
                        <AccordionSection title="Gemstone Benefits" icon={<Sparkles className="w-5 h-5" />} defaultOpen={false}>
                            <BulletPointGrid items={product.stone_benefits.split('\n').filter(l => l.trim().length > 0)} columns={1} />
                        </AccordionSection>
                    </div>
                )}

                {/* Care Guide / Good to Know */}
                {product.care_guide && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <AccordionSection title="Good to Know" icon={<Info className="w-5 h-5" />} defaultOpen={false}>
                            <EditorialList content={product.care_guide} />
                        </AccordionSection>
                    </div>
                )}
            </div>
        );

    } else {
        // --- FALLBACK TO LEGACY HTML / PLAIN TEXT ---
        // This keeps existing products working until they are migrated
        const sections = parseProductHtml(product.description || '');
        const intro = sections.find(s => s.type === 'intro');
        const features = sections.find(s => s.type === 'features');
        const benefits = sections.find(s => s.type === 'benefits');
        const care = sections.find(s => s.type === 'care');

        // Helper to extract items from legacy HTML content for BulletPointGrid
        const getItemsFromHtml = (html: string) => {
            return html.replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ').split('•').map(l => decodeHtmlEntities(l.trim())).filter(l => l.length > 5);
        };

        // If no HTML sections were found but we have a description, show it as plain text
        const hasNoSections = !intro && !features && !benefits && !care;
        const hasDescription = product.description && product.description.trim().length > 0;

        return (
            <div className="mt-8 mb-8">
                {intro && (
                    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div
                            className="text-lg leading-relaxed text-silvoraa-warmGray font-light"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(intro.content) }}
                        />
                    </div>
                )}

                {/* Fallback: Display plain text description if no HTML sections found */}
                {hasNoSections && hasDescription && (
                    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <p className="text-lg leading-relaxed text-silvoraa-warmGray font-light whitespace-pre-line">
                            {product.description}
                        </p>
                    </div>
                )}

                {features && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 mb-4">
                        <AccordionSection title="Specifications" icon={<Gem className="w-5 h-5" />} defaultOpen={true}>
                            <BulletPointGrid items={getItemsFromHtml(features.content)} columns={2} />
                        </AccordionSection>
                    </div>
                )}

                {benefits && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 mb-4">
                        <AccordionSection title="Gemstone Benefits" icon={<Sparkles className="w-5 h-5" />} defaultOpen={false}>
                            <BulletPointGrid items={getItemsFromHtml(benefits.content)} columns={1} />
                        </AccordionSection>
                    </div>
                )}

                {care && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <AccordionSection title="Good to Know" icon={<Info className="w-5 h-5" />} defaultOpen={false}>
                            <EditorialList content={care.content} isHtml={true} />
                        </AccordionSection>
                    </div>
                )}
            </div>
        );
    }
};

// Extra Details Component (Style section only)
export const ProductDescriptionExtras: React.FC<ProductDescriptionProps> = ({ product }) => {
    const hasStructuredData = !!product.description_text;
    let content = '';

    if (product.stylist_note) {
        content = product.stylist_note;
    } else if (hasStructuredData) {
        content = product.style_note || '';
    } else {
        const sections = parseProductHtml(product.description || '');
        const styleSection = sections.find(s => s.type === 'style');
        content = styleSection ? styleSection.content.replace(/<[^>]+>/g, '') : '';
    }

    if (!content) return null;

    return (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {/* Stylist's Note Design for 'How to Style' */}
            <div className="relative p-10 bg-[#FAF9F6] rounded-2xl">
                {/* Decorative Quote mark */}
                <span className="absolute top-6 left-6 text-6xl font-serif text-silvoraa-gold/20 leading-none">"</span>

                <h3 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-silvoraa-gold mb-6 relative z-10">
                    <Sparkles className="w-4 h-4" />
                    Stylist's Note
                </h3>

                <div
                    className="relative z-10 text-xl md:text-2xl font-serif italic text-silvoraa-black leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                />

                <div className="mt-6 flex items-center gap-2">
                    <div className="h-px w-8 bg-silvoraa-black/20" />
                    <span className="text-[10px] uppercase tracking-widest text-silvoraa-warmGray font-medium">Silvoraa Stylist</span>
                </div>
            </div>
        </div>
    );
};
