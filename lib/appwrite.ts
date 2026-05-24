// Must be imported BEFORE appwrite — shims location/localStorage for SSR/SSG
import './ssr-shims';
import { Client, Account, Databases, Storage, OAuthProvider, ID, Query, Models } from 'appwrite';


export { ID, Query };

function createClient() {
  return new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '69a8205200252be60e2c');
}

// Lazy factory pattern - SDK instances created ONLY when accessed, and ONLY in browser
let _client: Client | null = null;
let _account: Account | null = null;
let _databases: Databases | null = null;
let _storage: Storage | null = null;

export const getClient = (): Client | null => {
  if (typeof window === 'undefined') return null;
  if (!_client) {
    _client = createClient();
  }
  return _client;
};

export const getAccount = (): Account | null => {
  if (typeof window === 'undefined') return null;
  const c = getClient();
  if (!_account && c) {
    _account = new Account(c);
  }
  return _account;
};

export const getDatabases = (): Databases | null => {
  if (typeof window === 'undefined') return null;
  const c = getClient();
  if (!_databases && c) {
    _databases = new Databases(c);
  }
  return _databases;
};

export const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') return null;
  const c = getClient();
  if (!_storage && c) {
    _storage = new Storage(c);
  }
  return _storage;
};

// Legacy exports — proxy to lazy getters so consumer code like `databases.listDocuments(...)` works
// On the server these return a no-op proxy that silently returns empty data instead of crashing.
function createSafeProxy<T>(getter: () => T | null, label: string): T {
  if (typeof Proxy === 'undefined') return null as unknown as T;
  return new Proxy({} as any, {
    get(_target, prop) {
      const real = getter();
      if (real) return (real as any)[prop];
      // Server-side or not initialized: return a no-op function that resolves safely
      return (..._args: any[]) => {
        console.warn(`[Appwrite] ${label}.${String(prop)} called on server — skipped.`);
        return Promise.resolve({ documents: [], total: 0 });
      };
    },
  });
}

export const client = createSafeProxy(getClient, 'client');
export const account = createSafeProxy(getAccount, 'account');
export const databases = createSafeProxy(getDatabases, 'databases');
export const storage = createSafeProxy(getStorage, 'storage');

export const APPWRITE_CONFIG = {
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '69a8205200252be60e2c',
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'silvoraa_production',
    productsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID || 'products',
    ordersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID || 'orders',
    usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || 'profiles',
    reviewsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID || 'reviews',
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || 'images',
    wishlistCollectionId: process.env.NEXT_PUBLIC_APPWRITE_WISHLIST_COLLECTION_ID || 'wishlist',
};

// Auth Helpers
const getOrigin = (): string => {
    if (typeof window === 'undefined') return 'http://localhost:3000';
    return window.location.origin;
};

export const signInWithGoogle = async () => {
    const acc = getAccount();
    if (!acc) return;
    try {
        const origin = getOrigin();
        await acc.createOAuth2Session(
            OAuthProvider.Google,
            origin + '/auth',
            origin + '/auth'
        );
    } catch (error) {
        console.error('Google sign in error:', error);
        throw error;
    }
};

export const signInWithEmail = async (email: string, password: string) => {
    const acc = getAccount();
    if (!acc) return { user: null, session: null, error: 'Server not configured' };
    try {
        const session = await acc.createEmailPasswordSession(email, password);
        const user = await acc.get();
        return { user, session, error: null };
    } catch (error: any) {
        return { user: null, session: null, error: error.message };
    }
};

export const signUpWithEmail = async (email: string, password: string, name: string) => {
    const acc = getAccount();
    if (!acc) return { user: null, session: null, error: 'Server not configured' };
    try {
        await acc.create('unique()', email, password, name);
        return await signInWithEmail(email, password);
    } catch (error: any) {
        return { user: null, session: null, error: error.message };
    }
};

export const appwriteSignOut = async () => {
    const acc = getAccount();
    if (!acc) return;
    try {
        await acc.deleteSession('current');
    } catch (error) {
        console.error('Sign out error:', error);
    }
};

export const getCurrentUser = async () => {
    const acc = getAccount();
    if (!acc) return { user: null, error: 'Server not configured' };
    try {
        const user = await acc.get();
        return { user, error: null };
    } catch (error: any) {
        return { user: null, error: error.message };
    }
};

