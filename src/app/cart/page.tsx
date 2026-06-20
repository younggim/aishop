"use client";

import Link from "next/link";
import { useCartStore, cartSubtotal } from "@/store/cart";

function formatWon(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = cartSubtotal(items);
  const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-lg font-medium text-zinc-700">장바구니가 비어 있습니다.</p>
        <Link href="/" className="rounded-full bg-zinc-900 px-6 py-2 text-sm text-white">
          AI 디바이스 둘러보기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6 md:flex-row">
      <div className="flex flex-1 flex-col gap-3">
        <h1 className="text-2xl font-bold text-zinc-900">장바구니 ({items.length})</h1>
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 rounded-xl bg-white p-4 ring-1 ring-zinc-100"
          >
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg text-3xl"
              style={{ backgroundColor: item.thumbnailColor }}
            >
              {item.thumbnailEmoji}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-xs text-zinc-500">{item.brand}</span>
              <Link href={`/products/${item.productId}`} className="text-sm font-medium hover:underline">
                {item.name}
              </Link>
              <span className="text-sm font-semibold text-zinc-900">{formatWon(item.unitPrice)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity(item.productId, item.quantity - 1)}
                className="h-8 w-8 rounded-lg border border-zinc-200 text-zinc-600"
                aria-label="수량 감소"
              >
                −
              </button>
              <span className="w-6 text-center text-sm">{item.quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(item.productId, item.quantity + 1)}
                className="h-8 w-8 rounded-lg border border-zinc-200 text-zinc-600"
                aria-label="수량 증가"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              className="text-xs text-zinc-400 hover:text-rose-600"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <aside className="flex w-full flex-col gap-3 rounded-xl bg-white p-5 ring-1 ring-zinc-100 md:w-72">
        <h2 className="font-bold text-zinc-900">주문 요약</h2>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>상품 금액</span>
          <span>{formatWon(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>배송비</span>
          <span>{shippingFee === 0 ? "무료" : formatWon(shippingFee)}</span>
        </div>
        <div className="flex justify-between border-t border-zinc-100 pt-3 font-bold text-zinc-900">
          <span>총 결제 금액</span>
          <span>{formatWon(subtotal + shippingFee)}</span>
        </div>
        <button
          type="button"
          className="mt-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white"
        >
          주문하기
        </button>
      </aside>
    </div>
  );
}
