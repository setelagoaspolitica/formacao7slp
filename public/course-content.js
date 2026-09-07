// Biblioteca do curso. Vídeos e podcasts são carregados de links.txt.
export const courseInfo = {
  title: "Formação Centro-Esquerda",
  subtitle: "Esquerda Conservadora",
  shortTitle: "Formação Centro-Esquerda",
  description: "Formação popular, sem enrolação, para melhorar a vida do povo com trabalho, responsabilidade, comunidade, democracia e serviço público.",
  duration: "6 semanas"
};

export const pdfMaterials = [
  ["pensadores", "Pensadores do Social", "pdf/Pensadores%20do%20Social%20-%20Charles%20Thomaz%20dos%20Santos%20(ABNT).pdf", "Base histórica e conceitual"],
  ["programa", "Manifesto e Programa do PSB", "pdf/Manifesto_e_Programa_do_PSB.pdf", "Documento programático"],
  ["apostila", "Apostila do Socialismo Criativo", "pdf/apostila-formacao-socialista-criativo.pdf", "Guia central dos módulos"],
  ["cidades", "Cidades Criativas", "pdf/Cidades_Criativas.pdf", "Diretrizes para políticas municipais"],
  ["criatividade", "Criatividade PSB", "pdf/Criatividade-PSB-Digital.pdf", "Comunicação e práticas"]
];

export const modules = [
  ["Pensamento social e vida real", "Vamos entender as ideias dos autores e ligar tudo isso aos problemas do trabalho e da comunidade.", "Pensadores do Social", pdfMaterials[0][2]],
  ["Democracia, respeito e responsabilidade", "Aqui a conversa é sobre ouvir o povo, cuidar do dinheiro público e fazer política direito.", "Manifesto e Programa do PSB", pdfMaterials[1][2]],
  ["Conhecimento, trabalho e oportunidade", "Vamos ver como tecnologia e criatividade podem abrir portas e melhorar a vida de verdade.", "Apostila do Socialismo Criativo", pdfMaterials[2][2]],
  ["Planejar para fazer acontecer", "Boa ideia sozinha não resolve. Vamos aprender a planejar, dividir tarefas e acompanhar o resultado.", "Apostila do Socialismo Criativo", pdfMaterials[2][2]],
  ["Cidade boa para viver", "Vamos pensar em bairros melhores, serviços que funcionam e oportunidades para mais gente.", "Cidades Criativas", pdfMaterials[3][2]],
  ["Projeto para a comunidade", "No fim, você vai montar uma proposta simples para um problema real do seu bairro ou da sua cidade.", "Criatividade PSB", pdfMaterials[4][2]]
];

export const moduleStudyGuides = [
  ["Entender o que os autores pensavam e ligar essas ideias aos problemas do nosso dia a dia.", "Vamos sair do nome difícil e entender como cada autor enxergava trabalho, desigualdade, mudança e participação.", ["O que Marx dizia sobre classes e exploração", "Como Rosa Luxemburgo defendia liberdade e participação", "A diferença entre a reforma de Bernstein e o partido de vanguarda de Lênin"], [["Karl Marx — PDF, p. 6", "pdf/Pensadores%20do%20Social%20-%20Charles%20Thomaz%20dos%20Santos%20(ABNT).pdf#page=6"], ["Rosa Luxemburgo — PDF, p. 10", "pdf/Pensadores%20do%20Social%20-%20Charles%20Thomaz%20dos%20Santos%20(ABNT).pdf#page=10"], ["Eduard Bernstein e Vladimir Lênin — PDF, p. 11–12", "pdf/Pensadores%20do%20Social%20-%20Charles%20Thomaz%20dos%20Santos%20(ABNT).pdf#page=11"]]],
  ["Entender como a democracia funciona na prática e por que cuidar do dinheiro público é obrigação de todos.", "Democracia não é só votar: é poder falar, ser ouvido, acompanhar e cobrar. E dinheiro público não é brincadeira.", ["Participação e interesse público", "Por que a corrupção prejudica quem mais precisa", "Transparência e responsabilidade"], [["Manifesto e Programa do PSB — seção de planejamento e função do Estado, p. 49", "pdf/Manifesto_e_Programa_do_PSB.pdf#page=49"], ["Manifesto e Programa do PSB — PDF completo", "pdf/Manifesto_e_Programa_do_PSB.pdf"]]],
  ["Perceber como conhecimento e tecnologia podem virar trabalho, oportunidade e melhoria para a comunidade.", "A tecnologia só vale a pena quando ajuda as pessoas, abre oportunidades e diminui diferenças.", ["Capital intelectual e criatividade", "Inovação para resolver problemas reais", "Tecnologia a serviço do bem comum"], [["Apostila do Socialismo Criativo — p. 3, linhas 54–57: vetor de valor", "pdf/apostila-formacao-socialista-criativo.pdf#page=3"], ["Apostila do Socialismo Criativo — p. 3, linhas 59–62: Recife Digital", "pdf/apostila-formacao-socialista-criativo.pdf#page=3"]]],
  ["Aprender a tirar uma boa ideia do papel e fazer o acompanhamento até aparecer resultado.", "Planejar é combinar o que precisa ser feito, quem vai fazer, quando e como saber se deu certo.", ["Planejamento democrático", "Cooperação e responsabilidade compartilhada", "Metas, ações e acompanhamento"], [["Apostila do Socialismo Criativo — p. 3, linhas 6–18: Economia do Projetamento", "pdf/apostila-formacao-socialista-criativo.pdf#page=3"], ["Apostila do Socialismo Criativo — p. 3, linhas 50–52: autoavaliação", "pdf/apostila-formacao-socialista-criativo.pdf#page=3"]]],
  ["Entender como uma cidade pode usar cultura, conhecimento e inovação para resolver problemas do povo.", "Cidade criativa não é só prédio bonito: é bairro com oportunidade, serviço melhor e gente participando das decisões.", ["Cultura e inovação na cidade", "Políticas para diminuir desigualdades", "Participação de quem mora no lugar"], [["Cidades Criativas — seção O que é uma cidade criativa?, p. 27", "pdf/Cidades_Criativas.pdf#page=27"], ["Cidades Criativas — seção Tecnologia e cidades inteligentes, p. 42", "pdf/Cidades_Criativas.pdf#page=42"]]],
  ["Aprender a olhar um problema do bairro e montar uma proposta possível para começar a resolver.", "Antes de sair prometendo, vamos ouvir as pessoas, entender o problema e montar um plano que caiba na realidade.", ["Diagnóstico e escuta do território", "Como montar uma proposta pública", "Ação coletiva ligada à realidade"], [["Criatividade PSB — p. 20, seção sobre criatividade e compromisso social", "pdf/Criatividade-PSB-Digital.pdf#page=20"], ["Criatividade PSB — p. 42, seção Cidades Criativas", "pdf/Criatividade-PSB-Digital.pdf#page=42"]]]
];

