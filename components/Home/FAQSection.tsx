"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, Truck, Gem, MessageCircle } from 'lucide-react';


interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: 'Orders & Shipping',
    question: 'How long does it take to ship my order?',
    answer: 'Most orders are processed and shipped within 2-3 business days. Delivery typically takes 5-7 business days within India and 10-15 business days for international orders. Custom or personalized items may take an additional 3-5 days.'
  },
  {
    category: 'Orders & Shipping',
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free standard shipping on all orders within India. For international orders over ₹10,000, we provide complimentary express shipping.'
  },
  {
    category: 'Orders & Shipping',
    question: 'Can I track my order?',
    answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email and SMS. You can track your package in real-time through our website or the carrier\'s app.'
  },
  {
    category: 'Product Quality',
    question: 'Are your gemstones authentic?',
    answer: 'Yes, 100%! Every Silvoraa gemstone is ethically sourced and comes with a certificate of authenticity. We work with certified gemstone suppliers and each stone is hand-selected by our gemologists.'
  },
  {
    category: 'Product Quality',
    question: 'What is 925 sterling silver?',
    answer: '925 sterling silver contains 92.5% pure silver and 7.5% other metals (usually copper). This is the highest quality standard for silver jewelry, ensuring durability while maintaining the beautiful shine. All our silver pieces are stamped with the 925 mark.'
  },
  {
    category: 'Product Quality',
    question: 'How do I know my ring size?',
    answer: 'We provide a comprehensive ring size guide on every product page. You can also visit any local jeweler for accurate sizing, or use our printable size chart available in the footer of our website.'
  },
  {
    category: 'Returns & Refunds',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day hassle-free return policy for all unworn items in original packaging. Custom or personalized items can be returned if there\'s a manufacturing defect. Simply contact our support team to initiate a return.'
  },
  {
    category: 'Returns & Refunds',
    question: 'How do I return an item?',
    answer: 'Contact our team at silvoraa.work@gmail.com with your order number. We\'ll send you a prepaid shipping label. Pack the item securely in its original box and drop it at the nearest pickup point.'
  },
  {
    category: 'Returns & Refunds',
    question: 'When will I get my refund?',
    answer: 'Once we receive and inspect your returned item, refunds are processed within 5-7 business days. The amount will be credited to your original payment method or bank account.'
  },
  {
    category: 'Jewelry Care',
    question: 'How do I care for my sterling silver jewelry?',
    answer: 'Store your silver jewelry in a cool, dry place away from direct sunlight. Keep it in the provided pouches or airtight containers. Clean gently with a soft polishing cloth. Avoid contact with chemicals, perfumes, and cosmetics.'
  },
  {
    category: 'Jewelry Care',
    question: 'Why does my silver jewelry tarnish?',
    answer: 'Tarnishing is natural and occurs when silver reacts with sulfur in the air or moisture. This is not a defect, it\'s a characteristic of all silver. Regular cleaning and proper storage prevent tarnish buildup.'
  },
  {
    category: 'Jewelry Care',
    question: 'Can I wear my jewelry while swimming or showering?',
    answer: 'We recommend removing jewelry before swimming, showering, or any water activities. Chlorine, salt water, and harsh soaps can damage the metal and gemstones over time.'
  },
  {
    category: 'Authentication',
    question: 'How can I verify the authenticity of my Silvoraa jewelry?',
    answer: 'Every piece comes with a physical certificate of authenticity. You can also verify your purchase through our website using the unique authentication code provided with your order.'
  },
  {
    category: 'Authentication',
    question: 'Do you provide warranty on your jewelry?',
    answer: 'Yes! All Silvoraa jewelry comes with a lifetime warranty covering manufacturing defects. Gemstone replacement is free within the first year. Register your purchase on our website to activate your warranty.'
  },
  {
    category: 'Custom Orders',
    question: 'Can I get a custom design made?',
    answer: 'Absolutely! We offer bespoke jewelry services. Share your ideas with our design team through silvoraa.work@gmail.com or book a consultation. We\'ll create a custom piece that perfectly matches your vision.'
  },
  {
    category: 'Custom Orders',
    question: 'How long does custom jewelry take to make?',
    answer: 'Custom pieces typically take 2-4 weeks depending on complexity. The timeline starts after design confirmation and payment. We\'ll keep you updated throughout the process.'
  },
  {
    category: 'Energies & Healing',
    question: 'How do gemstones interact with my energy?',
    answer: 'Every gemstone possesses a unique vibrational frequency. When worn, these frequencies interact with your body\'s energy fields (chakras), promoting balance, reducing stress, and enhancing specific qualities like focus or calmness.'
  },
  {
    category: 'Energies & Healing',
    question: 'Can I wear multiple energetic stones together?',
    answer: 'Yes! Layering gemstones is a great way to combine energies. For example, Amethyst for calmness pairs well with Rose Quartz for compassion. We recommend trusting your intuition when mixing stones.'
  },
  {
    category: 'Energies & Healing',
    question: 'How do I cleanse the energy of my new jewelry?',
    answer: 'To reset your gemstone\'s energy, you can place it under moonlight overnight, smudge it with sage, or rest it on a bed of clear quartz. We recommend cleansing new pieces before wearing them with specific intentions.'
  }
];

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

const howToSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to care for your sterling silver jewelry",
  "step": [
    {
      "@type": "HowToStep",
      "text": "Store your silver jewelry in a cool, dry place away from direct sunlight."
    },
    {
      "@type": "HowToStep",
      "text": "Keep it in the provided pouches or airtight containers."
    },
    {
      "@type": "HowToStep",
      "text": "Clean gently with a soft polishing cloth."
    },
    {
      "@type": "HowToStep",
      "text": "Avoid contact with chemicals, perfumes, and cosmetics."
    }
  ]
});

const speakableSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".faq-section", ".faq-question", ".faq-answer"]
  }
});

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white faq-section">
      
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToSchema }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: speakableSchema }} />
      

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-silvoraa-gold mb-4 block">
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-silvoraa-black mb-4">
            Questions You Ask
          </h2>
          <p className="text-silvoraa-warmGray max-w-xl mx-auto text-sm md:text-base">
            Everything you need to know about Silvoraa jewelry, from ordering to caring for your pieces.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-silvoraa-gold mb-2 block">
                    {faq.category}
                  </span>
                  <span className="font-serif text-lg text-silvoraa-black font-medium faq-question">
                    {faq.question}
                  </span>
                </div>
                <span className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                  openIndex === index ? 'bg-silvoraa-gold text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <p className="text-silvoraa-warmGray leading-relaxed faq-answer">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-silvoraa-gold/10 rounded-full flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6 text-silvoraa-gold" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-silvoraa-black">Lifetime Warranty</span>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-silvoraa-gold/10 rounded-full flex items-center justify-center mb-3">
              <Truck className="w-6 h-6 text-silvoraa-gold" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-silvoraa-black">Free Shipping</span>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-silvoraa-gold/10 rounded-full flex items-center justify-center mb-3">
              <Gem className="w-6 h-6 text-silvoraa-gold" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-silvoraa-black">Certified Gems</span>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-silvoraa-gold/10 rounded-full flex items-center justify-center mb-3">
              <MessageCircle className="w-6 h-6 text-silvoraa-gold" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-silvoraa-black">24/7 Support</span>
          </div>
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center">
          <p className="text-silvoraa-warmGray mb-4">Still have questions?</p>
          <a
            href="/book-consultation"
            className="inline-block bg-silvoraa-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-silvoraa-gold transition-all duration-300"
          >
            Book Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
};
