'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/lib/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

interface CartContextType {
  items: CartItem[];
  wishlist: Product[];
  recentlyViewed: Product[];
  compareList: Product[];
  coupon: Coupon | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addToRecentlyViewed: (product: Product) => void;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartTotal: number;
  cartCount: number;
  discountAmount: number;
  finalTotal: number;
}

const VALID_COUPONS: Record<string, Coupon> = {
  NEXUS10: { code: 'NEXUS10', discount: 10, type: 'percentage' },
  WELCOME15: { code: 'WELCOME15', discount: 15, type: 'percentage' },
  SAVE25: { code: 'SAVE25', discount: 25, type: 'fixed' },
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedCart = localStorage.getItem('nexus-cart');
      if (savedCart) setItems(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem('nexus-wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedRecent = localStorage.getItem('nexus-recent');
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('nexus-cart', JSON.stringify(items));
  }, [items, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem('nexus-wishlist', JSON.stringify(wishlist));
  }, [wishlist, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem('nexus-recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed, mounted]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((p) => p.id === productId),
    [wishlist]
  );

  const addToRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  const toggleCompare = useCallback((product: Product) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  }, []);

  const isInCompare = useCallback(
    (productId: string) => compareList.some((p) => p.id === productId),
    [compareList]
  );

  const applyCoupon = useCallback((code: string) => {
    const upper = code.toUpperCase();
    if (VALID_COUPONS[upper]) {
      setCoupon(VALID_COUPONS[upper]);
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const cartTotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const discountAmount = coupon
    ? coupon.type === 'percentage'
      ? (cartTotal * coupon.discount) / 100
      : Math.min(coupon.discount, cartTotal)
    : 0;
  const finalTotal = cartTotal - discountAmount;

  return (
    <CartContext.Provider
      value={{
        items,
        wishlist,
        recentlyViewed,
        compareList,
        coupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToRecentlyViewed,
        toggleCompare,
        isInCompare,
        applyCoupon,
        removeCoupon,
        cartTotal,
        cartCount,
        discountAmount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
