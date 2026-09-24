import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Product } from '../data/products';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const addToCart = (product: Product) =>
      setItems(prev => {
        const existing = prev.find(i => i.product.id === product.id);
        if (existing) {
          return prev.map(i =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        }
        return [...prev, { product, quantity: 1 }];
      });

    const removeFromCart = (productId: string) =>
      setItems(prev => prev.filter(i => i.product.id !== productId));

    const updateQuantity = (productId: string, quantity: number) =>
      setItems(prev =>
        quantity <= 0
          ? prev.filter(i => i.product.id !== productId)
          : prev.map(i =>
              i.product.id === productId ? { ...i, quantity } : i,
            ),
      );

    return {
      items,
      itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
