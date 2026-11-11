import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../lib/useLocalStorage";
import { newId } from "../lib/id";
import { todayISO } from "../lib/date";
import { generateChallenges } from "../data/challengeBank";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [skills, setSkills] = useLocalStorage("evoluir:skills", []);
  const [checkins, setCheckins] = useLocalStorage("evoluir:checkins", []);
  const [decisions, setDecisions] = useLocalStorage("evoluir:decisions", []);

  // ---------- Habilidades ----------
  function addSkill(name, emoji) {
    const skill = {
      id: newId(),
      name: name.trim(),
      emoji,
      createdAt: todayISO(),
      challenges: generateChallenges(name.trim(), 3),
    };
    setSkills((prev) => [...prev, skill]);
    return skill.id;
  }

  function removeSkill(skillId) {
    setSkills((prev) => prev.filter((s) => s.id !== skillId));
  }

  function toggleChallenge(skillId, challengeId) {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.id !== skillId) return s;
        return {
          ...s,
          challenges: s.challenges.map((c) =>
            c.id === challengeId
              ? { ...c, done: !c.done, doneAt: !c.done ? todayISO() : null }
              : c
          ),
        };
      })
    );
  }

  function addChallenge(skillId, text) {
    if (!text.trim()) return;
    setSkills((prev) =>
      prev.map((s) =>
        s.id === skillId
          ? {
              ...s,
              challenges: [
                ...s.challenges,
                { id: newId(), text: text.trim(), done: false, doneAt: null },
              ],
            }
          : s
      )
    );
  }

  function suggestNextChallenge(skillId) {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.id !== skillId) return s;
        const existingTexts = s.challenges.map((c) => c.text);
        const [next] = generateChallenges(s.name, 1, existingTexts);
        return { ...s, challenges: [...s.challenges, next] };
      })
    );
  }

  function removeChallenge(skillId, challengeId) {
    setSkills((prev) =>
      prev.map((s) =>
        s.id === skillId
          ? { ...s, challenges: s.challenges.filter((c) => c.id !== challengeId) }
          : s
      )
    );
  }

  // ---------- Padrões ----------
  function getCheckin(date) {
    return checkins.find((c) => c.date === date) ?? null;
  }

  function upsertCheckin(data) {
    const date = data.date ?? todayISO();
    setCheckins((prev) => {
      const idx = prev.findIndex((c) => c.date === date);
      const entry = { ...data, date };
      if (idx === -1) return [...prev, entry];
      const copy = [...prev];
      copy[idx] = entry;
      return copy;
    });
  }

  // ---------- Decisões ----------
  function addDecision({ title, reasoning, expectation, reviewDate }) {
    const decision = {
      id: newId(),
      title: title.trim(),
      reasoning: reasoning.trim(),
      expectation: expectation.trim(),
      createdAt: todayISO(),
      reviewDate,
      status: "pending",
      actualOutcome: null,
      comparisonResult: null,
      learning: null,
      reviewedAt: null,
    };
    setDecisions((prev) => [...prev, decision]);
    return decision.id;
  }

  function reviewDecision(id, { actualOutcome, comparisonResult, learning }) {
    setDecisions((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              actualOutcome,
              comparisonResult,
              learning,
              status: "reviewed",
              reviewedAt: todayISO(),
            }
          : d
      )
    );
  }

  function removeDecision(id) {
    setDecisions((prev) => prev.filter((d) => d.id !== id));
  }

  function updateDecisionReviewDate(id, reviewDate) {
    setDecisions((prev) => prev.map((d) => (d.id === id ? { ...d, reviewDate } : d)));
  }

  const value = useMemo(
    () => ({
      skills,
      addSkill,
      removeSkill,
      toggleChallenge,
      addChallenge,
      suggestNextChallenge,
      removeChallenge,
      checkins,
      getCheckin,
      upsertCheckin,
      decisions,
      addDecision,
      reviewDecision,
      removeDecision,
      updateDecisionReviewDate,
    }),
    [skills, checkins, decisions]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData deve ser usado dentro de AppDataProvider");
  return ctx;
}
