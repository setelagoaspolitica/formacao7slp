export const courseInfo = {
  title: "Participação Cidadã",
  subtitle: "Formação para ação e engajamento comunitário",
  shortTitle: "Participação Cidadã",
  description: "Curso que articula cidadania, escuta, organização comunitária e propostas de transformação local.",
  duration: "4 semanas"
};

export const modules = [
  ["Cidadania e território", "Entender como a cidadania se expressa no espaço da comunidade e no cotidiano do bairro.", "Material do módulo 1", "./courses/participacao-cidada/pdf/aula-01.pdf"],
  ["Escuta e participação", "Reconhecer a importância de ouvir a população e organizar a ação coletiva.", "Material do módulo 2", "./courses/participacao-cidada/pdf/aula-02.pdf"],
  ["Democracia local", "Compreender os mecanismos democráticos de participação, controle e responsabilidade pública.", "Material do módulo 3", "./courses/participacao-cidada/pdf/aula-03.pdf"],
  ["Propostas para o bairro", "Transformar demandas reais em ações concretas com planejamento e acompanhamento.", "Material do módulo 4", "./courses/participacao-cidada/pdf/aula-04.pdf"]
];

export const moduleStudyGuides = [
  [
    "Entender o papel da comunidade na vida pública.",
    "A cidadania não se reduz a votar. Ela também aparece na escuta, na organização e na presença com responsabilidade no bairro.",
    ["Território", "Convivência", "Responsabilidade coletiva"],
    [["Cidadania e comunidade", "https://example.com/territorio#1"]]
  ],
  [
    "Reconhecer que participar exige escuta ativa.",
    "Quando a população fala e é ouvida, é mais fácil identificar necessidades reais e coordenar ações coletivas.",
    ["Escuta", "Representatividade", "Diálogo"],
    [["Escuta e participação comunitária", "https://example.com/escuta#1"]]
  ],
  [
    "Compreender a democracia local como processo contínuo.",
    "A participação e o controle social são fundamentais para garantir que decisões públicas atendam ao bem comum.",
    ["Democracia", "Transparência", "Controle social"],
    [["Democracia local e controle social", "https://example.com/democracia#1"]]
  ],
  [
    "Transformar dificuldades em propostas viáveis.",
    "A ação cidadã ganha força quando a proposta é clara, organizada, responsável e acompanhada de resultados.",
    ["Planejamento", "Ação", "Acompanhamento"],
    [["Propostas para o bairro", "https://example.com/propostas#1"]]
  ]
];

export const finalQuiz = [
  {
    question: "O que melhor define a participação cidadã no território?",
    options: [
      { label: "Ação coletiva para ouvir, organizar e resolver problemas reais da comunidade.", value: "a" },
      { label: "Apenas acompanhar decisões vindas de fora.", value: "b" },
      { label: "Manter a população distante das escolhas locais.", value: "c" }
    ],
    correct: "a"
  },
  {
    question: "Qual é o papel central da escuta comunitária?",
    options: [
      { label: "Identificar demandas reais antes de propor qualquer solução.", value: "a" },
      { label: "Eliminar a necessidade de diálogo coletivo.", value: "b" }
    ],
    correct: "a"
  },
  {
    question: "Por que democracia local depende de transparência?",
    options: [
      { label: "Porque permite acompanhar decisões e cobrar resultados com responsabilidade.", value: "a" },
      { label: "Porque reduz toda a participação ao silêncio.", value: "b" }
    ],
    correct: "a"
  }
];

export const moduleQuestions = [
  [
    ["O que caracteriza a cidadania ativa?", [["Participar, escutar e agir junto com a comunidade.", true], ["Ficar distante das decisões públicas.", false], ["Depender só do Estado para tudo.", false]]],
    ["Por que o território importa para a cidadania?", [["Porque é onde as pessoas convivem, resolvem problemas e organizam ações.", true], ["Porque não afeta a vida pública.", false], ["Porque substitui a democracia.", false]]],
    ["Qual é a relação entre comunidade e participação?", [["A comunidade se organiza para transformar demandas em ação.", true], ["A comunidade não precisa ser ouvida.", false], ["A participação é dispensável.", false]]]
  ],
  [
    ["Qual é o papel da escuta na participação cidadã?", [["Identificar problemas reais e prioridades da população.", true], ["Substituir a necessidade de ação.", false], ["Impedir o debate público.", false]]],
    ["O que é representatividade?", [["A capacidade de a comunidade ser reconhecida e ter voz nas decisões.", true], ["Só o discurso de líderes sem ouvir a população.", false], ["Um conceito distante da realidade cotidiana.", false]]],
    ["Por que o diálogo é essencial?", [["Porque ajuda a construir consenso e soluções compartilhadas.", true], ["Porque impede qualquer conflito.", false], ["Porque não exige organização coletiva.", false]]]
  ],
  [
    ["O que a democracia local exige?", [["Participação, transparência e responsabilidade dos atores públicos.", true], ["Apenas ordens e autoridade sem debate.", false], ["Falta de acompanhamento das ações.", false]]],
    ["O que é controle social?", [["A participação da comunidade para acompanhar e cobrar decisões.", true], ["A ausência de fiscalização.", false], ["Um processo restrito à elite.", false]]],
    ["Por que a transparência é importante?", [["Porque permite entender decisões e avaliar resultados.", true], ["Porque torna tudo invisível.", false], ["Porque impede a participação da população.", false]]]
  ],
  [
    ["Qual é o primeiro passo para uma proposta útil?", [["Diagnosticar o problema e ouvir quem vive a situação.", true], ["Escolher uma solução sem informação.", false], ["Trabalhar em segredo.", false]]],
    ["O que uma ação cidadã precisa ter?", [["Objetivo, responsabilidade, organização e acompanhamento.", true], ["Só palavras e discurso sem execução.", false], ["Apelo emocional sem ações.", false]]],
    ["Como saber se uma proposta está funcionando?", [["Avaliando resultados e ajustando o percurso.", true], ["Sem medir nada depois.", false], ["Ignorando a comunidade.", false]]]
  ]
];

export function mediaFrameUrl(type, url) {
  try {
    const parsed = new URL(url);
    if (type === "video" && parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
    }
    if (type === "podcast" && parsed.hostname.includes("spotify.com")) {
      const match = parsed.pathname.match(/\/episode\/([^/]+)/);
      return match ? `https://open.spotify.com/embed/episode/${encodeURIComponent(match[1])}` : null;
    }
  } catch { return null; }
  return null;
}

export async function loadMediaLinks(linksPath = "./links.txt") {
  const text = await fetch(linksPath).then((response) => response.ok ? response.text() : "");
  const list = [];
  let sectionType = "";

  text.split(/\r?\n/).forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) return;
    if (/^#{1,6}\s*spotify/i.test(line)) { sectionType = "podcast"; return; }
    if (/^#{1,6}\s*youtube/i.test(line)) { sectionType = "video"; return; }

    const pipe = line.split("|").map((part) => part.trim());
    if (pipe.length >= 3 && ["video", "podcast"].includes(pipe[0]) && /^https?:\/\//.test(pipe[2])) {
      list.push([pipe[0], pipe[1], pipe[2], `${pipe[0]}-${index + 1}`]);
      return;
    }

    const match = line.match(/^[-*]\s+(.+?)\s+—\s+\[https?:\/\/[^\]]+\]\((https?:\/\/[^)]+)\)$/);
    if (match && sectionType) {
      list.push([sectionType, match[1], match[2], `${sectionType}-${index + 1}`]);
    }
  });

  return list;
}
