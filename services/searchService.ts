import { PRODUCTS } from '../constants';
import { Product, ProductType, StoneType, StoneBenefit } from '../types';
import { COMPANY_POLICIES, STONE_LORE, PRODUCT_FAQ } from './knowledgeBase';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    products?: Product[];
}

interface ScoredProduct {
    product: Product;
    score: number;
    matchReason: string[];
}

export interface SearchContext {
    stones: string[];
    excludedStones: string[];
    types: string[];
    priceLimit: number | null;
    lastViewedProduct?: Product;
}

interface QueryAnalysis {
    stones: string[];
    excludedStones: string[];
    types: string[];
    priceLimit: number | null;
    tokens: string[];
    isQuestion: boolean;
    questionType?: 'policy' | 'stone_lore' | 'product_specific' | 'general';
}

// --- Knowledge Base (FAQs, Small Talk & Witty Responses) ---

const KNOWLEDGE_BASE = [
    // Greetings with personality
    {
        patterns: [/hello/i, /hi\b/i, /hey/i, /greetings/i],
        response: "Hey there, gem lover! 💎 I'm your Silvoraa Stylist. Tell me what you're looking for – a mood boost, a gift, or just something that makes you feel amazing!"
    },
    {
        patterns: [/good morning/i],
        response: "Good morning, sunshine! ☀️ Ready to add some sparkle to your day? Tell me what's on your mind – occasion, color, or just vibes!"
    },
    {
        patterns: [/good afternoon/i, /good evening/i],
        response: "Hello, lovely! ✨ Perfect time to treat yourself. What are we shopping for today?"
    },
    {
        patterns: [/how .* you/i, /doing today/i, /what's up/i],
        response: "Living my best crystalline life! 💫 Thanks for asking. Now, let's talk about YOU – shopping for yourself or hunting for the perfect gift?"
    },
    // Fun personality responses
    {
        patterns: [/who are you/i, /what are you/i, /your name/i],
        response: "I'm the Silvoraa Stylist – part jewelry expert, part vibe curator, 100% here to make you shine. Think of me as your personal gem whisperer! 💎✨"
    },
    {
        patterns: [/you're (awesome|amazing|great|cool)/i, /good job/i],
        response: "Aww, you're making me blush! 🥰 (If AI could blush, that is.) Now let's channel that good energy into finding you something gorgeous!"
    },
    {
        patterns: [/love you/i, /marry me/i],
        response: "I'm flattered! 💕 But I think what you really love is gemstones... and honestly, same. Let's find you a ring that'll make your heart skip a beat!"
    },
    {
        patterns: [/bored/i, /nothing to do/i],
        response: "Bored? Sounds like the perfect time for some retail therapy! 🛍️ Let's browse some stunning pieces. What catches your eye – rings, pendants, or earrings?"
    },
    {
        patterns: [/sad/i, /feeling down/i, /depressed/i, /upset/i],
        response: "Sending you virtual sparkles and good vibes! ✨ Fun fact: **Amethyst** is known for its calming energy. Sometimes a little self-care helps. Shall I show you some?"
    },
    {
        patterns: [/stressed/i, /anxious/i, /anxiety/i, /overwhelmed/i],
        response: "Deep breath, friend. 🧘‍♀️ **Lapis Lazuli** and **Amethyst** are known for their calming properties. Sometimes the right stone can be a little pocket of peace."
    },
    {
        patterns: [/broke/i, /no money/i, /poor/i, /expensive/i],
        response: "I hear you! 💸 The good news? Sterling Silver gives you that luxury look without the luxury markup. Plus, our pieces are investment pieces – timeless, not trendy!"
    },
    // Easter eggs
    {
        patterns: [/pizza/i, /burger/i, /food/i, /hungry/i],
        response: "Sadly, I can't order you pizza... yet. 🍕 But I CAN serve up some eye candy! How about some gorgeous **Citrine** that's as warm as fresh cheese?"
    },
    {
        patterns: [/coffee/i, /tea/i],
        response: "A person of taste! ☕ While I can't brew you anything, I can recommend **Labradorite** – it's got that rich, grounded energy. Like coffee for your soul!"
    },
    {
        patterns: [/diamond/i],
        response: "Diamonds are so... expected. 💅 Here at Silvoraa, we celebrate the colorful rebels – natural gemstones with real personality. Trust me, they're cooler."
    },
    {
        patterns: [/gold/i],
        response: "Gold is lovely, but we're a **Sterling Silver** house! ✨ Silver is versatile, hypoallergenic, and honestly? It lets the gemstones be the star of the show."
    },
    // Practical FAQs with personality
    {
        patterns: [/shipping/i, /delivery/i, /arrive/i, /ship/i],
        response: "Your precious cargo ships **express**, fully insured and tracked! 📦✨ Domestic orders typically arrive in 3-5 business days. We treat every box like treasure!"
    },
    {
        patterns: [/return/i, /refund/i, /exchange/i],
        response: "We've got your back! **30-day returns** for unworn items, no drama. If it's not *the one*, we'll help you find what is. 💕"
    },
    {
        patterns: [/clean/i, /care/i, /polish/i, /maintain/i, /wash/i],
        response: "Pro tip: Use a soft polishing cloth for that fresh-out-the-box shine! ✨ Store in the pouch we provide, and keep away from pools and perfumes."
    },
    {
        patterns: [/real/i, /authentic/i, /silver/i, /genuine/i, /fake/i],
        response: "100% real, 100% genuine! All Silvoraa pieces are **Solid 925 Sterling Silver** with ethically sourced natural gemstones. No plating, no fakes! 💎"
    },
    {
        patterns: [/size/i, /measure/i, /fit/i, /chart/i],
        response: "Most of our rings are adjustable (because flexibility is key!). For sized pieces, check the size guide on the product page. Pro tip: A string + ruler = DIY ring sizer! 📏"
    },
    {
        patterns: [/location/i, /store/i, /where .* based/i],
        response: "We're a digital-first brand – no rent, no middlemen, just premium pieces delivered straight to your door! 🏠✨ All the luxury, none of the retail markup."
    },
    {
        patterns: [/thank/i, /thanks/i, /appreciate/i, /thx/i],
        response: "You're so welcome! 💕 It's been a pleasure helping you. Come back anytime you need a sparkle boost!"
    },
    {
        patterns: [/bye/i, /goodbye/i, /see you/i, /later/i],
        response: "Take care, gem! ✨ Remember: life's too short for boring jewelry. See you next time! 💎"
    },
    // Catch-all fun responses for random stuff
    {
        patterns: [/lol/i, /haha/i, /funny/i, /joke/i],
        response: "Glad I could make you smile! 😄 Now let's find you something that'll make everyone else smile too – what kind of piece are you looking for?"
    },
    {
        patterns: [/help/i],
        response: "I'm here to help! 🙌 You can ask me for: rings, earrings, pendants, bracelets, or tell me about an occasion, mood, or color you love!"
    }
];

// --- Constants & Maps ---
const COLOR_MAP: Record<string, string[]> = {
    'yellow': ['Citrine', 'Lemon Topaz', 'Gold'],
    'blue': ['Blue Topaz', 'Sky Blue Topaz', 'Lapis', 'Lapis Lazuli', 'Tanzanite', 'Sapphire'],
    'purple': ['Amethyst', 'Rose Amethyst'],
    'green': ['Emerald', 'Peridot'],
    'pink': ['Rose Quartz', 'Rose Amethyst', 'Ruby'],
    'white': ['Pearl', 'Moonstone', 'Opal', 'White Topaz', 'CZ', 'Cubic Zirconia'],
    'clear': ['CZ', 'Cubic Zirconia', 'White Topaz'],
    'black': ['Onyx', 'Spinel', 'Black Tourmaline'],
    'red': ['Garnet', 'Ruby']
};

const MOOD_MAP: Record<string, string[]> = {
    'calm': ['Amethyst', 'Blue Topaz', 'Aquamarine', 'Lapis', 'Moonstone'],
    'energy': ['Citrine', 'Garnet', 'Ruby', 'Sunstone'],
    'love': ['Rose Quartz', 'Emerald', 'Ruby', 'Garnet', 'Moonstone'],
    'focus': ['Lapis', 'Sodalite', 'Fluorite', 'Clear Quartz', 'CZ'],
    'protection': ['Black Tourmaline', 'Onyx', 'Lapis', 'Amethyst'],
    'wealth': ['Citrine', 'Pyrite', 'Green Aventurine', 'Jade'],
    'confidence': ['Citrine', 'Tiger Eye', 'Garnet', 'Ruby']
};

const OCCASION_MAP: Record<string, { keywords: string[], types?: string[] }> = {
    'wedding': { keywords: ['bridal', 'elegant', 'pearl', 'diamond', 'white', 'set'], types: ['Necklace', 'Earrings'] },
    'party': { keywords: ['statement', 'bold', 'cocktail', 'dangle', 'chandelier'], types: ['Earrings', 'Ring'] },
    'work': { keywords: ['simple', 'stud', 'minimal', 'classic', 'small'], types: ['Earrings', 'Pendant'] },
    'daily': { keywords: ['simple', 'minimal', 'stud', 'light', 'everyday'], types: ['Earrings', 'Pendant'] },
    'gift': { keywords: ['box', 'set', 'love', 'heart', 'meaningful'], types: ['Necklace', 'Bracelet'] },
    'date': { keywords: ['romantic', 'rose', 'heart', 'delicate', 'pink'] }
};

const GIFT_RELATION_MAP: Record<string, { stones: string[] }> = {
    'mother': { stones: ['Pearl', 'Moonstone', 'Amethyst', 'Rose Quartz'] },
    'mom': { stones: ['Pearl', 'Moonstone', 'Amethyst', 'Rose Quartz'] },
    'girlfriend': { stones: ['Rose Quartz', 'Ruby', 'Garnet', 'Moonstone', 'Pearl'] },
    'wife': { stones: ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Amethyst'] },
    'sister': { stones: ['Aquamarine', 'Peridot', 'Turquoise', 'Amethyst'] },
    'friend': { stones: ['Lapis', 'Turquoise', 'Citrine', 'Amethyst'] }
};

// --- Helper Functions ---

const analyzeQuery = (query: string): QueryAnalysis => {
    const lowerQuery = query.toLowerCase();
    const stones: string[] = [];
    const excludedStones: string[] = []; // New
    const types: string[] = [];
    let priceLimit: number | null = null;
    let isQuestion = false;
    let questionType: QueryAnalysis['questionType'];

    // Detect Question Intent
    if (query.match(/^(what|how|do|does|can|is|are|where|when|why)/i) || query.includes('?')) {
        isQuestion = true;
        if (query.includes('ship') || query.includes('return') || query.includes('policy') || query.includes('contact')) {
            questionType = 'policy';
        } else if (query.includes('mean') || query.includes('benefit') || query.includes('signif') || query.includes('good for')) {
            questionType = 'stone_lore';
        } else if (query.includes('made of') || query.includes('material') || query.includes('real') || query.includes('fade')) {
            questionType = 'product_specific';
        } else {
            questionType = 'general';
        }
    }

    // Extract Stones with Negative Lookbehind simulation
    Object.values(StoneType).forEach(stone => {
        const stoneLower = stone.toLowerCase();
        if (lowerQuery.includes(stoneLower)) {
            // Check for negative context: "no citrine", "not citrine", "dont want citrine", "don't want citrine"
            const regex = new RegExp(`(no|not|dont want|don't want|other than|except)\\s+((?:\\w+\\s+)?)${stoneLower}`, 'i');
            if (regex.test(lowerQuery)) {
                excludedStones.push(stone);
            } else {
                stones.push(stone);
            }
        }
    });

    // Handle explicit "rose amethyst" to allow it even if "amethyst" is excluded, OR exclude it properly
    if (lowerQuery.includes('rose amethyst')) {
        // If "no amethyst" was detected, it might have accidentally caught "rose amethyst". 
        // But usually "no amethyst" means no purple. 
        // Let's refine: If "rose amethyst" is present, ensure we handle it specifically.
        // Existing logic:
        const index = stones.indexOf(StoneType.AMETHYST);
        if (index > -1) stones.splice(index, 1);
        if (!stones.includes(StoneType.ROSE_AMETHYST) && !excludedStones.includes(StoneType.ROSE_AMETHYST) && !regexIsNegated('rose amethyst', lowerQuery)) {
            stones.push(StoneType.ROSE_AMETHYST);
        }
    }

    // Cleanup: Remove excluded stones from positive list (just in case)
    excludedStones.forEach(ex => {
        const idx = stones.indexOf(ex);
        if (idx > -1) stones.splice(idx, 1);
    });

    // Extract Types
    Object.values(ProductType).forEach(type => {
        // Handle "ring" vs "earring" collision
        if (type === ProductType.RING && lowerQuery.includes('earring')) return;

        if (lowerQuery.includes(type.toLowerCase()) || (type === ProductType.PENDANT && lowerQuery.includes('necklace'))) {
            types.push(type);
        }
    });

    // Extract Price
    const priceMatch = lowerQuery.match(/(?:under|below|less than)\s?\$?(\d+)/);
    if (priceMatch) {
        priceLimit = parseInt(priceMatch[1], 10);
    }

    // Extract Tokens (remove stones/types/price for cleaner keyword search)
    let tokens = lowerQuery.split(/\s+/).filter(t =>
        !stones.some(s => s.toLowerCase().includes(t)) &&
        !types.some(type => type.toLowerCase().includes(t)) &&
        !['under', 'below', 'less', 'than', 'show', 'me', 'i', 'want', 'need', 'looking', 'for', 'a', 'an', 'the', 'no', 'not', 'dont', 'do', 'n\'t'].includes(t)
    );

    return { stones, excludedStones, types, priceLimit, tokens, isQuestion, questionType };
};

const regexIsNegated = (phrase: string, text: string): boolean => {
    const regex = new RegExp(`(no|not|dont want|don't want|other than|except)\\s+((?:\\w+\\s+)?)${phrase}`, 'i');
    return regex.test(text);
}

export const buildContextFromHistory = (history: ChatMessage[]): SearchContext => {
    const context: SearchContext = {
        stones: [],
        excludedStones: [],
        types: [],
        priceLimit: null
    };

    // Iterate efficiently: Recent messages overwrite older ones for constraints
    // But we accumulate *all* relevant info?
    // Actually, "Citrine" then "Amethyst" -> probably switched preference.
    // "Ring" then "Earrings" -> probably switched preference.
    // So usually last mention wins?
    // OR: "Show me Citrine rings". "Anything cheaper?" -> Context: Citrine + Ring + (New Price).

    // Let's sweep forward to replicate user journey
    history.filter(m => m.role === 'user').forEach(msg => {
        const analysis = analyzeQuery(msg.text);

        // If negative intent found, Add to exclusions AND Remove from positives
        if (analysis.excludedStones.length > 0) {
            context.excludedStones = [...new Set([...context.excludedStones, ...analysis.excludedStones])];
            // Remove these from current context stones
            context.stones = context.stones.filter(s => !analysis.excludedStones.includes(s));
        }

        // Standard updates (Latest wins for positives)
        if (analysis.stones.length > 0) {
            context.stones = analysis.stones;
            // Also clear them from exclusions if they are explicitly asked for again?
            // User: "No citrine" -> Context Exclude: Citrine
            // User: "Actually show me citrine" -> Context Stone: Citrine. Should remove from exclude.
            context.excludedStones = context.excludedStones.filter(s => !analysis.stones.includes(s));
        }

        if (analysis.types.length > 0) context.types = analysis.types;   // Replace!
        if (analysis.priceLimit !== null) context.priceLimit = analysis.priceLimit; // Replace!
    });

    return context;
};

// --- Oracle Logic (New) ---
const consultOracle = (query: string, analysis: QueryAnalysis, context?: SearchContext): string | null => {
    const lowerQuery = query.toLowerCase();

    // 1. Policy Phase
    if (analysis.questionType === 'policy') {
        if (lowerQuery.includes('ship') || lowerQuery.includes('delivery') || lowerQuery.includes('long')) {
            return `**Shipping Info:** ${COMPANY_POLICIES.shipping.domestic} For international: ${COMPANY_POLICIES.shipping.international}`;
        }
        if (lowerQuery.includes('return') || lowerQuery.includes('refund') || lowerQuery.includes('exchange')) {
            return `**Returns:** ${COMPANY_POLICIES.returns.window} ${COMPANY_POLICIES.returns.eligibility}`;
        }
        if (lowerQuery.includes('contact') || lowerQuery.includes('support') || lowerQuery.includes('phone')) {
            return `You can reach us specifically on WhatsApp at ${COMPANY_POLICIES.contact.whatsapp}.`;
        }
        return `I can help with Shipping, Returns, or Contact info. ${COMPANY_POLICIES.shipping.costs}`;
    }

    // 2. Stone Lore Phase
    if (analysis.questionType === 'stone_lore' || (analysis.stones.length > 0 && query.includes('mean'))) {
        // If specific stone asked
        if (analysis.stones.length > 0) {
            const stone = analysis.stones[0].toLowerCase();
            const lore = STONE_LORE[stone];
            if (lore) return `**${analysis.stones[0]}**: ${lore}`;
        }
        // If context has stone
        if (context?.stones?.length && context.stones.length > 0) {
            const stone = context.stones[0].toLowerCase();
            const lore = STONE_LORE[stone];
            if (lore) return `Speaking of **${context.stones[0]}**, did you know? ${lore}`;
        }
    }

    // 3. Product Specification Phase
    if (analysis.questionType === 'product_specific') {
        if (lowerQuery.includes('silver') || lowerQuery.includes('gold') || lowerQuery.includes('metal')) {
            return PRODUCT_FAQ.materials;
        }
        if (lowerQuery.includes('care') || lowerQuery.includes('clean') || lowerQuery.includes('water')) {
            return PRODUCT_FAQ.care;
        }
        if (lowerQuery.includes('custom') || lowerQuery.includes('make')) {
            return PRODUCT_FAQ.customization;
        }
    }

    return null; // No direct oracle answer, proceed to product search
};

export const findMatchingProducts = (query: string, context?: SearchContext): ScoredProduct[] => {
    const analysis = analyzeQuery(query);
    const lowerQuery = query.toLowerCase();

    // MERGE CONTEXT
    // If current query has NO stone, use context stone, UNLESS it's excluded
    const activeStones = analysis.stones.length > 0 ? analysis.stones : (context?.stones || []);
    const activeTypes = analysis.types.length > 0 ? analysis.types : (context?.types || []);
    const activePrice = analysis.priceLimit !== null ? analysis.priceLimit : (context?.priceLimit || null);

    // Merge Exclusions
    const activeExclusions = [...analysis.excludedStones, ...(context?.excludedStones || [])];

    const scoredProducts: ScoredProduct[] = [];
    const tokens = analysis.tokens;

    // Strict abort if empty (but let Oracle handle pure questions first in response gen)
    if (tokens.length === 0 && activeStones.length === 0 && activeTypes.length === 0 && !analysis.isQuestion) return [];

    PRODUCTS.forEach(product => {
        // 0. NEGATIVE FILTER (New)
        if (activeExclusions.some(ex => product.stone.toLowerCase() === ex.toLowerCase())) {
            return; // Skip excluded stones
        }

        let score = 0;
        const reasons: string[] = [];

        // 0. STRICT FILTER
        if (activeTypes.length > 0) {
            const productTypeLower = product.type.toLowerCase();
            const matchesType = activeTypes.some(t => productTypeLower === t.toLowerCase());
            if (!matchesType) return;
        }

        if (activeStones.length > 0) {
            const matchesStone = activeStones.some(s => product.stone.toLowerCase() === s.toLowerCase());
            if (!matchesStone) return;
        }

        // 0.5 Price Filter (Strict)
        if (activePrice !== null) {
            if (product.price > activePrice) {
                return; // Skip this product
            } else {
                score += 10; // Bonus for fitting budget
            }
        }

        // 1. Exact Stone Match
        for (const stoneVal of Object.values(StoneType)) {
            if (lowerQuery.includes(stoneVal.toLowerCase()) && product.stone.toLowerCase() === stoneVal.toLowerCase()) {
                score += 60;
                reasons.push(`features **${product.stone}**`);
                break;
            }
        }

        // 2. Product Type Match
        for (const typeVal of Object.values(ProductType)) {
            if (lowerQuery.includes(typeVal.toLowerCase()) && product.type.toLowerCase() === typeVal.toLowerCase()) {
                score += 40;
                reasons.push(`is a ${product.type}`);
                break;
            }
        }

        // 3. Color Match (Updated to new COLOR_MAP)
        Object.entries(COLOR_MAP).forEach(([color, stones]) => {
            if (lowerQuery.includes(color) && stones.includes(product.stone)) {
                // Ensure we don't suggest excluded stones via color
                if (activeExclusions.some(ex => stones.includes(ex) && product.stone === ex)) return;

                score += 25;
                reasons.push(`has that **${color}** hue`);
            }
        });

        // 4. Mood/Benefit Match (Updated to new MOOD_MAP)
        Object.entries(MOOD_MAP).forEach(([mood, stones]) => {
            if (lowerQuery.includes(mood) && stones.includes(product.stone)) {
                score += 30;
                reasons.push(`is perfect for **${mood}**`);
            }
        });

        // Direct benefit search (from product.benefits)
        product.benefits.forEach(benefit => {
            if (lowerQuery.includes(benefit.toLowerCase())) {
                score += 25;
                reasons.push(`brings **${benefit}**`);
            }
        });

        // 5. Occasion Intelligence (Updated to new OCCASION_MAP)
        Object.entries(OCCASION_MAP).forEach(([occasion, data]) => {
            if (lowerQuery.includes(occasion)) {
                // Boost matching Types
                if (data.types?.some(t => product.type.includes(t))) score += 15;
                // Boost matching Keywords/Stones
                if (data.keywords.some(k => product.title.toLowerCase().includes(k) || product.stone.toLowerCase().includes(k) || product.tags.some(tag => tag.toLowerCase().includes(k)))) {
                    score += 25;
                    reasons.push(`is perfect for a **${occasion}**`);
                }
            }
        });

        // 6. Gift Persona Logic (Updated to new GIFT_RELATION_MAP)
        Object.entries(GIFT_RELATION_MAP).forEach(([relation, data]) => {
            if (lowerQuery.includes(relation)) {
                if (data.stones.includes(product.stone)) {
                    score += 35;
                    reasons.push(`is a thoughtful gift for your **${relation}**`);
                }
            }
        });

        // 7. Styles (Minimalist vs Statement)
        if (lowerQuery.includes('simple') || lowerQuery.includes('minimal')) {
            if (product.type === 'Earrings' || product.title.includes('Solitaire') || product.title.includes('Stud') || product.price < 5000) { // Assuming lower price = simpler often
                score += 15;
                reasons.push('has a minimalist design');
            }
        }
        if (lowerQuery.includes('statement') || lowerQuery.includes('bold') || lowerQuery.includes('big')) {
            if (product.type === 'Ring' || product.title.includes('Cocktail') || product.stone === 'Amethyst') {
                score += 15;
                reasons.push('makes a bold statement');
            }
        }

        // 8. Generic Search
        tokens.forEach(token => {
            if (product.title.toLowerCase().includes(token)) score += 5;
        });

        if (score > 10) { // Minimum threshold to prevent noise
            scoredProducts.push({ product, score, matchReason: reasons });
        }
    });

    return scoredProducts.sort((a, b) => b.score - a.score);
};

// --- Response Generator ---
export const generateStylistResponse = (query: string, history: ChatMessage[] = []): string => {
    const lowerQuery = query.toLowerCase();
    const analysis = analyzeQuery(query);
    const context = buildContextFromHistory(history);
    const activePrice = analysis.priceLimit !== null ? analysis.priceLimit : (context?.priceLimit || null);

    // 1. Consult Oracle first (Pure Chat)
    const oracleWisdom = consultOracle(query, analysis, context);
    if (oracleWisdom) return oracleWisdom;

    // 2. Product Search
    const matches = findMatchingProducts(query, context);

    if (matches.length === 0) {
        if (query.length < 3) return "I'm listening! You can ask me for 'blue rings', 'gifts for mom', or 'something for confidence'.";

        if (activePrice) {
            return `I couldn't find any pieces strictly under $${activePrice}. However, our **Sterling Silver** collection offers incredible value. Would you like to see something in a slightly higher range?`;
        }

        return "I couldn't find an exact match, but our collection has beautiful **Amethyst** and **Moonstone** pieces. Could you tell me more about the color or style you prefer?";
    }

    const primary = matches[0];
    const secondary = matches[1];

    // 3. Dynamic Response Construction

    // Handling "Gift" specifically
    if (lowerQuery.includes('gift')) {
        return `For a gift, the **${primary.product.title}** is an exquisite choice. It ${primary.matchReason[0] || 'is a best-seller'} which makes it very special. It comes in our signature packaging, ready to impress!`;
    }

    // Handling "Under $X" specifically
    if (activePrice) {
        return `I found something perfect within your budget! The **${primary.product.title}** is a stunning piece that ${primary.matchReason[0]}. It's a great value for real ${primary.product.stone}.`;
    }

    // Standard Smart Response
    const templates = [
        `I'd highly recommend the **${primary.product.title}**. It ${primary.matchReason.filter(r => !r.includes('features')).join(' and ')}.`,
        `The **${primary.product.title}** captures exactly what you're looking for. It ${primary.matchReason[0]} and has a real presence.`,
        `You matched with the **${primary.product.title}**! It specifically ${primary.matchReason[0]}.`
    ];

    let text = templates[Math.floor(Math.random() * templates.length)];

    if (secondary && secondary.score > (primary.score * 0.7)) {
        text += `\n\nAnother beautiful option is the **${secondary.product.title}**, if you prefer something ${secondary.matchReason[0]?.includes('tone') ? 'with a different shade' : 'different'}.`;
    }

    return text;
};



