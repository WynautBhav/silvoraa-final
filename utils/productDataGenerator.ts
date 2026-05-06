import { Product, ProductType, StoneType } from '../types';

/**
 * This utility adds structured data to products for display on product pages
 * Based on the live website structure seen in screenshots
 */

// Stone benefits mapping (from STONES constant + traditional meanings)
const STONE_BENEFITS_MAP: Partial<Record<StoneType, { title: string; description: string }[]>> = {
    [StoneType.GARNET]: [
        { title: 'Vitality & Strength', description: 'Garnet is traditionally associated with energy, courage, and grounded vitality.' },
        { title: 'Confident Presence', description: 'Known for its deep red tone, garnet reflects assurance and inner strength.' },
        { title: 'Balanced Brilliance', description: 'CZ accents add refined sparkle, enhancing the halo without overwhelming the stone warmth.' },
    ],
    [StoneType.AMETHYST]: [
        { title: 'Calm & Serenity', description: 'Amethyst is believed to soothe the mind and spirit, bringing peace and tranquility.' },
        { title: 'Intuitive Focus', description: 'Associated with clarity of thought and enhanced spiritual awareness.' },
        { title: 'Balanced Energy', description: 'Promotes emotional balance and helps release stress.' },
    ],
    [StoneType.ROSE_AMETHYST]: [
        { title: 'Calm & Serenity', description: 'Rose amethyst carries the calming energy of traditional amethyst with a softer, gentler presence.' },
        { title: 'Love & Compassion', description: 'The blush tones are associated with self-love and emotional healing.' },
        { title: 'Balanced Energy', description: 'Promotes emotional balance and peaceful energy.' },
    ],
    [StoneType.CITRINE]: [
        { title: 'Optimism & Joy', description: 'Citrine is known as the stone of abundance, radiating warmth and positivity.' },
        { title: 'Personal Power', description: 'Believed to boost confidence and manifest intentions.' },
        { title: 'Mental Clarity', description: 'Associated with clear thinking and creative energy.' },
    ],
    [StoneType.CZ]: [
        { title: 'Clarity & Focus', description: 'Cubic Zirconia symbolizes clarity and focused intention.' },
        { title: 'Refined Elegance', description: 'Offers brilliant sparkle that enhances any design.' },
        { title: 'Balanced Light', description: 'Reflects inner light and mental sharpness.' },
    ],
    [StoneType.IOLITE]: [
        { title: 'Truth & Vision', description: 'Iolite is known as the stone of truth, guiding toward clarity and wisdom.' },
        { title: 'Inner Guidance', description: 'Believed to enhance intuition and self-discovery.' },
        { title: 'Calm Perspective', description: 'Associated with peaceful awareness and mental balance.' },
    ],
    [StoneType.LAPIS]: [
        { title: 'Inner Balance & Truth', description: 'Lapis Lazuli is revered for truthful expression and self-awareness.' },
        { title: 'Wisdom & Insight', description: 'Traditionally associated with deep wisdom and spiritual insight.' },
        { title: 'Calm Confidence', description: 'Promotes inner peace and confident communication.' },
    ],
    [StoneType.TOPAZ]: [
        { title: 'Confidence & Authenticity', description: 'Topaz is believed to amplify personal power and truth.' },
        { title: 'Joy & Abundance', description: 'Associated with prosperity and positive energy.' },
        { title: 'Clear Expression', description: 'Enhances self-expression and confidence.' },
    ],
    [StoneType.BLUE_TOPAZ]: [
        { title: 'Calm & Clarity', description: 'Blue topaz promotes peaceful communication and mental clarity.' },
        { title: 'Serene Confidence', description: 'Associated with tranquil self-assurance.' },
        { title: 'Balanced Perspective', description: 'Brings clarity and calm to decision-making.' },
    ],
    [StoneType.SKY_BLUE_TOPAZ]: [
        { title: 'Serenity & Openness', description: 'Sky blue topaz embodies peaceful clarity and openness.' },
        { title: 'Clear Communication', description: 'Believed to enhance truthful and calm expression.' },
        { title: 'Inner Peace', description: 'Promotes tranquility and emotional balance.' },
    ],
    [StoneType.LEMON_TOPAZ]: [
        { title: 'Mental Clarity & Energy', description: 'Lemon topaz is associated with clear thinking and vitality.' },
        { title: 'Optimistic Focus', description: 'Brings bright energy and mental sharpness.' },
        { title: 'Balanced Intention', description: 'Enhances purposeful action and clarity.' },
    ],
    [StoneType.TOURMALINE]: [
        { title: 'Creative Flow & Balance', description: 'Tourmaline is known for harmonizing energy and inspiring creativity.' },
        { title: 'Grounded Stability', description: 'Associated with stability and protective energy.' },
        { title: 'Renewal & Harmony', description: 'Promotes balance and fresh perspective.' },
    ],
    [StoneType.EMERALD]: [
        { title: 'Growth & Harmony', description: 'Emerald is the stone of renewal, growth, and balanced energy.' },
        { title: 'Compassionate Love', description: 'Traditionally associated with unconditional love.' },
        { title: 'Vibrant Vitality', description: 'Promotes abundance and vitality.' },
    ],
    [StoneType.OTHER]: [
        { title: 'Creativity & Hope', description: 'Opal inspires imagination and emotional expression.' },
        { title: 'Emotional Harmony', description: 'Believed to balance emotions and inspire positivity.' },
        { title: 'Luminous Energy', description: 'Reflects inner light and creative potential.' },
    ],
    [StoneType.ROSE_QUARTZ]: [
        { title: 'Love & Compassion', description: 'Rose quartz is the stone of unconditional love and self-care.' },
        { title: 'Gentle Healing', description: 'Associated with emotional healing and inner peace.' },
        { title: 'Nurturing Energy', description: 'Promotes compassion and gentle strength.' },
    ],
    [StoneType.LABRADORITE]: [
        { title: 'Transformation & Intuition', description: 'Labradorite is known for enhancing intuition and inner magic.' },
        { title: 'Protective Energy', description: 'Believed to shield and strengthen the aura.' },
        { title: 'Mystical Awareness', description: 'Awakens spiritual awareness and fresh starts.' },
    ],
    [StoneType.PERIDOT]: [
        { title: 'Renewal & Prosperity', description: 'Peridot symbolizes growth, renewal, and abundance.' },
        { title: 'Positive Energy', description: 'Associated with joy and optimistic vitality.' },
        { title: 'Emotional Balance', description: 'Promotes harmony and release of negativity.' },
    ],
    [StoneType.BLUE_SAPPHIRE]: [
        { title: 'Wisdom & Focus', description: 'Blue sapphire is revered for mental clarity and wise judgment.' },
        { title: 'Calm Confidence', description: 'Associated with serene strength and integrity.' },
        { title: 'Protective Clarity', description: 'Believed to shield and enhance focus.' },
    ],
    [StoneType.MOONSTONE]: [
        { title: 'Intuition & New Beginnings', description: 'Moonstone enhances intuitive awareness and fresh starts.' },
        { title: 'Emotional Balance', description: 'Associated with calming emotions and feminine energy.' },
        { title: 'Inner Growth', description: 'Promotes self-discovery and inner peace.' },
    ],
    [StoneType.RUBY]: [
        { title: 'Passion & Vitality', description: 'Ruby embodies passion, courage, and vibrant energy.' },
        { title: 'Confident Power', description: 'Associated with strength and leadership.' },
        { title: 'Loving Energy', description: 'Promotes passionate expression and devotion.' },
    ],
    [StoneType.SAPPHIRE]: [
        { title: 'Wisdom & Truth', description: 'Sapphire is the stone of wisdom, loyalty, and noble truth.' },
        { title: 'Mental Clarity', description: 'Enhances focus and clear judgment.' },
        { title: 'Spiritual Insight', description: 'Promotes spiritual awareness and integrity.' },
    ],
    [StoneType.TANZANITE]: [
        { title: 'Transformation & Awareness', description: 'Tanzanite inspires spiritual growth and transformation.' },
        { title: 'Calm Perception', description: 'Associated with heightened perception and calm.' },
        { title: 'Compassionate Insight', description: 'Promotes understanding and compassionate wisdom.' },
    ],
    [StoneType.AQUAMARINE]: [
        { title: 'Calm & Courage', description: 'Aquamarine embodies the tranquility of the sea and clear courage.' },
        { title: 'Clear Communication', description: 'Associated with truthful and calm expression.' },
        { title: 'Soothing Energy', description: 'Promotes emotional clarity and stress release.' },
    ],
    [StoneType.TURQUOISE]: [
        { title: 'Protection & Healing', description: 'Turquoise is a stone of protection, healing, and positive energy.' },
        { title: 'Spiritual Grounding', description: 'Associated with balance between physical and spiritual.' },
        { title: 'Communication & Wisdom', description: 'Enhances truthful expression and ancient wisdom.' },
    ],
    [StoneType.PEARL]: [
        { title: 'Purity & Wisdom', description: 'Pearls symbolize purity, wisdom, and serene beauty.' },
        { title: 'Calming Energy', description: 'Associated with emotional balance and tranquility.' },
        { title: 'Integrity & Loyalty', description: 'Promotes sincerity and harmonious relationships.' },
    ],
    [StoneType.ONYX]: [
        { title: 'Strength & Protection', description: 'Onyx offers grounding strength and protective energy.' },
        { title: 'Focused Determination', description: 'Associated with discipline and inner fortitude.' },
        { title: 'Balanced Power', description: 'Promotes confidence and self-mastery.' },
    ],
    [StoneType.MALACHITE]: [
        { title: 'Transformation & Protection', description: 'Malachite is known for deep transformation and protective energy.' },
        { title: 'Emotional Healing', description: 'Associated with releasing past traumas.' },
        { title: 'Heart Chakra', description: 'Promotes heart-centered awareness and growth.' },
    ],
};

