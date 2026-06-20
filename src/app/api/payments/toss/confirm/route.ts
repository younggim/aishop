import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { paymentKey, orderId, amount } = await request.json();

  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        confirmed: false,
        message:
          "TOSS_SECRET_KEY가 설정되지 않아 결제를 최종 승인하지 못했습니다. 테스트 인증은 완료되었지만 자동으로 취소됩니다.",
      },
      { status: 200 }
    );
  }

  const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ confirmed: false, message: data.message }, { status: res.status });
  }

  return NextResponse.json({ confirmed: true, payment: data });
}
