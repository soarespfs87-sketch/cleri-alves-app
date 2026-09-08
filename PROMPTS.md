# 🧩 Prompts prontos — App Cleri Alves

Cole cada prompt no Claude, um de cada vez, na ordem das fases. O plano completo está em `PLANO.md`.

---

## Prompt — Fase 0: Setup + identidade + preview duplo

Leia o arquivo PLANO.md. Estou construindo o app Cleri Alves: uma área de membros para uma mentora cristã, onde cada aluna acessa com login próprio os cursos, mentorias e o Clube do Livro que comprou.

Agora vamos construir SÓ a Fase 0: o projeto base.

Nesta fase:
- Crie um projeto Vite simples (vanilla JS/HTML/CSS, sem framework) rodando no navegador.
- Configure a identidade visual da marca: paleta Creme #F1EEEC, Latte #A48F86, Salmão #D5B2A7, Chai #E6D7C9, Mauve #B7A9A5 como variáveis CSS. Tipografia serifada elegante pros títulos (ex: Playfair Display) e sans-serif limpa pro corpo (ex: Inter). Mobile-first.
- Faça uma tela inicial simples só com o nome "Cleri Alves" e um logo com ícone de coroa (pode ser SVG simples em traço fino), como um "hello world" com a cara da marca.
- Crie uma página `preview.html` com DOIS `<iframe>` lado a lado, ambos apontando pra URL do app rodando no localhost (a URL do servidor de dev do Vite). O da esquerda dentro de uma moldura de celular (~390px de largura, com aparência de telefone). O da direita em largura de computador. Os iframes carregam o app real e clicável — não são cópias estáticas — então tudo que eu mudar no app aparece nos dois ao mesmo tempo.

Identidade visual: paleta oficial acima, mobile-first.
Não faça ainda: login, cursos, banco de dados — nada disso ainda, só a base do projeto e a identidade visual.
Vá me explicando o que está fazendo em linguagem simples e me avise quando eu puder testar.

Está pronto quando:
- [ ] Rodo o projeto e vejo a tela inicial com a cara da marca (cores e fonte certas)
- [ ] Abro o `preview.html` e vejo o app nas duas telas (celular e computador) ao mesmo tempo
- [ ] Consigo clicar/interagir nas duas versões do preview normalmente

---

## Prompt — Fase 1: Core — Área de Membros

Leia o arquivo PLANO.md. Estou construindo o app Cleri Alves: uma área de membros para uma mentora cristã, onde cada aluna acessa com login próprio os cursos, mentorias e o Clube do Livro que comprou.
Já concluí a Fase 0. Agora vamos construir SÓ a Fase 1: a Área de Membros, o coração do app.

Nesta fase:
- Tela de login simples: campo de nome/email, sem senha de verdade ainda (é só pra simular "qual aluna está logada"). Salve no localStorage.
- Cadastre 2 ou 3 alunas de exemplo, cada uma com uma lista diferente de "produtos comprados" (ex: aluna 1 tem o Curso A e o Clube do Livro; aluna 2 só tem a Mentoria B).
- Tela "Área de Membros": mostra em cards só os produtos que a aluna logada comprou. Se ela não comprou algo, ele não aparece.
- Tela do Curso: ao clicar num produto, mostra a lista de aulas daquele produto.
- Tela da Aula: mostra o conteúdo (pode ser texto/placeholder de vídeo) e um botão "marcar como concluída".
- Tudo salvo no localStorage, então se eu fechar e abrir de novo, continua tudo lá.

Identidade visual: paleta Creme/Latte/Salmão/Chai/Mauve já definida na Fase 0, mobile-first.
Não faça ainda: Jornada COROA, devocional, comunidade, agenda, banco de dados de verdade (Supabase). Isso vem nas próximas fases.
Vá me explicando o que está fazendo em linguagem simples e me avise quando eu puder testar.

Está pronto quando:
- [ ] Consigo "logar" como uma aluna de exemplo e ver só os produtos dela
- [ ] Ao trocar de aluna (logar com outra), a lista de produtos muda
- [ ] Consigo entrar num produto, ver as aulas, e marcar uma aula como concluída
- [ ] Fecho e abro o navegador de novo e tudo continua salvo

---

## Prompt — Fase 2: Perfil + Jornada COROA

Leia o arquivo PLANO.md. Estou construindo o app Cleri Alves.
Já concluí as Fases 0 e 1. Agora vamos construir SÓ a Fase 2: Perfil da Participante + Jornada COROA.

Nesta fase:
- Tela de Perfil: mostra nome, foto (pode ser um placeholder), e um resumo do progresso da aluna.
- Jornada COROA: um visual (pode ser uma linha do tempo ou etapas em cards) mostrando as etapas da jornada da aluna (defina etapas de exemplo, ex: "Início", "Descoberta", "Transformação", "Coroação" — ou pergunte se eu já tenho os nomes oficiais das etapas).
- Conquistas simples: quando a aluna completa aulas, ela ganha "selos"/conquistas visuais simples (ex: "Primeira aula concluída", "Curso completo").
- Tudo continua salvo no localStorage, ligado à aluna logada.

