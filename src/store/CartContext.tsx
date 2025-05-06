import React, { createContext, useContext, useState } from "react";

export type CartItem = { id: string; qty: number; opts: Record<string, any> };

type CartCtx = {
  items: CartItem[];
  addItem:    (item: CartItem) => void;
  removeItem: (idx: number)    => void;
  changeQty:  (idx: number, diff: number) => void;
};

const CartContext = createContext<CartCtx | null>(null);
export const useCart = () => useContext(CartContext)!;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (i: CartItem) => {
    const idx = items.findIndex(
      p => p.id === i.id && JSON.stringify(p.opts) === JSON.stringify(i.opts)
    );
    if (idx > -1) items[idx].qty += i.qty;
    else items.push({ ...i });
    setItems([...items]);
  };

  const removeItem = (idx: number) => {
    items.splice(idx, 1);
    setItems([...items]);
  };

  const changeQty = (idx: number, diff: number) => {
    const t = items[idx];
    if (!t) return;
    const next = t.qty + diff;
    if (next <= 0) removeItem(idx);
    else {
      t.qty = next;
      setItems([...items]);
    }
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, changeQty }}>
      {children}
    </CartContext.Provider>
  );
};