export const finalQuiz = [
  {
    question: "Na Era do Conhecimento, qual vetor de valor é destacado pela apostila?",
    options: [
      { label: "Capital fixo e infraestrutura industrial.", value: "a" },
      { label: "Capital intelectual, inovação, design, software e criatividade.", value: "b" },
      { label: "Controle exclusivo de meios físicos de produção.", value: "c" }
    ],
    correct: "b"
  },
  {
    question: "Qual diretriz sintetiza a estratégia Recife Digital apresentada na apostila?",
    options: [
      { label: "Simplificar, Promover e Cuidar.", value: "a" },
      { label: "Centralizar, controlar e punir.", value: "b" }
    ],
    correct: "a"
  },
  {
    question: "Por que a corrupção é antiética para a apostila?",
    options: [
      { label: "Porque limita a concorrência.", value: "a" },
      { label: "Porque retira direitos e recursos da população vulnerável.", value: "c" }
    ],
    correct: "c"
  }
];

export const moduleQuestions = [
  [
    ["Para Marx, onde aparece a exploração do trabalhador?", [["Quando a pessoa produz mais valor do que recebe no salário.", true], ["Quando o mercado acaba sozinho com as diferenças entre as classes.", false], ["Quando um grupo pequeno manda sem ouvir ninguém.", false]]],
    ["O que preocupava Rosa Luxemburgo num poder muito concentrado?", [["Que liberdade e participação popular não fossem importantes.", false], ["Que o poder concentrado acabasse com a democracia dos trabalhadores.", true], ["Que trabalhadores se organizassem coletivamente.", false]]],
    ["Qual é a diferença principal entre Bernstein e Lênin?", [["Bernstein defendia mudanças graduais; Lênin defendia a organização de um partido de vanguarda.", true], ["Bernstein defendia o partido de vanguarda; Lênin defendia só reformas no Parlamento.", false], ["Os dois achavam que organização política não servia para nada.", false]]]
  ],
  [
    ["O que uma democracia de verdade precisa garantir?", [["Liberdade, participação do povo e instituições que funcionem para todos.", true], ["Uma autoridade mandando em tudo sem prestar contas.", false], ["Trocar direitos por rapidez administrativa.", false]]],
    ["Por que a corrupção prejudica principalmente quem mais precisa?", [["Porque tira direitos e dinheiro público de áreas como saúde e educação.", true], ["Porque impede o Estado de abandonar todas as políticas sociais.", false], ["Porque diminui a competição entre empresas privadas.", false]]],
    ["Para que serve um programa político?", [["Para transformar valores e compromissos em ações e políticas públicas.", true], ["Para juntar frases bonitas sem obrigação de fazer nada.", false], ["Para impedir qualquer mudança quando a realidade mudar.", false]]]
  ],
  [
    ["Hoje, o que pode gerar valor e abrir oportunidades de trabalho?", [["Conhecimento, criatividade, inovação, design e tecnologia.", true], ["Só máquinas antigas e grandes estruturas industriais.", false], ["Apenas controlar fisicamente as fábricas.", false]]],
    ["O que mudou na chamada Era do Conhecimento?", [["O conhecimento e a criatividade passaram a pesar tanto quanto as máquinas e o capital.", true], ["A tecnologia deixou de ter importância no trabalho.", false], ["A inovação ficou separada dos problemas da sociedade.", false]]],
    ["Para que a tecnologia deve servir numa formação de centro-esquerda?", [["Para melhorar a vida, ajudar no bem comum e diminuir desigualdades.", true], ["Para deixar máquinas decidirem tudo no lugar das pessoas.", false], ["Só para aumentar o lucro de empresas privadas.", false]]]
  ],
  [
    ["Por que não dá para deixar tudo na mão do mercado?", [["Porque é preciso planejar democraticamente para a economia melhorar a vida das pessoas.", true], ["Porque toda iniciativa privada e toda cooperação devem acabar.", false], ["Porque o governo não precisa acompanhar se as coisas deram certo.", false]]],
    ["Que tipos de propriedade podem conviver nesse modelo?", [["Pública, estatal, privada, cooperativa e solidária.", true], ["Somente propriedade estatal controlada de cima para baixo.", false], ["Somente propriedade privada sem nenhuma regra.", false]]],
    ["Na prática, para que serve o planejamento democrático?", [["Para juntar inovação, cooperação e recursos num projeto que tenha resultado.", true], ["Para impedir a participação das pessoas e a diversidade econômica.", false], ["Para trocar objetivo e organização por improviso.", false]]]
  ],
  [
    ["O que faz uma cidade ser criativa de verdade?", [["Usar cultura, conhecimento e inovação para resolver problemas da cidade.", true], ["Construir grandes obras e esquecer o resto.", false], ["Deixar a criatividade fora das políticas públicas.", false]]],
    ["O que o Recife Digital mostra na prática?", [["Que o governo pode facilitar a vida usando a ideia de Governo como Plataforma e a regra Simplificar, Promover e Cuidar.", true], ["Que serviço público bom precisa ser centralizado e sem tecnologia.", false], ["Que a prefeitura deve entregar suas tarefas para empresas privadas.", false]]],
    ["Por que ouvir quem mora na cidade ajuda?", [["Porque o conhecimento do povo ajuda a encontrar soluções para problemas reais.", true], ["Porque assim ninguém precisa planejar nada.", false], ["Porque só especialistas devem decidir tudo.", false]]]
  ],
  [
    ["Por onde começar quando o bairro tem um problema?", [["Ouvindo as pessoas e entendendo o que está acontecendo de verdade.", true], ["Escolhendo uma solução antes de saber qual é o problema.", false], ["Copiando uma política de outro lugar sem adaptar nada.", false]]],
    ["O que uma proposta precisa ter para sair do papel?", [["Problema, objetivo, ações, responsáveis, prazo e jeito de conferir o resultado.", true], ["Slogan, divulgação e nenhum jeito de medir o resultado.", false], ["Decisão de uma pessoa sem conversa com a comunidade.", false]]],
    ["Como a criatividade ajuda na comunicação pública?", [["Ajuda a mostrar compromisso social, honestidade e cuidado com as pessoas.", true], ["Serve só para fazer propaganda, sem olhar os problemas reais.", false], ["Substitui responsabilidade, planejamento e avaliação.", false]]]
  ]
];

