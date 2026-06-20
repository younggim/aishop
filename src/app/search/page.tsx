import { searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";
  const results = searchProducts(query);

  return (
    <div className="flex flex-col gap-6 py-6">
      <h1 className="text-xl font-bold text-zinc-900">
        &apos;{query}&apos; 검색 결과 ({results.length})
      </h1>

      {results.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500">
          검색 결과가 없습니다. 다른 키워드로 검색해보세요.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
