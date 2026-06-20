import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { discountedPrice } from "@/data/products";

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  thumbnailEmoji: string;
  thumbnailColor: string;
  unitPrice: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const existing = get().items.find((item) => item.productId === product.id);
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
          return;
        }
        set({
          items: [
            ...get().items,
            {
              productId: product.id,
              name: product.name,
              brand: product.brand,
              thumbnailEmoji: product.thumbnailEmoji,
              thumbnailColor: product.thumbnailColor,
              unitPrice: discountedPrice(product),
              quantity,
            },
          ],
        });
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((item) => item.productId !== productId) }),
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "k-ai-device-cart" }
  )
);

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
