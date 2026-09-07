export const courseInfo = {
  title: "Vereador e Suplente",
  subtitle: "Formação para atuação política e responsabilidade pública",
  shortTitle: "Vereador e Suplente",
  description: "Curso para entender o papel do vereador, do suplente, do mandato e da responsabilidade com a população.",
  duration: "4 semanas"
};

export const modules = [
  ["Mandato e representação", "Compreender a importância do mandato, da representação popular e da relação com o eleitor."],
  ["Papel do vereador", "Analisar a atuação legislativa, a fiscalização e o acompanhamento das demandas da cidade."],
  ["Suplente e continuidade", "Entender o papel do suplente, a sucessão, a preparação e o compromisso com o mandato."],
  ["Ética e responsabilidade", "Identificar limites, transparência, controle social e compromisso com a cidade."],
  ["Propostas e políticas públicas", "Transformar necessidades locais em prioridades para o município e a comunidade."]
];

export const moduleStudyGuides = [
  [
    "Entender o significado do mandato e da representação popular.",
    "Vereador e suplente não são apenas cargos de prestígio: são responsabilidades com a cidade e com o povo que vota.",
    ["Mandato democrático", "Representação popular", "Responsabilidade com o eleitor"],
    [["Mandato e representação", "https://example.com/mandato#1"]]
  ],
  [
    "Reconhecer o papel do vereador como agente de cidadania e fiscalização.",
    "A atuação parlamentar envolve escuta, proposição, debate, fiscalização e cuidado com os recursos públicos.",
    ["Legislação", "Fiscalização", "Atendimento popular"],
    [["Papel do vereador", "https://example.com/vereador#1"]]
  ],
  [
    "Compreender o suplente como apoio, preparo e continuidade da representação.",
    "O suplente precisa estar preparado para assumir o mandato com responsabilidade, conhecimento e compromisso político.",
    ["Sucessão", "Preparação", "Continuidade"],
    [["Suplente e mandato", "https://example.com/suplente#1"]]
  ],
  [
    "Valorar ética, transparência e controle social.",
    "A confiança pública depende de honestidade, boa gestão, atenção à população e responsabilidade diante do mandato.",
    ["Ética", "Transparência", "Controle social"],
    [["Ética no mandato", "https://example.com/etica#1"]]
  ],
  [
    "Transformar demandas locais em propostas reais para a cidade.",
    "A atuação política ganha legitimidade quando responde aos problemas concretos da população com propostas viáveis e acompanhamento.",
    ["Políticas públicas", "Acompanhamento", "Resultado"],
    [["Propostas e ações municipais", "https://example.com/propostas#1"]]
  ]
];

export const moduleQuestions = [
  [
    ["O que representa o mandato de vereador?", [["Uma responsabilidade política e pública com a comunidade representada.", true], ["Um cargo isolado sem compromisso com a população.", false], ["Apenas prestígio pessoal.", false]]],
    ["Qual é a base da representação popular?", [["O compromisso com o eleitor e a cidade.", true], ["A vontade individual sem escuta.", false], ["A ausência de controle social.", false]]],
    ["Qual é a principal função do mandato?", [["Atuar em favor da comunidade com responsabilidade e escuta.", true], ["Focar só em interesses pessoais.", false], ["Ignorar o povo.", false]]]
  ],
  [
    ["Qual é um papel essencial do vereador?", [["Debater, propor e fiscalizar ações públicas.", true], ["Manter tudo em silêncio.", false], ["Cuidar apenas do próprio prestígio.", false]]],
    ["O que significa fiscalização municipal?", [["Acompanhar o uso do dinheiro público e cobrar resultados.", true], ["Ignorar contas e prestação de contas.", false], ["Aceitar qualquer decisão sem controle.", false]]],
    ["Por que a escuta popular é importante?", [["Porque identifica problemas reais e prioridades da cidade.", true], ["Porque a população não precisa ser ouvida.", false], ["Porque tudo já está resolvido.", false]]]
  ],
  [
    ["Qual é a função do suplente?", [["Preparar-se para assumir e manter continuidade do mandato.", true], ["Ficar distante da atuação pública.", false], ["Apenas esperar o momento de aparecer.", false]]],
    ["Por que o suplente precisa se preparar?", [["Porque pode assumir a representação da cidade em qualquer momento.", true], ["Porque o cargo não exige compromisso.", false], ["Porque a população não depende disso.", false]]],
    ["Qual é o papel do suplente em relação ao mandato?", [["Apoiar, acompanhar e estar pronto para a continuidade democrática.", true], ["Ficar alheio aos compromissos do vereador.", false], ["Desconsiderar a representação popular.", false]]]
  ],
  [
    ["O que sustenta a confiança pública?", [["Ética, transparência e responsabilidade.", true], ["Promessas vazias sem execução.", false], ["Silêncio diante dos problemas.", false]]],
    ["Por que o controle social é importante?", [["Porque a comunidade precisa acompanhar e cobrar ações públicas.", true], ["Porque basta a decisão do poder sozinho.", false], ["Porque a transparência é dispensável.", false]]],
    ["Qual é a importância de propostas municipais?", [["Elas organizam prioridades e ajudam a resolver problemas reais.", true], ["Não afetam a vida das pessoas.", false], ["São apenas discursos de campanha.", false]]]
  ],
  [
    ["Como uma demanda local vira proposta real?", [["Com diagnóstico, organização e planejamento de ações.", true], ["Sem ouvir a comunidade.", false], ["Sem acompanhamento dos resultados.", false]]],
    ["O que deve estar presente em uma boa política pública?", [["Objetivo claro, responsabilidade e resultados mediáveis.", true], ["Somente slogans e discurso.", false], ["Falta de compromisso com a cidade.", false]]],
    ["Qual é o papel da cidadania no processo político?", [["Acompanhar, exigir e participar da construção de soluções para o município.", true], ["Ficar fora das decisões.", false], ["Substituir a representação política.", false]]]
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
