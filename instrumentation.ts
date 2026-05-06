/**
 * Next.js Instrumentation file — runs once on server startup, before any route
 * is rendered. We use it to shim browser-only globals (localStorage, location)
 * that the Appwrite Web SDK accesses at module-import time in Node.js.
 */
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // ── localStorage shim ──────────────────────────────────────────────────
        // Node 22+ has a built-in localStorage that doesn't match the browser API
        if (
            typeof (globalThis as any).localStorage === 'undefined' ||
            typeof (globalThis as any).localStorage?.getItem !== 'function'
        ) {
            const _store: Record<string, string> = {};
            (globalThis as any).localStorage = {
                getItem:    (k: string) => _store[k] ?? null,
                setItem:    (k: string, v: string) => { _store[k] = String(v); },
                removeItem: (k: string) => { delete _store[k]; },
                clear:      () => { Object.keys(_store).forEach(k => delete _store[k]); },
                get length() { return Object.keys(_store).length; },
                key:        (i: number) => Object.keys(_store)[i] ?? null,
            };
        }

        // ── location shim ──────────────────────────────────────────────────────
        if (typeof (globalThis as any).location === 'undefined') {
            (globalThis as any).location = {
                href: 'http://localhost:3000',
                origin: 'http://localhost:3000',
                pathname: '/',
                search: '',
                hash: '',
                hostname: 'localhost',
                port: '3000',
                protocol: 'http:',
                host: 'localhost:3000',
                assign:  () => {},
                replace: () => {},
                reload:  () => {},
            };
        }
    }
}
