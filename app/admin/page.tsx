"use client";
import React from 'react';
import { useAuth } from '@/components/Auth/AuthContext';
import { Shield, LogOut } from 'lucide-react';
import { VisualHeroEditor } from '@/components/Admin/VisualHeroEditor';

const AdminConsole : React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="bg-white rounded-xl shadow-sm p-6 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-silvoraa-black text-white rounded-lg">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif text-silvoraa-black">Admin Console</h1>
                            <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </header>

                <div className="space-y-8">
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-serif text-silvoraa-black">Homepage Designer</h2>
                                <p className="text-sm text-gray-500">Visual positioning and configuration for your hero banners</p>
                            </div>
                        </div>
                        <VisualHeroEditor />
                    </section>
                </div>
            </div>
        </div>
    );
};


export default AdminConsole;
