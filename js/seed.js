/* ============================================================
   Dados de exemplo (Fase 1)
   ------------------------------------------------------------
   Enquanto não existe banco de dados de verdade, o conteúdo do
   app mora aqui. Nas próximas fases isso vem do Supabase.

   Regra central do app: cada aluna só "vê" os produtos que
   estão na lista `produtos` dela.
   ============================================================ */

window.SEED = {

  /* -------- Produtos (cursos, mentorias, clube do livro) -------- */
  produtos: [
    {
      id: "curso-alicerce",
      categoria: "Curso",
      nome: "Alicerce da Fé",
      descricao: "As bases para construir uma vida espiritual firme, um passo de cada vez.",
      aulas: [
        { id: "a1", titulo: "Boas-vindas e como estudar", tipo: "video",
          conteudo: "Um convite para você começar com o coração aberto. Neste primeiro encontro a Cleri explica como aproveitar melhor o curso e criar uma rotina de estudo possível para a sua semana." },
        { id: "a2", titulo: "Quem é Deus para mim hoje", tipo: "video",
          conteudo: "Antes de avançar, vale olhar para dentro: que imagem de Deus você carrega? Uma aula para revisitar crenças e abrir espaço para o novo." },
        { id: "a3", titulo: "A oração que sustenta o dia", tipo: "texto",
          conteudo: "Oração não precisa ser complicada. Aqui você recebe um roteiro simples de 5 minutos para orar de manhã e à noite, com exemplos práticos." },
        { id: "a4", titulo: "Firmando o alicerce", tipo: "video",
          conteudo: "O encerramento do módulo: revisão do que você aprendeu e um plano de 7 dias para colocar tudo em prática." }
      ]
    },
    {
      id: "curso-identidade",
      categoria: "Curso",
      nome: "Identidade em Cristo",
      descricao: "Um estudo sobre valor próprio, propósito e a mulher que você foi chamada a ser.",
      aulas: [
        { id: "a1", titulo: "O espelho e a verdade", tipo: "video",
          conteudo: "Quem te define? Uma conversa sobre a diferença entre o que o mundo diz e o que as Escrituras dizem sobre você." },
        { id: "a2", titulo: "Feridas que ainda falam", tipo: "video",
          conteudo: "Reconhecer marcas do passado é parte da cura. Nesta aula, um exercício guiado de escrita para nomear o que dói." },
        { id: "a3", titulo: "Propósito no cotidiano", tipo: "texto",
          conteudo: "Propósito não está só nos grandes planos. Veja como enxergar sentido nas tarefas simples da sua rotina." },
        { id: "a4", titulo: "Coroada, não sobrecarregada", tipo: "video",
          conteudo: "O fechamento do curso: descanso, limites saudáveis e a leveza de viver a partir da identidade, não da performance." }
      ]
    },
    {
      id: "mentoria-poder-proposito",
      categoria: "Mentoria",
      nome: "Poder & Propósito",
      descricao: "A mentoria em grupo pelo Método COROA: uma jornada de restauração da mulher que Deus criou, da cura à manifestação do propósito. São 8 encontros ao vivo, com acompanhamento.",
      aulas: [
        { id: "e1", titulo: "Encontro 1 · Onde você está agora", tipo: "video",
          conteudo: "O ponto de partida da jornada. Você não precisa de mais informação, precisa de transformação. Neste encontro cada participante nomeia o que a trouxe até aqui e o que espera desta estação." },
        { id: "e2", titulo: "Encontro 2 · Cura das Feridas (C)", tipo: "video",
          conteudo: "“O que não é tratado, governa.” A primeira letra do Método COROA: libertação, cura bíblica, identificação das raízes emocionais e perdão. Libertar o que te prende para viver o que te espera." },
        { id: "e3", titulo: "Encontro 3 · Ouvir a Voz de Deus (O)", tipo: "video",
          conteudo: "O problema não é que Deus não fala, é que estamos ocupadas demais para ouvir. Discernimento, intimidade, direção e sensibilidade espiritual. Aprender a ouvir, discernir e obedecer com confiança." },
        { id: "e4", titulo: "Encontro 4 · Restaurar a Identidade (R)", tipo: "video",
          conteudo: "O mundo te deu rótulos, Deus te dá identidade. Autoimagem alinhada, dignidade e valor, filha amada, identidade eterna. Voltar a acreditar em quem Ele diz que você é." },
        { id: "e5", titulo: "Encontro 5 · Ocupar seu Lugar (O)", tipo: "video",
          conteudo: "“Deus já preparou o lugar. Você precisa se posicionar.” Autoridade, posicionamento, limites e cura da rejeição. Assumir o seu lugar com firmeza." },
        { id: "e6", titulo: "Encontro 6 · Agir com Propósito (A)", tipo: "video",
          conteudo: "A cura se completa na prática. Intencionalidade diária, ações alinhadas, frutos duradouros. Dar passos consistentes para viver tudo o que Deus preparou." },
        { id: "e7", titulo: "Encontro 7 · Workshop Identidade e Imagem", tipo: "video",
          conteudo: "Bônus da mentoria: como cuidar da sua imagem, da sua oratória e do seu posicionamento na internet, a partir da identidade restaurada." },
        { id: "e8", titulo: "Encontro 8 · Sua Coroa", tipo: "video",
          conteudo: "O encerramento da jornada. Deus já escolheu você, Ele apenas estava te preparando para ocupar o lugar que te deu. A sua coroa ainda está esperando por você." }
      ]
    },
    {
      id: "clube-livro",
      categoria: "Clube do Livro",
      nome: "Clube do Livro",
      descricao: "Uma leitura cristã por mês, com guia de reflexão e roda de conversa.",
      aulas: [
        { id: "l1", titulo: "Leitura do mês e cronograma", tipo: "texto",
          conteudo: "O livro escolhido, a divisão de capítulos por semana e as perguntas que vão guiar a nossa conversa." },
        { id: "l2", titulo: "Roda de conversa · parte 1", tipo: "video",
          conteudo: "Gravação do primeiro encontro do clube, discutindo a primeira metade do livro." },
        { id: "l3", titulo: "Roda de conversa · parte 2", tipo: "video",
          conteudo: "O segundo encontro, com as conclusões da leitura e indicação do próximo título." }
      ]
    }
  ],

  /* -------- Método COROA --------
     As 5 etapas da Jornada COROA, tiradas da Mentoria Poder & Propósito.
     Vira a linha do tempo da aluna na Fase 2. */
  coroa: [
    { letra: "C", nome: "Cura das Feridas",
      frase: "Libertar o que te prende para viver o que te espera." },
    { letra: "O", nome: "Ouvir a Voz de Deus",
      frase: "Aprender a ouvir, discernir e obedecer com confiança." },
    { letra: "R", nome: "Restaurar a Identidade",
      frase: "Voltar a acreditar em quem Deus diz que você é." },
    { letra: "O", nome: "Ocupar seu Lugar",
      frase: "Assumir seu posicionamento com autoridade e firmeza." },
    { letra: "A", nome: "Agir com Propósito",
      frase: "Dar passos alinhados e consistentes para viver tudo o que Deus preparou." }
  ],

  /* -------- Alunas --------
     Não há mais alunas "de mentira": o login agora é de verdade
     (Supabase Auth) e cada aluna é montada a partir do banco.
     Ver js/store.js -> carregarSessao(). */
  alunas: [],

  /* -------- Devocionais --------
     Rotacionam por dia (um por dia, repetindo a lista). */
  devocionais: [
    {
      titulo: "Começar de novo",
      texto: "Toda manhã é um recomeço que Deus te oferece de graça. Você não precisa carregar o peso de ontem para dentro de hoje. As misericórdias d’Ele se renovam, e isso vale também para você: renove o olhar, o fôlego e a esperança.",
      versiculo: "As misericórdias do Senhor são a causa de não sermos consumidos; renovam-se cada manhã.",
      referencia: "Lamentações 3:22-23"
    },
    {
      titulo: "Descansar não é desistir",
      texto: "Existe um cansaço que dormir não resolve, porque nasce de tentar sustentar tudo sozinha. O convite de Jesus não é para você se esforçar mais, é para entregar o peso. Descansar nele é um ato de fé, não de fraqueza.",
      versiculo: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.",
      referencia: "Mateus 11:28"
    },
    {
      titulo: "Quem você é quando ninguém vê",
      texto: "A sua identidade não muda conforme a plateia. Você é filha amada de manhã cedo, no meio do trânsito e na hora do choro escondido. Antes de qualquer papel que você exerce, existe um nome que Deus te deu.",
      versiculo: "Vede que grande amor nos tem concedido o Pai, a ponto de sermos chamados filhos de Deus.",
      referencia: "1 João 3:1"
    },
    {
      titulo: "Um passo por vez",
      texto: "Deus raramente ilumina a estrada inteira de uma vez. Ele acende luz suficiente para o próximo passo. Isso não é descuido, é convite à confiança: caminhar com Ele é aprender a não precisar ver o fim para continuar.",
      versiculo: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.",
      referencia: "Salmos 119:105"
    },
    {
      titulo: "A paz que não depende do cenário",
      texto: "A paz de Deus não espera o problema acabar para chegar. Ela guarda o coração no meio da tempestade, como uma sentinela na porta. Hoje, antes de resolver tudo, respire e deixe essa paz assumir o posto.",
      versiculo: "E a paz de Deus, que excede todo o entendimento, guardará o vosso coração e a vossa mente em Cristo Jesus.",
      referencia: "Filipenses 4:7"
    },
    {
      titulo: "Semear mesmo cansada",
      texto: "Nem toda semente que você planta hoje vai germinar amanhã. Colheita tem tempo próprio. Continue plantando o bem, a oração, a palavra gentil — no tempo certo, o fruto aparece.",
      versiculo: "E não nos cansemos de fazer o bem, porque a seu tempo ceifaremos, se não desfalecermos.",
      referencia: "Gálatas 6:9"
    },
    {
      titulo: "Coroada, não sobrecarregada",
      texto: "Deus não te chamou apenas para aguentar a vida, mas para reinar com sabedoria sobre aquilo que Ele colocou nas suas mãos. Assumir o seu lugar começa por lembrar de quem te coroou.",
      versiculo: "Tu o coroaste de glória e de honra.",
      referencia: "Salmos 8:5"
    }
  ],

  /* -------- Agenda --------
     Lives, encontros e mentorias marcadas, em ordem de data.
     produtoId: a qual produto o evento pertence (null = aberto a todas).
     Só aparecem para a aluna os eventos "gerais" e os dos produtos que ela tem. */
  eventos: [
    { id: "ev1", titulo: "Aula ao vivo · Alicerce da Fé",
      data: "2026-08-25T19:00:00", produtoId: "curso-alicerce",
      link: "https://exemplo.com/sala/alicerce" },
    { id: "ev2", titulo: "Live aberta · Oração da manhã",
      data: "2026-08-28T07:00:00", produtoId: null,
      link: "https://exemplo.com/live/oracao" },
    { id: "ev3", titulo: "Encontro 2 · Cura das Feridas (ao vivo)",
      data: "2026-08-30T20:00:00", produtoId: "mentoria-poder-proposito",
      link: "https://exemplo.com/sala/coroa" },
    { id: "ev4", titulo: "Roda de conversa do Clube do Livro",
      data: "2026-09-03T20:00:00", produtoId: "clube-livro",
      link: "https://exemplo.com/sala/clube" },
    { id: "ev5", titulo: "Mentoria ao vivo · Perguntas e Respostas",
      data: "2026-09-10T20:00:00", produtoId: "mentoria-poder-proposito",
      link: "https://exemplo.com/sala/coroa" }
  ],

  /* -------- Comunidade --------
     Grupos por tema. Cada grupo tem um desafio da semana fixado e
     alguns posts de exemplo. Os posts que a aluna criar ficam
     guardados no navegador e entram junto na hora de mostrar. */
  grupos: [
    {
      id: "oracao",
      nome: "Círculo de Oração",
      tema: "Oração e intercessão",
      descricao: "Um espaço para pedir e oferecer oração, e ver Deus agir na vida umas das outras.",
      desafio: "Esta semana: ore por 5 minutos ao acordar, antes de pegar o celular.",
      posts: [
        { autor: "Cleri Alves", data: "2026-08-24T09:00:00.000Z",
          texto: "Bom dia, meninas. Comecem a semana lembrando: oração não é sobre palavras bonitas, é sobre presença. Estou orando por cada uma de vocês." },
        { autor: "Mariana Costa", data: "2026-08-25T21:30:00.000Z",
          texto: "Peço oração pela minha mãe, que faz um exame importante amanhã. Obrigada, irmãs." },
        { autor: "Ana Beatriz", data: "2026-08-26T07:10:00.000Z",
          texto: "Orando por você e pela sua mãe, Mariana. Deus no controle." }
      ]
    },
    {
      id: "identidade",
      nome: "Filhas do Rei",
      tema: "Identidade e autoestima",
      descricao: "Para lembrar quem somos n’Ele quando a voz de fora tenta falar mais alto.",
      desafio: "Esta semana: escreva 3 verdades que Deus diz sobre você e leia em voz alta todo dia.",
      posts: [
        { autor: "Cleri Alves", data: "2026-08-23T14:00:00.000Z",
          texto: "O mundo te dá rótulos. Deus te dá identidade. Qual verdade você mais precisa acreditar hoje?" },
        { autor: "Júlia Ferreira", data: "2026-08-25T19:45:00.000Z",
          texto: "A minha é: sou amada mesmo quando não entrego tudo perfeito. Tô praticando repetir isso." }
      ]
    },
    {
      id: "proposito",
      nome: "Propósito na Prática",
      tema: "Rotina, chamado e frutos",
      descricao: "Onde a gente compartilha os passos pequenos e reais de viver o propósito no dia a dia.",
      desafio: "Esta semana: escolha uma tarefa simples e faça com excelência, como para o Senhor.",
      posts: [
        { autor: "Ana Beatriz", data: "2026-08-26T12:20:00.000Z",
          texto: "Meu passo pequeno hoje foi organizar a cozinha com calma e gratidão em vez de pressa. Mudou o meu dia." }
      ]
    }
  ],

  /* -------- Plano de leitura da Bíblia --------
     Uma passagem por dia; a aluna marca o que já leu. */
  planoLeitura: [
    { id: "d1",  dia: "Dia 1",  passagem: "Salmos 1" },
    { id: "d2",  dia: "Dia 2",  passagem: "Salmos 23" },
    { id: "d3",  dia: "Dia 3",  passagem: "Salmos 27" },
    { id: "d4",  dia: "Dia 4",  passagem: "Salmos 46" },
    { id: "d5",  dia: "Dia 5",  passagem: "Salmos 91" },
    { id: "d6",  dia: "Dia 6",  passagem: "Salmos 139" },
    { id: "d7",  dia: "Dia 7",  passagem: "Provérbios 3" },
    { id: "d8",  dia: "Dia 8",  passagem: "Provérbios 31" },
    { id: "d9",  dia: "Dia 9",  passagem: "Isaías 40" },
    { id: "d10", dia: "Dia 10", passagem: "Isaías 43" },
    { id: "d11", dia: "Dia 11", passagem: "Mateus 5" },
    { id: "d12", dia: "Dia 12", passagem: "Mateus 6" },
    { id: "d13", dia: "Dia 13", passagem: "João 15" },
    { id: "d14", dia: "Dia 14", passagem: "Romanos 8" }
  ]
};
