'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { databases, APPWRITE_CONFIG } from '@/lib/appwrite';
import { useAuth } from '@/components/Auth/AuthContext';
import { ID, Query, AppwriteException } from 'appwrite';
import { ConfigErrorOverlay } from '../UI/ConfigErrorOverlay';

interface ConfigItem {
    key: string;
    value: string;
    section: string;
    label: string;
    type: 'text' | 'image' | 'link' | 'boolean' | 'color' | 'select' | 'number';
    options?: { label: string; value: string }[]; // For select type
}

interface ConfigContextType {
    config: Record<string, string>;
    isLoading: boolean;
    updateConfig: (key: string, value: string) => Promise<void>;
    items: ConfigItem[];
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Define the comprehensive schema for the site
const CONFIG_SCHEMA: ConfigItem[] = [
    // --- Header ---
    { key: 'announcement_bar', section: 'Header', label: 'Announcement Bar', type: 'text', value: 'Free Shipping on Orders Over ₹2000 | Lifetime Warranty' },

    // --- Hero Slide 1 ---
    { key: 'hero_1_title', section: 'Hero Slide 1', label: 'Title', type: 'text', value: '' },
    { key: 'hero_1_title_color', section: 'Hero Slide 1', label: 'Title Color', type: 'color', value: '#1A1A1A' },
    {
        key: 'hero_1_title_font',
        section: 'Hero Slide 1',
        label: 'Title Font',
        type: 'select',
        value: 'font-serif',
        options: [
            { label: 'Serif (Premium)', value: 'font-serif' },
            { label: 'Sans (Modern)', value: 'font-sans' }
        ]
    },
    { key: 'hero_1_subtitle', section: 'Hero Slide 1', label: 'Subtitle', type: 'text', value: '' },
    { key: 'hero_1_media', section: 'Hero Slide 1', label: 'Video/Image URL', type: 'image', value: '/images/B1.png' },
    { key: 'hero_1_cta', section: 'Hero Slide 1', label: 'CTA Text', type: 'text', value: 'Shop All' },
    { key: 'hero_1_cta_kicker', section: 'Hero Slide 1', label: 'CTA Kicker Text', type: 'text', value: '' },
    { key: 'hero_1_link', section: 'Hero Slide 1', label: 'Link URL', type: 'link', value: '/shop' },
    { key: 'hero_1_top', section: 'Hero Slide 1', label: 'Position Top (%)', type: 'number', value: '75' },
    { key: 'hero_1_left', section: 'Hero Slide 1', label: 'Position Left (%)', type: 'number', value: '15' },
    { key: 'hero_1_mobile_top', section: 'Hero Slide 1', label: 'Mobile Top (%)', type: 'number', value: '80' },
    { key: 'hero_1_mobile_left', section: 'Hero Slide 1', label: 'Mobile Left (%)', type: 'number', value: '50' },
    { key: 'hero_1_trans_x', section: 'Hero Slide 1', label: 'Transform X (%)', type: 'number', value: '-50' },
    { key: 'hero_1_trans_y', section: 'Hero Slide 1', label: 'Transform Y (%)', type: 'number', value: '-50' },
    { key: 'hero_1_m_trans_x', section: 'Hero Slide 1', label: 'Mobile Transform X (%)', type: 'number', value: '-50' },
    { key: 'hero_1_m_trans_y', section: 'Hero Slide 1', label: 'Mobile Transform Y (%)', type: 'number', value: '-50' },

    // --- Hero Slide 2 ---
    { key: 'hero_2_title', section: 'Hero Slide 2', label: 'Title', type: 'text', value: '' },
    { key: 'hero_2_title_color', section: 'Hero Slide 2', label: 'Title Color', type: 'color', value: '#1A1A1A' },
    {
        key: 'hero_2_title_font',
        section: 'Hero Slide 2',
        label: 'Title Font',
        type: 'select',
        value: 'font-serif',
        options: [
            { label: 'Serif (Premium)', value: 'font-serif' },
            { label: 'Sans (Modern)', value: 'font-sans' }
        ]
    },
    { key: 'hero_2_subtitle', section: 'Hero Slide 2', label: 'Subtitle', type: 'text', value: '' },
    { key: 'hero_2_media', section: 'Hero Slide 2', label: 'Background Image', type: 'image', value: '/images/B2.png' },
    { key: 'hero_2_cta', section: 'Hero Slide 2', label: 'CTA Text', type: 'text', value: 'SHOP ALL' },
    { key: 'hero_2_cta_kicker', section: 'Hero Slide 2', label: 'CTA Kicker Text', type: 'text', value: '' },
    { key: 'hero_2_link', section: 'Hero Slide 2', label: 'Link URL', type: 'link', value: '/shop' },
    { key: 'hero_2_top', section: 'Hero Slide 2', label: 'Position Top (%)', type: 'number', value: '40' },
    { key: 'hero_2_left', section: 'Hero Slide 2', label: 'Position Left (%)', type: 'number', value: '40' },
    { key: 'hero_2_mobile_top', section: 'Hero Slide 2', label: 'Mobile Top (%)', type: 'number', value: '40' },
    { key: 'hero_2_mobile_left', section: 'Hero Slide 2', label: 'Mobile Left (%)', type: 'number', value: '50' },
    { key: 'hero_2_cta_top', section: 'Hero Slide 2', label: 'CTA Position Top (%)', type: 'number', value: '80' },
    { key: 'hero_2_cta_left', section: 'Hero Slide 2', label: 'CTA Position Left (%)', type: 'number', value: '80' },
    { key: 'hero_2_cta_mobile_top', section: 'Hero Slide 2', label: 'CTA Mobile Top (%)', type: 'number', value: '80' },
    { key: 'hero_2_cta_mobile_left', section: 'Hero Slide 2', label: 'CTA Mobile Left (%)', type: 'number', value: '50' },
    { key: 'hero_2_trans_x', section: 'Hero Slide 2', label: 'Transform X (%)', type: 'number', value: '0' },
    { key: 'hero_2_trans_y', section: 'Hero Slide 2', label: 'Transform Y (%)', type: 'number', value: '0' },
    { key: 'hero_2_m_trans_x', section: 'Hero Slide 2', label: 'Mobile Transform X (%)', type: 'number', value: '-50' },
    { key: 'hero_2_m_trans_y', section: 'Hero Slide 2', label: 'Mobile Transform Y (%)', type: 'number', value: '-50' },
    { key: 'hero_2_cta_trans_x', section: 'Hero Slide 2', label: 'CTA Transform X (%)', type: 'number', value: '-100' },
    { key: 'hero_2_cta_trans_y', section: 'Hero Slide 2', label: 'CTA Transform Y (%)', type: 'number', value: '-100' },
    { key: 'hero_2_cta_m_trans_x', section: 'Hero Slide 2', label: 'CTA Mobile Transform X (%)', type: 'number', value: '-50' },
    { key: 'hero_2_cta_m_trans_y', section: 'Hero Slide 2', label: 'CTA Mobile Transform Y (%)', type: 'number', value: '-50' },

    // --- Hero Slide 3 ---
    { key: 'hero_3_title', section: 'Hero Slide 3', label: 'Title', type: 'text', value: '' },
    { key: 'hero_3_title_color', section: 'Hero Slide 3', label: 'Title Color', type: 'color', value: '#1A1A1A' },
    {
        key: 'hero_3_title_font',
        section: 'Hero Slide 3',
        label: 'Title Font',
        type: 'select',
        value: 'font-serif',
        options: [
            { label: 'Serif (Premium)', value: 'font-serif' },
            { label: 'Sans (Modern)', value: 'font-sans' }
        ]
    },
    { key: 'hero_3_subtitle', section: 'Hero Slide 3', label: 'Subtitle', type: 'text', value: '' },
    { key: 'hero_3_media', section: 'Hero Slide 3', label: 'Background Image', type: 'image', value: '/images/B3.png' },
    { key: 'hero_3_cta', section: 'Hero Slide 3', label: 'CTA Text', type: 'text', value: 'SHOP ALL' },
    { key: 'hero_3_cta_kicker', section: 'Hero Slide 3', label: 'CTA Kicker Text', type: 'text', value: '' },
    { key: 'hero_3_link', section: 'Hero Slide 3', label: 'Link URL', type: 'link', value: '/shop' },
    { key: 'hero_3_top', section: 'Hero Slide 3', label: 'Position Top (%)', type: 'number', value: '35' },
    { key: 'hero_3_left', section: 'Hero Slide 3', label: 'Position Left (%)', type: 'number', value: '80' },
    { key: 'hero_3_mobile_top', section: 'Hero Slide 3', label: 'Mobile Top (%)', type: 'number', value: '40' },
    { key: 'hero_3_mobile_left', section: 'Hero Slide 3', label: 'Mobile Left (%)', type: 'number', value: '50' },
    { key: 'hero_3_trans_x', section: 'Hero Slide 3', label: 'Transform X (%)', type: 'number', value: '-100' },
    { key: 'hero_3_trans_y', section: 'Hero Slide 3', label: 'Transform Y (%)', type: 'number', value: '0' },
    { key: 'hero_3_m_trans_x', section: 'Hero Slide 3', label: 'Mobile Transform X (%)', type: 'number', value: '-50' },
    { key: 'hero_3_m_trans_y', section: 'Hero Slide 3', label: 'Mobile Transform Y (%)', type: 'number', value: '-50' },

    // --- Hero Visual Editor Extended Keys ---
    { key: 'hero_1_media_scale', section: 'Hero Slide 1', label: 'Image Scale (%)', type: 'number', value: '100' },
    { key: 'hero_1_media_pos_x', section: 'Hero Slide 1', label: 'Image Position X (%)', type: 'number', value: '50' },
    { key: 'hero_1_media_pos_y', section: 'Hero Slide 1', label: 'Image Position Y (%)', type: 'number', value: '45' },
    { key: 'hero_1_height', section: 'Hero Slide 1', label: 'Desktop Height (px)', type: 'number', value: '600' },
    { key: 'hero_1_overlay_opacity', section: 'Hero Slide 1', label: 'Overlay Opacity (%)', type: 'number', value: '0' },
    { key: 'hero_1_mobile_media', section: 'Hero Slide 1', label: 'Mobile Image URL', type: 'image', value: '/images/B1.png' },
    { key: 'hero_1_mobile_height', section: 'Hero Slide 1', label: 'Mobile Height (px)', type: 'number', value: '500' },
    { key: 'hero_1_mobile_scale', section: 'Hero Slide 1', label: 'Mobile Image Scale (%)', type: 'number', value: '100' },
    { key: 'hero_1_mobile_pos_x', section: 'Hero Slide 1', label: 'Mobile Image Position X (%)', type: 'number', value: '50' },
    { key: 'hero_1_mobile_pos_y', section: 'Hero Slide 1', label: 'Mobile Image Position Y (%)', type: 'number', value: '50' },
    { key: 'hero_1_title_size', section: 'Hero Slide 1', label: 'Title Size (px)', type: 'number', value: '72' },
    { key: 'hero_1_subtitle_size', section: 'Hero Slide 1', label: 'Subtitle Size (px)', type: 'number', value: '14' },
    {
        key: 'hero_1_align',
        section: 'Hero Slide 1',
        label: 'Text Align',
        type: 'select',
        value: 'center',
        options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' }
        ]
    },

