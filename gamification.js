export function getGamificationState(records = {}, moduleTotal = 0) {
  const resourceCount = Object.keys(records).filter((id) => id !== "quiz" && !/^module-\d+$/.test(id)).length;
  const moduleCount = Math.min(Object.keys(records).filter((id) => /^module-\d+$/.test(id)).length, moduleTotal);
  const xp = resourceCount * 10 + moduleCount * 20 + (records.quiz ? 30 : 0);
  const levelNumber = Math.floor(xp / 50) + 1;
  const label = xp >= 250 ? "Transformador" : xp >= 100 ? "Participante" : "Iniciante";
  return { xp, resourceCount, moduleCount, levelNumber, label, badgeText: `${moduleCount} de ${moduleTotal} medalhas` };
}