// Standard care guide that applies to all jewelry
const STANDARD_CARE_GUIDE = [
    'As each piece is crafted and finished by hand, slight variations in size may occur.',
    'Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.',
    'This jewelry is intended for personal expression and well-being, not as a substitute for medical care.',
];

// Generate specifications based on product type and stone
export function generateProductSpecifications(product: Product): Record<string, string> {
    const specs: Record<string, string> = {
        'Metal': 'High-Polished 925 Sterling Silver',
        'Primary Stone': product.stone,
    };

    // Add side stones if present in tags
    const hasBlueSapphire = product.tags.includes('blue sapphire');
    const hasCZ = product.tags.includes('cz') || product.tags.includes('cubic zirconia');

    if (hasBlueSapphire && hasCZ) {
        specs['Side Stones'] = 'Cubic Zirconia (CZ)';
    } else if (hasCZ && product.stone !== StoneType.CZ) {
        specs['Side Stones'] = 'Cubic Zirconia (CZ)';
    }

    // Determine cut/shape from product title
    const titleLower = product.title.toLowerCase();
    if (titleLower.includes('round')) {
        specs['Cut / Shape'] = 'Round';
    } else if (titleLower.includes('oval')) {
        specs['Cut / Shape'] = 'Oval';
    } else if (titleLower.includes('pear')) {
        specs['Cut / Shape'] = 'Pear';
    } else if (titleLower.includes('emerald cut')) {
        specs['Cut / Shape'] = 'Emerald cut';
    } else if (titleLower.includes('cushion')) {
        specs['Cut / Shape'] = 'Cushion';
    } else if (titleLower.includes('princess')) {
        specs['Cut / Shape'] = 'Princess';
    } else if (titleLower.includes('marquise')) {
        specs['Cut / Shape'] = 'Marquise';
    } else if (titleLower.includes('octagon') || titleLower.includes('crest')) {
        specs['Cut / Shape'] = 'Octagonal';
    } else if (titleLower.includes('square') || titleLower.includes('solitaire')) {
        specs['Cut / Shape'] = 'Square';
    } else if (titleLower.includes('triangle') || titleLower.includes('peak')) {
        specs['Cut / Shape'] = 'Triangle';
    } else if (product.stone === StoneType.OTHER || titleLower.includes('cabochon')) {
        specs['Cut / Shape'] = 'Round cabochon';
    } else {
        // Default based on product type
        if (product.type === ProductType.EARRINGS || product.type === ProductType.RING) {
            specs['Cut / Shape'] = 'Round';
        } else {
            specs['Cut / Shape'] = 'Oval';
        }
    }

    // Design specifics based on product type
    if (product.type === ProductType.RING) {
        if (titleLower.includes('halo')) {
            specs['Design'] = 'Double halo setting with a central garnet framed by CZ and garnet accents';
        } else if (titleLower.includes('solitaire')) {
            specs['Design'] = 'Classic solitaire design with refined proportions';
        } else if (titleLower.includes('eternity')) {
            specs['Design'] = 'Continuous band of matched stones';
        } else if (titleLower.includes('corona')) {
            specs['Design'] = 'Regal corona setting with refined details';
        } else {
            specs['Design'] = 'Refined setting with balanced proportions';
        }
        specs['Wearability'] = 'Smooth inner band for comfortable, everyday wear';

    } else if (product.type === ProductType.EARRINGS) {
        // Add closure type for earrings
        if (titleLower.includes('drop') || titleLower.includes('cascade')) {
            specs['Design'] = 'Graceful drop design with refined movement';
            specs['Closure Type'] = 'Secure hook fastening';
        } else if (titleLower.includes('stud') || titleLower.includes('halo')) {
            specs['Design'] = 'Halo-style stud earrings';
            specs['Closure Type'] = 'Push-back fastening';
        } else if (titleLower.includes('hoop')) {
            specs['Design'] = 'Elegant hoop silhouette';
            specs['Closure Type'] = 'Hinged clasp';
        } else if (titleLower.includes('chandelier')) {
            specs['Design'] = 'Chandelier drop design with layered details';
            specs['Closure Type'] = 'Secure hook fastening';
        } else {
            specs['Design'] = 'Classic stud with secure post backing';
            specs['Closure Type'] = 'Push-back fastening';
        }
        specs['Wearability'] = 'Lightweight and secure for comfortable, everyday wear';

    } else if (product.type === ProductType.PENDANT) {
        if (titleLower.includes('bloom')) {
            specs['Design'] = 'Floral-inspired setting with detailed metalwork';
        } else if (titleLower.includes('solitaire')) {
            specs['Design'] = 'Clean solitaire pendant with minimal setting';
        } else if (titleLower.includes('charm')) {
            specs['Design'] = 'Uniquely shaped stone in a refined charm setting';
        } else if (titleLower.includes('dew drop')) {
            specs['Design'] = 'Dew drop pendant with graceful silhouette';
        } else {
            specs['Design'] = 'Refined pendant design with balanced proportions';
        }
        specs['Chain'] = 'Pairs beautifully with silver chains (sold separately)';
        specs['Wearability'] = 'Lightweight and elegant for everyday wear';

    } else if (product.type === ProductType.NECKLACE) {
        specs['Design'] = 'Integrated necklace design with refined details';
        specs['Wearability'] = 'Adjustable length for versatile styling';

    } else if (product.type === ProductType.BRACELET) {
        specs['Design'] = 'Link bracelet design with fluid movement';
        specs['Closure Type'] = 'Secure clasp fastening';
        specs['Wearability'] = 'Adjustable fit for comfortable, everyday wear';

    } else if (product.type === ProductType.NOSE_RING) {
        specs['Design'] = 'Delicate nose ring with secure hoop fit';
        specs['Wearability'] = 'Lightweight and comfortable for daily wear';
    }

    return specs;
}

