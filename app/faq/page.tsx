"use client";
import type { Metadata } from 'next';
import React from 'react';

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | Silvoraa',
  description: 'Gemstone healing properties, birthstone guide, and jewelry care FAQ. Everything you need to know about Silvoraa jewelry.',
  alternates: { canonical: 'https://www.silvoraa.com/faq' },
  openGraph: {
    title: 'FAQ | Silvoraa',
    description: 'Gemstone healing properties and jewelry care.',
    url: 'https://www.silvoraa.com/faq',
  },
};

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Amethyst good for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Amethyst is believed to promote calmness, reduce anxiety, and enhance spiritual awareness. It's known as a natural stress reliever and is often used for meditation and sleep improvement."
      }
    },
    {
      "@type": "Question",
      "name": "Does Citrine bring wealth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Citrine is associated with abundance, success, and prosperity. Often called the 'merchant's stone,' it's believed to attract wealth and positive energy while promoting joy and optimism."
      }
    },
    {
      "@type": "Question",
      "name": "How does Garnet help with energy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Garnet is known as the stone of commitment and energy. It's believed to boost vitality, stimulate metabolism, and enhance creativity."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of Topaz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Topaz is believed to promote honesty, intuition, and emotional balance. Blue Topaz is associated with calm communication while Golden Topaz brings joy and success."
      }
    },
    {
      "@type": "Question",
      "name": "Which gemstone is best for anxiety?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Amethyst is widely considered the best gemstone for anxiety relief. Its calming energy helps reduce stress and promotes relaxation."
      }
    },
    {
      "@type": "Question",
      "name": "Which month is Amethyst birthstone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Amethyst is the birthstone for February. It's one of the most popular gemstones worldwide, valued for its stunning purple color and spiritual properties."
      }
    },
    {
      "@type": "Question",
      "name": "Is Topaz a December birthstone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Blue Topaz is one of the official birthstones for December. It's associated with loyalty, affection, and honesty."
      }
    },
    {
      "@type": "Question",
      "name": "What is Garnet's birth month?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Garnet is the birthstone for January. It symbolizes trust, friendship, and loyalty."
      }
    },
    {
      "@type": "Question",
      "name": "How to clean Amethyst jewelry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clean Amethyst gently with warm soapy water and a soft brush. Avoid ultrasonic cleaners, steam cleaning, or exposure to heat."
      }
    },
    {
      "@type": "Question",
      "name": "Can I shower with gemstone jewelry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It's best to remove gemstone jewelry before showering. Soap, shampoo, and hard water can dull the stone's polish and damage the metal setting."
      }
    },
    {
      "@type": "Question",
      "name": "How to store silver gemstone pieces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Store silver gemstone jewelry in a cool, dry place away from sunlight. Use anti-tarnish bags or cloth. Keep pieces separate to prevent scratching."
      }
    },
    {
      "@type": "Question",
      "name": "How to choose the right gemstone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose based on birth month, zodiac sign, or healing properties you seek. Consider your personal style and budget."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between real and synthetic gemstones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Real gemstones form in the earth over millions of years. Synthetic stones are created in labs with identical chemical properties. Both are real, but natural stones are rarer."
      }
    },
    {
      "@type": "Question",
      "name": "Does Silvoraa offer certification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Silvoraa provides authenticity certification for all gemstone jewelry. Each piece comes with documentation verifying gemstone quality and metal purity."
      }
    },
    {
      "@type": "Question",
      "name": "What is Rose Quartz good for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rose Quartz is the stone of unconditional love and emotional healing. It's believed to open the heart and promote self-love."
      }
    },
    {
      "@type": "Question",
      "name": "How does Labradorite help?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Labradorite is known as the stone of transformation. It's believed to enhance intuition, protect against negative energies, and promote spiritual awakening."
      }
    },
    {
      "@type": "Question",
      "name": "What is Lapis Lazuli used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lapis Lazuli is associated with truth, wisdom, and inner peace. It's believed to enhance intellectual ability and promote honest communication."
      }
    },
    {
      "@type": "Question",
      "name": "Does Iolite help with focus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Iolite is known as the stone of the visionaries. It's believed to enhance focus, creative thinking, and decision-making."
      }
    },
    {
      "@type": "Question",
      "name": "What are the metaphysical properties of Opal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Opal is a stone of inspiration and imagination. It's believed to enhance creativity and bring emotional balance."
      }
    },
    {
      "@type": "Question",
      "name": "How does Emerald benefit health?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Emerald is associated with rebirth, fertility, and love. It's believed to bring harmony to relationships and promote emotional healing."
      }
    }
  ]
});

