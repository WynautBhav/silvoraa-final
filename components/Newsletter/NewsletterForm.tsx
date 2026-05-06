'use client';
import React, { useState } from 'react';
import { ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/appwrite';

export const NewsletterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const subscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email.');
            return;
        }

        setStatus('loading');
        try {
            const { error } = await supabase
                .from('subscribers')
                .insert({ email });

            if (error) {
                if (error.code === '23505') { // Unique violation
                    setStatus('success'); // Treat as success to not leak info or feel bad
                    setMessage("You're already on the list!");
                } else {
                    throw error;
                }
            } else {
                setStatus('success');
                setMessage('Welcome to the inner circle.');
                setEmail('');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={subscribe} className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 pr-14 text-white placeholder-white/40 focus:outline-none focus:border-silvoraa-gold/50 transition-colors"
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-silvoraa-gold rounded-full flex items-center justify-center text-silvoraa-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : status === 'success' ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <ArrowRight className="w-4 h-4" />
                    )}
                </button>
            </form>

            {/* Feedback Message */}
            {status !== 'idle' && (
                <div className={`mt-3 flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-top-1 ${status === 'success' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'text-white/60'
                    }`}>
                    {status === 'success' && <Check className="w-3 h-3" />}
                    {status === 'error' && <AlertCircle className="w-3 h-3" />}
                    {message}
                </div>
            )}
        </div>
    );
};
