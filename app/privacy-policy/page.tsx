"use client";
import React from 'react';

const PrivacyPolicyPage : React.FC = () => {
    return (
        <div className="pt-32 min-h-screen bg-silvoraa-white text-silvoraa-black pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <header className="mb-16 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl mb-4 text-silvoraa-black">Privacy Policy</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm font-medium">Your Trust Matters to Us</p>
                    <div className="w-24 h-[1px] bg-silvoraa-gold mx-auto mt-8 opacity-50" />
                </header>

                {/* Content */}
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 space-y-12">

                    <section className="space-y-4">
                        <p className="text-gray-600 leading-relaxed font-light text-lg">
                            At Silvoraa, we respect your privacy and are committed to handling your personal information with care and responsibility. This policy explains how we collect, use, protect, and share information when you visit our website or engage with our services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">1</span>
                            Information We Collect
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>When you interact with Silvoraa, we may collect the following types of information:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-gray-300">
                                <li>
                                    <strong className="text-silvoraa-black font-medium">Personal Details:</strong> Name, email address, phone number, billing and shipping address when you place an order, create an account, or contact us.
                                </li>
                                <li>
                                    <strong className="text-silvoraa-black font-medium">Transaction Information:</strong> Required to process purchases. Please note that we do not store card or banking details; all payments are handled securely by trusted third-party payment providers.
                                </li>
                                <li>
                                    <strong className="text-silvoraa-black font-medium">Usage & Technical Data:</strong> Device type, browser information, IP address, and browsing activity, collected through cookies and analytics tools to improve site performance.
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">2</span>
                            How We Use Your Information
                        </h2>
                        <div className="pl-11 text-gray-600 leading-relaxed">
                            <p className="mb-3">We use your information to:</p>
                            <ul className="grid md:grid-cols-2 gap-3">
                                {[
                                    "Process and deliver your orders smoothly",
                                    "Communicate with you regarding purchases or support",
                                    "Improve our website and customer experience",
                                    "Share occasional updates (opt out anytime)",
                                    "Meet legal and security requirements"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-silvoraa-gold mt-2 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">3</span>
                            Sharing of Information
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>We only share your information when necessary and with care:</p>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-bold text-sm text-silvoraa-black mb-2">Service Partners</h4>
                                    <p className="text-xs text-gray-500">Payment processors, delivery partners, and marketing tools strictly for fulfillment.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-bold text-sm text-silvoraa-black mb-2">Legal Authorities</h4>
                                    <p className="text-xs text-gray-500">If required by applicable laws or regulations.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-bold text-sm text-silvoraa-black mb-2">Business Changes</h4>
                                    <p className="text-xs text-gray-500">Mergers or restructuring ensuring continuity.</p>
                                </div>
                            </div>
                            <p className="text-sm italic border-l-2 border-silvoraa-gold pl-4 py-1 bg-silvoraa-gold/5 rounded-r">
                                We never sell your personal data to third parties.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">4</span>
                            Data Protection & Storage
                        </h2>
                        <div className="pl-11 text-gray-600 leading-relaxed">
                            <p>
                                We use appropriate technical and organizational measures to safeguard your information, including secure servers and encryption where applicable.
                                Your data is retained only for as long as required to fulfill orders, maintain records, and comply with legal obligations.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">5</span>
                            Cookies & Tracking
                        </h2>
                        <div className="pl-11 text-gray-600 leading-relaxed">
                            <p>Silvoraa uses cookies and similar technologies to enhance website functionality and understand user preferences. You may choose to manage or disable cookies through your browser settings, though certain features of the site may be affected.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">6</span>
                            Your Rights & Preferences
                        </h2>
                        <div className="pl-11 text-gray-600 leading-relaxed">
                            <p>You have the right to:</p>
                            <ul className="list-circle space-y-1 mb-4 mt-2">
                                <li>Request access to or correction of your personal information</li>
                                <li>Unsubscribe from marketing communications at any time</li>
                                <li>Request deletion of your data, subject to legal requirements</li>
                            </ul>
                            <p>To exercise any of these rights, you may contact us directly.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">7</span>
                            International Access
                        </h2>
                        <div className="pl-11 text-gray-600 leading-relaxed">
                            <p>If you access our website from outside India, your information may be processed or stored in locations where our systems or service partners operate. By continuing to use the site, you consent to this transfer.</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
