import { requireEnrollment, leaveCourse, db } from "./auth.js";
import { ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getCourseModulePath } from "./course-catalog.js";
import { getGamificationState } from "./gamification.js";

const $ = (selector) => document.querySelector(selector);
const selectedCourseId = localStorage.getItem("selectedCourseId") || "formacao-centro-esquerda";
const { courseInfo, modules, finalQuiz = [] } = await import(getCourseModulePath(selectedCourseId));
document.title = `Atividades | ${courseInfo.shortTitle}`;
document.querySelector(".brand").textContent = courseInfo.shortTitle;
document.querySelector(".notebook-quiz-link")?.remove();
const finalQuizIntro = document.querySelector(".course-activities .lead");
if (finalQuizIntro) finalQuizIntro.textContent = "Chegou até aqui? Então bora fechar a formação.";
const user = await requireEnrollment();
const progress = (await get(ref(db, `progress/${user.uid}`))).val() || {};
const firstPendingModule = modules.findIndex((_, index) => !progress[`module-${index + 1}`]);
if (firstPendingModule !== -1) {
  location.replace(`modulo-${firstPendingModule + 1}.html`);
  throw new Error("Conclua os módulos anteriores antes de acessar o questionário.");
}
const showCertificate = () => { $("#certificate-link").hidden = false; };
if (progress.quiz) showCertificate();

$("#member-name").textContent = user.displayName || user.email;
$("#logout").insertAdjacentHTML("beforebegin", '<a class="secondary button profile-button" href="perfil.html#notas">Caderno</a><a class="secondary button profile-button" href="perfil.html">Perfil</a>');
$("#logout").addEventListener("click", leaveCourse);

const quizForm = $("#quiz-form");
quizForm.innerHTML = finalQuiz.map((item, index) => `
  <fieldset>
    <legend>${index + 1}. ${item.question}</legend>
    ${item.options.map((option) => `
      <label>
        <input type="radio" name="q${index + 1}" value="${option.value}" required>
        ${option.label}
      </label>
    `).join("")}
  </fieldset>
`).join("") + `<button type="submit">Corrigir e registrar</button>`;

quizForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const answers = Object.fromEntries(new FormData(event.target).entries());
  const hits = finalQuiz.filter((item, index) => answers[`q${index + 1}`] === item.correct).length;
  await set(ref(db, `answers/${user.uid}/checkpoint`), { answers, hits, submittedAt: Date.now() });
  if (hits < 2) {
    $("#quiz-feedback").textContent = `Resultado: ${hits} de ${finalQuiz.length}. Revise os módulos e alcance pelo menos 2 acertos para concluir.`;
    return;
  }
  await set(ref(db, `progress/${user.uid}/quiz`), { completedAt: Date.now(), hits });
  $("#quiz-feedback").textContent = `Resultado: ${hits} de ${finalQuiz.length}. Questionário concluído: +30 XP.`;
  showCertificate();
});
$("#media-links").innerHTML = "<p class=\"notice\">Os vídeos, podcasts e leituras obrigatórias estão distribuídos nos módulos. Conclua cada missão para ganhar XP e medalhas.</p>";
$("#media-links").insertAdjacentHTML("beforeend", `<aside class="xp-panel"><b id="xp-value">0 XP</b><span id="level-value">Nível 1 — Iniciante</span><span id="badge-value">0 de ${modules.length} medalhas</span></aside>`);

onValue(ref(db, `progress/${user.uid}`), (snapshot) => {
  const records = snapshot.val() || {};
  const { xp, levelNumber, label, badgeText } = getGamificationState(records, modules.length);
  $("#xp-value").textContent = `${xp} XP`;
  $("#level-value").textContent = `Nível ${levelNumber} — ${label}`;
  $("#badge-value").textContent = badgeText;
});

document.body.classList.remove("loading");
