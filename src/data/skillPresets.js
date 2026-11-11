export const SKILL_SUGGESTIONS = [
  { name: "Criatividade", emoji: "✨" },
  { name: "Comunicação", emoji: "💬" },
  { name: "Finanças", emoji: "💰" },
  { name: "Escrita", emoji: "✍️" },
  { name: "Foco", emoji: "🎯" },
  { name: "Liderança", emoji: "🧭" },
  { name: "Exercício", emoji: "🏃" },
  { name: "Leitura", emoji: "📚" },
];

export const SKILL_EMOJIS = [
  "✨", "💬", "💰", "✍️", "🎯", "🧭", "🏃", "📚",
  "🎨", "🧠", "🗣️", "⏱️", "🧘", "🎵", "💻", "🌱",
];

export function guessEmoji(name) {
  const key = name.trim().toLowerCase();
  const found = SKILL_SUGGESTIONS.find((s) => s.name.toLowerCase() === key);
  if (found) return found.emoji;
  return SKILL_EMOJIS[Math.floor(Math.random() * SKILL_EMOJIS.length)];
}
