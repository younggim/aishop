import { NextRequest, NextResponse } from "next/server";

const KAKAO_PAY_BASE_URL = process.env.KAKAO_PAY_BASE_URL ?? "https://kapi.kakao.com";
const KAKAO_PAY_AUTH_SCHEME = process.env.KAKAO_PAY_AUTH_SCHEME ?? "KakaoAK";

export async function POST(request: NextRequest) {
  const adminKey = process.env.KAKAO_PAY_ADMIN_KEY;
  const cid = process.env.KAKAO_PAY_CID ?? "TC0ONETIME";

  if (!adminKey) {
    return NextResponse.json(
      {
        message:
          "KAKAO_PAY_ADMIN_KEY가 설정되지 않았습니다. 카카오 비즈니스 계정에서 발급받은 CID/Admin Key를 .env.local에 추가해주세요.",
      },
      { status: 501 }
    );
  }

  const { orderId, amount, itemName } = await request.json();
  const origin = request.nextUrl.origin;

  const body = new URLSearchParams({
    cid,
    partner_order_id: orderId,
    partner_user_id: "guest",
    item_name: itemName.slice(0, 100),
    quantity: "1",
    total_amount: String(amount),
    tax_free_amount: "0",
    approval_url: `${origin}/checkout/kakao/approve?orderId=${encodeURIComponent(orderId)}`,
    cancel_url: `${origin}/checkout/kakao/cancel`,
    fail_url: `${origin}/checkout/kakao/fail`,
  });

  const res = await fetch(`${KAKAO_PAY_BASE_URL}/v1/payment/ready`, {
    method: "POST",
    headers: {
      Authorization: `${KAKAO_PAY_AUTH_SCHEME} ${adminKey}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ message: data.msg ?? "카카오페이 결제 준비 요청이 거부되었습니다." }, { status: res.status });
  }

  return NextResponse.json({ tid: data.tid, next_redirect_pc_url: data.next_redirect_pc_url });
}
