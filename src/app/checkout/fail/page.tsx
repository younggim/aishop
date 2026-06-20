"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function TossFailContent() {
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="text-3xl">❌</span>
      <h1 className="text-xl font-bold text-zinc-900">결제에 실패했습니다</h1>
      <p className="max-w-sm text-sm text-zinc-500">
        {searchParams.get("message") ?? "알 수 없는 오류가 발생했습니다."}
        <br />
        (코드: {searchParams.get("code") ?? "-"})
      </p>
      <Link href="/checkout" className="rounded-full bg-zinc-900 px-6 py-2 text-sm text-white">
        다시 시도하기
      </Link>
    </div>
  );
}

export default function TossFailPage() {
  return (
    <Suspense>
      <TossFailContent />
    </Suspense>
  );
}
