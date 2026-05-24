const fs = require('fs');
const path = require('path');

// Real blog slugs from blogPosts.ts (88) and seoBlogPosts.ts (31)
const blogSlugs = [
  'how-to-use-citrine-for-spiritual-healing',
  'why-the-solaris-citrine-ring-is-the-perfect-energy-gift',
  'the-complete-guide-to-citrine-energies',
  'how-to-style-citrine-with-925-silver',
  'does-citrine-help-with-stress-and-anxiety',
  'the-meaning-of-citrine-in-modern-jewelry',
  'how-to-cleanse-your-citrine-jewelry-s-energy',
  'why-choose-silvoraa-s-citrine-collection',
  'can-citrine-jewelry-improve-your-focus',
  'the-history-behind-citrine-and-its-powers',
  'how-to-use-citrine-ring-for-spiritual-healing',
  'how-to-use-amethyst-for-spiritual-healing',
  'why-the-velisse-amethyst-band-is-the-perfect-energy-gift',
  'the-complete-guide-to-amethyst-energies',
  'how-to-style-amethyst-with-925-silver',
  'does-amethyst-help-with-stress-and-anxiety',
  'the-meaning-of-amethyst-in-modern-jewelry',
  'how-to-cleanse-your-amethyst-jewelry-s-energy',
  'why-choose-silvoraa-s-amethyst-collection',
  'can-amethyst-jewelry-improve-your-focus',
  'the-history-behind-amethyst-and-its-powers',
  'how-to-use-amethyst-for-spiritual-healing-2',
  'how-to-use-lapis-lazuli-for-spiritual-healing',
  'why-the-indigo-lapis-lazuli-harmony-is-the-perfect-energy-gift',
  'the-complete-guide-to-lapis-lazuli-energies',
  'how-to-style-lapis-lazuli-with-925-silver',
  'does-lapis-lazuli-help-with-stress-and-anxiety',
  'the-meaning-of-lapis-lazuli-in-modern-jewelry',
  'how-to-cleanse-your-lapis-lazuli-jewelry-s-energy',
  'why-choose-silvoraa-s-lapis-lazuli-collection',
  'can-lapis-lazuli-jewelry-improve-your-focus',
  'the-history-behind-lapis-lazuli-and-its-powers',
  'how-to-use-lapis-lazuli-for-spiritual-healing-2',
  'how-to-use-blue-topaz-for-spiritual-healing',
  'why-the-azure-blue-topaz-bloom-is-the-perfect-energy-gift',
  'the-complete-guide-to-blue-topaz-energies',
  'how-to-style-blue-topaz-with-925-silver',
  'does-blue-topaz-help-with-stress-and-anxiety',
  'the-meaning-of-blue-topaz-in-modern-jewelry',
  'how-to-cleanse-your-blue-topaz-jewelry-s-energy',
  'why-choose-silvoraa-s-blue-topaz-collection',
  'can-blue-topaz-jewelry-improve-your-focus',
  'the-history-behind-blue-topaz-and-its-powers',
  'how-to-use-blue-topaz-for-spiritual-healing-2',
  'how-to-use-garnet-for-spiritual-healing',
  'why-the-ravelle-garnet-corona-is-the-perfect-energy-gift',
  'the-complete-guide-to-garnet-energies',
  'how-to-style-garnet-with-925-silver',
  'does-garnet-help-with-stress-and-anxiety',
  'the-meaning-of-garnet-in-modern-jewelry',
  'how-to-cleanse-your-garnet-jewelry-s-energy',
  'why-choose-silvoraa-s-garnet-collection',
  'can-garnet-jewelry-improve-your-focus',
  'the-history-behind-garnet-and-its-powers',
  'how-to-use-garnet-for-spiritual-healing-2',
  'how-to-use-iolite-for-spiritual-healing',
  'why-the-nocturne-iolite-halo-band-is-the-perfect-energy-gift',
  'the-complete-guide-to-iolite-energies',
  'how-to-style-iolite-with-925-silver',
  'does-iolite-help-with-stress-and-anxiety',
  'the-meaning-of-iolite-in-modern-jewelry',
  'how-to-cleanse-your-iolite-jewelry-s-energy',
  'why-choose-silvoraa-s-iolite-collection',
  'can-iolite-jewelry-improve-your-focus',
  'the-history-behind-iolite-and-its-powers',
  'how-to-use-iolite-for-spiritual-healing-2',
  'how-to-use-tourmaline-for-spiritual-healing',
  'why-the-liora-tourmaline-paraiba-glow-is-the-perfect-energy-gift',
  'the-complete-guide-to-tourmaline-energies',
  'how-to-style-tourmaline-with-925-silver',
  'does-tourmaline-help-with-stress-and-anxiety',
  'the-meaning-of-tourmaline-in-modern-jewelry',
  'how-to-cleanse-your-tourmaline-jewelry-s-energy',
  'why-choose-silvoraa-s-tourmaline-collection',
  'can-tourmaline-jewelry-improve-your-focus',
  'the-history-behind-tourmaline-and-its-powers',
  'how-to-use-tourmaline-for-spiritual-healing-2',
  'how-to-use-lemon-topaz-for-spiritual-healing',
  'why-the-calyra-lemon-topaz-knot-ring-is-the-perfect-energy-gift',
  'the-complete-guide-to-lemon-topaz-energies',
  'how-to-style-lemon-topaz-with-925-silver',
  'does-lemon-topaz-help-with-stress-and-anxiety',
  'the-meaning-of-lemon-topaz-in-modern-jewelry',
  'how-to-cleanse-your-lemon-topaz-jewelry-s-energy',
  'why-choose-silvoraa-s-lemon-topaz-collection',
  'can-lemon-topaz-jewelry-improve-your-focus',
  'the-history-behind-lemon-topaz-and-its-powers',
  'how-to-use-lemon-topaz-for-spiritual-healing-2',
  'how-to-use-cubic-zirconia-for-spiritual-healing',
  'why-the-celeste-cubic-zirconia-twin-heart-is-the-perfect-energy-gift',
  'the-complete-guide-to-cubic-zirconia-energies',
  'how-to-style-cubic-zirconia-with-925-silver',
  'does-cubic-zirconia-help-with-stress-and-anxiety',
  'the-meaning-of-cubic-zirconia-in-modern-jewelry',
  'how-to-cleanse-your-cubic-zirconia-jewelry-s-energy',
  'why-choose-silvoraa-s-cubic-zirconia-collection',
  'can-cubic-zirconia-jewelry-improve-your-focus',
  'the-history-behind-cubic-zirconia-and-its-powers',
  'how-to-use-cubic-zirconia-for-spiritual-healing-2',
  // seoBlogPosts slugs
  'can-citrine-help-manifest-abundance-joy',
  'can-amethyst-bring-peaceful-sleep-calm-mind',
  'can-topaz-help-you-embrace-authentic-confidence',
  'can-garnet-ignite-your-passion-and-vitality',
  'can-lapis-lazuli-help-you-find-inner-truth-wisdom',
  'can-iolite-guide-you-toward-inner-balance-insight',
  'can-opal-unlock-your-creative-flow-and-hopeful-spirit',
  'can-tourmaline-bring-balance-and-harmony-into-your-life',
  'can-cubic-zirconia-enhance-clarity-and-mental-focus',
  'can-rose-amethyst-bring-emotional-balance-and-gentle-healing',
  'can-blue-topaz-bring-clarity-and-calm-to-your-mind',
  'can-emerald-bring-harmony-and-renewal-into-your-life',
  'can-lemon-topaz-fill-your-life-with-joy-and-positivity',
  'can-sky-blue-topaz-bring-peaceful-energy-into-your-life',
  'can-rose-quartz-open-your-heart-to-unconditional-love',
  'can-labradorite-awaken-your-intuition-and-mystical-powers',
  'can-paraiba-tourmaline-bring-rare-transformative-energy',
  'does-sterling-silver-enhance-gemstone-energy',
  'what-happens-when-you-wear-gemstones-over-your-heart',
  'do-gemstone-rings-and-pendants-work-on-different-energy-channels',
  'can-you-stack-multiple-gemstones-together-for-enhanced-benefits',
  'how-does-color-therapy-work-with-gemstone-healing',
  'which-gemstones-are-best-for-manifestation-rituals',
  'how-do-you-choose-gemstones-based-on-your-chakra-needs',
  'how-do-you-charge-gemstones-under-the-full-moon',
  'how-do-you-combine-gemstones-for-maximum-healing-benefits',
  'whats-the-difference-between-rough-and-polished-gemstone-energy',
  'how-do-different-metal-settings-affect-gemstone-energy',
  'how-do-you-intentionally-select-gemstones-for-healing',
  'how-do-you-use-gemstones-during-mercury-retrograde-periods',
  'how-does-sacred-geometry-influence-gemstone-jewelry-energy',
];

