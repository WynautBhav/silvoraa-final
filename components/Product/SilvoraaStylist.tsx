'use client';
import React, { useState } from 'react';
import { Sparkles, Wand2, X, Quote } from 'lucide-react';

interface StylistProps {
    productTitle: string;
    stone: string;
    type: string;
}

// 🧠 "Brain" of the Product Page Stylist
const INTROS = [
    "Okay, real talk:",
    "My professional diagnosis:",
    "Between us besties:",
    "Fashion forecast predicts:",
    "The vision is simple:",
    "Prepare yourself:",
    "Honest opinion?",
    "Scenario for you:",
    "Just so you know:",
    "Spoiler alert:",
];

// 🎨 "Witty" Style Rules matched by Type with Placeholders
// {{stone}} - e.g. "Amethyst"
// {{type}} - e.g. "Ring"
const STYLE_WIT = {
    'earring': [
        "These {{stone}} earrings are 'meeting that could have been an email' survival gear.",
        "Perfect for distracting people from your bad hair day.",
        "This pair frames your face better than your favorite Instagram filter.",
        "Wear these and suddenly you're the main character in a coffee shop indie movie.",
        "Small enough to be office-appropriate, shiny enough to be dangerous.",
        "These say 'I have my life together' even if you just woke up 10 minutes ago.",
        "The kind of {{stone}} sparkle that makes exes regret things.",
        "Zoom call approved. Business on screen, party in the light reflection.",
        "Deserves to be taken out for cocktails immediately.",
        "Trust me, your earlobes have been waiting for this {{stone}} upgrade."
    ],
    'necklace': [
        "The perfect excuse to wear that deep V-neck you've been saving.",
        "Sits right in that sweet spot that screams 'expensive taste'.",
        "Layer this {{stone}} pendant if you're feeling spicy, solo if you're channeling CEOs.",
        "It's giving 'effortless luxury' on a Tuesday morning.",
        "The kind of piece you put on and 'accidentally' never take off.",
        "Warning: This {{stone}} may cause strangers to ask you where you got it.",
        "Minimalist enough for yoga, maximalist enough for brunch.",
        "This is what we call a 'confidence anchor'. Wear it and own the room.",
        "Pairs suspiciously well with a glass of champagne.",
        "Your collarbones will thank you for this choice."
    ],
    'ring': [
        "Specifically engineered for holding wine glasses dramatically.",
        "Talk with your hands. Trust me, you'll want to show off this {{stone}}.",
        "A little reminder of your power every time you look down at your keyboard.",
        "Stack it if you're feeling bold, wear it solo if you're a minimalist queen.",
        "Your manicure is literally begging for this partner in crime.",
        "The adult equivalent of a friendship bracelet, but way more expensive looking.",
        "It catches the light, and probably a few envious stares.",
        "Because your hands do all the work, they deserve the {{stone}} glory.",
        "This is 'sign a contract' energy right here.",
        "Shiny enough to distract you during boring meetings. You're welcome."
    ],
    'bracelet': [
        "Arm candy level: Expert.",
        "It jingles just enough to say 'I'm here' but not enough to annoy anyone.",
        "Roll up those sleeves. This isn't meant to be hidden.",
        "Pairs best with a nice watch or a very nice tan.",
        "The finishing touch that makes a t-shirt and jeans look like an Outfit.",
        "A subtle flex for your wrist involving {{stone}}.",
        "Wear it on your dominant hand. Let it see the world.",
        "It's not just jewelry, it's a conversation starter.",
        "Clasps easily, unlike some relationships we know.",
        "Delicate but durable. Just like you."
    ],
    'general': [
        "It's giving 'I woke up like this' but better.",
        "The minimalists will love this {{stone}}, the maximalists will respect it.",
        "Polished, professional, and slightly dangerous.",
        "Instant mood lifter. Cheaper than therapy.",
        "This is an investment in your 'Good Vibes' portfolio.",
        "Future heirloom alert. Try not to fight over it.",
        "Designed to make you feel like royalty without the drama.",
        "Simple. Stunning. Sold."
    ]
};

// 💎 Stone-Specific "Vibe"
const STONE_VIBES = {
    'amethyst': "Protects your peace like a personal bodyguard. Chill vibes only.",
    'ruby': "Unapologetic passion. Main character energy in physical form.",
    'sapphire': "Royal elegance without the stiff upper lip. Pure wisdom.",
    'emerald': "Old money aesthetic. It whispers wealth instead of shouting it.",
    'citrine': "Literal bottled sunshine. Impossible to be sad wearing this.",
    'topaz': "Ice-cold clarity to cut through the noise.",
    'opal': "Mysterious and shifting. Hard to pin down, just like you.",
    'moonstone': "Ethereal dream-girl energy. Glows differently.",
    'garnet': "Deep, dark romantic vibes. A little intense, in a good way.",
    'peridot': "Fresh lime zest for your soul. A total reset.",
    'diamond': "The ultimate power move. Unbreakable.",
    'rose': "Self-love in stone form. Be your own best friend.",
    'quartz': "Crystal clear intentions and good energy.",
    'pearl': "Classic but never boring. The Audrey Hepburn of stones.",
    'onyx': "Banish the bad vibes. Not today, negativity.",
    'turquoise': "Boho chic meets spiritual warrior.",
    'aquamarine': "Calming ocean energy for your chaotic Monday.",
    'silver': "Timeless, versatile, and always right."
};

