export const courseInfo = {
  title: "Cidadania e Participação",
  subtitle: "Formação complementar",
  shortTitle: "Cidadania e Participação",
  description: "A formação busca fortalecer a escuta, a participação e a responsabilidade cívica no cotidiano da comunidade.",
  duration: "4 semanas"
};

export const modules = [
  ["Participação e território", "Entender como a comunidade organiza demandas, escuta e ação coletiva."],
  ["Democracia no cotidiano", "Reconhecer a importância do diálogo, da transparência e do compromisso público."],
  ["Cuidado comunitário", "Identificar formas concretas de agir com responsabilidade para o bem comum."],
  ["Propostas e ações", "Transformar problemas do bairro em soluções viáveis e compartilhadas."]
];

export const moduleStudyGuides = [
  [
    "Entender a importância da participação comunitária no cotidiano.",
    "A cidadania se manifesta quando a comunidade escuta, conversa e organiza ações para melhorar a vida comum.",
    ["Escuta ativa", "Organização local", "Ação coletiva"],
    [["Base da formação de cidadania", "https://example.com/participacao#1"]]
  ],
  [
    "Reconhecer democracia como processo de diálogo e accountability.",
    "Democracia exige ouvir, participar e responsabilizar as instituições e os líderes locais.",
    ["Diálogo", "Transparência", "Responsabilidade"],
    [["Conceito de democracia participativa", "https://example.com/democracia#1"]]
  ],
  [
    "Valorizar o cuidado coletivo e o senso de comunidade.",
    "O cuidado comunitário fortalece a confiança, organiza o território e melhora a convivência.",
    ["Convivência", "Responsabilidade coletiva", "Apoio mútuo"],
    [["Cuidado comunitário e bem comum", "https://example.com/cuidado#1"]]
  ],
  [
    "Transformar ideias em ações concretas.",
    "Apropostas cidadãs ganham força quando têm objetivo, responsáveis e forma de acompanhamento.",
    ["Planejamento", "Execução", "Avaliação"],
    [["Como transformar ideias em ação pública", "https://example.com/propostas#1"]]
  ]
];

export const moduleQuestions = [
  [
    ["O que é participação cidadã?", [["A ação coletiva para melhorar a vida em comum.", true], ["Só votar em eleições.", false], ["Ficar de fora das decisões.", false]]],
    ["Qual é o papel da escuta comunitária?", [["Entender problemas reais antes de propor soluções.", true], ["Evitar qualquer conversa com a comunidade.", false], ["Substituir o trabalho coletivo.", false]]],
    ["Por que a organização local é importante?", [["Porque ajuda a transformar demandas em ações concretas.", true], ["Porque elimina a necessidade de diálogo.", false], ["Porque não depende da comunidade.", false]]]
  ],
  [
    ["O que a democracia exige no cotidiano?", [["Diálogo, transparência e responsabilização.", true], ["Comando central sem escuta.", false], ["Silêncio e passividade.", false]]],
    ["O que é transparência pública?", [["Permitir que a comunidade acompanhe decisões e ações.", true], ["Esconder decisões importantes.", false], ["Ignorar o papel dos cidadãos.", false]]],
    ["Por que a responsabilidade pública é relevante?", [["Porque evita desperdício e fortalece a confiança.", true], ["Porque basta prometer sem cumprir.", false], ["Porque não precisa ser acompanhada.", false]]]
  ],
  [
    ["O que é cuidado comunitário?", [["Ação de atenção e responsabilidade com o bem comum.", true], ["Apenas ajudar em momentos de crise sem planejamento.", false], ["Deixar tudo para o Estado sozinho.", false]]],
    ["Como a comunidade fortalece a convivência?", [["Através de diálogo, colaboração e respeito.", true], ["Com isolamento e individualismo.", false], ["Sem participação popular.", false]]],
    ["Qual é o valor do apoio mútuo?", [["Fortalece a capacidade coletiva de agir.", true], ["É dispensável quando há dinheiro.", false], ["Não altera a vida comunitária.", false]]]
  ],
  [
    ["Qual é o primeiro passo para transformar um problema em proposta?", [["Entender o problema e ouvir quem vive a situação.", true], ["Escolher uma solução sem diagnóstico.", false], ["Esperar que outra pessoa decida.", false]]],
    ["O que uma proposta precisa ter?", [["Objetivo, ações, responsáveis e acompanhamento.", true], ["Só um slogan bonito.", false], ["Um discurso sem execução.", false]]],
    ["Como medir o impacto de uma ação pública?", [["Acompanhando resultados e ajustando o que não deu certo.", true], ["Sem verificar nada depois.", false], ["Apenas divulgando a ideia.", false]]]
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
