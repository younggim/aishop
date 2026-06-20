import Link from "next/link";
import { categories } from "@/data/categories";
import {
  getFeaturedProducts,
  getNewProducts,
  getDiscountedProducts,
  getSpeedDeliveryProducts,
  getProductsByTag,
} from "@/data/products";
import CurationSection from "@/components/CurationSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="my-6 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-12 text-white">
        <span className="text-sm font-medium opacity-80">AI DEVICE MALL</span>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Agentic/Multi-agent AI 구현을 위한
          <br />장비 및 장치를 신속하고 저렴하게
        </h1>
        <p className="max-w-md text-sm opacity-90">
          대여하고 AI의 변화를 누려보세요.
        </p>
      </section>

      <section className="grid grid-cols-3 gap-3 py-4 sm:grid-cols-5">
        {categories
          .filter((category) => category.id !== "healthcare" && category.id !== "security")
          .map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-zinc-100 bg-white p-4 text-center transition hover:border-indigo-300 hover:shadow-sm"
            >
              <span className="text-3xl">{category.emoji}</span>
              <span className="text-xs font-medium text-zinc-700">{category.name}</span>
            </Link>
          ))}
      </section>

      <CurationSection
        title="MD픽 · 이번 주 추천 AI 디바이스"
        subtitle="전문 MD가 직접 선정한 화제의 AI 기기"
        products={getFeaturedProducts()}
      />
      <CurationSection
        title="오늘드림 · 당일배송 특가"
        subtitle="지금 주문하면 오늘 안에 받는 AI 디바이스"
        products={getSpeedDeliveryProducts()}
      />
      <CurationSection
        title="AI파워드 · 똑똑한 AI 기능 탑재"
        subtitle="딥러닝·센서 기반 AI 기능이 핵심인 제품"
        products={getProductsByTag("aiPowered")}
      />
      <CurationSection
        title="신규 입점 브랜드"
        subtitle="런칭 3개월 이내 신규 AI 디바이스 브랜드"
        products={getNewProducts()}
      />
      <CurationSection
        title="최대 할인 특가"
        subtitle="지금 가장 많이 할인된 AI 디바이스"
        products={getDiscountedProducts()}
      />
      <CurationSection
        title="글로벌 HOT"
        subtitle="해외에서도 인기 있는 AI 디바이스"
        products={getProductsByTag("globalHot")}
      />
    </div>
  );
}
