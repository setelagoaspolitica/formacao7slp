import { requireEnrollment, leaveCourse, db } from "./auth.js";
import { ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { courseInfo, modules, moduleQuestions, moduleStudyGuides, loadMediaLinks, mediaFrameUrl } from "./courses/formacao-centro-esquerda/course.js";
import { getGamificationState } from "./gamification.js";

const moduleNumber = Number(document.body.dataset.module);
const [title, description, sourceTitle, sourceUrl] = modules[moduleNumber - 1];
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => { const element = document.createElement("div"); element.textContent = value; return element.innerHTML; };
const playerId = (id) => `player-${id.replace(/[^a-z0-9_-]/gi, "-")}`;

try {
  const user = await requireEnrollment();
  document.title = `${courseInfo.shortTitle} | Módulo ${moduleNumber}`;
  document.querySelector(".brand").textContent = courseInfo.shortTitle;
  $("#member-name").textContent = user.displayName || user.email;
  $("#module-number").textContent = String(moduleNumber).padStart(2, "0");
  $("#module-title").textContent = title;
  $("#module-description").textContent = description;
  $("#source-link").href = sourceUrl;
  $("#source-link").textContent = `Abrir o material: ${sourceTitle} (+10 XP)`;
  $("#progress-label").textContent = `Módulo ${moduleNumber} de ${modules.length}`;
  $("#previous").href = moduleNumber > 1 ? `modulo-${moduleNumber - 1}.html` : "#";
  $("#previous").classList.toggle("hidden", moduleNumber === 1);
  $("#next").href = moduleNumber < modules.length ? `modulo-${moduleNumber + 1}.html` : "curso.html";
  $("#next").textContent = moduleNumber < modules.length ? "Bora para o próximo módulo" : "Ir para a prova final";
  $("#next").setAttribute("aria-disabled", "true");
  $("#next").title = "Complete as etapas para seguir em frente";
  $("#course-nav").innerHTML = modules.map(([name], index) => `<a data-module="${index + 1}" class="${index + 1 === moduleNumber ? "active" : ""}" href="modulo-${index + 1}.html">${String(index + 1).padStart(2, "0")}. ${name}</a>`).join("");
  $("#course-nav").insertAdjacentHTML("beforeend", `<section class="sidebar-notebook"><p class="eyebrow">Meu caderno</p><h2>Anotar neste módulo</h2><form id="sidebar-note-form"><textarea id="sidebar-note-text" maxlength="2000" required placeholder="Escreva uma ideia ou dúvida..."></textarea><button type="submit">Salvar nota</button><p id="sidebar-note-status" role="status"></p></form><ul id="sidebar-notes-list" class="sidebar-notes"></ul><a class="sidebar-notebook-link" href="perfil.html#notas">Ver todas as anotações</a></section>`);
  $("#logout").insertAdjacentHTML("beforebegin", '<a class="secondary button profile-button" href="perfil.html#notas">Caderno</a><a class="secondary button profile-button" href="perfil.html">Perfil</a>');
  $("#logout").addEventListener("click", leaveCourse);
  $("#sidebar-note-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = $("#sidebar-note-text").value.trim();
    if (!text) return;
    const submit = event.target.querySelector("button");
    submit.disabled = true;
    try {
      await set(push(ref(db, `notes/${user.uid}`)), { module: `Módulo ${moduleNumber} — ${title}`, text, createdAt: Date.now() });
      $("#sidebar-note-text").value = "";
      $("#sidebar-note-status").textContent = "Salvo no caderno.";
    } catch {
      $("#sidebar-note-status").textContent = "Não deu para salvar agora.";
    } finally { submit.disabled = false; }
  });
  onValue(ref(db, `notes/${user.uid}`), (snapshot) => {
    const notes = Object.entries(snapshot.val() || {}).filter(([, note]) => note.module?.startsWith(`Módulo ${moduleNumber} —`)).sort(([, a], [, b]) => b.createdAt - a.createdAt).slice(0, 3);
    $("#sidebar-notes-list").innerHTML = notes.map(([id, note]) => `<li><span>${escapeHtml(note.text)}</span><button type="button" class="note-delete" data-note-id="${escapeHtml(id)}" title="Excluir anotação" aria-label="Excluir anotação">&#128465;</button></li>`).join("");
  });
  $("#sidebar-notes-list").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-note-id]");
    if (!button || !window.confirm("Excluir esta anotação?")) return;
    button.disabled = true;
    await set(ref(db, `notes/${user.uid}/${button.dataset.noteId}`), null);
  });

  const allMedia = await loadMediaLinks("./courses/formacao-centro-esquerda/links.txt");
  const media = allMedia.filter((_, index) => index % modules.length === moduleNumber - 1);
  const questions = moduleQuestions[moduleNumber - 1];
  const [objective, summary, examPoints, references] = moduleStudyGuides[moduleNumber - 1];
  const quizId = `module-quiz-${moduleNumber}`;
  const contentIds = [`reading-${moduleNumber}`, ...media.map(([, , , id]) => id)];
  const requiredIds = [...contentIds, quizId];
  const quizMarkup = `<section class="module-quiz"><div class="quiz-heading"><p class="eyebrow">Prova do módulo</p><h2>Agora, responda sobre o que estudou</h2><p id="quiz-lock-message">Consuma a leitura e as mídias acima para liberar esta prova.</p></div><form id="module-quiz-form" hidden>${questions.map(([question, options], questionIndex) => `<fieldset><legend>${questionIndex + 1}. ${escapeHtml(question)}</legend>${options.map(([option], optionIndex) => `<label><input type="radio" name="q${questionIndex + 1}" value="${optionIndex}" required> ${escapeHtml(option)}</label>`).join("")}</fieldset>`).join("")}<button type="submit">Corrigir prova</button><p id="module-quiz-feedback" role="status"></p></form></section>`;
  const studyGuideMarkup = `<section class="study-guide"><div class="study-guide-objective"><p class="eyebrow">Objetivo do módulo</p><p>${escapeHtml(objective)}</p><p class="eyebrow">Resumo para estudar</p><p>${escapeHtml(summary)}</p></div><div><p class="eyebrow">Dica de prova</p><ul>${examPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul><small>As questões serão respondidas com estes pontos e com as referências abaixo.</small><p class="eyebrow study-sources-title">Links e localização dos trechos</p><ul class="study-sources">${references.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${escapeHtml(label)}</a></li>`).join("")}</ul></div></section>`;
  $(".module-content").insertAdjacentHTML("beforeend", `<section class="module-mission"><div class="mission-heading"><div><p class="eyebrow">Desafio do módulo</p><h2>Complete sua trilha de aprendizado</h2><p>Leia o material-base e abra cada vídeo ou podcast. A prova só será liberada depois que o consumo for registrado.</p></div><div class="mission-reward"><b>+20 XP</b><span>medalha do módulo</span></div></div>${studyGuideMarkup}<div class="mission-progress"><div><span>Progresso da missão</span><strong id="mission-status">0/${requiredIds.length}</strong></div><progress id="mission-progress" max="${requiredIds.length}" value="0"></progress></div><div class="media-grid">${media.map(([type, mediaTitle, url, id]) => {
    const frameUrl = mediaFrameUrl(type, url);
    const actionLabel = type === "podcast" ? "Ouvir episódio" : "Assistir vídeo";
    const player = `<div class="player-preview"><iframe class="video-frame" src="${escapeHtml(frameUrl)}" title="${escapeHtml(mediaTitle)}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe><button class="player-open" data-open-player="${escapeHtml(id)}" data-player-url="${escapeHtml(frameUrl)}" data-player-title="${escapeHtml(mediaTitle)}" aria-label="${actionLabel}: ${escapeHtml(mediaTitle)}">${actionLabel}</button></div>`;
    return `<article class="media-card">${player}<h3>${escapeHtml(mediaTitle)}</h3><small id="watch-${playerId(id)}" class="watch-status">${type === "podcast" ? "Ouça o episódio e marque como concluído depois." : "Assista ao vídeo e marque como concluído depois."}</small></article>`;
  }).join("") || `<div class="media-empty"><strong>Essa etapa está focada na leitura e na prova.</strong><span>Não há mídia obrigatória aqui. Quando terminar, siga para a verificação.</span></div>`}</div>${quizMarkup}<div class="mission-footer"><small>Leitura: +10 XP · Cada mídia aberta: +10 XP · Questionário: etapa obrigatória</small><button id="complete-module" class="mission-complete" disabled>Concluir missão <span>+20 XP</span></button></div><div id="release-notice" class="release-notice" hidden role="status"></div></section><aside class="xp-panel"><b id="xp-value">0 XP</b><span id="level-value">Nível 1 — Iniciante</span><span id="badge-value">0 de ${modules.length} medalhas</span></aside>`);

  $(".module-content").insertAdjacentHTML("beforeend", `<div id="media-modal" class="media-modal" hidden><div class="media-modal-backdrop" data-close-media></div><section class="media-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="media-modal-title"><button class="media-modal-close" data-close-media aria-label="Fechar player">Fechar</button><div id="media-modal-content"></div><h2 id="media-modal-title"></h2><p id="media-modal-time">Player aberto há 0s</p><button id="media-modal-complete" class="button" disabled>Marcar como concluído</button></section></div>`);

  let records = {};
  let openedMediaId = null;
  let openedMediaTimer = null;
  let canAdvance = false;
  $("#course-nav").querySelectorAll("a[data-module]").forEach((link) => link.addEventListener("click", (event) => {
    if (link.getAttribute("aria-disabled") === "true") event.preventDefault();
  }));
  async function completeMedia(id) {
    if (records[id]) return;
    await set(ref(db, `progress/${user.uid}/${id}`), { completedAt:Date.now(), module:moduleNumber, opened:true });
  }
  function showWatch(id, percent, complete = false) { const status = $(`#watch-${playerId(id)}`); if (status) status.textContent = complete ? "Concluído e registrado ✓" : `Reprodução: ${Math.min(100, Math.floor(percent))}%`; }
  function refreshGamification(nextRecords) {
    records = nextRecords;
    const completedRequired = requiredIds.filter((id) => records[id]).length;
    const missionDone = Boolean(records[`module-${moduleNumber}`] && records[quizId]);
    canAdvance = missionDone;
    const previousModulesDone = modules.slice(0, moduleNumber - 1).every((_, index) => records[`module-${index + 1}`] && records[`module-quiz-${index + 1}`]);
    if (!previousModulesDone) { location.replace(`modulo-${moduleNumber - 1}.html`); return; }
    $("#mission-status").textContent = `${completedRequired}/${requiredIds.length} etapas concluídas`;
    $("#mission-progress").value = completedRequired;
    const contentConsumed = contentIds.every((id) => records[id]);
    $("#module-quiz-form").hidden = !contentConsumed;
    $("#quiz-lock-message").hidden = contentConsumed;
    $("#complete-module").disabled = completedRequired !== requiredIds.length || missionDone;
    $("#complete-module").textContent = missionDone ? "Missão concluída ✓" : "Concluir missão +20 XP";
    if (missionDone) {
      const releaseNotice = $("#release-notice");
      releaseNotice.hidden = false;
      releaseNotice.innerHTML = moduleNumber < modules.length ? `<strong>Boa! O próximo módulo está liberado.</strong> <a href="modulo-${moduleNumber + 1}.html">Bora para o módulo ${moduleNumber + 1}</a>` : `<strong>Boa, você terminou os módulos!</strong><p>Quer ir agora para a prova final?</p><a class="button" href="curso.html">Sim, bora para a prova</a> <button type="button" class="secondary" data-dismiss-release>Agora não</button>`;
      const dismissRelease = releaseNotice.querySelector("[data-dismiss-release]");
      if (dismissRelease) dismissRelease.addEventListener("click", () => { releaseNotice.hidden = true; });
    }
    $("#next").setAttribute("aria-disabled", String(!missionDone));
    $("#next").classList.toggle("locked", !missionDone);
    $("#next").title = missionDone ? "Avançar" : "Conclua todas as etapas para avançar";
    $("#course-nav").querySelectorAll("a[data-module]").forEach((link) => {
      const targetModule = Number(link.dataset.module);
      const completed = Boolean(records[`module-${targetModule}`] && records[`module-quiz-${targetModule}`]);
      const unlocked = targetModule === moduleNumber || completed || (targetModule === moduleNumber + 1 && missionDone);
      link.classList.toggle("locked", !unlocked);
      link.classList.toggle("completed", completed);
      link.setAttribute("aria-disabled", String(!unlocked));
      if (completed && !link.textContent.includes("✓")) link.textContent = `${String(targetModule).padStart(2, "0")}. ${modules[targetModule - 1][0]} ✓`;
    });
    media.forEach(([, , , id]) => { if (records[id]) showWatch(id, 70, true); });
    const { xp, levelNumber, label, badgeText } = getGamificationState(records, modules.length);
    $("#xp-value").textContent = `${xp} XP`;
    $("#level-value").textContent = `Nível ${levelNumber} — ${label}`;
    $("#badge-value").textContent = badgeText;
  }
  function closeMediaModal() { $("#media-modal").hidden = true; document.body.classList.remove("modal-open"); if (openedMediaTimer) window.clearInterval(openedMediaTimer); openedMediaTimer = null; }
  document.querySelectorAll("[data-open-player]").forEach((button) => button.addEventListener("click", () => {
    openedMediaId = button.dataset.openPlayer;
    $("#media-modal-title").textContent = button.dataset.playerTitle;
    $("#media-modal-content").innerHTML = `<iframe class="modal-player" src="${button.dataset.playerUrl}" title="${escapeHtml(button.dataset.playerTitle)}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    $("#media-modal").hidden = false;
    document.body.classList.add("modal-open");
    $("#media-modal-complete").disabled = Boolean(records[openedMediaId]);
    $("#media-modal-complete").textContent = records[openedMediaId] ? "Concluído ✓" : "Marcar como concluído";
    const openedAt = Date.now();
    const updateTime = () => $("#media-modal-time").textContent = `Player aberto há ${Math.floor((Date.now() - openedAt) / 1000)}s`;
    updateTime();
    if (openedMediaTimer) window.clearInterval(openedMediaTimer);
    openedMediaTimer = window.setInterval(updateTime, 1000);
  }));
  document.querySelectorAll("[data-close-media]").forEach((element) => element.addEventListener("click", closeMediaModal));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !$("#media-modal").hidden) closeMediaModal(); });
  $("#media-modal-complete").addEventListener("click", async () => { if (!openedMediaId || records[openedMediaId]) return; await completeMedia(openedMediaId); showWatch(openedMediaId, 0, true); $("#media-modal-complete").disabled = true; $("#media-modal-complete").textContent = "Concluído ✓"; });
  onValue(ref(db, `progress/${user.uid}`), (snapshot) => refreshGamification(snapshot.val() || {}));
  $("#source-link").addEventListener("click", () => set(ref(db, `progress/${user.uid}/reading-${moduleNumber}`), { completedAt:Date.now(), module:moduleNumber }));
  $("#complete-module").addEventListener("click", async () => { await set(ref(db, `progress/${user.uid}/module-${moduleNumber}`), { completedAt:Date.now(), module:moduleNumber }); });
  $("#module-quiz-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const answers = Object.fromEntries(new FormData(event.target).entries());
    const hits = questions.filter(([, options], index) => options[Number(answers[`q${index + 1}`])]?.[1]).length;
    await set(ref(db, `answers/${user.uid}/module-${moduleNumber}`), { answers, hits, submittedAt:Date.now() });
    if (hits < 2) {
      $("#module-quiz-feedback").textContent = `Você acertou ${hits} de 3. Revise o material e tente novamente; são necessários 2 acertos.`;
      return;
    }
    await set(ref(db, `progress/${user.uid}/${quizId}`), { completedAt:Date.now(), module:moduleNumber, hits });
    $("#module-quiz-feedback").textContent = `Você acertou ${hits} de 3. Verificação concluída ✓`;
  });
  $("#next").addEventListener("click", (event) => { if (!canAdvance) { event.preventDefault(); $("#mission-status").textContent = "Conclua todas as etapas para avançar"; } });

  document.body.classList.remove("loading");
} catch (error) { console.warn(error); }
