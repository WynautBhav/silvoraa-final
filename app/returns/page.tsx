"use client";
import React from 'react';

const ReturnsPage : React.FC = () => {
    return (
        <div className="pt-32 min-h-screen bg-white text-silvoraa-black pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <header className="mb-16 text-center">
                    <h1 className="font-serif text-3xl md:text-5xl mb-4 text-silvoraa-black">Refunds, Returns & Exchanges Policy</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm font-medium">Please Read Carefully Before Placing an Order</p>
                    <div className="w-24 h-[1px] bg-silvoraa-gold mx-auto mt-8 opacity-50" />
                </header>

                {/* Content */}
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 space-y-12">

                    <section className="space-y-4">
                        <p className="text-gray-600 leading-relaxed font-light text-lg">
                            At Silvoraa, every piece is prepared with care and attention. Because our jewelry often involves natural stones and made-to-order handling, returns and refunds are limited and subject to the conditions below.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">1</span>
                            Reporting an Issue
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>If your order arrives damaged, incorrect, or incomplete, you must notify us within <strong>24 hours</strong> of delivery.</p>
                            <p>To raise a request, please contact us with:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-silvoraa-gold">
                                <li>Your order number</li>
                                <li>Clear images of the product and packaging</li>
                                <li>A continuous unboxing video showing the sealed parcel being opened</li>
                            </ul>
                            <p className="text-sm italic text-red-500">Requests submitted without adequate proof may not be reviewed.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">2</span>
                            Eligibility for Replacement or Exchange
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>A replacement or exchange may be considered only if:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-silvoraa-gold">
                                <li>The product is unused, unworn, and unaltered</li>
                                <li>Original packaging, certificates, and accessories are intact</li>
                                <li>The issue is verified after review</li>
                            </ul>
                            <p>Once approved, a replacement will be arranged at no additional cost.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">3</span>
                            Items Not Eligible for Return or Exchange
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>Due to the nature of our products, we do not accept returns or exchanges for:</p>
                            <ul className="grid md:grid-cols-2 gap-3">
                                {[
                                    "Change of mind or personal preference",
                                    "Differences in color/texture of natural stones",
                                    "Design or aesthetic expectations",
                                    "Items worn, used, or handled after delivery",
                                    "Damage from water, perfumes, or chemicals",
                                    "Minor damage to outer packaging only",
                                    "Orders refused at delivery",
                                    "Orders partially paid or declined at delivery"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">4</span>
                            Order Cancellations
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>Orders may be canceled only before preparation or dispatch begins. Once an order has entered processing, cancellation is no longer possible.</p>
                            <p className="bg-orange-50 p-4 rounded-lg text-orange-800 text-sm border border-orange-100">
                                For prepaid orders canceled before processing, a 5% deduction applies toward payment gateway and administrative costs.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">5</span>
                            Refunds
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>Refunds are issued only in rare and exceptional cases, subject to internal verification and approval.</p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-bold text-sm text-silvoraa-black mb-2">Potential Deductions:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm marker:text-gray-400">
                                    <li>Payment gateway fees (5%)</li>
                                    <li>Forward or return shipping charges, where applicable</li>
                                </ul>
                            </div>
                            <p>Approved refunds are processed within <strong>5–7 business days</strong> to the original payment method.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">6</span>
                            Cases Where Refunds Are Not Applicable
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>Refunds will not be provided for:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-silvoraa-gold">
                                <li>Packages lost in transit (a replacement will be issued instead)</li>
                                <li>Orders refused at delivery</li>
                                <li>Returns due to incorrect or incomplete address details</li>
                                <li>Products returned used, damaged, or without original packaging/certification</li>
                                <li>Damage limited to outer packaging only</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">7</span>
                            Resolution Timeline
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                    <span>Acknowledged within <strong>48 hours</strong></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                    <span>Resolved within <strong>5-7 business days</strong></span>
                                </li>
                            </ul>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;
