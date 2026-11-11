import { newId } from "../lib/id";

// Banco genérico de desafios curtos. Usado para sugerir próximos passos
// sem depender de nenhuma API externa — tudo roda localmente.
const TEMPLATES = [
  "Dedique 15 minutos hoje só para praticar {s}.",
  "Explique {s} para alguém (ou em voz alta, para você mesmo) em menos de 2 minutos.",
  "Encontre um exemplo real e bem feito de {s}. O que te chamou atenção nele?",
  "Faça a versão mais simples possível de uma tarefa de {s} — sem se preocupar com perfeição.",
  "Peça um feedback rápido sobre algo relacionado a {s} que você já fez.",
  "Anote 3 situações da última semana em que {s} teria ajudado.",
  "Ensine o básico de {s} para alguém em uma frase.",
  "Passe 10 minutos estudando uma referência (vídeo, texto, pessoa) boa em {s}.",
  "Tente algo em {s} fora da sua zona de conforto habitual, mesmo que pequeno.",
  "Refaça algo antigo relacionado a {s} e compare com a versão nova.",
  "Pergunte a si mesmo: o que está travando meu progresso em {s}? Anote uma frase.",
  "Pratique {s} por 20 minutos sem checar o celular.",
  "Observe alguém que você admira em {s}. O que essa pessoa faz diferente?",
  "Defina um mini-objetivo de {s} para os próximos 7 dias.",
  "Compartilhe algo que você criou ou decidiu usando {s}, mesmo que incompleto.",
  "Revise um erro recente ligado a {s} e escreva o que faria diferente.",
];

export function generateChallenges(skillName, count, excludeTexts = []) {
  const pool = shuffle(TEMPLATES).map((t) => t.replace("{s}", skillName));
  const unique = pool.filter((text) => !excludeTexts.includes(text));
  const source = unique.length >= count ? unique : pool;
  return source.slice(0, count).map((text) => ({
    id: newId(),
    text,
    done: false,
    doneAt: null,
  }));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
