import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "smarthome",
    name: "스마트홈",
    emoji: "🏠",
    subCategories: ["AI 스피커", "스마트 조명", "스마트 플러그", "AI 공기청정기", "스마트 냉장고"],
  },
  {
    id: "wearable",
    name: "AI 웨어러블",
    emoji: "⌚",
    subCategories: ["스마트워치", "AI 헬스밴드", "스마트 이어폰", "AI 글래스", "스마트 링"],
  },
  {
    id: "robot",
    name: "로봇/자동화",
    emoji: "🤖",
    subCategories: ["로봇청소기", "AI 요리로봇", "서비스 로봇", "AI 세탁기", "스마트 잔디깎기"],
  },
  {
    id: "healthcare",
    name: "AI 헬스케어",
    emoji: "🏥",
    subCategories: ["AI 혈압계", "스마트 체중계", "수면케어 기기", "AI 혈당측정기", "스마트 체온계"],
  },
  {
    id: "security",
    name: "AI 보안/카메라",
    emoji: "🔒",
    subCategories: ["AI CCTV", "스마트 도어벨", "AI 잠금장치", "스마트 인터폰", "AI 대시캠"],
  },
  {
    id: "office",
    name: "AI 오피스/학습",
    emoji: "💼",
    subCategories: ["AI 번역기", "스마트 펜", "AI 화상회의", "스마트 프린터", "AI 노트"],
  },
  {
    id: "beautydevice",
    name: "AI 플랫폼",
    emoji: "🧠",
    subCategories: ["Claude Code", "Gemini", "ChatGPT", "Deepseek"],
  },
];

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}
