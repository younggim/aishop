import { notFound } from "next/navigation";
import { getProductById, getProductsByCategory, products } from "@/data/products";
import { getCategoryById } from "@/data/categories";
import { tagLabels } from "@/data/tags";
import PriceTag from "@/components/PriceTag";
import AddToCartButton from "@/components/AddToCartButton";
import CurationSection from "@/components/CurationSection";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = getCategoryById(product.categoryId);
  const related = getProductsByCategory(product.categoryId).filter((p) => p.id !== product.id);
  const lowStock = product.stock > 0 && product.stock < 10;

  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div
          className="flex aspect-square items-center justify-center rounded-2xl text-8xl"
          style={{ backgroundColor: product.thumbnailColor }}
        >
          {product.thumbnailEmoji}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600"
              >
                {tagLabels[tag]}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-zinc-500">
              {product.brand} · {category?.name}
            </span>
            <h1 className="text-2xl font-bold text-zinc-900">{product.name}</h1>
            <span className="text-sm text-zinc-500">
              ⭐ {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString("ko-KR")}개 리뷰)
            </span>
          </div>

          <PriceTag product={product} />

          <p className="text-sm leading-relaxed text-zinc-600">{product.description}</p>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md bg-zinc-900 px-2 py-1 font-semibold text-white">
              AI 등급 {product.aiGrade}
            </span>
            <span className="rounded-md bg-zinc-100 px-2 py-1 text-zinc-600">
              연결: {product.connectivity.join(", ")}
            </span>
            {lowStock ? (
              <span className="rounded-md bg-rose-100 px-2 py-1 font-medium text-rose-600">
                품절임박 · 재고 {product.stock}개
              </span>
            ) : (
              <span className="rounded-md bg-emerald-100 px-2 py-1 font-medium text-emerald-700">
                재고 {product.stock}개
              </span>
            )}
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-zinc-900">AI 기능</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {product.aiFeatures.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm text-zinc-700 ring-1 ring-zinc-100"
            >
              ✨ {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-zinc-900">상세 사양</h2>
        <table className="w-full text-sm">
          <tbody>
            {Object.entries(product.specs).map(([key, value]) => (
              <tr key={key} className="border-b border-zinc-100">
                <th className="w-1/3 py-2 text-left font-medium text-zinc-500">{key}</th>
                <td className="py-2 text-zinc-800">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <CurationSection title={`${category?.name} 카테고리 다른 상품`} products={related.slice(0, 6)} />
    </div>
  );
}
