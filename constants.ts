import { GlobalConfig, HeroConfig, NavConfig, Product, ProductType, StoneBenefit, StoneType, MotionConfig } from './types';

// --- NO-CODE CONTROL SYSTEM ---

export const MOTION: MotionConfig = {
  duration: {
    fast: 200,
    normal: 400,
    slow: 600
  },
  easing: {
    premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
    standard: 'ease-in-out'
  }
};

export const GLOBAL_CONFIG: GlobalConfig = {
  companyName: 'Silvoraa',
  tagline: 'Accessible Luxury in Gemstone Jewelry',
  colors: {
    primary: '#D4AF37',      // silvoraa-gold
    secondary: '#B8941E',    // silvoraa-deepGold
    background: '#FFFFFF',   // silvoraa-white
    text: '#1A1A1A',         // silvoraa-black
    textSecondary: '#6B6B6B' // silvoraa-warmGray
  },
  whatsapp: {
    number: '+919876543210',
    defaultMessage: "Hi, I'm interested in your jewelry!",
    buttonPosition: 'bottom-right',
    visibleOn: 'all'
  }
};

export const HERO_CONFIG: HeroConfig = {
  mode: 'video-carousel',
  scrollSpeedDuration: 60,
  hoverBehavior: 'none',
  fullscreenOnFirstLoad: true,
  defaultHeight: '70vh',
  timeline: {
    show: true,
    style: 'progress',
    position: 'bottom-center'
  },
  slides: [
    {
      id: '1',
      type: 'image',
      src: '/images/B1.png',
      mobileSrc: '/images/b1-phone.png',
      bgColor: '#F7F3EC',
      overlay: { 
        enabled: true, 
        heading: "", 
        subheading: "", 
        ctaText: "SHOP ALL", 
        link: '/shop', 
        align: 'left', 
        pos: { top: '25', left: '15', mTop: '40', mLeft: '50', translateX: '0', translateY: '0', mTranslateX: '-50', mTranslateY: '-50' },
        ctaPos: { top: '78', left: '82', mTop: '80', mLeft: '62', translateX: '-50', translateY: '-50', mTranslateX: '-50', mTranslateY: '-50' }
      }
    },
    {
      id: '2',
      type: 'image',
      src: '/images/B2.png',
      mobileSrc: '/images/banner2_phone.jpeg',
      bgColor: '#F5F4F0',
      overlay: { 
        enabled: true, 
        heading: "", 
        subheading: "", 
        ctaText: "SHOP ALL", 
        ctaKicker: "",
        link: '/shop', 
        align: 'left', 
        layout: 'title-first',
        pos: { top: '40', left: '40', mTop: '40', mLeft: '50', translateX: '0', translateY: '0', mTranslateX: '-50', mTranslateY: '-50' },
        ctaPos: { top: '72', left: '18', mTop: '89', mLeft: '75', translateX: '-50', translateY: '-50', mTranslateX: '-50', mTranslateY: '-50' }
      }
    },
    {
      id: '3',
      type: 'image',
      src: '/images/B3.png',
      mobileSrc: '/images/b3-phone.png',
      bgColor: '#F9F8F6',
      overlay: { 
        enabled: true, 
        heading: "", 
        subheading: "", 
        ctaText: "SHOP ALL", 
        ctaKicker: "",
        link: '/shop', 
        align: 'right', 
        layout: 'title-first',
        pos: { top: '30', left: '15', mTop: '40', mLeft: '50', translateX: '0', translateY: '0', mTranslateX: '-50', mTranslateY: '-50' },
        ctaPos: { top: '84', left: '76', mTop: '69.8', mLeft: '50', translateX: '-50', translateY: '-50', mTranslateX: '-50', mTranslateY: '-50' }
      }
    }
  ]
};

export const NAV_CONFIG: NavConfig = {
  logo: {
    text: 'Silvoraa',
  },
  scrollThreshold: 60,
  pill: {
    maxWidth: '1200px',
    backgroundOpacity: 0.85,
    blur: 16,
    saturate: 180,
    borderRadius: 100,
    shadowEnabled: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.5)'
  },
  padding: {
    top: { x: 43, y: 22 },
    scrolled: { x: 32, y: 16 }
  },
  mobile: {
    width: '95%',
    padding: { x: 20, y: 12 },
    borderRadius: 48
  },
  animation: {
    duration: MOTION.duration.normal,
    easing: MOTION.easing.premium
  },
  menuItems: [
    { label: 'Shop All', link: '/shop' },
    { label: 'Shop by Type', link: '/shop', dropdown: true },
    { label: 'Shop by Stone', link: '/collections', dropdown: true },
    { label: 'Our Story', link: '/about' }
  ]
};

export const STONES: StoneBenefit[] = [
  {
    id: '1',
    benefit: 'Optimism',
    stone: StoneType.CITRINE,
    description: 'Warm optimism and joy with golden abundance that brightens your path.',
    imageOverlayDescription: 'Traditionally associated with positivity and a brighter outlook.',
    imageUrl: '/images/stone-items/Citrine.png',
    filterParam: 'citrine'
  },
  {
    id: '2',
    benefit: 'Calm',
    stone: StoneType.AMETHYST,
    description: 'Calm in stillness that soothes mind and spirit, bringing peace.',
    imageOverlayDescription: 'Traditionally associated with tranquility and emotional balance.',
    imageUrl: '/images/stone-items/Amethyst.png',
    filterParam: 'amethyst',
    relatedStones: [StoneType.AMETHYST, StoneType.ROSE_AMETHYST]
  },
  {
    id: '3',
    benefit: 'Focus',
    stone: StoneType.CZ,
    description: 'Sharp clarity that channels energy toward what matters, reflecting inner light.',
    imageOverlayDescription: 'Crafted for clarity and brilliance, reflecting a sharp, focused energy.',
    imageUrl: '/images/stone-items/Cubic Zirconia.png',
    filterParam: 'cz'
  },
  {
    id: '4',
    benefit: 'Vitality',
    stone: StoneType.GARNET,
    description: 'Deep vitality that rekindles passion and fire, awakening inner power.',
    imageOverlayDescription: 'Traditionally associated with vitality and inner strength.',
    imageUrl: '/images/stone-items/Garnet.png',
    filterParam: 'garnet'
  },
  {
    id: '5',
    benefit: 'Truth',
    stone: StoneType.IOLITE,
    description: 'Guides toward truth while clearing illusion, awakening inner wisdom.',
    imageOverlayDescription: 'Traditionally associated with insight and inner guidance.',
    imageUrl: '/images/stone-items/Iolite.png',
    filterParam: 'iolite'
  },
  {
    id: '6',
    benefit: 'Inner Balance',
    stone: StoneType.LAPIS,
    description: 'Inner balance as truth aligns with expression, opening deeper insight.',
    imageOverlayDescription: 'Traditionally associated with wisdom and emotional harmony.',
    imageUrl: '/images/stone-items/Lapiz.png',
    filterParam: 'lapis'
  },
  {
    id: '7',
    benefit: 'Confidence',
    stone: StoneType.TOPAZ,
    description: 'Confidence shines as you stand in your power, amplifying authenticity.',
    imageOverlayDescription: 'Traditionally associated with confidence and self-expression.',
    imageUrl: '/images/stone-items/Topaz.png',
    filterParam: 'topaz',
    relatedStones: [StoneType.TOPAZ, StoneType.BLUE_TOPAZ, StoneType.SKY_BLUE_TOPAZ, StoneType.LEMON_TOPAZ]
  },
  {
    id: '8',
    benefit: 'Creative Flow',
    stone: StoneType.TOURMALINE,
    description: 'Creative spectrum opens as imagination flows, bringing balance and harmony.',
    imageOverlayDescription: 'Traditionally associated with creative energy and emotional flow.',
    imageUrl: '/images/stone-items/Tourmaline.png',
    filterParam: 'tourmaline'
  },
  {
    id: '9',
    benefit: 'Creative Spark',
    stone: StoneType.CZ,
    description: 'Brilliant clarity that sparks imagination and amplifies creative vision with every facet.',
    imageOverlayDescription: 'Crafted for brilliance and clarity, reflecting a sharp, focused energy.',
    imageUrl: '/images/stone-items/Cubic Zirconia.png',
    filterParam: 'cz'
  }
];

