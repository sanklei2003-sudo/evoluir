const XP_PER_CHALLENGE = 10;
const BASE_XP = 30;
const XP_STEP = 20;

export function xpForSkill(skill) {
  const done = skill.challenges?.filter((c) => c.done).length ?? 0;
  return done * XP_PER_CHALLENGE;
}

export function levelFromXp(xp) {
  let level = 1;
  let remaining = xp;
  let need = BASE_XP;
  while (remaining >= need) {
    remaining -= need;
    level += 1;
    need += XP_STEP;
  }
  return {
    level,
    xpIntoLevel: remaining,
    xpForNext: need,
    progressPct: Math.round((remaining / need) * 100),
  };
}

export function getSkillProgress(skill) {
  const xp = xpForSkill(skill);
  return { xp, ...levelFromXp(xp) };
}
