"use client";
import React, { useState } from 'react';

import { Calendar, Mail, MessageSquare, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ConsultationPage : React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interest: 'Styling Advice',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => setIsSubmitted(true), 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen bg-white pt-28 pb-20">
            
            {/* Header */}
            <div className="container mx-auto px-6 mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-silvoraa-gold/10 rounded-full text-xs font-bold uppercase tracking-widest text-silvoraa-gold mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    Personal Styling
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-silvoraa-black mb-6">
                    Expert Consultation
                </h1>
                <p className="text-silvoraa-warmGray max-w-2xl mx-auto text-lg">
                    Unsure which gemstone resonates with your energy? Our expert stylists are here to guide you through our collection and find the perfect match for your aura and style.
                </p>
            </div>

            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                {/* Left: Info Cards */}
                <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div className="p-8 bg-silvoraa-softWhite rounded-3xl border border-gray-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-silvoraa-gold">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-serif mb-3">Personalized Guidance</h3>
                        <p className="text-silvoraa-warmGray leading-relaxed">
                            One-on-one session to understand your preferences, lifestyle, and the spiritual energy you seek.
                        </p>
                    </div>

                    <div className="p-8 bg-silvoraa-softWhite rounded-3xl border border-gray-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-silvoraa-gold">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-serif mb-3">Scheduled at Your Convenience</h3>
                        <p className="text-silvoraa-warmGray leading-relaxed">
                            Book a time that works for you. Sessions are available via video call or chat.
                        </p>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 animate-in fade-in slide-in-from-right-8 duration-700 delay-100 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-silvoraa-gold/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-serif text-silvoraa-black mb-4">Request Received</h3>
                            <p className="text-silvoraa-warmGray mb-8">
                                Thank you for your interest. Our styling team will reach out to you shortly via email to schedule your session.
                            </p>
                            <Link href="/shop" className="inline-block px-8 py-3 bg-silvoraa-black text-white rounded-full uppercase tracking-widest text-xs font-bold hover:bg-silvoraa-gold transition-colors">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            <h3 className="text-2xl font-serif mb-6">Book a Session</h3>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-silvoraa-warmGray mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-silvoraa-gold focus:bg-white transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-silvoraa-warmGray mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-silvoraa-gold focus:bg-white transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-silvoraa-warmGray mb-2">Interest</label>
                                <select
                                    name="interest"
                                    value={formData.interest}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-silvoraa-gold focus:bg-white transition-colors appearance-none"
                                >
                                    <option>Styling Advice</option>
                                    <option>Gemstone Information</option>
                                    <option>Gift Consultation</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-silvoraa-warmGray mb-2">Message (Optional)</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-silvoraa-gold focus:bg-white transition-colors"
                                    placeholder="Tell us what you're looking for..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-silvoraa-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-silvoraa-gold transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Submit Request
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConsultationPage;
