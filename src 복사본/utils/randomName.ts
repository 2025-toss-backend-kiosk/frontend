// src/utils/randomName.ts
const ADJECTIVES = [
  "행복한","멋진","신나는","귀여운","용감한",
  "별빛","달빛","하늘","바다","숲속"
];

const NOUNS = [
  "토끼","고양이","강아지","사자","호랑이",
  "음표","별","구름","나무","꽃"
];

export function generateRandomName(): string {
  const adj  = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj}${noun}`;
}