    { key: 'hero_2_media_scale', section: 'Hero Slide 2', label: 'Image Scale (%)', type: 'number', value: '100' },
    { key: 'hero_2_media_pos_x', section: 'Hero Slide 2', label: 'Image Position X (%)', type: 'number', value: '50' },
    { key: 'hero_2_media_pos_y', section: 'Hero Slide 2', label: 'Image Position Y (%)', type: 'number', value: '45' },
    { key: 'hero_2_height', section: 'Hero Slide 2', label: 'Desktop Height (px)', type: 'number', value: '600' },
    { key: 'hero_2_overlay_opacity', section: 'Hero Slide 2', label: 'Overlay Opacity (%)', type: 'number', value: '0' },
    { key: 'hero_2_mobile_media', section: 'Hero Slide 2', label: 'Mobile Image URL', type: 'image', value: '/images/B2.png' },
    { key: 'hero_2_mobile_height', section: 'Hero Slide 2', label: 'Mobile Height (px)', type: 'number', value: '500' },
    { key: 'hero_2_mobile_scale', section: 'Hero Slide 2', label: 'Mobile Image Scale (%)', type: 'number', value: '100' },
    { key: 'hero_2_mobile_pos_x', section: 'Hero Slide 2', label: 'Mobile Image Position X (%)', type: 'number', value: '50' },
    { key: 'hero_2_mobile_pos_y', section: 'Hero Slide 2', label: 'Mobile Image Position Y (%)', type: 'number', value: '50' },
    { key: 'hero_2_title_size', section: 'Hero Slide 2', label: 'Title Size (px)', type: 'number', value: '72' },
    { key: 'hero_2_subtitle_size', section: 'Hero Slide 2', label: 'Subtitle Size (px)', type: 'number', value: '14' },
    {
        key: 'hero_2_align',
        section: 'Hero Slide 2',
        label: 'Text Align',
        type: 'select',
        value: 'center',
        options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' }
        ]
    },

    { key: 'hero_3_media_scale', section: 'Hero Slide 3', label: 'Image Scale (%)', type: 'number', value: '100' },
    { key: 'hero_3_media_pos_x', section: 'Hero Slide 3', label: 'Image Position X (%)', type: 'number', value: '50' },
    { key: 'hero_3_media_pos_y', section: 'Hero Slide 3', label: 'Image Position Y (%)', type: 'number', value: '45' },
    { key: 'hero_3_height', section: 'Hero Slide 3', label: 'Desktop Height (px)', type: 'number', value: '600' },
    { key: 'hero_3_overlay_opacity', section: 'Hero Slide 3', label: 'Overlay Opacity (%)', type: 'number', value: '0' },
    { key: 'hero_3_mobile_media', section: 'Hero Slide 3', label: 'Mobile Image URL', type: 'image', value: '/images/B3.png' },
    { key: 'hero_3_mobile_height', section: 'Hero Slide 3', label: 'Mobile Height (px)', type: 'number', value: '500' },
    { key: 'hero_3_mobile_scale', section: 'Hero Slide 3', label: 'Mobile Image Scale (%)', type: 'number', value: '100' },
    { key: 'hero_3_mobile_pos_x', section: 'Hero Slide 3', label: 'Mobile Image Position X (%)', type: 'number', value: '50' },
    { key: 'hero_3_mobile_pos_y', section: 'Hero Slide 3', label: 'Mobile Image Position Y (%)', type: 'number', value: '50' },
    { key: 'hero_3_title_size', section: 'Hero Slide 3', label: 'Title Size (px)', type: 'number', value: '72' },
    { key: 'hero_3_subtitle_size', section: 'Hero Slide 3', label: 'Subtitle Size (px)', type: 'number', value: '14' },
    {
        key: 'hero_3_align',
        section: 'Hero Slide 3',
        label: 'Text Align',
        type: 'select',
        value: 'center',
        options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' }
        ]
    },

    // --- Layer Persistence ---
    { key: 'hero_1_layers', section: 'Hero Layers', label: 'Slide 1 Layers', type: 'text', value: '' },
    { key: 'hero_2_layers', section: 'Hero Layers', label: 'Slide 2 Layers', type: 'text', value: '' },
    { key: 'hero_3_layers', section: 'Hero Layers', label: 'Slide 3 Layers', type: 'text', value: '' },
];

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<Record<string, string>>({});
    const [items, setItems] = useState<ConfigItem[]>([]);
    const [isLoading, setIsLoading] = useState(typeof document !== 'undefined');
    const [configError, setConfigError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        try {
            // Appwrite equivalent of supabase.from('site_config').select('*')
            const response = await databases.listDocuments(
                APPWRITE_CONFIG.databaseId,
                'site_config', // Collection name
                [Query.limit(100)]
            );
            
            const data = response.documents;

            // Merge DB data with Schema
            const mergedHelperMap: Record<string, string> = {};
            const finalItems: ConfigItem[] = CONFIG_SCHEMA.map(schemaItem => {
                const dbItem = data?.find((d: any) => d.key === schemaItem.key);
                const meaningfulValue = dbItem ? dbItem.value : schemaItem.value;
                mergedHelperMap[schemaItem.key] = meaningfulValue;

                return {
                    ...schemaItem,
                    value: meaningfulValue
                };
            });

            // Handle legacy keys in DB
            if (data) {
                data.forEach((d: any) => {
                    if (!mergedHelperMap[d.key]) {
                        mergedHelperMap[d.key] = d.value;
                    }
                });
            }

            setConfig(mergedHelperMap);
            setItems(finalItems);

        } catch (err: any) {
            console.error('Config load failed:', err);

            // Only block the UI for credential / project-level errors (401, 403).
            // A missing collection (404) or network hiccup should silently fall back to defaults.
            if (err instanceof AppwriteException) {
                const code = err.code ?? 0;
                if (code === 401 || code === 403) {
                    setConfigError(err.message);
                }
                // 404 = collection not yet created → use defaults silently
            }

            const defaults: Record<string, string> = {};
            CONFIG_SCHEMA.forEach(i => defaults[i.key] = i.value);
            setConfig(defaults);
            setItems(CONFIG_SCHEMA);
        } finally {
            setIsLoading(false);
        }
    };

    const updateConfig = async (key: string, value: string) => {
        console.log(`[Config] Updating ${key} to:`, value);
        setConfig(prev => ({ ...prev, [key]: value }));
        setItems(prev => prev.map(item => item.key === key ? { ...item, value } : item));

        try {
            // Find if existing document to update or create new
            const existing = await databases.listDocuments(
                APPWRITE_CONFIG.databaseId,
                'site_config',
                [Query.equal('key', key)]
            );

            if (existing.documents.length > 0) {
                await databases.updateDocument(
                    APPWRITE_CONFIG.databaseId,
                    'site_config',
                    existing.documents[0].$id,
                    { 
                        value, 
                        updated_at: new Date().toISOString() 
                    }
                );
                console.log(`[Config] Successfully updated ${key} in Appwrite`);
            } else {
                await databases.createDocument(
                    APPWRITE_CONFIG.databaseId,
                    'site_config',
                    ID.unique(),
                    { 
                        key, 
                        value, 
                        updated_at: new Date().toISOString() 
                    }
                );
                console.log(`[Config] Successfully created ${key} in Appwrite`);
            }
        } catch (error: any) {
            console.error(`[Config] Error updating ${key}:`, error.message || error);
            // We don't revert local state immediately to keep UI snappy, 
            // but in a production app we might want to show a toast error
        }
    };

    return (
        <ConfigContext.Provider value={{ config, isLoading, updateConfig, items }}>
            {configError && (
                <ConfigErrorOverlay 
                    error={configError} 
                    onRetry={() => {
                        setConfigError(null);
                        setIsLoading(true);
                        loadConfig();
                    }} 
                />
            )}
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};

// Helper hook for single value
export const useSiteConfig = (key: string, defaultValue: string = '') => {
    const { config } = useConfig();
    return config[key] !== undefined ? config[key] : defaultValue;
};