// Simple string hash for consistent seeding
const djb2 = (str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    return Math.abs(hash);
};

export const SilvoraaStylist: React.FC<StylistProps> = ({ productTitle, stone, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [advice, setAdvice] = useState<{ tip: string, pairing: string } | null>(null);

    // Reset when product changes
    React.useEffect(() => {
        setIsOpen(false);
        setAdvice(null);
    }, [productTitle, stone]);

    const generateSmartAdvice = () => {
        // 🎲 Robust Hashing for Uniqueness
        // Use full title + full stone + full type to differentiate every product
        const uniqueKey = `${productTitle}-${stone}-${type}`;
        const seed = djb2(uniqueKey);

        // 1. Get Type Wit
        let typeKey = 'general';
        const lowerType = type.toLowerCase();
        if (lowerType.includes('earring')) typeKey = 'earring';
        else if (lowerType.includes('necklace') || lowerType.includes('pendant') || lowerType.includes('chain')) typeKey = 'necklace';
        else if (lowerType.includes('ring')) typeKey = 'ring';
        else if (lowerType.includes('bracelet') || lowerType.includes('bangle')) typeKey = 'bracelet';

        // @ts-ignore
        const typeTemplates = STYLE_WIT[typeKey] || STYLE_WIT['general'];
        let rawTemplate = typeTemplates[seed % typeTemplates.length];

        // ⚡ Dynamic Slot Filling
        // Replace {{stone}} with actual stone name to make it unique to this product
        const filledTemplate = rawTemplate
            .replace(/{{stone}}/g, stone)
            .replace(/{{type}}/g, type.toLowerCase());

        const intro = INTROS[seed % INTROS.length];

        // 2. Get Stone Vibe
        const stoneLower = stone.toLowerCase();
        const stoneKey = Object.keys(STONE_VIBES).find(k => stoneLower.includes(k)) as keyof typeof STONE_VIBES;
        const vibe = stoneKey ? STONE_VIBES[stoneKey] : "it radiates pure sophistication.";

        const fullTip = `${intro} ${filledTemplate}`;

        const pairing = vibe.includes("Protects") || vibe.includes("Unapologetic") || vibe.includes("Literal")
            ? `Why this ${stone}? ${vibe}`
            : `The ${stone} adds ${vibe}`;

        setAdvice({
            tip: fullTip,
            pairing: pairing
        });
        setIsOpen(true);
    };

    return (
        <div className="w-full">
            {/* Trigger Button */}
            <button
                type="button"
                onClick={generateSmartAdvice}
                className="group relative flex items-center justify-center gap-3 w-full py-4 mt-8 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 active:scale-95"
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shimmer" />

                <Wand2 className="w-4 h-4 text-purple-200" />
                <span className="text-sm font-bold uppercase tracking-widest relative z-10">Ask AI Stylist</span>
            </button>

            {/* AI Advice Card */}
            <div className={`overflow-hidden transition-all duration-500 ease-out origin-top ${isOpen && advice ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                {advice && (
                    <div className="relative p-8 bg-[#FDFBF7] border border-[#E6E1D6] rounded-xl shadow-inner">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-silvoraa-black transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-4 h-4 text-silvoraa-gold" />
                            <span className="text-xs font-bold uppercase tracking-widest text-silvoraa-gold">Silvoraa Intelligence</span>
                        </div>

                        <div className="space-y-6">
                            <div className="relative">
                                {/* Quote Icon Background */}
                                <Quote className="w-8 h-8 text-gray-100 absolute -top-4 -left-2 -z-10 transform -scale-x-100" />

                                <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">The Vibe</h4>
                                <p className="font-serif italic text-xl md:text-2xl text-silvoraa-black leading-relaxed">
                                    "{advice.tip}"
                                </p>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Stone Energy</h4>
                                <p className="text-sm font-medium text-silvoraa-warmGray leading-relaxed">
                                    {advice.pairing}
                                </p>
                            </div>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-silvoraa-gold/5 to-transparent rounded-tl-[100px] pointer-events-none" />
                    </div>
                )}
            </div>
        </div>
    );
};
