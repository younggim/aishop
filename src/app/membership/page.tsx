import { membershipTiers } from "@/data/membership";

export default function MembershipPage() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-900">AI Device Mall 멤버십</h1>
        <p className="text-sm text-zinc-500">
          연간 구매액에 따라 등급이 결정되며, 등급이 올라갈수록 더 많은 적립과 혜택을 받을 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {membershipTiers.map((tier) => (
          <div
            key={tier.id}
            className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-zinc-100"
          >
            <span className="text-lg font-bold text-zinc-900">{tier.name}</span>
            <span className="text-xs text-zinc-500">
              연간 구매액 {tier.minAnnualSpend.toLocaleString("ko-KR")}원 이상
            </span>
            <span className="text-2xl font-bold text-indigo-600">{tier.pointRate}%</span>
            <span className="text-xs text-zinc-400">포인트 적립률</span>
            <ul className="flex flex-col gap-1.5 text-sm text-zinc-600">
              {tier.perks.map((perk) => (
                <li key={perk}>· {perk}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
