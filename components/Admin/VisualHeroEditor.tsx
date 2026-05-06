'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useConfig } from '@/components/Config/ConfigProvider';
import { 
    Move, Smartphone, Monitor, Save, Plus, Trash2, AlignLeft, 
    AlignCenter, AlignRight, Type, Bold, MousePointer2, Settings, 
    Layers, ChevronDown, ChevronRight, Wand2, Palette
} from 'lucide-react';
import { ImageUploadButton } from './ImageUploadButton';
import { ResizeHandle } from './ResizeHandle';
import { SliderControl } from './SliderControl';
import { motion, AnimatePresence } from 'framer-motion';

type ViewMode = 'desktop' | 'mobile';

interface Layer {
    id: string;
    type: 'text' | 'button';
    content: string;
    font: string;
    fontSize: number;
    fontWeight: string;
    color: string;
    x: number;
    y: number;
    align: 'left' | 'center' | 'right';
    letterSpacing?: string;
    padding?: string;
    borderRadius?: string;
    backgroundColor?: string;
    link?: string;
    maxWidth?: number;
    textTransform?: 'none' | 'uppercase' | 'lowercase';
}

const GOOGLE_FONTS = [
    { label: 'Playfair Display', value: 'font-serif' },
    { label: 'Inter', value: 'font-sans' },
    { label: 'Montserrat', value: 'font-montserrat' },
    { label: 'Lora', value: 'font-lora' },
    { label: 'Outfit', value: 'font-outfit' },
    { label: 'Bodoni Moda', value: 'font-bodoni' },
    { label: 'Cormorant Garamond', value: 'font-cormorant' },
    { label: 'Jost', value: 'font-jost' },
    { label: 'Unbounded', value: 'font-unbounded' },
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const toNumber = (value: string | undefined, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};
const normalizeMultilineText = (value: string) => {
    return value
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>\s*<p>/gi, '\n\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();
};

export const VisualHeroEditor: React.FC = () => {
    const { config, updateConfig } = useConfig();
    const [activeSlide, setActiveSlide] = useState(1);
    const [viewMode, setViewMode] = useState<ViewMode>('desktop');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
    const [layers, setLayers] = useState<Layer[]>([]);
    const [zoomMode, setZoomMode] = useState<'fit' | 'actual'>('fit');

    const containerRef = useRef<HTMLDivElement>(null);
    const layerContainerRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLImageElement>(null);
    const previewValueRef = useRef({ x: 50, y: 45, scale: 100 });

    const panState = useRef({ active: false, startX: 0, startY: 0, originX: 50, originY: 50, nextX: 50, nextY: 50 });
    const layerDragState = useRef({ active: false, layerId: '', startX: 0, startY: 0, originX: 50, originY: 50, nextX: 50, nextY: 50 });
    const resizeState = useRef({ active: false, startScale: 100, nextScale: 100 });

    const slideKey = useCallback((suffix: string) => `hero_${activeSlide}_${suffix}`, [activeSlide]);

    // Initialize layers with migration logic
    useEffect(() => {
        const layersJson = config[`hero_${activeSlide}_layers`];
        if (layersJson) {
            try {
                setLayers(JSON.parse(layersJson));
                return;
            } catch (e) {
                console.error('Failed to parse layers JSON', e);
            }
        }

        // Migration from legacy keys
        const title = normalizeMultilineText(config[`hero_${activeSlide}_title`] || 'Banner Title');
        const titleSize = toNumber(config[`hero_${activeSlide}_title_size`], 72);
        const titleColor = config[`hero_${activeSlide}_title_color`] || '#1A1A1A';
        const titleFont = config[`hero_${activeSlide}_title_font`] || 'font-serif';
        const align = (config[`hero_${activeSlide}_align`] || 'center') as any;
        const top = toNumber(config[`hero_${activeSlide}_top`], 50);
        const left = toNumber(config[`hero_${activeSlide}_left`], 50);

        const subtitle = normalizeMultilineText(config[`hero_${activeSlide}_subtitle`] || 'Subtitle Text');
        const subtitleSize = toNumber(config[`hero_${activeSlide}_subtitle_size`], 14);

        const ctaText = config[`hero_${activeSlide}_cta`] || 'SHOP ALL';
        const ctaLink = config[`hero_${activeSlide}_link`] || '/shop';

        const migrated: Layer[] = [
            {
                id: `title-${activeSlide}`,
                type: 'text',
                content: title,
                font: titleFont,
                fontSize: titleSize,
                fontWeight: '900',
                color: titleColor,
                x: left,
                y: top - 5,
                align: align,
                maxWidth: 896
            },
            {
                id: `subtitle-${activeSlide}`,
                type: 'text',
                content: subtitle,
                font: 'font-sans',
                fontSize: subtitleSize,
                fontWeight: '800', // extrabold
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(26, 26, 26, 0.7)',
                x: left,
                y: top + 15,
                align: align,
                maxWidth: 896
            },
            {
                id: `button-${activeSlide}`,
                type: 'button',
                content: ctaText,
                font: 'font-sans',
                fontSize: 14,
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#ffffff',
                backgroundColor: '#1A1A1A',
                padding: '24px 56px',
                borderRadius: '0px',
                link: ctaLink,
                x: left,
                y: top + 30,
                align: align
            }
        ];

        setLayers(migrated);
        
        // Auto-persist migration result if it's the first time
        if (!layersJson) {
            updateConfig(`hero_${activeSlide}_layers`, JSON.stringify(migrated));
        }
    }, [activeSlide, config, updateConfig]);

    const mediaKey = viewMode === 'desktop' ? slideKey('media') : slideKey('mobile_media');
    const posXKey = viewMode === 'desktop' ? slideKey('media_pos_x') : slideKey('mobile_pos_x');
    const posYKey = viewMode === 'desktop' ? slideKey('media_pos_y') : slideKey('mobile_pos_y');
    const scaleKey = viewMode === 'desktop' ? slideKey('media_scale') : slideKey('mobile_scale');
    const heightKey = viewMode === 'desktop' ? slideKey('height') : slideKey('mobile_height');

    const desktopMedia = config[slideKey('media')] || '/images/placeholder.jpg';
    const mobileMedia = config[slideKey('mobile_media')] || desktopMedia;
    const currentMedia = (config[mediaKey] || (viewMode === 'mobile' ? desktopMedia : '/images/placeholder.jpg'));

    const currentPosX = toNumber(config[posXKey], 50);
    const currentPosY = toNumber(config[posYKey], 45);
    const currentScale = clamp(toNumber(config[scaleKey], 100), 100, 300);
    const currentHeight = clamp(toNumber(config[heightKey], viewMode === 'desktop' ? 600 : 500), 300, 900);
    const currentOverlay = clamp(toNumber(config[slideKey('overlay_opacity')], 0), 0, 80);

    const [preview, setPreview] = useState({ x: currentPosX, y: currentPosY, scale: currentScale });

    useEffect(() => {
        setPreview({ x: currentPosX, y: currentPosY, scale: currentScale });
    }, [activeSlide, viewMode, currentPosX, currentPosY, currentScale]);

    const applyPreviewStyle = useCallback((x: number, y: number, scale: number) => {
        if (!previewRef.current) return;
        previewRef.current.style.objectPosition = `${x}% ${y}%`;
        previewRef.current.style.transform = `scale(${scale / 100})`;
    }, []);

    useEffect(() => {
        applyPreviewStyle(preview.x, preview.y, preview.scale);
    }, [preview, applyPreviewStyle]);

    const persistLayers = (newLayers: Layer[]) => {
        updateConfig(`hero_${activeSlide}_layers`, JSON.stringify(newLayers));
    };

    const handleCanvasPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        if ((event.target as HTMLElement).closest('.layer-item')) return;
        
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        panState.current = {
            active: true,
            startX: event.clientX,
            startY: event.clientY,
            originX: preview.x,
            originY: preview.y,
            nextX: preview.x,
            nextY: preview.y,
        };
    };

    const handleCanvasPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!panState.current.active || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const dx = ((event.clientX - panState.current.startX) / rect.width) * 100;
        const dy = ((event.clientY - panState.current.startY) / rect.height) * 100;

        const nextX = clamp(panState.current.originX - dx, 0, 100);
        const nextY = clamp(panState.current.originY - dy, 0, 100);

        panState.current.nextX = nextX;
        panState.current.nextY = nextY;
        applyPreviewStyle(nextX, nextY, preview.scale);
    };

    const handleCanvasPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!panState.current.active) return;
        panState.current.active = false;
        setPreview(prev => ({ ...prev, x: panState.current.nextX, y: panState.current.nextY }));
        updateConfig(posXKey, String(Math.round(panState.current.nextX)));
        updateConfig(posYKey, String(Math.round(panState.current.nextY)));
    };

    const handleLayerPointerDown = (event: React.PointerEvent, layerId: string) => {
        event.preventDefault();
        event.stopPropagation();
        setSelectedLayerId(layerId);
        
        const layer = layers.find(l => l.id === layerId);
        if (!layer || !containerRef.current) return;

        const target = event.currentTarget as HTMLElement;
        target.setPointerCapture(event.pointerId);

        layerDragState.current = {
            active: true,
            layerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: layer.x,
            originY: layer.y,
            nextX: layer.x,
            nextY: layer.y,
        };
    };

    const handleLayerPointerMove = (event: React.PointerEvent) => {
        if (!layerDragState.current.active || !layerContainerRef.current) return;

        const rect = layerContainerRef.current.getBoundingClientRect();
        const dx = ((event.clientX - layerDragState.current.startX) / rect.width) * 100;
        const dy = ((event.clientY - layerDragState.current.startY) / rect.height) * 100;

        const nextX = clamp(layerDragState.current.originX + dx, 0, 100);
        const nextY = clamp(layerDragState.current.originY + dy, 0, 100);

        layerDragState.current.nextX = nextX;
        layerDragState.current.nextY = nextY;

        setLayers(prev => prev.map(l => 
            l.id === layerDragState.current.layerId ? { ...l, x: nextX, y: nextY } : l
        ));
    };

    const handleLayerPointerUp = (_event?: React.PointerEvent) => {
        if (!layerDragState.current.active) return;
        const { layerId, nextX, nextY } = layerDragState.current;
        layerDragState.current.active = false;
        setLayers(prev => {
            const updated = prev.map(l =>
                l.id === layerId ? { ...l, x: nextX, y: nextY } : l
            );
            persistLayers(updated);
            return updated;
        });
    };

    const addLayer = (type: 'text' | 'button') => {
        const newLayer: Layer = {
            id: `layer-${Date.now()}`,
            type,
            content: type === 'text' ? 'New Text Layer' : 'SHOP ALL',
            font: 'font-sans',
            fontSize: type === 'text' ? 24 : 14,
            fontWeight: type === 'text' ? '600' : 'bold',
            color: '#1A1A1A',
            x: 50,
            y: 50,
            align: 'center',
            maxWidth: 896,
            ...(type === 'button' ? { 
                backgroundColor: '#1A1A1A', 
                color: '#FFFFFF',
                padding: '24px 56px',
                borderRadius: '0px',
                link: '/shop'
            } : {})
        };
        const updated = [...layers, newLayer];
        setLayers(updated);
        setSelectedLayerId(newLayer.id);
        persistLayers(updated);
    };

    const removeLayer = (id: string) => {
        const updated = layers.filter(l => l.id !== id);
        setLayers(updated);
        setSelectedLayerId(null);
        persistLayers(updated);
    };

    const updateLayer = (id: string, updates: Partial<Layer>) => {
        const updated = layers.map(l => l.id === id ? { ...l, ...updates } : l);
        setLayers(updated);
        persistLayers(updated);
    };

    const [zoom, setZoom] = useState(1);
    const viewportRef = useRef<HTMLDivElement>(null);

    // Keep desktop editing near full scale for precision, allow scroll instead of over-shrinking.
    useEffect(() => {
        const updateZoom = () => {
            if (!viewportRef.current) return;
            const padding = isFullscreen ? 120 : 64; 
            const availableWidth = viewportRef.current.clientWidth - padding;
            const availableHeight = viewportRef.current.clientHeight - padding;
            const targetWidth = viewMode === 'mobile' ? 375 : 1440;
            const targetHeight = viewMode === 'mobile' ? 812 : 900; // Simulated full screen height

            if (zoomMode === 'actual') {
                setZoom(1);
                return;
            }

            const newZoom = Math.min(1, availableWidth / targetWidth, availableHeight / targetHeight);
            setZoom(newZoom);
        };

        const observer = new ResizeObserver(updateZoom);
        if (viewportRef.current) observer.observe(viewportRef.current);
        updateZoom();
        return () => observer.disconnect();
    }, [viewMode, isFullscreen, zoomMode]);

    const selectedLayer = layers.find(l => l.id === selectedLayerId);

    return (
        <div className={`bg-white shadow-2xl overflow-hidden flex flex-col border border-gray-100 transition-all duration-500 ease-in-out ${isFullscreen ? 'fixed inset-0 z-[100] rounded-0' : 'rounded-2xl h-[900px]'}`}>
            {/* Header */}
            <div className="bg-silvoraa-black p-4 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-silvoraa-gold rounded-lg flex items-center justify-center">
                            <Wand2 className="w-5 h-5 text-black" />
                        </div>
                        <h3 className="font-serif text-lg tracking-tight">Hero Studio</h3>
                    </div>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
                        <button 
                            onClick={() => setViewMode('desktop')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'desktop' ? 'bg-white text-silvoraa-black shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            <Monitor className="w-3.5 h-3.5" /> Desktop
                        </button>
                        <button 
                            onClick={() => setViewMode('mobile')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'mobile' ? 'bg-white text-silvoraa-black shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            <Smartphone className="w-3.5 h-3.5" /> Mobile
                        </button>
                    </div>
                    <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10 group">
                        <button 
                            onClick={() => setZoomMode('fit')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-widest transition-all ${zoomMode === 'fit' ? 'bg-white text-silvoraa-black shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                        >
                            Fit
                        </button>
                        <button 
                            onClick={() => setZoomMode('actual')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-widest transition-all ${zoomMode === 'actual' ? 'bg-white text-silvoraa-black shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                        >
                            100%
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden p-1">
                        {[1, 2, 3].map(num => (
                            <button
                                key={num}
                                onClick={() => setActiveSlide(num)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeSlide === num ? 'bg-silvoraa-gold text-black shadow-lg' : 'text-white/40 hover:text-white/70'}`}
                            >
                                Slide {num}
                            </button>
                        ))}
                    </div>
                    <div className="h-6 w-px bg-white/10" />
                    <button 
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className={`p-2 rounded-xl transition-all ${isFullscreen ? 'bg-silvoraa-gold text-black' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}
                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullscreen ? <ChevronDown className="w-5 h-5" /> : <Plus className="w-5 h-5 rotate-45 scale-125" />}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Layers */}
                <div className="w-60 bg-gray-50 border-r border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5" /> Layers
                        </h4>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => addLayer('text')}
                                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                                title="Add Text"
                            >
                                <Type className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => addLayer('button')}
                                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                                title="Add Button"
                            >
                                <MousePointer2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        <AnimatePresence initial={false}>
                            {layers.map((layer, idx) => (
                                <motion.div
                                    key={layer.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onClick={() => setSelectedLayerId(layer.id)}
                                    className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                                        selectedLayerId === layer.id 
                                        ? 'bg-white border-silvoraa-gold shadow-md shadow-silvoraa-gold/10' 
                                        : 'bg-transparent border-transparent hover:bg-white/50 hover:border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                            selectedLayerId === layer.id ? 'bg-silvoraa-gold/10 text-silvoraa-gold' : 'bg-gray-200 text-gray-400'
                                        }`}>
                                            {layer.type === 'text' ? <Type size={14} /> : <MousePointer2 size={14} />}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className={`text-xs font-bold truncate ${selectedLayerId === layer.id ? 'text-gray-900' : 'text-gray-500'}`}>
                                                {layer.content || 'Untitled'}
                                            </p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                                                {layer.type} layer
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); removeLayer(layer.id); }}
                                        className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 rounded-md transition-all text-gray-300"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="bg-silvoraa-gold/5 rounded-xl p-3 border border-silvoraa-gold/10">
                            <p className="text-[10px] text-silvoraa-gold font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                                <Settings className="w-3 h-3" /> Canvas Help
                            </p>
                            <p className="text-[10px] text-gray-500 leading-relaxed">
                                Drag layers to position. Click empty space to pan the background image.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Canvas Viewport */}
                <div 
                    className="flex-1 relative bg-[#FBFBFB] overflow-auto select-none"
                    ref={viewportRef}
                >
                    <div 
                        className="min-h-full min-w-full flex items-center justify-center p-8 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:32px_32px] overflow-visible"
                        onPointerDown={handleCanvasPointerDown}
                        onPointerMove={(e) => {
                            handleCanvasPointerMove(e);
                            handleLayerPointerMove(e);
                        }}
                        onPointerUp={(e) => {
                            handleCanvasPointerUp(e);
                            handleLayerPointerUp(e);
                        }}
                        onPointerCancel={(e) => {
                            handleCanvasPointerUp(e);
                            handleLayerPointerUp(e);
                        }}
                    >
                        <div
                            ref={containerRef}
                            className="relative shrink-0 bg-white shadow-2xl overflow-hidden ring-1 ring-black/5 origin-center transition-transform duration-300 ease-out"
                            style={{
                                width: viewMode === 'mobile' ? '375px' : '1440px',
                                height: viewMode === 'mobile' ? '812px' : '900px', // Simulated full screen height
                                transform: `scale(${zoom})`,
                            }}
                        >
                            {/* Background Image Container */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    ref={previewRef}
                                    src={currentMedia}
                                    className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300"
                                    alt="Preview"
                                />
                            </div>

                            {currentOverlay > 0 && (
                                <div className="absolute inset-0 z-10 bg-black pointer-events-none" style={{ opacity: currentOverlay / 100 }} />
                            )}

                            {/* Content Container (Matches HeroSection.tsx) */}
                            <div className="absolute inset-0 z-20 pointer-events-none flex justify-center">
                                <div 
                                    ref={layerContainerRef}
                                    className="relative w-full h-full"
                                    style={{ 
                                        maxWidth: viewMode === 'mobile' ? '375px' : '1200px',
                                        '--layer-scale': viewMode === 'mobile' ? '0.6' : '1' 
                                    } as React.CSSProperties}
                                >
                                    {/* Render Layers */}
                                    {layers.map((layer) => (
                                        <div
                                            key={layer.id}
                                            onPointerDown={(e) => handleLayerPointerDown(e, layer.id)}
                                            className={`layer-item absolute z-20 cursor-grab active:cursor-grabbing group/layer pointer-events-auto ${selectedLayerId === layer.id ? 'ring-2 ring-silvoraa-gold ring-offset-2 ring-offset-transparent' : ''}`}
                                            style={{
                                                top: `${layer.y}%`,
                                                left: `${layer.x}%`,
                                                transform: 'translate(-50%, -50%)',
                                                textAlign: layer.align,
                                                maxWidth: layer.maxWidth ? `${layer.maxWidth}px` : '100%',
                                                width: 'max-content'
                                            }}
                                        >
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-silvoraa-gold text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter text-black opacity-0 group-hover/layer:opacity-100 transition-opacity whitespace-nowrap">
                                                {layer.type}
                                            </div>
                                            
                                            {layer.type === 'text' ? (
                                                <div 
                                                    className={`${layer.font} leading-[0.9] whitespace-pre-line drop-shadow-2xl`}
                                                    style={{ 
                                                        fontSize: `calc(${layer.fontSize}px * var(--layer-scale, 1))`, 
                                                        color: layer.color,
                                                        fontWeight: layer.fontWeight,
                                                        letterSpacing: layer.letterSpacing || 'normal',
                                                        textTransform: layer.textTransform || 'none'
                                                    }}
                                                >
                                                    {layer.content}
                                                </div>
                                            ) : (
                                                <button
                                                    className="inline-block pointer-events-none shadow-xl hover:shadow-2xl"
                                                    style={{
                                                        backgroundColor: layer.backgroundColor,
                                                        color: layer.color,
                                                        padding: layer.padding || '12px 24px',
                                                        borderRadius: layer.borderRadius || '100px',
                                                        fontSize: `calc(${layer.fontSize || 14}px * var(--layer-scale, 1))`,
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.2em'
                                                    }}
                                                >
                                                    {layer.content}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Properties */}
                <div className="w-72 bg-white border-l border-gray-100 flex flex-col shadow-xl z-30">
                    <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-gray-400" />
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Properties</h4>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {selectedLayer ? (
                                <motion.div
                                    key={selectedLayer.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="p-6 space-y-8"
                                >
                                    {/* Content Field */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                            <Type className="w-3 h-3" /> Content
                                        </label>
                                        <textarea
                                            value={selectedLayer.content}
                                            onChange={(e) => updateLayer(selectedLayer.id, { content: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-silvoraa-gold/20 focus:border-silvoraa-gold outline-none transition-all resize-none h-24 font-medium"
                                        />
                                    </div>

                                    {/* Font Selection */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                            <Type className="w-3 h-3" /> Font Family
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={selectedLayer.font}
                                                onChange={(e) => updateLayer(selectedLayer.id, { font: e.target.value })}
                                                className="w-full p-3 pl-4 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none appearance-none font-medium text-gray-700 cursor-pointer hover:border-gray-300 transition-colors"
                                            >
                                                {GOOGLE_FONTS.map(f => (
                                                    <option key={f.value} value={f.value} className={f.value}>{f.label}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Letter Spacing */}
                                    <SliderControl 
                                        label="Letter Spacing" 
                                        value={toNumber(selectedLayer.letterSpacing?.replace('px', ''), 0)} 
                                        min={-5} max={20} unit="px"
                                        onChange={(v) => updateLayer(selectedLayer.id, { letterSpacing: `${v}px` })} 
                                    />

                                    {/* Sizing Controls */}
                                    <SliderControl 
                                        label="Font Size" 
                                        value={selectedLayer.fontSize} 
                                        min={12} max={180} unit="px"
                                        onChange={(v) => updateLayer(selectedLayer.id, { fontSize: v })} 
                                    />

                                    {/* Color & Alignment */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Color</label>
                                            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded-xl">
                                                <input
                                                    type="color"
                                                    value={selectedLayer.color}
                                                    onChange={(e) => updateLayer(selectedLayer.id, { color: e.target.value })}
                                                    className="w-8 h-8 rounded-lg border-0 p-0 cursor-pointer overflow-hidden"
                                                />
                                                <span className="text-[10px] font-mono text-gray-500 uppercase">{selectedLayer.color}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Align</label>
                                            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                                                {(['left', 'center', 'right'] as const).map(a => (
                                                    <button
                                                        key={a}
                                                        onClick={() => updateLayer(selectedLayer.id, { align: a })}
                                                        className={`flex-1 p-2 rounded-lg transition-all ${selectedLayer.align === a ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                                    >
                                                        {a === 'left' && <AlignLeft className="w-4 h-4 mx-auto" />}
                                                        {a === 'center' && <AlignCenter className="w-4 h-4 mx-auto" />}
                                                        {a === 'right' && <AlignRight className="w-4 h-4 mx-auto" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Transform & Width */}
                                    {selectedLayer.type === 'text' && (
                                        <>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Case</label>
                                                <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                                                    {(['none', 'uppercase', 'lowercase'] as const).map(t => (
                                                        <button
                                                            key={t}
                                                            onClick={() => updateLayer(selectedLayer.id, { textTransform: t })}
                                                            className={`flex-1 p-2 text-[10px] font-bold uppercase rounded-lg transition-all ${selectedLayer.textTransform === t || (!selectedLayer.textTransform && t === 'none') ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                                        >
                                                            {t === 'none' ? 'Aa' : t === 'uppercase' ? 'AA' : 'aa'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <SliderControl 
                                                label="Max Width" 
                                                value={selectedLayer.maxWidth || 1200} 
                                                min={200} max={1200} unit="px"
                                                onChange={(v) => updateLayer(selectedLayer.id, { maxWidth: v })} 
                                            />
                                        </>
                                    )}

                                     {selectedLayer.type === 'button' && (
                                        <div className="space-y-6 pt-4 border-t border-gray-100">
                                             <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Button BG</label>
                                                <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded-xl">
                                                    <input
                                                        type="color"
                                                        value={selectedLayer.backgroundColor}
                                                        onChange={(e) => updateLayer(selectedLayer.id, { backgroundColor: e.target.value })}
                                                        className="w-8 h-8 rounded-lg border-0 p-0 cursor-pointer"
                                                    />
                                                    <span className="text-[10px] font-mono uppercase">{selectedLayer.backgroundColor}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Button Link</label>
                                                <input
                                                    type="text"
                                                    value={selectedLayer.link || ''}
                                                    onChange={(e) => updateLayer(selectedLayer.id, { link: e.target.value })}
                                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none font-medium"
                                                    placeholder="/shop"
                                                />
                                            </div>

                                            <SliderControl 
                                                label="Radius" 
                                                value={toNumber(selectedLayer.borderRadius?.replace('px',''), 0)} 
                                                min={0} max={50} unit="px"
                                                onChange={(v) => updateLayer(selectedLayer.id, { borderRadius: `${v}px` })} 
                                            />
                                        </div>
                                    )}

                                    {/* Global Slide Settings Toggle */}
                                    <div className="pt-8 space-y-6 border-t border-gray-50">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Slide Settings</p>
                                        <SliderControl 
                                            label="Overlay" 
                                            value={currentOverlay} 
                                            min={0} max={80} unit="%"
                                            onChange={(v) => updateConfig(slideKey('overlay_opacity'), String(v))} 
                                        />
                                        
                                        <ImageUploadButton
                                            label={viewMode === 'desktop' ? "Desktop Background" : "Mobile Background"}
                                            currentUrl={currentMedia}
                                            onUpload={(url) => updateConfig(mediaKey, url)}
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-300">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <MousePointer2 className="w-8 h-8" />
                                    </div>
                                    <p className="text-sm font-medium">Select a layer to edit properties</p>
                                    <p className="text-xs mt-2">Or add a new text or button layer from the sidebar.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                         <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <Save className="w-3.5 h-3.5" /> Auto-Saving
                         </span>
                         <span className="text-[10px] text-gray-400 font-mono">v2.0 PRO</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
