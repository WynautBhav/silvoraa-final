'use client';
import React from 'react';
import { AlertCircle, Database, Copy, ExternalLink, Settings, RefreshCw } from 'lucide-react';
import { APPWRITE_CONFIG } from '@/lib/appwrite';

interface ConfigErrorOverlayProps {
    error: string;
    onRetry: () => void;
}

export const ConfigErrorOverlay: React.FC<ConfigErrorOverlayProps> = ({ error, onRetry }) => {
    const isDatabaseNotFound = error.includes('Database with the requested ID') || error.includes('404');
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-silvoraa-white/95 backdrop-blur-md p-6">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-500">
                {/* Header */}
                <div className="bg-red-50 p-8 flex items-center gap-4 border-b border-red-100">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-serif text-silvoraa-black">Configuration Required</h2>
                        <p className="text-sm text-red-600/80 font-medium">Appwrite connection could not be established</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                            <Database className="w-3 h-3" />
                            Detected Issue
                        </label>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 font-mono text-xs text-silvoraa-black leading-relaxed">
                            {error}
                        </div>
                        {isDatabaseNotFound && (
                            <p className="text-sm text-gray-500 italic">
                                Tip: The database ID "<span className="text-silvoraa-black font-bold">silvoraa</span>" was not found in your project.
                            </p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-silvoraa-black">How to fix this:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-silvoraa-gold/5 border border-silvoraa-gold/10 space-y-2">
                                <div className="text-xs font-bold text-silvoraa-gold flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-silvoraa-gold text-white flex items-center justify-center text-[10px]">1</span>
                                    Check Appwrite Console
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Go to your project settings and find your <strong>Database ID</strong>.
                                </p>
                                <a 
                                    href="https://cloud.appwrite.io/console" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-silvoraa-black hover:underline mt-1"
                                >
                                    Open Console <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                                <div className="text-xs font-bold text-gray-400 flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px]">2</span>
                                    Sync Project ID
                                </div>
                                <div className="flex items-center justify-between gap-2 p-2 bg-white rounded-lg border border-gray-200">
                                    <code className="text-[10px] text-gray-500 truncate">{APPWRITE_CONFIG.projectId}</code>
                                    <button 
                                        onClick={() => copyToClipboard(APPWRITE_CONFIG.projectId)}
                                        className="p-1.5 hover:bg-gray-50 rounded-md transition-colors text-gray-400 hover:text-silvoraa-black"
                                        title="Copy Project ID"
                                    >
                                        <Copy className="w-3 h-3" />
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400">Ensure this matches your Appwrite project.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                        <button 
                            onClick={onRetry}
                            className="w-full sm:w-auto px-8 py-3.5 bg-silvoraa-black text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-black/5"
                        >
                            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            Retry Connection
                        </button>
                        <p className="text-[10px] text-gray-400 text-center sm:text-left leading-relaxed">
                            Once you have your Database and Collection IDs, please share them with Antigravity so I can update the code.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-center items-center gap-3">
                    <Settings className="w-3 h-3 text-gray-300" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300">Silvoraa Platform Config</span>
                </div>
            </div>
        </div>
    );
};
