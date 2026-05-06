"use client";
import React from 'react';

const TermsPage : React.FC = () => {
    return (
        <div className="pt-32 min-h-screen bg-white text-silvoraa-black pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <header className="mb-16 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl mb-4 text-silvoraa-black">Terms & Conditions</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-sm font-medium">Please Read Carefully</p>
                    <div className="w-24 h-[1px] bg-silvoraa-gold mx-auto mt-8 opacity-50" />
                </header>

                {/* Content */}
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 space-y-12">

                    <section className="space-y-4">
                        <p className="text-gray-600 leading-relaxed font-light text-lg">
                            Welcome to Silvoraa. These Terms & Conditions outline the rules and policies governing access to our website and the purchase of products offered through it. By browsing our site or placing an order, you agree to be bound by these terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">1</span>
                            Agreement & Eligibility
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>These terms form a binding agreement between Silvoraa (“we,” “us,” “our”) and the user or customer (“you”).</p>
                            <p>By using our website, you confirm that you are at least 18 years of age or are accessing the site under the supervision and consent of a parent or legal guardian.</p>
                            <p>Silvoraa reserves the right to revise these Terms & Conditions at any time. Continued use of the website after updates implies acceptance of the revised terms.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">2</span>
                            Products, Representation & Availability
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>We take care to present our products accurately through descriptions and images. However, as our jewelry features natural stones, slight variations in color, texture, shape, or size are a natural part of the product and do not constitute defects.</p>
                            <p>Product availability is subject to change without notice. We reserve the right to limit quantities, discontinue items, or refuse service at our discretion.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">3</span>
                            Orders & Cancellations
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>Placing an order on our website constitutes a request to purchase. An order confirmation email indicates receipt of your order but does not guarantee acceptance.</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-silvoraa-gold">
                                <li>Orders may be canceled only before dispatch. Once shipped, orders cannot be canceled.</li>
                                <li>Items that are custom-made, personalized, or prepared specifically upon order are non-cancellable and non-refundable.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">4</span>
                            Pricing & Payments
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>All prices are displayed in Indian Rupees (INR) and include applicable taxes unless stated otherwise.</p>
                            <p>We accept payments through secure third-party payment gateways using methods such as credit/debit cards, UPI, net banking, and other supported digital options. Silvoraa does not store payment card details.</p>
                            <p>In the event of an incorrect price or technical error, we reserve the right to cancel or revise the order after informing the customer.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">5</span>
                            Shipping & Delivery
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>We offer shipping across India and to select international destinations. Estimated delivery timelines may vary based on location, courier services, and customs procedures.</p>
                            <p>International customers are responsible for any customs duties, import taxes, or additional charges levied by their local authorities.</p>
                            <p>Silvoraa is not liable for delivery delays caused by logistics partners, customs clearance, natural events, or circumstances beyond our control.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">6</span>
                            Returns, Refunds & Exchanges
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <ul className="list-disc pl-5 space-y-2 marker:text-silvoraa-gold">
                                <li>Returns are accepted only for products that arrive damaged, defective, or incorrect, and must be reported within 3 days of delivery.</li>
                                <li>Items that are customized, personalized, or made to order are not eligible for return or exchange.</li>
                                <li>Once a return is approved and received, refunds are processed to the original payment method within 7–14 business days. Exchanges are subject to stock availability.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">7</span>
                            Use of Website & Intellectual Property
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>You agree to use our website responsibly and not engage in any activity that is unlawful, harmful, or disruptive.</p>
                            <p>All content on this website—including images, text, logos, and design elements—is the intellectual property of Silvoraa and may not be copied, reproduced, or used without prior written permission.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">8</span>
                            Disclaimer & Limitation of Liability
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                            <p>Silvoraa shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>
                            <p className="italic border-l-2 border-gray-200 pl-4">Our jewelry and natural stones are intended for personal, aesthetic, and symbolic purposes only. They are not a substitute for medical, psychological, or professional advice or treatment.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">9</span>
                            Privacy
                        </h2>
                        <div className="pl-11 text-gray-600 leading-relaxed">
                            <p>We collect and handle personal information in accordance with our Privacy Policy. By using our website, you consent to such data collection and processing. We do not sell or trade your personal information to third parties, except where required by law or for order fulfillment.</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-serif text-2xl text-silvoraa-black flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 text-silvoraa-gold font-sans text-sm font-bold flex items-center justify-center">10</span>
                            Governing Law & Jurisdiction
                        </h2>
                        <div className="pl-11 space-y-4 text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <p>These Terms & Conditions are governed by the laws of India.</p>
                            <p className="font-medium text-silvoraa-black">Any disputes shall be resolved through arbitration in Jaipur, Rajasthan, in accordance with the Arbitration and Conciliation Act, 1996. Courts in Jaipur shall have exclusive jurisdiction over related matters.</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default TermsPage;
