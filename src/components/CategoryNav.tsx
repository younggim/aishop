import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategoryNav() {
  return (
    <nav className="border-b border-zinc-100 bg-white">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="flex shrink-0 items-center gap-1.5 px-3 py-3 text-sm font-medium text-zinc-700 hover:text-indigo-600"
          >
            <span>{category.emoji}</span>
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