export function mediaEmbedUrl(type, url) {
  try {
    const parsed = new URL(url);
    if (type === "video" && /(^|\.)youtube\.com$/.test(parsed.hostname)) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
    }
    if (type === "podcast") {
      const match = parsed.pathname.match(/\/episode\/([^/]+)/);
      return match ? `spotify:episode:${match[1]}` : null;
    }
  } catch { return null; }
  return null;
}

export function mediaFrameUrl(type, url) {
  try {
    const parsed = new URL(url);
    if (type === "video" && /(^|\.)youtube\.com$/.test(parsed.hostname)) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
    }
    if (type === "podcast") {
      const match = parsed.pathname.match(/\/episode\/([^/]+)/);
      return match ? `https://open.spotify.com/embed/episode/${encodeURIComponent(match[1])}?utm_source=generator` : null;
    }
  } catch { return null; }
  return null;
}

// Aceita "tipo | título | URL" ou listas Markdown sob os títulos Spotify e YouTube.
export async function loadMediaLinks(linksPath = "./links.txt") {
  const text = await fetch(linksPath).then((response) => response.ok ? response.text() : "");
  let sectionType = "";
  return text.split(/\r?\n/).map((rawLine, index) => {
    const line = rawLine.trim();
    if (/^#{1,6}\s*spotify/i.test(line)) { sectionType = "podcast"; return null; }
    if (/^#{1,6}\s*youtube/i.test(line)) { sectionType = "video"; return null; }
    const pipe = line.split("|").map((part) => part?.trim());
    if (["video", "podcast"].includes(pipe[0]) && pipe[1] && /^https?:\/\//.test(pipe[2])) return [pipe[0], pipe[1], pipe[2], `${pipe[0]}-${index + 1}`];
    const markdown = line.match(/^[-*]\s+(.+?)\s+—\s+\[https?:\/\/[^\]]+\]\((https?:\/\/[^)]+)\)$/);
    if (markdown && sectionType) return [sectionType, markdown[1], markdown[2], `${sectionType}-${index + 1}`];
    return null;
  }).filter(Boolean);
}