// Product handles from the existing sitemap (keeping the same product URLs)
const productHandles = [
  'solaris-citrine-bloom-pendant',
  'indigo-lapis-lazuli-harmony-dew-drop-pendant',
  'solaris-citrine-grand-solitaire-pendant',
  'celeste-cubic-zirconia-crest-pendant',
  'nocturne-iolite-eternity-ring',
  'aquarelle-twin-heart-topaz-ring',
  'calyra-lemon-topaz-knot-ring',
  'velisse-amethyst-halo-ring',
  'noctelle-iolite-halo-band',
  'ravelle-garnet-eternity-band',
  'evara-fourlight-gem-band',
  'serenelle-amethyst-halo-band',
  'lunelle-amethyst-bloom-ring',
  'elara-zirconia-twin-heart-ring',
  'virelle-amethyst-crest-ring',
  'marea-paraiba-glow-band',
  'liora-cascade-tourmaline-ring',
  'amora-twin-heart-amethyst-ring',
  'elaria-amethyst-eternity-band',
  'solara-lattice-citrine-ring',
  'blush-arc-tourmaline-band',
  'garnet-corona-ring',
  'azure-crest-topaz-ring',
  'solaris-marquise-citrine',
  'azure-topaz-twin-bloom-ring',
  'skylight-topaz-ring',
  'lunara-amethyst-halo-ring',
  'garnet-petal-crown',
  'garnet-ripple-pave-ring',
  'astria-amethyst-bloom-ring',
  'aurora-charm-ring',
  'citrine-dawn-solitaire-ring',
  'aurora-tourmaline-crown-ring',
  'aurelia-rose-halo-ring',
  'solaris-citrine-knot-ring',
  'amara-amethyst-crown-ring',
  'solara-citrine-halo-stud-earrings',
  'aurielle-opal-halo-stud-earrings',
  'solaris-citrine-crest-pendant',
  'aurora-tourmaline-crest-pendant',
  'ember-trine-harmony-pendant',
  'radiant-trine-harmony-pendant',
  'verdant-emerald-charm-pendant',
  'solaris-citrine-dew-drop-pendant',
  'aurelia-rose-quartz-solitaire-pendant',
  'solaris-citrine-classic-solitaire-pendant',
  'liora-labradorite-bloom-pendant',
  'amara-amethyst-bloom-pendant',
  'amara-amethyst-classic-solitaire-pendant',
  'amara-amethyst-crest-pendant',
  'amara-amethyst-dew-drop-pendant',
  'amara-amethyst-grand-solitaire-pendant',
  'aquarelle-blue-topaz-and-blue-sapphire-halo-stud-earrings',
  'azure-blue-topaz-bloom-pendant',
  'azure-blue-topaz-crest-pendant',
  'calyra-lemon-topaz-bloom-pendant',
  'calyra-lemon-topaz-grand-bloom-pendant',
  'celeste-cubic-zirconia-bloom-pendant',
  'celeste-cubic-zirconia-classic-solitaire-pendant',
  'celeste-cubic-zirconia-dew-drop-pendant',
  'celeste-cubic-zirconia-grand-solitaire-pendant',
  'elowen-rose-amethyst-and-blue-sapphire-link-bracelet',
  'indigo-lapis-lazuli-peak-pendant',
  'indigo-lapis-lazuli-refined-charm-pendant',
  'indigo-lapis-lazuli-truth-dew-drop-pendant',
  'indigo-lapis-lazuli-wisdom-charm-pendant',
  'lunara-amethyst-cascade-earrings',
  'lunelle-cz-drop-nose-ring',
  'nocturne-lapis-lazuli-charm-pendant',
  'opaline-opal-bloom-pendant',
  'opaline-opal-dew-drop-pendant',
  'serenelle-cz-chandelier-drop-earrings',
  'skylight-sky-blue-topaz-bloom-pendant',
  'skylight-sky-blue-topaz-dew-drop-pendant',
  'skylight-sky-blue-topaz-solitaire-pendant',
  'solaris-citrine-octagon-solitaire-pendant',
];

