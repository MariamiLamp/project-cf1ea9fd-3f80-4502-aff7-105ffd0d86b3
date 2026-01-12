import { useEffect, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  preview?: string;
  description?: string;
};

const STORAGE_KEY = "app_cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (item: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists)
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      return [...prev, item];
    });
  };

  const remove = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);
  const updateQuantity = (id: number, quantity: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);

  return { items, add, remove, clear, updateQuantity, total };
}

export default useCart;
