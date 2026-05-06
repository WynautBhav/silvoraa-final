const isBrowser = typeof window !== 'undefined';
const posthog = isBrowser ? require('posthog-js').default : null;

const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;

export const isPostHogEnabled = () => {
  return !!POSTHOG_API_KEY;
};

export const initPostHog = () => {
  if (!POSTHOG_API_KEY) {
    console.warn('[PostHog] API key not configured. Add NEXT_PUBLIC_POSTHOG_API_KEY to .env');
    return;
  }
  if (typeof window === 'undefined' || !posthog) return;

  posthog.init(POSTHOG_API_KEY, {
    api_host: 'https://app.posthog.com',
    autocapture: false,
  });
};

export const capturePageView = (path: string, title: string) => {
  if (!POSTHOG_API_KEY) return;
  posthog.capture('$pageview', { $page_path: path, $page_title: title });
};

export const identifyUser = (userId: string, email?: string, name?: string) => {
  if (!POSTHOG_API_KEY) return;
  posthog.identify(userId, { email, name });
};

export const captureProductViewed = (
  productId: string,
  productName: string,
  price: number,
  category?: string
) => {
  if (!POSTHOG_API_KEY) return;
  posthog.capture('product_viewed', {
    product_id: productId,
    product_name: productName,
    price,
    category,
  });
};

export const captureCartUpdated = (
  action: 'add' | 'remove',
  productId: string,
  productName: string,
  price: number,
  quantity: number,
  cartTotal: number
) => {
  if (!POSTHOG_API_KEY) return;
  posthog.capture('cart_updated', {
    action,
    product_id: productId,
    product_name: productName,
    price,
    quantity,
    cart_total: cartTotal,
  });
};

export const captureCheckoutStarted = (
  cartTotal: number,
  itemCount: number,
  products: Array<{ id: string; name: string; price: number; quantity: number }>
) => {
  if (!POSTHOG_API_KEY) return;
  posthog.capture('checkout_started', {
    cart_total: cartTotal,
    item_count: itemCount,
    products,
  });
};

export const captureOrderCompleted = (
  orderId: string,
  cartTotal: number,
  products: Array<{ id: string; name: string; price: number; quantity: number }>
) => {
  if (!POSTHOG_API_KEY) return;
  posthog.capture('order_completed', {
    order_id: orderId,
    cart_total: cartTotal,
    products,
  });
};
