import { MembershipTier } from "@/types";

export const membershipTiers: MembershipTier[] = [
  {
    id: "basic",
    name: "BASIC",
    minAnnualSpend: 0,
    pointRate: 1,
    perks: ["기본 적립 1%", "가입 축하 쿠폰 5,000P"],
  },
  {
    id: "smart",
    name: "SMART",
    minAnnualSpend: 200000,
    pointRate: 2,
    perks: ["월 1회 무료배송", "등급 업 쿠폰 5,000P"],
  },
  {
    id: "pro",
    name: "PRO",
    minAnnualSpend: 500000,
    pointRate: 3,
    perks: ["상시 무료배송", "PRO 전용 특가관", "신제품 우선 체험"],
  },
  {
    id: "elite",
    name: "ELITE",
    minAnnualSpend: 1200000,
    pointRate: 5,
    perks: ["전 상품 무료배송", "전담 상담 라인", "ELITE 라운지 이용"],
  },
  {
    id: "master",
    name: "MASTER",
    minAnnualSpend: 3000000,
    pointRate: 7,
    perks: ["연 4회 AI 디바이스 체험 키트", "신제품 런칭 VIP 초청", "전용 케어 매니저"],
  },
];

export function getTierById(id: string) {
  return membershipTiers.find((tier) => tier.id === id);
}

export function getTierBySpend(annualSpend: number): MembershipTier {
  return [...membershipTiers]
    .reverse()
    .find((tier) => annualSpend >= tier.minAnnualSpend) ?? membershipTiers[0];
}
