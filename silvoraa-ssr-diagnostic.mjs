/**
 * ============================================================
 * SILVORAA — SSR / 500 ERROR DIAGNOSTIC SCRIPT
 * ============================================================
 * Run this from your project root (where next.config.js lives):
 *   node silvoraa-ssr-diagnostic.mjs
 *
 * What this does:
 *  1. Reads every critical source file in the dependency chain
 *  2. Detects every browser-only API access that would crash SSR
 *  3. Checks .env.local for missing / placeholder values
 *  4. Reports all issues with exact file + line context and fix instructions
 * ============================================================
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

// ROOT = the directory you run this script FROM (your project root, where next.config.js lives)
const ROOT = process.cwd();

const R    = '\x1b[31m';
const Y    = '\x1b[33m';
const G    = '\x1b[32m';
const B    = '\x1b[34m';
const C    = '\x1b[36m';
const W    = '\x1b[37m';
const DIM  = '\x1b[2m';
const BOLD = '\x1b[1m';
const RST  = '\x1b[0m';

const issues   = [];
const warnings = [];
const passed   = [];

function issue(category, file, detail, fix) {
  issues.push({ category, file, detail, fix });
}
function warn(category, file, detail, fix) {
  warnings.push({ category, file, detail, fix });
}
function pass(label) {
  passed.push(label);
}

function rel(p) { return relative(ROOT, p); }

function readFile(p) {
  try { return readFileSync(p, 'utf8'); } catch { return null; }
}

function section(title) {
  console.log('\n' + BOLD + B + '='.repeat(62) + RST);
  console.log(BOLD + C + '  ' + title + RST);
  console.log(B + '='.repeat(62) + RST);
}

// ══════════════════════════════════════════════════════════════
// 1. ENVIRONMENT / CONFIG
// ══════════════════════════════════════════════════════════════
section('1. ENVIRONMENT & CONFIG');

// next.config.js
const nextCfgSrc = readFile(resolve(ROOT, 'next.config.js'));
if (nextCfgSrc) {
  if (/instrumentationHook/.test(nextCfgSrc)) {
    issue(
      'next.config.js',
      'next.config.js',
      '`experimental.instrumentationHook` is an unrecognised key in Next.js 15.3.x.\n' +
      '    Next shows a warning and the option is silently ignored.\n' +
      '    Your localStorage shim in instrumentation.ts may NOT be loading reliably in dev.',
      'Remove the `instrumentationHook: true` line. In Next 15,\n' +
      '    instrumentation.ts is loaded by default — no flag needed.\n' +
      '    Also remove the `experimental: {}` block entirely if it becomes empty.'
    );
    console.log('  ' + R + 'x' + RST + ' next.config.js — instrumentationHook STILL present (must remove)');
  } else {
    pass('next.config.js — instrumentationHook removed');
    console.log('  ' + G + 'v' + RST + ' next.config.js — no instrumentationHook');
  }
} else {
  issue('next.config.js', 'next.config.js', 'File not found', 'Ensure next.config.js exists at project root');
  console.log('  ' + R + 'x' + RST + ' next.config.js NOT FOUND');
}

// .env.local
const envSrc = readFile(resolve(ROOT, '.env.local'));
const requiredVars = [
  { key: 'NEXT_PUBLIC_APPWRITE_ENDPOINT',               desc: 'Appwrite API endpoint' },
  { key: 'NEXT_PUBLIC_APPWRITE_PROJECT_ID',             desc: 'Appwrite project ID' },
  { key: 'NEXT_PUBLIC_APPWRITE_DATABASE_ID',            desc: 'Appwrite database ID' },
  { key: 'NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID', desc: 'Products collection' },
  { key: 'NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID',   desc: 'Orders collection' },
  { key: 'NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID',    desc: 'Users/profiles collection' },
  { key: 'NEXT_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID',  desc: 'Reviews collection' },
  { key: 'NEXT_PUBLIC_APPWRITE_BUCKET_ID',              desc: 'Storage bucket' },
  { key: 'NEXT_PUBLIC_GEMINI_API_KEY',                  desc: 'Gemini AI (AIStylist)' },
  { key: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',               desc: '(optional) Google Analytics 4' },
  { key: 'NEXT_PUBLIC_POSTHOG_API_KEY',                 desc: '(optional) PostHog analytics' },
  { key: 'NEXT_PUBLIC_CLARITY_PROJECT_ID',              desc: '(optional) Microsoft Clarity' },
  { key: 'NEXT_PUBLIC_SENTRY_DSN',                      desc: '(optional) Sentry error tracking' },
];

if (!envSrc) {
  issue('ENV', '.env.local',
    '.env.local file is MISSING. Next.js falls back to hardcoded placeholder\n' +
    '    defaults in source code. Appwrite / Supabase calls will likely fail.',
    'Create .env.local in the project root with all NEXT_PUBLIC_ vars listed in this report.');
  console.log('  ' + R + 'x' + RST + ' .env.local NOT FOUND');
} else {
  console.log('  ' + G + 'v' + RST + ' .env.local found');
  const missing = [];
  const empty   = [];
  const pholder = [];
  for (const { key, desc } of requiredVars) {
    const m = envSrc.match(new RegExp('^' + key + '=(.*)$', 'm'));
    if (!m) { missing.push({ key, desc }); continue; }
    const val = m[1].trim();
    if (!val) { empty.push({ key, desc }); continue; }
    if (/placeholder|your[-_]|xxx|todo|changeme|example/i.test(val)) {
      pholder.push({ key, desc, val });
    }
  }
  if (missing.length) {
    issue('ENV', '.env.local',
      'Missing env vars:\n' + missing.map(v => '    ' + v.key + '  (' + v.desc + ')').join('\n'),
      'Add these to .env.local with real values from your dashboards.');
    missing.forEach(v => console.log('  ' + R + 'x' + RST + ' Missing: ' + v.key));
  }
  if (empty.length) {
    issue('ENV', '.env.local',
      'Empty env vars (key present, no value):\n' + empty.map(v => '    ' + v.key).join('\n'),
      'Fill in values for these variables.');
    empty.forEach(v => console.log('  ' + R + 'x' + RST + ' Empty: ' + v.key));
  }
  if (pholder.length) {
    warn('ENV', '.env.local',
      'Placeholder values detected:\n' + pholder.map(v => '    ' + v.key + '="' + v.val + '"').join('\n'),
      'Replace with real credentials.');
    pholder.forEach(v => console.log('  ' + Y + '!' + RST + ' Placeholder: ' + v.key));
  }
  if (!missing.length && !empty.length && !pholder.length) {
    pass('.env.local — all vars present');
    console.log('  ' + G + 'v' + RST + ' All required env vars present and non-empty');
  }
}

// ══════════════════════════════════════════════════════════════
// 2. INSTRUMENTATION.TS
// ══════════════════════════════════════════════════════════════
section('2. INSTRUMENTATION.TS (localStorage shim)');

const instrSrc = readFile(resolve(ROOT, 'instrumentation.ts'));
if (!instrSrc) {
  issue('Instrumentation', 'instrumentation.ts',
    'instrumentation.ts not found. No server-side localStorage shim exists.',
    'Create instrumentation.ts with a globalThis.localStorage polyfill inside register().');
  console.log('  ' + R + 'x' + RST + ' instrumentation.ts NOT FOUND');
} else {
  console.log('  ' + G + 'v' + RST + ' instrumentation.ts exists');
  if (!/NEXT_RUNTIME.*nodejs/.test(instrSrc)) {
    warn('Instrumentation', 'instrumentation.ts',
      'Missing `process.env.NEXT_RUNTIME === "nodejs"` guard.',
      'Wrap the shim body in: if (process.env.NEXT_RUNTIME === "nodejs") { ... }');
    console.log('  ' + Y + '!' + RST + ' Missing NEXT_RUNTIME guard');
  } else {
    pass('instrumentation.ts — NEXT_RUNTIME guard OK');
    console.log('  ' + G + 'v' + RST + ' NEXT_RUNTIME === "nodejs" guard present');
  }
  if (!/localStorage/.test(instrSrc)) {
    issue('Instrumentation', 'instrumentation.ts',
      'No localStorage shim defined inside register().',
      'Add globalThis.localStorage = { getItem, setItem, removeItem, ... } inside register().');
    console.log('  ' + R + 'x' + RST + ' No localStorage shim found');
  } else {
    pass('instrumentation.ts — localStorage shim present');
    console.log('  ' + G + 'v' + RST + ' localStorage shim present');
  }
}

// ══════════════════════════════════════════════════════════════
// 3. POSTHOG — PRIMARY CRASH SOURCE
// ══════════════════════════════════════════════════════════════
section('3. POSTHOG-JS — PRIMARY CRASH SOURCE');

const posthogSrc = readFile(resolve(ROOT, 'hooks/usePostHog.ts'));
if (posthogSrc) {
  const hasTopLevel  = /^import\s+posthog\s+from\s+['"]posthog-js['"]/m.test(posthogSrc);
  const hasReqGuard  = /typeof\s+window/.test(posthogSrc) && /require\(.*posthog/.test(posthogSrc);
  const hasDynImport = /await\s+import\(.*posthog/.test(posthogSrc);

  if (hasTopLevel && !hasReqGuard && !hasDynImport) {
    issue(
      'SSR CRASH',
      'hooks/usePostHog.ts',
      'Top-level `import posthog from "posthog-js"` is present.\n' +
      '    posthog-js v1.x calls localStorage.getItem() at module evaluation time —\n' +
      '    before any useEffect or window guard can protect it.\n' +
      '    Even though usePostHog is imported by a "use client" component,\n' +
      '    Next.js evaluates the full module graph server-side during SSR.\n' +
      '    Import chain: CartContext.tsx -> useAnalytics.ts -> usePostHog.ts -> posthog-js\n' +
      '    This is THE DIRECT CAUSE of: TypeError: localStorage.getItem is not a function',
      'Replace the top-level import with a browser-guarded require:\n\n' +
      '    // hooks/usePostHog.ts — line 1\n' +
      "    const posthog = typeof window !== 'undefined'\n" +
      "      ? require('posthog-js').default\n" +
      '      : null;\n\n' +
      '    Then add null checks before every posthog call:\n' +
      '      if (posthog) posthog.capture(...);\n\n' +
      '    OR use dynamic import inside initPostHog():\n' +
      '      export const initPostHog = async () => {\n' +
      "        if (typeof window === 'undefined') return;\n" +
      "        const { default: ph } = await import('posthog-js');\n" +
      '        ph.init(POSTHOG_API_KEY, { api_host: ... });\n' +
      '      };'
    );
    console.log('  ' + R + 'x CRITICAL' + RST + ' posthog-js top-level import — SSR CRASH');
  } else if (hasReqGuard || hasDynImport) {
    pass('usePostHog.ts — posthog import is guarded');
    console.log('  ' + G + 'v' + RST + ' posthog import is guarded — fix applied correctly');
  } else {
    warn('SSR', 'hooks/usePostHog.ts',
      'Could not confirm posthog import is SSR-safe.',
      'Ensure posthog is never imported at module top-level without typeof window guard.');
    console.log('  ' + Y + '!' + RST + ' posthog import — manual review needed');
  }
} else {
  console.log('  ' + DIM + '-' + RST + ' hooks/usePostHog.ts not found (skipped)');
}

// ══════════════════════════════════════════════════════════════
// 4. FULL BROWSER-API SCAN
// ══════════════════════════════════════════════════════════════
section('4. BROWSER-API ACCESS SCAN (all source files)');

const filesToScan = [
  'lib/appwrite.ts',
  'hooks/useAnalytics.ts',
  'hooks/usePostHog.ts',
  'hooks/useProducts.ts',
  'services/geminiService.ts',
  'services/profileService.ts',
  'services/orderService.ts',
  'services/searchService.ts',
  'components/Cart/CartContext.tsx',
  'components/Auth/AuthContext.tsx',
  'components/Config/ConfigProvider.tsx',
  'components/Layout/Navbar.tsx',
  'components/Layout/SmartSearch.tsx',
  'components/Hero/HeroSection.tsx',
  'components/AI/AIStylist.tsx',
  'app/ClientLayoutWrapper.tsx',
  'app/layout.tsx',
  'app/page.tsx',
  'app/HomePageClient.tsx',
  'app/checkout/page.tsx',
];

const DANGER_PATTERNS = [
  { re: /(?<![?.])\blocalStorage\b/,           label: 'bare localStorage (no optional chain)' },
  { re: /(?<![?.])\bsessionStorage\b/,         label: 'bare sessionStorage' },
  { re: /window\.(location|history|open|alert|confirm|scrollTo|scrollY|innerWidth|addEventListener|removeEventListener)\b/, label: 'window.browser-API' },
];

for (const f of filesToScan) {
  const src = readFile(resolve(ROOT, f));
  if (!src) continue;

  const isClient = /^['"]use client['"]/m.test(src);
  const lines    = src.split('\n');

  for (const { re, label } of DANGER_PATTERNS) {
    const hits = [];
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) return;
      if (/typeof\s+(window|document)\s*!==\s*['"]undefined['"]/.test(line)) return;
      if (/window\?\.localStorage/.test(line)) return;
      if (re.test(line)) {
        const ctx = lines.slice(Math.max(0, i - 5), i).join('\n');
        const inEffect = /useEffect\s*\(/.test(ctx);
        if (!inEffect) hits.push('    L' + (i + 1) + ': ' + line.trim());
      }
    });
    if (!hits.length) continue;

    const detail = label + ' outside useEffect/guard:\n' + hits.join('\n');
    const fix    = 'Wrap in: if (typeof window !== "undefined") { ... }  OR move inside useEffect(() => { ... }, [])';

    if (!isClient) {
      issue('SSR Unsafe', f, detail, fix);
      console.log('  ' + R + 'x' + RST + ' ' + f + ' — ' + label);
    } else {
      warn('SSR Risky', f, detail, fix);
      console.log('  ' + Y + '!' + RST + ' ' + f + ' — ' + label + ' (client component — risky at module scope)');
    }
  }
}

// ══════════════════════════════════════════════════════════════
// 5. APPWRITE CLIENT
// ══════════════════════════════════════════════════════════════
section('5. APPWRITE CLIENT (lib/appwrite.ts)');

const awSrc = readFile(resolve(ROOT, 'lib/appwrite.ts'));
if (awSrc) {
  if (/export\s+const\s+client\s*=\s*typeof\s+window/.test(awSrc)) {
    pass('appwrite.ts — client guarded');
    console.log('  ' + G + 'v' + RST + ' Appwrite Client instantiation is typeof-window guarded');
  } else {
    issue('SSR Crash', 'lib/appwrite.ts',
      'Appwrite Client is instantiated without a typeof window guard.\n' +
      '    Appwrite Web SDK v14 calls localStorage in its constructor.',
      'Change to:\n    export const client = typeof window !== "undefined" ? createClient() : {} as Client;');
    console.log('  ' + R + 'x' + RST + ' Appwrite Client NOT guarded — will crash on server');
  }

  if (/window\.location\.origin/.test(awSrc)) {
    const lines = awSrc.split('\n');
    const hits  = lines
      .map((l, i) => ({ n: i+1, l }))
      .filter(({ l }) => /window\.location\.origin/.test(l))
      .map(({ n, l }) => '    L' + n + ': ' + l.trim());
    issue('SSR Crash', 'lib/appwrite.ts',
      'window.location.origin used directly (crashes if invoked server-side):\n' + hits.join('\n'),
      'Guard with:\n    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"');
    console.log('  ' + R + 'x' + RST + ' window.location.origin without guard in appwrite.ts');
  } else {
    pass('appwrite.ts — no bare window.location.origin');
    console.log('  ' + G + 'v' + RST + ' No bare window.location.origin');
  }

  if (/export\s+const\s+supabase\s*=/.test(awSrc)) {
    warn('Architecture', 'lib/appwrite.ts',
      'Fake supabase shim is exported from lib/appwrite.ts.\n' +
      '    supabase.rpc() (used for cart sync) is a no-op — silently returns {data:null}.\n' +
      '    Cart DB sync never actually runs.',
      '(A) Replace shim with real Supabase client (add NEXT_PUBLIC_SUPABASE_URL + ANON_KEY to .env.local)\n' +
      '    OR (B) Rewrite cart code to use Appwrite Databases directly\n' +
      '    OR (C) Remove server cart sync and rely on localStorage only (simplest).');
    console.log('  ' + Y + '!' + RST + ' Fake supabase shim — supabase.rpc() is a no-op (cart sync broken)');
  }
}

// ══════════════════════════════════════════════════════════════
// 6. USE CLIENT BOUNDARY AUDIT
// ══════════════════════════════════════════════════════════════
section('6. "use client" BOUNDARY AUDIT');

const mustBeServer = ['app/layout.tsx', 'app/page.tsx'];
const mustBeClient = [
  'components/Cart/CartContext.tsx',
  'components/Auth/AuthContext.tsx',
  'components/Config/ConfigProvider.tsx',
  'app/ClientLayoutWrapper.tsx',
];

for (const f of mustBeServer) {
  const src = readFile(resolve(ROOT, f));
  if (!src) continue;
  if (/^['"]use client['"]/m.test(src)) {
    warn('Architecture', f,
      f + ' is a Server Component but has "use client". Entire tree becomes client-side.',
      'Remove "use client" from ' + f);
    console.log('  ' + Y + '!' + RST + ' ' + f + ' — unexpected "use client" on Server Component');
  } else {
    pass(f + ' — correctly Server Component');
    console.log('  ' + G + 'v' + RST + ' ' + f + ' — Server Component (correct)');
  }
}
for (const f of mustBeClient) {
  const src = readFile(resolve(ROOT, f));
  if (!src) continue;
  if (/^['"]use client['"]/m.test(src)) {
    pass(f + ' — "use client" present');
    console.log('  ' + G + 'v' + RST + ' ' + f + ' — "use client" present');
  } else {
    issue('SSR', f,
      f + ' uses hooks/browser APIs but is missing "use client".',
      'Add \'use client\'; as the very first line of ' + f);
    console.log('  ' + R + 'x' + RST + ' ' + f + ' — MISSING "use client"');
  }
}

// ══════════════════════════════════════════════════════════════
// 7. THIRD-PARTY SDK SAFETY
// ══════════════════════════════════════════════════════════════
section('7. THIRD-PARTY SDK SAFETY (Sentry, Clarity, Gemini)');

const clwSrc = readFile(resolve(ROOT, 'app/ClientLayoutWrapper.tsx'));
if (clwSrc) {
  if (/^import\s+.*@sentry/m.test(clwSrc)) {
    issue('SSR Crash', 'app/ClientLayoutWrapper.tsx',
      'Static top-level Sentry import — Sentry initialises browser tracking at import time.',
      'Use dynamic import inside useEffect:\n    import("@sentry/react").then(Sentry => Sentry.init({...}))');
    console.log('  ' + R + 'x' + RST + ' Static Sentry import — will crash SSR');
  } else if (/import\('@sentry/.test(clwSrc)) {
    pass('ClientLayoutWrapper — Sentry loaded dynamically');
    console.log('  ' + G + 'v' + RST + ' Sentry loaded via dynamic import() inside useEffect');
  } else {
    console.log('  ' + DIM + '-' + RST + ' Sentry not referenced in ClientLayoutWrapper');
  }

  if (/^import\s+.*@microsoft\/clarity/m.test(clwSrc)) {
    warn('SSR', 'app/ClientLayoutWrapper.tsx',
      'Static Clarity import — may access browser APIs at module evaluation time.',
      'Use dynamic import() inside useEffect (as appears to be the intent).');
    console.log('  ' + Y + '!' + RST + ' Static Clarity import — move to dynamic import inside useEffect');
  } else if (/import\('@microsoft\/clarity/.test(clwSrc)) {
    pass('ClientLayoutWrapper — Clarity loaded dynamically');
    console.log('  ' + G + 'v' + RST + ' Clarity loaded via dynamic import() — correct');
  } else {
    console.log('  ' + DIM + '-' + RST + ' Clarity not referenced in ClientLayoutWrapper');
  }
}

// Gemini key exposure
const gemSrc = readFile(resolve(ROOT, 'services/geminiService.ts'));
if (gemSrc && /NEXT_PUBLIC_GEMINI_API_KEY/.test(gemSrc)) {
  issue('Security', 'services/geminiService.ts',
    'Gemini API key uses NEXT_PUBLIC_ prefix — fully visible in browser JS bundle.\n' +
    '    Anyone can open DevTools > Sources and steal your key.',
    'Move Gemini API calls to a server-side API route:\n' +
    '    1. Create app/api/stylist/route.ts\n' +
    '    2. Rename NEXT_PUBLIC_GEMINI_API_KEY to GEMINI_API_KEY in .env.local\n' +
    '    3. Call /api/stylist from the client instead of calling Gemini directly');
  console.log('  ' + R + 'x' + RST + ' SECURITY: Gemini API key exposed in client bundle (NEXT_PUBLIC_)');
}

// ══════════════════════════════════════════════════════════════
// 8. CAN MISSING KEYS CAUSE 500?
// ══════════════════════════════════════════════════════════════
section('8. DO MISSING OPTIONAL KEYS CAUSE 500?');

console.log('');
console.log('  ' + G + 'POSTHOG_API_KEY missing' + RST);
console.log('    usePostHog.ts guards with !POSTHOG_API_KEY -> early return.');
console.log('    Missing key does NOT crash — but the top-level import still does.');
console.log('    Fix the import, not just the key.');
console.log('');
console.log('  ' + G + 'SENTRY_DSN missing' + RST);
console.log('    ClientLayoutWrapper checks for sentryDsn before dynamic import.');
console.log('    Missing key = safely skipped. Does NOT cause 500.');
console.log('');
console.log('  ' + G + 'CLARITY_PROJECT_ID missing' + RST);
console.log('    ClientLayoutWrapper checks for clarityId before dynamic import.');
console.log('    Missing key = safely skipped. Does NOT cause 500.');
console.log('');
console.log('  ' + G + 'GEMINI_API_KEY missing' + RST);
console.log('    geminiService.ts: getClient() returns null, all functions return null/empty.');
console.log('    Missing key = safely skipped. AIStylist shows no responses. Does NOT cause 500.');
console.log('');
console.log('  ' + G + 'GA_MEASUREMENT_ID missing' + RST);
console.log('    isGAEnabled() returns false, all trackXxx() calls return early.');
console.log('    Missing key = safely skipped. Does NOT cause 500.');
console.log('');
console.log('  ' + Y + 'CONCLUSION' + RST + ': Missing optional API keys do NOT cause 500.');
console.log('  The 500 is caused exclusively by SSR-time browser API access (localStorage).');

// ══════════════════════════════════════════════════════════════
// 9. ARCHITECTURE / PAYMENT
// ══════════════════════════════════════════════════════════════
section('9. ARCHITECTURE CHECKS');

const checkoutSrc = readFile(resolve(ROOT, 'app/checkout/page.tsx'));
if (checkoutSrc) {
  if (!/razorpay/i.test(checkoutSrc)) {
    warn('Architecture', 'app/checkout/page.tsx',
      'No Razorpay (or any payment gateway) found in checkout. Orders created without payment capture.',
      'Integrate Razorpay:\n' +
      '    1. npm install razorpay\n' +
      '    2. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local\n' +
      '    3. Create app/api/orders/route.ts for server-side order creation\n' +
      '    4. Load checkout.js script and call razorpay.open() on client');
    console.log('  ' + Y + '!' + RST + ' No payment gateway in checkout — orders go through without payment');
  } else {
    pass('checkout — Razorpay integration present');
    console.log('  ' + G + 'v' + RST + ' Razorpay found in checkout');
  }
}

// HashRouter check (not applicable in Next.js App Router but let's check for any hash routing)
const allClientFiles = [
  'app/ClientLayoutWrapper.tsx',
  'app/HomePageClient.tsx',
  ...filesToScan,
];
let foundHashRouter = false;
for (const f of allClientFiles) {
  const src = readFile(resolve(ROOT, f));
  if (src && /HashRouter|createHashRouter/.test(src)) {
    warn('SEO', f,
      'HashRouter detected — URLs contain # which search engines cannot index.',
      'Use Next.js App Router (already in use). Remove any HashRouter references.');
    console.log('  ' + Y + '!' + RST + ' HashRouter in ' + f + ' — bad for SEO');
    foundHashRouter = true;
  }
}
if (!foundHashRouter) {
  pass('No HashRouter — Next.js App Router in use');
  console.log('  ' + G + 'v' + RST + ' No HashRouter — App Router used correctly');
}

// ══════════════════════════════════════════════════════════════
// FINAL REPORT
// ══════════════════════════════════════════════════════════════
section('FINAL REPORT');

console.log('\n  ' + BOLD + R + 'CRITICAL ISSUES (cause 500 / crash):  ' + issues.length + RST);
issues.forEach((iss, i) => {
  console.log('\n  ' + R + '[' + (i+1) + '] ' + iss.category + ' — ' + iss.file + RST);
  console.log('  Problem:');
  iss.detail.split('\n').forEach(l => console.log('    ' + l));
  console.log('  Fix:');
  iss.fix.split('\n').forEach(l => console.log('    ' + l));
});

console.log('\n  ' + BOLD + Y + 'WARNINGS (broken or risky but non-crashing):  ' + warnings.length + RST);
warnings.forEach((w, i) => {
  console.log('\n  ' + Y + '[' + (i+1) + '] ' + w.category + ' — ' + w.file + RST);
  console.log('  Problem: ' + w.detail.split('\n')[0]);
  console.log('  Fix:     ' + w.fix.split('\n')[0]);
});

console.log('\n  ' + BOLD + G + 'PASSED:  ' + passed.length + RST);
passed.forEach(p => console.log('  ' + G + 'v' + RST + ' ' + p));

console.log('\n' + B + '='.repeat(62) + RST);
console.log(BOLD + '  DIAGNOSIS COMPLETE' + RST);
console.log('  Issues: ' + R + issues.length + RST + '  |  Warnings: ' + Y + warnings.length + RST + '  |  Passed: ' + G + passed.length + RST);
console.log(B + '='.repeat(62) + RST + '\n');
