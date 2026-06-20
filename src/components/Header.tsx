"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCartStore, cartItemCount } from "@/store/cart";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");
  const items = useCartStore((state) => state.items);
  const count = cartItemCount(items);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="border-b border-zinc-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link href="/" className="shrink-0 text-lg font-bold text-zinc-900">
          🤖 AI Device Mall
        </Link>

        <form onSubmit={handleSearch} className="flex flex-1 max-w-xl items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="AI 디바이스, 브랜드 검색"
            className="w-full rounded-l-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-indigo-400"
          />
          <button
            type="submit"
            className="rounded-r-full border border-l-0 border-zinc-200 bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
          >
            검색
          </button>
        </form>

        <nav className="flex shrink-0 items-center gap-4 text-sm font-medium text-zinc-700">
          <Link href="/membership" className="hover:text-indigo-600">
            멤버십
          </Link>
          <Link href="/cart" className="relative hover:text-indigo-600">
            장바구니
            {count > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
          {status === "authenticated" ? (
            <div className="flex items-center gap-2">
              {session.user?.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "프로필"}
                  className="h-7 w-7 rounded-full"
                />
              )}
              <span className="max-w-[6rem] truncate text-zinc-600">{session.user?.name}</span>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-zinc-400 hover:text-rose-600"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link href="/login" className="hover:text-indigo-600">
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
