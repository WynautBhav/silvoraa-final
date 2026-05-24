"use client";
import React from 'react';

import { motion } from 'framer-motion';
import { Heart, Shield, Leaf, Sparkles } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const AboutPageClient : React.FC = () => {
    return (
        <div className="bg-white min-h-screen text-stone-800">

            {/* Hero Section */}
            <h1 className="sr-only">About Silvoraa Jewelry - Our Story and Values</h1>
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 py-24">
                <motion.div
                    className="text-center px-6 max-w-3xl mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <motion.span 
                        variants={itemVariants}
                        className="inline-block mb-10 text-xs font-medium tracking-[0.3em] uppercase text-stone-400"
                    >
                        Our Essence
                    </motion.span>

                    <motion.h2 
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-serif text-stone-900 mb-10 leading-[1.1]"
                    >
                        Not just jewelry.<br />
                        <span className="text-stone-400 italic font-light">Energy.</span>
                    </motion.h2>

                    <motion.div 
                        variants={itemVariants}
                        className="w-20 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto mb-10" 
                    />

                    <motion.p 
                        variants={itemVariants}
                        className="text-lg text-stone-500 max-w-md mx-auto leading-relaxed"
                    >
                        Silvoraa exists at the intersection of ancient wisdom and modern aesthetic.
                        We do not just craft accessories; we curate intentions.
                    </motion.p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                >
                    <span className="text-[9px] uppercase tracking-widest text-stone-300">Explore</span>
                    <div className="w-px h-8 bg-stone-200" />
                </motion.div>
            </section>

            {/* Divider with sparkle */}
            <div className="relative py-4">
                <div className="w-full max-w-lg mx-auto flex items-center gap-4 px-6">
                    <div className="flex-1 h-px bg-stone-100" />
                    <Sparkles className="w-4 h-4 text-stone-300" />
                    <div className="flex-1 h-px bg-stone-100" />
                </div>
            </div>

            {/* The Story */}
            <section className="py-28 px-6">
                <motion.div 
                    className="container mx-auto max-w-2xl text-center"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.span variants={itemVariants} className="block text-xs font-medium tracking-[0.3em] uppercase text-stone-400 mb-6">
                        The Beginning
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif text-stone-800 mb-12">
                        A Simple Belief
                    </motion.h2>

                    <div className="space-y-8">
                        <motion.p variants={itemVariants} className="text-xl text-stone-600 leading-relaxed">
                            We noticed a disconnect. Jewelry was either fast fashion without soul, 
                            or inaccessible luxury locked behind glass cases.
                        </motion.p>

                        <motion.p variants={itemVariants} className="text-2xl md:text-3xl font-serif text-stone-700 italic">
                            Silvoraa was born to bridge this gap.
                        </motion.p>

                        <motion.p variants={itemVariants} className="text-xl text-stone-600 leading-relaxed">
                            We believe that each gemstone carries a frequency. A unique vibration that 
                            resonates with the wearer. Whether it is the calming energy of Amethyst or the abundance 
                            of Citrine, our pieces are designed to be talismans for your daily life.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* Divider */}
            <div className="w-full max-w-lg mx-auto px-6">
                <div className="h-px bg-stone-100" />
            </div>

            {/* Values */}
            <section className="py-28 px-6">
                <div className="container mx-auto max-w-xl">
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
                            Our Foundation
                        </h2>
                        <div className="w-12 h-px bg-stone-300 mx-auto" />
                    </motion.div>

                    <motion.div 
                        className="space-y-10"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Value 1 */}
                        <motion.div variants={itemVariants} className="group">
                            <div className="flex items-start gap-5 cursor-pointer">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-12 h-12 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors duration-300 flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-stone-400 group-hover:text-stone-500 transition-colors duration-300" />
                                    </div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-lg font-serif text-stone-800 mb-2">Crafted with Intention</h3>
                                    <p className="text-stone-500 leading-relaxed">
                                        Every piece passes through the hands of skilled artisans. We work with 
                                        small studios where the creator energy is imprinted into the silver itself.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Value 2 */}
                        <motion.div variants={itemVariants} className="group">
                            <div className="flex items-start gap-5 cursor-pointer">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-12 h-12 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors duration-300 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-stone-400 group-hover:text-stone-500 transition-colors duration-300" />
                                    </div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-lg font-serif text-stone-800 mb-2">Uncompromising Quality</h3>
                                    <p className="text-stone-500 leading-relaxed">
                                        Authenticity matters. Solid 925 Sterling Silver and genuine, earth-mined 
                                        gemstones. No plating over cheap brass. Just the real thing, built to last.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Value 3 */}
                        <motion.div variants={itemVariants} className="group">
                            <div className="flex items-start gap-5 cursor-pointer">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-12 h-12 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors duration-300 flex items-center justify-center">
                                        <Leaf className="w-5 h-5 text-stone-400 group-hover:text-stone-500 transition-colors duration-300" />
                                    </div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-lg font-serif text-stone-800 mb-2">Conscious Luxury</h3>
                                    <p className="text-stone-500 leading-relaxed">
                                        We are committed to ethical sourcing. Conflict-free gemstones and 
                                        a journey towards carbon-neutral shipping for every order.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Our Team */}
            <section className="py-28 px-6 bg-stone-50">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
                            Meet Our Artisans
                        </h2>
                        <div className="w-12 h-px bg-stone-300 mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-serif text-stone-800 mb-2">Rahul Sharma</h3>
                            <p className="text-stone-500 text-sm uppercase tracking-wider mb-4">Founder &amp; Lead Designer</p>
                            <p className="text-stone-600 leading-relaxed">
                                Master artisan and gemologist with 15+ years of experience in fine gemstone jewelry. A GIA-certified professional specializing in contemporary designs rooted in traditional craftsmanship. Each piece reflects Rahul&apos;s deep understanding of gemstone energy and healing properties, cultivated over decades of working with natural stones.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-6">
                                <Shield className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-serif text-stone-800 mb-2">Priya Verma</h3>
                            <p className="text-stone-500 text-sm uppercase tracking-wider mb-4">Head Gemologist, GIA Certified</p>
                            <p className="text-stone-600 leading-relaxed">
                                GIA certified gemologist with 12+ years of experience in gemstone identification and quality assessment. Priya ensures every stone meets our rigorous authenticity standards, personally inspecting each piece before it reaches our collection.
                            </p>
                        </motion.div>
                    </div>

                    <motion.p 
                        variants={itemVariants}
                        className="text-center text-stone-500 mt-12"
                    >
                        Handcrafted by certified artisans with decades of expertise in sterling silver and gemstone jewelry.
                    </motion.p>
                </div>
            </section>

            {/* Divider */}
            <div className="w-full max-w-lg mx-auto px-6">
                <div className="h-px bg-stone-100" />
            </div>

            {/* CTA */}
            <section className="py-28 px-6">
                <motion.div 
                    className="container mx-auto max-w-xl text-center"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants}>
                        <Sparkles className="w-5 h-5 text-stone-300 mx-auto mb-8" />
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-4xl font-serif text-stone-800 mb-4">
                        Find Your Frequency
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-stone-500 mb-10">
                        Explore our collection with your intuition.<br />
                        Trust what calls to you.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <Link
                            href="/shop"
                            className="inline-block px-10 py-4 bg-stone-900 text-white text-xs font-medium uppercase tracking-[0.2em] rounded-full hover:bg-stone-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                            Start Your Journey
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutPageClient;
