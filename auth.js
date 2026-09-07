import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, browserLocalPersistence, setPersistence, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";
import { getSelectedCourseId, renderCoursePicker } from "./course-catalog.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
const $ = (selector) => document.querySelector(selector);
const status = $("#status");
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

function showMessage(text, error = false) { if (!status) return; status.textContent = text; status.style.color = error ? "#a02121" : ""; }
function authMessage(error) {
  console.error("Firebase:", error.code, error.message);
  const code = error?.code || "";
  const detail = String(error?.message || "").toLowerCase();
  if (code === "PERMISSION_DENIED" || detail.includes("permission denied")) return "O Firebase recusou o acesso ao banco. Publique o arquivo firebase.rules.json no Realtime Database.";
  const messages = {
    "auth/configuration-not-found": "A configuração do Firebase Authentication está inconsistente. Verifique o projeto no Firebase Console e habilite o Google em Authentication.",
    "auth/project-not-found": "O projeto Firebase informado não foi encontrado. Verifique se o app está apontando para o projeto correto.",
    "auth/invalid-api-key": "A chave da API do Firebase está inválida ou restrita. Verifique as configurações do Google Cloud / Firebase.",
    "auth/operation-not-allowed": "O login com Google ainda não foi habilitado no Firebase.",
    "auth/popup-closed-by-user": "A janela de login foi fechada.",
    "auth/popup-blocked": "A janela de login foi bloqueada pelo navegador. Permita pop-ups para continuar.",
    "auth/network-request-failed": "Erro de conexão com a rede. Verifique sua conexão com a internet.",
    "auth/unauthorized-domain": "Este domínio não está autorizado no Firebase Authentication."
  };
  return messages[code] || "Não foi possível autenticar. Tente novamente.";
}
async function isEnrolled(uid) { return (await get(ref(db, `enrollments/${uid}`))).val() === true; }
async function hasAcceptedTerms(uid) { return (await get(ref(db, `acceptances/${uid}`))).exists(); }
async function enroll(user) { await Promise.all([set(ref(db, `enrollments/${user.uid}`), true), set(ref(db, `users/${user.uid}`), { name: user.displayName || "", email: user.email || "", createdAt: Date.now() })]); }
async function enterIfEnrolled(user) { if (!(await isEnrolled(user.uid))) await enroll(user); localStorage.setItem("formacaoSocialistaUser", JSON.stringify({ uid: user.uid, name: user.displayName || user.email || "Usuário", updatedAt: Date.now() })); location.assign(await hasAcceptedTerms(user.uid) ? "modulo-1.html" : "aceite.html"); }

if ($("#google-login")) {
  const loginCard = $(".login-card");
  const coursePicker = document.createElement("div");
  setPersistence(auth, browserLocalPersistence);
  const loginBtn = $("#google-login");
  const stepLabel = $("#step-label");
  const loginTitle = $("#login-title");
  const loginDescription = $("#login-description");
  let currentUser = null;
  let isAuthenticating = false;

  const showCourseSelection = (user) => {
    currentUser = user;
    isAuthenticating = false;
    renderCoursePicker(coursePicker, () => {
      loginBtn.disabled = false;
      showMessage("Formação selecionada. Clique em começar.");
    });
    if (!coursePicker.parentElement) loginCard.insertBefore(coursePicker, loginBtn);
    stepLabel.textContent = "PASSO 2 DE 2";
    loginTitle.textContent = "Escolha sua formação";
    loginDescription.textContent = "Selecione uma formação para começar.";
    loginBtn.disabled = !getSelectedCourseId();
    loginBtn.textContent = "Começar formação";
    showMessage("Login realizado. Escolha uma formação para continuar.");
  };

  const startSelectedCourse = async () => {
    if (!currentUser || isAuthenticating) return;
    if (!getSelectedCourseId()) {
      showMessage("Selecione uma formação para continuar.", true);
      return;
    }
    isAuthenticating = true;
    loginBtn.disabled = true;
    loginBtn.textContent = "Abrindo formação...";
    showMessage("Carregando sua formação...");
    try {
      await enterIfEnrolled(currentUser);
    } catch (error) {
      isAuthenticating = false;
      loginBtn.disabled = false;
      loginBtn.textContent = "Começar formação";
      showMessage(authMessage(error), true);
    }
  };

  loginBtn.addEventListener("click", async () => {
    if (currentUser) {
      await startSelectedCourse();
      return;
    }
    if (isAuthenticating) return;
    isAuthenticating = true;
    loginBtn.disabled = true;
    loginBtn.textContent = "Conectando ao Google...";
    showMessage("Abrindo janela de login...");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      isAuthenticating = false;
      loginBtn.disabled = false;
      loginBtn.textContent = "Aperte aqui para entrar";
      showMessage(authMessage(error), true);
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      showCourseSelection(user);
    } else {
      currentUser = null;
      localStorage.removeItem("formacaoSocialistaUser");
    }
  });
}
export async function requireEnrollment() { const user = await new Promise((resolve) => onAuthStateChanged(auth, resolve, { once:true })); if (!user || !(await isEnrolled(user.uid))) { localStorage.removeItem("formacaoSocialistaUser"); if (user) await signOut(auth); location.replace("index.html"); throw new Error("Acesso não autorizado"); } if (!(await hasAcceptedTerms(user.uid))) { location.replace("aceite.html"); throw new Error("Aceite pendente"); } localStorage.setItem("formacaoSocialistaUser", JSON.stringify({ uid:user.uid, name:user.displayName || user.email, updatedAt:Date.now() })); return user; }
export async function requireUser() { const user = await new Promise((resolve) => onAuthStateChanged(auth, resolve, { once:true })); if (!user) { location.replace("index.html"); throw new Error("Autenticação necessária"); } return user; }
export async function leaveCourse() { localStorage.removeItem("formacaoSocialistaUser"); await signOut(auth); location.assign("index.html"); }
