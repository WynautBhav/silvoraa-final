'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/appwrite';
import { useAuth } from '@/components/Auth/AuthContext';
import { CartItem, Product, Coupon } from '@/types';
import { trackAddToCart, trackRemoveFromCart, GAItem, captureCartAdd, captureCartRemove, captureCartAdd as trackCartAdd, captureCartRemove as trackCartRemove } from '@/hooks/useAnalytics';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discountAmount: number;
  cartTotal: number;
  itemCount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // Check if user is logged in

  const [items, setItems] = useState<CartItem[]>([]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = window?.localStorage?.getItem('silvoraa_cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = window?.localStorage?.getItem('silvoraa_coupon');
      if (saved) setAppliedCoupon(JSON.parse(saved));
    } catch {}
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false); // Valid flag for preventing optimistic conflicts

  // --- SYNC ENGINE ---
  useEffect(() => {
    // Save to LocalStorage (Always, as backup/cache)
    window?.localStorage?.setItem('silvoraa_cart', JSON.stringify(items));
    if (appliedCoupon) {
      window?.localStorage?.setItem('silvoraa_coupon', JSON.stringify(appliedCoupon));
    } else {
      window?.localStorage?.removeItem('silvoraa_coupon');
    }
  }, [items, appliedCoupon]);

  // LOGIN SYNC: When user logs in, merge local cart to server & fetch fresh
  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const syncUserCart = async () => {
      setIsSyncing(true);
      try {
        const localItems = JSON.parse(window?.localStorage?.getItem('silvoraa_cart') || '[]');

        if (localItems.length > 0) {
          // Prepare simple payload for sync_cart RPC
          const payload = localItems.map((i: CartItem) => ({
            product_id: i.product.id,
            quantity: i.quantity
          }));

          const { error } = await supabase.rpc('sync_cart', { items: payload });

          if (error) {
            console.error('Failed to sync local items to server:', error);
            // Don't throw, just log. We still want to fetch server cart.
          }
        } else {
          // Create empty cart if needed
          await supabase.rpc('sync_cart', { items: [] });
        }

        // 2. Fetch Fresh Server Cart
        if (isMounted) {
          await fetchServerCart();
        }

      } catch (err) {
        console.error('Cart sync process failed:', err);
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    };

    syncUserCart();

    return () => { isMounted = false; };
  }, [user?.id]); // Only run on user change

  const fetchServerCart = async () => {
    try {
      // Get Cart ID
      const { data: cart } = await supabase.from('carts').select('id').eq('user_id', user!.id).single();
      if (!cart) return;

      // Get Items
      const { data: serverItems } = await supabase
        .from('cart_items')
        .select('*, product:products(*)') // Join products
        .eq('cart_id', cart.id);

      if (serverItems) {
        // Map DB items to frontend CartItem structures
        const mapped: CartItem[] = serverItems.map((row: any) => ({
          product: {
            ...row.product,
            // Fix image paths if needed
            image: row.product.image?.replace(/(\.jpg|\.jpeg|\.png)/gi, '.webp'),
            images: (row.product.images || []).map((img: string) => img.replace(/(\.jpg|\.jpeg|\.png)/gi, '.webp')),
          },
          quantity: row.quantity
        }));
        setItems(mapped);
      }
    } catch (e) {
      console.error("Error fetching cart", e);
    }
  };

  // --- ACTIONS (Optimistic + DB) ---

  const toggleCart = () => setIsOpen(prev => !prev);

  const clearCart = async () => {
    setItems([]);
    setAppliedCoupon(null);
    window?.localStorage?.removeItem('silvoraa_cart');

    if (user) {
      // Delete from DB
      const { data: cart } = await supabase.from('carts').select('id').eq('user_id', user.id).single();
      if (cart) {
        await supabase.from('cart_items').delete().eq('cart_id', cart.id);
      }
    }
  };

  const addToCart = async (product: Product, quantity = 1) => {
    const gaItem: GAItem = {
      item_id: product.id,
      item_name: product.title,
      price: product.price,
      item_category: product.type,
      quantity,
    };
    trackAddToCart(gaItem, quantity);

    const newSubtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) + (product.price * quantity);
    captureCartAdd(product.id, product.title, product.price, quantity, newSubtotal);

    // 1. Optimistic Update
    const newItems = [...items];
    const existingIdx = newItems.findIndex(i => i.product.id === product.id);

    if (existingIdx > -1) {
      newItems[existingIdx].quantity += quantity;
    } else {
      newItems.push({ product, quantity });
    }

    setItems(newItems);
    setIsOpen(true);

    // 2. DB Update (if logged in)
    if (user) {
      try {
        // Need Cart ID
        // Note: In a real app, I'd cache CartID in a ref or state to avoid querying 'carts' every time.
        // Assuming sync_cart created it.
        const { data: cart } = await supabase.from('carts').select('id').eq('user_id', user.id).single();
        if (cart) {
          if (existingIdx > -1) {
            // Update
            await supabase.from('cart_items')
              .update({ quantity: newItems[existingIdx].quantity })
              .eq('cart_id', cart.id)
              .eq('product_id', product.id);
          } else {
            // Insert
            await supabase.from('cart_items').insert({
              cart_id: cart.id,
              product_id: product.id,
              quantity: quantity
            });
          }
        } else {
          // Edge case: Cart didn't exist? RPC sync_cart usually ensures it.
          // Fallback verify?
          await supabase.rpc('sync_cart', { items: [{ product_id: product.id, quantity }] });
        }
      } catch (e) {
        console.error("Add to cart sync error", e);
        // Rollback? Complicated for now. User will just desync.
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    const removedItem = items.find(i => i.product.id === productId);
    if (removedItem) {
      const newSubtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) - (removedItem.product.price * removedItem.quantity);
      captureCartRemove(productId, removedItem.product.title, removedItem.product.price, newSubtotal);
      trackRemoveFromCart({
        item_id: removedItem.product.id,
        item_name: removedItem.product.title,
        price: removedItem.product.price,
        item_category: removedItem.product.type,
      });
    }

    // 1. Optimistic
    setItems(prev => prev.filter(item => item.product.id !== productId));

    // 2. DB Update
    if (user) {
      const { data: cart } = await supabase.from('carts').select('id').eq('user_id', user.id).single();
      if (cart) {
        await supabase.from('cart_items')
          .delete()
          .eq('cart_id', cart.id)
          .eq('product_id', productId);
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    // 1. Optimistic
    setItems(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));

    // 2. DB Update
    if (user) {
      const { data: cart } = await supabase.from('carts').select('id').eq('user_id', user.id).single();
      if (cart) {
        await supabase.from('cart_items')
          .update({ quantity })
          .eq('cart_id', cart.id)
          .eq('product_id', productId);
      }
    }
  };

  const applyCoupon = async (code: string): Promise<boolean> => {
    try {
      const cleanCode = code.toUpperCase().trim();
      const { data, error } = await supabase
        .from('coupons' as any)
        .select('*')
        .eq('code', cleanCode)
        .eq('is_active', true)
        .single();

      if (error || !data) throw new Error('Invalid coupon');

      const coupon = data as unknown as Coupon;

      if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) throw new Error('Expired');
      if (coupon.max_uses && coupon.used_count >= coupon.max_uses) throw new Error('Usage limit reached');
      if (subtotal < coupon.min_order_amount) throw new Error(`Min order ₹${coupon.min_order_amount}`);

      setAppliedCoupon(coupon as any);
      return true;
    } catch (error) {
      console.error(error);
      setAppliedCoupon(null);
      return false;
    }
  };

  const removeCoupon = () => setAppliedCoupon(null);

  // --- CALCULATIONS ---
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = appliedCoupon.discount_type === 'percentage'
      ? (subtotal * appliedCoupon.value) / 100
      : appliedCoupon.value;
  }
  discountAmount = Math.min(discountAmount, subtotal);
  const cartTotal = subtotal - discountAmount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (appliedCoupon && subtotal < appliedCoupon.min_order_amount) {
      setAppliedCoupon(null);
    }
  }, [subtotal, appliedCoupon]);

  return (
    <CartContext.Provider value={{
      items, isOpen, toggleCart, addToCart, removeFromCart, updateQuantity, clearCart,
      subtotal, discountAmount, cartTotal, itemCount,
      appliedCoupon, applyCoupon, removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
