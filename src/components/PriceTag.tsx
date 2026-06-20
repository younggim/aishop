import { Product } from "@/types";
import { discountedPrice } from "@/data/products";

function formatWon(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

export default function PriceTag({ product }: { product: Product }) {
  const final = discountedPrice(product);

  const purchaseRow = !product.discountRate ? (
    <span className="font-bold text-zinc-900">{formatWon(final)}</span>
  ) : (
    <div className="flex items-baseline gap-2">
      <span className="font-bold text-rose-600">{product.discountRate}%</span>
      <span className="font-bold text-zinc-900">{formatWon(final)}</span>
      <span className="text-sm text-zinc-400 line-through">{formatWon(product.price)}</span>
    </div>
  );

  if (!product.monthlyPrice) return purchaseRow;

  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-bold text-indigo-600">월 {formatWon(product.monthlyPrice)}부터</span>
      <span className="text-xs text-zinc-400">일시불 구매가 {formatWon(final)}</span>
    </div>
  );
}