export const getSession = async () => {
    const acc = getAccount();
    if (!acc) return { session: null, error: 'Server not configured' };
    try {
        const session = await acc.getSession('current');
        return { session, error: null };
    } catch (error: any) {
        return { session: null, error: error.message };
    }
};

export const isAppwriteConfigured = true;
export const isSupabaseConfigured = true;

class SupabaseQueryBuilder implements PromiseLike<{ data: any; error: any }> {
    collection: string;
    queries: string[] = [];
    action: 'select' | 'insert' | 'update' | 'delete' | 'upsert' = 'select';
    payload: any = null;
    limitCount: number = 1000;

    constructor(collection: string) {
        this.collection = collection;
    }

    select(query?: string) {
        this.action = 'select';
        return this;
    }

    insert(data: any) {
        this.action = 'insert';
        this.payload = data;
        return this;
    }

    update(data: any) {
        this.action = 'update';
        this.payload = data;
        return this;
    }

    delete() {
        this.action = 'delete';
        return this;
    }

    upsert(data: any) {
        this.action = 'upsert';
        this.payload = data;
        return this;
    }

    eq(key: string, value: any) {
        const searchKey = key === 'id' ? '$id' : key;
        this.queries.push(Query.equal(searchKey, value));
        return this;
    }

    neq(key: string, value: any) {
        const searchKey = key === 'id' ? '$id' : key;
        this.queries.push(Query.notEqual(searchKey, value));
        return this;
    }

    in(key: string, values: any[]) {
        const searchKey = key === 'id' ? '$id' : key;
        this.queries.push(Query.equal(searchKey, values));
        return this;
    }

    gte(key: string, value: any) {
        const searchKey = key === 'id' ? '$id' : key;
        this.queries.push(Query.greaterThanEqual(searchKey, value));
        return this;
    }
    
    lte(key: string, value: any) {
        const searchKey = key === 'id' ? '$id' : key;
        this.queries.push(Query.lessThanEqual(searchKey, value));
        return this;
    }

    or(filterString: string) {
        throw new Error('OR queries not supported - using local data');
    }

    order(key: string, options?: { ascending?: boolean }) {
        if (options?.ascending === false) {
            this.queries.push(Query.orderDesc(key));
        } else {
            this.queries.push(Query.orderAsc(key));
        }
        return this;
    }

    limit(count: number) {
        this.limitCount = count;
        return this;
    }

    async single() {
        this.limitCount = 1;
        const res = await this.execute();
        return { data: res.data && res.data.length > 0 ? res.data[0] : null, error: res.error };
    }

    then<TResult1 = { data: any; error: any }, TResult2 = never>(
        onfulfilled?: ((value: { data: any; error: any }) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): PromiseLike<TResult1 | TResult2> {
        return this.execute().then(onfulfilled, onrejected);
    }

    private cleanData(item: any) {
        const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, id, ...cleanData } = item;
        return cleanData;
    }

