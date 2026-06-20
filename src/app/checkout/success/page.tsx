"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart";

function TossSuccessContent() {
  const searchParams = useSearchParams();
  const clear = useCartStore((state) => state.clear);
  const [status, setStatus] = useState<"confirming" | "confirmed" | "pending">("confirming");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    if (!paymentKey || !orderId || !amount) return;

    fetch("/api/payments/toss/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.confirmed) {
          setStatus("confirmed");
          clear();
        } else {
          setStatus("pending");
          setMessage(data.message);
        }
      });
  }, [searchParams, clear]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="text-3xl">{status === "confirmed" ? "✅" : "🔄"}</span>
      <h1 className="text-xl font-bold text-zinc-900">
        {status === "confirmed" ? "결제가 완료되었습니다" : "결제 인증 완료, 승인 처리 중"}
      </h1>
      <p className="max-w-sm text-sm text-zinc-500">
        주문번호: {searchParams.get("orderId")}
        <br />
        {message}
      </p>
      <Link href="/" className="rounded-full bg-zinc-900 px-6 py-2 text-sm text-white">
        쇼핑 계속하기
      </Link>
    </div>
  );
}

export default function TossSuccessPage() {
  return (
    <Suspense>
      <TossSuccessContent />
    </Suspense>
  );
}