const faqCategories = [
  {
    title: "Healing Properties",
    questions: [
      { question: "What is Amethyst good for?", answer: "Amethyst is believed to promote calmness, reduce anxiety, and enhance spiritual awareness. It's known as a natural stress reliever and is often used for meditation and sleep improvement." },
      { question: "Does Citrine bring wealth?", answer: "Citrine is associated with abundance, success, and prosperity. Often called the 'merchant's stone,' it's believed to attract wealth and positive energy while promoting joy and optimism." },
      { question: "How does Garnet help with energy?", answer: "Garnet is known as the stone of commitment and energy. It's believed to boost vitality, stimulate metabolism, and enhance creativity." },
      { question: "What are the benefits of Topaz?", answer: "Topaz is believed to promote honesty, intuition, and emotional balance. Blue Topaz is associated with calm communication while Golden Topaz brings joy and success." },
      { question: "Which gemstone is best for anxiety?", answer: "Amethyst is widely considered the best gemstone for anxiety relief. Its calming energy helps reduce stress and promotes relaxation." },
      { question: "What is Rose Quartz good for?", answer: "Rose Quartz is the stone of unconditional love and emotional healing. It's believed to open the heart and promote self-love." },
      { question: "How does Labradorite help?", answer: "Labradorite is known as the stone of transformation. It's believed to enhance intuition, protect against negative energies, and promote spiritual awakening." },
      { question: "What is Lapis Lazuli used for?", answer: "Lapis Lazuli is associated with truth, wisdom, and inner peace. It's believed to enhance intellectual ability and promote honest communication." },
      { question: "Does Iolite help with focus?", answer: "Iolite is known as the stone of the visionaries. It's believed to enhance focus, creative thinking, and decision-making." },
      { question: "What are the metaphysical properties of Opal?", answer: "Opal is a stone of inspiration and imagination. It's believed to enhance creativity and bring emotional balance." }
    ]
  },
  {
    title: "Birthstones",
    questions: [
      { question: "Which month is Amethyst birthstone?", answer: "Amethyst is the birthstone for February. It's one of the most popular gemstones worldwide, valued for its stunning purple color and spiritual properties." },
      { question: "Is Topaz a December birthstone?", answer: "Yes, Blue Topaz is one of the official birthstones for December. It's associated with loyalty, affection, and honesty." },
      { question: "What is Garnet's birth month?", answer: "Garnet is the birthstone for January. It symbolizes trust, friendship, and loyalty." },
      { question: "How does Emerald benefit health?", answer: "Emerald is associated with rebirth, fertility, and love. It's believed to bring harmony to relationships and promote emotional healing." }
    ]
  },
  {
    title: "Care & Maintenance",
    questions: [
      { question: "How to clean Amethyst jewelry?", answer: "Clean Amethyst gently with warm soapy water and a soft brush. Avoid ultrasonic cleaners, steam cleaning, or exposure to heat." },
      { question: "Can I shower with gemstone jewelry?", answer: "It's best to remove gemstone jewelry before showering. Soap, shampoo, and hard water can dull the stone's polish and damage the metal setting." },
      { question: "How to store silver gemstone pieces?", answer: "Store silver gemstone jewelry in a cool, dry place away from sunlight. Use anti-tarnish bags or cloth. Keep pieces separate to prevent scratching." }
    ]
  },
  {
    title: "Shopping Guide",
    questions: [
      { question: "How to choose the right gemstone?", answer: "Choose based on birth month, zodiac sign, or healing properties you seek. Consider your personal style and budget." },
      { question: "What's the difference between real and synthetic gemstones?", answer: "Real gemstones form in the earth over millions of years. Synthetic stones are created in labs with identical chemical properties. Both are real, but natural stones are rarer." },
      { question: "Does Silvoraa offer certification?", answer: "Yes, Silvoraa provides authenticity certification for all gemstone jewelry. Each piece comes with documentation verifying gemstone quality and metal purity." }
    ]
  }
];

const FAQPage : React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      

      <div className="relative bg-silvoraa-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-silvoraa-gold/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/10 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-16">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.3em] text-silvoraa-gold">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Gemstone Guide
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Everything you need to know about gemstone healing properties, birthstones, and caring for your jewelry.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        {faqCategories.map((category, idx) => (
          <section key={idx} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-silvoraa-black mb-8 pb-4 border-b border-gray-200">
              {category.title}
            </h2>
            <div className="space-y-6">
              {category.questions.map((faq, faqIdx) => (
                <details key={faqIdx} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-medium text-silvoraa-black pr-4">{faq.question}</h3>
                    <span className="flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-silvoraa-gold/10 text-silvoraa-gold group-open:rotate-180 transition-transform duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-silvoraa-warmGray leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16 bg-gradient-to-r from-silvoraa-black to-gray-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our gemology experts are here to help you find the perfect gemstone jewelry for your needs.
          </p>
          <Link 
            href="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-silvoraa-gold text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold/90 transition-colors"
          >
            Book a Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
