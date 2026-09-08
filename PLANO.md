# 📱 Cleri Alves — Plano do MVP
> App de área de membros para a mentora cristã Cleri Alves: cada aluna acessa com login próprio os cursos, mentorias e o Clube do Livro que comprou, acompanha sua evolução na Jornada COROA e cultiva a fé no dia a dia — tudo com a cara da marca.

## 1. Decisões

| Tema | Decisão |
|---|---|
| Quem usa | **Aluna/mentorada** (login próprio, vê só o que comprou) · **Cleri** (painel admin) · **Embaixadora Realeza** (área própria — Versão 2) |
| Login | Fases 1 a 5: login simulado, guardado no navegador. Fase Final: login de verdade por papel (Supabase Auth) |
| Onde acessa | **Mobile-first** — alunas usam mais pelo celular, mas funciona bem no computador também |
| Dados | Locais (localStorage) até a fase final. Supabase (banco de dados de verdade) só na fase final |
| Identidade visual | Paleta oficial da marca: **Creme** `#F1EEEC` · **Latte** `#A48F86` · **Salmão** `#D5B2A7` · **Chai** `#E6D7C9` · **Mauve** `#B7A9A5`. Logo: coroa em traço fino + "Cleri Alves" + "Mentora Cristã" |
| Tipografia | Serifada elegante pros títulos (ex: Playfair Display / Cormorant), sans-serif limpa pro corpo (ex: Inter / Poppins) |
| Referência de layout | Biosite oficial (clerialvesmentora.netlify.app): jornada progressiva, muito espaço em branco, hierarquia clara, tom acolhedor e sofisticado — **inspiração, não cópia**: o app tem cara própria |

## 2. Telas do app

| Tela | O que a pessoa faz nela |
|---|---|
| **Login** | Aluna, mentora ou embaixadora entra com seu acesso |
| **Área de Membros** | Aluna vê só os cursos, mentorias e Clube do Livro que comprou |
| **Tela do Curso** | Lista de aulas/conteúdos daquele curso ou mentoria |
| **Aula** | Conteúdo em si (vídeo/texto/material) + marcar como concluída |
| **Perfil da Participante** | Dados da aluna, progresso e conquistas |
| **Jornada COROA** | Visual da evolução da aluna por etapas (método da Cleri) |
| **Devocional** | Devocional do dia + plano de leitura da Bíblia |
| **Diário Espiritual** | Anotações e reflexões pessoais da aluna |
| **Comunidade** | Grupos por tema, com posts e desafios |
| **Agenda** | Lives, encontros e mentorias marcadas |
| **Painel da Mentora (admin)** | Cleri gerencia conteúdo, alunas e avisos |

## 3. O diferencial (detalhado)

**Área de Membros com acesso individual por produto.**

- Cada aluna faz login e cai direto na sua Área de Membros, que mostra **só os produtos que ela comprou** (um curso específico, uma mentoria, o Clube do Livro — qualquer combinação).
- Se ela não comprou um produto, ele simplesmente não aparece pra ela (nada de "bloqueado", nada de tentação — é como se não existisse na conta dela).
- Ao clicar num produto, ela entra na **Tela do Curso**, com a lista de aulas/conteúdos em ordem.
- Cada **Aula** mostra o conteúdo e permite marcar como concluída — isso alimenta o progresso dela.
- Se a Cleri (admin) adicionar uma aula nova a um curso, ou liberar um produto novo pra uma aluna, isso aparece automaticamente pra quem tem acesso.
- Tudo isso embalado na identidade visual da marca — a sensação é de um "espaço só seu dentro do universo Cleri Alves", não de uma plataforma de cursos genérica.

## 4. O que o app guarda

```
Aluna: nome, email, foto, produtos comprados, etapa da Jornada COROA, conquistas
Produto (curso/mentoria/clube do livro): nome, descrição, categoria, lista de aulas
Aula: título, conteúdo (vídeo/texto/material), pertence a um produto, concluída (sim/não)
Devocional: data, texto do dia, referência bíblica
Anotação do diário: aluna, data, texto
Grupo da comunidade: nome, tema, posts
Evento: título, data, horário, link
```
Cada aluna só "vê" os produtos que estão na sua lista de "produtos comprados" — essa é a regra central do app.

## 5. Fases de construção

| Fase | O que entrega | Status |
|---|---|---|
| **0. Setup + identidade + preview duplo** | Projeto rodando, com a paleta oficial da Cleri Alves e tela de preview (celular + computador lado a lado) | ⬜ |
| **1. Core — Área de Membros** | Login (local), lista de produtos por acesso, Tela do Curso com aulas, marcar aula como concluída | ⬜ |
| **2. Perfil + Jornada COROA** | Progresso da aluna por etapas + conquistas simples | ⬜ |
| **3. Devocional + Diário Espiritual** | Devocional do dia, plano de leitura e espaço de anotações | ⬜ |
| **4. Comunidade** | Grupos por tema com posts e desafios | ⬜ |
| **5. Agenda** | Lives, encontros e mentorias marcadas | ⬜ |
| **Final. Publicar** | Supabase (dados reais + login de verdade por papel) + deploy + PWA no celular | ⬜ |

## 6. Versão 2 (fica pra depois — nada se perde)

- **Loja integrada** — produtos físicos/digitais direto no app (precisa de integração de pagamento)
- **Área das Embaixadoras Realeza** — treinamentos, materiais oficiais, campanhas e acompanhamento de resultados (é praticamente um app à parte; melhor construir depois que o core estiver redondo)
- **IA da Cleri** — assistente treinada nos livros e no método COROA, responde dúvidas e sugere estudos (integração de IA mais avançada)
- **Notificações inteligentes** — mensagens automáticas da Cleri, desafios e lembretes
- **Espaço de testemunhos** — compartilhamento de histórias de transformação
- **Biblioteca digital separada** — por enquanto, materiais e downloads ficam dentro de cada curso; uma biblioteca centralizada pode vir depois
