import { redirect } from "next/navigation";
import { auth } from "@/auth";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-white p-8 text-center ring-1 ring-zinc-100">
        <span className="text-2xl">🤖</span>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-zinc-900">K-AI Device Mall 로그인</h1>
          <p className="text-sm text-zinc-500">
            구글 계정으로 1초 만에 가입하고 BASIC 멤버십 혜택을 받아보세요.
          </p>
        </div>
        <GoogleSignInButton />
      </div>
    </div>
  );
}
