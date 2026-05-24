"use client";
import React from 'react';

const ShippingPage : React.FC = () => {
    return (
        <div className="pt-32 min-h-screen bg-white text-silvoraa-black pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <header className="mb-16 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl mb-4 text-silvoraa-black">Shipping Policy</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm font-medium">Order Fulfilment & Delivery Information</p>
                    <div className="w-24 h-[1px] bg-silvoraa-gold mx-auto mt-8 opacity-50" />
                </header>

                {/* Content */}
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 space-y-12">

                    <section className="space-y-4">
                        <p className="text-gray-600 leading-relaxed font-light text-lg">
                            At Silvoraa, we work to ensure your jewelry reaches you safely and in a timely manner. Please review the details below to understand how shipping and delivery are handled.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">1</span>
                            Shipping Destinations
                        </h2>
                        <div className="pl-11 space-y-6 text-gray-600 leading-relaxed">
                            <div>
                                <h3 className="font-bold text-silvoraa-black mb-2 uppercase text-xs tracking-wider">Within India</h3>
                                <p>We deliver across India, including major cities and most serviceable regions, using reliable courier partners.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-silvoraa-black mb-2 uppercase text-xs tracking-wider">International Orders</h3>
                                <p>Silvoraa ships internationally to select destinations. International customers are responsible for any customs duties, import taxes, or local charges imposed by their country’s authorities.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">2</span>
                            Order Processing & Dispatch
                        </h2>
                        <div className="pl-11 text-gray-600 leading-relaxed">
                            <p>Orders are usually prepared and dispatched within <strong className="text-silvoraa-black">1 to 3 business days</strong>, excluding weekends and public holidays.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">3</span>
                            Estimated Delivery Timelines
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <ul className="grid md:grid-cols-2 gap-4">
                                <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <span className="block font-bold text-silvoraa-black mb-1">India</span>
                                    Approx. 4 to 7 business days after dispatch
                                </li>
                                <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <span className="block font-bold text-silvoraa-black mb-1">International</span>
                                    Approx. 7 to 14 business days after dispatch
                                </li>
                            </ul>
                            <p className="text-sm italic text-gray-500">
                                Delivery timelines are indicative and may vary due to factors beyond our control, including courier delays, weather conditions, or customs clearance procedures.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">4</span>
                            Shipping Charges
                        </h2>
                        <div className="pl-11">
                            <div className="overflow-hidden border border-gray-100 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Shipping Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Prepaid Orders (India)</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">Free</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cash on Delivery (India)</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹89 flat fee</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">International Orders</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Calculated at checkout</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">5</span>
                            Cash on Delivery (COD)
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <ul className="list-disc pl-5 space-y-2 marker:text-silvoraa-gold">
                                <li>COD is available only within India</li>
                                <li>A flat ₹89 COD fee applies</li>
                                <li>To ensure successful delivery, COD orders may be confirmed via phone or WhatsApp. If confirmation is not received within 24 hours, the order may be canceled.</li>
                                <li>Repeated refusal of COD deliveries may lead to restriction of this payment option in the future.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">6</span>
                            Delays, Missing & Lost Shipments
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>While we partner with trusted couriers, Silvoraa cannot be held responsible for delays caused by logistics partners, natural events, strikes, or customs authorities.</p>
                            <p>If a package is marked as delivered but not received, please notify us within 24 hours so we can raise a query with the courier. Resolution depends on the courier’s investigation outcome.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">7</span>
                            Incorrect or Incomplete Address
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>If an order is returned due to an incorrect or incomplete address provided at checkout:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-red-400">
                                <li>Additional shipping charges will apply for re-dispatch</li>
                                <li>Shipping fees are non-refundable</li>
                            </ul>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default ShippingPage;
