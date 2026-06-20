import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryById, categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { aiPlatforms } from "@/data/aiPlatforms";
import ProductCard from "@/components/ProductCard";

const AI_PLATFORM_CATEGORY_ID = "beautydevice";

export function generateStaticParams() {
  return categories.map((category) => ({ categoryId: category.id }));
}

type SortOption = "popular" | "priceAsc" | "priceDesc" | "rating";

function sortProducts<T extends { reviewCount: number; price: number; rating: number }>(
  products: T[],
  sort: SortOption
): T[] {
  const sorted = [...products];
  switch (sort) {
    case "priceAsc":
      return sorted.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { categoryId } = await params;
  const { sort } = await searchParams;
  const category = getCategoryById(categoryId);
  if (!category) notFound();

  if (categoryId === AI_PLATFORM_CATEGORY_ID) {
    return (
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-zinc-900">
            {category.emoji} {category.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            {category.subCategories.map((sub) => (
              <span
                key={sub}
                className="rounded-full bg-white px-3 py-1 text-xs text-zinc-600 ring-1 ring-zinc-200"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {aiPlatforms.map((platform) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 rounded-xl border border-zinc-100 bg-white p-5 transition hover:border-indigo-300 hover:shadow-sm"
            >
              <span className="text-3xl">{platform.emoji}</span>
              <span className="font-semibold text-zinc-900">{platform.name}</span>
              <span className="text-sm text-zinc-500">{platform.description}</span>
              <span className="mt-2 text-sm font-medium text-indigo-600">가입하기 →</span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  const sortOption: SortOption =
    sort === "priceAsc" || sort === "priceDesc" || sort === "rating" ? sort : "popular";
  const products = sortProducts(getProductsByCategory(categoryId), sortOption);

  const sortLinks: { value: SortOption; label: string }[] = [
    { value: "popular", label: "인기순" },
    { value: "rating", label: "평점순" },
    { value: "priceAsc", label: "낮은 가격순" },
    { value: "priceDesc", label: "높은 가격순" },
  ];

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-900">
          {category.emoji} {category.name}
        </h1>
        <div className="flex flex-wrap gap-2">
          {category.subCategories.map((sub) => (
            <span
              key={sub}
              className="rounded-full bg-white px-3 py-1 text-xs text-zinc-600 ring-1 ring-zinc-200"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-zinc-100 pb-3 text-sm">
        {sortLinks.map((link) => (
          <Link
            key={link.value}
            href={`/category/${categoryId}?sort=${link.value}`}
            className={
              sortOption === link.value
                ? "font-semibold text-indigo-600"
                : "text-zinc-500 hover:text-zinc-800"
            }
          >
            {link.label}
          </Link>
        ))}
        <span className="ml-auto text-zinc-400">총 {products.length}개 상품</span>
      </div>

      {products.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500">아직 등록된 상품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
