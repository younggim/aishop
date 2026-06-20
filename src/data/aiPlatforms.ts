export interface AiPlatform {
  id: string;
  name: string;
  description: string;
  url: string;
  emoji: string;
}

export const aiPlatforms: AiPlatform[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic의 터미널 기반 AI 코딩 에이전트.",
    url: "https://claude.com/claude-code",
    emoji: "🤖",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Google의 멀티모달 AI 어시스턴트.",
    url: "https://gemini.google.com",
    emoji: "✨",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI의 대화형 AI 어시스턴트.",
    url: "https://chat.openai.com",
    emoji: "💬",
  },
  {
    id: "deepseek",
    name: "Deepseek",
    description: "Deepseek의 오픈소스 기반 AI 어시스턴트.",
    url: "https://chat.deepseek.com",
    emoji: "🔍",
  },
  {
    id: "hermes-agent",
    name: "Hermes Agent",
    description: "Nous Research가 개발한 오픈소스 자율 AI 에이전트. 서버에 상주하며 세션 간 기억을 유지.",
    url: "https://hermes-agent.org/ko/",
    emoji: "🪽",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    description: "Discord·Slack·WhatsApp 등 메신저와 AI 코딩 에이전트를 연결하는 셀프호스팅 게이트웨이.",
    url: "https://openclaw.ai",
    emoji: "🦞",
  },
];