// Get stone benefits text (newline-separated for the component)
export function generateStoneBenefits(stone: StoneType): string {
    const benefits = STONE_BENEFITS_MAP[stone] || [];
    return benefits.map(b => `${b.title}: ${b.description}`).join('\n');
}

// Get care guide text (newline-separated)
export function generateCareGuide(): string {
    return STANDARD_CARE_GUIDE.join('\n');
}

// Regex pattern for extracting description paragraph
const DESCRIPTION_PARAGRAPH_REGEX = /<h2><strong>Description:<\/strong><\/h2>\s*<p>([\s\S]*?)<\/p>/;

// Decode HTML entities to their string equivalents
function decodeHtmlEntities(text: string): string {
    return text
        .replace(/<[^>]+>/g, '') // Strip HTML tags
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
}

// Extract plain text from first description paragraph
function extractDescriptionText(html: string): string {
    if (!html) return '';

    const match = html.match(DESCRIPTION_PARAGRAPH_REGEX);
    if (match?.[1]) {
        return decodeHtmlEntities(match[1]);
    }

    // Fallback: return the description as-is if no HTML structure found
    return html;
}

// Stylist notes by stone
const STYLIST_NOTES: Record<string, string> = {
    'Amethyst': "The serene violet tone of amethyst brings a sense of calm and intuitive focus. Perfect for mindful moments — whether it's a quiet morning ritual or an evening of thoughtful presence.",
    'Rose Amethyst': "Rose amethyst carries a soft, romantic energy with its delicate pink-violet hue. It adds warmth and emotional balance, making it ideal for moments that call for gentle confidence.",
    'Citrine': "Sunlit citrine radiates warmth and optimism. Its golden clarity brings a sense of abundance and personal momentum — sunshine you can wear through your day.",
    'Blue Topaz': "The cool blue tone of blue topaz soothes the mind and invites clear communication. It's a grounding stone for moments when you need calm focus and open expression.",
    'Sky Blue Topaz': "Sky blue topaz offers a fresh, airy clarity that lifts the spirit. Its light reflection creates a serene presence, perfect for daily wear that feels effortless and bright.",
    'Lemon Topaz': "Bright and energizing, lemon topaz brings mental clarity and joy. Its crisp yellow hue sparks optimism and confident energy for the day ahead.",
    'Garnet': "Deep and grounding, garnet carries a rich, warm energy that steadies and protects. It's a stone for those who seek inner strength and renewed confidence.",
    'Cubic Zirconia': "Cubic zirconia offers pure, brilliant clarity that catches light with effortless elegance. Its mirror-bright sparkle adds architectural polish to any look.",
    'Lapis Lazuli': "Royal blue lapis lazuli carries timeless depth and wisdom. Its rich indigo character adds grounding presence and quiet confidence to any ensemble.",
    'Emerald': "Verdant emerald brings renewal and harmony. Its rich green depth is both grounding and uplifting — a stone that speaks to growth and emotional balance.",
    'Iolite': "Iolite's distinctive violet-blue tone offers grounding wisdom. It's a stone for those who value inner clarity and calm self-expression.",
    'Tourmaline': "Tourmaline's multifaceted energy brings balance and protection. Its diverse colors offer versatility while maintaining a grounded, confident presence.",
    'Rose Quartz': "Rose quartz carries gentle, nurturing energy that promotes self-love and emotional healing. Its soft pink hue adds warmth and compassion to any look.",
    'Labradorite': "Labradorite's mysterious shimmer carries ancient wisdom. Its flash of color reveals hidden depths — perfect for those who embrace their unique magic.",
    'Opal': "Opal's ethereal play of color captures light in mysterious ways. Each stone is one-of-a-kind, reflecting your individual spirit and creative energy.",
};

export function getStylistNote(stone: string): string {
    return STYLIST_NOTES[stone] || `A beautiful ${stone} piece that brings elegance and meaning to your look.`;
}

// Enrich a product with structured data
export function enrichProduct(product: Product): Product {
    // Normalize stone values at the source - fixes data inconsistencies
    let normalizedStone = product.stone;
    if (product.stone === StoneType.OTHER || (product.stone as string) === 'Other') {
        // Check if this is actually an Opal product by tags
        const tags = product.tags?.map(t => t.toLowerCase()) || [];
        if (tags.includes('opal')) {
            normalizedStone = StoneType.OPAL;
        }
    }
    
    return {
        ...product,
        stone: normalizedStone as Product['stone'],
        description_text: extractDescriptionText(product.description),
        specifications: generateProductSpecifications(product),
        stone_benefits: generateStoneBenefits(normalizedStone),
        care_guide: generateCareGuide(),
        // Generate stylist_note if not present
        stylist_note: product.stylist_note || getStylistNote(normalizedStone),
    };
}

