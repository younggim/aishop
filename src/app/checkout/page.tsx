"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ANONYMOUS, loadTossPayments, type TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { useCartStore, cartSubtotal } from "@/store/cart";

function formatWon(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const items = useCartStore((state) => state.items);
  const subtotal = cartSubtotal(items);
  const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;
  const totalAmount = subtotal + shippingFee;

  const orderIdRef = useRef(`order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const orderName =
    items.length === 0
      ? ""
      : items.length === 1
        ? items[0].name
        : `${items[0].name} 외 ${items.length - 1}건`;

  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);
  const [tossReady, setTossReady] = useState(false);
  const [kakaoLoading, setKakaoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
      return;
    }

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    if (!clientKey) {
      setError("토스페이먼츠 클라이언트 키가 설정되지 않았습니다.");
      return;
    }

    let destroyed = false;

    loadTossPayments(clientKey).then(async (tossPayments) => {
      if (destroyed) return;
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      widgetsRef.current = widgets;
      await widgets.setAmount({ currency: "KRW", value: totalAmount });
      await widgets.renderPaymentMethods({ selector: "#toss-payment-method" });
      await widgets.renderAgreement({ selector: "#toss-agreement" });
      setTossReady(true);
    });

    return () => {
      destroyed = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleTossPayment() {
    const widgets = widgetsRef.current;
    if (!widgets) return;
    setError(null);
    try {
      await widgets.requestPayment({
        orderId: orderIdRef.current,
        orderName,
        customerName: session?.user?.name ?? undefined,
        customerEmail: session?.user?.email ?? undefined,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "토스페이 결제 요청에 실패했습니다.");
    }
  }

  async function handleKakaoPayment() {
    setError(null);
    setKakaoLoading(true);
    try {
      const res = await fetch("/api/payments/kakao/ready", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderIdRef.current,
          amount: totalAmount,
          itemName: orderName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "카카오페이 결제 준비에 실패했습니다.");
        return;
      }
      sessionStorage.setItem(
        `kakao-pay:${orderIdRef.current}`,
        JSON.stringify({ tid: data.tid })
      );
      window.location.href = data.next_redirect_pc_url;
    } catch {
      setError("카카오페이 결제 준비 중 오류가 발생했습니다.");
    } finally {
      setKakaoLoading(false);
    }
  }

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 py-6 md:flex-row">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="text-2xl font-bold text-zinc-900">주문/결제</h1>

        <section className="flex flex-col gap-2 rounded-xl bg-white p-4 ring-1 ring-zinc-100">
          <h2 className="text-sm font-bold text-zinc-700">주문 상품 ({items.length})</h2>
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">
                {item.name} x {item.quantity}
              </span>
              <span className="font-medium text-zinc-900">
                {formatWon(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-3 rounded-xl bg-white p-4 ring-1 ring-zinc-100">
          <h2 className="text-sm font-bold text-zinc-700">결제 수단</h2>

          <div id="toss-payment-method" />
          <div id="toss-agreement" />
          <button
            type="button"
            onClick={handleTossPayment}
            disabled={!tossReady}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white disabled:bg-zinc-300"
          >
            토스페이먼츠로 결제하기
          </button>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="h-px flex-1 bg-zinc-100" />
            또는
            <span className="h-px flex-1 bg-zinc-100" />
          </div>

          <button
            type="button"
            onClick={handleKakaoPayment}
            disabled={kakaoLoading}
            className="rounded-xl bg-[#FEE500] px-6 py-3 text-sm font-semibold text-[#191600] disabled:opacity-50"
          >
            {kakaoLoading ? "카카오페이 연결 중…" : "카카오페이로 결제하기"}
          </button>

          {error && <p className="text-sm text-rose-600">{error}</p>}
        </section>
      </div>

      <aside className="flex w-full flex-col gap-3 rounded-xl bg-white p-5 ring-1 ring-zinc-100 md:w-72">
        <h2 className="font-bold text-zinc-900">결제 금액</h2>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>상품 금액</span>
          <span>{formatWon(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>배송비</span>
          <span>{shippingFee === 0 ? "무료" : formatWon(shippingFee)}</span>
        </div>
        <div className="flex justify-between border-t border-zinc-100 pt-3 font-bold text-zinc-900">
          <span>총 결제 금액</span>
          <span>{formatWon(totalAmount)}</span>
        </div>
      </aside>
    </div>
  );
}
