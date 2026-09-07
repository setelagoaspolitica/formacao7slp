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

export function getSelectedCourseId() {
  return localStorage.getItem("selectedCourseId");
}

export function renderCoursePicker(container, onSelect) {
  const selectedId = getSelectedCourseId();
  const categories = courseCatalog.reduce((groups, course) => {
    const category = course.category || "Outras formações";
    if (!groups[category]) groups[category] = [];
    groups[category].push(course);
    return groups;
  }, {});
  container.innerHTML = `<div class="course-picker"><p class="eyebrow">Cursos da plataforma</p>${Object.entries(categories).map(([category, courses], index) => `<details class="course-category" ${index === 0 ? "open" : ""}><summary>${category}<span>${courses.length} curso${courses.length === 1 ? "" : "s"}</span></summary><div class="course-options">${courses.map((course) => `<button type="button" class="course-option ${course.id === selectedId ? "selected" : ""}" data-course-id="${course.id}" ${course.active ? "" : "disabled"}><strong>${course.title}</strong><span>${course.subtitle}</span><small>${course.description}</small><em>${course.status}</em></button>`).join("")}</div></details>`).join("")}</div>`;
  container.querySelectorAll("[data-course-id]").forEach((button) => button.addEventListener("click", () => {
    localStorage.setItem("selectedCourseId", button.dataset.courseId);
    container.querySelectorAll("[data-course-id]").forEach((option) => option.classList.toggle("selected", option === button));
    onSelect?.(button.dataset.courseId);
  }));
}
