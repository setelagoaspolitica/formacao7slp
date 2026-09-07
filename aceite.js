import { requireUser, leaveCourse, db } from "./auth.js";
import { ref, get, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { courseInfo, modules } from "./courses/formacao-centro-esquerda/course.js";

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => { const element = document.createElement("div"); element.textContent = value; return element.innerHTML; };
const user = await requireUser();
document.title = `Termo de aceite | ${courseInfo.shortTitle}`;
document.querySelector(".brand").textContent = courseInfo.shortTitle;
const profile = (await get(ref(db, `users/${user.uid}`))).val() || {};
const name = user.displayName || profile.name || "Não informado";
const email = user.email || profile.email || "Não informado";

$("#member-name").textContent = name;
$("#profile-name").textContent = name;
$("#profile-email").textContent = email;
$("#logout").addEventListener("click", leaveCourse);
$("#course-map").innerHTML = modules.map(([title, description], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><div><b>${escapeHtml(title)}</b><small>${escapeHtml(description)}</small></div></article>`).join("");

$("#acceptance-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = $("#acceptance-status");
  const submit = $("#acceptance-submit");
  submit.disabled = true;
  status.textContent = "Registrando seu aceite…";
  try {
    await set(ref(db, `acceptances/${user.uid}`), { name, email, acceptedAt: Date.now(), version: "2026-09-07" });
    status.textContent = "Aceite registrado. Abrindo sua formação…";
    location.assign("modulo-1.html");
  } catch (error) {
    console.error(error);
    submit.disabled = false;
    status.textContent = "Não foi possível registrar o aceite. Tente novamente.";
  }
});

document.body.classList.remove("loading");
