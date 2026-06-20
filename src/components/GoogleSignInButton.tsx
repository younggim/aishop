"use client";

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
          fill="#4285F4"
        />
        <path
          d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.36 0-4.36-1.6-5.08-3.74H.9v2.33A9 9 0 0 0 9 18z"
          fill="#34A853"
        />
        <path
          d="M3.92 10.68A5.4 5.4 0 0 1 3.64 9c0-.58.1-1.15.28-1.68V4.99H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.01l3.02-2.33z"
          fill="#FBBC05"
        />
        <path
          d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.99l3.02 2.33C4.64 5.18 6.64 3.58 9 3.58z"
          fill="#EA4335"
        />
      </svg>
      구글 계정으로 회원가입 / 로그인
    </button>
  );
}
