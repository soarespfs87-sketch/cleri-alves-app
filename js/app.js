/* ============================================================
   Cleri Alves · app (Fase 1 · layout base)
   ------------------------------------------------------------
   Estrutura inspirada num modelo de app com barra de navegação
   fixa embaixo, tela inicial com saudação e cartão "continue de
   onde parou". Cores e tipografia são as da marca Cleri Alves.

   Telas:
     #/entrar        -> Login
     #/              -> Início (Área de Membros)
     #/produto/ID            -> Tela do Curso
     #/produto/ID/aula/ID    -> Tela da Aula
     #/jornada #/devocional #/comunidade #/perfil -> em breve
   ============================================================ */

window.App = (function () {
  var raiz = document.getElementById("app");
  var barraNav = document.getElementById("navbar");

  /* -------------------------------------------------------
     Ajudante para montar elementos sem escrever HTML solto.
     ------------------------------------------------------- */
  function el(tag, attrs, filhos) {
    var no = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (chave) {
      var valor = attrs[chave];
      if (valor == null) return;
      if (chave === "class") no.className = valor;
      else if (chave === "text") no.textContent = valor;
      else if (chave === "html") no.innerHTML = valor;
      else if (chave.indexOf("on") === 0 && typeof valor === "function") {
        no.addEventListener(chave.slice(2), valor);
      } else {
        no.setAttribute(chave, valor);
      }
    });
    (filhos || []).forEach(function (f) {
      if (f == null || f === false) return;
      no.appendChild(typeof f === "string" ? document.createTextNode(f) : f);
    });
    return no;
  }

  function svg(interno) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
      interno + "</svg>";
  }
  function ico(interno, extra) {
    return el("span", { class: "ico" + (extra ? " " + extra : ""), html: svg(interno) });
  }

  /* desenhos usados em vários lugares */
  var D = {
    voltar:  '<path d="M15 18l-6-6 6-6"/>',
    avancar: '<path d="M9 18l6-6-6-6"/>',
    check:   '<path d="M20 6L9 17l-5-5"/>',
    play:    '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
    /* coroa traçada a partir do símbolo da marca Cleri Alves */
    coroa:   '<path d="M4.5 17.2h15"/>' +
             '<path d="M4.5 17.2 L5.8 8.6 L9.4 12.2 L12 5 L14.6 12.2 L18.2 8.6 L19.5 17.2 Z"/>' +
             '<path d="M12 8.5 C10.8 10.7 10.8 13 12 14.9 C13.2 13 13.2 10.7 12 8.5 Z"/>',
    casa:    '<path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.8V21h14V9.8"/>',
    livro:   '<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M8 4v13"/>',
    pessoas: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3.3 2.6-5.6 5.5-5.6S14.5 16.7 14.5 20"/><path d="M16 5.2a3 3 0 0 1 0 5.6"/><path d="M17.6 20c0-2.7-1-4.7-2.6-5.6"/>',
    pessoa:  '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.1 3.6-7 8-7s8 2.9 8 7"/>',
    cadeado: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    estrela: '<path d="M12 4l2.3 4.7 5.2.8-3.8 3.7.9 5.1L12 15.9 7.4 18.3l.9-5.1L4.5 9.5l5.2-.8z"/>',
    semente: '<path d="M12 3c4 4 4 9 0 13-4-4-4-9 0-13z"/><path d="M12 16v5"/>',
    livro2:  '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v4H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
    lixo:    '<path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"/>',
    balao:   '<path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>',
    alfinete: '<path d="M9 4h6l-1 6 3 3H7l3-3-1-6z"/><path d="M12 16v5"/>',
    agenda:  '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16"/><path d="M8 3v4"/><path d="M16 3v4"/>',
    relogio: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    link:    '<path d="M9 15l6-6"/><path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1"/><path d="M13 18l-1 1a4 4 0 0 1-6-6l1-1"/>',
    menu:    '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    fechar:  '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
    whats:   '<path d="M20.5 12a8.5 8.5 0 0 1-12.7 7.4L3.5 20.5l1.2-4.2A8.5 8.5 0 1 1 20.5 12z"/><path d="M8.8 8.5c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1 0 1.3.9 2.5 1 2.7.2.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-1.6-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.6-2.4-1.6-.7-.7-1.1-1.5-1.3-1.8-.1-.2 0-.4.1-.5l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4z" fill="currentColor" stroke="none"/>',
    sair:    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
    olho:    '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    olhoOff: '<path d="M9.9 4.6A9.8 9.8 0 0 1 12 4.4c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.3 4.2"/><path d="M6.1 6.1A17.6 17.6 0 0 0 2 12s3.6 7 10 7a9.8 9.8 0 0 0 4.1-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="M3 3l18 18"/>'
  };

  /* ---------- datas em português ---------- */
  var MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  var DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  function dataExtenso(d) {
    return DIAS[d.getDay()] + ", " + d.getDate() + " de " + MESES[d.getMonth()];
  }
  function dataCurta(iso) {
    var d = new Date(iso);
    return d.getDate() + " de " + MESES[d.getMonth()] + " de " + d.getFullYear();
  }
  function tempoRelativo(iso) {
    var seg = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (seg < 60) return "agora";
    if (seg < 3600) return "há " + Math.floor(seg / 60) + " min";
    if (seg < 86400) return "há " + Math.floor(seg / 3600) + " h";
    if (seg < 604800) return "há " + Math.floor(seg / 86400) + " d";
    if (seg < 2592000) return "há " + Math.floor(seg / 604800) + " sem";
    return dataCurta(iso);
  }
  function diaDoAno(d) {
    var inicio = new Date(d.getFullYear(), 0, 0);
    return Math.floor((d - inicio) / 86400000);
  }

  function primeiroNome(nome) { return nome.split(" ")[0]; }

  function saudacaoHora() {
    var h = new Date().getHours();
    if (h < 12) return "Bom dia,";
    if (h < 18) return "Boa tarde,";
    return "Boa noite,";
  }

  function classeCategoria(categoria) {
    if (categoria === "Mentoria") return "mentoria";
    if (categoria === "Clube do Livro") return "clube";
    if (categoria === "Livro") return "livro";
    if (categoria === "Grupo VIP") return "vip";
    return "curso";
  }

  /* Nome da fileira na home (categoria no plural) */
  function rotuloCategoria(cat) {
    var mapa = {
      "Curso": "Cursos", "Mentoria": "Mentorias",
      "Clube do Livro": "Clube do Livro", "Livro": "Livros",
      "Treinamento": "Treinamentos"
    };
    return mapa[cat] || cat;
  }

  /* A aluna pode entrar nesse produto? (comprou, ou é gratuito) */
  function temAcessoA(aluna, produto) {
    return !!produto && (produto.gratuito === true ||
      (aluna.produtos || []).indexOf(produto.id) !== -1);
  }

  function produtoPorSlug(slug) {
    return (SEED.produtos || []).find(function (p) { return p.id === slug; }) || null;
  }

  /* Capa do produto: a arte enviada, ou uma capa gerada com o nome. */
  function capaDeProduto(produto) {
    if (produto.capa_url) {
      return el("img", { class: "capa-img", src: produto.capa_url, alt: "", loading: "lazy" });
    }
    return el("div", { class: "capa-gerada tint--" + classeCategoria(produto.categoria) }, [
      el("img", { class: "capa-gerada__marca", src: "assets/logo-mark.png", alt: "" }),
      el("span", { class: "capa-gerada__cat", text: produto.categoria }),
      el("span", { class: "capa-gerada__nome", text: produto.nome })
    ]);
  }

  /* Card retrato de um produto na vitrine (com cadeado se estiver bloqueado). */
  function cardVitrine(aluna, produto) {
    var liberado = temAcessoA(aluna, produto);
    var arte = el("div", { class: "capa-card__arte" }, [capaDeProduto(produto)]);
    if (!liberado) {
      arte.appendChild(el("span", { class: "capa-card__cad" }, [ico(D.cadeado)]));
    }
    return el("a", {
      class: "capa-card" + (liberado ? "" : " capa-card--bloq"),
      href: "#/produto/" + produto.id
    }, [
      arte,
      el("span", { class: "capa-card__nome", text: produto.nome }),
      produto.subtitulo
        ? el("span", { class: "capa-card__sub", text: produto.subtitulo }) : null
    ]);
  }

  /* Card grande do carrossel de destaque. */
  function cardDestaque(aluna, produto) {
    var liberado = temAcessoA(aluna, produto);
    return el("a", {
      class: "hero-card tint--" + classeCategoria(produto.categoria),
      href: "#/produto/" + produto.id
    }, [
      el("div", { class: "hero-card__arte" }, [
        capaDeProduto(produto),
        liberado ? null : el("span", { class: "hero-card__cad" }, [ico(D.cadeado)])
      ]),
      el("div", { class: "hero-card__txt" }, [
        el("span", { class: "hero-card__cat", text: produto.categoria }),
        el("span", { class: "hero-card__nome", text: produto.nome }),
        produto.subtitulo
          ? el("span", { class: "hero-card__sub", text: produto.subtitulo }) : null,
        el("span", { class: "hero-card__cta" }, [
          ico(liberado ? D.play : D.cadeado),
          el("span", { text: liberado ? "Acessar" : "Conhecer" })
        ])
      ])
    ]);
  }

  /* Card fixo (Devocional / Comunidade): sempre aberto, leva a uma seção. */
  function cardFixo(nome, sub, capa, href) {
    var arte = capa
      ? el("img", { class: "capa-img", src: capa, alt: "", loading: "lazy" })
      : el("div", { class: "capa-gerada tint--mentoria" }, [
          el("img", { class: "capa-gerada__marca", src: "assets/logo-mark.png", alt: "" }),
          el("span", { class: "capa-gerada__nome", text: nome })
        ]);
    return el("a", { class: "capa-card", href: href }, [
      el("div", { class: "capa-card__arte" }, [arte]),
      el("span", { class: "capa-card__nome", text: nome }),
      el("span", { class: "capa-card__sub", text: sub })
    ]);
  }

  function irPara(hash) { location.hash = hash; }

  /* Transforma um link de vídeo num endereço que dá pra embutir no app.
     Aceita YouTube (inclusive não listado), Vimeo, ou uma URL de player
     já pronta (Panda, Bunny, etc.). Retorna null se não reconhecer. */
  function embedDeVideo(url) {
    if (!url) return null;
    var u = String(url).trim();

    var yt = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    if (yt) return "https://www.youtube-nocookie.com/embed/" + yt[1] +
      "?rel=0&modestbranding=1&playsinline=1";

    var vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return "https://player.vimeo.com/video/" + vm[1];

    if (/^https:\/\/\S+$/.test(u)) return u;   /* já é um endereço de player */
    return null;
  }

  /* Miniatura (capa) de um vídeo do YouTube. */
  function thumbYoutube(url) {
    var m = String(url || "").match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    return m ? "https://img.youtube.com/vi/" + m[1] + "/hqdefault.jpg" : null;
  }

  /* É um arquivo de vídeo (ex.: subido no Supabase Storage)? */
  function ehArquivoDeVideo(u) {
    return /\.(mp4|webm|ogg|ogv|mov|m4v)(\?|#|$)/i.test(u || "");
  }

  /* Monta o player da aula: <video> pra arquivo, <iframe> pra YouTube/Vimeo/etc.
     Retorna null se não houver vídeo utilizável. */
  function montarPlayer(url, titulo) {
    var u = String(url || "").trim();
    if (!u) return null;

    if (ehArquivoDeVideo(u)) {
      return el("div", { class: "aula-video" }, [
        el("video", {
          src: u, controls: "controls", playsinline: "playsinline",
          preload: "metadata", "aria-label": "Vídeo da aula: " + titulo
        })
      ]);
    }

    var embed = embedDeVideo(u);
    if (!embed) return null;
    return el("div", { class: "aula-video" }, [
      el("iframe", {
        src: embed,
        title: "Vídeo da aula: " + titulo,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowfullscreen: "true",
        loading: "lazy",
        referrerpolicy: "strict-origin-when-cross-origin"
      })
    ]);
  }

  var ID_MENTORIA = "mentoria-poder-proposito";
  var ID_GRUPO_VIP = "grupo-vip-poder-proposito";
  /* Cada etapa do Método COROA acontece num encontro da mentoria. */
  var ENCONTRO_DA_ETAPA = ["e2", "e3", "e4", "e5", "e6"];

  /* -------------------------------------------------------
     Resumo do progresso da aluna (usado no Perfil)
     ------------------------------------------------------- */
  function resumoAluna(aluna) {
    var produtos = aluna.produtos
      .map(function (id) { return SEED.produtos.find(function (p) { return p.id === id; }); })
      .filter(Boolean);

    var feito = 0, total = 0, completos = 0;
    produtos.forEach(function (p) {
      var c = Store.contarConcluidas(aluna.id, p);
      feito += c;
      total += p.aulas.length;
      if (p.aulas.length && c === p.aulas.length) completos++;
    });

    return {
      produtos: produtos,
      qtdProdutos: produtos.length,
      aulasFeitas: feito,
      aulasTotais: total,
      produtosCompletos: completos,
      pct: total ? Math.round((feito / total) * 100) : 0
    };
  }

  /* Eventos que a aluna vê: os "gerais" + os dos produtos que ela tem.
     Sempre em ordem de data. */
  function eventosDaAluna(aluna) {
    return SEED.eventos
      .filter(function (ev) {
        if (ev.donoId) return true;               /* evento da rede: todas veem */
        if (!ev.produtoId) return true;           /* evento geral da Cleri      */
        return aluna.produtos.indexOf(ev.produtoId) !== -1;
      })
      .slice()
      .sort(function (a, b) { return a.data.localeCompare(b.data); });
  }

  function nomeDoProduto(id) {
    var p = SEED.produtos.find(function (x) { return x.id === id; });
    return p ? p.nome : "";
  }

  /* -------------------------------------------------------
     Situação da aluna na Jornada COROA
     ------------------------------------------------------- */
  function statusCoroa(aluna) {
    var temMentoria = aluna.produtos.indexOf(ID_MENTORIA) !== -1;
    var atualIndex = -1;

    var etapas = SEED.coroa.map(function (etapa, i) {
      var encontroId = ENCONTRO_DA_ETAPA[i];
      var feita = temMentoria &&
        Store.aulaConcluida(aluna.id, ID_MENTORIA, encontroId);
      return {
        letra: etapa.letra, nome: etapa.nome, frase: etapa.frase,
        encontroId: encontroId, feita: feita, estado: "futura"
      };
    });

    if (temMentoria) {
      var primeiraAberta = etapas.findIndex(function (e) { return !e.feita; });
      atualIndex = primeiraAberta;
      etapas.forEach(function (e, i) {
        if (e.feita) e.estado = "feita";
        else if (i === primeiraAberta) e.estado = "atual";
      });
    }

    var concluidas = etapas.filter(function (e) { return e.feita; }).length;
    return {
      temMentoria: temMentoria,
      etapas: etapas,
      atualIndex: atualIndex,
      concluidas: concluidas,
      completa: temMentoria && concluidas === etapas.length
    };
  }

  /* -------------------------------------------------------
     Conquistas (selos) · tudo calculado a partir do progresso
     ------------------------------------------------------- */
  var CONQUISTAS = [
    { id: "primeiros-passos", titulo: "Primeiros passos", icone: "semente",
      descricao: "Concluiu a sua primeira aula.",
      ganhou: function (r) { return r.aulasFeitas >= 1; } },
    { id: "cinco-aulas", titulo: "Cinco aulas", icone: "check",
      descricao: "Concluiu 5 aulas no total.",
      ganhou: function (r) { return r.aulasFeitas >= 5; } },
    { id: "curso-completo", titulo: "Primeiro curso completo", icone: "estrela",
      descricao: "Terminou 100% de um produto.",
      ganhou: function (r) { return r.produtosCompletos >= 1; } },
    { id: "dez-aulas", titulo: "Dez aulas", icone: "livro2",
      descricao: "Concluiu 10 aulas no total.",
      ganhou: function (r) { return r.aulasFeitas >= 10; } },
    { id: "coroa-iniciada", titulo: "Jornada COROA iniciada", icone: "coroa",
      descricao: "Concluiu a primeira etapa do Método COROA.",
      ganhou: function (r) { return r.coroaConcluidas >= 1; } },
    { id: "coroacao", titulo: "Coroação", icone: "coroa",
      descricao: "Concluiu as 5 etapas do Método COROA.",
      ganhou: function (r) { return r.coroaConcluidas >= 5; } }
  ];

  /* -------------------------------------------------------
     Barra de navegação de baixo (fixa)
     ------------------------------------------------------- */
  var NAV = [
    { base: "/",           label: "Início",     d: D.casa },
    { base: "/agenda",     label: "Agenda",     d: D.agenda },
    { base: "/networking", label: "Rede",       d: D.estrela },
    { base: "/devocional", label: "Devocional", d: D.livro },
    { base: "/comunidade", label: "Comunidade", d: D.pessoas },
    { base: "/perfil",     label: "Perfil",     d: D.pessoa }
  ];

  function montarNav() {
    barraNav.innerHTML = "";
    NAV.forEach(function (item) {
      barraNav.appendChild(
        el("a", { class: "navbar__item", href: "#" + item.base, "data-base": item.base }, [
          el("span", { class: "navbar__ico", html: svg(item.d) }),
          el("span", { class: "navbar__label", text: item.label })
        ])
      );
    });
  }

  function atualizarNav(baseAtiva) {
    Array.prototype.forEach.call(barraNav.children, function (a) {
      a.classList.toggle("navbar__item--ativo", a.getAttribute("data-base") === baseAtiva);
    });
  }

  /* Campo de formulário reaproveitável (rótulo + input/textarea). */
  function campoForm(rotulo, valor, ph, area) {
    var input = area
      ? el("textarea", { class: "campo__input", rows: "3", placeholder: ph || "" })
      : el("input", { class: "campo__input", type: "text", placeholder: ph || "" });
    input.value = valor || "";
    return {
      input: input,
      campo: el("div", { class: "campo" }, [
        el("label", { class: "campo__rotulo" }, [rotulo]), input
      ])
    };
  }
  function campoTipo(rotulo, valor, tipo, ph) {
    var input = el("input", { class: "campo__input", type: tipo || "text", placeholder: ph || "" });
    if (valor != null) input.value = valor;
    return { input: input, campo: el("div", { class: "campo" }, [
      el("label", { class: "campo__rotulo" }, [rotulo]), input ]) };
  }
  function campoSelect(rotulo, valor, opcoes) {
    /* opcoes: [{ v, t }] */
    var sel = el("select", { class: "campo__input" }, opcoes.map(function (o) {
      return el("option", { value: o.v }, [o.t]);
    }));
    sel.value = valor == null ? "" : String(valor);
    return { input: sel, campo: el("div", { class: "campo" }, [
      el("label", { class: "campo__rotulo" }, [rotulo]), sel ]) };
  }
  function campoCheck(rotulo, valor) {
    var input = el("input", { type: "checkbox" });
    input.checked = !!valor;
    return { input: input, campo: el("label", { class: "campo-check" }, [
      input, el("span", { text: rotulo }) ]) };
  }

  /* Envolve um <input type=password> com um botão de "mostrar senha" (olho).
     Devolve o elemento pronto pra pôr dentro de um .campo. */
  function comOlhoDeSenha(input) {
    var btn = el("button", {
      class: "ver-senha", type: "button", tabindex: "-1",
      "aria-label": "Mostrar senha", "aria-pressed": "false"
    }, [ico(D.olho)]);
    btn.addEventListener("click", function () {
      var revelar = input.type === "password";
      input.type = revelar ? "text" : "password";
      btn.innerHTML = "";
      btn.appendChild(ico(revelar ? D.olhoOff : D.olho));
      btn.setAttribute("aria-pressed", revelar ? "true" : "false");
      btn.setAttribute("aria-label", revelar ? "Ocultar senha" : "Mostrar senha");
      input.focus();
    });
    return el("div", { class: "campo__senha" }, [input, btn]);
  }

  /* -------------------------------------------------------
     Menu lateral (drawer) — acesso rápido a tudo + Suporte
     ------------------------------------------------------- */
  var WHATS_CLERI = "https://wa.me/5547984175660";
  var drawerEl = null;

  var MENU = [
    { href: "#/",                  label: "Início",            d: D.casa },
    { href: "#/agenda",            label: "Agenda",            d: D.agenda },
    { href: "#/devocional",        label: "Devocional",        d: D.livro },
    { href: "#/devocional/diario", label: "Diário espiritual", d: D.livro2 },
    { href: "#/comunidade",        label: "Comunidade",        d: D.pessoas },
    { href: "#/networking",        label: "Networking Cristão",  d: D.estrela },
    { href: "#/perfil",            label: "Meu perfil",        d: D.pessoa }
  ];

  function fecharDrawer() {
    if (!drawerEl) return;
    drawerEl.classList.remove("drawer--aberto");
    drawerEl.hidden = true;
    document.body.classList.remove("sem-scroll");
  }
  function abrirDrawer() {
    if (!drawerEl) return;
    drawerEl.hidden = false;
    document.body.classList.add("sem-scroll");
    requestAnimationFrame(function () { drawerEl.classList.add("drawer--aberto"); });
  }

  var drawerLista = null;
  var drawerMentoraOk = false;

  function itemDrawer(href, label, d) {
    return el("li", {}, [
      el("a", { class: "drawer__item", href: href, onclick: fecharDrawer }, [
        el("span", { class: "drawer__ico", html: svg(d) }),
        el("span", { text: label })
      ])
    ]);
  }

  /* Mostra "Painel da Mentora" no menu só para quem é mentora. */
  function atualizarDrawer(aluna) {
    if (!drawerLista || drawerMentoraOk) return;
    if (aluna && aluna.papel === "mentora") {
      drawerLista.insertBefore(
        itemDrawer("#/painel", "Painel da Mentora", D.coroa), drawerLista.firstChild);
      drawerMentoraOk = true;
    }
  }

  function montarDrawer() {
    drawerLista = el("ul", { class: "drawer__lista" },
      MENU.map(function (item) { return itemDrawer(item.href, item.label, item.d); }));
    drawerEl = el("div", { id: "drawer", class: "drawer", hidden: "hidden" }, [
      el("div", { class: "drawer__fundo", onclick: fecharDrawer }),
      el("nav", { class: "drawer__painel", "aria-label": "Menu" }, [
        el("div", { class: "drawer__topo" }, [
          el("img", { class: "drawer__logo", src: "assets/logo-lockup.png",
            alt: "Cleri Alves", width: "1036", height: "489" }),
          el("button", { class: "drawer__x", type: "button",
            "aria-label": "Fechar o menu", onclick: fecharDrawer }, [ico(D.fechar)])
        ]),
        drawerLista,
        el("a", { class: "drawer__suporte", href: WHATS_CLERI,
          target: "_blank", rel: "noopener", onclick: fecharDrawer }, [
          el("span", { class: "drawer__ico", html: svg(D.whats) }),
          el("span", {}, [
            el("strong", { text: "Suporte da Mentora" }),
            el("span", { class: "drawer__suporte-sub", text: "Falar com a Cleri no WhatsApp" })
          ])
        ]),
        el("button", { class: "drawer__sair", type: "button",
          onclick: function () { fecharDrawer(); Store.sair().then(carregarERotear); } }, [
          el("span", { class: "drawer__ico", html: svg(D.sair) }),
          el("span", { text: "Sair da conta" })
        ])
      ])
    ]);
    document.body.appendChild(drawerEl);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fecharDrawer();
    });
  }

  /* -------------------------------------------------------
     Peças reaproveitadas
     ------------------------------------------------------- */
  function barraProgresso(feito, total) {
    var pct = total ? Math.round((feito / total) * 100) : 0;
    return el("div", { class: "progresso", role: "img",
      "aria-label": feito + " de " + total + " aulas concluídas" }, [
      el("div", { class: "progresso__trilho" }, [
        el("div", { class: "progresso__preenche", style: "width:" + pct + "%" })
      ])
    ]);
  }

  function botaoMenu() {
    var temNovidade = false;
    try { temNovidade = Store.novidades().total > 0; } catch (e) {}
    return el("button", { class: "topo__menu", type: "button",
      "aria-label": "Abrir o menu", onclick: abrirDrawer }, [
      ico(D.menu),
      temNovidade ? el("span", { class: "topo__menu-dot" }) : null
    ]);
  }

  function barraTopo(op) {
    op = op || {};
    if (op.saudacao) {
      var aluna = op.saudacao;
      var inicial = primeiroNome(aluna.nome).charAt(0).toUpperCase();
      return el("header", { class: "topo topo--oi" }, [
        el("div", { class: "topo__saud" }, [
          el("span", { class: "topo__hora", text: saudacaoHora() }),
          el("span", { class: "topo__nome", text: primeiroNome(aluna.nome) })
        ]),
        el("div", { class: "topo__acoes" }, [
          el("a", { class: "avatar", href: "#/perfil", "aria-label": "Abrir o seu perfil",
            text: inicial }),
          botaoMenu()
        ])
      ]);
    }
    if (op.voltarHref) {
      return el("header", { class: "topo" }, [
        el("a", { class: "voltar", href: "#" + op.voltarHref }, [
          ico(D.voltar), el("span", { text: op.voltarLabel || "Voltar" })
        ]),
        botaoMenu()
      ]);
    }
    return el("header", { class: "topo" }, [
      el("span", { class: "marca-mini" }, [
        el("img", { src: "assets/logo-mark.png", alt: "", width: "28", height: "27" }),
        el("span", { text: op.titulo || "" })
      ]),
      botaoMenu()
    ]);
  }

  function montarTela(conteudo) {
    raiz.innerHTML = "";
    var tela = el("div", { class: "tela" }, [conteudo]);
    raiz.appendChild(tela);
    requestAnimationFrame(function () { tela.classList.add("tela--visivel"); });
    window.scrollTo(0, 0);
  }

  /* =======================================================
     TELA · Login
     ======================================================= */
  var loginModo = "entrar";   /* "entrar" ou "cadastrar" */
  var modoRecuperacao = false; /* true quando a pessoa chega pelo link de "esqueci a senha" */

  function telaLogin() {
    var ehCadastro = loginModo === "cadastrar";

    var campoNome = el("input", {
      id: "campo-nome", class: "campo__input", type: "text",
      autocomplete: "name", placeholder: "Como você quer ser chamada"
    });
    var campoEmail = el("input", {
      id: "campo-email", class: "campo__input", type: "email",
      autocomplete: "email", placeholder: "voce@exemplo.com"
    });
    var campoSenha = el("input", {
      id: "campo-senha", class: "campo__input", type: "password",
      autocomplete: ehCadastro ? "new-password" : "current-password",
      placeholder: "Sua senha", minlength: "6"
    });
    var erro = el("p", { id: "erro-acesso", class: "form-erro", hidden: "hidden" });
    var info = el("p", { class: "login__ok", hidden: "hidden" });
    var botao = el("button", { class: "btn btn--primario", type: "submit" },
      [ehCadastro ? "Criar conta" : "Entrar"]);

    function mostrarErro(msg) {
      info.hidden = true;
      erro.textContent = msg;
      erro.hidden = false;
    }
    function mostrarInfo(msg) {
      erro.hidden = true;
      info.textContent = msg;
      info.hidden = false;
    }

    function pedirNovaSenha() {
      erro.hidden = true;
      var email = (campoEmail.value || "").trim();
      if (!email) {
        campoEmail.focus();
        mostrarErro("Digite o seu e-mail acima e toque de novo em “Esqueceu a senha?”.");
        return;
      }
      linkEsqueci.disabled = true;
      Store.enviarResetSenha(email).then(function () {
        linkEsqueci.disabled = false;
        mostrarInfo("Enviamos um link para " + email +
          ". Abra o e-mail e siga o link para criar uma senha nova.");
      }).catch(function (e) {
        linkEsqueci.disabled = false;
        mostrarErro(traduzErro(e));
      });
    }

    function traduzErro(e) {
      var m = (e && e.message ? e.message : String(e)).toLowerCase();
      if (m.indexOf("invalid login") !== -1) return "E-mail ou senha incorretos.";
      if (m.indexOf("already registered") !== -1 || m.indexOf("already been registered") !== -1)
        return "Esse e-mail já tem conta. Tente entrar.";
      if (m.indexOf("password") !== -1 && m.indexOf("6") !== -1)
        return "A senha precisa ter pelo menos 6 caracteres.";
      if (m.indexOf("email not confirmed") !== -1)
        return "Confirme o seu e-mail antes de entrar.";
      if (m.indexOf("unable to validate email") !== -1 || m.indexOf("invalid email") !== -1)
        return "Digite um e-mail válido.";
      return "Não deu certo agora. Tente de novo em instantes.";
    }

    function enviar(ev) {
      if (ev) ev.preventDefault();
      erro.hidden = true;
      botao.disabled = true;
      botao.textContent = "Aguarde...";

      var acao = ehCadastro
        ? Store.cadastrar(campoNome.value, campoEmail.value, campoSenha.value)
            .then(function (entrouDireto) {
              if (!entrouDireto) {
                mostrarErro("Conta criada! Confirme o link que enviamos no seu e-mail e depois entre.");
                loginModo = "entrar";
                return "parar";
              }
            })
        : Store.entrarComSenha(campoEmail.value, campoSenha.value);

      acao.then(function (r) {
        if (r === "parar") { botao.disabled = false; telaLogin(); return; }
        carregarERotear();
      }).catch(function (e) {
        mostrarErro(traduzErro(e));
        botao.disabled = false;
        botao.textContent = ehCadastro ? "Criar conta" : "Entrar";
      });
    }

    var campos = [];
    if (ehCadastro) {
      campos.push(el("div", { class: "campo" }, [
        el("label", { class: "campo__rotulo", for: "campo-nome" }, ["Seu nome"]),
        campoNome
      ]));
    }
    campos.push(el("div", { class: "campo" }, [
      el("label", { class: "campo__rotulo", for: "campo-email" }, ["E-mail"]),
      campoEmail
    ]));
    campos.push(el("div", { class: "campo" }, [
      el("label", { class: "campo__rotulo", for: "campo-senha" }, ["Senha"]),
      comOlhoDeSenha(campoSenha)
    ]));

    var linkEsqueci = el("button", { class: "login__link", type: "button",
      onclick: pedirNovaSenha }, ["Esqueceu a senha?"]);

    var form = el("form", { class: "form", onsubmit: enviar },
      campos
        .concat(ehCadastro ? [] : [el("div", { class: "login__esqueci" }, [linkEsqueci])])
        .concat([erro, info, botao]));

    var trocar = el("button", { class: "btn btn--ghost login__troca", type: "button",
      onclick: function () {
        loginModo = ehCadastro ? "entrar" : "cadastrar";
        telaLogin();
      } }, [ehCadastro ? "Já tenho conta · Entrar" : "Criar uma conta"]);

    montarTela(el("div", { class: "container login" }, [
      el("div", { class: "brandcard" }, [
        el("img", { class: "brandcard__marca", src: "assets/logo-mark.png", alt: "" }),
        el("img", { class: "brandcard__logo", src: "assets/logo-lockup.png",
          alt: "Cleri Alves, Mentora Cristã", width: "1036", height: "489" })
      ]),
      el("h1", { class: "login__titulo",
        text: ehCadastro ? "Crie o seu espaço" : "Entre no seu espaço" }),
      el("p", { class: "login__sub",
        text: "Tudo que você comprou fica reunido aqui: cursos, mentorias e o Clube do Livro." }),
      form,
      el("p", { class: "login__troca-rot",
        text: ehCadastro ? "Já tem conta?" : "Primeira vez aqui?" }),
      trocar
    ]));

    campoEmail.focus();
  }

  /* =======================================================
     TELA · Criar uma senha nova (fluxo "esqueci a senha")
     ======================================================= */
  function telaNovaSenha() {
    var campoSenha = el("input", { class: "campo__input", type: "password",
      autocomplete: "new-password", placeholder: "Nova senha (mínimo 6)", minlength: "6" });
    var campoSenha2 = el("input", { class: "campo__input", type: "password",
      autocomplete: "new-password", placeholder: "Repita a nova senha", minlength: "6" });
    var erro = el("p", { class: "form-erro", hidden: "hidden" });
    var botao = el("button", { class: "btn btn--primario", type: "submit" },
      ["Salvar nova senha"]);

    function enviar(ev) {
      if (ev) ev.preventDefault();
      erro.hidden = true;
      var s = campoSenha.value, s2 = campoSenha2.value;
      if (s.length < 6) {
        erro.textContent = "A senha precisa ter pelo menos 6 caracteres."; erro.hidden = false; return;
      }
      if (s !== s2) {
        erro.textContent = "As duas senhas precisam ser iguais."; erro.hidden = false; return;
      }
      botao.disabled = true; botao.textContent = "Salvando...";
      Store.definirNovaSenha(s).then(function () {
        modoRecuperacao = false;
        loginModo = "entrar";
        if (location.hash && location.hash !== "#/") location.hash = "/";
        carregarERotear();
      }).catch(function () {
        erro.textContent = "Não consegui salvar agora. Abra o link do e-mail de novo.";
        erro.hidden = false;
        botao.disabled = false; botao.textContent = "Salvar nova senha";
      });
    }

    var form = el("form", { class: "form", onsubmit: enviar }, [
      el("div", { class: "campo" }, [
        el("label", { class: "campo__rotulo" }, ["Nova senha"]), comOlhoDeSenha(campoSenha)
      ]),
      el("div", { class: "campo" }, [
        el("label", { class: "campo__rotulo" }, ["Confirmar"]), comOlhoDeSenha(campoSenha2)
      ]),
      erro, botao
    ]);

    montarTela(el("div", { class: "container login" }, [
      el("div", { class: "brandcard" }, [
        el("img", { class: "brandcard__marca", src: "assets/logo-mark.png", alt: "" }),
        el("img", { class: "brandcard__logo", src: "assets/logo-lockup.png",
          alt: "Cleri Alves, Mentora Cristã", width: "1036", height: "489" })
      ]),
      el("h1", { class: "login__titulo", text: "Criar uma senha nova" }),
      el("p", { class: "login__sub",
        text: "Escolha a senha que você vai usar para entrar daqui pra frente." }),
      form
    ]));

    campoSenha.focus();
  }

  /* =======================================================
     TELA · Início (Área de Membros)
     ======================================================= */
  function cartaoHumor(aluna) {
    var opcoes = [
      { v: "forca", rotulo: "Precisando de força",
        frase: "“Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.”  ·  Salmos 46:1" },
      { v: "paz", rotulo: "Em paz",
        frase: "“E a paz de Deus guardará o seu coração e a sua mente em Cristo Jesus.”  ·  Filipenses 4:7" },
      { v: "grata", rotulo: "Grata",
        frase: "“Em tudo dai graças, porque esta é a vontade de Deus.”  ·  1 Tessalonicenses 5:18" }
    ];
    var caixa = el("section", { class: "humor" });

    function pintar() {
      caixa.innerHTML = "";
      caixa.appendChild(el("p", { class: "humor__titulo", text: "Como está o seu coração hoje?" }));
      var escolhida = opcoes.find(function (o) { return o.v === Store.humorDeHoje(aluna.id); });
      if (escolhida) {
        caixa.appendChild(el("p", { class: "humor__frase", text: escolhida.frase }));
        caixa.appendChild(el("button", { class: "humor__trocar", type: "button",
          onclick: function () { Store.definirHumor(aluna.id, ""); pintar(); } },
          ["Escolher outra"]));
      } else {
        caixa.appendChild(el("div", { class: "humor__ops" }, opcoes.map(function (o) {
          return el("button", { class: "humor__op", type: "button",
            onclick: function () { Store.definirHumor(aluna.id, o.v); pintar(); } },
            [o.rotulo]);
        })));
      }
    }
    pintar();
    return caixa;
  }

  function acharContinuar(aluna) {
    var produtos = aluna.produtos
      .map(function (id) { return SEED.produtos.find(function (p) { return p.id === id; }); })
      .filter(Boolean);

    for (var i = 0; i < produtos.length; i++) {
      var p = produtos[i];
      var feito = Store.contarConcluidas(aluna.id, p);
      if (feito > 0 && feito < p.aulas.length) {
        return { produto: p, aula: Store.proximaAulaEmAberto(aluna.id, p), comecar: false };
      }
    }
    for (var j = 0; j < produtos.length; j++) {
      var q = produtos[j];
      var aberta = Store.proximaAulaEmAberto(aluna.id, q);
      if (aberta) return { produto: q, aula: aberta, comecar: true };
    }
    return null;
  }

  function telaInicio(aluna) {
    var partes = [barraTopo({ saudacao: aluna }),
      el("div", { class: "container inicio" }, montarInterior())];

    function montarInterior() {
      var itens = [cartaoHumor(aluna)];

      /* Novidades desde a última visita (anúncios da rede + eventos) */
      var nv = Store.novidades();
      if (nv.total > 0) {
        var linhas = [];
        if (nv.anuncios) {
          linhas.push(el("a", { class: "novidades__item", href: "#/networking" }, [
            ico(D.estrela),
            el("span", { text: nv.anuncios + (nv.anuncios === 1
              ? " negócio novo na rede" : " negócios novos na rede") })
          ]));
        }
        if (nv.eventos) {
          linhas.push(el("a", { class: "novidades__item", href: "#/agenda" }, [
            ico(D.agenda),
            el("span", { text: nv.eventos + (nv.eventos === 1
              ? " evento novo na agenda" : " eventos novos na agenda") })
          ]));
        }
        itens.push(el("section", { class: "novidades" }, [
          el("span", { class: "novidades__titulo", text: "Novidades pra você" })
        ].concat(linhas)));
      }

      /* Continue de onde parou (só produtos que a aluna já tem) */
      var c = acharContinuar(aluna);
      if (c) {
        itens.push(el("a", {
          class: "destaque tint--" + classeCategoria(c.produto.categoria),
          href: "#/produto/" + c.produto.id + "/aula/" + c.aula.id
        }, [
          el("img", { class: "destaque__marca", src: "assets/logo-mark.png", alt: "" }),
          el("span", { class: "destaque__eyebrow",
            text: c.comecar ? "Comece por aqui" : "Continue de onde parou" }),
          el("span", { class: "destaque__produto", text: c.produto.nome }),
          el("span", { class: "destaque__aula", text: c.aula.titulo }),
          el("span", { class: "destaque__btn" }, [ico(D.play), "Continuar"])
        ]));
      }

      var todos = (SEED.produtos || []).filter(function (p) {
        return !p.oculto && p.categoria !== "Rede";
      });

      /* Carrossel de destaque */
      var destaques = todos.filter(function (p) { return p.destaque; });
      if (destaques.length) {
        itens.push(el("section", { class: "fileira" }, [
          el("h2", { class: "fileira__titulo", text: "Para você" }),
          el("div", { class: "trilho trilho--hero" },
            destaques.map(function (p) { return cardDestaque(aluna, p); }))
        ]));
      }

      /* Uma fileira por categoria, na ordem em que os produtos vêm */
      var cats = [];
      todos.forEach(function (p) {
        if (cats.indexOf(p.categoria) === -1) cats.push(p.categoria);
      });
      cats.forEach(function (cat) {
        var doGrupo = todos.filter(function (p) { return p.categoria === cat; });
        itens.push(el("section", { class: "fileira" }, [
          el("h2", { class: "fileira__titulo", text: rotuloCategoria(cat) }),
          el("div", { class: "trilho" },
            doGrupo.map(function (p) { return cardVitrine(aluna, p); }))
        ]));
      });

      /* Seu espaço livre: Devocional + Comunidade (sempre abertos) */
      itens.push(el("section", { class: "fileira" }, [
        el("h2", { class: "fileira__titulo", text: "Seu espaço, todo dia" }),
        el("div", { class: "trilho" }, [
          cardFixo("Devocional", "Palavra e diário", "assets/capas/devocional.jpg", "#/devocional"),
          cardFixo("Comunidade", "Caminhar junto", "assets/capas/comunidade.jpg", "#/comunidade"),
          cardFixo("Networking Cristão", "A rede das alunas", "assets/capas/networking-card.jpg", "#/networking")
        ])
      ]));

      return itens;
    }

    montarTela(el("div", {}, partes));
  }

  /* =======================================================
     TELA · Produto bloqueado (vitrine / venda)
     ======================================================= */
  function reais(v) {
    return (v != null && v !== "")
      ? "R$ " + Number(v).toFixed(2).replace(".", ",") : null;
  }

  function telaProdutoVenda(aluna, produto) {
    var cls = classeCategoria(produto.categoria);
    var ehClube = !!(produto.turmas && produto.turmas.length);
    var ehAssinatura = produto.categoria === "Grupo VIP";

    /* Bloco de compra:
       - Clube  -> cards das próximas temporadas (capa + livro + preço + botão)
       - demais -> lista de ofertas (ou os campos simples) */
    var blocoCompra;
    if (ehClube) {
      var proximas = produto.turmas.filter(function (t) { return !t.atual; });
      blocoCompra = proximas.length
        ? el("div", { class: "turmas" }, proximas.map(cardTurmaProxima))
        : el("p", { class: "venda__nota", text: "Uma nova temporada abre em breve." });
    } else {
      var ofertas = (produto.ofertas && produto.ofertas.length)
        ? produto.ofertas
        : ((produto.link_compra || produto.preco != null)
            ? [{ rotulo: ehAssinatura ? "Assinar agora" : "Comprar agora",
                 preco: produto.preco, link_compra: produto.link_compra }]
            : []);
      blocoCompra = ofertas.length
        ? el("div", { class: "venda__ofertas" }, ofertas.map(function (o) {
            var precoTxt = reais(o.preco);
            var interno = [
              el("span", { text: o.rotulo }),
              el("span", { class: "venda__oferta-preco",
                text: precoTxt || (o.link_compra ? "" : "Em breve") })
            ];
            return o.link_compra
              ? el("a", { class: "btn btn--primario venda__oferta",
                  href: o.link_compra, target: "_blank", rel: "noopener" }, interno)
              : el("button", { class: "btn btn--primario venda__oferta",
                  type: "button", disabled: "disabled" }, interno);
          }))
        : el("button", { class: "btn btn--primario", type: "button",
            disabled: "disabled" }, ["Em breve"]);
    }

    montarTela(el("div", {}, [
      barraTopo({ voltarHref: "/", voltarLabel: "Início" }),
      el("div", { class: "container venda" }, [
        el("div", { class: "venda__capa tint--" + cls }, [
          capaDeProduto(produto),
          el("span", { class: "venda__cad" }, [ico(D.cadeado)])
        ]),
        el("span", { class: "eyebrow", text: produto.categoria }),
        el("h1", { class: "venda__nome", text: produto.nome }),
        produto.subtitulo
          ? el("p", { class: "venda__sub", text: produto.subtitulo }) : null,
        el("p", { class: "venda__desc", text: produto.descricao }),
        ehClube
          ? el("p", { class: "venda__nota",
              text: "Cada temporada lê um livro. Ao entrar, você acompanha os encontros dessa temporada." })
          : null,
        ehAssinatura
          ? el("p", { class: "venda__nota",
              text: "Assinatura mensal recorrente. Você pode cancelar quando quiser — o acesso continua até o fim do período já pago." })
          : null,
        (produto.beneficios && produto.beneficios.length)
          ? el("section", { class: "venda__bloco" }, [
              el("h2", { class: "venda__bloco-titulo", text: "O que você vai conquistar" }),
              el("ul", { class: "venda__beneficios" }, produto.beneficios.map(function (b) {
                return el("li", {}, [ico(D.check, "venda__beneficio-ico"),
                  el("span", { text: b })]);
              }))
            ])
          : null,
        previaEstrutura(produto),
        blocoCompra,
        el("p", { class: "venda__nota",
          text: ehAssinatura
            ? "Assim que o pagamento for confirmado, o Grupo VIP aparece aqui na sua conta. As renovações mantêm o acesso automaticamente."
            : "Assim que a compra for confirmada, o acesso aparece aqui na sua conta." })
      ])
    ]));
  }

  /* Prévia (com cadeado) do que tem dentro do produto — usada na tela de venda.
     Serve pra dar noção do tamanho do conteúdo sem liberar o acesso. */
  function previaEstrutura(produto) {
    var itens = [];
    if (produto.pilares && produto.pilares.length) {
      itens = produto.pilares.slice()
        .sort(function (a, b) { return (a.ordem || 0) - (b.ordem || 0); })
        .map(function (pl) {
          var n = (pl.aulas || []).length;
          return { nome: pl.nome, sub: pl.ao_vivo
            ? (n + " gravações")
            : (pl.aberto ? "em breve" : n + (n === 1 ? " aula" : " aulas")) };
        });
    } else if (produto.turmas && produto.turmas.length) {
      itens = produto.turmas.map(function (t) {
        return { nome: t.livro || t.titulo,
          sub: (t.aulas || []).length + " encontros" };
      });
    } else if ((produto.aulas || []).length) {
      itens = produto.aulas.map(function (a, i) {
        return { nome: a.titulo,
          sub: "Aula " + (i + 1) + (a.tipo === "texto" ? " · leitura" : "") };
      });
    }
    if (!itens.length) return null;

    return el("section", { class: "venda__bloco" }, [
      el("h2", { class: "venda__bloco-titulo", text: "O que tem por dentro" }),
      el("ul", { class: "venda__previa" }, itens.map(function (it) {
        return el("li", { class: "venda__previa-item" }, [
          el("span", { class: "venda__previa-txt" }, [
            el("span", { class: "venda__previa-nome", text: it.nome }),
            it.sub ? el("span", { class: "venda__previa-sub", text: it.sub }) : null
          ]),
          ico(D.cadeado, "venda__previa-cad")
        ]);
      })),
      el("p", { class: "venda__nota",
        text: "O conteúdo completo abre assim que o seu acesso for liberado." })
    ]);
  }

  /* =======================================================
     TELA · Curso / Mentoria
     A Mentoria Poder & Propósito tem um seletor: Aulas | Jornada COROA.
     ======================================================= */
  function telaProduto(aluna, produto, sub) {
    var ehMentoria = produto.id === ID_MENTORIA;
    sub = ehMentoria ? (sub || "") : "";
    var cls = classeCategoria(produto.categoria);

    var cabecalho = [
      el("span", { class: "capa capa--" + cls + " tint--" + cls }, [
        el("img", { class: "capa__marca", src: "assets/logo-mark.png", alt: "" }),
        el("span", { class: "capa__cat", text: produto.categoria })
      ]),
      el("h1", { class: "curso__titulo", text: produto.nome }),
      el("p", { class: "curso__desc", text: produto.descricao })
    ];

    var corpo;
    if (ehMentoria) {
      var abas = [
        { id: "",        label: "Aulas" },
        { id: "jornada", label: "Jornada COROA" }
      ];
      cabecalho.push(el("div", { class: "segmentos" }, abas.map(function (s) {
        return el("a", {
          class: "segmento" + (s.id === sub ? " segmento--ativo" : ""),
          href: "#/produto/" + produto.id + (s.id ? "/" + s.id : "")
        }, [s.label]);
      })));
      corpo = (sub === "jornada") ? viewJornadaCoroa(aluna) : viewAulas(aluna, produto);
    } else if (produto.pilares && produto.pilares.length) {
      corpo = viewPilares(aluna, produto);
    } else if (produto.turmas) {
      corpo = viewClubeTurmas(aluna, produto);
    } else if ((produto.aulas || []).length === 0) {
      corpo = viewMateriais(produto);
    } else {
      corpo = viewAulas(aluna, produto);
    }

    var extras = [corpo];
    /* Se o produto tem aulas E materiais, mostra os materiais embaixo também. */
    if ((produto.aulas || []).length && (produto.materiais || []).length) {
      extras.push(el("h2", { class: "secao__titulo", text: "Materiais" }));
      extras.push(viewMateriais(produto));
    }

    montarTela(el("div", {}, [
      barraTopo({ voltarHref: "/", voltarLabel: "Início" }),
      el("div", { class: "container" }, cabecalho.concat(extras))
    ]));
  }

  /* Lista de materiais (PDF etc.) — abre por link temporário do Storage privado. */
  function viewMateriais(produto) {
    var lista = produto.materiais || [];
    if (!lista.length) {
      return el("div", { class: "vazio" }, [
        el("p", { text: "O material deste produto vai aparecer aqui." })
      ]);
    }
    return el("ul", { class: "materiais" }, lista.map(function (m) {
      var btn = el("button", { class: "material", type: "button" }, [
        ico(D.livro2, "material__ico"),
        el("span", { class: "material__txt" }, [
          el("span", { class: "material__titulo", text: m.titulo }),
          el("span", { class: "material__tipo",
            text: m.tipo === "pdf" ? "PDF" : (m.tipo === "epub" ? "E-book" : "Arquivo") })
        ]),
        ico(D.avancar, "material__seta")
      ]);
      btn.addEventListener("click", function () {
        btn.disabled = true;
        Store.linkMaterial(m.arquivo_path).then(function (url) {
          btn.disabled = false;
          if (url) window.open(url, "_blank", "noopener");
          else alert("Não consegui abrir o material agora. Tente de novo em instantes.");
        });
      });
      return el("li", {}, [btn]);
    }));
  }

  /* Capa de uma temporada do Clube (arte enviada ou gerada). */
  function capaTurma(t) {
    if (t.capa_url) {
      return el("img", { class: "capa-img", src: t.capa_url, alt: "", loading: "lazy" });
    }
    return el("div", { class: "capa-gerada tint--clube" }, [
      el("img", { class: "capa-gerada__marca", src: "assets/logo-mark.png", alt: "" }),
      el("span", { class: "capa-gerada__cat", text: "Clube do Livro" }),
      el("span", { class: "capa-gerada__nome", text: t.livro })
    ]);
  }

  /* Encontros da temporada em cards com a capa do vídeo. */
  function listaEncontros(aluna, produto, arr) {
    if (!arr || !arr.length) {
      return el("div", { class: "vazio" }, [
        el("p", { text: "As gravações desta temporada aparecem aqui." })
      ]);
    }
    var n = 0;
    return el("div", { class: "encontros" }, arr.map(function (aula) {
      var intro = /^boas[- ]?vindas/i.test(aula.titulo || "");
      if (!intro) n++;
      var meta = intro ? "Comece por aqui" : "Encontro " + n;
      var ok = Store.aulaConcluida(aluna.id, produto.id, aula.id);
      var thumb = thumbYoutube(aula.video_url);
      var arte = el("div", { class: "encontro__thumb" }, [
        thumb
          ? el("img", { src: thumb, alt: "", loading: "lazy" })
          : el("div", { class: "capa-gerada tint--clube" }, [
              el("img", { class: "capa-gerada__marca", src: "assets/logo-mark.png", alt: "" }),
              el("span", { class: "capa-gerada__nome", text: aula.titulo })
            ]),
        el("span", { class: "encontro__play" }, [ico(D.play)]),
        ok ? el("span", { class: "encontro__ok" }, [ico(D.check)]) : null
      ]);
      return el("a", {
        class: "encontro" + (ok ? " encontro--ok" : ""),
        href: "#/produto/" + produto.id + "/aula/" + aula.id
      }, [
        arte,
        el("div", { class: "encontro__txt" }, [
          el("span", { class: "encontro__meta", text: meta }),
          el("span", { class: "encontro__titulo", text: aula.titulo })
        ])
      ]);
    }));
  }

  /* Card visual de uma temporada que ainda vai começar (usado na tela do
     Clube e também na tela de venda pra quem não é membro). */
  function cardTurmaProxima(t) {
    var precoTxt = reais(t.preco);
    var acao = t.link_compra
      ? el("a", { class: "btn btn--primario", href: t.link_compra,
          target: "_blank", rel: "noopener" }, ["Quero participar"])
      : el("button", { class: "btn btn--primario", type: "button", disabled: "disabled" },
          ["Em breve"]);
    return el("div", { class: "turma turma--proxima" }, [
      el("div", { class: "turma__capa tint--clube" }, [capaTurma(t)]),
      el("span", { class: "eyebrow", text: "Próxima temporada" }),
      el("h2", { class: "turma__livro", text: t.livro }),
      t.autor ? el("p", { class: "turma__autor", text: "de " + t.autor }) : null,
      precoTxt ? el("p", { class: "turma__preco", text: precoTxt + " · sem o livro" }) : null,
      acao
    ]);
  }

  /* Tela do Clube: temporada atual (com encontros) + próximas temporadas. */
  function viewClubeTurmas(aluna, produto) {
    var turmas = produto.turmas || [];
    var blocos = [];

    turmas.filter(function (t) { return t.atual; }).forEach(function (t) {
      blocos.push(el("div", { class: "turma" }, [
        el("span", { class: "eyebrow", text: "Temporada atual" }),
        el("h2", { class: "turma__livro", text: t.livro }),
        t.autor ? el("p", { class: "turma__autor", text: "de " + t.autor }) : null,
        listaEncontros(aluna, produto, t.aulas)
      ]));
    });

    turmas.filter(function (t) { return !t.atual; }).forEach(function (t) {
      blocos.push(cardTurmaProxima(t));
    });

    return el("div", { class: "turmas" }, blocos);
  }

  /* =======================================================
     TELA · Grupo VIP — pilares como cartões com capa
     ======================================================= */
  function viewPilares(aluna, produto) {
    var pilares = (produto.pilares || []).slice().sort(function (a, b) {
      return (a.ordem || 0) - (b.ordem || 0);
    });
    var feito = Store.contarConcluidas(aluna.id, produto);
    var total = (produto.aulas || []).length;

    var partes = [
      el("div", { class: "curso__progresso" }, [
        barraProgresso(feito, total),
        el("span", { class: "curso__progresso-txt", text: feito + " de " + total + " aulas" })
      ]),
      el("p", { class: "pilares__nota",
        text: "As trilhas abrem aos poucos, contando a partir do dia em que você entrou: a primeira já na entrada, mais duas depois de 7 dias e as demais depois de 14 dias. As lives ao vivo estão sempre liberadas." })
    ];

    var lives = livesDoProduto(produto.id, null);
    if (lives.length) {
      partes.push(el("h2", { class: "secao__titulo", text: "Calendário das lives" }));
      partes.push(calendarioLives(lives));
    }

    partes.push(el("h2", { class: "secao__titulo", text: "Pilares" }));
    partes.push(el("div", { class: "pilar-grade" }, pilares.map(function (pl) {
      return cardPilar(aluna, produto, pl);
    })));

    return el("div", {}, partes);
  }

  function capaDePilar(pl) {
    if (pl.capa_url) {
      return el("img", { class: "capa-img", src: pl.capa_url, alt: "", loading: "lazy" });
    }
    return el("div", { class: "capa-gerada tint--vip" }, [
      el("img", { class: "capa-gerada__marca", src: "assets/logo-mark.png", alt: "" }),
      el("span", { class: "capa-gerada__cat", text: pl.ao_vivo ? "Ao vivo" : "Pilar" }),
      el("span", { class: "capa-gerada__nome", text: pl.nome })
    ]);
  }

  /* Liberação por calendário: cada pilar abre `dias_liberacao` dias depois
     da data em que a aluna entrou no produto (acessos.liberado_em).
     A mentora e o pilar de lives veem tudo aberto; sem data de entrada,
     libera (não trava a aluna por falta de dado). */
  function statusPilar(aluna, produto, pl) {
    var dias = Math.max(0, Number(pl && pl.dias_liberacao) || 0);
    if (aluna.papel === "mentora" || (pl && pl.ao_vivo) || dias === 0) {
      return { liberado: true, abreEm: null, faltamDias: 0 };
    }
    var entradaISO = Store.dataEntrada(produto.id);
    if (!entradaISO) return { liberado: true, abreEm: null, faltamDias: 0 };

    var abre = new Date(entradaISO);
    abre.setHours(0, 0, 0, 0);
    abre.setDate(abre.getDate() + dias);
    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    var faltam = Math.round((abre.getTime() - hoje.getTime()) / 86400000);
    return { liberado: faltam <= 0, abreEm: abre, faltamDias: Math.max(0, faltam) };
  }

  function textoAbre(st) {
    if (st.faltamDias <= 1) return "Abre amanhã";
    return "Abre em " + st.faltamDias + " dias";
  }

  function cardPilar(aluna, produto, pl) {
    var aulas = pl.aulas || [];
    var feitas = aulas.filter(function (a) {
      return Store.aulaConcluida(aluna.id, produto.id, a.id);
    }).length;
    var completo = aulas.length && feitas === aulas.length;
    var st = statusPilar(aluna, produto, pl);

    if (!st.liberado) {
      return el("div", { class: "capa-card pilar-card pilar-card--bloq capa-card--bloq" }, [
        el("div", { class: "capa-card__arte" }, [
          capaDePilar(pl),
          el("span", { class: "capa-card__cad" }, [ico(D.cadeado)])
        ]),
        el("span", { class: "capa-card__nome", text: pl.nome }),
        el("span", { class: "capa-card__sub",
          text: textoAbre(st) + (st.abreEm ? " · " + dataCurta(st.abreEm) : "") })
      ]);
    }

    var meta = pl.ao_vivo
      ? (aulas.length + (aulas.length === 1 ? " gravação" : " gravações"))
      : (pl.aberto
          ? "Vaga aberta"
          : (aulas.length
              ? aulas.length + (aulas.length === 1 ? " aula" : " aulas")
              : "Em breve"));
    var sub = (feitas && !completo) ? feitas + "/" + aulas.length + " · " + meta : meta;

    return el("a", {
      class: "capa-card pilar-card" + (pl.aberto ? " pilar-card--vaga" : ""),
      href: "#/produto/" + produto.id + "/pilar/" + pl.id
    }, [
      el("div", { class: "capa-card__arte" }, [
        capaDePilar(pl),
        completo ? el("span", { class: "pilar-card__ok" }, [ico(D.check)]) : null
      ]),
      el("span", { class: "capa-card__nome", text: pl.nome }),
      el("span", { class: "capa-card__sub", text: sub })
    ]);
  }

  /* Próximas lives de um produto (opcionalmente de um pilar), em ordem de data. */
  function proximasLives(produtoSlug, pilarSlug) {
    var limite = Date.now() - 2 * 3600 * 1000;   /* mantém a de hoje visível */
    return (SEED.eventos || []).filter(function (ev) {
      if (ev.produtoId !== produtoSlug) return false;
      if (pilarSlug && ev.pilarId !== pilarSlug) return false;
      return new Date(ev.data).getTime() >= limite;
    }).sort(function (a, b) { return String(a.data).localeCompare(String(b.data)); });
  }

  function horaCurta(d) {
    var h = d.getHours(), m = d.getMinutes();
    return h + "h" + (m ? (m < 10 ? "0" + m : m) : "");
  }

  function secaoProximasLives(lives, titulo) {
    return el("section", { class: "cronograma" }, [
      el("h2", { class: "secao__titulo", text: titulo || "Cronograma ao vivo" }),
      el("ul", { class: "cronograma__lista" }, lives.slice(0, 8).map(function (ev) {
        var d = new Date(ev.data);
        var interno = [
          el("span", { class: "cronograma__data",
            text: dataExtenso(d) + " · " + horaCurta(d) }),
          el("span", { class: "cronograma__titulo", text: ev.titulo })
        ];
        return el("li", {},
          [ev.link
            ? el("a", { class: "cronograma__item", href: ev.link,
                target: "_blank", rel: "noopener" },
                interno.concat([ico(D.link, "cronograma__ico")]))
            : el("div", { class: "cronograma__item" }, interno)]);
      }))
    ]);
  }

  /* Todas as lives de um produto (passadas e futuras), em ordem de data. */
  function livesDoProduto(produtoSlug, pilarSlug) {
    return (SEED.eventos || []).filter(function (ev) {
      if (ev.produtoId !== produtoSlug) return false;
      if (pilarSlug && ev.pilarId !== pilarSlug) return false;
      return true;
    }).sort(function (a, b) { return String(a.data).localeCompare(String(b.data)); });
  }

  /* Calendário mensal das lives, com o nome da aula marcado no dia.
     Widget com estado próprio (mês atual + navegação). */
  function calendarioLives(lives) {
    var hoje = new Date();
    var cursor = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

    /* Começa no mês da próxima live, se o mês atual não tiver nenhuma. */
    var inicioMesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    var temNoMes = lives.some(function (ev) {
      var d = new Date(ev.data);
      return d.getFullYear() === cursor.getFullYear() && d.getMonth() === cursor.getMonth();
    });
    if (!temNoMes) {
      var futura = lives.filter(function (ev) { return new Date(ev.data) >= inicioMesAtual; })[0];
      if (futura) {
        var f = new Date(futura.data);
        cursor = new Date(f.getFullYear(), f.getMonth(), 1);
      }
    }

    var wrap = el("section", { class: "cal" });
    desenhar();
    return wrap;

    function noDia(ano, mes, dia) {
      return lives.filter(function (ev) {
        var d = new Date(ev.data);
        return d.getFullYear() === ano && d.getMonth() === mes && d.getDate() === dia;
      }).sort(function (a, b) { return String(a.data).localeCompare(String(b.data)); });
    }

    function desenhar() {
      wrap.innerHTML = "";
      var ano = cursor.getFullYear(), mes = cursor.getMonth();
      var comecaEm = new Date(ano, mes, 1).getDay();       /* 0 = domingo */
      var totalDias = new Date(ano, mes + 1, 0).getDate();

      var prev = el("button", { class: "cal__nav", type: "button",
        "aria-label": "Mês anterior" }, [ico(D.voltar)]);
      var next = el("button", { class: "cal__nav", type: "button",
        "aria-label": "Próximo mês" }, [ico(D.avancar)]);
      prev.addEventListener("click", function () { cursor = new Date(ano, mes - 1, 1); desenhar(); });
      next.addEventListener("click", function () { cursor = new Date(ano, mes + 1, 1); desenhar(); });

      wrap.appendChild(el("div", { class: "cal__topo" }, [
        prev,
        el("span", { class: "cal__mes",
          text: MESES[mes].charAt(0).toUpperCase() + MESES[mes].slice(1) + " de " + ano }),
        next
      ]));

      wrap.appendChild(el("div", { class: "cal__semana" },
        ["D", "S", "T", "Q", "Q", "S", "S"].map(function (s) {
          return el("span", { class: "cal__sigla", text: s });
        })));

      var celulas = [];
      for (var i = 0; i < comecaEm; i++) {
        celulas.push(el("span", { class: "cal__dia cal__dia--vazio" }));
      }
      for (var dia = 1; dia <= totalDias; dia++) {
        var evs = noDia(ano, mes, dia);
        var ehHoje = ano === hoje.getFullYear() && mes === hoje.getMonth() && dia === hoje.getDate();
        var filhos = [el("span", { class: "cal__num", text: String(dia) })];
        if (evs.length) {
          filhos.push(el("span", { class: "cal__rotulo",
            text: tituloDaLive(evs[0].titulo) }));
          if (evs.length > 1) {
            filhos.push(el("span", { class: "cal__mais", text: "+" + (evs.length - 1) }));
          }
        }
        celulas.push(el("span", {
          class: "cal__dia" + (evs.length ? " cal__dia--live" : "") +
            (ehHoje ? " cal__dia--hoje" : "")
        }, filhos));
      }
      wrap.appendChild(el("div", { class: "cal__grade" }, celulas));

      var doMes = lives.filter(function (ev) {
        var d = new Date(ev.data);
        return d.getFullYear() === ano && d.getMonth() === mes;
      });
      if (doMes.length) {
        wrap.appendChild(el("ul", { class: "cal__lista" }, doMes.map(function (ev) {
          var d = new Date(ev.data);
          var interno = [
            el("span", { class: "cal__lista-data", text: d.getDate() + " · " + horaCurta(d) }),
            el("span", { class: "cal__lista-titulo", text: ev.titulo })
          ];
          return el("li", {}, [ev.link
            ? el("a", { class: "cal__lista-item", href: ev.link,
                target: "_blank", rel: "noopener" }, interno)
            : el("div", { class: "cal__lista-item" }, interno)]);
        })));
      } else {
        wrap.appendChild(el("p", { class: "cal__vazio",
          text: "Sem lives marcadas neste mês." }));
      }
    }

    /* Tira um "Live · " do começo pra caber melhor na célula. */
    function tituloDaLive(t) {
      return String(t || "").replace(/^\s*live\s*[·:-]\s*/i, "");
    }
  }

  /* =======================================================
     TELA · Pilar do Grupo VIP (trilha de aulas)
     ======================================================= */
  function telaPilar(aluna, produto, pilar) {
    var aulas = pilar.aulas || [];
    var feitas = aulas.filter(function (a) {
      return Store.aulaConcluida(aluna.id, produto.id, a.id);
    }).length;
    var lives = pilar.ao_vivo ? [] : proximasLives(produto.id, pilar.id);
    var st = statusPilar(aluna, produto, pilar);

    if (!st.liberado) {
      montarTela(el("div", {}, [
        barraTopo({ voltarHref: "/produto/" + produto.id, voltarLabel: produto.nome }),
        el("div", { class: "container" }, [
          el("span", { class: "capa capa--vip tint--vip" }, [
            el("img", { class: "capa__marca", src: "assets/logo-mark.png", alt: "" }),
            el("span", { class: "capa__cat", text: "Pilar do Grupo VIP" })
          ]),
          el("h1", { class: "curso__titulo", text: pilar.nome }),
          pilar.descricao ? el("p", { class: "curso__desc", text: pilar.descricao }) : null,
          el("div", { class: "pilar-bloq" }, [
            el("span", { class: "pilar-bloq__ico" }, [ico(D.cadeado)]),
            el("p", { class: "pilar-bloq__titulo", text: textoAbre(st) }),
            el("p", { class: "pilar-bloq__txt", text: st.abreEm
              ? "Esta trilha abre no dia " + dataCurta(st.abreEm) + ", contando a partir da sua entrada no Grupo VIP."
              : "Esta trilha ainda não está liberada para você." })
          ])
        ])
      ]));
      return;
    }

    var corpo = [
      el("span", { class: "capa capa--vip tint--vip" }, [
        el("img", { class: "capa__marca", src: "assets/logo-mark.png", alt: "" }),
        el("span", { class: "capa__cat",
          text: pilar.ao_vivo ? "Encontros ao vivo" : "Pilar do Grupo VIP" })
      ]),
      el("h1", { class: "curso__titulo", text: pilar.nome }),
      pilar.descricao ? el("p", { class: "curso__desc", text: pilar.descricao }) : null,
      (!pilar.ao_vivo && pilar.cadencia_ao_vivo)
        ? el("p", { class: "pilar__cadencia" }, [
            ico(D.agenda), el("span", { text: "Lives: " + pilar.cadencia_ao_vivo })
          ])
        : null,
      el("div", { class: "curso__progresso" }, [
        barraProgresso(feitas, aulas.length),
        el("span", { class: "curso__progresso-txt",
          text: feitas + " de " + aulas.length + " aulas" })
      ])
    ];
    if (lives.length) corpo.push(secaoProximasLives(lives, "Próximas lives deste pilar"));
    corpo.push(el("h2", { class: "secao__titulo",
      text: pilar.ao_vivo ? "Gravações" : "Aulas" }));
    corpo.push(listaAulasPilar(aluna, produto, pilar));

    montarTela(el("div", {}, [
      barraTopo({ voltarHref: "/produto/" + produto.id, voltarLabel: produto.nome }),
      el("div", { class: "container" }, corpo)
    ]));
  }

  function listaAulasPilar(aluna, produto, pl) {
    var aulas = pl.aulas || [];
    if (!aulas.length) {
      return el("div", { class: "vazio" }, [
        el("p", { text: pl.ao_vivo
          ? "As gravações das lives vão aparecer aqui."
          : "As aulas deste pilar vão aparecer aqui." })
      ]);
    }
    return el("ul", { class: "passos" }, aulas.map(function (aula, i) {
      var ok = Store.aulaConcluida(aluna.id, produto.id, aula.id);
      var metaTxt = pl.ao_vivo
        ? (aula.data_aula ? "Live · " + dataCurta(aula.data_aula) : "Gravação")
        : "Aula " + (i + 1) + " · " + (aula.tipo === "texto" ? "Leitura" : "Vídeo");
      return el("li", {}, [
        el("a", {
          class: "passo" + (ok ? " passo--ok" : ""),
          href: "#/produto/" + produto.id + "/aula/" + aula.id
        }, [
          el("span", { class: "passo__num" },
            [ok ? ico(D.check) : el("span", { text: String(i + 1) })]),
          el("span", { class: "passo__txt" }, [
            el("span", { class: "passo__meta", text: metaTxt }),
            el("span", { class: "passo__titulo", text: aula.titulo })
          ]),
          ok
            ? el("span", { class: "selo-ok" }, [ico(D.check), "Concluída"])
            : ico(D.avancar, "passo__seta")
        ])
      ]);
    }));
  }

  function viewAulas(aluna, produto) {
    var feito = Store.contarConcluidas(aluna.id, produto);
    var total = produto.aulas.length;

    var passos = el("ul", { class: "passos" }, produto.aulas.map(function (aula, i) {
      var ok = Store.aulaConcluida(aluna.id, produto.id, aula.id);
      return el("li", {}, [
        el("a", {
          class: "passo" + (ok ? " passo--ok" : ""),
          href: "#/produto/" + produto.id + "/aula/" + aula.id
        }, [
          el("span", { class: "passo__num" },
            [ok ? ico(D.check) : el("span", { text: String(i + 1) })]),
          el("span", { class: "passo__txt" }, [
            el("span", { class: "passo__meta",
              text: "Aula " + (i + 1) + " · " + (aula.tipo === "texto" ? "Leitura" : "Vídeo") }),
            el("span", { class: "passo__titulo", text: aula.titulo })
          ]),
          ok
            ? el("span", { class: "selo-ok" }, [ico(D.check), "Concluída"])
            : ico(D.avancar, "passo__seta")
        ])
      ]);
    }));

    return el("div", {}, [
      el("div", { class: "curso__progresso" }, [
        barraProgresso(feito, total),
        el("span", { class: "curso__progresso-txt", text: feito + " de " + total + " aulas" })
      ]),
      el("h2", { class: "secao__titulo", text: "Aulas" }),
      passos
    ]);
  }

  /* =======================================================
     TELA · Aula
     ======================================================= */
  function telaAula(aluna, produto, aula) {
    var i = produto.aulas.indexOf(aula);
    var proxima = produto.aulas[i + 1];
    var cls = classeCategoria(produto.categoria);

    var midia = montarPlayer(aula.video_url, aula.titulo)
      || el("div", { class: "midia tint--" + cls }, [
           el("img", { class: "midia__marca", src: "assets/logo-mark.png", alt: "" }),
           aula.tipo === "texto"
             ? el("span", { class: "midia__tag" }, [ico(D.livro), "Leitura"])
             : el("span", { class: "midia__play" }, [ico(D.play)]),
           el("span", { class: "midia__legenda",
             text: aula.tipo === "texto" ? "Conteúdo em texto" : "Vídeo da aula" })
         ]);

    var botao = el("button", { class: "btn", type: "button" });
    function pintarBotao() {
      var ok = Store.aulaConcluida(aluna.id, produto.id, aula.id);
      botao.className = "btn " + (ok ? "btn--concluida" : "btn--primario");
      botao.innerHTML = "";
      if (ok) botao.appendChild(ico(D.check));
      botao.appendChild(document.createTextNode(ok ? "Concluída" : "Marcar como concluída"));
    }
    botao.addEventListener("click", function () {
      Store.alternarAula(aluna.id, produto.id, aula.id);
      pintarBotao();
    });
    pintarBotao();

    montarTela(el("div", {}, [
      barraTopo({ voltarHref: "/produto/" + produto.id, voltarLabel: produto.nome }),
      el("div", { class: "container" }, [
        el("span", { class: "eyebrow",
          text: "Aula " + (i + 1) + " de " + produto.aulas.length }),
        el("h1", { class: "aula__titulo", text: aula.titulo }),
        midia,
        el("p", { class: "aula__conteudo", text: aula.conteudo }),
        botao,
        proxima
          ? el("a", { class: "proxima",
              href: "#/produto/" + produto.id + "/aula/" + proxima.id }, [
              el("span", { class: "proxima__label", text: "Próxima aula" }),
              el("span", { class: "proxima__titulo", text: proxima.titulo }),
              ico(D.avancar)
            ])
          : null
      ])
    ]));
  }

  /* =======================================================
     TELA · Em breve (Jornada / Devocional / Comunidade / Perfil)
     ======================================================= */
  function contextoConquistas(aluna) {
    var r = resumoAluna(aluna);
    r.coroaConcluidas = statusCoroa(aluna).concluidas;
    return r;
  }

  /* =======================================================
     TELA · Perfil
     ======================================================= */
  function telaPerfil(aluna) {
    var r = contextoConquistas(aluna);
    var sc = statusCoroa(aluna);
    var inicial = primeiroNome(aluna.nome).charAt(0).toUpperCase();
    var ganhas = CONQUISTAS.filter(function (c) { return c.ganhou(r); }).length;

    /* A Jornada COROA só aparece para quem tem a Mentoria Poder & Propósito. */
    var jornadaBloco = [];
    if (sc.temMentoria) {
      var valor = sc.completa
        ? "Jornada completa"
        : (sc.etapas[sc.atualIndex].letra + " · " + sc.etapas[sc.atualIndex].nome);
      jornadaBloco = [
        el("h2", { class: "secao__titulo", text: "Jornada COROA" }),
        el("a", { class: "mini-jornada tint--mentoria",
          href: "#/produto/" + ID_MENTORIA + "/jornada" }, [
          el("span", { class: "mini-jornada__eyebrow", text: "Método COROA" }),
          el("span", { class: "mini-jornada__valor", text: valor }),
          el("span", { class: "mini-jornada__meta", text: sc.concluidas + " de 5 etapas" }),
          ico(D.avancar, "mini-jornada__seta")
        ])
      ];
    }

    var badges = el("div", { class: "conquistas" }, CONQUISTAS.map(function (c) {
      var ok = c.ganhou(r);
      return el("div", { class: "conquista" + (ok ? " conquista--ok" : "") }, [
        el("span", { class: "conquista__selo" }, [ok ? ico(D[c.icone]) : ico(D.cadeado)]),
        el("span", { class: "conquista__nome", text: c.titulo }),
        el("span", { class: "conquista__desc", text: c.descricao })
      ]);
    }));

    var conteudo = [
      el("div", { class: "perfil-topo" }, [
        el("span", { class: "perfil-avatar", text: inicial }),
        el("div", { class: "perfil-id" }, [
          el("h1", { class: "perfil-nome", text: aluna.nome }),
          el("p", { class: "perfil-email", text: aluna.email })
        ])
      ]),

      el("div", { class: "resumo" }, [
        el("div", { class: "resumo__num" }, [
          el("strong", { text: String(r.aulasFeitas) }),
          el("span", { text: "de " + r.aulasTotais + " aulas concluídas" })
        ]),
        barraProgresso(r.aulasFeitas, r.aulasTotais),
        el("div", { class: "resumo__linha" }, [
          el("span", { text: r.qtdProdutos + (r.qtdProdutos === 1 ? " produto" : " produtos") }),
          el("span", { text: r.produtosCompletos + (r.produtosCompletos === 1 ? " concluído" : " concluídos") }),
          el("span", { text: r.pct + "% no total" })
        ])
      ])
    ].concat(jornadaBloco).concat([
      el("h2", { class: "secao__titulo",
        text: "Conquistas · " + ganhas + " de " + CONQUISTAS.length }),
      badges,
      el("button", { class: "btn btn--ghost perfil-sair", type: "button",
        onclick: function () { Store.sair().then(carregarERotear); } }, ["Sair da conta"])
    ]);

    montarTela(el("div", {}, [
      barraTopo({ titulo: "Perfil" }),
      el("div", { class: "container" }, conteudo)
    ]));
  }

  /* =======================================================
     Jornada COROA · vive dentro da Mentoria Poder & Propósito
     ======================================================= */
  function viewJornadaCoroa(aluna) {
    var sc = statusCoroa(aluna);

    var trilha = el("ol", { class: "coroa" }, sc.etapas.map(function (e) {
      var conteudo = [
        el("span", { class: "coroa__letra", text: e.letra }),
        el("span", { class: "coroa__corpo" }, [
          el("span", { class: "coroa__nome", text: e.nome }),
          el("span", { class: "coroa__frase", text: e.frase }),
          e.estado === "atual"
            ? el("span", { class: "coroa__aqui", text: "Você está aqui" }) : null,
          e.estado === "feita"
            ? el("span", { class: "coroa__feita" }, [ico(D.check), "Concluída"]) : null
        ])
      ];
      return el("li", { class: "coroa__item coroa__item--" + e.estado }, [
        el("a", { class: "coroa__link",
          href: "#/produto/" + ID_MENTORIA + "/aula/" + e.encontroId }, conteudo)
      ]);
    }));

    return el("div", { class: "jornada-view" }, [
      el("p", { class: "jornada-tagline",
        text: "Um caminho de dentro para fora, da cura à manifestação do propósito." }),
      trilha,
      el("p", { class: "jornada-fecho",
        text: sc.completa
          ? "Você percorreu as cinco etapas. A coroa está em você."
          : "Sua coroa ainda está esperando por você." })
    ]);
  }

  /* =======================================================
     TELA · Agenda
     ======================================================= */
  function horaMin(d) {
    var m = d.getMinutes();
    return d.getHours() + "h" + (m < 10 ? "0" + m : m);
  }

  /* Um item de evento (usado na lista e no calendário) */
  function itemEvento(ev) {
    var d = new Date(ev.data);
    var passou = d < new Date();
    return el("li", { class: "evento" + (passou ? " evento--passado" : "") }, [
      el("div", { class: "evento__data" }, [
        el("span", { class: "evento__dia", text: String(d.getDate()) }),
        el("span", { class: "evento__mes", text: MESES[d.getMonth()].slice(0, 3) })
      ]),
      el("div", { class: "evento__corpo" }, [
        el("span", { class: "evento__hora" }, [
          ico(D.relogio),
          el("span", { text: horaMin(d) + (passou ? " · já aconteceu" : "") })
        ]),
        el("h3", { class: "evento__titulo", text: ev.titulo }),
        el("span", { class: "evento__produto",
          text: ev.donoId ? ("Rede · " + (ev.dono || "aluna"))
            : (ev.produtoId ? nomeDoProduto(ev.produtoId) : "Aberto a todas") }),
        ev.link ? el("a", { class: "evento__link", href: ev.link,
          target: "_blank", rel: "noopener" }, [
          ico(D.link),
          el("span", { text: passou ? "Ver gravação" : "Entrar na sala" })
        ]) : null
      ])
    ]);
  }

  function viewAgendaLista(eventos) {
    if (!eventos.length) {
      return el("div", { class: "vazio" }, [
        el("p", { text: "Nenhum encontro marcado por enquanto." }),
        el("p", { class: "vazio__dica",
          text: "Quando a Cleri agendar uma live ou mentoria, ela aparece aqui." })
      ]);
    }
    return el("ul", { class: "agenda" }, eventos.map(itemEvento));
  }

  /* Calendário do mês, com números, pontinho nos dias que têm evento. */
  function viewAgendaMes(eventos) {
    var wrap = el("div", { class: "cal" });
    var ref = new Date(); ref.setDate(1); ref.setHours(0, 0, 0, 0);
    var selecionado = null;

    function chave(d) { return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(); }
    var porDia = {};
    eventos.forEach(function (ev) {
      var k = chave(new Date(ev.data));
      (porDia[k] = porDia[k] || []).push(ev);
    });

    function render() {
      wrap.innerHTML = "";
      var ano = ref.getFullYear(), mes = ref.getMonth(), hoje = new Date();
      var nomeMes = MESES[mes].charAt(0).toUpperCase() + MESES[mes].slice(1);

      wrap.appendChild(el("div", { class: "cal__topo" }, [
        el("button", { class: "cal__nav", type: "button", "aria-label": "Mês anterior",
          onclick: function () { ref.setMonth(mes - 1); selecionado = null; render(); } },
          [ico(D.voltar)]),
        el("span", { class: "cal__mes", text: nomeMes + " de " + ano }),
        el("button", { class: "cal__nav", type: "button", "aria-label": "Próximo mês",
          onclick: function () { ref.setMonth(mes + 1); selecionado = null; render(); } },
          [ico(D.avancar)])
      ]));

      wrap.appendChild(el("div", { class: "cal__grade cal__grade--dow" },
        DIAS.map(function (nome) {
          return el("span", { class: "cal__dow", text: nome.slice(0, 3).toLowerCase() });
        })));

      var inicioSemana = new Date(ano, mes, 1).getDay();
      var diasNoMes = new Date(ano, mes + 1, 0).getDate();
      var celulas = [];
      for (var i = 0; i < inicioSemana; i++) celulas.push(el("span", { class: "cal__vazio" }));
      for (var dia = 1; dia <= diasNoMes; dia++) {
        (function (dia) {
          var d = new Date(ano, mes, dia), k = chave(d);
          var temEv = !!porDia[k];
          var cls = "cal__dia"
            + (temEv ? " cal__dia--ev" : "")
            + (d.toDateString() === hoje.toDateString() ? " cal__dia--hoje" : "")
            + (selecionado === k ? " cal__dia--sel" : "");
          celulas.push(el("button", {
            class: cls, type: "button",
            disabled: temEv ? null : "disabled",
            onclick: function () { selecionado = (selecionado === k ? null : k); render(); }
          }, [
            el("span", { text: String(dia) }),
            temEv ? el("span", { class: "cal__ponto" }) : null
          ]));
        })(dia);
      }
      wrap.appendChild(el("div", { class: "cal__grade" }, celulas));

      var mostra = selecionado || (porDia[chave(hoje)] ? chave(hoje) : null);
      if (mostra && porDia[mostra]) {
        var evs = porDia[mostra].slice().sort(function (a, b) {
          return String(a.data).localeCompare(String(b.data));
        });
        wrap.appendChild(el("ul", { class: "agenda cal__lista" }, evs.map(itemEvento)));
      } else if (selecionado) {
        wrap.appendChild(el("p", { class: "cal__nada", text: "Nada marcado nesse dia." }));
      }
    }

    render();
    return wrap;
  }

  function telaAgenda(aluna, sub) {
    sub = sub || "";
    var eventos = eventosDaAluna(aluna);
    var abas = [{ id: "", label: "Lista" }, { id: "mes", label: "Mês" }];
    var segmentos = el("div", { class: "segmentos" }, abas.map(function (s) {
      return el("a", {
        class: "segmento" + (s.id === sub ? " segmento--ativo" : ""),
        href: "#/agenda" + (s.id ? "/" + s.id : "")
      }, [s.label]);
    }));

    montarTela(el("div", {}, [
      barraTopo({ titulo: "Agenda" }),
      el("div", { class: "container" }, [
        el("p", { class: "comunidade-intro", text: "Lives, encontros e mentorias marcadas." }),
        segmentos,
        sub === "mes" ? viewAgendaMes(eventos) : viewAgendaLista(eventos)
      ])
    ]));
  }

  /* =======================================================
     TELA · Devocional (3 partes: Devocional do dia · Leitura · Diário)
     ======================================================= */
  function telaDevocional(aluna, sub) {
    sub = sub || "";
    var abas = [
      { id: "",        label: "Devocional" },
      { id: "leitura", label: "Leitura" },
      { id: "diario",  label: "Diário" }
    ];
    var segmentos = el("div", { class: "segmentos" }, abas.map(function (s) {
      return el("a", {
        class: "segmento" + (s.id === sub ? " segmento--ativo" : ""),
        href: "#/devocional" + (s.id ? "/" + s.id : "")
      }, [s.label]);
    }));

    var corpo;
    if (sub === "leitura") corpo = viewLeitura(aluna);
    else if (sub === "diario") corpo = viewDiario(aluna);
    else corpo = viewDevocionalDia(aluna);

    montarTela(el("div", {}, [
      barraTopo({ titulo: "Devocional" }),
      el("div", { class: "container" }, [segmentos, corpo])
    ]));
  }

  function viewDevocionalDia(aluna) {
    var hoje = new Date();
    var dev = SEED.devocionais[diaDoAno(hoje) % SEED.devocionais.length];

    var botao = el("button", { class: "btn", type: "button" });
    function pintar() {
      var ok = Store.devocionalLidoHoje(aluna.id);
      botao.className = "btn " + (ok ? "btn--concluida" : "btn--primario");
      botao.innerHTML = "";
      if (ok) botao.appendChild(ico(D.check));
      botao.appendChild(document.createTextNode(ok ? "Lido hoje" : "Marcar como lido"));
    }
    botao.addEventListener("click", function () {
      Store.alternarDevocional(aluna.id);
      pintar();
    });
    pintar();

    return el("div", { class: "dev" }, [
      el("p", { class: "dev__data", text: dataExtenso(hoje) }),
      el("article", { class: "dev-card" }, [
        el("img", { class: "dev-card__marca", src: "assets/logo-mark.png", alt: "" }),
        el("h1", { class: "dev-card__titulo", text: dev.titulo }),
        el("p", { class: "dev-card__texto", text: dev.texto }),
        el("blockquote", { class: "dev-card__versiculo" }, [
          el("span", { text: dev.versiculo }),
          el("cite", { class: "dev-card__ref", text: dev.referencia })
        ])
      ]),
      botao
    ]);
  }

  function viewLeitura(aluna) {
    var wrap = el("div", {});
    var total = SEED.planoLeitura.length;

    function render() {
      wrap.innerHTML = "";
      var feitas = Store.contarLeituras(aluna.id);
      var primeiraAberta = SEED.planoLeitura.find(function (it) {
        return !Store.leituraFeita(aluna.id, it.id);
      });

      wrap.appendChild(el("div", { class: "leitura-topo" }, [
        barraProgresso(feitas, total),
        el("span", { class: "leitura-topo__txt", text: feitas + " de " + total + " leituras" })
      ]));

      wrap.appendChild(el("ul", { class: "leitura" }, SEED.planoLeitura.map(function (it) {
        var ok = Store.leituraFeita(aluna.id, it.id);
        var ehHoje = primeiraAberta && it.id === primeiraAberta.id;
        var botao = el("button", {
          class: "leitura-item" + (ok ? " leitura-item--ok" : "") +
                 (ehHoje ? " leitura-item--hoje" : ""),
          type: "button"
        }, [
          el("span", { class: "leitura-item__marca" }, [ok ? ico(D.check) : null]),
          el("span", { class: "leitura-item__txt" }, [
            el("span", { class: "leitura-item__dia",
              text: it.dia + (ehHoje ? " · ler hoje" : "") }),
            el("span", { class: "leitura-item__pass", text: it.passagem })
          ])
        ]);
        botao.addEventListener("click", function () {
          Store.alternarLeitura(aluna.id, it.id);
          render();
        });
        return el("li", {}, [botao]);
      })));
    }

    render();
    return wrap;
  }

  function viewDiario(aluna) {
    var wrap = el("div", { class: "diario" });

    function render() {
      wrap.innerHTML = "";

      var campo = el("textarea", { class: "diario__campo", rows: "4",
        placeholder: "Escreva a sua reflexão de hoje..." });
      var salvar = el("button", { class: "btn btn--primario", type: "button" },
        ["Salvar anotação"]);
      salvar.addEventListener("click", function () {
        var t = campo.value.trim();
        if (!t) { campo.focus(); return; }
        Store.adicionarAnotacao(aluna.id, t);
        render();
      });
      wrap.appendChild(el("div", { class: "diario__novo" }, [campo, salvar]));

      var anotacoes = Store.diarioDe(aluna.id);
      if (anotacoes.length === 0) {
        wrap.appendChild(el("div", { class: "vazio" }, [
          el("p", { text: "Nenhuma anotação ainda." }),
          el("p", { class: "vazio__dica", text: "O que Deus falou ao seu coração hoje?" })
        ]));
      } else {
        wrap.appendChild(el("ul", { class: "anotacoes" }, anotacoes.map(function (n) {
          return el("li", { class: "anotacao" }, [
            el("div", { class: "anotacao__topo" }, [
              el("span", { class: "anotacao__data", text: dataCurta(n.data) }),
              el("button", { class: "anotacao__excluir", type: "button",
                "aria-label": "Excluir anotação",
                onclick: function () { Store.removerAnotacao(aluna.id, n.id); render(); } },
                [ico(D.lixo)])
            ]),
            el("p", { class: "anotacao__texto", text: n.texto })
          ]);
        })));
      }
    }
    render();
    return wrap;
  }

  /* =======================================================
     TELA · Comunidade (lista de grupos)
     ======================================================= */
  function totalConversas(grupo) {
    return grupo.posts.length + Store.postsDoGrupo(grupo.id).length;
  }

  /* Todos os posts da comunidade, de todos os grupos, com a referência do grupo. */
  function todosOsPosts() {
    var lista = [];
    SEED.grupos.forEach(function (g) {
      Store.postsDoGrupo(g.id).forEach(function (p) {
        lista.push({
          id: p.id, autorId: p.autorId, autor: p.autor, data: p.data, texto: p.texto,
          grupoSlug: g.id, grupoNome: g.nome
        });
      });
    });
    return lista.sort(function (a, b) { return String(b.data).localeCompare(String(a.data)); });
  }

  function pulsoComunidade() {
    var limite = Date.now() - 7 * 86400000;
    var todos = todosOsPosts();
    var daSemana = todos.filter(function (p) { return new Date(p.data).getTime() >= limite; });
    var autores = {};
    daSemana.forEach(function (p) { if (p.autorId) autores[p.autorId] = 1; });
    var qAlunas = Object.keys(autores).length;

    return el("div", { class: "pulso" }, [
      el("div", { class: "pulso__nums" }, [
        el("div", { class: "pulso__num" }, [
          el("strong", { text: String(daSemana.length) }),
          el("span", { text: daSemana.length === 1 ? "conversa esta semana" : "conversas esta semana" })
        ]),
        el("div", { class: "pulso__num" }, [
          el("strong", { text: String(qAlunas) }),
          el("span", { text: qAlunas === 1 ? "aluna participando" : "alunas participando" })
        ])
      ]),
      el("div", { class: "pulso__desafios" }, [
        el("span", { class: "pulso__label" }, [ico(D.alfinete), "Desafios desta semana"]),
        el("ul", {}, SEED.grupos.map(function (g) {
          return el("li", {}, [
            el("strong", { text: g.nome + " · " }),
            el("span", { text: g.desafio })
          ]);
        }))
      ])
    ]);
  }

  function telaComunidade(aluna) {
    var campo = el("textarea", { class: "post-campo", rows: "3",
      placeholder: "Compartilhe algo com a comunidade..." });
    var seletor = el("select", { class: "post-novo__grupo", "aria-label": "Escolher grupo" },
      SEED.grupos.map(function (g) { return el("option", { value: g.id }, [g.nome]); }));
    var publicar = el("button", { class: "btn btn--primario", type: "button" }, ["Publicar"]);
    publicar.addEventListener("click", function () {
      var t = campo.value.trim();
      if (!t) { campo.focus(); return; }
      Store.adicionarPost(seletor.value, aluna, t);
      telaComunidade(aluna);   /* redesenha com o post novo no feed */
    });

    var recentes = todosOsPosts().slice(0, 10);
    var feed = recentes.length
      ? el("div", { class: "feed" }, recentes.map(function (p) {
          return el("a", { class: "post post--link", href: "#/comunidade/" + p.grupoSlug }, [
            el("span", { class: "post__avatar", text: (p.autor || "?").charAt(0).toUpperCase() }),
            el("div", { class: "post__corpo" }, [
              el("div", { class: "post__topo" }, [
                el("span", { class: "post__autor", text: p.autor }),
                el("span", { class: "post__data", text: tempoRelativo(p.data) + " · " + p.grupoNome })
              ]),
              el("p", { class: "post__texto", text: p.texto })
            ])
          ]);
        }))
      : el("div", { class: "vazio" }, [
          el("p", { text: "Ainda não há conversas por aqui." }),
          el("p", { class: "vazio__dica", text: "Seja a primeira a compartilhar algo." })
        ]);

    montarTela(el("div", {}, [
      barraTopo({ titulo: "Comunidade" }),
      el("div", { class: "container" }, [
        el("p", { class: "comunidade-intro",
          text: "Espaços para caminhar junto com outras mulheres." }),
        pulsoComunidade(),
        el("div", { class: "post-novo" }, [
          campo,
          el("div", { class: "post-novo__rodape" }, [seletor, publicar])
        ]),
        el("h2", { class: "secao__titulo", text: "Recentes" }),
        feed,
        el("h2", { class: "secao__titulo", text: "Grupos" }),
        el("div", { class: "grupos" }, SEED.grupos.map(function (g) {
          var n = totalConversas(g);
          return el("a", { class: "grupo-card", href: "#/comunidade/" + g.id }, [
            el("span", { class: "grupo-card__tema", text: g.tema }),
            el("h2", { class: "grupo-card__nome", text: g.nome }),
            el("p", { class: "grupo-card__desc", text: g.descricao }),
            el("span", { class: "grupo-card__meta" }, [
              ico(D.balao),
              el("span", { text: n + (n === 1 ? " conversa" : " conversas") })
            ])
          ]);
        }))
      ])
    ]));
  }

  /* =======================================================
     TELA · Grupo (desafio fixado + feed + novo post)
     ======================================================= */
  function telaGrupo(aluna, grupo) {
    var feed = el("div", { class: "feed" });

    function render() {
      feed.innerHTML = "";

      var doSeed = grupo.posts.map(function (p) {
        return { autor: p.autor, data: p.data, texto: p.texto, seed: true };
      });
      var daAluna = Store.postsDoGrupo(grupo.id).map(function (p) {
        return { id: p.id, autorId: p.autorId, autor: p.autor,
                 data: p.data, texto: p.texto, seed: false };
      });
      var todos = doSeed.concat(daAluna).sort(function (a, b) {
        return b.data.localeCompare(a.data);   /* mais recente primeiro */
      });

      todos.forEach(function (p) {
        var inicial = p.autor.charAt(0).toUpperCase();
        var podeExcluir = !p.seed && p.autorId === aluna.id;
        feed.appendChild(el("article", { class: "post" }, [
          el("span", { class: "post__avatar", text: inicial }),
          el("div", { class: "post__corpo" }, [
            el("div", { class: "post__topo" }, [
              el("span", { class: "post__autor", text: p.autor }),
              el("span", { class: "post__data", text: dataCurta(p.data) }),
              podeExcluir
                ? el("button", { class: "post__excluir", type: "button",
                    "aria-label": "Excluir post",
                    onclick: function () { Store.removerPost(grupo.id, p.id); render(); } },
                    [ico(D.lixo)])
                : null
            ]),
            el("p", { class: "post__texto", text: p.texto })
          ])
        ]));
      });
    }
    render();

    var campo = el("textarea", { class: "post-campo", rows: "3",
      placeholder: "Compartilhe algo com o grupo..." });
    var publicar = el("button", { class: "btn btn--primario", type: "button" }, ["Publicar"]);
    publicar.addEventListener("click", function () {
      var t = campo.value.trim();
      if (!t) { campo.focus(); return; }
      Store.adicionarPost(grupo.id, aluna, t);
      campo.value = "";
      render();
    });

    montarTela(el("div", {}, [
      barraTopo({ voltarHref: "/comunidade", voltarLabel: "Comunidade" }),
      el("div", { class: "container" }, [
        el("span", { class: "eyebrow", text: grupo.tema }),
        el("h1", { class: "grupo-titulo", text: grupo.nome }),
        el("p", { class: "grupo-desc", text: grupo.descricao }),

        el("div", { class: "desafio" }, [
          el("span", { class: "desafio__label" }, [ico(D.alfinete), "Desafio da semana"]),
          el("p", { class: "desafio__texto", text: grupo.desafio })
        ]),

        el("div", { class: "post-novo" }, [campo, publicar]),

        el("h2", { class: "secao__titulo", text: "Conversas" }),
        feed
      ])
    ]));
  }

  /* =======================================================
     TELA · Networking (a rede de negócios das alunas)
     ======================================================= */
  var DIAS_CURTO = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function linkWhats(v) {
    var d = String(v || "").replace(/\D/g, "");
    if (!d) return null;
    if (d.length <= 11) d = "55" + d;
    return "https://wa.me/" + d;
  }
  function linkInsta(v) {
    var s = String(v || "").trim()
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/^@/, "").replace(/\/.*$/, "");
    return s ? "https://instagram.com/" + s : null;
  }
  function linkSite(v) {
    var s = String(v || "").trim();
    if (!s) return null;
    return /^https?:\/\//i.test(s) ? s : "https://" + s;
  }

  function contatosDoAnuncio(a) {
    var itens = [];
    var w = linkWhats(a.whatsapp);
    if (w) itens.push(el("a", { class: "contato contato--wpp", href: w, target: "_blank", rel: "noopener" },
      [ico(D.whats), el("span", { text: "WhatsApp" })]));
    var ig = linkInsta(a.instagram);
    if (ig) itens.push(el("a", { class: "contato", href: ig, target: "_blank", rel: "noopener" },
      [ico(D.pessoa), el("span", { text: "Instagram" })]));
    var st = linkSite(a.site);
    if (st) itens.push(el("a", { class: "contato", href: st, target: "_blank", rel: "noopener" },
      [ico(D.link), el("span", { text: "Site" })]));
    return itens;
  }

  function telaNetworking(aluna, sub) {
    var lista = Store.nichos();
    if (!lista.length) {
      montarTela(el("div", {}, [
        barraTopo({ titulo: "Networking Cristão" }),
        el("div", { class: "container" }, [
          el("div", { class: "vazio" }, [el("p", { text: "O Networking está sendo preparado." })])
        ])
      ]));
      return;
    }

    /* Ver a rede exige o produto rede-acesso (grátis por padrão). */
    var acessoRede = produtoPorSlug("rede-acesso");
    if (acessoRede && !temAcessoA(aluna, acessoRede)) {
      telaProdutoVenda(aluna, acessoRede);
      return;
    }
    var podeAnun = Store.podeAnunciar();

    var hojeDia = new Date().getDay();
    lista.sort(function (a, b) {
      return ((a.dia_semana - hojeDia + 7) % 7) - ((b.dia_semana - hojeDia + 7) % 7);
    });
    var diaSel = (sub == null || sub === "") ? hojeDia : parseInt(sub, 10);
    var nichoSel = lista.find(function (n) { return n.dia_semana === diaSel; }) || lista[0];
    var nomeNicho = {}, diaNicho = {};
    lista.forEach(function (n) { nomeNicho[n.id] = n.nome; diaNicho[n.id] = n.dia_semana; });

    var estado = { form: false, editando: null, busca: "", formEv: false, editEv: null };
    var corpo = el("div", {});

    var busca = el("input", { class: "campo__input net-busca", type: "search",
      placeholder: "Buscar serviço (ex: bolo, design, terapia)" });
    busca.addEventListener("input", function () {
      estado.busca = busca.value.trim();
      renderCorpo();
    });

    function cardAnuncio(a, meu) {
      var acoes = [];
      if (meu) {
        var ed = el("button", { class: "net-mini", type: "button" }, [ico(D.alfinete), "Editar"]);
        ed.addEventListener("click", function () { estado.editando = a; estado.form = true; render(); });
        var rm = el("button", { class: "net-mini net-mini--rm", type: "button" }, [ico(D.lixo), "Remover"]);
        rm.addEventListener("click", function () {
          if (!window.confirm("Remover o seu anúncio deste nicho?")) return;
          Store.removerAnuncio(a.id).then(render).catch(function () {
            alert("Não consegui remover agora. Tente de novo.");
          });
        });
        acoes = [ed, rm];
      }
      return el("article", { class: "anuncio" }, [
        a.foto ? el("img", { class: "anuncio__foto", src: a.foto, alt: "", loading: "lazy" }) : null,
        el("h3", { class: "anuncio__nome", text: a.negocio }),
        el("p", { class: "anuncio__desc", text: a.descricao }),
        el("span", { class: "anuncio__autor", text: "por " + a.autor }),
        el("div", { class: "anuncio__contatos" }, contatosDoAnuncio(a)),
        acoes.length ? el("div", { class: "anuncio__acoes" }, acoes) : null
      ]);
    }

    function formAnuncio(edit) {
      edit = edit || {};
      var fotoUrl = edit.foto || null;
      var fNeg = campoForm("Nome do negócio", edit.negocio, "Ex: Ateliê Graça");
      var fDesc = campoForm("O que você faz", edit.descricao, "Conte em 1-2 frases o que você oferece.", true);
      var fWpp = campoForm("WhatsApp", edit.whatsapp, "Ex: 47 99999-9999");
      var fIg = campoForm("Instagram", edit.instagram, "@seu.negocio");
      var fSite = campoForm("Site (opcional)", edit.site, "www...");
      var erro = el("p", { class: "form-erro", hidden: "hidden" });

      /* Foto do produto */
      var fileInput = el("input", { type: "file", accept: "image/*", hidden: "hidden" });
      var fotoBox = el("div", { class: "campo foto-picker" });
      function pintarFoto() {
        fotoBox.innerHTML = "";
        fotoBox.appendChild(el("label", { class: "campo__rotulo" }, ["Foto do produto (opcional)"]));
        if (fotoUrl) {
          fotoBox.appendChild(el("img", { class: "foto-picker__preview", src: fotoUrl, alt: "" }));
          var trocar = el("button", { class: "net-mini", type: "button" }, [ico(D.alfinete), "Trocar"]);
          trocar.addEventListener("click", function () { fileInput.click(); });
          var tirar = el("button", { class: "net-mini net-mini--rm", type: "button" }, [ico(D.lixo), "Remover"]);
          tirar.addEventListener("click", function () { fotoUrl = null; pintarFoto(); });
          fotoBox.appendChild(el("div", { class: "foto-picker__acoes" }, [trocar, tirar]));
        } else {
          var add = el("button", { class: "btn btn--ghost", type: "button" }, ["Adicionar foto"]);
          add.addEventListener("click", function () { fileInput.click(); });
          fotoBox.appendChild(add);
        }
        fotoBox.appendChild(fileInput);
      }
      fileInput.addEventListener("change", function () {
        var f = fileInput.files && fileInput.files[0];
        if (!f) return;
        erro.hidden = true;
        fotoBox.appendChild(el("p", { class: "foto-picker__status", text: "Enviando foto..." }));
        Store.uploadFotoAnuncio(f).then(function (url) {
          fotoUrl = url; fileInput.value = ""; pintarFoto();
        }).catch(function () {
          erro.textContent = "Não consegui enviar a foto. Tente uma imagem menor.";
          erro.hidden = false; pintarFoto();
        });
      });
      pintarFoto();
      var salvar = el("button", { class: "btn btn--primario", type: "button" },
        [edit.id ? "Salvar" : "Publicar anúncio"]);
      var cancelar = el("button", { class: "btn btn--ghost", type: "button" }, ["Cancelar"]);
      cancelar.addEventListener("click", function () {
        estado.form = false; estado.editando = null; render();
      });
      salvar.addEventListener("click", function () {
        var neg = fNeg.input.value.trim(), desc = fDesc.input.value.trim();
        if (!neg || !desc) {
          erro.textContent = "Preencha o nome do negócio e o que você faz.";
          erro.hidden = false; return;
        }
        salvar.disabled = true; salvar.textContent = "Salvando...";
        Store.salvarAnuncio({
          id: edit.id, nicho_id: nichoSel.id, negocio: neg, descricao: desc,
          whatsapp: fWpp.input.value, instagram: fIg.input.value, site: fSite.input.value,
          foto_url: fotoUrl
        }).then(function () {
          estado.form = false; estado.editando = null; render();
        }).catch(function () {
          erro.textContent = "Não consegui salvar agora. Tente de novo.";
          erro.hidden = false;
          salvar.disabled = false;
          salvar.textContent = edit.id ? "Salvar" : "Publicar anúncio";
        });
      });
      return el("div", { class: "net-form" }, [
        el("span", { class: "eyebrow", text: (edit.id ? "Editar anúncio" : "Novo anúncio") + " · " + nichoSel.nome }),
        fNeg.campo, fDesc.campo, fotoBox, fWpp.campo, fIg.campo, fSite.campo,
        erro,
        el("div", { class: "net-form__acoes" }, [salvar, cancelar])
      ]);
    }

    function formEventoRede(edit) {
      edit = edit || {};
      var fTit = campoForm("Título do evento", edit.titulo, "Ex: Workshop de vendas");
      var fData = campoTipo("Data e hora", paraInputDateTime(edit.data), "datetime-local");
      var fLink = campoForm("Link (inscrição, sala, Instagram...)", edit.link, "https://...");
      var erro = el("p", { class: "form-erro", hidden: "hidden" });
      var salvar = el("button", { class: "btn btn--primario", type: "button" },
        [edit.id ? "Salvar" : "Publicar evento"]);
      var cancelar = el("button", { class: "btn btn--ghost", type: "button" }, ["Cancelar"]);
      cancelar.addEventListener("click", function () {
        estado.formEv = false; estado.editEv = null; render();
      });
      salvar.addEventListener("click", function () {
        if (!fTit.input.value.trim() || !fData.input.value) {
          erro.textContent = "Preencha o título e a data."; erro.hidden = false; return;
        }
        salvar.disabled = true; salvar.textContent = "Salvando...";
        Store.salvarEventoRede({
          id: edit.id, titulo: fTit.input.value.trim(),
          data_hora: new Date(fData.input.value).toISOString(),
          link: fLink.input.value.trim()
        }).then(function () { return Store.recarregarCatalogo(); })
          .then(function () { estado.formEv = false; estado.editEv = null; render(); })
          .catch(function () {
            erro.textContent = "Não consegui salvar agora."; erro.hidden = false;
            salvar.disabled = false; salvar.textContent = edit.id ? "Salvar" : "Publicar evento";
          });
      });
      return el("div", { class: "net-form" }, [
        el("span", { class: "eyebrow", text: edit.id ? "Editar evento" : "Novo evento na agenda" }),
        fTit.campo, fData.campo, fLink.campo, erro,
        el("div", { class: "net-form__acoes" }, [salvar, cancelar])
      ]);
    }

    function render() {
      corpo.innerHTML = "";
      if (estado.busca) renderResultados(); else renderDia();
    }

    function renderResultados() {
      var q = estado.busca.toLowerCase();
      var res = Store.todosAnuncios().filter(function (a) {
        return (a.negocio + " " + a.descricao).toLowerCase().indexOf(q) !== -1;
      });
      corpo.appendChild(el("h2", { class: "secao__titulo",
        text: res.length + (res.length === 1 ? " serviço" : " serviços") + " para “" + estado.busca + "”" }));
      if (!res.length) {
        corpo.appendChild(el("div", { class: "vazio" }, [
          el("p", { text: "Nada encontrado. Tente outra palavra." })
        ]));
        return;
      }
      corpo.appendChild(el("div", { class: "anuncios" }, res.map(function (a) {
        var c = cardAnuncio(a, a.autorId === aluna.id && podeAnun);
        c.insertBefore(el("span", { class: "anuncio__nicho",
          text: nomeNicho[a.nichoId] || "" }), c.firstChild);
        return c;
      })));
    }

    function renderDia() {
      var ehHoje = nichoSel.dia_semana === hojeDia;
      var todosAn = Store.todosAnuncios();

      var hojeNicho = lista.find(function (n) { return n.dia_semana === hojeDia; });
      if (hojeNicho) {
        corpo.appendChild(el("a", { class: "net-hoje", href: "#/networking/" + hojeDia }, [
          el("span", { class: "net-hoje__label", text: "Hoje é dia de" }),
          el("span", { class: "net-hoje__nicho", text: hojeNicho.nome }),
          hojeNicho.descricao ? el("span", { class: "net-hoje__sub", text: hojeNicho.descricao }) : null
        ]));
      }

      /* Movimento da rede: contador + novidades */
      if (todosAn.length) {
        var novos30 = todosAn.filter(function (a) {
          return Date.now() - new Date(a.data).getTime() < 30 * 86400000;
        }).length;
        corpo.appendChild(el("section", { class: "net-novos" }, [
          el("span", { class: "eyebrow",
            text: todosAn.length + (todosAn.length === 1 ? " negócio na rede" : " negócios na rede")
              + " · " + novos30 + " novo" + (novos30 === 1 ? "" : "s") + " em 30 dias" }),
          el("div", { class: "trilho" }, todosAn.slice(0, 8).map(function (a) {
            return el("a", { class: "net-novo", href: "#/networking/" + (diaNicho[a.nichoId] || 0) }, [
              el("strong", { text: a.negocio }),
              el("span", { class: "net-novo__nicho", text: nomeNicho[a.nichoId] || "" }),
              el("span", { class: "net-novo__t", text: tempoRelativo(a.data) })
            ]);
          }))
        ]));
      }

      corpo.appendChild(el("div", { class: "trilho net-chips" }, lista.map(function (n) {
        return el("a", {
          class: "net-chip" + (n.dia_semana === diaSel ? " net-chip--ativo" : ""),
          href: "#/networking/" + n.dia_semana
        }, [
          el("span", { class: "net-chip__dia", text: DIAS_CURTO[n.dia_semana] }),
          el("span", { class: "net-chip__nome", text: n.nome })
        ]);
      })));

      corpo.appendChild(el("div", { class: "net-cab" }, [
        el("span", { class: "eyebrow", text: DIAS_CURTO[nichoSel.dia_semana] + (ehHoje ? " · hoje" : "") }),
        el("h1", { class: "net-cab__nome", text: nichoSel.nome }),
        nichoSel.descricao ? el("p", { class: "net-cab__desc", text: nichoSel.descricao }) : null
      ]));

      var meus = Store.meusAnuncios().filter(function (a) { return a.nichoId === nichoSel.id; });
      var meu = meus[0] || null;

      if (!podeAnun) {
        var btnAssinar = el("button", { class: "btn btn--primario", type: "button" }, ["Quero anunciar"]);
        btnAssinar.addEventListener("click", function () { irPara("/produto/rede-anunciante"); });
        corpo.appendChild(el("div", { class: "net-cta" }, [
          el("span", { class: "eyebrow", text: "Quer aparecer aqui?" }),
          el("p", { text: "Coloque o seu negócio na rede — as alunas encontram você pelo nicho e pela busca de serviços. É uma assinatura mensal." }),
          btnAssinar
        ]));
      } else if (estado.form) {
        corpo.appendChild(formAnuncio(estado.editando));
      } else if (meu) {
        corpo.appendChild(el("div", { class: "net-meu" }, [
          el("span", { class: "eyebrow", text: "Seu anúncio aqui" }),
          cardAnuncio(meu, true)
        ]));
      } else {
        var btnNovo = el("button", { class: "btn btn--primario", type: "button" },
          ["Criar meu anúncio neste nicho"]);
        btnNovo.addEventListener("click", function () {
          estado.editando = null; estado.form = true; render();
        });
        corpo.appendChild(el("div", { class: "net-meu" }, [btnNovo]));
      }

      /* Anunciante pode divulgar os próprios eventos (entram na Agenda de todas) */
      if (podeAnun) {
        var meusEv = Store.meusEventosRede();
        var evBox = el("div", { class: "net-meu" }, [
          el("span", { class: "eyebrow", text: "Meus eventos na rede" })
        ]);
        if (estado.formEv) {
          evBox.appendChild(formEventoRede(estado.editEv));
        } else {
          meusEv.forEach(function (ev) {
            var ed = el("button", { class: "net-mini", type: "button" }, [ico(D.alfinete), "Editar"]);
            ed.addEventListener("click", function () { estado.editEv = ev; estado.formEv = true; render(); });
            var rm = el("button", { class: "net-mini net-mini--rm", type: "button" }, [ico(D.lixo), "Remover"]);
            rm.addEventListener("click", function () {
              if (!window.confirm("Remover “" + ev.titulo + "” da agenda?")) return;
              Store.removerEventoRede(ev.id)
                .then(function () { return Store.recarregarCatalogo(); })
                .then(render).catch(function () { alert("Não consegui remover agora."); });
            });
            evBox.appendChild(el("div", { class: "painel-item painel-item--acao" }, [
              el("span", {}, [
                el("strong", { text: ev.titulo }),
                el("span", { class: "painel-item__sub", text: dataCurta(ev.data) })
              ]),
              el("span", { class: "painel-item__btns" }, [ed, rm])
            ]));
          });
          var addEv = el("button", { class: "btn btn--ghost", type: "button" }, ["+ Adicionar evento"]);
          addEv.addEventListener("click", function () { estado.editEv = null; estado.formEv = true; render(); });
          evBox.appendChild(addEv);
        }
        corpo.appendChild(evBox);
      }

      var outros = Store.anunciosDoNicho(nichoSel.id).filter(function (a) {
        return !meu || a.id !== meu.id;
      });
      corpo.appendChild(el("h2", { class: "secao__titulo",
        text: outros.length + (outros.length === 1 ? " negócio" : " negócios") + " neste nicho" }));
      if (outros.length) {
        corpo.appendChild(el("div", { class: "anuncios" },
          outros.map(function (a) { return cardAnuncio(a, false); })));
      } else {
        corpo.appendChild(el("div", { class: "vazio" }, [
          el("p", { text: "Ninguém divulgou neste nicho ainda." })
        ]));
      }
    }

    montarTela(el("div", {}, [
      barraTopo({ titulo: "Networking Cristão" }),
      el("div", { class: "container" }, [
        el("img", { class: "net-banner", src: "assets/capas/networking.jpg", alt: "" }),
        el("p", { class: "comunidade-intro",
          text: "A rede de negócios das alunas da Cleri. Cada dia, um nicho em destaque — divulgue o seu e procure o das outras." }),
        el("div", { class: "campo" }, [busca]),
        corpo
      ])
    ]));
    render();
  }

  /* =======================================================
     PAINEL DA MENTORA
     ======================================================= */
  function paraInputDateTime(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) +
      "T" + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function painelShell(titulo, voltar, box) {
    montarTela(el("div", {}, [
      barraTopo(voltar ? { voltarHref: voltar, voltarLabel: "Painel" } : { titulo: titulo }),
      el("div", { class: "container painel" }, [box])
    ]));
  }
  function carregarNo(box, promessa, render) {
    box.innerHTML = "";
    box.appendChild(el("p", { class: "comunidade-intro", text: "Carregando..." }));
    Promise.resolve(promessa).then(function (dados) {
      box.innerHTML = "";
      render(dados);
    }).catch(function (e) {
      box.innerHTML = "";
      box.appendChild(el("p", { class: "form-erro" },
        ["Não consegui carregar agora. Recarregue a página."]));
      console.error(e);
    });
  }
  function aviso(box, txt) {
    var p = el("p", { class: "painel-ok", text: txt });
    box.appendChild(p);
    setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 2500);
  }

  function telaPainel(aluna, p) {
    var secao = p[0] || "";
    if (secao === "alunas") return painelAlunas(aluna, p[1]);
    if (secao === "produtos") return painelProdutos(aluna, p[1]);
    if (secao === "vip") return painelVip(aluna, p[1]);
    if (secao === "agenda") return painelAgenda(aluna);

    var box = el("div", {});
    painelShell("Painel da Mentora", null, box);
    box.appendChild(el("p", { class: "comunidade-intro",
      text: "Gerencie o conteúdo, a agenda e os acessos das alunas." }));
    box.appendChild(el("div", { class: "painel-menu" }, [
      painelLink("Alunas & acessos", "Liberar ou tirar produtos de cada aluna", "#/painel/alunas", D.pessoas),
      painelLink("Produtos & aulas", "Editar produtos e adicionar aulas com vídeo", "#/painel/produtos", D.livro),
      painelLink("Grupo VIP · pilares", "Criar pilares e adicionar trilhas e gravações", "#/painel/vip", D.coroa),
      painelLink("Agenda", "Marcar lives, encontros e mentorias", "#/painel/agenda", D.agenda)
    ]));
  }

  function painelLink(nome, sub, href, d) {
    return el("a", { class: "painel-link", href: href }, [
      el("span", { class: "painel-link__ico", html: svg(d) }),
      el("span", {}, [
        el("strong", { text: nome }),
        el("span", { class: "painel-link__sub", text: sub })
      ]),
      ico(D.avancar, "painel-link__seta")
    ]);
  }

  /* ---------- Alunas & acessos ---------- */
  function painelAlunas(aluna, userId) {
    var box = el("div", {});
    painelShell("Alunas", "/painel", box);

    if (!userId) {
      carregarNo(box, Store.adminAlunas(), function (alunas) {
        box.appendChild(el("h2", { class: "secao__titulo",
          text: alunas.length + (alunas.length === 1 ? " conta" : " contas") }));
        box.appendChild(el("div", { class: "painel-lista" }, alunas.map(function (a) {
          return el("a", { class: "painel-item", href: "#/painel/alunas/" + a.id }, [
            el("span", {}, [
              el("strong", { text: a.nome || a.email }),
              el("span", { class: "painel-item__sub", text: a.email })
            ]),
            el("span", { class: "papel papel--" + a.papel, text: a.papel }),
            ico(D.avancar, "painel-link__seta")
          ]);
        })));
      });
      return;
    }

    var render = function () {
      carregarNo(box, Promise.all([Store.adminAlunas(), Store.adminAcessosDe(userId)]),
        function (r) {
          var alvo = (r[0] || []).find(function (a) { return a.id === userId; }) || {};
          var tem = {};
          (r[1] || []).forEach(function (x) { if (x.produtoSlug) tem[x.produtoSlug] = true; });

          box.appendChild(el("div", { class: "painel-cab" }, [
            el("h1", { class: "painel-cab__nome", text: alvo.nome || "Aluna" }),
            el("p", { class: "painel-cab__sub", text: alvo.email || "" })
          ]));
          box.appendChild(el("h2", { class: "secao__titulo", text: "Produtos" }));
          box.appendChild(el("div", { class: "painel-lista" },
            (SEED.produtos || []).map(function (prod) {
              var liberado = !!tem[prod.id];
              var btn = el("button", {
                class: "btn " + (liberado ? "btn--concluida" : "btn--ghost"),
                type: "button"
              }, [liberado ? "Liberado" : "Liberar"]);
              btn.addEventListener("click", function () {
                btn.disabled = true;
                var acao = liberado
                  ? Store.adminTirar(userId, prod.id)
                  : Store.adminLiberar(userId, prod.id);
                acao.then(render).catch(function () {
                  btn.disabled = false;
                  aviso(box, "Não consegui mudar agora.");
                });
              });
              return el("div", { class: "painel-item painel-item--acao" }, [
                el("span", {}, [
                  el("strong", { text: prod.nome }),
                  el("span", { class: "painel-item__sub", text: prod.categoria })
                ]),
                btn
              ]);
            })));
        });
    };
    render();
  }

  /* ---------- Produtos & aulas ---------- */
  function painelProdutos(aluna, slug) {
    var box = el("div", {});
    painelShell("Produtos", "/painel", box);

    if (!slug) {
      box.appendChild(el("h2", { class: "secao__titulo", text: "Escolha um produto" }));
      box.appendChild(el("div", { class: "painel-lista" }, (SEED.produtos || []).map(function (prod) {
        var thumb = prod.capa_url
          ? el("img", { class: "painel-thumb", src: prod.capa_url, alt: "", loading: "lazy" })
          : el("span", { class: "painel-thumb painel-thumb--vazia", text: "sem\ncapa" });
        return el("a", { class: "painel-item painel-item--capa", href: "#/painel/produtos/" + prod.id }, [
          thumb,
          el("span", {}, [
            el("strong", { text: prod.nome }),
            el("span", { class: "painel-item__sub", text: prod.categoria })
          ]),
          ico(D.avancar, "painel-link__seta")
        ]);
      })));
      return;
    }

    var prod = (SEED.produtos || []).find(function (p) { return p.id === slug; });
    if (!prod) { irPara("/painel/produtos"); return; }

    /* O Grupo VIP guarda as aulas dentro de pilares — tem editor próprio. */
    var ehVip = slug === ID_GRUPO_VIP;

    /* Form do produto */
    var fNome = campoForm("Nome", prod.nome, "");
    var fSub = campoForm("Subtítulo", prod.subtitulo, "Frase curta no card");
    var fDesc = campoForm("Descrição", prod.descricao, "", true);
    var fPreco = campoTipo("Preço (R$)", prod.preco, "number", "39.90");
    var fLink = campoForm("Link de compra (Kiwify)", prod.link_compra, "https://pay.kiwify...");
    var fKw = campoForm("ID do produto no Kiwify", prod.kiwify_product_id,
      "libera o acesso sozinho na compra");
    var fBenef = campoForm("O que você vai conquistar (um item por linha)",
      (prod.beneficios || []).join("\n"),
      "Aparece na página de pré-venda, para quem ainda não comprou", true);

    /* Capa do produto: link colado OU upload de arquivo, com prévia */
    var fCapa = campoForm("Capa — link da imagem", prod.capa_url,
      "cole uma URL, ou envie um arquivo abaixo");
    var fCapaArq = el("input", { type: "file", accept: "image/*" });
    var capaPrevia = el("img", { class: "capa-previa", alt: "" });
    if (prod.capa_url) capaPrevia.src = prod.capa_url; else capaPrevia.hidden = true;
    fCapaArq.addEventListener("change", function () {
      var f = fCapaArq.files && fCapaArq.files[0];
      if (!f) return;
      fCapaArq.disabled = true;
      Store.adminUploadCapa(f, "produtos").then(function (url) {
        fCapaArq.disabled = false;
        fCapa.input.value = url;
        capaPrevia.src = url; capaPrevia.hidden = false;
      }).catch(function () {
        fCapaArq.disabled = false; aviso(box, "Não consegui enviar a imagem.");
      });
    });
    var campoCapaArq = el("div", { class: "campo" }, [
      el("label", { class: "campo__rotulo" }, ["Enviar foto do computador"]), fCapaArq
    ]);
    var limparCapa = el("button", { class: "net-mini net-mini--rm", type: "button" },
      [ico(D.lixo), "Tirar a capa (voltar pra automática)"]);
    limparCapa.addEventListener("click", function () {
      fCapa.input.value = "";
      capaPrevia.hidden = true;
    });

    var cDest = campoCheck("Aparece no carrossel de destaque", prod.destaque);
    var cGrat = campoCheck("Liberado para todas (gratuito)", prod.gratuito);
    var salvarP = el("button", { class: "btn btn--primario", type: "button" }, ["Salvar produto"]);
    salvarP.addEventListener("click", function () {
      salvarP.disabled = true; salvarP.textContent = "Salvando...";
      Store.adminSalvarProduto(slug, {
        nome: fNome.input.value.trim(),
        subtitulo: fSub.input.value.trim() || null,
        descricao: fDesc.input.value.trim() || null,
        preco: fPreco.input.value === "" ? null : Number(fPreco.input.value),
        link_compra: fLink.input.value.trim() || null,
        kiwify_product_id: fKw.input.value.trim() || null,
        beneficios: fBenef.input.value.trim() || null,
        capa_url: fCapa.input.value.trim() || null,
        destaque: cDest.input.checked,
        gratuito: cGrat.input.checked
      }).then(function () { return Store.recarregarCatalogo(); })
        .then(function () {
          salvarP.disabled = false; salvarP.textContent = "Salvar produto";
          aviso(box, "Produto salvo.");
        }).catch(function () {
          salvarP.disabled = false; salvarP.textContent = "Salvar produto";
          aviso(box, "Não consegui salvar.");
        });
    });

    var aulasBox = el("div", {});
    function recarregarAulas() {
      carregarNo(aulasBox, Store.adminAulas(slug), function (aulas) {
        aulasBox.appendChild(el("div", { class: "painel-lista" }, aulas.map(function (au) {
          var ed = el("button", { class: "net-mini", type: "button" }, [ico(D.alfinete), "Editar"]);
          ed.addEventListener("click", function () { aulasBox.appendChild(formAula(au)); ed.scrollIntoView(); });
          var rm = el("button", { class: "net-mini net-mini--rm", type: "button" }, [ico(D.lixo), "Remover"]);
          rm.addEventListener("click", function () {
            if (!window.confirm("Remover a aula “" + au.titulo + "”?")) return;
            Store.adminRemoverAula(au.id).then(function () { return Store.recarregarCatalogo(); })
              .then(recarregarAulas).catch(function () { aviso(aulasBox, "Não consegui remover."); });
          });
          return el("div", { class: "painel-item painel-item--acao" }, [
            el("span", {}, [
              el("strong", { text: (au.ordem != null ? au.ordem + ". " : "") + au.titulo }),
              el("span", { class: "painel-item__sub",
                text: au.tipo + (au.video_url ? " · com vídeo" : "") })
            ]),
            el("span", { class: "painel-item__btns" }, [ed, rm])
          ]);
        })));
        var add = el("button", { class: "btn btn--ghost", type: "button" }, ["+ Adicionar aula"]);
        add.addEventListener("click", function () { aulasBox.appendChild(formAula(null)); add.scrollIntoView(); });
        aulasBox.appendChild(add);
      });
    }

    function formAula(au) {
      au = au || {};
      var turmaOpts = (prod.turmas || []).map(function (t) { return { v: t.id, t: t.titulo }; });
      var fCod = campoForm("Código curto", au.codigo, "ex: a1, e2, t2-06");
      var fTit = campoForm("Título", au.titulo, "");
      var fTipo = campoSelect("Tipo", au.tipo || "video", [
        { v: "video", t: "Vídeo" }, { v: "texto", t: "Texto / leitura" }, { v: "material", t: "Material" }
      ]);
      var fOrd = campoTipo("Ordem", au.ordem == null ? "" : au.ordem, "number", "1");
      var fVid = campoForm("Link do vídeo (YouTube/Vimeo)", au.video_url, "https://youtu.be/...");
      var fCont = campoForm("Texto da aula (opcional)", au.conteudo, "", true);
      var fTurma = turmaOpts.length
        ? campoSelect("Temporada (Clube)", au.turma_id, turmaOpts) : null;
      var salvar = el("button", { class: "btn btn--primario", type: "button" },
        [au.id ? "Salvar aula" : "Criar aula"]);
      var fechar = el("button", { class: "btn btn--ghost", type: "button" }, ["Cancelar"]);
      var wrap = el("div", { class: "net-form" }, [
        el("span", { class: "eyebrow", text: au.id ? "Editar aula" : "Nova aula" }),
        fCod.campo, fTit.campo, fTipo.campo, fOrd.campo, fVid.campo, fCont.campo,
        fTurma ? fTurma.campo : null,
        el("div", { class: "net-form__acoes" }, [salvar, fechar])
      ]);
      fechar.addEventListener("click", function () { wrap.parentNode.removeChild(wrap); });
      salvar.addEventListener("click", function () {
        if (!fTit.input.value.trim()) { aviso(wrap, "Coloque o título."); return; }
        salvar.disabled = true; salvar.textContent = "Salvando...";
        Store.adminSalvarAula(slug, {
          id: au.id, codigo: fCod.input.value.trim(), titulo: fTit.input.value.trim(),
          tipo: fTipo.input.value, ordem: fOrd.input.value === "" ? 0 : Number(fOrd.input.value),
          video_url: fVid.input.value.trim(), conteudo: fCont.input.value.trim(),
          turma_id: fTurma ? fTurma.input.value : null
        }).then(function () { return Store.recarregarCatalogo(); })
          .then(function () { wrap.parentNode.removeChild(wrap); recarregarAulas(); })
          .catch(function () {
            salvar.disabled = false; salvar.textContent = au.id ? "Salvar aula" : "Criar aula";
            aviso(wrap, "Não consegui salvar.");
          });
      });
      return wrap;
    }

    box.appendChild(el("div", { class: "painel-cab" }, [
      el("h1", { class: "painel-cab__nome", text: prod.nome }),
      el("p", { class: "painel-cab__sub", text: prod.categoria })
    ]));
    box.appendChild(el("div", { class: "net-form" }, [
      el("span", { class: "eyebrow", text: "Dados do produto" }),
      fNome.campo, fSub.campo, fDesc.campo, fPreco.campo, fLink.campo, fKw.campo,
      fBenef.campo,
      el("span", { class: "eyebrow", text: "Capa" }),
      fCapa.campo, campoCapaArq, capaPrevia, limparCapa,
      cDest.campo, cGrat.campo, salvarP
    ]));

    if (ehVip) {
      box.appendChild(el("h2", { class: "secao__titulo", text: "Conteúdo" }));
      box.appendChild(el("p", { class: "painel-cab__sub",
        text: "As aulas do Grupo VIP ficam organizadas em pilares." }));
      box.appendChild(el("a", { class: "btn btn--primario", href: "#/painel/vip" },
        ["Abrir Grupo VIP · pilares"]));
      return;
    }

    box.appendChild(el("h2", { class: "secao__titulo", text: "Aulas" }));
    box.appendChild(aulasBox);
    recarregarAulas();
  }

  /* ---------- Grupo VIP · pilares e aulas ---------- */
  function slugify(txt) {
    return String(txt || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function painelVip(aluna, pilarSlug) {
    var box = el("div", {});
    painelShell("Grupo VIP", pilarSlug ? "/painel/vip" : "/painel", box);

    if (pilarSlug) { painelVipPilar(box, pilarSlug); return; }

    function formPilar(pl) {
      pl = pl || {};
      var fNome = campoForm("Nome do pilar", pl.nome, "Ex: Comunicação & Presença");
      var fSlug = campoForm("Slug (link) — deixe vazio para gerar", pl.slug, "ex: comunicacao-presenca");
      var fDesc = campoForm("Descrição", pl.descricao, "Uma frase sobre o pilar", true);
      var fCad = campoForm("Cadência das lives (texto livre)", pl.cadencia_ao_vivo, "Ex: 1 live por mês");
      var fOrd = campoTipo("Ordem", pl.ordem == null ? "" : pl.ordem, "number", "1");
      var fDias = campoTipo("Libera quantos dias após a entrada da aluna",
        pl.dias_liberacao == null ? "0" : pl.dias_liberacao, "number", "0");
      var cAberto = campoCheck("Vaga aberta (ainda sem convidada fixa)", pl.aberto);
      var cVivo = campoCheck("Pilar das gravações ao vivo (ordena por data)", pl.ao_vivo);

      /* Capa: link colado OU upload de arquivo, com prévia */
      var fCapa = campoForm("Capa — link da imagem", pl.capa_url,
        "cole uma URL, ou envie um arquivo abaixo");
      var fArq = el("input", { type: "file", accept: "image/*" });
      var previa = el("img", { class: "capa-previa", alt: "" });
      if (pl.capa_url) previa.src = pl.capa_url; else previa.hidden = true;
      fArq.addEventListener("change", function () {
        var f = fArq.files && fArq.files[0];
        if (!f) return;
        fArq.disabled = true;
        Store.adminUploadCapa(f, "pilares").then(function (url) {
          fArq.disabled = false;
          fCapa.input.value = url;
          previa.src = url; previa.hidden = false;
        }).catch(function () {
          fArq.disabled = false; aviso(wrap, "Não consegui enviar a imagem.");
        });
      });
      var campoArq = el("div", { class: "campo" }, [
        el("label", { class: "campo__rotulo" }, ["Enviar foto do computador"]), fArq
      ]);

      var salvar = el("button", { class: "btn btn--primario", type: "button" },
        [pl.id ? "Salvar pilar" : "Criar pilar"]);
      var fechar = el("button", { class: "btn btn--ghost", type: "button" }, ["Cancelar"]);
      var wrap = el("div", { class: "net-form" }, [
        el("span", { class: "eyebrow", text: pl.id ? "Editar pilar" : "Novo pilar" }),
        fNome.campo, fSlug.campo, fDesc.campo,
        fCapa.campo, campoArq, previa,
        fCad.campo, fOrd.campo, fDias.campo, cAberto.campo, cVivo.campo,
        el("div", { class: "net-form__acoes" }, [salvar, fechar])
      ]);
      fechar.addEventListener("click", function () { wrap.parentNode.removeChild(wrap); });
      salvar.addEventListener("click", function () {
        var nome = fNome.input.value.trim();
        var slug = slugify(fSlug.input.value.trim() || nome);
        if (!nome || !slug) { aviso(wrap, "Coloque ao menos o nome."); return; }
        salvar.disabled = true; salvar.textContent = "Salvando...";
        Store.adminSalvarPilar(ID_GRUPO_VIP, {
          id: pl.id, slug: slug, nome: nome,
          descricao: fDesc.input.value.trim(),
          capa_url: fCapa.input.value.trim(),
          cadencia_ao_vivo: fCad.input.value.trim(),
          ordem: fOrd.input.value === "" ? 0 : Number(fOrd.input.value),
          dias_liberacao: fDias.input.value === "" ? 0 : Number(fDias.input.value),
          aberto: cAberto.input.checked, ao_vivo: cVivo.input.checked
        }).then(function () { return Store.recarregarCatalogo(); })
          .then(function () { wrap.parentNode.removeChild(wrap); recarregar(); })
          .catch(function () {
            salvar.disabled = false; salvar.textContent = pl.id ? "Salvar pilar" : "Criar pilar";
            aviso(wrap, "Não consegui salvar.");
          });
      });
      return wrap;
    }

    function recarregar() {
      carregarNo(box, Store.adminPilares(ID_GRUPO_VIP), function (pilares) {
        box.appendChild(el("div", { class: "painel-cab" }, [
          el("h1", { class: "painel-cab__nome", text: "Grupo VIP · pilares" }),
          el("p", { class: "painel-cab__sub",
            text: "Cada pilar é uma trilha. Toque em “Aulas” para adicionar conteúdo." })
        ]));
        box.appendChild(el("h2", { class: "secao__titulo",
          text: pilares.length + (pilares.length === 1 ? " pilar" : " pilares") }));
        box.appendChild(el("div", { class: "painel-lista" }, pilares.map(function (pl) {
          var ir = el("a", { class: "net-mini", href: "#/painel/vip/" + pl.slug },
            [ico(D.livro), "Aulas"]);
          var ed = el("button", { class: "net-mini", type: "button" }, [ico(D.alfinete), "Editar"]);
          ed.addEventListener("click", function () { box.appendChild(formPilar(pl)); ed.scrollIntoView(); });
          var rm = el("button", { class: "net-mini net-mini--rm", type: "button" }, [ico(D.lixo), "Remover"]);
          rm.addEventListener("click", function () {
            if (!window.confirm("Remover o pilar “" + pl.nome + "”? As aulas dele ficam sem pilar.")) return;
            Store.adminRemoverPilar(pl.id).then(function () { return Store.recarregarCatalogo(); })
              .then(recarregar).catch(function () { aviso(box, "Não consegui remover."); });
          });
          return el("div", { class: "painel-item painel-item--acao" }, [
            el("span", {}, [
              el("strong", { text: (pl.ordem != null ? pl.ordem + ". " : "") + pl.nome }),
              el("span", { class: "painel-item__sub", text: pl.ao_vivo
                ? "gravações ao vivo · sempre liberado"
                : ((pl.aberto ? "vaga aberta · " : "")
                   + (Number(pl.dias_liberacao) > 0
                      ? "abre " + pl.dias_liberacao + " dias após a entrada"
                      : "abre na entrada")) })
            ]),
            el("span", { class: "painel-item__btns" }, [ir, ed, rm])
          ]);
        })));
        var add = el("button", { class: "btn btn--ghost", type: "button" }, ["+ Adicionar pilar"]);
        add.addEventListener("click", function () { box.appendChild(formPilar(null)); add.scrollIntoView(); });
        box.appendChild(add);
      });
    }
    recarregar();
  }

  function painelVipPilar(box, pilarSlug) {
    carregarNo(box, Store.adminPilares(ID_GRUPO_VIP), function (pilares) {
      var pl = pilares.find(function (x) { return x.slug === pilarSlug; });
      if (!pl) { irPara("/painel/vip"); return; }
      var aoVivo = !!pl.ao_vivo;

      box.appendChild(el("div", { class: "painel-cab" }, [
        el("h1", { class: "painel-cab__nome", text: pl.nome }),
        el("p", { class: "painel-cab__sub", text: aoVivo
          ? "Gravações das lives (mais recentes primeiro)"
          : "Trilha gravada do pilar" })
      ]));

      var aulasBox = el("div", {});
      box.appendChild(el("h2", { class: "secao__titulo", text: "Aulas" }));
      box.appendChild(aulasBox);

      function formAula(au) {
        au = au || {};
        var fCod = campoForm("Código curto", au.codigo, "ex: com-01");
        var fTit = campoForm("Título", au.titulo, "");
        var fTipo = campoSelect("Tipo", au.tipo || "video", [
          { v: "video", t: "Vídeo" }, { v: "texto", t: "Texto / leitura" }, { v: "material", t: "Material" }
        ]);
        var fOrd = campoTipo("Ordem", au.ordem == null ? "" : au.ordem, "number", "1");
        var fVid = campoForm("Link do vídeo (YouTube/Vimeo)", au.video_url, "https://youtu.be/...");
        var fData = aoVivo
          ? campoTipo("Data da live", paraInputDateTime(au.data_aula), "datetime-local") : null;
        var fCont = campoForm("Texto da aula (opcional)", au.conteudo, "", true);
        var salvar = el("button", { class: "btn btn--primario", type: "button" },
          [au.id ? "Salvar aula" : "Criar aula"]);
        var fechar = el("button", { class: "btn btn--ghost", type: "button" }, ["Cancelar"]);
        var wrap = el("div", { class: "net-form" }, [
          el("span", { class: "eyebrow", text: au.id ? "Editar aula" : "Nova aula" }),
          fCod.campo, fTit.campo, fTipo.campo, fOrd.campo, fVid.campo,
          fData ? fData.campo : null, fCont.campo,
          el("div", { class: "net-form__acoes" }, [salvar, fechar])
        ]);
        fechar.addEventListener("click", function () { wrap.parentNode.removeChild(wrap); });
        salvar.addEventListener("click", function () {
          if (!fTit.input.value.trim()) { aviso(wrap, "Coloque o título."); return; }
          salvar.disabled = true; salvar.textContent = "Salvando...";
          Store.adminSalvarAula(ID_GRUPO_VIP, {
            id: au.id, codigo: fCod.input.value.trim(), titulo: fTit.input.value.trim(),
            tipo: fTipo.input.value, ordem: fOrd.input.value === "" ? 0 : Number(fOrd.input.value),
            video_url: fVid.input.value.trim(), conteudo: fCont.input.value.trim(),
            pilar_id: pl.id,
            data_aula: (fData && fData.input.value)
              ? new Date(fData.input.value).toISOString() : null
          }).then(function () { return Store.recarregarCatalogo(); })
            .then(function () { wrap.parentNode.removeChild(wrap); recarregarAulas(); })
            .catch(function () {
              salvar.disabled = false; salvar.textContent = au.id ? "Salvar aula" : "Criar aula";
              aviso(wrap, "Não consegui salvar.");
            });
        });
        return wrap;
      }

      function recarregarAulas() {
        carregarNo(aulasBox, Store.adminAulas(ID_GRUPO_VIP, pl.id), function (aulas) {
          aulasBox.appendChild(el("div", { class: "painel-lista" }, aulas.map(function (au) {
            var ed = el("button", { class: "net-mini", type: "button" }, [ico(D.alfinete), "Editar"]);
            ed.addEventListener("click", function () { aulasBox.appendChild(formAula(au)); ed.scrollIntoView(); });
            var rm = el("button", { class: "net-mini net-mini--rm", type: "button" }, [ico(D.lixo), "Remover"]);
            rm.addEventListener("click", function () {
              if (!window.confirm("Remover a aula “" + au.titulo + "”?")) return;
              Store.adminRemoverAula(au.id).then(function () { return Store.recarregarCatalogo(); })
                .then(recarregarAulas).catch(function () { aviso(aulasBox, "Não consegui remover."); });
            });
            return el("div", { class: "painel-item painel-item--acao" }, [
              el("span", {}, [
                el("strong", { text: (au.ordem != null ? au.ordem + ". " : "") + au.titulo }),
                el("span", { class: "painel-item__sub", text: au.tipo
                  + (au.video_url ? " · com vídeo" : "")
                  + (aoVivo && au.data_aula ? " · " + dataCurta(au.data_aula) : "") })
              ]),
              el("span", { class: "painel-item__btns" }, [ed, rm])
            ]);
          })));
          var add = el("button", { class: "btn btn--ghost", type: "button" }, ["+ Adicionar aula"]);
          add.addEventListener("click", function () { aulasBox.appendChild(formAula(null)); add.scrollIntoView(); });
          aulasBox.appendChild(add);
        });
      }
      recarregarAulas();
    });
  }

  /* ---------- Agenda ---------- */
  function painelAgenda(aluna) {
    var box = el("div", {});
    painelShell("Agenda", "/painel", box);

    var prodOpts = [{ v: "", t: "— aberto a todas —" }].concat(
      (SEED.produtos || []).map(function (p) { return { v: p.id, t: p.nome }; }));

    var vipDoPainel = (SEED.produtos || []).find(function (p) { return p.id === ID_GRUPO_VIP; });
    var pilarOpts = [{ v: "", t: "— sem pilar —" }].concat(
      ((vipDoPainel && vipDoPainel.pilares) || []).map(function (pl) {
        return { v: pl.id, t: pl.nome };
      }));

    function formEvento(ev) {
      ev = ev || {};
      var fTit = campoForm("Título", ev.titulo, "Ex: Live · Oração da manhã");
      var fData = campoTipo("Data e hora", paraInputDateTime(ev.data_hora), "datetime-local");
      var fProd = campoSelect("Produto", ev.produtoSlug || "", prodOpts);
      var fPilar = campoSelect("Pilar (só Grupo VIP)", ev.pilarSlug || "", pilarOpts);
      var fLink = campoForm("Link da sala/gravação", ev.link, "https://...");
      var salvar = el("button", { class: "btn btn--primario", type: "button" },
        [ev.id ? "Salvar" : "Criar evento"]);
      var fechar = el("button", { class: "btn btn--ghost", type: "button" }, ["Cancelar"]);
      var wrap = el("div", { class: "net-form" }, [
        el("span", { class: "eyebrow", text: ev.id ? "Editar evento" : "Novo evento" }),
        fTit.campo, fData.campo, fProd.campo, fPilar.campo, fLink.campo,
        el("div", { class: "net-form__acoes" }, [salvar, fechar])
      ]);
      function syncPilar() { fPilar.campo.hidden = fProd.input.value !== ID_GRUPO_VIP; }
      fProd.input.addEventListener("change", syncPilar);
      syncPilar();
      fechar.addEventListener("click", function () { wrap.parentNode.removeChild(wrap); });
      salvar.addEventListener("click", function () {
        if (!fTit.input.value.trim() || !fData.input.value) { aviso(wrap, "Preencha título e data."); return; }
        salvar.disabled = true; salvar.textContent = "Salvando...";
        Store.adminSalvarEvento({
          id: ev.id, titulo: fTit.input.value.trim(),
          data_hora: new Date(fData.input.value).toISOString(),
          produtoSlug: fProd.input.value || null,
          pilarSlug: fProd.input.value === ID_GRUPO_VIP ? (fPilar.input.value || null) : null,
          link: fLink.input.value.trim()
        }).then(function () { return Store.recarregarCatalogo(); })
          .then(function () { wrap.parentNode.removeChild(wrap); recarregar(); })
          .catch(function () {
            salvar.disabled = false; salvar.textContent = ev.id ? "Salvar" : "Criar evento";
            aviso(wrap, "Não consegui salvar.");
          });
      });
      return wrap;
    }

    function recarregar() {
      carregarNo(box, Store.adminEventos(), function (eventos) {
        box.appendChild(el("h2", { class: "secao__titulo",
          text: eventos.length + (eventos.length === 1 ? " evento" : " eventos") }));
        box.appendChild(el("div", { class: "painel-lista" }, eventos.map(function (ev) {
          var ed = el("button", { class: "net-mini", type: "button" }, [ico(D.alfinete), "Editar"]);
          ed.addEventListener("click", function () { box.appendChild(formEvento(ev)); ed.scrollIntoView(); });
          var rm = el("button", { class: "net-mini net-mini--rm", type: "button" }, [ico(D.lixo), "Remover"]);
          rm.addEventListener("click", function () {
            if (!window.confirm("Remover “" + ev.titulo + "”?")) return;
            Store.adminRemoverEvento(ev.id).then(function () { return Store.recarregarCatalogo(); })
              .then(recarregar).catch(function () { aviso(box, "Não consegui remover."); });
          });
          return el("div", { class: "painel-item painel-item--acao" }, [
            el("span", {}, [
              el("strong", { text: ev.titulo }),
              el("span", { class: "painel-item__sub", text: dataCurta(ev.data_hora) })
            ]),
            el("span", { class: "painel-item__btns" }, [ed, rm])
          ]);
        })));
        var add = el("button", { class: "btn btn--ghost", type: "button" }, ["+ Adicionar evento"]);
        add.addEventListener("click", function () { box.appendChild(formEvento(null)); add.scrollIntoView(); });
        box.appendChild(add);
      });
    }
    recarregar();
  }

  /* =======================================================
     Roteador
     ======================================================= */
  function rotear() {
    var caminho = location.hash.replace(/^#/, "") || "/";
    var partes = caminho.split("/").filter(Boolean);
    var aluna = Store.alunaLogada();

    if (modoRecuperacao) { barraNav.hidden = true; fecharDrawer(); telaNovaSenha(); return; }
    if (!aluna) { barraNav.hidden = true; fecharDrawer(); telaLogin(); return; }
    barraNav.hidden = false;
    atualizarDrawer(aluna);

    if (partes[0] === "painel") {
      if (aluna.papel !== "mentora") { irPara("/"); return; }
      atualizarNav("");
      telaPainel(aluna, partes.slice(1));
      return;
    }

    if (partes[0] === "produto" && partes[1]) {
      var produto = SEED.produtos.find(function (p) { return p.id === partes[1]; });
      if (!produto) { irPara("/"); return; }
      atualizarNav("/");
      if (!temAcessoA(aluna, produto)) { telaProdutoVenda(aluna, produto); return; }
      if (produto.categoria === "Rede") { irPara("/networking"); return; }

      if (partes[2] === "aula" && partes[3]) {
        var aula = produto.aulas.find(function (x) { return x.id === partes[3]; });
        if (!aula) { irPara("/produto/" + produto.id); return; }
        /* aula dentro de um pilar ainda não liberado: volta pro pilar (que mostra quando abre) */
        var pilarDaAula = (produto.pilares || []).find(function (p) {
          return (p.aulas || []).some(function (a) { return a.id === aula.id; });
        });
        if (pilarDaAula && !statusPilar(aluna, produto, pilarDaAula).liberado) {
          irPara("/produto/" + produto.id + "/pilar/" + pilarDaAula.id);
          return;
        }
        telaAula(aluna, produto, aula);
        return;
      }
      if (partes[2] === "jornada" && produto.id === ID_MENTORIA) {
        telaProduto(aluna, produto, "jornada");
        return;
      }
      if (partes[2] === "pilar" && partes[3] && produto.pilares) {
        var pilar = produto.pilares.find(function (x) { return x.id === partes[3]; });
        if (!pilar) { irPara("/produto/" + produto.id); return; }
        telaPilar(aluna, produto, pilar);
        return;
      }
      telaProduto(aluna, produto);
      return;
    }

    /* rota antiga #/jornada: leva para a Jornada COROA dentro da mentoria */
    if (partes[0] === "jornada") {
      irPara(aluna.produtos.indexOf(ID_MENTORIA) !== -1
        ? "/produto/" + ID_MENTORIA + "/jornada" : "/");
      return;
    }

    if (partes[0] === "agenda") { Store.marcarVisto("eventos"); atualizarNav("/agenda"); telaAgenda(aluna, partes[1] || ""); return; }
    if (partes[0] === "perfil") { atualizarNav("/perfil"); telaPerfil(aluna); return; }
    if (partes[0] === "networking") { Store.marcarVisto("anuncios"); atualizarNav("/networking"); telaNetworking(aluna, partes[1] || ""); return; }

    if (partes[0] === "devocional") {
      atualizarNav("/devocional");
      telaDevocional(aluna, partes[1] || "");
      return;
    }

    if (partes[0] === "comunidade") {
      atualizarNav("/comunidade");
      if (partes[1]) {
        var grupo = SEED.grupos.find(function (g) { return g.id === partes[1]; });
        if (!grupo) { irPara("/comunidade"); return; }
        telaGrupo(aluna, grupo);
      } else {
        telaComunidade(aluna);
      }
      return;
    }

    if (caminho === "/entrar") { irPara("/"); return; }

    atualizarNav("/");
    telaInicio(aluna);
  }

  /* Recarrega a sessão do Supabase (quem está logada) e redesenha a tela. */
  function carregarERotear() {
    return Store.carregarSessao()
      .then(function () { rotear(); })
      .catch(function (e) {
        console.error("Erro ao carregar a sessão:", e);
        rotear();
      });
  }

  function iniciar() {
    montarNav();
    montarDrawer();
    window.addEventListener("hashchange", rotear);

    /* A pessoa pode chegar pelo link do e-mail de "esqueci a senha". */
    try {
      if (location.hash.indexOf("type=recovery") !== -1) modoRecuperacao = true;
    } catch (e) {}

    /* Reage a entrar/sair (inclusive login feito em outra aba). */
    window.sb.auth.onAuthStateChange(function (evento) {
      if (evento === "PASSWORD_RECOVERY") {
        modoRecuperacao = true;
        setTimeout(rotear, 0);
        return;
      }
      if (evento === "SIGNED_IN" || evento === "SIGNED_OUT" || evento === "USER_UPDATED") {
        setTimeout(carregarERotear, 0);
      }
    });

    carregarERotear();
  }

  return { iniciar: iniciar, recarregar: carregarERotear };
})();

document.addEventListener("DOMContentLoaded", App.iniciar);
