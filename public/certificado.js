import { requireEnrollment, db } from "./auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getCourseModulePath } from "./course-catalog.js";

const $ = (selector) => document.querySelector(selector);
const selectedCourseId = localStorage.getItem("selectedCourseId") || "formacao-centro-esquerda";
const { courseInfo, modules } = await import(getCourseModulePath(selectedCourseId));

try {
  const user = await requireEnrollment();
  document.title = `Certificado | ${courseInfo.shortTitle}`;
  document.querySelector(".certificate-shell > .eyebrow").textContent = courseInfo.shortTitle;
  document.querySelector(".certificate h1").textContent = courseInfo.shortTitle;
  document.querySelector(".certificate-signature").textContent = `Coordenação da ${courseInfo.shortTitle}`;
  const profile = (await get(ref(db, `users/${user.uid}`))).val() || {};
  const progress = (await get(ref(db, `progress/${user.uid}`))).val() || {};
  const complete = modules.every((_, index) => progress[`module-${index + 1}`] && progress[`module-quiz-${index + 1}`]) && progress.quiz;
  if (!complete) {
    $("#certificate-state").textContent = `O certificado será liberado após a conclusão dos ${modules.length} módulos e do questionário final.`;
  } else {
    const completedAt = progress.quiz.completedAt || Date.now();
    $("#certificate-name").textContent = user.displayName || profile.name || user.email || "Participante";
    $("#certificate-date").textContent = new Date(completedAt).toLocaleDateString("pt-BR");
    $("#certificate-duration").textContent = courseInfo.duration;
    $("#certificate-modules").textContent = String(modules.length);
    $("#certificate-code").textContent = `${user.uid.slice(0, 8).toUpperCase()}-${new Date(completedAt).getFullYear()}`;
    $("#certificate").hidden = false;
    $("#print-certificate").hidden = false;
    $("#certificate-state").textContent = "Conclusão confirmada.";
    $("#print-certificate").addEventListener("click", () => window.print());
  }
} catch (error) {
  console.warn(error);
  $("#certificate-state").textContent = "Não foi possível validar sua conclusão. Faça login novamente.";
}
document.body.classList.remove("loading");
