import Link from "next/link";
import { Product } from "@/types";
import PriceTag from "./PriceTag";
import { tagLabels } from "@/data/tags";

export default function ProductCard({ product }: { product: Product }) {
  const lowStock = product.stock > 0 && product.stock < 10;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col gap-2 rounded-xl border border-zinc-100 p-3 transition hover:border-zinc-300 hover:shadow-md"
    >
      <div
        className="relative flex aspect-square items-center justify-center rounded-lg text-5xl"
        style={{ backgroundColor: product.thumbnailColor }}
      >
        {product.thumbnailEmoji}
        <span className="absolute right-2 top-2 rounded-full bg-zinc-900/80 px-2 py-0.5 text-[10px] font-semibold text-white">
          AI {product.aiGrade}
        </span>
        {lowStock && (
          <span className="absolute bottom-2 left-2 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-semibold text-white">
            품절임박 {product.stock}개
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {product.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600"
          >
            {tagLabels[tag]}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-zinc-500">{product.brand}</span>
        <span className="line-clamp-2 text-sm font-medium text-zinc-900 group-hover:underline">
          {product.name}
        </span>
        <span className="text-xs text-zinc-500">
          ⭐ {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString("ko-KR")})
        </span>
      </div>

      <PriceTag product={product} />
    </Link>
  );
}
