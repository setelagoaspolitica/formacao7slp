export const courseCatalog = [
  {
    id: "formacao-centro-esquerda",
    category: "Formação Política",
    title: "Formação Centro-Esquerda",
    subtitle: "Curso da plataforma formação7slp",
    description: "Curso popular sobre trabalho, comunidade, democracia e serviço público.",
    status: "Disponível",
    active: true
  },
  {
    id: "participacao-cidada",
    category: "Cidadania e Comunidade",
    title: "Participação Cidadã",
    subtitle: "Formação para ação e engajamento comunitário",
    description: "Curso para fortalecer escuta, organização comunitária, democracia local e propostas de transformação no território.",
    status: "Disponível",
    active: true
  },
  {
    id: "vereador-suplente",
    category: "Formação Política",
    title: "Vereador e Suplente",
    subtitle: "Formação para atuação política e responsabilidade pública",
    description: "Curso para entender mandato, representação popular, atuação parlamentar e responsabilidade com a cidade.",
    status: "Disponível",
    active: true
  },
  {
    id: "cidadania-e-participacao",
    category: "Cidadania e Comunidade",
    title: "Cidadania e Participação",
    subtitle: "Formação complementar",
    description: "Fortalece a escuta, a participação e a ação cidadã no território.",
    status: "Disponível",
    active: true
  },
  {
    id: "democracia-no-bairro",
    category: "Formação Política",
    title: "Democracia no Bairro",
    subtitle: "Curso fictício de participação cidadã",
    description: "Aprenda a transformar problemas do bairro em propostas coletivas.",
    status: "Em breve",
    active: false
  },
  {
    id: "juventude-e-participacao",
    category: "Cidadania e Comunidade",
    title: "Juventude e Participação",
    subtitle: "Curso fictício para novas lideranças",
    description: "Ideias e práticas para jovens participarem das decisões da comunidade.",
    status: "Em breve",
    active: false
  },
  {
    id: "gestao-publica-na-pratica",
    category: "Gestão Pública",
    title: "Gestão Pública na Prática",
    subtitle: "Curso fictício sobre serviço público",
    description: "Conheça os caminhos para planejar ações públicas com responsabilidade.",
    status: "Em breve",
    active: false
  }
];

const enrolledCoursesKey = "enrolledCourseIds";

export function getSelectedCourseId() {
  return localStorage.getItem("selectedCourseId");
}

function getEnrolledCourseIds() {
  let enrolledIds = [];
  try {
    enrolledIds = JSON.parse(localStorage.getItem(enrolledCoursesKey) || "[]");
  } catch {
    enrolledIds = [];
  }
  const selectedId = getSelectedCourseId();
  if (selectedId && !enrolledIds.includes(selectedId)) enrolledIds.push(selectedId);
  localStorage.setItem(enrolledCoursesKey, JSON.stringify(enrolledIds));
  return enrolledIds;
}

function courseMarkup(course, selectedId, enrolled = false) {
  const option = `<button type="button" class="course-option ${course.id === selectedId ? "selected" : ""}" data-course-id="${course.id}" ${course.active ? "" : "disabled"}><strong>${course.title}</strong><span>${course.subtitle}</span><small>${course.description}</small><em>${course.status}</em></button>`;
  return enrolled ? `<div class="enrolled-course">${option}<button type="button" class="course-stop" data-stop-course-id="${course.id}">Parar esta formação</button></div>` : option;
}

export function renderCoursePicker(container, onSelect, onStop) {
  const enrolledIds = getEnrolledCourseIds();
  const selectedId = getSelectedCourseId();
  const enrolledCourses = courseCatalog.filter((course) => enrolledIds.includes(course.id));
  const availableCourses = courseCatalog.filter((course) => !enrolledIds.includes(course.id));
  const addPanelOpen = enrolledCourses.length === 0;
  container.innerHTML = `<div class="course-picker"><p class="eyebrow">Minhas formações</p><div class="enrolled-courses">${enrolledCourses.length ? enrolledCourses.map((course) => courseMarkup(course, selectedId, true)).join("") : `<div class="course-empty"><strong>Você ainda não está cursando uma formação.</strong><span>Adicione uma formação para começar seu percurso.</span></div>`}</div><button type="button" class="text-button course-add-toggle" aria-expanded="${addPanelOpen}">${addPanelOpen ? "Escolher uma formação" : "+ Adicionar formação"}</button><div class="course-add-panel" ${addPanelOpen ? "" : "hidden"}><p class="course-add-title">Outras formações</p><div class="course-options">${availableCourses.length ? availableCourses.map((course) => courseMarkup(course, selectedId)).join("") : "<span>Você já está cursando todas as formações disponíveis.</span>"}</div></div></div>`;
  const toggle = container.querySelector(".course-add-toggle");
  const addPanel = container.querySelector(".course-add-panel");
  toggle.addEventListener("click", () => {
    const isOpen = addPanel.hidden;
    addPanel.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  container.querySelectorAll("[data-course-id]:not(:disabled)").forEach((button) => button.addEventListener("click", () => {
    const courseId = button.dataset.courseId;
    const updatedIds = getEnrolledCourseIds();
    if (!updatedIds.includes(courseId)) updatedIds.push(courseId);
    localStorage.setItem(enrolledCoursesKey, JSON.stringify(updatedIds));
    localStorage.setItem("selectedCourseId", courseId);
    renderCoursePicker(container, onSelect, onStop);
    onSelect?.(courseId);
  }));
  container.querySelectorAll("[data-stop-course-id]").forEach((button) => button.addEventListener("click", async () => {
    const courseId = button.dataset.stopCourseId;
    const course = courseCatalog.find((item) => item.id === courseId);
    if (!window.confirm(`Parar a formação “${course.title}”? Ela sairá da sua lista e todo o progresso desta formação será zerado.`)) return;
    const remainingIds = getEnrolledCourseIds().filter((id) => id !== courseId);
    localStorage.setItem(enrolledCoursesKey, JSON.stringify(remainingIds));
    if (getSelectedCourseId() === courseId) {
      const nextCourse = courseCatalog.find((item) => remainingIds.includes(item.id) && item.active);
      if (nextCourse) localStorage.setItem("selectedCourseId", nextCourse.id);
      else localStorage.removeItem("selectedCourseId");
    }
    await onStop?.(courseId);
    renderCoursePicker(container, onSelect, onStop);
  }));
}