const domain = 'https://www.silvoraa.com';
const now = new Date().toISOString();

function url(loc, changefreq, priority, lastmod = null) {
  let s = '  <url>\n    <loc>' + loc + '</loc>\n';
  if (lastmod) s += '    <lastmod>' + lastmod + '</lastmod>\n';
  s += '    <changefreq>' + changefreq + '</changefreq>\n';
  s += '    <priority>' + priority + '</priority>\n  </url>';
  return s;
}

const lines = [];
lines.push('<?xml version="1.0" encoding="UTF-8"?>');
lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

// Static pages
lines.push(url(domain + '/', 'daily', '1.0'));
lines.push(url(domain + '/shop', 'daily', '0.8'));
lines.push(url(domain + '/collections', 'weekly', '0.8'));
lines.push(url(domain + '/about', 'weekly', '0.8'));
lines.push(url(domain + '/authenticity', 'weekly', '0.8'));
lines.push(url(domain + '/blog', 'weekly', '0.8'));
lines.push(url(domain + '/faq', 'weekly', '0.8'));
lines.push(url(domain + '/book-consultation', 'weekly', '0.8'));

// Blog posts (only real slugs)
blogSlugs.forEach(slug => {
  lines.push(url(domain + '/blog/' + slug, 'monthly', '0.7'));
});

// Product pages
productHandles.forEach(handle => {
  lines.push(url(domain + '/product/' + handle, 'weekly', '0.9', now));
});

lines.push('</urlset>');

const xml = lines.join('\n') + '\n';
fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), xml, 'utf-8');
console.log('Sitemap written with ' + blogSlugs.length + ' blog posts and ' + productHandles.length + ' products');
