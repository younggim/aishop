"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="h-9 w-9 rounded-lg border border-zinc-200 text-zinc-600"
          aria-label="수량 감소"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="h-9 w-9 rounded-lg border border-zinc-200 text-zinc-600"
          aria-label="수량 증가"
        >
          +
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={outOfStock}
          onClick={handleAdd}
          className="flex-1 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white disabled:bg-zinc-300"
        >
          {outOfStock ? "품절" : added ? "장바구니에 담았습니다" : "장바구니 담기"}
        </button>
        <button
          type="button"
          disabled={outOfStock}
          onClick={() => {
            addItem(product, quantity);
            router.push("/cart");
          }}
          className="flex-1 rounded-xl border border-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-900 disabled:border-zinc-300 disabled:text-zinc-300"
        >
          바로 구매
        </button>
      </div>
    </div>
  );
}