// Products imported from Shopify CSV
export const PRODUCTS: Product[
] = [
  {
    id: 'n1',
    title: 'Lunelle Cz Drop Nose Ring',
    handle: 'lunelle-cz-drop-nose-ring',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Lunelle CZ Drop Nose Ring is designed to feel delicate yet expressive when worn. A slim silver hoop is lined with fine Cubic Zirconia, offering a soft shimmer that feels refined rather than bold. Suspended below, a single CZ drop adds gentle movement, creating a subtle focal point that draws the eye without overwhelming the face. Crafted in High-Polished 925 Sterling Silver, this nose ring feels light, secure, and comfortable for extended wear.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round-cut CZ with drop detail<br>• <strong>Design:</strong> Hoop nose ring with dangling CZ accent<br>• <strong>Closure Type:</strong> Hinged hoop fastening<br>• <strong>Wearability:</strong> Lightweight design for comfortable, all-day wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Subtle Sparkle:</strong> CZ offers a refined brilliance that enhances facial features without feeling excessive.<br>• <strong>Graceful Detail:</strong> The drop element adds soft movement, giving the piece quiet character.<br>• <strong>Everyday Comfort:</strong> Lightweight and secure, this nose ring is designed to be worn effortlessly throughout the day.</p>
<h2><strong>How to Style:</strong></h2>
<p>Its clean silhouette and gentle sparkle pair beautifully with both minimal makeup looks and dressed-up ensembles, making it an easy choice for daily wear or special occasions. <br><br><br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_566882971_Photoroom_20250716_021753.webp',
    images: ['/images/products/optimized/opt_566882971_Photoroom_20250716_021753.webp', '/images/products/optimized/opt_1934409972_Do_a_model_2k_202601031121_1.webp', '/images/products/optimized/opt_630659642_Do_a_model_2k_202601031121_4.webp', '/images/products/optimized/opt_1787322728_Photoroom_20250716_021648.webp'],
    type: ProductType.NOSE_RING,
    stone: StoneType.CZ,
    variants: [],
    tags: ['cz', 'nose rings', 'silver'],
    benefits: [],
  },
  {
    id: 'b2',
    title: 'Elowen Rose Amethyst & Blue Sapphire Link Bracelet',
    handle: 'elowen-rose-amethyst-and-blue-sapphire-link-bracelet',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Elowen Rose Amethyst &amp; Blue Sapphire Link Bracelet is designed to feel graceful and fluid on the wrist. Soft blush-toned rose amethyst stones are set in an elegant linked silhouette, offering a gentle warmth that feels calm and refined. Accents of deep blue sapphire add contrast and depth, creating a balanced interplay of color that feels expressive yet composed. Crafted in High-Polished 925 Sterling Silver, the bracelet drapes naturally along the wrist, feeling smooth, secure, and thoughtfully made for everyday wear.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Rose Amethyst<br>• <strong>Side Stones:</strong> Blue Sapphire<br>• <strong>Cut / Shape:</strong> Oval and round-cut stones<br>• <strong>Design:</strong> Linked bracelet with alternating stone detailing<br>• <strong>Closure Type:</strong> Secure clasp fastening<br>• <strong>Wearability:</strong> Flexible links for comfortable, natural movement on the wrist</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Soft Balance:</strong> Rose amethyst is traditionally associated with calmness and emotional balance, bringing a gentle presence to everyday styling.<br>• <strong>Refined Contrast:</strong> Blue sapphire accents add depth and definition without overpowering the design.<br>•<strong> Everyday Elegance:</strong> The linked construction offers fluid movement while remaining polished and easy to wear.</p>
<h2><strong>How to Style:</strong></h2>
<p>The soft blush and deep blue tones pair beautifully with neutrals, pastels, and evening silhouettes, making this bracelet a refined addition to both daily wear and understated occasions. <br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_14759839_Photoroom_20250716_022212.webp',
    images: ['/images/products/optimized/opt_14759839_Photoroom_20250716_022212.webp', '/images/products/optimized/opt_303740737_Do_a_model_2k_202601031117_1.webp', '/images/products/optimized/opt_1300812371_Do_a_model_2k_202601031117_2.webp', '/images/products/optimized/opt_1779026530_Photoroom_20250716_022526.webp'],
    type: ProductType.BRACELET,
    stone: StoneType.ROSE_AMETHYST,
    variants: [],
    tags: ['blue sapphire', 'bracelets', 'rose amethyst', 'silver'],
    benefits: ['Calm', 'Balance'],
  },
  {
    id: 'r3',
    title: 'Serenelle Cz Chandelier Drop Earrings',
    handle: 'serenelle-cz-chandelier-drop-earrings',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Serenelle CZ Chandelier Drop Earrings are designed to feel ornate yet composed when worn. Layered circular motifs create a graceful structure, detailed entirely with Cubic Zirconia that adds refined brilliance without feeling excessive. Below, delicate CZ-set drops bring soft movement, allowing the earrings to sway naturally and catch light with subtle elegance. Crafted in High-Polished 925 Sterling Silver, they balance intricate detailing with a comfortable, well-distributed weight that feels considered on the ear.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round-cut CZ accents<br>• <strong>Design:</strong> Chandelier-style drop earrings with layered circular detailing<br>• <strong>Closure Type:</strong> Push-back fastening<br>• <strong>Wearability:</strong> Balanced construction with fluid movement for comfortable occasion wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Refined Brilliance:</strong> CZ detailing delivers a soft, diamond-like sparkle that feels elegant rather than bold.<br>• <strong>Graceful Movement:</strong> The cascading design adds flow and presence without heaviness.<br>• <strong>Statement with Ease:</strong> Intricate yet balanced, these earrings elevate an outfit while remaining comfortable to wear.</p>
<h2><strong>How to Style:</strong></h2>
<p>Pair these earrings with evening wear, festive ensembles, or monochrome outfits to let their detailed silhouette and soft shimmer take center stage.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1763456848_Photoroom_20250716_021601.webp',
    images: ['/images/products/optimized/opt_1763456848_Photoroom_20250716_021601.webp', '/images/products/optimized/opt_2060286056_Do_a_model_2k_202601031133_5.webp', '/images/products/optimized/opt_1063213797_Do_a_model_2k_202601031133_6.webp', '/images/products/optimized/opt_1997890890_Photoroom_20250716_021522.webp'],
    type: ProductType.EARRINGS,
    stone: StoneType.CZ,
    variants: [],
    tags: ['cz', 'earrings', 'silver'],
    benefits: ['Balance'],
  },
  {
    id: 'r4',
    title: 'Solara Citrine Halo Stud Earrings',
    handle: 'solara-citrine-halo-stud-earrings',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solara Citrine Halo Stud Earrings are designed to bring warmth and quiet brightness to everyday wear. At the center, a round citrine radiates a soft golden hue, offering a sense of light and clarity without feeling bold. A delicate halo of Cubic Zirconia frames the stone, adding gentle sparkle that enhances the citrine’s natural glow. Set in High-Polished 925 Sterling Silver, these studs sit comfortably on the ear, feeling secure, balanced, and effortlessly refined.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Side Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round-cut citrine<br>• <strong>Design:</strong> Halo-style stud earrings with elevated setting<br>• <strong>Closure Type:</strong> Push-back fastening<br>• <strong>Wearability:</strong> Lightweight and secure for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warm Clarity:</strong> Citrine is traditionally associated with positivity and a clear, uplifting presence.<br>• <strong>Soft Brilliance:</strong> CZ accents add refined sparkle, enhancing the stone without overpowering it.<br>• <strong>Everyday Ease:</strong> The balanced stud design makes these earrings easy to wear from morning through evening.</p>
<h2><strong>How to Style:</strong></h2>
<p>The warm golden tones pair beautifully with neutral outfits and soft pastels, making these studs a natural choice for daily wear and understated occasions.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1174661066_Photoroom_20250716_020500.webp',
    images: ['/images/products/optimized/opt_1174661066_Photoroom_20250716_020500.webp', '/images/products/optimized/opt_2132537657_Do_a_model_2k_202601031132_1.webp', '/images/products/optimized/opt_1165358118_Do_a_model_2k_202601031132_2.webp', '/images/products/optimized/opt_1742471165_Photoroom_20250716_020539.webp'],
    type: ProductType.EARRINGS,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['citrine', 'earrings', 'silver'],
    benefits: ['Balance', 'Clarity'],
  },
  {
    id: 'r5',
    title: 'Aquarelle Blue Topaz & Blue Sapphire Halo Stud Earrings',
    handle: 'aquarelle-blue-topaz-and-blue-sapphire-halo-stud-earrings',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Aquarelle Blue Topaz &amp; Blue Sapphire Halo Stud Earrings are designed to feel expressive yet composed on the ear. At the center, a pear-shaped blue topaz brings a clear, tranquil blue that feels fresh and light. Surrounding it, deep blue sapphire accents form a softly contoured halo, adding contrast and definition without overwhelming the design. Set in High-Polished 925 Sterling Silver, these studs feel balanced and secure, offering a refined presence that remains easy to wear throughout the day.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Blue Topaz<br>• <strong>Side Stones:</strong> Blue Sapphire<br>• <strong>Cut / Shape:</strong> Pear-cut center stone<br>• <strong>Design:</strong> Halo-style stud earrings with sculpted silhouette<br>• <strong>Closure Type:</strong> Push-back fastening<br>• <strong>Wearability:</strong> Lightweight and well-balanced for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Clarity &amp; Calm:</strong> Blue topaz is traditionally associated with clarity of thought and a sense of calm.<br>• <strong>Depth &amp; Contrast:</strong> Blue sapphire accents add richness and visual depth, enhancing the overall silhouette.<br>• <strong>Refined Presence:</strong> The sculpted halo design offers character while remaining understated and elegant.</p>
<h2><strong>How to Style:</strong></h2>
<p>The layered blue tones pair beautifully with crisp whites, soft greys, and evening neutrals, making these studs a versatile choice for both polished daytime looks and relaxed evenings.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1966230897_Photoroom_20250716_020110.webp',
    images: ['/images/products/optimized/opt_1966230897_Photoroom_20250716_020110.webp', '/images/products/optimized/opt_45392979_prompt_a_2k_202601111439_1.webp', '/images/products/optimized/opt_168609859_prompt_a_2k_202601111439.webp', '/images/products/optimized/opt_175140725_Photoroom_20250716_020234.webp'],
    type: ProductType.EARRINGS,
    stone: StoneType.BLUE_TOPAZ,
    variants: [],
    tags: ['blue sapphire', 'blue topaz', 'earrings', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r6',
    title: 'Aurielle Opal Halo Stud Earrings',
    handle: 'aurielle-opal-halo-stud-earrings',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Aurielle Opal Halo Stud Earrings are designed to feel luminous yet understated when worn. At the center, a smooth opal displays soft flashes of green, blue, and warm gold, creating a gentle play of color that feels refined rather than bold. A delicate halo of Cubic Zirconia surrounds the stone, adding subtle brightness that enhances the opal’s natural glow. Set in High-Polished 925 Sterling Silver, these studs sit comfortably on the ear, offering a composed and quietly elegant presence.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Opal<br>• <strong>Side Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round cabochon<br>• <strong>Design:</strong> Halo-style stud earrings<br>• <strong>Closure Type:</strong> Push-back fastening<br>• <strong>Wearability:</strong> Lightweight and secure for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Soft Luminosity:</strong> Opal is admired for its natural play of color, bringing a gentle, expressive glow.<br>• <strong>Balanced Elegance:</strong> The CZ halo adds refinement and clarity without overpowering the center stone.<br>• <strong>Everyday Ease:</strong> Compact and comfortable, these studs are designed to be worn often and effortlessly.</p>
<h2><strong>How to Style:</strong></h2>
<p>Their subtle color play pairs beautifully with neutral tones and soft pastels, making these studs an easy choice for daily wear or polished, minimal looks.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_303304821_Photoroom_20250619_004509.webp',
    images: ['/images/products/optimized/opt_303304821_Photoroom_20250619_004509.webp', '/images/products/optimized/opt_1626464526_prompt_a_2k_202601111441.webp', '/images/products/optimized/opt_1671432398_prompt_a_2k_202601111442.webp'],
    type: ProductType.EARRINGS,
    stone: StoneType.OPAL,
    variants: [],
    tags: ['earrings', 'opal', 'silver'],
    benefits: ['Balance', 'Clarity'],
  },
  {
    id: 'r7',
    title: 'Lunara Amethyst Cascade Earrings',
    handle: 'lunara-amethyst-cascade-earrings',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Lunara Amethyst Cascade Earrings are designed to feel graceful and composed the moment you wear them. At the center, a pear-shaped amethyst rests within a softly angular frame, its deep violet tone bringing quiet depth and presence. The surrounding Cubic Zirconia accents add a subtle shimmer, while a second amethyst drop below introduces gentle movement that feels fluid and balanced. Crafted in High-Polished 925 Sterling Silver, these earrings sit lightly on the ears, offering an expressive yet effortless finish.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Side Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Pear-cut amethyst<br>• <strong>Design:</strong> Framed drop earrings with cascading lower stone<br>• <strong>Closure Type:</strong> Hook fastening<br>• <strong>Wearability:</strong> Lightweight with smooth movement for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Balance:</strong> Amethyst is traditionally associated with inner calm and emotional clarity.<br>• <strong>Quiet Elegance:</strong> The layered silhouette adds visual interest while remaining refined and understated.<br>• <strong>Soft Radiance:</strong> CZ accents provide a gentle brilliance, enhancing the design without overpowering its character.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich violet tones and subtle sparkle pair beautifully with neutral outfits and evening looks, making these earrings an easy choice for both day-to-night wear.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_2071332348_Photoroom_20250716_015719.webp',
    images: ['/images/products/optimized/opt_2071332348_Photoroom_20250716_015719.webp', '/images/products/optimized/opt_501922307_Do_a_model_2k_202601031128_1.webp', '/images/products/optimized/opt_195223435_Do_a_model_2k_202601031128_5.webp', '/images/products/optimized/opt_1563077534_Photoroom_20250716_015859.webp'],
    type: ProductType.EARRINGS,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['amethyst', 'earrings', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'p8',
    title: 'Indigo Lapis Lazuli Truth Dew Drop Pendant',
    handle: 'indigo-lapis-lazuli-truth-dew-drop-pendant',
    price: 3080.0,
    description: `<h2><strong>Description:</strong></h2>
<p>Indigo Lapis Lazuli Truth Dew Drop Pendant is designed to feel grounding, wise, and quietly powerful. At its center, a pear Lapis Lazuli holds a deep, royal blue tone - symbolizing truth and self-expression. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Lapis Lazuli<br>• <strong>Stone Size:</strong> Free Size<br>• <strong>Cut / Shape:</strong> Pear<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Deep Contrast:</strong> Lapis lazuli’s rich blue offers depth and bold visual identity.<br>• <strong>Timeless Character:</strong> A timeless character that feels both classic and enduring.<br>• <strong>Wisdom &amp; Truth:</strong> Lapis is traditionally worn to inspire truth, wisdom, and calm communication.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich indigo depth serves as a refined daily signature, ideal for anchoring a white shirt and denim or a classic black turtleneck.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_443823865_Photoroom_20250716_024957.webp',
    images: ['/images/products/optimized/opt_443823865_Photoroom_20250716_024957.webp', '/images/products/optimized/opt_1164323967_Do_a_model_2k_202601031003_1.webp', '/images/products/optimized/opt_2133571753_Do_a_model_2k_202601031003_2.webp', '/images/products/optimized/opt_1511003148_Photoroom_20250716_025048.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.LAPIS,
    variants: [],
    tags: ['lapis lazuli', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Wisdom'],
  },
  {
    id: 'p9',
    title: 'Indigo Lapis Lazuli Refined Charm Pendant',
    handle: 'indigo-lapis-lazuli-refined-charm-pendant',
    price: 2530.0,
    description: `<h2><strong>Description:</strong></h2>
<p>Indigo Lapis Lazuli Refined Charm Pendant is designed to feel grounding, wise, and quietly powerful. At its center, a uniquely shaped Lapis Lazuli holds a deep, royal blue tone - symbolizing truth and self-expression. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Lapis Lazuli<br>• <strong>Stone Size:</strong> Free Size<br>• <strong>Cut / Shape:</strong> Custom<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A refined daily companion with a weightless silhouette that rests perfectly close to the heart.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Deep Contrast:</strong> Lapis lazuli’s rich blue offers depth and bold visual identity.<br>• <strong>Timeless Character:</strong> A timeless character that feels both classic and enduring.<br>• <strong>Wisdom &amp; Truth:</strong> Lapis is traditionally worn to inspire truth, wisdom, and calm communication.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich indigo depth serves as a refined daily signature, ideal for anchoring a white shirt and denim or a classic black turtleneck.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_363831355_Photoroom_20250716_024916.webp',
    images: ['/images/products/optimized/opt_363831355_Photoroom_20250716_024916.webp', '/images/products/optimized/opt_1729290991_Do_a_model_2k_202601031342_1.webp', '/images/products/optimized/opt_1159780626_Do_a_model_2k_202601031343_2.webp', '/images/products/optimized/opt_1585748032_Photoroom_20250716_024825.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.LAPIS,
    variants: [],
    tags: ['lapis lazuli', 'pendant', 'silver'],
    benefits: ['Calm', 'Wisdom', 'Truth'],
  },
  {
    id: 'p10',
    title: 'Ember Trine Harmony Pendant',
    handle: 'ember-trine-harmony-pendant',
    price: 5610.0,
    description: `<h2><strong>Description:</strong></h2>
<p>Ember Trine Harmony Pendant is designed to feel refined, intentional, and quietly elegant. At its center, a round and oval arrangement of Citrine, Garnet, Amethyst, and Iolite holds a vibrant, intentional tone—symbolizing balance, clarity, and personal meaning. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>

<h2><strong>Product Features:</strong></h2>
<p>
• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>
• <strong>Primary Stones:</strong> Citrine, Garnet, Amethyst, Iolite<br>
• <strong>Stone Size:</strong> Round 5 mm and Oval 6 X 4 mm<br>
• <strong>Cut / Shape:</strong> Custom<br>
• <strong>Design:</strong> A refined solitaire-inspired setting with clean, modern lines<br>
• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.
</p>

<h2><strong>Benefits:</strong></h2>
<p>
• <strong>Harmony &amp; Balance:</strong> A vibrant combination of natural stones traditionally worn to invite balanced energy and joy.<br>
• <strong>Emotional Clarity:</strong> The thoughtful pairing of stones is often associated with inner calm, confidence, and mindful expression.<br>
• <strong>Everyday Refinement:</strong> A timeless design that transitions seamlessly from daily wear to meaningful occasions.
</p>

<h2><strong>How to Style:</strong></h2>
<p>Wear it as a standalone statement for a clean, intentional look, or layer it with fine silver chains for a modern, personal composition. Its subtle color harmony makes it ideal for both neutral outfits and soft accent tones.</p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1823374804_Photoroom_20250716_024637.webp',
    images: ['/images/products/optimized/opt_1823374804_Photoroom_20250716_024637.webp', '/images/products/optimized/opt_299674713_Do_a_model_2k_202601031340.webp', '/images/products/optimized/opt_688251013_Photoroom_20250716_024637.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['amethyst', 'citrine', 'garnet', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'p11',
    title: 'Radiant Trine Harmony Pendant',
    handle: 'radiant-trine-harmony-pendant',
    price: 6930.0,
    description: `<h2><strong>Description:</strong></h2>
<p>Radiant Trine Harmony Pendant is designed to feel refined, intentional, and quietly elegant. At its center, an oval Citrine, Blue Topaz, Amethyst holds a vibrant, intentional tone - symbolizing balance and personal meaning. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine, Blue Topaz, Amethyst<br>• <strong>Stone Size:</strong> 6 X 8 mm and 7 x 5 mm<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A weightless silhouette that settles naturally, designed for a soft, unhurried presence against the skin.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Harmony:</strong> The combination of natural stones is traditionally associated with a sense of calm alignment and inner ease.<br>• <strong>Balance:</strong> Known for their complementary energies, these stones symbolize stability and a feeling of grounded balance.<br>• <strong>Joyful Presence:</strong> Their vibrant colors are often linked to uplifting moods and a light, joyful expression.</p>
<h2><strong>How to Style:</strong></h2>
<p>The medley of natural stones serves as a refined daily signature, perfect for adding a touch of personal elegance to your look.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_632669360_P34.webp',
    images: ['/images/products/optimized/opt_632669360_P34.webp', '/images/products/optimized/opt_875449609_prompt_a_2k_202601111726_1.webp', '/images/products/optimized/opt_1880338623_prompt_a_2k_202601111726.webp', '/images/products/optimized/opt_1766697301_Photoroom_20250716_024359.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['amethyst', 'blue topaz', 'citrine', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Joy'],
  },
  {
    id: 'p12',
    title: 'Azure Blue Topaz Crest Pendant',
    handle: 'azure-blue-topaz-crest-pendant',
    price: 3080.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Azure Blue Topaz Crest Pendant is designed to feel fresh, uplifting, and quietly sophisticated. At its center, an octagonal Blue Topaz holds a clear, intentional tone - symbolizing peace and clear perspective. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Blue Topaz<br>• <strong>Stone Size:</strong> 9 X 7<br>• <strong>Cut / Shape:</strong> Octagonal (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calming Ease:</strong> Blue topaz is traditionally associated with soothing stress and encouraging a sense of calm.<br>• <strong>Clear Thinking:</strong> Often linked to mental clarity, it symbolizes fresh, focused thoughts and lightness of mind.<br>• <strong>Confident Expression:</strong> Known for its bright blue sparkle, blue topaz is connected with open, confident communication.</p>
<h2><strong>How to Style:</strong></h2>
<p>The fresh sky-blue tones serves as a refined daily signature, perfect for adding a touch of clarity to business-casual wear.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_905542101_Photoroom_20250716_023708.webp',
    images: ['/images/products/optimized/opt_905542101_Photoroom_20250716_023708.webp', '/images/products/optimized/opt_1577497751_prompt_a_2k_202601111720_1.webp', '/images/products/optimized/opt_192869068_prompt_a_2k_202601111720.webp', '/images/products/optimized/opt_1606082876_Photoroom_20250716_023708.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.BLUE_TOPAZ,
    variants: [],
    tags: ['blue topaz', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'p13',
    title: 'Celeste Cubic Zirconia Solitaire Pendant',
    handle: 'celeste-cubic-zirconia-grand-solitaire-pendant',
    price: 1320.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Celeste Cubic Zirconia Solitaire Pendant is designed to feel light, intentional, and quietly refined. At its center, a square Cubic Zirconia (CZ) holds a clear, intentional tone – symbolizing clarity and focused intention. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Cubic Zirconia (CZ)<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Stone Size:</strong> 8 × 10 mm<br>• <strong>Cut / Shape:</strong> Square (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Clarity &amp; Focus:</strong> CZ is associated with mental clarity and intention, symbolizing clear thought and balanced perspective.<br>• <strong>Refined Sparkle:</strong> CZ accents gently lift the design with soft brilliance, offering an understated radiance rather than overt shine.<br>• <strong>Everyday Elegance:</strong> The clean solitaire form and polished silver setting create a timeless piece that transitions effortlessly from daily wear to elevated moments.<br></p>
<h2><strong>How to Style:</strong></h2>
<p>The mirror-bright sparkle serves as a refined daily signature, adding a touch of architectural polish to contemporary workwear.</p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>• As each piece is crafted and finished by hand, slight variations in size may occur.<br>• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.</p>`,
    image: '/images/products/optimized/opt_1415290904_Photoroom_20250716_023036.webp',
    images: ['/images/products/optimized/opt_1415290904_Photoroom_20250716_023036.webp', '/images/products/optimized/opt_342185024_Do_a_model_2k_202601031345_2.webp', '/images/products/optimized/opt_1651959497_Do_a_model_2k_202601031345_4.webp', '/images/products/optimized/opt_368050485_Photoroom_20250716_023036.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CZ,
    variants: [],
    tags: ['cubic zirconia', 'cz', 'pendant', 'silver'],
    benefits: ['Balance', 'Clarity', 'Focus'],
  },
  {
    id: 'p14',
    title: 'Verdant Emerald Charm Pendant',
    handle: 'verdant-emerald-charm-pendant',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Verdant Emerald Charm Pendant is designed to feel harmonious, vibrant, and quietly luxurious. At its center, a uniquely shaped Emerald holds a deep, rich tone - symbolizing growth and balanced energy. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Emerald<br>• <strong>Cut / Shape:</strong> Custom<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p><strong>• Renewal:</strong> Emerald has long been associated with fresh beginnings and a sense of renewal.<br><strong>• Harmony:</strong> Traditionally linked to balance and calm, emerald is admired for bringing a feeling of harmony and emotional steadiness.<br><strong>• Heartfelt Confidence:</strong> Known for its rich green depth, emerald is often connected with quiet confidence and inner assurance.<br></p>
<h2><strong>How to Style:</strong></h2>
<p>The vibrant green serves as a refined daily signature, perfect for adding a touch of luxurious harmony to both day and evening wear.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_2023736335_Photoroom_20250716_021130.webp',
    images: ['/images/products/optimized/opt_2023736335_Photoroom_20250716_021130.webp', '/images/products/optimized/opt_1261133222_Do_a_model_2k_202601030958_2.webp', '/images/products/optimized/opt_1699262254_Do_a_model_2k_202601030958.webp', '/images/products/optimized/opt_487889543_Photoroom_20250716_021130.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.EMERALD,
    variants: [],
    tags: ['emerald', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Harmony'],
  },
  {
    id: 'p15',
    title: 'Amara Amethyst Bloom Pendant',
    handle: 'amara-amethyst-bloom-pendant',
    price: 3300.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Amara Amethyst Bloom Pendant is designed to feel calm, confident, and quietly expressive. At its center, an oval Amethyst holds a deep, intentional tone - symbolizing calm and intuitive focus. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 8 X 10 mm<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines.<br>• <strong>Wearability:</strong> A refined daily companion with a weightless silhouette that rests perfectly close to the heart.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Natural Depth:</strong> The amethyst’s violet tone brings a sense of calm and visual richness.<br>• <strong>Balanced Presence:</strong> Its color feels expressive without being overpowering.<br>• <strong>Calm &amp; Intuition:</strong> Amethyst is traditionally worn to calm the mind, ease stress, and sharpen intuition.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_525490502_Photoroom_20250716_020756.webp',
    images: ['/images/products/optimized/opt_525490502_Photoroom_20250716_020756.webp', '/images/products/optimized/opt_638872165_Do_a_model_2k_202601022358_2.webp', '/images/products/optimized/opt_358179261_Do_a_model_2k_202601022358_3.webp', '/images/products/optimized/opt_664575702_Photoroom_20250716_020704.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['amethyst', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Focus'],
  },
  {
    id: 'p16',
    title: 'Celeste Cubic Zirconia Bloom Pendant',
    handle: 'celeste-cubic-zirconia-bloom-pendant',
    price: 2200.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Celeste Cubic Zirconia Bloom Pendant is designed to feel light, intentional, and quietly refined. At its center, an oval Cubic Zirconia (CZ) holds a clear, intentional tone - symbolizing clarity and focused intention. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Cubic Zirconia (CZ)<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Stone Size:</strong> 8 X 10 mm<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Refined Sparkle:</strong> CZ accents gently lift the design with soft brilliance.<br>• <strong>Clarity:</strong> Associated with clear thought and mental sharpness, CZ symbolizes a sense of openness and understanding.<br>• <strong>Focus:</strong> Often linked to intention and balance, CZ reflects a composed perspective and purposeful attention.</p>
<h2><strong>How to Style:</strong></h2>
<p>The mirror-bright sparkle serves as a refined daily signature, adding a touch of architectural polish to contemporary workwear.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1478411428_Photoroom_20250715_011438.webp',
    images: ['/images/products/optimized/opt_1478411428_Photoroom_20250715_011438.webp', '/images/products/optimized/opt_1456544607_Do_a_model_2k_202601022356_2.webp', '/images/products/optimized/opt_17234300_Do_a_model_2k_202601022356.webp', '/images/products/optimized/opt_304930107_Photoroom_20250715_011438.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CZ,
    variants: [],
    tags: ['cubic zirconia', 'cz', 'pendant', 'silver'],
    benefits: ['Balance', 'Clarity', 'Focus'],
  },
  {
    id: 'p17',
    title: 'Solaris Citrine Dew Drop Pendant',
    handle: 'solaris-citrine-dew-drop-pendant',
    price: 2090.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solaris Citrine Dew Drop Pendant is designed to feel radiant, optimistic, and quietly confident. At its center, a pear Citrine holds a sunlit, intentional tone - symbolizing abundance and personal momentum. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Accent Stones: CZ </strong>(Cubic Zirconia)<br>• <strong>Stone Size:</strong> 7 X 10 mm<br>• <strong>Cut / Shape:</strong> Pear<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A weightless silhouette that settles naturally, designed for a soft, unhurried presence against the skin.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warm Brilliance:</strong> Citrine’s golden hue adds warmth and gentle brightness.<br>• <strong>Uplifting Tone:</strong> The stone’s clarity creates a light, positive visual character.<br>• <strong>Optimism &amp; Abundance:</strong> Citrine is traditionally worn to invite optimism, abundance, and confident energy.</p>
<h2><strong>How to Style:</strong></h2>
<p>The sunlit honey tones serve as a refined daily signature, ideal for bringing a touch of optimism to your everyday rotation.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_674914295_Photoroom_20250715_010834.webp',
    images: ['/images/products/optimized/opt_674914295_Photoroom_20250715_010834.webp', '/images/products/optimized/opt_206050649_Do_a_model_2k_202601022352_1.webp', '/images/products/optimized/opt_1203122906_Do_a_model_2k_202601022352_2.webp', '/images/products/optimized/opt_1689584450_Photoroom_20250715_010507.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['citrine', 'pendant', 'silver'],
    benefits: ['Clarity', 'Abundance', 'Energy'],
  },
  {
    id: 'p18',
    title: 'Calyra Lemon Topaz Grand Bloom Pendant',
    handle: 'calyra-lemon-topaz-grand-bloom-pendant',
    price: 1980.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Calyra Lemon Topaz Grand Bloom Pendant is designed to feel uplifting, clear, and quietly energetic. At its center, an oval Lemon Topaz holds a bright, intentional tone - symbolizing mental clarity and optimism. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Lemon Topaz<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 10 X 14 mm<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Fresh Yellow Hue:</strong> Lemon topaz adds a crisp, lively brightness.<br>• <strong>Clean Visual Energy:</strong> The stone feels light and refined in appearance.<br>• <strong>Mood &amp; Clarity:</strong> Lemon topaz is traditionally worn to lift mood, clear the mind, and spark confident energy.</p>
<h2><strong>How to Style:</strong></h2>
<p>The bright citrus tones serves as a refined daily signature, perfect for lifting a sharp blazer or a pastel daytime look.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1514081567_P27.webp',
    images: ['/images/products/optimized/opt_1514081567_P27.webp', '/images/products/optimized/opt_2020001784_Do_a_model_2k_202601022354_2.webp', '/images/products/optimized/opt_2012150683_Do_a_model_2k_202601022354.webp', '/images/products/optimized/opt_661402029_Photoroom_20250715_010025.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.LEMON_TOPAZ,
    variants: [],
    tags: ['lemon topaz', 'pendant', 'silver'],
    benefits: ['Balance', 'Clarity', 'Energy'],
  },
  {
    id: 'p19',
    title: 'Solaris Citrine Octagon Solitaire Pendant',
    handle: 'solaris-citrine-octagon-solitaire-pendant',
    price: 2640.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solaris Citrine Octagon Solitaire Pendant is designed to feel radiant, optimistic, and quietly confident. At its center, an octagonal Citrine holds a sunlit, intentional tone - symbolizing abundance and personal momentum. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Accent Stones:</strong> CZ (cubic Zirconia)<br>• <strong>Stone Size:</strong> 9 X 7 mm<br>• <strong>Cut / Shape:</strong> Octagonal (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A refined daily companion with a weightless silhouette that rests perfectly close to the heart.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warm Brilliance:</strong> Citrine’s golden hue adds warmth and gentle brightness.<br>• <strong>Uplifting Tone:</strong> The stone’s clarity creates a light, positive visual character.<br>• <strong>Optimism &amp; Abundance:</strong> Citrine is traditionally worn to invite optimism, abundance, and confident energy - sunshine you can wear.</p>
<h2><strong>How to Style:</strong></h2>
<p>The sunlit honey tones serve as a refined daily signature, ideal for bringing a touch of optimism to your everyday rotation.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_516912985_P26.webp',
    images: ['/images/products/optimized/opt_516912985_P26.webp', '/images/products/optimized/opt_1936970254_Do_a_model_2k_202601031014_2.webp', '/images/products/optimized/opt_72232479_Do_a_model_2k_202601031014.webp', '/images/products/optimized/opt_486576181_Photoroom_20250715_002159.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['citrine', 'pendant', 'silver'],
    benefits: ['Clarity', 'Abundance', 'Energy'],
  },
  {
    id: 'p20',
    title: 'Celeste Cubic Zirconia Solitaire Pendant',
    handle: 'celeste-cubic-zirconia-classic-solitaire-pendant',
    price: 2200.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Celeste Cubic Zirconia Solitaire Pendant is designed to feel light, intentional, and quietly refined. At its center, a square Cubic Zirconia (CZ) holds a clear, intentional tone - symbolizing clarity and focused intention. Set in high-polished silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Cubic Zirconia (CZ)<br>• <strong>Accent Stone: </strong>Cubic Zirconia (CZ)<br>• <strong>Stone Size:</strong> 9 X 7 mm<br>• <strong>Cut / Shape:</strong> Square (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Refined Sparkle:</strong> CZ accents gently lift the design with soft brilliance.<br>• <strong>Clarity:</strong> CZ is associated with clear thought and a sense of mental openness, reflecting simplicity and precision.<br>• <strong>Focus:</strong> Often linked to intention, CZ symbolizes a balanced perspective and purposeful attention.</p>
<h2><strong>How to Style:</strong></h2>
<p>The mirror-bright sparkle serves as a refined daily signature, adding a touch of architectural polish to contemporary workwear.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_320719019_Photoroom_20250715_001333.webp',
    images: ['/images/products/optimized/opt_320719019_Photoroom_20250715_001333.webp', '/images/products/optimized/opt_2091376470_Do_a_model_2k_202601022313.webp', '/images/products/optimized/opt_899819601_Do_a_model_2k_202601022316.webp', '/images/products/optimized/opt_1461702687_Photoroom_20250715_001333.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CZ,
    variants: [],
    tags: ['cubic zirconia', 'cz', 'pendant', 'silver'],
    benefits: ['Balance', 'Clarity', 'Focus'],
  },
  {
    id: 'p21',
    title: 'Skylight Sky Blue Topaz Solitaire Pendant',
    handle: 'skylight-sky-blue-topaz-solitaire-pendant',
    price: 2860.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Skylight Sky Blue Topaz Solitaire Pendant is designed to feel soothing, clear, and quietly confident. At its center, a square Sky Blue Topaz holds a clear, intentional tone - symbolizing serenity and open communication. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Sky Blue Topaz<br>• <strong>Accent Stones: </strong>CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 8 X 10 mm<br>• <strong>Cut / Shape:</strong> Square (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A weightless silhouette that settles naturally, designed for a soft, unhurried presence against the skin.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Clear Blue Tone:</strong> Sky blue topaz offers a fresh, airy clarity.<br>• <strong>Light Reflection:</strong> Its transparency allows light to move cleanly through the stone.<br>• <strong>Calm &amp; Communication:</strong> Blue topaz is traditionally worn to soothe stress, clear thoughts and boost confident communication - cool sparkle you can live in.</p>
<h2><strong>How to Style:</strong></h2>
<p>The icy blue serves as a refined daily signature, ideal for adding a touch of cool serenity to a crisp white linen ensemble.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1619365614_Photoroom_20250715_000725.webp',
    images: ['/images/products/optimized/opt_1619365614_Photoroom_20250715_000725.webp', '/images/products/optimized/opt_787649266_Do_a_model_2k_202601022310.webp', '/images/products/optimized/opt_209422987_Do_a_model_2k_202601022311.webp', '/images/products/optimized/opt_163976702_Photoroom_20250715_000725.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.SKY_BLUE_TOPAZ,
    variants: [],
    tags: ['pendant', 'silver', 'sky blue topaz'],
    benefits: ['Calm', 'Clarity'],
  },
  {
    id: 'p22',
    title: 'Celeste Cubic Zirconia Dew Drop Pendant',
    handle: 'celeste-cubic-zirconia-dew-drop-pendant',
    price: 1760.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Celeste Cubic Zirconia Dew Drop Pendant is designed to feel light, intentional, and quietly refined. At its center, a pear Cubic Zirconia (CZ) holds a clear, intentional tone - symbolizing clarity and focused intention. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Cubic Zirconia (CZ)<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Stone Size:</strong> 7 X 10 mm<br>• <strong>Cut / Shape:</strong> Pear<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Refined Sparkle:</strong> CZ accents gently lift the design with soft brilliance.<br>• <strong>Clarity:</strong> CZ is associated with clear thought and a sense of mental openness.<br>• <strong>Focused Intention:</strong> Often linked to intention, CZ reflects a balanced perspective and purposeful focus.</p>
<h2><strong>How to Style:</strong></h2>
<p>The mirror-bright sparkle serves as a refined daily signature, adding a touch of architectural polish to contemporary workwear.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1820641053_P23.webp',
    images: ['/images/products/optimized/opt_1820641053_P23.webp', '/images/products/optimized/opt_2116149902_Do_a_model_2k_202601030000_2.webp', '/images/products/optimized/opt_398555617_Do_a_model_2k_202601030000.webp', '/images/products/optimized/opt_1619162801_Photoroom_20250715_000102.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CZ,
    variants: [],
    tags: ['cubic zirconia', 'cz', 'pendant', 'silver'],
    benefits: ['Balance', 'Clarity', 'Focus'],
  },
  {
    id: 'p23',
    title: 'Nocturne Lapis Lazuli Charm Pendant',
    handle: 'nocturne-lapis-lazuli-charm-pendant',
    price: 3190.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Nocturne Lapis Lazuli Charm Pendant is designed to feel grounding, wise, and quietly powerful. At its center, a uniquely shaped Lapis Lazuli holds a deep, royal blue tone - symbolizing truth and self-expression. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Lapis Lazuli<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A refined daily companion with a weightless silhouette that rests perfectly close to the heart.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Deep Contrast:</strong> Lapis lazuli’s rich blue offers depth and bold visual identity.<br>• <strong>Timeless Character:</strong> Its natural texture gives the stone a grounded, classic feel.<br>• <strong>Wisdom &amp; Truth:</strong> Lapis is traditionally worn to inspire truth, wisdom, and calm communication.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich indigo depth serves as a refined daily signature, ideal for anchoring a white shirt and denim or a classic black turtleneck.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_823711986_P22.webp',
    images: ['/images/products/optimized/opt_823711986_P22.webp', '/images/products/optimized/opt_719891467_Do_a_model_2k_202601031336_1.webp', '/images/products/optimized/opt_542337288_Do_a_model_2k_202601031336.webp', '/images/products/optimized/opt_500410951_Photoroom_20250714_235734.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.LAPIS,
    variants: [],
    tags: ['lapis lazuli', 'pendant', 'silver'],
    benefits: ['Calm', 'Wisdom', 'Truth'],
  },
  {
    id: 'p24',
    title: 'Indigo Lapis Lazuli Wisdom Charm Pendant',
    handle: 'indigo-lapis-lazuli-wisdom-charm-pendant',
    price: 2970.0,
    description: `<h2><strong>Description:</strong></h2>
<p>Indigo Lapis Lazuli Wisdom Charm Pendant is designed to feel grounding, wise, and quietly powerful. At its center, a uniquely shaped Lapis Lazuli holds a deep, royal blue tone - symbolizing truth and self-expression. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Lapis Lazuli<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Deep Contrast:</strong> Lapis lazuli’s rich blue offers depth and bold visual identity.<br>• <strong>Timeless Character:</strong> Its natural texture gives the stone a grounded, classic feel.<br>• <strong>Wisdom &amp; Truth:</strong> Lapis is traditionally worn to inspire truth, wisdom, and calm communication - grounding colour with quiet presence.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich indigo depth serves as a refined daily signature, ideal for anchoring a white shirt and denim or a classic black turtleneck.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_736964108_Photoroom_20250714_235202.webp',
    images: ['/images/products/optimized/opt_736964108_Photoroom_20250714_235202.webp', '/images/products/optimized/opt_1643845307_Do_a_model_2k_202601022345_1.webp', '/images/products/optimized/opt_1858810233_Do_a_model_2k_202601022345.webp', '/images/products/optimized/opt_1624452829_Photoroom_20250714_235305.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.LAPIS,
    variants: [],
    tags: ['lapis lazuli', 'pendant', 'silver'],
    benefits: ['Calm', 'Wisdom', 'Truth'],
  },
  {
    id: 'p25',
    title: 'Indigo Lapis Lazuli Peak Pendant',
    handle: 'indigo-lapis-lazuli-peak-pendant',
    price: 4400.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Indigo Lapis Lazuli Peak Pendant is designed to feel grounding, wise, and quietly powerful. At its center, a triangle Lapis Lazuli holds a deep, royal blue tone - symbolizing truth and self-expression. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Lapis Lazuli<br>• <strong>Cut / Shape:</strong> Triangle<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A weightless silhouette that settles naturally, designed for a soft, unhurried presence against the skin.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Deep Contrast:</strong> Lapis lazuli’s rich blue offers depth and bold visual identity.<br>• <strong>Timeless Character:</strong> Its natural texture gives the stone a grounded, classic feel.<br>• <strong>Wisdom &amp; Truth:</strong> Lapis is traditionally worn to inspire truth, wisdom, and calm communication.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich indigo depth serves as a refined daily signature, ideal for anchoring a white shirt and denim or a classic black turtleneck.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1170429960_P20.webp',
    images: ['/images/products/optimized/opt_1170429960_P20.webp', '/images/products/optimized/opt_1802780704_prompt_a_2k_202601111704.webp', '/images/products/optimized/opt_480620974_prompt_a_2k_202601111704_1.webp', '/images/products/optimized/opt_1559762185_Photoroom_20250708_010814.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.LAPIS,
    variants: [],
    tags: ['lapis lazuli', 'pendant', 'silver'],
    benefits: ['Calm', 'Wisdom', 'Truth'],
  },
  {
    id: 'p26',
    title: 'Azure Blue Topaz Bloom Pendant',
    handle: 'azure-blue-topaz-bloom-pendant',
    price: 2970.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Azure Blue Topaz Bloom Pendant is designed to feel fresh, uplifting, and quietly sophisticated. At its center, an oval Blue Topaz holds a clear, intentional tone - symbolizing peace and clear perspective. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Blue Topaz<br>• <strong>Accent Stones:</strong> Blue Sapphire<br>• <strong>Stone Size:</strong> 8 X 6 mm<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Soothing Calm:</strong> Blue Topaz is traditionally associated with easing stress and encouraging a sense of calm and balance.<br>• <strong>Mental Clarity:</strong> Often linked to clear thinking, blue topaz is admired for helping thoughts feel light and focused.<br>• <strong>Confident Expression:</strong> Blue topaz has long been connected with confident and open communication.</p>
<h2><strong>How to Style:</strong></h2>
<p>The fresh sky-blue tones serves as a refined daily signature, perfect for adding a touch of clarity to business-casual wear.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_2103356371_Photoroom_20250708_005927.webp',
    images: ['/images/products/optimized/opt_2103356371_Photoroom_20250708_005927.webp', '/images/products/optimized/opt_273678367_Do_a_model_2k_202601031010_1.webp', '/images/products/optimized/opt_723393245_Do_a_model_2k_202601031010_2.webp', '/images/products/optimized/opt_1122294730_Photoroom_20250708_005845.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.BLUE_TOPAZ,
    variants: [],
    tags: ['blue topaz', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'p27',
    title: 'Solaris Citrine Classic Solitaire Pendant',
    handle: 'solaris-citrine-classic-solitaire-pendant',
    price: 2090.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solaris Citrine Classic Solitaire Pendant is designed to feel radiant, optimistic, and quietly confident. At its center, a square Citrine holds a sunlit, intentional tone - symbolizing abundance and personal momentum. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 9 X 7 mm<br>• <strong>Cut / Shape:</strong> Square (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A refined daily companion with a weightless silhouette that rests perfectly close to the heart.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warm Brilliance:</strong> Citrine’s golden hue adds warmth and gentle brightness.<br>• <strong>Uplifting Tone:</strong> The stone’s clarity creates a light, positive visual character.<br>• <strong>Optimism &amp; Abundance:</strong> Citrine is traditionally worn to invite optimism, abundance, and confident energy - sunshine you can wear.</p>
<h2><strong>How to Style:</strong></h2>
<p>The sunlit honey tones serve as a refined daily signature, ideal for bringing a touch of optimism to your everyday rotation.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_564890104_Keep_everything_as_2k_202601171443_1.webp',
    images: ['/images/products/optimized/opt_564890104_Keep_everything_as_2k_202601171443_1.webp', '/images/products/optimized/opt_449831333_Do_a_model_2k_202601022334.webp', '/images/products/optimized/opt_1299594980_Keep_everything_as_2k_202601171443.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['citrine', 'pendant', 'silver'],
    benefits: ['Clarity', 'Abundance', 'Energy'],
  },
  {
    id: 'p28',
    title: 'Amara Amethyst Classic Solitaire Pendant',
    handle: 'amara-amethyst-classic-solitaire-pendant',
    price: 1870.0,
    description: `<h2><strong>Description:</strong></h2>
<p>Amara Amethyst Classic Solitaire Pendant is designed to feel calm, confident, and quietly expressive. At its center, a square Amethyst holds a deep, intentional tone - symbolizing calm and intuitive focus. Set in high-polished silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stone:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 9 X 7 mm<br>• <strong>Cut / Shape:</strong> Square (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Natural Depth:</strong> The amethyst’s violet tone brings a sense of calm and visual richness.<br>• <strong>Balanced Presence:</strong> Its color feels expressive without being overpowering.<br>• <strong>Calm &amp; Intuition:</strong> Amethyst is traditionally worn to calm the mind, ease stress, and sharpen intuition - violet glow with purpose.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1683063276_Photoroom_20250708_003931.webp',
    images: ['/images/products/optimized/opt_1683063276_Photoroom_20250708_003931.webp', '/images/products/optimized/opt_1086706596_Do_a_model_2k_202601031008_1.webp', '/images/products/optimized/opt_1222576052_Do_a_model_2k_202601031008.webp', '/images/products/optimized/opt_905362476_Photoroom_20250708_003623.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['amethyst', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Focus'],
  },
  {
    id: 'p29',
    title: 'Skylight Sky Blue Topaz Bloom Pendant',
    handle: 'skylight-sky-blue-topaz-bloom-pendant',
    price: 2640.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Skylight Sky Blue Topaz Bloom Pendant is designed to feel soothing, clear, and quietly confident. At its center, an oval Sky Blue Topaz holds a clear, intentional tone - symbolizing serenity and open communication. Set in high-polished silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Sky Blue Topaz<br>• <strong>Accent Stones: </strong>CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 8 X 10 mm<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A weightless silhouette that settles naturally, designed for a soft, unhurried presence against the skin.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Clear Blue Tone:</strong> Sky blue topaz offers a fresh, airy clarity.<br>• <strong>Light Reflection:</strong> Its transparency allows light to move cleanly through the stone.<br>• <strong>Calm &amp; Communication:</strong> Blue topaz is traditionally worn to soothe stress, clear thoughts and boost confident communication.</p>
<h2><strong>How to Style:</strong></h2>
<p>The icy blue serves as a refined daily signature, ideal for adding a touch of cool serenity to a crisp white linen ensemble.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_305394169_Photoroom_20250708_002426.webp',
    images: ['/images/products/optimized/opt_305394169_Photoroom_20250708_002426.webp', '/images/products/optimized/opt_1870253707_Do_a_model_2k_202601022321_3.webp', '/images/products/optimized/opt_1053209855_Do_a_model_2k_202601022321.webp', '/images/products/optimized/opt_490956847_Photoroom_20250708_002501.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.SKY_BLUE_TOPAZ,
    variants: [],
    tags: ['pendant', 'silver', 'sky blue topaz'],
    benefits: ['Calm', 'Clarity'],
  },
  {
    id: 'p30',
    title: 'Solaris Citrine Crest Pendant',
    handle: 'solaris-citrine-crest-pendant',
    price: 2200.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solaris Citrine Crest Pendant is designed to feel radiant, optimistic, and quietly confident. At its center, an octagonal Citrine holds a sunlit, intentional tone - symbolizing abundance and personal momentum. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 9 X 7 mm<br>• <strong>Cut / Shape:</strong> Octagonal (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warm Brilliance:</strong> Citrine’s golden hue adds warmth and gentle brightness.<br>• <strong>Uplifting Tone:</strong> The stone’s clarity creates a light, positive visual character.<br>• <strong>Optimism &amp; Abundance:</strong> Citrine is traditionally worn to invite optimism, abundance, and confident energy - sunshine you can wear.</p>
<h2><strong>How to Style:</strong></h2>
<p>The sunlit honey tones serve as a refined daily signature, ideal for bringing a touch of optimism to your everyday rotation.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1799088215_Photoroom_20250708_001935.webp',
    images: ['/images/products/optimized/opt_1799088215_Photoroom_20250708_001935.webp', '/images/products/optimized/opt_759074090_Do_a_model_2k_202601030020_1.webp', '/images/products/optimized/opt_544676240_Do_a_model_2k_202601030020_4.webp', '/images/products/optimized/opt_1868239693_Photoroom_20250708_001838.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['citrine', 'pendant', 'silver'],
    benefits: ['Balance', 'Clarity', 'Abundance'],
  },
  {
    id: 'p31',
    title: 'Calyra Lemon Topaz Bloom Pendant',
    handle: 'calyra-lemon-topaz-bloom-pendant',
    price: 2640.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Calyra Lemon Topaz Bloom Pendant is designed to feel uplifting, clear, and quietly energetic. At its center, an oval Lemon Topaz holds a bright, intentional tone - symbolizing mental clarity and optimism. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Lemon Topaz<br>• <strong>Accent Stones: </strong>CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 8 X 10 mm<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A refined daily companion with a weightless silhouette that rests perfectly close to the heart.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Fresh Yellow Hue:</strong> Lemon topaz adds a crisp, lively brightness.<br>• <strong>Clean Visual Energy:</strong> The stone feels light and refined in appearance.<br>• <strong>Mood &amp; Clarity:</strong> Lemon topaz is traditionally worn to lift mood, clear the mind, and spark confident energy - sunny colour for every day.</p>
<h2><strong>How to Style:</strong></h2>
<p>The bright citrus tones serves as a refined daily signature, perfect for lifting a sharp blazer or a pastel daytime look.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_36396950_Photoroom_20250708_001354.webp',
    images: ['/images/products/optimized/opt_36396950_Photoroom_20250708_001354.webp', '/images/products/optimized/opt_931215537_Do_a_model_2k_202601031346_1.webp', '/images/products/optimized/opt_1062908244_Do_a_model_2k_202601031346_3.webp', '/images/products/optimized/opt_387158777_Photoroom_20250708_001429.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.LEMON_TOPAZ,
    variants: [],
    tags: ['lemon topaz', 'pendant', 'silver'],
    benefits: ['Clarity', 'Energy', 'Optimism'],
  },
  {
    id: 'p32',
    title: 'Aurelia Rose Quartz Solitaire Pendant',
    handle: 'aurelia-rose-quartz-solitaire-pendant',
    price: 2420.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Aurelia Rose Quartz Solitaire Pendant is designed to feel gentle, nurturing, and quietly affectionate. At its center, a square Rose Quartz holds a soft, intentional tone - symbolizing self-love and compassion. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Rose Quartz<br>• <strong>Accent Stone:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 8 X 10 mm<br>• <strong>Cut / Shape:</strong> Square (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Soft Blush Tone:</strong> Rose quartz brings a gentle warmth through its pale pink color.<br>• <strong>Calm Visual Flow:</strong> The stone’s translucence creates a soothing presence.<br>• <strong>Love &amp; Harmony:</strong> Rose Quartz is traditionally worn to open the heart, promote self-love and soothe stress - soft blush tones with meaning.</p>
<h2><strong>How to Style:</strong></h2>
<p>The soft blush tones serves as a refined daily signature, adding a touch of gentle warmth to your everyday style.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1821450257_Photoroom_20250701_234203.webp',
    images: ['/images/products/optimized/opt_1821450257_Photoroom_20250701_234203.webp', '/images/products/optimized/opt_96380485_Do_a_model_2k_202601031103_2.webp', '/images/products/optimized/opt_1504827731_Do_a_model_2k_202601031103.webp', '/images/products/optimized/opt_756109445_Photoroom_20250701_234033.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.ROSE_QUARTZ,
    variants: [],
    tags: ['pendant', 'rose quartz', 'silver'],
    benefits: ['Calm', 'Love', 'Harmony'],
  },
  {
    id: 'p33',
    title: 'Amara Amethyst Crest Pendant',
    handle: 'amara-amethyst-crest-pendant',
    price: 2200.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Amara Amethyst Crest Pendant is designed to feel calm, confident, and quietly expressive. At its center, an octagonal Amethyst holds a deep, intentional tone - symbolizing calm and intuitive focus. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 9 X 7 mm<br>• <strong>Cut / Shape:</strong> Octagonal (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A weightless silhouette that settles naturally, designed for a soft, unhurried presence against the skin.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Natural Depth:</strong> The amethyst’s violet tone brings a sense of calm and visual richness.<br>• <strong>Balanced Presence:</strong> Its color feels expressive without being overpowering.<br>• <strong>Calm &amp; Intuition:</strong> Amethyst is traditionally worn to calm the mind, ease stress, and sharpen intuition.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1752944600_Photoroom_20250701_233017.webp',
    images: ['/images/products/optimized/opt_1752944600_Photoroom_20250701_233017.webp', '/images/products/optimized/opt_934055112_Do_a_model_2k_202601031000_2.webp', '/images/products/optimized/opt_609904452_Do_a_model_2k_202601031000.webp', '/images/products/optimized/opt_1318960660_Photoroom_20250701_233107.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['amethyst', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Focus'],
  },
  {
    id: 'p34',
    title: 'Skylight Sky Blue Topaz Dew Drop Pendant',
    handle: 'skylight-sky-blue-topaz-dew-drop-pendant',
    price: 1980.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Skylight Sky Blue Topaz Dew Drop Pendant is designed to feel soothing, clear, and quietly confident. At its center, a pear Sky Blue Topaz holds a clear, intentional tone - symbolizing serenity and open communication. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Sky Blue Topaz<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 7 X 10<br>• <strong>Cut / Shape:</strong> Pear<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Clear Blue Tone:</strong> Sky blue topaz offers a fresh, airy clarity.<br>• <strong>Light Reflection:</strong> Its transparency allows light to move cleanly through the stone.<br>• <strong>Calm &amp; Communication:</strong> Blue topaz is traditionally worn to soothe stress, clear thoughts and boost confident communication.</p>
<h2><strong>How to Style:</strong></h2>
<p>The icy blue serves as a refined daily signature, ideal for adding a touch of cool serenity to a crisp white linen ensemble.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1278280416_Photoroom_20250701_232356.webp',
    images: ['/images/products/optimized/opt_1278280416_Photoroom_20250701_232356.webp', '/images/products/optimized/opt_1280451082_Do_a_model_2k_202601030015_1.webp', '/images/products/optimized/opt_871627603_Do_a_model_2k_202601030016_1.webp', '/images/products/optimized/opt_2133383198_Do_a_model_2k_202601030016.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.SKY_BLUE_TOPAZ,
    variants: [],
    tags: ['pendant', 'silver', 'sky blue topaz'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'p35',
    title: 'Amara Amethyst Dew Drop Pendant',
    handle: 'amara-amethyst-dew-drop-pendant',
    price: 2090.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Amara Amethyst Dew Drop Pendant is designed to feel calm, confident, and quietly expressive. At its center, a pear Amethyst holds a deep, intentional tone - symbolizing calm and intuitive focus. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 7 X 10 mm<br>• <strong>Cut / Shape:</strong> Pear<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A refined daily companion with a weightless silhouette that rests perfectly close to the heart.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Natural Depth:</strong> The amethyst’s violet tone brings a sense of calm and visual richness.<br>• <strong>Balanced Presence:</strong> Its color feels expressive without being overpowering.<br>• <strong>Calm &amp; Intuition:</strong> Amethyst is traditionally worn to calm the mind, ease stress, and sharpen intuition.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1387485045_Photoroom_20250701_231252.webp',
    images: ['/images/products/optimized/opt_1387485045_Photoroom_20250701_231252.webp', '/images/products/optimized/opt_291816074_Do_a_model_2k_202601030005.webp', '/images/products/optimized/opt_1477948133_Do_a_model_2k_202601030004_1.webp', '/images/products/optimized/opt_463020633_Photoroom_20250701_231201.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['amethyst', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Focus'],
  },
  {
    id: 'p36',
    title: 'Opaline Opal Bloom Pendant',
    handle: 'opaline-opal-bloom-pendant',
    price: 7700.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Opaline Opal Bloom Pendant is designed to feel creative, hopeful, and quietly expressive. At its center, an oval Opal holds a shifting, intentional tone - symbolizing creativity and emotional harmony. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Opal<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Soft Play of Color:</strong> Opal’s shifting tones add subtle movement and interest.<br>• <strong>Gentle Radiance:</strong> Its glow feels delicate and quietly expressive.<br>• <strong>Creativity &amp; Hope:</strong> Opal is traditionally worn to spark creativity, invite hope, and balance emotions.</p>
<h2><strong>How to Style:</strong></h2>
<p>The ethereal glow serves as a refined daily signature, ideal for bringing a touch of inspired creativity to a simple daytime aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_318716508_Photoroom_20250701_230332.webp',
    images: ['/images/products/optimized/opt_318716508_Photoroom_20250701_230332.webp', '/images/products/optimized/opt_2009007697_Do_a_model_2k_202601030007.webp', '/images/products/optimized/opt_1648604777_Photoroom_20250701_230140.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.OPAL,
    variants: [],
    tags: ['opal', 'pendant', 'silver'],
    benefits: ['Balance', 'Harmony', 'Creativity'],
  },
  {
    id: 'p37',
    title: 'Opaline Opal Dew Drop Pendant',
    handle: 'opaline-opal-dew-drop-pendant',
    price: 6820.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Opaline Opal Dew Drop Pendant is designed to feel creative, hopeful, and quietly expressive. At its center, a pear Opal holds a shifting, intentional tone - symbolizing creativity and emotional harmony. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Opal<br>• <strong>Cut / Shape:</strong> Pear<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A weightless silhouette that settles naturally, designed for a soft, unhurried presence against the skin.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Soft Play of Color:</strong> Opal’s shifting tones add subtle movement and interest.<br>• <strong>Gentle Radiance:</strong> Its glow feels delicate and quietly expressive.<br>• <strong>Creativity &amp; Hope:</strong> Opal is traditionally worn to spark creativity, invite hope, and balance emotions.</p>
<h2><strong>How to Style:</strong></h2>
<p>The ethereal glow serves as a refined daily signature, ideal for bringing a touch of inspired creativity to a simple daytime aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1344850312_Photoroom_20250701_225229.webp',
    images: ['/images/products/optimized/opt_1344850312_Photoroom_20250701_225229.webp', '/images/products/optimized/opt_97730232_Do_a_model_2k_202601031338_1.webp', '/images/products/optimized/opt_1094802491_Do_a_model_2k_202601031338_2.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.OPAL,
    variants: [],
    tags: ['opal', 'pendant', 'silver'],
    benefits: ['Balance', 'Harmony', 'Creativity'],
  },
  {
    id: 'p38',
    title: 'Amara Amethyst Grand Solitaire Pendant',
    handle: 'amara-amethyst-grand-solitaire-pendant',
    price: 3300.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Amara Amethyst Grand Solitaire Pendant is designed to feel calm, confident, and quietly expressive. At its center, a square Amethyst holds a deep, intentional tone - symbolizing calm and intuitive focus. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stone:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 8 X 10 mm<br>• <strong>Cut / Shape:</strong> Square (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Natural Depth:</strong> The amethyst’s violet tone brings a sense of calm and visual richness.<br>• <strong>Balanced Presence:</strong> Its color feels expressive without being overpowering.<br>• <strong>Calm &amp; Intuition:</strong> Amethyst is traditionally worn to calm the mind, ease stress, and sharpen intuition.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_858929592_Photoroom_20250701_224512.webp',
    images: ['/images/products/optimized/opt_858929592_Photoroom_20250701_224512.webp', '/images/products/optimized/opt_914063379_Do_a_model_2k_202601031101_2.webp', '/images/products/optimized/opt_795960449_Do_a_model_2k_202601031101.webp', '/images/products/optimized/opt_1958149054_Photoroom_20250701_224617.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['amethyst', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Focus'],
  },
  {
    id: 'p39',
    title: 'Solaris Citrine Bloom Pendant',
    handle: 'solaris-citrine-bloom-pendant',
    price: 3300.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solaris Citrine Bloom Pendant is designed to feel radiant, optimistic, and quietly confident. At its center, an oval Citrine holds a warm, intentional tone - symbolizing abundance and personal momentum. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 8 X 10 mm<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A refined daily companion with a weightless silhouette that rests perfectly close to the heart.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warm Brilliance:</strong> Citrine’s golden hue adds warmth and gentle brightness.<br>• <strong>Uplifting Tone:</strong> The stone’s clarity creates a light, positive visual character.<br>• <strong>Optimism &amp; Abundance:</strong> Citrine is traditionally worn to invite optimism, abundance, and confident energy.</p>
<h2><strong>How to Style:</strong></h2>
<p>The sunlit honey tones serve as a refined daily signature, ideal for bringing a touch of optimism to your everyday rotation.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_39942113_Photoroom_20250701_013406.webp',
    images: ['/images/products/optimized/opt_39942113_Photoroom_20250701_013406.webp', '/images/products/optimized/opt_1164543549_Do_a_model_2k_202601030017.webp', '/images/products/optimized/opt_167492118_Do_a_model_2k_202601030018.webp', '/images/products/optimized/opt_549191311_Photoroom_20250701_013202.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['citrine', 'pendant', 'silver'],
    benefits: ['Clarity', 'Abundance', 'Energy'],
  },
  {
    id: 'p40',
    title: 'Liora Labradorite Bloom Pendant',
    handle: 'liora-labradorite-bloom-pendant',
    price: 1870.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Liora Labradorite Bloom Pendant is designed to feel protective, intuitive, and quietly mysterious. At its center, an oval Labradorite holds a deep, shifting tone - symbolizing fresh starts and inner light. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Labradorite<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 10 X 14 mm<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Natural Sheen:</strong> Labradorite reveals flashes of light beneath a muted surface.<br>• <strong>Earthy Depth:</strong> Its layered tones feel organic and visually intriguing.<br>• <strong>Protection &amp; Intuition:</strong> Labradorite is traditionally worn for protection, intuition, and fresh starts - calm, centering energy with subtle glow.</p>
<h2><strong>How to Style:</strong></h2>
<p>The mysterious blue-green flash serves as a refined daily signature, perfect for adding depth to a neutral palette or evening silks.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_2115104988_Photoroom_20250701_012802.webp',
    images: ['/images/products/optimized/opt_2115104988_Photoroom_20250701_012802.webp', '/images/products/optimized/opt_134396281_Do_a_model_2k_202601031011_1.webp', '/images/products/optimized/opt_1131467889_Do_a_model_2k_202601031011_2.webp', '/images/products/optimized/opt_616695627_Photoroom_20250701_012641.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.LABRADORITE,
    variants: [],
    tags: ['labradorite', 'pendant', 'silver'],
    benefits: ['Calm', 'Protection', 'Intuition'],
  },
  {
    id: 'p41',
    title: 'Solaris Citrine Grand Solitaire Pendant',
    handle: 'solaris-citrine-grand-solitaire-pendant',
    price: 4070.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solaris Citrine Grand Solitaire Pendant is designed to feel radiant, optimistic, and quietly confident. At its center, a square Citrine holds a sunlit, intentional tone - symbolizing abundance and personal momentum. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Accent Stone:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 8 X 10 mm<br>• <strong>Cut / Shape:</strong> Square (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A weightless silhouette that settles naturally, designed for a soft, unhurried presence against the skin.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warm Brilliance:</strong> Citrine’s golden hue adds warmth and gentle brightness.<br>• <strong>Uplifting Tone:</strong> The stone’s clarity creates a light, positive visual character.<br>• <strong>Optimism &amp; Abundance:</strong> Citrine is traditionally worn to invite optimism, abundance, and confident energy.</p>
<h2><strong>How to Style:</strong></h2>
<p>The sunlit honey tones serve as a refined daily signature, ideal for bringing a touch of optimism to your everyday rotation.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1839792784_Photoroom_20250701_011730.webp',
    images: ['/images/products/optimized/opt_1839792784_Photoroom_20250701_011730.webp', '/images/products/optimized/opt_384668426_Do_a_model_2k_202601022350_2.webp', '/images/products/optimized/opt_1705509349_Do_a_model_2k_202601022350.webp', '/images/products/optimized/opt_1481170651_Photoroom_20250701_011929.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['citrine', 'pendant', 'silver'],
    benefits: ['Clarity', 'Abundance', 'Energy'],
  },
  {
    id: 'p42',
    title: 'Indigo Lapis Lazuli Harmony Dew Drop Pendant',
    handle: 'indigo-lapis-lazuli-harmony-dew-drop-pendant',
    price: 2860.0,
    description: `<h2><strong>Description:</strong></h2>
<p>Indigo Lapis Lazuli Harmony Dew Drop Pendant is designed to feel grounding, wise, and quietly powerful. At its center, a pear Lapis Lazuli holds a deep, intentional tone - symbolizing balance and inner alignment. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Lapis Lazuli<br>• <strong>Cut / Shape:</strong> Pear<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Balanced for a gentle, unhurried presence against the skin, making it ideal for mindful, daily movement.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Deep Contrast:</strong> Lapis lazuli’s rich blue offers depth and bold visual identity.<br>• <strong>Timeless Character:</strong> Its natural texture gives the stone a grounded, classic feel.<br>• <strong>Wisdom &amp; Truth:</strong> Lapis is traditionally worn to inspire truth, wisdom, and calm communication.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich indigo depth serves as a refined daily signature, ideal for anchoring a white shirt and denim or a classic black turtleneck.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1287704317_Photoroom_20250701_010425.webp',
    images: ['/images/products/optimized/opt_1287704317_Photoroom_20250701_010425.webp', '/images/products/optimized/opt_301490449_Do_a_model_2k_202601030002_3.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.LAPIS,
    variants: [],
    tags: ['lapis lazuli', 'pendant', 'silver'],
    benefits: ['Calm', 'Balance', 'Wisdom'],
  },
  {
    id: 'p43',
    title: 'Celeste Cubic Zirconia Crest Pendant',
    handle: 'celeste-cubic-zirconia-crest-pendant',
    price: 1760.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Celeste Cubic Zirconia Crest Pendant is designed to feel light, intentional, and quietly refined. At its center, an octagonal Cubic Zirconia (CZ) holds a clear, intentional tone - symbolizing clarity and focused intention. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Cubic Zirconia (CZ)<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Stone Size:</strong> 9 x 7 mm<br>• <strong>Cut / Shape:</strong> Octagonal (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> A refined daily companion with a weightless silhouette that rests perfectly close to the heart.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Mental Clarity:</strong> CZ is associated with clear thinking and a sense of mental openness.<br>• <strong>Balanced Focus:</strong> Often linked to intention, CZ reflects a composed perspective and purposeful attention.<br>• <strong>Refined Sparkle:</strong> CZ accents gently lift the design with soft brilliance.<br></p>
<h2><strong>How to Style:</strong></h2>
<p>The mirror-bright sparkle serves as a refined daily signature, adding a touch of architectural polish to contemporary workwear.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1031754012_P2.webp',
    images: ['/images/products/optimized/opt_1031754012_P2.webp', '/images/products/optimized/opt_1905035339_Do_a_model_2k_202601031006_1.webp', '/images/products/optimized/opt_1077566339_Do_a_model_2k_202601031006.webp', '/images/products/optimized/opt_2042075353_Photoroom_20250629_205133.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.CZ,
    variants: [],
    tags: ['cubic zirconia', 'cz', 'pendant', 'silver'],
    benefits: ['Balance', 'Clarity', 'Focus'],
  },
  {
    id: 'p44',
    title: 'Aurora Tourmaline Crest Pendant',
    handle: 'aurora-tourmaline-crest-pendant',
    price: 3300.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Aurora Tourmaline Crest Pendant is designed to feel grounding, composed, and quietly powerful. At its center, an octagonal Tourmaline holds a deep, forest-green hue - symbolizing stability and inner alignment. Set in high-polished 925 silver, the pendant carries a refined presence that rests effortlessly close to the heart.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Tourmaline<br>• <strong>Accent Stones:</strong> CZ (Cubic Zirconia)<br>• <strong>Stone Size:</strong> 9 X 7 mm<br>• <strong>Cut / Shape:</strong> Octagonal (Emerald Cut)<br>• <strong>Design:</strong> A refined solitaire setting with clean, modern lines<br>• <strong>Wearability:</strong> Designed for a soft, unhurried presence against the skin, offering effortless elegance for everyday wear.</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Distinct Color Depth:</strong> Tourmaline’s natural tone adds individuality and character.<br>• <strong>Elegant Presence:</strong> Its clarity feels confident yet understated.<br>• <strong>Renewal &amp; Balance:</strong> Green tourmaline is traditionally worn to renew energy, invite growth and balance, and open the heart.</p>
<h2><strong>How to Style:</strong></h2>
<p>The deep verdant hue serves as a refined daily signature, perfect for anchoring a minimalist office look or a crisp white shirt.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1151985673_Photoroom_20250629_202617.webp',
    images: ['/images/products/optimized/opt_1151985673_Photoroom_20250629_202617.webp', '/images/products/optimized/opt_1896083504_Do_a_model_2k_202601022317.webp', '/images/products/optimized/opt_791311342_Do_a_model_2k_202601022318_1.webp', '/images/products/optimized/opt_441555541_Photoroom_20250629_191417.webp'],
    type: ProductType.PENDANT,
    stone: StoneType.TOURMALINE,
    variants: [],
    tags: ['pendant', 'silver', 'tourmaline'],
    benefits: ['Balance', 'Clarity', 'Renewal'],
  },
  {
    id: 'r45',
    title: 'Nocturne Iolite Eternity Ring',
    handle: 'nocturne-iolite-eternity-ring',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Nocturne Iolite Eternity Band is designed to feel steady, composed, and quietly confident on the hand. A full circle of oval-cut iolite stones wraps the finger in deep indigo tones, creating a sense of balance. Crafted in High-Polished 925 Sterling Silver, the band sits smoothly and comfortably.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Iolite<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Full-circle eternity band with low-profile prong setting<br>• <strong>Wearability:</strong> Smooth inner band, suitable for all-day comfort and stacking</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Focus &amp; Direction:</strong> Iolite is traditionally associated with clarity, intuition, and steady decision-making.<br>• <strong>Calm Confidence:</strong> Its deep blue-violet tone reflects composed strength and inner balance.<br>• <strong>Subtle Brilliance:</strong> CZ accents add gentle sparkle, enhancing the richness of the stone without excess.</p>
<h2><strong>How to Style:</strong></h2>
<p>The deep indigo tones work beautifully when paired with cool greys and navy for a calm, elevated aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1809105197_R32.webp',
    images: ['/images/products/optimized/opt_1809105197_R32.webp', '/images/products/optimized/opt_862979238_prompt_a_2k_202601111652_1.webp', '/images/products/optimized/opt_16608887_prompt_a_2k_202601111652.webp', '/images/products/optimized/opt_1473372274_Photoroom_20250628_021810.webp'],
    type: ProductType.RING,
    stone: StoneType.IOLITE,
    variants: [],
    tags: ['Iolite', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r46',
    title: 'Aquarelle Twin Heart Topaz Ring',
    handle: 'aquarelle-twin-heart-topaz-ring',
    price: 3080.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Aquarelle Twin Heart Topaz Ring is designed to feel light, romantic, and quietly refreshing. Two heart-cut blue topaz stones sit on a split band, their cool tones bringing a sense of calm. Set in High-Polished 925 Sterling Silver, the ring feels comfortable and easy to wear.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Blue Topaz<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Heart<br>• <strong>Design:</strong> Twin heart setting with a split shank and pavé CZ detailing<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>•<strong> Calm &amp; Clarity:</strong> Blue topaz is traditionally associated with soothing energy and clear thought.<br>• <strong>Open Expression:</strong> Often linked to communication, blue topaz reflects ease and confident self-expression.<br>• <strong>Cool Radiance:</strong> CZ accents add gentle sparkle, enhancing the fresh blue tones.</p>
<h2><strong>How to Style:</strong></h2>
<p>This cool-toned piece is perfect for stacking with other silver bands to create a fresh, ocean-inspired palette.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1673177109_ChatGPT_Image_Jan_17_2026_01_53_41_PM.webp',
    images: ['/images/products/optimized/opt_1673177109_ChatGPT_Image_Jan_17_2026_01_53_41_PM.webp', '/images/products/optimized/opt_1907397656_Stone_size_7mm_2k_202601021412.webp', '/images/products/optimized/opt_1234239078_Stone_size_7mm_2k_202601021412_1.webp', '/images/products/optimized/opt_234029180_Photoroom_20250627_231721.webp'],
    type: ProductType.RING,
    stone: StoneType.BLUE_TOPAZ,
    variants: [],
    tags: ['Blue Topaz', 'ring', 'silver', 'Topaz'],
    benefits: ['Calm', 'Clarity', 'Energy'],
  },
  {
    id: 'r47',
    title: 'Calyra Lemon Topaz Knot Ring',
    handle: 'calyra-lemon-topaz-knot-ring',
    price: 4180.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Calyra Lemon Topaz Knot Ring is designed to feel uplifting, fluid, and quietly expressive. At its center, a cushion-cut lemon topaz glows with a fresh hue that brings clarity. Set in High-Polished 925 Sterling Silver, the ring sits smoothly on the hand.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Lemon Topaz<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Cushion<br>• <strong>Design:</strong> Interlaced knot-style setting with pavé CZ detailing<br>• <strong>Wearability:</strong> Balanced profile with a smooth inner band for everyday comfort</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Light &amp; Optimism:</strong> Lemon topaz is traditionally associated with clarity, positivity, and an uplifted mood.<br>• <strong>Fresh Confidence:</strong> Its bright citrus tone reflects ease, openness, and a confident outlook.<br>• <strong>Refined Sparkle:</strong> CZ accents add gentle brilliance, enhancing the glow without overwhelming it.</p>
<h2><strong>How to Style:</strong></h2>
<p>The sunlit hue of the lemon topaz adds a bright, uplifting touch to crisp white linens and a light, airy daytime look.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_8902845_Photoroom_20250627_230319.webp',
    images: ['/images/products/optimized/opt_8902845_Photoroom_20250627_230319.webp', '/images/products/optimized/opt_1426520991_Pick_an_apt_2k_202601011143.webp', '/images/products/optimized/opt_27160657_Photoroom_20250627_230630.webp'],
    type: ProductType.RING,
    stone: StoneType.LEMON_TOPAZ,
    variants: [],
    tags: ['Lemon Topaz', 'ring', 'silver', 'Topaz'],
    benefits: ['Balance', 'Clarity', 'Confidence'],
  },
  {
    id: 'r48',
    title: 'Velisse Amethyst Halo Ring',
    handle: 'velisse-amethyst-halo-ring',
    price: 3190.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Velisse Amethyst Halo Ring is designed to feel graceful, composed, and quietly radiant. At its center, a round-cut amethyst brings a soft violet depth that feels calming. Set on a slim split band of High-Polished 925 Sterling Silver, the ring feels balanced and refined.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>•<strong> Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Duo-halo crown setting with a slim split shank<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Clarity:</strong> Amethyst is traditionally associated with calmness, mental clarity, and balance.<br>• <strong>Quiet Confidence:</strong> Its gentle violet tone reflects inner steadiness and composed self-expression.<br>• <strong>Refined Sparkle:</strong> CZ accents add soft brilliance, enhancing the halo without overpowering the stone.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1515101892_Photoroom_20250627_225940.webp',
    images: ['/images/products/optimized/opt_1515101892_Photoroom_20250627_225940.webp', '/images/products/optimized/opt_827861161_prompt_a_2k_202601111642.webp', '/images/products/optimized/opt_996523929_Photoroom_20250627_225940.webp'],
    type: ProductType.RING,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['Amethyst', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r49',
    title: 'Noctelle Iolite Halo Band',
    handle: 'noctelle-iolite-halo-band',
    price: 4510.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Noctelle Iolite Halo Band is designed to feel calm, focused, and quietly luminous. A row of round-cut iolites wraps around the finger, creating a sense of stillness. Set in High-Polished 925 Sterling Silver, the smooth design sits comfortably on the hand.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Iolite<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Full-circle eternity band with scalloped halo settings<br>• <strong>Wearability:</strong> Smooth inner curve for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Clarity &amp; Direction:</strong> Iolite is traditionally associated with clear thinking, intuition, and inner guidance.<br>• <strong>Calm Confidence:</strong> Its deep blue tone reflects focus and composed self-assurance.<br>• <strong>Enduring Ease:</strong> The eternity-style design offers continuity and comfort, ideal for daily wear.</p>
<h2><strong>How to Style:</strong></h2>
<p>The deep indigo tones work beautifully when paired with cool greys and navy for a calm, elevated aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_965456639_R28.webp',
    images: ['/images/products/optimized/opt_965456639_R28.webp', '/images/products/optimized/opt_965162384_prompt_a_2k_202601111637_1.webp', '/images/products/optimized/opt_981938315_prompt_a_2k_202601111637.webp', '/images/products/optimized/opt_2042925010_Photoroom_20250627_225441.webp'],
    type: ProductType.RING,
    stone: StoneType.IOLITE,
    variants: [],
    tags: ['Iolite', 'ring', 'silver'],
    benefits: ['Calm', 'Clarity', 'Focus'],
  },
  {
    id: 'r50',
    title: 'Ravelle Garnet Eternity Band',
    handle: 'ravelle-garnet-eternity-band',
    price: 2860.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Ravelle Garnet Eternity Band is designed to feel grounded, confident, and quietly powerful. A continuous circle of oval-cut garnets wraps around the finger, each stone glowing with warmth. Set in High-Polished 925 Sterling Silver, the ring carries a reassuring weight.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>•<strong> Primary Stone:</strong> Garnet<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Full-circle eternity band with low-profile prong setting<br>• <strong>Wearability:</strong> Smooth inner curve for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Vitality &amp; Strength:</strong> Garnet is traditionally associated with grounded energy, courage, and inner strength.<br>• <strong>Quiet Confidence:</strong> Its deep red tone reflects assurance and steady presence without needing attention.<br>• <strong>Enduring Ease:</strong> The eternity-style design offers continuity and comfort, ideal for daily wear.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich intensity of the Garnet makes this an excellent choice for evening wear, providing a strong presence with minimal pairing.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1962525400_R27.webp',
    images: ['/images/products/optimized/opt_1962525400_R27.webp', '/images/products/optimized/opt_675259463_prompt_a_2k_202601111633.webp', '/images/products/optimized/opt_628490736_prompt_a_2k_202601111630.webp', '/images/products/optimized/opt_520267871_Photoroom_20250626_021157.webp'],
    type: ProductType.RING,
    stone: StoneType.GARNET,
    variants: [],
    tags: ['Garnet', 'ring', 'silver'],
    benefits: ['Energy', 'Confidence'],
  },
  {
    id: 'r51',
    title: 'Evara Fourlight Gem Band',
    handle: 'evara-fourlight-gem-band',
    price: 2200.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Evara Fourlight Gem Band is designed to feel balanced, expressive, and effortlessly wearable. Four natural stones sit side by side, creating a gentle rhythm of tone and light. Set in High-Polished 925 Sterling Silver, the low-profile band rests comfortably on the finger.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stones:</strong> Iolite, Citrine, Peridot, Garnet<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Multi-stone band with softly contoured settings and CZ accents<br>• <strong>Wearability:</strong> Low-profile band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Balanced Energy:</strong> A combination traditionally associated with clarity, optimism, renewal, and grounded strength.<br>• <strong>Expressive Colour:</strong> Each stone adds a distinct tone, creating harmony through contrast and individuality.<br>• <strong>Everyday Ease:</strong> The smooth silhouette and refined sparkle make it effortless to wear solo or stacked.</p>
<h2><strong>How to Style:</strong></h2>
<p>The deep indigo tones work beautifully when paired with cool greys and navy for a calm, elevated aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_760818138_Photoroom_20250626_015746.webp',
    images: ['/images/products/optimized/opt_760818138_Photoroom_20250626_015746.webp', '/images/products/optimized/opt_213702604_Pick_an_apt_2k_202601011133_2.webp', '/images/products/optimized/opt_1752621004_Photoroom_20250626_015746.webp', '/images/products/optimized/opt_2130329366_Photoroom_20250626_015913.webp'],
    type: ProductType.RING,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['Citrine', 'Garnet', 'Iolite', 'Peridot', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r52',
    title: 'Serenelle Amethyst Halo Band',
    handle: 'serenelle-amethyst-halo-band',
    price: 4400.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Serenelle Amethyst Halo Band is designed to feel calm, luminous, and quietly indulgent. A continuous row of round-cut amethysts circles the finger, framed by a delicate halo. Set in High-Polished 925 Sterling Silver, it feels reassuring on the hand-refined and balanced.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Full-circle eternity band with scalloped halo settings<br>• <strong>Wearability:</strong> Smooth inner curve for comfortable, everyday wear<br></p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Clarity:</strong> Amethyst is traditionally associated with calmness, balance, and mental clarity.<br>• <strong>Quiet Confidence:</strong> Its deep violet tone reflects inner steadiness and composed self-expression.<br>• <strong>Enduring Ease:</strong> The eternity-style design offers a sense of continuity for daily wear.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1210197237_Photoroom_20250626_015210.webp',
    images: ['/images/products/optimized/opt_1210197237_Photoroom_20250626_015210.webp', '/images/products/optimized/opt_451853157_prompt_a_2k_202601171444.webp', '/images/products/optimized/opt_1926015795_prompt_a_2k_202601171444_1.webp', '/images/products/optimized/opt_1616215054_Photoroom_20250626_015321.webp'],
    type: ProductType.RING,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['Amethyst', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r53',
    title: 'Lunelle Amethyst Bloom Ring',
    handle: 'lunelle-amethyst-bloom-ring',
    price: 2970.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Lunelle Amethyst Bloom Ring is designed to feel graceful, expressive, and quietly radiant. Two floral clusters of pear-cut amethysts bloom gently across the hand, their soft violet tones bringing depth. Set in High-Polished 925 Sterling Silver, it sits comfortably catching the light.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>•<strong> Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Pear<br>• <strong>Design:</strong> Twin blossom floral clusters with a split band and pavé CZ detailing<br>• <strong>Wearability:</strong> Tapered profile with a smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Balance:</strong> Amethyst is traditionally associated with calmness, emotional balance, and clarity of thought.<br>• <strong>Gentle Confidence:</strong> Known for its violet hue, amethyst reflects inner strength with a soft, composed presence.<br>• <strong>Subtle Radiance:</strong> CZ accents add delicate sparkle, enhancing the floral design.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_658748132_R24.webp',
    images: ['/images/products/optimized/opt_658748132_R24.webp', '/images/products/optimized/opt_180918503_Pick_an_apt_2k_202601011125_1.webp', '/images/products/optimized/opt_1524888920_Photoroom_20250626_014713.webp', '/images/products/optimized/opt_1192864535_Photoroom_20250626_014921.webp'],
    type: ProductType.RING,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['Amethyst', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r54',
    title: 'Elara Zirconia Twin Heart Ring',
    handle: 'elara-zirconia-twin-heart-ring',
    price: 2420.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Elara Twin Heart Radiance Ring is designed to feel light, romantic, and effortlessly refined. Two heart-cut cubic zirconia stones sit gracefully on a split band, their brilliance catching the light. Set in High-Polished 925 Sterling Silver, it rests comfortably on the hand.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Cubic Zirconia (CZ)<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Heart<br>• <strong>Design:</strong> Twin heart open setting with a split band and pavé CZ detailing<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Everyday Brilliance:</strong> Cubic zirconia offers a clear, luminous sparkle that feels refined and easy to wear.<br>• <strong>Modern Romance:</strong> The heart-cut design brings softness and charm without feeling overly ornate.<br>• <strong>Effortless Ease:</strong> Lightweight construction and an open silhouette make it comfortable from day to night.</p>
<h2><strong>How to Style:</strong></h2>
<p>A versatile piece that brings a refined radiance, best complemented by minimal silver accessories and neutral tones.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_402396186_Keep_the_ring_2k_202601111606.webp',
    images: ['/images/products/optimized/opt_402396186_Keep_the_ring_2k_202601111606.webp', '/images/products/optimized/opt_1360085759_prompt_a_2k_202601111615_1.webp', '/images/products/optimized/opt_370035566_prompt_a_2k_202601111615.webp'],
    type: ProductType.RING,
    stone: StoneType.CZ,
    variants: [],
    tags: ['cubic zirconia', 'cz', 'ring', 'silver', 'Zarkan'],
    benefits: [],
  },
  {
    id: 'r55',
    title: 'Virelle Amethyst Crest Ring',
    handle: 'virelle-amethyst-crest-ring',
    price: 2200.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Virelle Amethyst Crest Ring is designed to feel calm, confident, and quietly radiant. A row of oval-cut amethysts moves gracefully across the band, their deep violet tones bringing balance. Set in High-Polished 925 Sterling Silver, the ring sits comfortably and feels easy to wear.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Crest-style band with a flowing row of amethysts framed by CZ accents<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Clarity:</strong> Amethyst is traditionally associated with a sense of calm, balance, and mental clarity.<br>• <strong>Quiet Confidence:</strong> Known for its rich violet hue, amethyst reflects inner strength and composed self-assurance.<br>• <strong>Refined Sparkle:</strong> CZ accents add gentle brilliance, enhancing the stones without overpowering their depth.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1642106142_R22.webp',
    images: ['/images/products/optimized/opt_1642106142_R22.webp', '/images/products/optimized/opt_586978441_Stone_size_5_2k_202601021405.webp', '/images/products/optimized/opt_1253362431_Photoroom_20250626_013649.webp'],
    type: ProductType.RING,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['amethyst', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r56',
    title: 'Maréa Paraiba Glow Band',
    handle: 'marea-paraiba-glow-band',
    price: 7700.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Maréa Paraiba Glow Band is designed to feel fresh, energising, and quietly luminous. A row of oval-cut Paraiba tourmalines brings a cool aqua glow to the hand. Set in High-Polished 925 Sterling Silver, the band offers a balanced profile that feels light and refined.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Paraiba Tourmaline<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Low-profile band with a continuous row of Paraiba tourmalines and CZ detailing<br>• <strong>Wearability:</strong> Smooth inner curve for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Fresh Energy:</strong> Paraiba tourmaline is traditionally associated with uplifting energy and creative flow.<br>• <strong>Clear Expression:</strong> Often linked to communication and openness, Paraiba tourmaline reflects ease and confidence.<br>• <strong>Cool Brilliance:</strong> CZ accents add soft sparkle, enhancing the aqua tones.</p>
<h2><strong>How to Style:</strong></h2>
<p>The varied hues of the Tourmaline make this a versatile daily companion that adds a thoughtful touch of color to a minimal aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1182269188_ChatGPT_Image_Jan_17_2026_02_14_13_PM.webp',
    images: ['/images/products/optimized/opt_1182269188_ChatGPT_Image_Jan_17_2026_02_14_13_PM.webp', '/images/products/optimized/opt_471448857_prompt_a_2k_202601161523.webp', '/images/products/optimized/opt_852960280_ChatGPT_Image_Jan_17_2026_02_17_05_PM.webp', '/images/products/optimized/opt_285913486_ChatGPT_Image_Jan_17_2026_02_18_08_PM.webp'],
    type: ProductType.RING,
    stone: StoneType.TOURMALINE,
    variants: [],
    tags: ['ring', 'silver', 'tourmaline'],
    benefits: ['Balance', 'Energy', 'Confidence'],
  },
  {
    id: 'r57',
    title: 'Liora Cascade Tourmaline Ring',
    handle: 'liora-cascade-tourmaline-ring',
    price: 5500.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Liora Cascade Tourmaline Ring is designed to feel vibrant, expressive, and effortlessly balanced. A flowing arrangement of oval-cut multi tourmalines moves gently across the hand, each colour adding character. Set in High-Polished 925 Sterling Silver, the ring feels airy yet substantial.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Multi Tourmaline<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Cascade-style setting with flowing silver waves and pavé CZ accents<br>• <strong>Wearability:</strong> Tapered band designed for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Balance &amp; Harmony:</strong> Multi tourmaline is traditionally associated with emotional balance and alignment.<br>• <strong>Creative Energy:</strong> Known for its range of colours, tourmaline reflects creativity and self-expression.<br>• <strong>Refined Sparkle:</strong> CZ accents add gentle brilliance, enhancing the movement and colour.</p>
<h2><strong>How to Style:</strong></h2>
<p>The varied hues of the Tourmaline make this a versatile daily companion that adds a thoughtful touch of color to a minimal aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1176258669_Photoroom_20250625_013216.webp',
    images: ['/images/products/optimized/opt_1176258669_Photoroom_20250625_013216.webp', '/images/products/optimized/opt_1773277926_Ring_size_4_2k_202601021402.webp', '/images/products/optimized/opt_238966628_Photoroom_20250625_013641.webp'],
    type: ProductType.RING,
    stone: StoneType.TOURMALINE,
    variants: [],
    tags: ['ring', 'silver', 'tourmaline'],
    benefits: ['Balance', 'Harmony', 'Creativity'],
  },
  {
    id: 'r58',
    title: 'Amora Twin Heart Amethyst Ring',
    handle: 'amora-twin-heart-amethyst-ring',
    price: 3080.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Amora Twin Heart Amethyst Ring is designed to feel warm, intimate, and quietly expressive. Two heart-cut amethysts sit side by side, their soft violet tones creating a sense of connection. Set on a split band of High-Polished 925 Sterling Silver, the ring feels light on the hand.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Heart<br>• <strong>Design:</strong> Twin heart setting with a split shank and pavé CZ detailing<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Clarity:</strong> Amethyst is traditionally associated with calmness, emotional balance, and mental clarity.<br>• <strong>Gentle Connection:</strong> Often linked to intuition and inner harmony, amethyst reflects warmth and presence.<br>• <strong>Soft Brilliance:</strong> CZ accents add delicate sparkle, enhancing the design without overpowering its sentiment.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_377845074_ChatGPT_Image_Jan_17_2026_02_21_56_PM.webp',
    images: ['/images/products/optimized/opt_377845074_ChatGPT_Image_Jan_17_2026_02_21_56_PM.webp', '/images/products/optimized/opt_604456338_prompt_a_2k_202601171453.webp', '/images/products/optimized/opt_1748773664_prompt_a_2k_202601171453_1.webp', '/images/products/optimized/opt_1115933860_ChatGPT_Image_Jan_17_2026_02_21_11_PM.webp'],
    type: ProductType.RING,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['Amethyst', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r59',
    title: 'Elaria Amethyst Eternity Band',
    handle: 'elaria-amethyst-eternity-band',
    price: 3080.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Elaria Amethyst Eternity Band is designed to feel calm, continuous, and quietly expressive. A full circle of oval-cut amethysts wraps gently around the finger, creating a sense of balance. Set in High-Polished 925 Sterling Silver, the low-profile design sits close to the skin.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Full-circle eternity band with prong-set amethysts<br>• <strong>Wearability:</strong> Low-profile setting for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>•<strong> Calm &amp; Clarity:</strong> Amethyst is traditionally associated with calmness, mental clarity, and balance.<br>• <strong>Quiet Strength:</strong> Known for its deep violet tone, amethyst reflects composed confidence and inner steadiness.<br>• <strong>Timeless Ease:</strong> The continuous band design creates a sense of wholeness, making it easy to wear daily.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1211834306_Photoroom_20250625_011854.webp',
    images: ['/images/products/optimized/opt_1211834306_Photoroom_20250625_011854.webp', '/images/products/optimized/opt_355834099_Ring_size_3_2k_202601021400_2.webp', '/images/products/optimized/opt_47624319_Photoroom_20250625_011939.webp'],
    type: ProductType.RING,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['Amethyst', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r60',
    title: 'Solara Lattice Citrine Ring',
    handle: 'solara-lattice-citrine-ring',
    price: 6600.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solara Lattice Citrine Ring is designed to feel warm, confident, and quietly striking. At its center, a cushion-cut citrine glows with a rich golden tone. Set in High-Polished 925 Sterling Silver, it feels substantial on the hand while remaining comfortable.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Cut / Shape:</strong> Cushion<br>• <strong>Design:</strong> Solitaire setting with lattice-style silver detailing and CZ accents<br>• <strong>Wearability:</strong> Secure setting with a smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warmth &amp; Optimism:</strong> Citrine is traditionally associated with positivity, confidence, and a bright outlook.<br>• <strong>Assured Presence:</strong> The cushion-cut stone adds depth and structure, creating a grounded yet radiant feel.<br>• <strong>Refined Brilliance:</strong> CZ accents introduce subtle sparkle, enhancing the warmth of the citrine.</p>
<h2><strong>How to Style:</strong></h2>
<p>This warm, golden piece pairs beautifully with neutral earth tones, adding a subtle glow to an elevated daytime ensemble.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1488058596_R17.webp',
    images: ['/images/products/optimized/opt_1488058596_R17.webp', '/images/products/optimized/opt_554871105_prompt_a_2k_202601111543_1.webp', '/images/products/optimized/opt_239584049_prompt_a_2k_202601111543.webp', '/images/products/optimized/opt_1687189436_Photoroom_20250624_020013.webp'],
    type: ProductType.RING,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['Citrine', 'ring', 'silver'],
    benefits: ['Confidence', 'Optimism'],
  },
  {
    id: 'r61',
    title: 'Blush Arc Tourmaline Band',
    handle: 'blush-arc-tourmaline-band',
    price: 3960.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Blush Arc Tourmaline Band is designed to feel warm, gentle, and quietly expressive. A row of round-cut pink tourmalines brings soft colour and natural charm to the design. Crafted in High-Polished 925 Sterling Silver, the band sits low and smooth.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Pink Tourmaline<br>•<strong> Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Arc-style band with a row of pink tourmalines and CZ detailing<br>• <strong>Wearability:</strong> Low-profile band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Gentle Confidence:</strong> Pink tourmaline is traditionally associated with compassion, warmth, and emotional balance.<br>• <strong>Soft Expression:</strong> Known for its blush tone, pink tourmaline reflects ease and gentle self-assurance.<br>• <strong>Refined Sparkle:</strong> CZ accents add subtle brilliance, enhancing the colour without overpowering it.</p>
<h2><strong>How to Style:</strong></h2>
<p>The varied hues of the Tourmaline make this a versatile daily companion that adds a thoughtful touch of color to a minimal aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_208114576_Photoroom_20250624_015306.webp',
    images: ['/images/products/optimized/opt_208114576_Photoroom_20250624_015306.webp', '/images/products/optimized/opt_1871093535_prompt_a_2k_202601171505.webp', '/images/products/optimized/opt_1366238673_prompt_a_2k_202601171505_1.webp', '/images/products/optimized/opt_2065421190_Photoroom_20250624_015406.webp'],
    type: ProductType.RING,
    stone: StoneType.TOURMALINE,
    variants: [],
    tags: ['ring', 'silver', 'tourmaline'],
    benefits: ['Balance', 'Confidence'],
  },
  {
    id: 'r62',
    title: 'Garnet Corona Ring',
    handle: 'garnet-corona-ring',
    price: 3190.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Garnet Corona Ring is designed to feel confident, grounded, and quietly striking. At its center, a round-cut garnet reveals a deep, rich red tone. Set in High-Polished 925 Sterling Silver, the smooth band and balanced proportions make the ring comfortable.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Garnet<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Double-halo setting with a central garnet framed by CZ and garnet accents<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Vitality &amp; Strength:</strong> Garnet is traditionally associated with energy, courage, and grounded vitality.<br>• <strong>Confident Presence:</strong> Known for its deep red tone, garnet reflects assurance and inner strength.<br>• <strong>Balanced Brilliance:</strong> CZ accents add refined sparkle, enhancing the halo without overwhelming the stone’s warmth.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich intensity of the Garnet makes this an excellent choice for evening wear, providing a strong presence with minimal pairing.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_165076015_Photoroom_20250624_014559.webp',
    images: ['/images/products/optimized/opt_165076015_Photoroom_20250624_014559.webp', '/images/products/optimized/opt_1300907772_prompt_a_2k_202601162244_1.webp', '/images/products/optimized/opt_196141079_prompt_a_2k_202601162243.webp', '/images/products/optimized/opt_1570873492_Photoroom_20250624_014509.webp'],
    type: ProductType.RING,
    stone: StoneType.GARNET,
    variants: [],
    tags: ['Garnet', 'ring', 'silver'],
    benefits: ['Balance', 'Energy'],
  },
  {
    id: 'r63',
    title: 'Azure Crest Topaz Ring',
    handle: 'azure-crest-topaz-ring',
    price: 4620.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Azure Crest Topaz Ring is designed to feel fresh, confident, and quietly uplifting. At its center, an oval-cut blue topaz shines with a clear tone that brings lightness to your style. Crafted in High-Polished 925 Sterling Silver, the ring sits comfortably on the hand.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Blue Topaz<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Sculpted setting with a balanced arrangement of accent stones<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Clarity:</strong> Blue topaz is traditionally associated with a calm mind and clear thinking.<br>• <strong>Confident Expression:</strong> Often linked to communication and openness, blue topaz reflects ease and self-assurance.<br>• <strong>Refined Sparkle:</strong> CZ accents add gentle brilliance, enhancing the stone's freshness without overpowering it.</p>
<h2><strong>How to Style:</strong></h2>
<p>This cool-toned piece is perfect for stacking with other silver bands to create a fresh, ocean-inspired palette.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1503126658_R14.webp',
    images: ['/images/products/optimized/opt_1503126658_R14.webp', '/images/products/optimized/opt_1491303546_prompt_a_2k_202601162249.webp', '/images/products/optimized/opt_949960596_prompt_a_2k_202601162249_1.webp', '/images/products/optimized/opt_135142658_Photoroom_20250624_013815.webp'],
    type: ProductType.RING,
    stone: StoneType.BLUE_TOPAZ,
    variants: [],
    tags: ['Blue Topaz', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r64',
    title: 'Solaris Marquise Citrine',
    handle: 'solaris-marquise-citrine',
    price: 8800.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solaris Marquise Citrine Ring is designed to feel bold, assured, and quietly radiant. At its center, a marquise-cut citrine catches the light with a warm golden glow, bringing a sense of optimism. Set in High-Polished 925 Sterling Silver, the engraved band adds depth, making the ring feel grounded.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Cut / Shape:</strong> Marquise<br>• <strong>Design:</strong> Solitaire setting with heritage-inspired engraved silver detailing<br>• <strong>Wearability:</strong> Secure setting with a smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warmth &amp; Optimism:</strong> Citrine is traditionally associated with positivity, abundance, and a confident outlook.<br>• <strong>Focused Confidence:</strong> The marquise shape draws the eye gracefully, reflecting clarity and self-assured presence.<br>• <strong>Grounded Elegance:</strong> Solid silver craftsmanship adds strength and stability, making the ring feel reassuring to wear.</p>
<h2><strong>How to Style:</strong></h2>
<p>This warm, golden piece pairs beautifully with neutral earth tones, adding a subtle glow to an elevated daytime ensemble.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1794771193_R13.webp',
    images: ['/images/products/optimized/opt_1794771193_R13.webp', '/images/products/optimized/opt_1645378929_prompt_a_2k_202601162254.webp', '/images/products/optimized/opt_1928681555_Photoroom_20250622_233354.webp'],
    type: ProductType.RING,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['Citrine', 'ring', 'silver'],
    benefits: ['Clarity', 'Focus', 'Abundance'],
  },
  {
    id: 'r65',
    title: 'Azure Topaz Twin Bloom Ring',
    handle: 'azure-topaz-twin-bloom-ring',
    price: 3740.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Azure Twin Bloom Ring is designed to feel light, graceful, and quietly uplifting. Featuring pear-cut blue topaz stones arranged in a twin floral form, the design brings freshness to the hand. Crafted in High-Polished 925 Sterling Silver, the ring feels balanced and comfortable.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Blue Topaz<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Pear<br>• <strong>Design:</strong> Twin bloom floral setting with flowing silver lines and CZ accents<br>• <strong>Wearability:</strong> Smooth inner band with a balanced, comfortable fit</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Clarity:</strong> Blue topaz is traditionally associated with calmness and a clear, settled mind.<br>• <strong>Open Expression:</strong> Often linked to communication and self-assurance, blue topaz reflects ease and quiet confidence.<br>• <strong>Fresh Radiance:</strong> CZ accents add soft sparkle, enhancing the light, airy character of the design.</p>
<h2><strong>How to Style:</strong></h2>
<p>This cool-toned piece is perfect for stacking with other silver bands to create a fresh, ocean-inspired palette.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1436667515_Photoroom_20250622_232823_1.webp',
    images: ['/images/products/optimized/opt_1436667515_Photoroom_20250622_232823_1.webp', '/images/products/optimized/opt_12204627_The_background_can_2k_202601011047.webp', '/images/products/optimized/opt_1587192223_The_background_can_2k_202601011047_1.webp', '/images/products/optimized/opt_894721688_Photoroom_20250622_232823_c917b1d7-7bf3-429e-9071-11e1075bc63e.webp'],
    type: ProductType.RING,
    stone: StoneType.BLUE_TOPAZ,
    variants: [],
    tags: ['Blue Topaz', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r66',
    title: 'Skylight Topaz Ring',
    handle: 'skylight-topaz-ring',
    price: 4290.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Skylight Topaz Ring is designed to feel light, calming, and quietly refreshing. Set with round-cut sky blue topaz stones, the ring carries a cool, open tone that brings a sense of ease. Crafted in High-Polished 925 Sterling Silver, the low-profile band sits smoothly on the finger, making it comfortable to wear.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Sky Blue Topaz<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Continuous band design with evenly set stones and CZ accents<br>• <strong>Wearability:</strong> Smooth, low-profile band for comfortable everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Clarity:</strong> Blue topaz is traditionally associated with calmness and clear thought.<br>• <strong>Open Expression:</strong> Often linked to communication and self-expression, blue topaz reflects ease and confidence.<br>• <strong>Cool Brilliance:</strong> CZ accents add gentle sparkle, enhancing the freshness of the design without overpowering it.</p>
<h2><strong>How to Style:</strong></h2>
<p>This cool-toned piece is perfect for stacking with other silver bands to create a fresh, ocean-inspired palette.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1146354701_Photoroom_20250622_231531.webp',
    images: ['/images/products/optimized/opt_1146354701_Photoroom_20250622_231531.webp', '/images/products/optimized/opt_876892174_Now_the_dress_2k_202601011044.webp', '/images/products/optimized/opt_1365270404_Photoroom_20250622_231531.webp'],
    type: ProductType.RING,
    stone: StoneType.BLUE_TOPAZ,
    variants: [],
    tags: ['Blue Topaz', 'ring', 'silver'],
    benefits: ['Calm', 'Clarity', 'Confidence'],
  },
  {
    id: 'r67',
    title: 'Lunara Amethyst Halo Ring',
    handle: 'lunara-amethyst-halo-ring',
    price: 2420.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Lunara Amethyst Halo Ring is created to feel calm, luminous, and reassuring the moment it rests on your hand. An oval amethyst sits at the center, its gentle violet tone offering depth, while a delicate halo frames it beautifully. Set in High-Polished 925 Sterling Silver, the ring feels balanced and refined.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Classic halo setting with a softly elevated crown<br>• <strong>Wearability:</strong> Smooth inner band designed for all-day comfort</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Clarity:</strong> Amethyst is traditionally associated with peace of mind and emotional balance.<br>• <strong>Gentle Confidence:</strong> Its violet hue reflects quiet self-assurance and thoughtful presence.<br>• <strong>Soft Radiance:</strong> CZ accents enhance the stone’s natural beauty with subtle, refined sparkle.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_2042791085_Photoroom_20250622_230224.webp',
    images: ['/images/products/optimized/opt_2042791085_Photoroom_20250622_230224.webp', '/images/products/optimized/opt_1147263266_prompt_a_2k_202601111510_1.webp', '/images/products/optimized/opt_1469221711_prompt_a_2k_202601111510.webp', '/images/products/optimized/opt_558199589_Photoroom_20250622_230424.webp'],
    type: ProductType.RING,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['Amethyst', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r68',
    title: 'Garnet Petal Crown',
    handle: 'garnet-petal-crown',
    price: 2640.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Garnet Petal Crown Ring is designed to feel rich, confident, and quietly romantic. Deep red garnets are arranged in a petal-inspired cluster, creating a floral silhouette that feels timeless. Set in High-Polished 925 Sterling Silver, the ring feels comfortable on the hand, offering a composed presence.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Garnet<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Petal-inspired crown setting with clustered garnets and CZ accents<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Vitality &amp; Strength:</strong> Garnet is traditionally associated with energy, courage, and grounded vitality.<br>• <strong>Confident Expression:</strong> Known for its rich red tone, garnet reflects passion balanced with poise.<br>• <strong>Refined Sparkle:</strong> CZ accents add soft brilliance, enhancing the cluster without overwhelming its warmth.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich intensity of the Garnet makes this an excellent choice for evening wear, providing a strong presence with minimal pairing.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_790456239_Photoroom_20250622_225645.webp',
    images: ['/images/products/optimized/opt_790456239_Photoroom_20250622_225645.webp', '/images/products/optimized/opt_1204313622_Pick_an_apt_2k_202601011200_2.webp', '/images/products/optimized/opt_266409213_Pick_an_apt_2k_202601011200.webp', '/images/products/optimized/opt_1194677877_Photoroom_20250622_225754.webp'],
    type: ProductType.RING,
    stone: StoneType.GARNET,
    variants: [],
    tags: ['Garnet', 'ring', 'silver'],
    benefits: ['Balance', 'Energy'],
  },
  {
    id: 'r69',
    title: 'Garnet Ripple Pavé Ring',
    handle: 'garnet-ripple-pave-ring',
    price: 4290.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Garnet Ripple Pavé Ring is designed to feel confident, grounded, and quietly expressive. Oval-cut garnets bring a deep, rich warmth to the design, their tone adding intensity without feeling overpowering. Crafted in High-Polished 925 Sterling Silver, the ring feels balanced and comfortable.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Garnet<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Ripple-inspired band with flowing pavé CZ detailing<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Grounded Strength:</strong> Garnet is traditionally associated with stability, courage, and inner strength.<br>• <strong>Quiet Confidence:</strong> Known for its deep red tone, garnet reflects assurance and composed presence.<br>• <strong>Soft Sparkle:</strong> Pavé CZ accents add gentle brilliance, enhancing the design without overpowering it.</p>
<h2><strong>How to Style:</strong></h2>
<p>The rich intensity of the Garnet makes this an excellent choice for evening wear, providing a strong presence with minimal pairing.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1351622758_Photoroom_20250622_223851_1.webp',
    images: ['/images/products/optimized/opt_1351622758_Photoroom_20250622_223851_1.webp', '/images/products/optimized/opt_1371765610_hand_placement_2k_202601011031.webp', '/images/products/optimized/opt_1798277582_Ring_size_is_2k_202601021355_1.webp', '/images/products/optimized/opt_686010921_Photoroom_20250622_223851_5b8f9cea-e791-4766-a330-ea494cff2c41.webp'],
    type: ProductType.RING,
    stone: StoneType.GARNET,
    variants: [],
    tags: ['Garnet', 'ring', 'silver'],
    benefits: ['Balance', 'Confidence'],
  },
  {
    id: 'r70',
    title: 'Astria Amethyst Bloom Ring',
    handle: 'astria-amethyst-bloom-ring',
    price: 2860.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Astria Amethyst Bloom Ring is designed to feel expressive yet composed, bringing a gentle sense of clarity to the hand. At its heart, rich violet amethyst stones form a radiant bloom, their colour deep and calming. Set in High-Polished 925 Sterling Silver, the ring feels balanced and comfortable-made to be noticed, yet easy to live with.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Floral cluster with softly radiant halo detailing<br>• <strong>Wearability:</strong> Smooth inner band with a comfortable, secure fit</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Balance:</strong> Amethyst is traditionally associated with a sense of calm, clarity, and emotional balance.<br>• <strong>Inner Confidence:</strong> Its violet tone reflects quiet strength and thoughtful self-assurance.<br>• <strong>Soft Radiance:</strong> CZ accents add gentle light, enhancing the design without overpowering the stone.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1462969909_ChatGPT_Image_Jan_17_2026_03_00_19_PM.webp',
    images: ['/images/products/optimized/opt_1462969909_ChatGPT_Image_Jan_17_2026_03_00_19_PM.webp', '/images/products/optimized/opt_1104863167_prompt_a_2k_202601162303.webp', '/images/products/optimized/opt_1767306913_prompt_a_2k_202601111505.webp', '/images/products/optimized/opt_1546999766_ChatGPT_Image_Jan_17_2026_03_02_44_PM.webp'],
    type: ProductType.RING,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['Amethyst', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Clarity'],
  },
  {
    id: 'r71',
    title: 'Aurora Charm Ring',
    handle: 'aurora-charm-ring',
    price: 3520.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Aurora Charm Ring is designed to feel expressive, uplifting, and quietly confident. Set with round-cut multi tourmaline stones, each hue brings its own softness and depth-coming together in a balanced play of colour. Crafted in High-Polished 925 Sterling Silver, it sits comfortably on the hand, offering a sense of ease.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Multi Tourmaline<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Round<br>• <strong>Design:</strong> Multi-stone band with softly arced settings and CZ accents<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Balance &amp; Harmony:</strong> Multi tourmaline is traditionally associated with emotional balance and alignment.<br>• <strong>Creative Expression:</strong> Known for its range of natural colours, tourmaline reflects individuality and joyful self-expression.<br>• <strong>Gentle Brilliance:</strong> CZ accents add refined sparkle, enhancing the colours without overpowering them.</p>
<h2><strong>How to Style:</strong></h2>
<p>The varied hues of the Tourmaline make this a versatile daily companion that adds a thoughtful touch of color to a minimal aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_11543719_Photoroom_20250622_220550.webp',
    images: ['/images/products/optimized/opt_11543719_Photoroom_20250622_220550.webp', '/images/products/optimized/opt_570801373_apt_prompt_2k_202601021350.webp', '/images/products/optimized/opt_1100822202_Apt_prompt_highend_2k_202601021345.webp', '/images/products/optimized/opt_1794893934_Photoroom_20250622_220550.webp'],
    type: ProductType.RING,
    stone: StoneType.TOURMALINE,
    variants: [],
    tags: ['ring', 'silver', 'tourmaline'],
    benefits: ['Balance', 'Joy', 'Harmony'],
  },
  {
    id: 'r72',
    title: 'Citrine Dawn Solitaire Ring',
    handle: 'citrine-dawn-solitaire-ring',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Citrine Dawn Solitaire Ring is designed to bring a sense of warmth, optimism, and gentle confidence to your everyday style. At its center, an oval citrine glows with a golden hue that feels light and naturally radiant. Set in High-Polished 925 Sterling Silver, the ring feels easy on the hand-thoughtfully balanced and comfortable.</p>
<h2><strong>Product Features:</strong></h2>
<p>• <strong>Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Solitaire setting with a refined halo of CZ accents<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warmth &amp; Optimism:</strong> Citrine is traditionally associated with positivity, clarity, and an uplifting outlook.<br>• <strong>Confident Ease:</strong> Often chosen for its golden tone, citrine reflects self-assurance and lightness of spirit.<br>• <strong>Subtle Radiance:</strong> CZ accents add gentle sparkle, enhancing the stone’s natural glow without overwhelming it.</p>
<h2><strong>How to Style:</strong></h2>
<p>This warm, golden piece pairs beautifully with neutral earth tones, adding a subtle glow to an elevated daytime ensemble.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_121223564_Photoroom_20250622_201654.webp',
    images: ['/images/products/optimized/opt_121223564_Photoroom_20250622_201654.webp', '/images/products/optimized/opt_1903728_Pick_an_apt_2k_202601011157_1.webp', '/images/products/optimized/opt_1964401534_Pick_an_apt_2k_202601011157.webp', '/images/products/optimized/opt_989517266_Photoroom_20250622_214731.webp'],
    type: ProductType.RING,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['Citrine', 'ring', 'silver'],
    benefits: ['Balance', 'Clarity', 'Confidence'],
  },
  {
    id: 'r73',
    title: 'Aurora Tourmaline Crown Ring',
    handle: 'aurora-tourmaline-crown-ring',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Aurora Tourmaline Crown Ring is designed to feel expressive, balanced, and quietly confident. Featuring oval-cut multi tourmaline stones, the ring brings together soft variations of colour that feel natural and harmonious. Set in High-Polished 925 Sterling Silver, the crown-inspired design gives the ring a grounded presence that feels reassuring.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Multi Tourmaline<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Crown-inspired band with a structured arrangement of multi-colour stones<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Balance &amp; Harmony:</strong> Multi tourmaline is traditionally associated with balance and emotional alignment.<br>• <strong>Creative Expression:</strong> Often chosen for its range of natural hues, tourmaline reflects individuality and self-expression.<br>• <strong>Refined Sparkle:</strong> CZ accents add gentle brilliance, enhancing the colours without overpowering them.</p>
<h2><strong>How to Style:</strong></h2>
<p>The varied hues of the Tourmaline make this a versatile daily companion that adds a thoughtful touch of color to a minimal aesthetic.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1295465100_Can_you_polish_2k_202601171428_1.webp',
    images: ['/images/products/optimized/opt_1295465100_Can_you_polish_2k_202601171428_1.webp', '/images/products/optimized/opt_1079862521_prompt_a_2k_202601111500_1.webp', '/images/products/optimized/opt_1837323669_prompt_a_2k_202601111500.webp', '/images/products/optimized/opt_1817450906_Can_you_polish_2k_202601171428.webp'],
    type: ProductType.RING,
    stone: StoneType.TOURMALINE,
    variants: [],
    tags: ['ring', 'silver', 'Tourmaline'],
    benefits: ['Balance', 'Harmony'],
  },
  {
    id: 'r74',
    title: 'Aurelia Rose Halo Ring',
    handle: 'aurelia-rose-halo-ring',
    price: 0.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Aurelia Rose Halo Ring is designed to feel soft, reassuring, and quietly radiant. At its center, a cushion-cut rose quartz carries a gentle blush tone that brings warmth and ease to your everyday style. Set in High-Polished 925 Sterling Silver, the flowing halo design surrounds the stone with delicate brilliance, creating a look that feels balanced and feminine.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Rose Quartz<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Cushion<br>• <strong>Design:</strong> Halo-inspired setting with flowing silver curves and CZ accents<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Gentle Balance:</strong> Rose quartz is traditionally associated with emotional harmony and a sense of calm.<br>• <strong>Soft Confidence:</strong> Often chosen for its delicate blush tone, rose quartz reflects warmth and quiet self-assurance.<br>• <strong>Subtle Radiance:</strong> CZ accents add light and refinement, enhancing the design without overwhelming its softness.</p>
<h2><strong>How to Style:</strong></h2>
<p>Allow the delicate blush of the Rose Quartz to serve as a personal, quiet accent against light, airy fabrics.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_367909031_Photoroom_20250621_023608.webp',
    images: ['/images/products/optimized/opt_367909031_Photoroom_20250621_023608.webp', '/images/products/optimized/opt_1193195566_prompt_a_2k_202601111454.webp', '/images/products/optimized/opt_2104699438_prompt_a_2k_202601111455.webp', '/images/products/optimized/opt_1415432380_Photoroom_20250621_023608.webp'],
    type: ProductType.RING,
    stone: StoneType.ROSE_QUARTZ,
    variants: [],
    tags: ['ring', 'Rose', 'Rose quartz', 'silver'],
    benefits: ['Calm', 'Balance', 'Harmony'],
  },
  {
    id: 'r75',
    title: 'Solaris Citrine Knot Ring',
    handle: 'solaris-citrine-knot-ring',
    price: 5280.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Solaris Citrine Knot Ring is designed to bring warmth, optimism, and quiet strength into your everyday style. At its center, a cushion-cut citrine glows with a soft golden hue, offering a sense of lightness and clarity. Set in High-Polished 925 Sterling Silver, the flowing knot-inspired design wraps gently around the stone, giving the ring a graceful presence.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Citrine<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Cushion<br>• <strong>Design:</strong> Knot-inspired setting with flowing silver curves and CZ accents<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Warmth &amp; Positivity:</strong> Citrine is traditionally associated with warmth, optimism, and a positive outlook.<br>• <strong>Clarity &amp; Confidence:</strong> Often chosen for its golden tone, citrine is linked to clarity of thought and self-assured expression.<br>• <strong>Soft Brilliance:</strong> CZ accents add gentle sparkle, enhancing the design without taking away from the stone’s natural glow.</p>
<h2><strong>How to Style:</strong></h2>
<p>This warm, golden piece pairs beautifully with neutral earth tones, adding a subtle glow to an elevated daytime ensemble.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_1574328317_R2.webp',
    images: ['/images/products/optimized/opt_1574328317_R2.webp', '/images/products/optimized/opt_139920660_prompt_a_2k_202601111449_1.webp', '/images/products/optimized/opt_1039119927_prompt_a_2k_202601111449.webp', '/images/products/optimized/opt_531316375_Photoroom_20250621_022250.webp'],
    type: ProductType.RING,
    stone: StoneType.CITRINE,
    variants: [],
    tags: ['Citrine', 'ring', 'silver'],
    benefits: ['Clarity', 'Confidence', 'Optimism'],
  },
  {
    id: 'r76',
    title: 'Amara Amethyst Crown Ring',
    handle: 'amara-amethyst-crown-ring',
    price: 2860.0,
    description: `<h2><strong>Description:</strong></h2>
<p>The Amara Amethyst Crown Ring is made to feel calm, confident, and quietly expressive the moment you wear it. At the center, an oval amethyst brings a sense of depth and balance, while its gentle violet tone adds character. Set in High-Polished 925 Sterling Silver, the ring feels grounded and reassuring on the hand-easy to wear, yet thoughtfully distinct.</p>
<h2><strong>Product Features:</strong></h2>
<p>•<strong> Metal:</strong> High-Polished 925 Sterling Silver<br>• <strong>Primary Stone:</strong> Amethyst<br>• <strong>Accent Stones:</strong> Cubic Zirconia (CZ)<br>• <strong>Cut / Shape:</strong> Oval<br>• <strong>Design:</strong> Crown-inspired band with layered stone detailing<br>• <strong>Wearability:</strong> Smooth inner band for comfortable, everyday wear</p>
<h2><strong>Benefits:</strong></h2>
<p>• <strong>Calm &amp; Balance:</strong> Amethyst is traditionally associated with inner calm and emotional balance.<br>• <strong>Quiet Confidence:</strong> Often chosen for its deep violet tone, amethyst reflects composed strength and self-assured elegance.<br>• <strong>Refined Light:</strong> CZ accents add a soft brilliance, enhancing the ring without overpowering its character.</p>
<h2><strong>How to Style:</strong></h2>
<p>The serene violet serves as a refined daily signature, perfect for adding a touch of elegance to business-casual attire.<br></p>
<h2><strong>Natural Variation &amp; Care:</strong></h2>
<p>
• As each piece is crafted and finished by hand, slight variations in size may occur.<br>
• Natural gemstones may show minor variations in color, shade, and inclusions, which are part of their unique character.<br>
• This jewelry is intended for personal expression and well-being, not as a substitute for medical care.
</p>
`,
    image: '/images/products/optimized/opt_376954442_Photoroom_20250626_020525.webp',
    images: ['/images/products/optimized/opt_376954442_Photoroom_20250626_020525.webp', '/images/products/optimized/opt_880667708_05_Fashion.webp', '/images/products/optimized/opt_2107817485_Photoroom_20250626_020335.webp', '/images/products/optimized/opt_2134640909_Photoroom_20250626_020525.webp'],
    type: ProductType.RING,
    stone: StoneType.AMETHYST,
    variants: [],
    tags: ['Amethyst', 'ring', 'silver'],
    benefits: ['Calm', 'Balance', 'Confidence'],
  },
];