Identidade visual: paleta já definida, mobile-first.
Não faça ainda: devocional, comunidade, agenda, banco de dados de verdade.
Vá me explicando o que está fazendo em linguagem simples e me avise quando eu puder testar.

Está pronto quando:
- [ ] Vejo meu perfil com meu progresso
- [ ] Vejo a Jornada COROA com a etapa atual da aluna destacada
- [ ] Ao concluir aulas, aparecem conquistas novas no perfil

---

## Prompt — Fase 3: Devocional + Diário Espiritual

Leia o arquivo PLANO.md. Estou construindo o app Cleri Alves.
Já concluí as Fases 0, 1 e 2. Agora vamos construir SÓ a Fase 3: Devocional + Diário Espiritual.

Nesta fase:
- Tela de Devocional: mostra o devocional do dia (texto + referência bíblica) — pode usar 5-7 devocionais de exemplo que vão rotacionando por dia.
- Plano de leitura da Bíblia: uma lista simples mostrando o que ler hoje e o que já foi lido (marcar como lido).
- Diário Espiritual: tela onde a aluna escreve anotações/reflexões, com data, salvas por aluna no localStorage. Lista das anotações anteriores, mais recente primeiro.

Identidade visual: paleta já definida, clima acolhedor e espiritual, mobile-first.
Não faça ainda: comunidade, agenda, banco de dados de verdade.
Vá me explicando o que está fazendo em linguagem simples e me avise quando eu puder testar.

Está pronto quando:
- [ ] Vejo o devocional do dia
- [ ] Consigo marcar um item do plano de leitura como lido
- [ ] Consigo escrever uma anotação no diário e ela aparece salva na lista
- [ ] Fecho e abro de novo e as anotações continuam lá

---

## Prompt — Fase 4: Comunidade

Leia o arquivo PLANO.md. Estou construindo o app Cleri Alves.
Já concluí as Fases 0 a 3. Agora vamos construir SÓ a Fase 4: Comunidade.

Nesta fase:
- Tela de Comunidade: lista de grupos por tema (ex: 2-3 grupos de exemplo).
- Ao entrar num grupo, mostra um feed de posts simples (texto + nome de quem postou + data).
- A aluna logada consegue criar um post novo no grupo.
- Um "desafio" simples pode aparecer fixado no topo do grupo (texto descrevendo o desafio da semana).
- Tudo salvo no localStorage.

Identidade visual: paleta já definida, mobile-first.
Não faça ainda: agenda, banco de dados de verdade.
Vá me explicando o que está fazendo em linguagem simples e me avise quando eu puder testar.

Está pronto quando:
- [ ] Vejo a lista de grupos da comunidade
- [ ] Entro num grupo e vejo os posts
- [ ] Consigo criar um post novo e ele aparece no feed
- [ ] Vejo o desafio da semana fixado no grupo

---

## Prompt — Fase 5: Agenda

Leia o arquivo PLANO.md. Estou construindo o app Cleri Alves.
Já concluí as Fases 0 a 4. Agora vamos construir SÓ a Fase 5: Agenda.

Nesta fase:
- Tela de Agenda: lista de lives, encontros e mentorias marcadas, ordenados por data, com título, data/horário e um link (pode ser placeholder).
- Cada item mostra a qual produto ele pertence (se for de um curso/mentoria específica).
- Adicione 3-4 eventos de exemplo.

Identidade visual: paleta já definida, mobile-first.
Não faça ainda: banco de dados de verdade — isso é a próxima e última fase.
Vá me explicando o que está fazendo em linguagem simples e me avise quando eu puder testar.

Está pronto quando:
- [ ] Vejo a lista de eventos ordenados por data
- [ ] Cada evento mostra a qual produto pertence
- [ ] O app está com todas as telas do MVP funcionando (Área de Membros, Perfil/Jornada, Devocional/Diário, Comunidade, Agenda)

---

## Prompt — Fase Final: Publicar (backend + deploy)

Chegou a hora de tornar os dados de verdade e publicar o app. Nesta conversa, ative a skill "vamos construir o back-end do meu app" (skill `backend-do-seu-app`) pra:
- Configurar o Supabase como banco de dados de verdade (substituindo o localStorage).
- Criar login de verdade por papel: Aluna, Mentora (admin) e, futuramente, Embaixadora.
- Garantir que cada aluna só acesse os produtos que comprou, agora protegido no banco de dados (não só na tela).

Depois disso, faça o deploy na Vercel e instale o app como PWA no celular.

---

## 📦 Depois do MVP: Versão 2

Quando o app completo estiver publicado e testado, volte aqui pra planejar (com a skill `plano-do-seu-app` de novo, ou a `monetizacao-do-seu-app` se for o caso):
- Loja integrada
- Área das Embaixadoras Realeza
- IA da Cleri
- Notificações inteligentes
- Espaço de testemunhos
- Biblioteca digital separada