    async execute(): Promise<{ data: any; error: any }> {
        const db = getDatabases();
        if (!db) {
            return { data: null, error: 'Server not configured' };
        }
        try {
            const finalQueries = [...this.queries, Query.limit(this.limitCount)];

            if (this.action === 'select') {
                const res = await db.listDocuments(APPWRITE_CONFIG.databaseId, this.collection, finalQueries);
                return { data: res.documents.map(d => ({ ...d, id: d.$id })), error: null };
            }

            if (this.action === 'insert') {
                const dataArray = Array.isArray(this.payload) ? this.payload : [this.payload];
                const results: any[] = [];
                for (const item of dataArray) {
                    const res = await db.createDocument(APPWRITE_CONFIG.databaseId, this.collection, ID.unique(), this.cleanData(item));
                    results.push({ ...res, id: res.$id });
                }
                return { data: Array.isArray(this.payload) ? results : results[0], error: null };
            }

            if (this.action === 'update') {
                const docs = await db.listDocuments(APPWRITE_CONFIG.databaseId, this.collection, finalQueries);
                const results: any[] = [];
                for (const doc of docs.documents) {
                    const res = await db.updateDocument(APPWRITE_CONFIG.databaseId, this.collection, doc.$id, this.cleanData(this.payload));
                    results.push({ ...res, id: res.$id });
                }
                return { data: results.length === 1 ? results[0] : results, error: null };
            }

            if (this.action === 'delete') {
                const docs = await db.listDocuments(APPWRITE_CONFIG.databaseId, this.collection, finalQueries);
                for (const doc of docs.documents) {
                    await db.deleteDocument(APPWRITE_CONFIG.databaseId, this.collection, doc.$id);
                }
                return { data: null, error: null };
            }

            if (this.action === 'upsert') {
                const dataArray = Array.isArray(this.payload) ? this.payload : [this.payload];
                const results: any[] = [];
                for (const item of dataArray) {
                    const itemId = item.$id || item.id;
                    let existingDoc: any = null;

                    if (itemId) {
                        try {
                            existingDoc = await db.getDocument(APPWRITE_CONFIG.databaseId, this.collection, itemId);
                        } catch (e) { }
                    } else if (this.collection === 'site_config' && item.key) {
                        const existing = await db.listDocuments(APPWRITE_CONFIG.databaseId, this.collection, [Query.equal('key', item.key)]);
                        existingDoc = existing.documents[0];
                    }

                    if (existingDoc) {
                        const res = await db.updateDocument(APPWRITE_CONFIG.databaseId, this.collection, existingDoc.$id, this.cleanData(item));
                        results.push({ ...res, id: res.$id });
                    } else {
                        const res = await db.createDocument(APPWRITE_CONFIG.databaseId, this.collection, itemId || ID.unique(), this.cleanData(item));
                        results.push({ ...res, id: res.$id });
                    }
                }
                return { data: Array.isArray(this.payload) ? results : results[0], error: null };
            }

            return { data: null, error: 'Unknown action' };
        } catch (error: any) {
            console.error(`Error executing ${this.action} on ${this.collection}:`, error);
            return { data: null, error: error.message };
        }
    }
}

export const supabase = {
    auth: {
        getSession: getSession,
        getUser: getCurrentUser,
        signInWithPassword: ({ email, password }: any) => signInWithEmail(email, password),
        signUp: ({ email, password, options }: any) => signUpWithEmail(email, password, options?.data?.full_name || ''),
        signInWithOAuth: ({ provider }: any) => { if (provider === 'google') return signInWithGoogle(); },
        signOut: appwriteSignOut,
        onAuthStateChange: (callback: any) => {
            const acc = getAccount();
            if (!acc) {
                callback('SIGNED_OUT', null);
                return { data: { subscription: { unsubscribe: () => {} } } };
            }
            acc.getSession('current').then(({ session }: any) => {
                if (session) callback('SIGNED_IN', { user: session });
                else callback('SIGNED_OUT', null);
            }).catch(() => callback('SIGNED_OUT', null));
            return { data: { subscription: { unsubscribe: () => {} } } };
        }
    },
    from: (collection: string) => {
        return new SupabaseQueryBuilder(collection);
    },
    rpc: async (name: string, params: any) => {
        console.warn(`RPC ${name} called but not natively supported in Appwrite shim. Mapping to empty success.`);
        return { data: null, error: null };
    },
    storage: {
        from: (bucket: string) => ({
            list: async (path: string = '', options: any = {}) => {
                const st = getStorage();
                if (!st) return { data: [], error: 'Server not configured' };
                const res = await st.listFiles(bucket);
                return { 
                    data: res.files.map(f => ({ ...f, name: f.name, id: f.$id, created_at: f.$createdAt })), 
                    error: null 
                };
            },
            getPublicUrl: (path: string) => {
                const st = getStorage();
                if (!st) return { data: { publicUrl: '' } };
                return { data: { publicUrl: st.getFileView(bucket, path).toString() } };
            },
            upload: async (path: string, file: any, options: any = {}) => {
                const st = getStorage();
                if (!st) return { data: null, error: 'Server not configured' };
                const res = await st.createFile(bucket, ID.unique(), file);
                return { data: res, error: null };
            },
            remove: async (paths: string[]) => {
                const st = getStorage();
                if (!st) return { error: 'Server not configured' };
                await Promise.all(paths.map(p => st.deleteFile(bucket, p)));
                return { error: null };
            }
        })
    }
};
