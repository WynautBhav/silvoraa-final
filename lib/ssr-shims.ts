/**
 * Browser-global shims for SSR/SSG environments.
 * The Appwrite Web SDK accesses `location` and `localStorage` at
 * module-evaluation time. In Node/Edge/SSG workers these don't exist,
 * causing a `ReferenceError` that crashes the entire render and results
 * in a 500.  Importing this file FIRST ensures the shims are in place
 * before any SDK code runs.
 *
 * This file must have NO other imports to guarantee it evaluates before
 * everything else in the dependency chain.
 */

if (typeof globalThis.location === 'undefined') {
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
    assign: () => {},
    replace: () => {},
    reload: () => {},
    toString: () => 'http://localhost:3000',
  };
}

// Node 22+ ships a built-in `localStorage` that does NOT match the browser
// Web Storage API (no getItem/setItem methods). Always override if the API
// doesn't look right.
if (
  typeof globalThis.localStorage === 'undefined' ||
  typeof globalThis.localStorage?.getItem !== 'function'
) {
  const _store: Record<string, string> = {};
  (globalThis as any).localStorage = {
    getItem: (k: string) => _store[k] ?? null,
    setItem: (k: string, v: string) => { _store[k] = String(v); },
    removeItem: (k: string) => { delete _store[k]; },
    clear: () => { Object.keys(_store).forEach(k => delete _store[k]); },
    get length() { return Object.keys(_store).length; },
    key: (i: number) => Object.keys(_store)[i] ?? null,
  };
}

if (typeof globalThis.navigator === 'undefined') {
  (globalThis as any).navigator = {
    userAgent: 'node',
    language: 'en',
    languages: ['en'],
  };
}

export {};
