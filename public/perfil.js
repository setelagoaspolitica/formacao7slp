import { requireEnrollment, leaveCourse, db } from "./auth.js";
import { ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getCourseModulePath } from "./course-catalog.js";
import { getGamificationState } from "./gamification.js";

const $ = (selector) => document.querySelector(selector);
const selectedCourseId = localStorage.getItem("selectedCourseId") || "formacao-centro-esquerda";
const { courseInfo, modules } = await import(getCourseModulePath(selectedCourseId));
document.title = `Perfil | ${courseInfo.shortTitle}`;
document.querySelector(".brand").textContent = courseInfo.shortTitle;
const escapeHtml = (value) => { const element = document.createElement("div"); element.textContent = value; return element.innerHTML; };
const user = await requireEnrollment();
$("#member-name").textContent = user.displayName || user.email;
$("#profile-name").textContent = user.displayName || "Não informado";
$("#profile-email").textContent = user.email || "Não informado";
$("#note-module").innerHTML = modules.map(([title], index) => `<option value="Módulo ${index + 1}">Módulo ${index + 1} — ${escapeHtml(title)}</option>`).join("");
$("#notas h2").textContent = "Meu caderno";
$("#note-form").insertAdjacentHTML("afterend", '<p id="note-status" role="status"></p>');
$("#logout").addEventListener("click", leaveCourse);

onValue(ref(db, `progress/${user.uid}`), (snapshot) => {
  const records = snapshot.val() || {};
  const completed = Object.keys(records).length;
  const { xp, moduleCount, levelNumber, label } = getGamificationState(records, modules.length);
  $("#progress-summary").innerHTML = `
    <span class="score-pill"><strong>${completed}</strong> atividades</span>
    <span class="score-pill"><strong>${xp}</strong> XP</span>
    <span class="score-pill"><strong>Nível ${levelNumber}</strong> · ${label}</span>
    <span class="score-pill"><strong>${moduleCount}</strong> de ${modules.length} medalhas</span>
  `;
  $("#progress-list").innerHTML = modules.map(([title], index) => {
    const key = `module-${index + 1}`;
    const done = Boolean(records[key]);
    return `<article class="${done ? "completed" : ""}"><span>Módulo ${index + 1}</span><b>${escapeHtml(title)}</b><small>${done ? "Missão concluída ✓" : "Continue a leitura e registre suas reflexões."}</small></article>`;
  }).join("");
});

$("#note-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = $("#note-text").value.trim();
  if (!text) return;
  const submit = event.target.querySelector("button");
  submit.disabled = true;
  try {
    await set(push(ref(db, `notes/${user.uid}`)), { module: $("#note-module").value, text, createdAt: Date.now() });
    $("#note-text").value = "";
    $("#note-status").textContent = "Anotação salva no seu caderno.";
  } catch {
    $("#note-status").textContent = "Não deu para salvar agora. Tente de novo.";
  } finally { submit.disabled = false; }
});
onValue(ref(db, `notes/${user.uid}`), (snapshot) => {
  const notes = Object.entries(snapshot.val() || {}).sort(([, a], [, b]) => b.createdAt - a.createdAt);
  $("#notes-list").innerHTML = notes.length ? notes.map(([id, note]) => `<li><div><b>${escapeHtml(note.module)}</b><br>${escapeHtml(note.text)}<small>${new Date(note.createdAt).toLocaleDateString("pt-BR")}</small><button type="button" class="note-delete" data-note-id="${escapeHtml(id)}" title="Excluir anotação" aria-label="Excluir anotação">&#128465;</button></div></li>`).join("") : "<li>Nenhuma anotação salva ainda.</li>";
});

$("#notes-list").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-note-id]");
  if (!button || !window.confirm("Excluir esta anotação?")) return;
  button.disabled = true;
  await set(ref(db, `notes/${user.uid}/${button.dataset.noteId}`), null);
});
document.body.classList.remove("loading");
