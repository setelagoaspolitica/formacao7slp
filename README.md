# Formação Centro-Esquerda — Esquerda Conservadora

Modelo replicável em HTML, CSS e JavaScript puros para cursos populares de formação. O primeiro curso é a **Formação Centro-Esquerda — Esquerda Conservadora**, baseado nos PDFs da pasta `pdf/` e nos links de `links.txt`. Ele permite autenticação, anotações particulares, acompanhamento de progresso, provas formativas por módulo, gamificação e emissão de certificado para impressão em PDF.

A proposta é formar pessoas com linguagem simples e foco em resultado: trabalho, família, comunidade, responsabilidade, democracia, respeito, combate à corrupção e serviço público que funcione. É uma posição de centro-esquerda, sem extremismo de direita ou de esquerda, que defende proteção social com responsabilidade e melhoria concreta da vida do povo.

## Estrutura pedagógica proposta

1. **Pensamento social e vida real** — autores e ideias para entender trabalho, desigualdade e comunidade; leitura orientada de `Pensadores do Social - Charles Thomaz dos Santos (ABNT).pdf`.
2. **Democracia, respeito e responsabilidade** — ética pública, participação e cuidado com o dinheiro público; `Manifesto_e_Programa_do_PSB.pdf`.
3. **Conhecimento, trabalho e oportunidade** — tecnologia e criatividade para abrir caminhos; `apostila-formacao-socialista-criativo.pdf`.
4. **Planejar para fazer acontecer** — cooperação, metas e resultado para a comunidade; `apostila-formacao-socialista-criativo.pdf`.
5. **Cidade boa para viver** — cultura, inovação, bairros e serviços; `Cidades_Criativas.pdf`.
6. **Projeto para a comunidade** — diagnóstico simples e proposta prática de ação pública; `Criatividade-PSB-Digital.pdf`.

As apostilas `apostila1.pdf`, `socialismoCriativo2.pdf` e `socialismoCriativo3.pdf` são versões muito próximas. Mantenha uma como material principal para evitar leitura e avaliações duplicadas.

**Duração estimada:** 6 semanas, com um módulo por semana e aproximadamente 2 a 3 horas de estudo por módulo. O percurso é sequencial, mas o aluno pode avançar no próprio ritmo depois que cada etapa for aprovada.

## Princípios da formação

- **Centro-esquerda:** proteção social, oportunidade e redução das desigualdades com responsabilidade fiscal e respeito às instituições.
- **Conservadora no cuidado:** valoriza família, trabalho, comunidade, honestidade, ordem democrática e dever de cuidar do que é público.
- **Popular:** usa exemplos do dia a dia, evita jargão e conecta teoria com problemas reais.
- **Replicável:** títulos, objetivos, resumos, fontes, perguntas e critérios ficam organizados em `course-content.js`, facilitando criar outra turma ou outro curso.

## Fluxo do aluno

Antes do primeiro módulo, a tela de aceite explica a pontuação e os critérios de aprovação. Em cada módulo, o aluno encontra o objetivo, um resumo de estudo, uma dica de prova e links para os trechos indicados dos PDFs.

1. Abra o PDF obrigatório e registre a leitura.
2. Abra e marque como concluída cada mídia atribuída ao módulo.
3. Consulte o resumo, os tópicos avaliáveis e as referências indicadas.
4. Responda à prova do módulo. Ela só é liberada depois do consumo registrado e exige pelo menos 2 acertos em 3 questões.
5. Conclua a missão para liberar o próximo módulo e receber a medalha correspondente.

As perguntas são baseadas nos objetivos, resumos e referências indicadas na tela do próprio módulo. Quando houver página e linhas disponíveis, elas aparecem no link de estudo; os links de áudio e vídeo são exibidos com o título da mídia, sem inventar timestamps que não estejam cadastrados em `links.txt`.

### Gamificação e certificado

- Leitura registrada e mídia concluída concedem XP.
- Cada missão aprovada concede uma medalha e libera o próximo módulo.
- O questionário final só fica disponível após os seis módulos.
- O certificado só é liberado depois da aprovação dos seis módulos e do questionário final.
- Em `certificado.html`, use **Salvar em PDF** para abrir a impressão do navegador e escolher a opção de salvar como PDF.

## Rodar localmente

1. Copie `firebase-config.js.example` para `firebase-config.js` e confira as configurações do projeto.
2. No Firebase Console, habilite **Authentication > Email/Password** e crie um **Realtime Database**.
3. Publique o conteúdo de `firebase.rules.json` nas regras do Realtime Database.
4. Sirva esta pasta por HTTP, por exemplo `npx serve .`, e abra o endereço informado.

Se o cadastro retornar `operation-not-allowed`/erro 400, abra **Firebase Console > Authentication > Sign-in method**, habilite **E-mail/senha** e salve. Esse provedor costuma vir desabilitado em projetos novos.

O arquivo de configuração real não deve ser versionado. A chave web do Firebase não é segredo por si só: a segurança vem das regras, da autenticação e de App Check.

## Equipe e papéis

Após criar a conta de um educador, crie manualmente no Realtime Database:

```json
{ "roles": { "UID_DO_EDUCADOR": "educator" } }
```

Para administração, use `"admin"`. Em produção, prefira definir papéis com *custom claims* via Admin SDK/Cloud Functions. Não dê a alunos permissão de escrita em `roles`, `attendance` ou `grades`.

## Dados e privacidade

Colete somente nome, usuário do Telegram e e-mail quando necessários. Informe finalidade, responsável, prazo de retenção e canal de solicitação do titular; frequência e notas são dados pessoais e devem ter acesso restrito. Para turmas reais, valide o fluxo com a política de privacidade e a LGPD da instituição.

### Cálculo da nota

O progresso é calculado a partir dos registros de leitura, mídias concluídas, provas dos módulos e questionário final. A aplicação concede XP e medalhas, mas não substitui uma avaliação institucional formal. `links.txt` aceita a lista Markdown organizada sob `### Spotify` e `### YouTube` ou o formato `tipo | título | URL`; os itens entram automaticamente na missão do módulo.

Os questionários servem para acompanhamento formativo e são corrigidos no navegador; para emissão de certificado, a equipe deve revisar o projeto e a participação. Uma nota inviolável exigiria uma Cloud Function/Admin SDK para corrigir no servidor — não é possível garantir isso usando apenas HTML e banco acessado pelo navegador.
# formacao7slp
