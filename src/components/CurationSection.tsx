import { Product } from "@/types";
import ProductCard from "./ProductCard";

export default function CurationSection({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 py-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
        {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
