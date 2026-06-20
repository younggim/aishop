export type CategoryId =
  | "smarthome"
  | "wearable"
  | "robot"
  | "healthcare"
  | "security"
  | "office"
  | "beautydevice";

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
  subCategories: string[];
}

export type CurationTag =
  | "mdPick"
  | "newArrival"
  | "bestSeller"
  | "aiPowered"
  | "speedDelivery"
  | "globalHot"
  | "limited";

export type AiGrade = "A+" | "A" | "B" | "C";

export interface Product {
  id: string;
  name: string;
  brand: string;
  categoryId: CategoryId;
  price: number;
  discountRate?: number;
  monthlyPrice?: number;
  rating: number;
  reviewCount: number;
  thumbnailColor: string;
  thumbnailEmoji: string;
  tags: CurationTag[];
  stock: number;
  description: string;
  aiFeatures: string[];
  specs: Record<string, string>;
  aiGrade: AiGrade;
  connectivity: string[];
}

export type MembershipTierId = "basic" | "smart" | "pro" | "elite" | "master";

export interface MembershipTier {
  id: MembershipTierId;
  name: string;
  minAnnualSpend: number;
  pointRate: number;
  perks: string[];
}
