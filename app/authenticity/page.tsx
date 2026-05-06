"use client";
import React from 'react';

import { motion } from 'framer-motion';
import { ShieldCheck, Gem, Sparkles, Award } from 'lucide-react';

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I know my Silvoraa jewelry is authentic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every Silvoraa piece comes with a certificate of authenticity. We source only genuine gemstones from certified suppliers and all our sterling silver is 925 certified."
      }
    },
    {
      "@type": "Question",
      "name": "What is your warranty policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a lifetime warranty on all our jewelry covering manufacturing defects. Gemstone replacement is free within the first year."
      }
    },
    {
      "@type": "Question",
      "name": "How do you source your gemstones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We source gemstones from certified ethical mines around the world. Each stone is hand-selected by our gemologists for quality and natural beauty."
      }
    }
  ]
});

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const AuthenticityPage : React.FC = () => {
    return (
        <div className="bg-white min-h-screen text-stone-800">
            

            {/* Hero */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden -mt-16">
                <div className="absolute inset-0 bg-stone-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-black" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615655406736-b37c4d898e6f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                </div>

                <motion.div 
                    className="relative z-10 text-center px-6 max-w-3xl mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                >
                    <motion.span variants={itemVariants} className="inline-block mb-8 text-xs font-medium tracking-[0.3em] uppercase text-stone-400">
                        Our Promise
                    </motion.span>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
                        Authenticity
                    </motion.h1>

                    <motion.div variants={itemVariants} className="w-16 h-px bg-gradient-to-r from-transparent via-stone-500 to-transparent mx-auto mb-8" />

                    <motion.p variants={itemVariants} className="text-lg text-stone-300 max-w-md mx-auto leading-relaxed">
                        Our standard of sourcing and integrity.
                    </motion.p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                >
                    <span className="text-[9px] uppercase tracking-widest text-stone-500">Discover</span>
                    <div className="w-px h-8 bg-stone-600" />
                </motion.div>
            </section>

            {/* Main Content */}
            <section className="py-28 px-6">
                <motion.div 
                    className="container mx-auto max-w-2xl text-center"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.span variants={itemVariants} className="block text-xs font-medium tracking-[0.3em] uppercase text-stone-400 mb-6">
                        Our Commitment
                    </motion.span>

                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif text-stone-800 mb-10">
                        Authenticity begins at the source
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-lg text-stone-600 leading-relaxed mb-16">
                        Every natural stone used in our jewelry is carefully selected for its quality, origin, and natural character. 
                        We work only with trusted suppliers and examine each stone for its natural composition, ensuring it is genuine and untreated.
                    </motion.p>
                </motion.div>
            </section>

            {/* Divider */}
            <div className="w-full max-w-lg mx-auto px-6">
                <div className="h-px bg-stone-100" />
            </div>

            {/* Process Steps */}
            <section className="py-28 px-6">
                <motion.div 
                    className="container mx-auto max-w-4xl"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <motion.div variants={itemVariants} className="group text-center cursor-pointer">
                            <div className="mb-6">
                                <div className="w-16 h-16 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors duration-300 flex items-center justify-center mx-auto">
                                    <Gem className="w-6 h-6 text-stone-400 group-hover:text-stone-500 transition-colors duration-300" />
                                </div>
                            </div>
                            <h3 className="text-sm font-medium uppercase tracking-wider text-stone-800 mb-3">Source with Care</h3>
                            <p className="text-stone-500 leading-relaxed text-sm">
                                Every stone is traced to its origin. We partner only with ethical miners and trusted suppliers.
                            </p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div variants={itemVariants} className="group text-center cursor-pointer">
                            <div className="mb-6">
                                <div className="w-16 h-16 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors duration-300 flex items-center justify-center mx-auto">
                                    <ShieldCheck className="w-6 h-6 text-stone-400 group-hover:text-stone-500 transition-colors duration-300" />
                                </div>
                            </div>
                            <h3 className="text-sm font-medium uppercase tracking-wider text-stone-800 mb-3">Verify with Intention</h3>
                            <p className="text-stone-500 leading-relaxed text-sm">
                                Each gem is examined for its natural composition. We certify authenticity for every piece we create.
                            </p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div variants={itemVariants} className="group text-center cursor-pointer">
                            <div className="mb-6">
                                <div className="w-16 h-16 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors duration-300 flex items-center justify-center mx-auto">
                                    <Sparkles className="w-6 h-6 text-stone-400 group-hover:text-stone-500 transition-colors duration-300" />
                                </div>
                            </div>
                            <h3 className="text-sm font-medium uppercase tracking-wider text-stone-800 mb-3">Craft with Respect</h3>
                            <p className="text-stone-500 leading-relaxed text-sm">
                                Every piece is created with clear intention. We honor the stone through skilled craftsmanship.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Divider */}
            <div className="w-full max-w-lg mx-auto px-6">
                <div className="h-px bg-stone-100" />
            </div>

            {/* Quote & Badge */}
            <section className="py-28 px-6">
                <motion.div 
                    className="container mx-auto max-w-xl text-center"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="mb-10">
                        <Award className="w-8 h-8 text-stone-300 mx-auto mb-6" />
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-2xl md:text-3xl font-serif italic text-stone-600 mb-12">
                        "What reaches you is not just jewelry, but a piece created with clarity, honesty, and meaning."
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <div className="inline-block px-8 py-4 border border-stone-200">
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                                Crafted in Silver. Chosen with Intuition.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default AuthenticityPage;
