import { capturePageView, identifyUser, captureProductViewed, captureCartUpdated, captureCheckoutStarted, captureOrderCompleted } from './usePostHog';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export interface GAEvent {
  event_name: string;
  event_params: Record<string, any>;
}

export interface GAItem {
  item_id: string;
  item_name: string;
  price: number;
  item_category?: string;
  quantity?: number;
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const isGAEnabled = () => {
  return !!GA_MEASUREMENT_ID && typeof window !== 'undefined' && typeof window.gtag === 'function';
};

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('[GA4] Measurement ID not configured. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env');
    return;
  }
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  });
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (!isGAEnabled()) return;
  
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });

  capturePageView(pagePath, pageTitle);
};

export const trackViewItem = (item: GAItem) => {
  if (!isGAEnabled()) return;

  window.gtag('event', 'view_item', {
    currency: 'INR',
    value: item.price,
    items: [{
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      item_category: item.item_category || '',
    }],
  });

  captureProductViewed(item.item_id, item.item_name, item.price, item.item_category);
};

export const trackAddToCart = (item: GAItem, quantity: number = 1) => {
  if (!isGAEnabled()) return;

  window.gtag('event', 'add_to_cart', {
    currency: 'INR',
    value: item.price * quantity,
    items: [{
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      item_category: item.item_category || '',
      quantity,
    }],
  });
};

export const captureCartAdd = (
  productId: string,
  productName: string,
  price: number,
  quantity: number,
  cartTotal: number
) => {
  captureCartUpdated('add', productId, productName, price, quantity, cartTotal);
};

export const trackRemoveFromCart = (item: GAItem) => {
  if (!isGAEnabled()) return;

  window.gtag('event', 'remove_from_cart', {
    currency: 'INR',
    value: item.price,
    items: [{
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      item_category: item.item_category || '',
    }],
  });
};

export const captureCartRemove = (
  productId: string,
  productName: string,
  price: number,
  cartTotal: number
) => {
  captureCartUpdated('remove', productId, productName, price, 1, cartTotal);
};

export const trackBeginCheckout = (value: number, items: GAItem[]) => {
  if (!isGAEnabled()) return;

  window.gtag('event', 'begin_checkout', {
    currency: 'INR',
    value,
    items: items.map(item => ({
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      item_category: item.item_category || '',
      quantity: item.quantity || 1,
    })),
  });

  const products = items.map(item => ({
    id: item.item_id,
    name: item.item_name,
    price: item.price,
    quantity: item.quantity || 1,
  }));
  captureCheckoutStarted(value, items.length, products);
};

export const trackPurchase = (
  transactionId: string,
  value: number,
  items: GAItem[]
) => {
  if (!isGAEnabled()) return;

  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    currency: 'INR',
    value,
    items: items.map(item => ({
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      item_category: item.item_category || '',
      quantity: item.quantity || 1,
    })),
  });

  const products = items.map(item => ({
    id: item.item_id,
    name: item.item_name,
    price: item.price,
    quantity: item.quantity || 1,
  }));
  captureOrderCompleted(transactionId, value, products);
};

export const trackSearch = (searchTerm: string) => {
  if (!isGAEnabled()) return;

  window.gtag('event', 'search', {
    search_term: searchTerm,
  });
};

export const trackLogin = (method: string) => {
  if (!isGAEnabled()) return;

  window.gtag('event', 'login', {
    method,
  });
};

export const captureIdentify = (userId: string, email?: string, name?: string) => {
  identifyUser(userId, email, name);
};
