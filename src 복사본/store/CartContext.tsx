// src/store/CartContext.tsx
import React, { createContext, useContext, useState } from "react";

export type CartItem = {
  id: string;
  qty: number;
  opts: Record<string, any>;
};

type CartCtx = {
  items: CartItem[];
  addItem:    (item: CartItem) => void;
  removeItem: (idx: number) => void;
  changeQty:  (idx: number, diff: number) => void;
  clearCart:  () => void;           // ← 장바구니 비우기
};

const CartContext = createContext<CartCtx | null>(null);

export const useCart = () => useContext(CartContext)!;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (i: CartItem) => {
    // 동일 ID+옵션이 있으면 수량만 증가
    const idx = items.findIndex(
      p => p.id === i.id && JSON.stringify(p.opts) === JSON.stringify(i.opts)
    );
    if (idx > -1) {
      const next = [...items];
      next[idx].qty += i.qty;
      setItems(next);
    } else {
      setItems([...items, { ...i }]);
    }
  };

  const removeItem = (idx: number) => {
    const next = [...items];
    next.splice(idx, 1);
    setItems(next);
  };

  const changeQty = (idx: number, diff: number) => {
    const next = [...items];
    const t = next[idx];
    if (!t) return;
    const newQty = t.qty + diff;
    if (newQty <= 0) {
      next.splice(idx, 1);
    } else {
      t.qty = newQty;
    }
    setItems(next);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, changeQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};