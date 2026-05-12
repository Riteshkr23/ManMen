"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products } from "@/lib/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (productId) => {
        const existing = get().items.find((item) => item.productId === productId);
        if (existing) {
          get().updateQuantity(productId, existing.quantity + 1);
          return;
        }
        set((state) => ({ items: [...state.items, { productId, quantity: 1 }] }));
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.productId !== productId)
              : state.items.map((item) =>
                  item.productId === productId ? { ...item, quantity } : item,
                ),
        })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
    }),
    {
      name: "manmen-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const selectCartItemsWithProducts = (items: CartItem[]) =>
  items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) {
        return null;
      }
      return { ...item, product };
    })
    .filter((entry): entry is { productId: string; quantity: number; product: (typeof products)[0] } =>
      Boolean(entry),
    );

export const calculateSubtotal = (items: CartItem[]) =>
  selectCartItemsWithProducts(items).reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

export const calculateCartCount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);
