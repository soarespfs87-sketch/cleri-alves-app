/* ============================================================
   Camada de dados — agora falando com o Supabase de verdade
   ------------------------------------------------------------
   O app continua chamando Store.xxxx() de forma síncrona, como
   sempre. O truque:

   - No boot, carregarSessao() traz TUDO do banco para uma
     "memória de trabalho" (o objeto `cache`).
   - Os getters (aulaConcluida, humorDeHoje, diarioDe...) leem
     desse cache — resposta instantânea, a tela não trava.
   - As gravações mudam o cache na hora (a tela já reflete) e
     mandam pro Supabase em segundo plano.

   Nada mais é salvo no navegador (localStorage): saiu tudo
   para o banco, ligado ao user_id da aluna logada.
   ============================================================ */

window.Store = (function () {

  /* ---------- estado em memória ---------- */

  var alunaAtual = null;

  var slugPorProdutoId = {};   /* uuid do produto -> slug ("curso-alicerce") */
  var produtoIdPorSlug = {};   /* slug -> uuid, usado na hora de gravar      */
  var grupoIdPorSlug   = {};   /* slug do grupo -> uuid                      */
  var aulaIdPorChave   = {};   /* "<produtoUuid>|<codigo>" -> uuid da aula   */
  var pilarIdPorChave  = {};   /* "<produtoUuid>|<slug>" -> uuid do pilar    */
  var pilarSlugPorId   = {};   /* uuid do pilar -> slug                       */
  var catalogoCarregado = false;

  var cache = vazio();
  function vazio() {
    return {
      progresso: {},    /* aulaUuid  -> true                        */
      humor: null,      /* { dia:"YYYY-MM-DD", valor:"..." }        */
      devocional: {},   /* "YYYY-MM-DD" -> true                     */
      leitura: {},      /* itemUuid  -> true                        */
      diario: [],       /* [{ id, data(ISO), texto }]               */
      posts: {},        /* grupoSlug -> [{ id, autorId, autor, data, texto }] */
      anuncios: []      /* networking: [{ id, autorId, autor, nichoId, negocio, ... }] */
    };
  }

  /* ---------- ajudantes ---------- */

  function dataLocalISO(d) {
    d = d || new Date();
    var m = d.getMonth() + 1, dia = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (dia < 10 ? "0" + dia : dia);
  }
  function uid() { return alunaAtual ? alunaAtual.id : null; }

  function aulaUuid(produtoSlug, codigo) {
    var pid = produtoIdPorSlug[produtoSlug];
    return pid ? aulaIdPorChave[pid + "|" + codigo] : null;
  }

  /* Registra no console (sem quebrar a tela) se uma gravação falhar. */
  function aoFalhar(oque) {
    return function (r) {
      if (r && r.error) console.error("Erro ao " + oque + ":", r.error.message || r.error);
    };
  }

  /* ======================================================
     LOGIN / SESSÃO
     ====================================================== */

  function alunaLogada() { return alunaAtual; }
  function slugDoProduto(u) { return slugPorProdutoId[u] || null; }
  function idDoProdutoSlug(s) { return produtoIdPorSlug[s] || null; }

  /* Traz o conteúdo da Cleri (catálogo) do banco e reescreve o SEED.
     Só roda uma vez por carregamento do app. */
  async function carregarCatalogo() {
    if (catalogoCarregado) return;

    var r = await Promise.all([
      sb.from("produtos").select("*").order("ordem"),
      sb.from("aulas").select("*").order("ordem"),
      sb.from("etapas_coroa").select("*").order("ordem"),
      sb.from("devocionais").select("*").order("ordem"),
      sb.from("plano_leitura").select("*").order("ordem"),
      sb.from("grupos").select("*").order("created_at"),
      sb.from("eventos").select("*").order("data_hora"),
      sb.from("produto_ofertas").select("*").order("ordem"),
      sb.from("produto_materiais").select("*").order("ordem"),
      sb.from("clube_turmas").select("*").order("ordem"),
      sb.from("networking_nichos").select("*").order("dia_semana"),
      sb.from("produto_pilares").select("*").order("ordem")
    ]);
    var produtos = r[0].data || [], aulas = r[1].data || [], coroa = r[2].data || [],
        devs = r[3].data || [], plano = r[4].data || [], grupos = r[5].data || [],
        eventos = r[6].data || [], ofertas = r[7].data || [], materiais = r[8].data || [],
        turmas = r[9].data || [], nichos = r[10].data || [], pilares = r[11].data || [];

    produtos.forEach(function (p) {
      slugPorProdutoId[p.id] = p.slug;
      produtoIdPorSlug[p.slug] = p.id;
    });
    grupos.forEach(function (g) { grupoIdPorSlug[g.slug] = g.id; });
    aulas.forEach(function (a) { aulaIdPorChave[a.produto_id + "|" + a.codigo] = a.id; });
    pilares.forEach(function (pl) {
      pilarIdPorChave[pl.produto_id + "|" + pl.slug] = pl.id;
      pilarSlugPorId[pl.id] = pl.slug;
    });

    /* Uma aula do jeito que as telas esperam. */
    function mapAula(a) {
      return {
        id: a.codigo, titulo: a.titulo, tipo: a.tipo,
        conteudo: a.conteudo, video_url: a.video_url, data_aula: a.data_aula || null
      };
    }

    if (produtos.length) {
      SEED.produtos = produtos.map(function (p) {
        /* Pilares (trilhas temáticas) do produto — hoje só o Grupo VIP tem. */
        var pilaresDoProduto = pilares
          .filter(function (pl) { return pl.produto_id === p.id; })
          .map(function (pl) {
            var doPilar = aulas.filter(function (a) { return a.pilar_id === pl.id; });
            if (pl.ao_vivo) {
              /* pilar de gravações ao vivo: mais recentes primeiro */
              doPilar = doPilar.slice().sort(function (a, b) {
                return String(b.data_aula || "").localeCompare(String(a.data_aula || ""));
              });
            }
            return {
              id: pl.slug, nome: pl.nome, descricao: pl.descricao,
              responsavel: pl.responsavel, cadencia_ao_vivo: pl.cadencia_ao_vivo,
              aberto: pl.aberto, ao_vivo: pl.ao_vivo, capa_url: pl.capa_url,
              ordem: pl.ordem, aulas: doPilar.map(mapAula)
            };
          });

        return {
          id: p.slug, categoria: p.categoria, nome: p.nome, descricao: p.descricao,
          subtitulo: p.subtitulo, capa_url: p.capa_url, preco: p.preco,
          link_compra: p.link_compra, gratuito: p.gratuito, destaque: p.destaque,
          oculto: p.oculto, kiwify_product_id: p.kiwify_product_id,
          beneficios: p.beneficios
            ? String(p.beneficios).split(/\r?\n/)
                .map(function (s) { return s.trim(); })
                .filter(Boolean)
            : [],
          ofertas: ofertas
            .filter(function (o) { return o.produto_id === p.id; })
            .map(function (o) {
              return { rotulo: o.rotulo, preco: o.preco, link_compra: o.link_compra };
            }),
          materiais: materiais
            .filter(function (m) { return m.produto_id === p.id; })
            .map(function (m) {
              return { titulo: m.titulo, tipo: m.tipo, arquivo_path: m.arquivo_path };
            }),
          turmas: (p.slug === "clube-livro")
            ? turmas.map(function (t) {
                return {
                  id: t.id, titulo: t.titulo, livro: t.livro, autor: t.autor,
                  capa_url: t.capa_url, preco: t.preco, link_compra: t.link_compra,
                  periodo: t.periodo, atual: t.atual,
                  aulas: aulas
                    .filter(function (a) { return a.turma_id === t.id; })
                    .map(mapAula)
                };
              })
            : null,
          pilares: pilaresDoProduto.length ? pilaresDoProduto : null,
          /* Lista achatada — a navegação "próxima aula" e o progresso usam esta.
             Com pilares, é a soma das aulas de cada pilar, na ordem dos pilares. */
          aulas: pilaresDoProduto.length
            ? pilaresDoProduto.reduce(function (acc, pl) {
                return acc.concat(pl.aulas);
              }, [])
            : aulas
                .filter(function (a) { return a.produto_id === p.id; })
                .map(mapAula)
        };
      });
    }
    if (coroa.length) {
      SEED.coroa = coroa.map(function (e) {
        return { letra: e.letra, nome: e.nome, frase: e.frase };
      });
    }
    if (devs.length) {
      SEED.devocionais = devs.map(function (d) {
        return { titulo: d.titulo, texto: d.texto, versiculo: d.versiculo, referencia: d.referencia };
      });
    }
    if (plano.length) {
      SEED.planoLeitura = plano.map(function (it) {
        return { id: it.id, dia: it.dia, passagem: it.passagem };
      });
    }
    if (grupos.length) {
      SEED.grupos = grupos.map(function (g) {
        return { id: g.slug, nome: g.nome, tema: g.tema, descricao: g.descricao,
                 desafio: g.desafio, posts: [] };
      });
    }
    if (eventos.length) {
      SEED.eventos = eventos.map(function (ev) {
        return { id: ev.id, titulo: ev.titulo, data: ev.data_hora,
                 produtoId: ev.produto_id ? slugPorProdutoId[ev.produto_id] : null,
                 pilarId: ev.pilar_id ? pilarSlugPorId[ev.pilar_id] : null,
                 donoId: ev.user_id || null, dono: ev.autor_nome || null,
                 criadoEm: ev.created_at, link: ev.link };
      });
    }
    if (nichos.length) {
      SEED.nichos = nichos.map(function (nc) {
        return { id: nc.id, dia_semana: nc.dia_semana, nome: nc.nome, descricao: nc.descricao };
      });
    }

    catalogoCarregado = true;
  }

  function mapAnuncio(a) {
    return {
      id: a.id, autorId: a.user_id, autor: a.autor_nome || "Aluna",
      nichoId: a.nicho_id, negocio: a.negocio, descricao: a.descricao,
      whatsapp: a.whatsapp, instagram: a.instagram, site: a.site,
      foto: a.foto_url || null, data: a.created_at
    };
  }

  /* Traz os dados pessoais da aluna logada para o cache. */
  async function carregarDadosDaAluna() {
    cache = vazio();
    if (!uid()) return;
    var hoje = dataLocalISO();

    var r = await Promise.all([
      sb.from("progresso_aulas").select("aula_id"),
      sb.from("humor_dia").select("dia, valor").eq("dia", hoje).maybeSingle(),
      sb.from("devocional_lido").select("dia"),
      sb.from("leitura_feita").select("item_id"),
      sb.from("diario").select("id, texto, created_at").order("created_at", { ascending: false }),
      sb.from("posts")
        .select("id, texto, created_at, user_id, autor_nome, grupos(slug)")
        .order("created_at", { ascending: false }),
      sb.from("networking_anuncios").select("*")
        .order("created_at", { ascending: false })
    ]);

    (r[0].data || []).forEach(function (x) { cache.progresso[x.aula_id] = true; });
    if (r[1].data) cache.humor = { dia: r[1].data.dia, valor: r[1].data.valor };
    (r[2].data || []).forEach(function (x) { cache.devocional[x.dia] = true; });
    (r[3].data || []).forEach(function (x) { cache.leitura[x.item_id] = true; });
    cache.diario = (r[4].data || []).map(function (n) {
      return { id: n.id, data: n.created_at, texto: n.texto };
    });
    (r[5].data || []).forEach(function (p) {
      var slug = p.grupos && p.grupos.slug;
      if (!slug) return;
      (cache.posts[slug] = cache.posts[slug] || []).push({
        id: p.id, autorId: p.user_id, autor: p.autor_nome || "Alguém",
        data: p.created_at, texto: p.texto
      });
    });
    cache.anuncios = (r[6].data || []).map(mapAnuncio);
  }

  /* Lê a sessão do Supabase e monta (ou limpa) a aluna logada + os dados. */
  async function carregarSessao() {
    var s = await sb.auth.getSession();
    var sessao = s.data.session;
    if (!sessao) { alunaAtual = null; cache = vazio(); return null; }

    await carregarCatalogo();

    var u = sessao.user.id;
    var perfilResp = await sb.from("perfis").select("*").eq("id", u).maybeSingle();
    var acessosResp = await sb.from("acessos").select("produto_id");
    var perfil = perfilResp.data;

    alunaAtual = {
      id: u,
      nome: (perfil && perfil.nome) || sessao.user.email,
      email: (perfil && perfil.email) || sessao.user.email,
      papel: (perfil && perfil.papel) || "aluna",
      foto_url: perfil && perfil.foto_url,
      etapa_coroa: (perfil && perfil.etapa_coroa) || 0,
      produtos: (acessosResp.data || [])
        .map(function (a) { return slugPorProdutoId[a.produto_id]; })
        .filter(Boolean)
    };

    await carregarDadosDaAluna();
    return alunaAtual;
  }

  /* Criar conta: nome + e-mail + senha. O perfil nasce sozinho no banco
     (gatilho on_auth_user_created). Retorna true se já entrou direto. */
  async function cadastrar(nome, email, senha) {
    var r = await sb.auth.signUp({
      email: (email || "").trim(),
      password: senha,
      options: { data: { nome: (nome || "").trim() } }
    });
    if (r.error) throw r.error;
    return !!r.data.session;   /* false = precisa confirmar e-mail antes */
  }

  async function entrarComSenha(email, senha) {
    var r = await sb.auth.signInWithPassword({
      email: (email || "").trim(),
      password: senha
    });
    if (r.error) throw r.error;
  }

  /* Manda o e-mail com o link para redefinir a senha. O link traz a pessoa
     de volta ao app já numa sessão de recuperação (ver app.js -> telaNovaSenha). */
  async function enviarResetSenha(email) {
    var destino = location.origin + location.pathname;
    var r = await sb.auth.resetPasswordForEmail((email || "").trim(), { redirectTo: destino });
    if (r.error) throw r.error;
  }

  /* Grava a nova senha na sessão atual (fluxo de recuperação). */
  async function definirNovaSenha(senha) {
    var r = await sb.auth.updateUser({ password: senha });
    if (r.error) throw r.error;
  }

  async function sair() {
    await sb.auth.signOut();
    alunaAtual = null;
    cache = vazio();
  }

  /* Link temporário (1h) para abrir um material do bucket privado 'materiais'.
     Só funciona se a aluna tiver acesso ao produto (as políticas cuidam disso). */
  async function linkMaterial(path) {
    var r = await sb.storage.from("materiais").createSignedUrl(path, 3600);
    return (r && r.data) ? r.data.signedUrl : null;
  }

  /* ======================================================
     PROGRESSO DAS AULAS
     ====================================================== */

  function aulaConcluida(_a, produtoSlug, codigo) {
    return !!cache.progresso[aulaUuid(produtoSlug, codigo)];
  }

  function alternarAula(_a, produtoSlug, codigo) {
    var au = aulaUuid(produtoSlug, codigo);
    if (!au) return false;
    if (cache.progresso[au]) {
      delete cache.progresso[au];
      sb.from("progresso_aulas").delete().eq("user_id", uid()).eq("aula_id", au)
        .then(aoFalhar("apagar progresso"));
      return false;
    }
    cache.progresso[au] = true;
    sb.from("progresso_aulas").insert({ user_id: uid(), aula_id: au })
      .then(aoFalhar("salvar progresso"));
    return true;
  }

  function contarConcluidas(_a, produto) {
    var n = 0;
    produto.aulas.forEach(function (aula) {
      if (aulaConcluida(null, produto.id, aula.id)) n++;
    });
    return n;
  }

  function proximaAulaEmAberto(_a, produto) {
    return produto.aulas.find(function (aula) {
      return !aulaConcluida(null, produto.id, aula.id);
    }) || null;
  }

  /* ======================================================
     HUMOR DO DIA
     ====================================================== */

  function humorDeHoje(_a) {
    var hoje = dataLocalISO();
    return (cache.humor && cache.humor.dia === hoje) ? cache.humor.valor : null;
  }

  function definirHumor(_a, valor) {
    var hoje = dataLocalISO();
    cache.humor = { dia: hoje, valor: valor };
    sb.from("humor_dia")
      .upsert({ user_id: uid(), dia: hoje, valor: valor }, { onConflict: "user_id,dia" })
      .then(aoFalhar("salvar humor"));
  }

  /* ======================================================
     DEVOCIONAL LIDO
     ====================================================== */

  function devocionalLidoHoje(_a) { return !!cache.devocional[dataLocalISO()]; }

  function alternarDevocional(_a) {
    var hoje = dataLocalISO();
    if (cache.devocional[hoje]) {
      delete cache.devocional[hoje];
      sb.from("devocional_lido").delete().eq("user_id", uid()).eq("dia", hoje)
        .then(aoFalhar("apagar devocional"));
      return false;
    }
    cache.devocional[hoje] = true;
    sb.from("devocional_lido").insert({ user_id: uid(), dia: hoje })
      .then(aoFalhar("salvar devocional"));
    return true;
  }

  /* ======================================================
     PLANO DE LEITURA DA BÍBLIA
     ====================================================== */

  function leituraFeita(_a, itemId) { return !!cache.leitura[itemId]; }

  function alternarLeitura(_a, itemId) {
    if (cache.leitura[itemId]) {
      delete cache.leitura[itemId];
      sb.from("leitura_feita").delete().eq("user_id", uid()).eq("item_id", itemId)
        .then(aoFalhar("apagar leitura"));
      return false;
    }
    cache.leitura[itemId] = true;
    sb.from("leitura_feita").insert({ user_id: uid(), item_id: itemId })
      .then(aoFalhar("salvar leitura"));
    return true;
  }

  function contarLeituras(_a) { return Object.keys(cache.leitura).length; }

  /* ======================================================
     DIÁRIO ESPIRITUAL
     ====================================================== */

  function diarioDe(_a) {
    return cache.diario.slice().sort(function (a, b) {
      return String(b.data).localeCompare(String(a.data));
    });
  }

  function adicionarAnotacao(_a, texto) {
    var tmp = "tmp-" + Date.now();
    cache.diario.unshift({ id: tmp, data: new Date().toISOString(), texto: texto });
    sb.from("diario").insert({ user_id: uid(), texto: texto })
      .select("id, created_at").single()
      .then(function (r) {
        if (r.error) { console.error("Erro ao salvar anotação:", r.error.message || r.error); return; }
        var item = cache.diario.find(function (n) { return n.id === tmp; });
        if (item) { item.id = r.data.id; item.data = r.data.created_at; }
      });
  }

  function removerAnotacao(_a, id) {
    cache.diario = cache.diario.filter(function (n) { return n.id !== id; });
    if (String(id).indexOf("tmp-") === 0) return;
    sb.from("diario").delete().eq("id", id).then(aoFalhar("apagar anotação"));
  }

  /* ======================================================
     COMUNIDADE (posts das alunas)
     ====================================================== */

  function postsDoGrupo(grupoSlug) { return cache.posts[grupoSlug] || []; }

  function adicionarPost(grupoSlug, aluna, texto) {
    var gid = grupoIdPorSlug[grupoSlug];
    if (!gid) return;
    var tmp = "tmp-" + Date.now();
    (cache.posts[grupoSlug] = cache.posts[grupoSlug] || []).unshift({
      id: tmp, autorId: aluna.id, autor: aluna.nome,
      data: new Date().toISOString(), texto: texto
    });
    sb.from("posts")
      .insert({ grupo_id: gid, user_id: aluna.id, texto: texto, autor_nome: aluna.nome })
      .select("id, created_at").single()
      .then(function (r) {
        if (r.error) { console.error("Erro ao publicar:", r.error.message || r.error); return; }
        var item = (cache.posts[grupoSlug] || []).find(function (p) { return p.id === tmp; });
        if (item) { item.id = r.data.id; item.data = r.data.created_at; }
      });
  }

  function removerPost(grupoSlug, id) {
    cache.posts[grupoSlug] = (cache.posts[grupoSlug] || [])
      .filter(function (p) { return p.id !== id; });
    if (String(id).indexOf("tmp-") === 0) return;
    sb.from("posts").delete().eq("id", id).then(aoFalhar("apagar post"));
  }

  /* ======================================================
     NETWORKING (anúncios de negócio das alunas)
     ====================================================== */

  function podeAnunciar() {
    return !!(alunaAtual && (alunaAtual.produtos || []).indexOf("rede-anunciante") !== -1);
  }

  function nichos() { return (SEED.nichos || []).slice(); }
  function anunciosDoNicho(nichoId) {
    return cache.anuncios.filter(function (a) { return a.nichoId === nichoId; });
  }
  function meusAnuncios() {
    var u = uid();
    return cache.anuncios.filter(function (a) { return a.autorId === u; });
  }

  /* Cria ou atualiza o anúncio da aluna. Retorna o anúncio salvo. */
  async function salvarAnuncio(a) {
    var dados = {
      user_id: uid(), nicho_id: a.nicho_id,
      negocio: a.negocio, descricao: a.descricao,
      whatsapp: a.whatsapp || null, instagram: a.instagram || null, site: a.site || null,
      foto_url: a.foto_url || null,
      autor_nome: alunaAtual ? alunaAtual.nome : null, ativo: true
    };
    var r;
    if (a.id) {
      dados.updated_at = new Date().toISOString();
      r = await sb.from("networking_anuncios").update(dados).eq("id", a.id).select().single();
    } else {
      r = await sb.from("networking_anuncios").insert(dados).select().single();
    }
    if (r.error) throw r.error;
    var salvo = mapAnuncio(r.data);
    cache.anuncios = cache.anuncios.filter(function (x) { return x.id !== salvo.id; });
    cache.anuncios.unshift(salvo);
    return salvo;
  }

  async function removerAnuncio(id) {
    cache.anuncios = cache.anuncios.filter(function (x) { return x.id !== id; });
    var r = await sb.from("networking_anuncios").delete().eq("id", id);
    if (r.error) throw r.error;
  }

  /* Envia a foto do produto pro armário público e devolve o link. */
  async function uploadFotoAnuncio(file) {
    var ext = (String(file.name || "foto").split(".").pop() || "jpg").toLowerCase();
    var path = uid() + "/" + Date.now() + "." + ext;
    var up = await sb.storage.from("anuncios").upload(path, file, {
      upsert: true, contentType: file.type || "image/jpeg"
    });
    if (up.error) throw up.error;
    return sb.storage.from("anuncios").getPublicUrl(path).data.publicUrl;
  }

  /* Eventos da rede que a própria aluna anunciante criou. */
  function meusEventosRede() {
    var u = uid();
    return (SEED.eventos || []).filter(function (ev) { return ev.donoId === u; });
  }

  async function salvarEventoRede(ev) {
    var dados = {
      titulo: ev.titulo, data_hora: ev.data_hora, link: ev.link || null,
      user_id: uid(), autor_nome: alunaAtual ? alunaAtual.nome : null
    };
    var r = ev.id
      ? await sb.from("eventos").update(dados).eq("id", ev.id).select().single()
      : await sb.from("eventos").insert(dados).select().single();
    if (r.error) throw r.error;
    return r.data;
  }

  async function removerEventoRede(id) {
    var r = await sb.from("eventos").delete().eq("id", id);
    if (r.error) throw r.error;
  }

  /* ======================================================
     NOVIDADES (aviso dentro do app — por aparelho)
     ====================================================== */
  var CHAVE_VISTO = "ca.visto";
  function lerVisto() {
    try { return JSON.parse(localStorage.getItem(CHAVE_VISTO) || "{}"); }
    catch (e) { return {}; }
  }
  function salvarVisto(v) {
    try { localStorage.setItem(CHAVE_VISTO, JSON.stringify(v)); } catch (e) {}
  }
  function marcarVisto(oque) {
    var v = lerVisto();
    v[oque] = new Date().toISOString();
    salvarVisto(v);
  }
  function novidades() {
    var v = lerVisto();
    var agora = new Date().toISOString();
    var mudou = false;
    if (!v.anuncios) { v.anuncios = agora; mudou = true; }  /* 1ª vez: nada é "novo" */
    if (!v.eventos) { v.eventos = agora; mudou = true; }
    if (mudou) salvarVisto(v);

    var na = cache.anuncios.filter(function (a) {
      return a.autorId !== uid() && String(a.data) > v.anuncios;
    }).length;
    var ne = (SEED.eventos || []).filter(function (e) {
      return e.donoId !== uid() && e.criadoEm && String(e.criadoEm) > v.eventos;
    }).length;
    return { anuncios: na, eventos: ne, total: na + ne };
  }

  /* ======================================================
     PAINEL DA MENTORA (o RLS garante que só mentora escreve)
     ====================================================== */

  async function recarregarCatalogo() {
    catalogoCarregado = false;
    await carregarCatalogo();
  }

  async function adminAlunas() {
    var r = await sb.from("perfis").select("id, nome, email, papel, created_at").order("nome");
    if (r.error) throw r.error;
    return r.data || [];
  }

  async function adminAcessosDe(userId) {
    var r = await sb.from("acessos").select("id, produto_id").eq("user_id", userId);
    if (r.error) throw r.error;
    return (r.data || []).map(function (a) {
      return { id: a.id, produtoSlug: slugPorProdutoId[a.produto_id] || null };
    });
  }

  async function adminLiberar(userId, produtoSlug) {
    var pid = produtoIdPorSlug[produtoSlug];
    if (!pid) throw new Error("produto desconhecido");
    var r = await sb.from("acessos").insert({ user_id: userId, produto_id: pid });
    if (r.error && r.error.code !== "23505") throw r.error;
  }

  async function adminTirar(userId, produtoSlug) {
    var pid = produtoIdPorSlug[produtoSlug];
    if (!pid) throw new Error("produto desconhecido");
    var r = await sb.from("acessos").delete().eq("user_id", userId).eq("produto_id", pid);
    if (r.error) throw r.error;
  }

  async function adminAulas(produtoSlug, pilarId) {
    var pid = produtoIdPorSlug[produtoSlug];
    if (!pid) return [];
    var q = sb.from("aulas").select("*").eq("produto_id", pid);
    if (pilarId) q = q.eq("pilar_id", pilarId);
    var r = await q.order("ordem");
    if (r.error) throw r.error;
    return r.data || [];
  }

  async function adminSalvarAula(produtoSlug, a) {
    var dados = {
      produto_id: produtoIdPorSlug[produtoSlug],
      codigo: a.codigo || null, titulo: a.titulo,
      tipo: a.tipo || "video", conteudo: a.conteudo || null,
      video_url: a.video_url || null, ordem: a.ordem || 0,
      turma_id: a.turma_id || null,
      pilar_id: a.pilar_id || null,
      data_aula: a.data_aula || null
    };
    var r = a.id
      ? await sb.from("aulas").update(dados).eq("id", a.id).select().single()
      : await sb.from("aulas").insert(dados).select().single();
    if (r.error) throw r.error;
    return r.data;
  }

  async function adminRemoverAula(id) {
    var r = await sb.from("aulas").delete().eq("id", id);
    if (r.error) throw r.error;
  }

  async function adminSalvarProduto(slug, campos) {
    var r = await sb.from("produtos").update(campos)
      .eq("id", produtoIdPorSlug[slug]).select().single();
    if (r.error) throw r.error;
    return r.data;
  }

  /* ---- Pilares do Grupo VIP ---- */
  async function adminPilares(produtoSlug) {
    var pid = produtoIdPorSlug[produtoSlug];
    if (!pid) return [];
    var r = await sb.from("produto_pilares").select("*")
      .eq("produto_id", pid).order("ordem");
    if (r.error) throw r.error;
    return r.data || [];
  }

  async function adminSalvarPilar(produtoSlug, pl) {
    var dados = {
      produto_id: produtoIdPorSlug[produtoSlug],
      slug: pl.slug, nome: pl.nome, descricao: pl.descricao || null,
      capa_url: pl.capa_url || null,
      cadencia_ao_vivo: pl.cadencia_ao_vivo || null,
      aberto: !!pl.aberto, ao_vivo: !!pl.ao_vivo, ordem: pl.ordem || 0
    };
    var r = pl.id
      ? await sb.from("produto_pilares").update(dados).eq("id", pl.id).select().single()
      : await sb.from("produto_pilares").insert(dados).select().single();
    if (r.error) throw r.error;
    return r.data;
  }

  async function adminRemoverPilar(id) {
    var r = await sb.from("produto_pilares").delete().eq("id", id);
    if (r.error) throw r.error;
  }

  /* Envia uma capa (foto) pro armário público 'capas' e devolve o link. */
  async function adminUploadCapa(file) {
    var ext = (String(file.name || "capa").split(".").pop() || "jpg").toLowerCase();
    var path = "pilares/" + Date.now() + "." + ext;
    var up = await sb.storage.from("capas").upload(path, file, {
      upsert: true, contentType: file.type || "image/jpeg"
    });
    if (up.error) throw up.error;
    return sb.storage.from("capas").getPublicUrl(path).data.publicUrl;
  }

  async function adminEventos() {
    var r = await sb.from("eventos").select("*").order("data_hora");
    if (r.error) throw r.error;
    return (r.data || []).map(function (ev) {
      return {
        id: ev.id, titulo: ev.titulo, data_hora: ev.data_hora,
        produtoSlug: ev.produto_id ? slugPorProdutoId[ev.produto_id] : null,
        pilarSlug: ev.pilar_id ? pilarSlugPorId[ev.pilar_id] : null,
        link: ev.link
      };
    });
  }

  async function adminSalvarEvento(ev) {
    var produtoId = ev.produtoSlug ? produtoIdPorSlug[ev.produtoSlug] : null;
    var dados = {
      titulo: ev.titulo, data_hora: ev.data_hora,
      produto_id: produtoId,
      pilar_id: (produtoId && ev.pilarSlug)
        ? pilarIdPorChave[produtoId + "|" + ev.pilarSlug] || null
        : null,
      link: ev.link || null
    };
    var r = ev.id
      ? await sb.from("eventos").update(dados).eq("id", ev.id).select().single()
      : await sb.from("eventos").insert(dados).select().single();
    if (r.error) throw r.error;
    return r.data;
  }

  async function adminRemoverEvento(id) {
    var r = await sb.from("eventos").delete().eq("id", id);
    if (r.error) throw r.error;
  }

  /* ======================================================
     O que o app usa
     ====================================================== */

  return {
    alunaLogada: alunaLogada,
    carregarSessao: carregarSessao,
    cadastrar: cadastrar,
    entrarComSenha: entrarComSenha,
    enviarResetSenha: enviarResetSenha,
    definirNovaSenha: definirNovaSenha,
    sair: sair,
    linkMaterial: linkMaterial,
    slugDoProduto: slugDoProduto,
    idDoProdutoSlug: idDoProdutoSlug,

    aulaConcluida: aulaConcluida,
    alternarAula: alternarAula,
    contarConcluidas: contarConcluidas,
    proximaAulaEmAberto: proximaAulaEmAberto,

    humorDeHoje: humorDeHoje,
    definirHumor: definirHumor,

    devocionalLidoHoje: devocionalLidoHoje,
    alternarDevocional: alternarDevocional,

    leituraFeita: leituraFeita,
    alternarLeitura: alternarLeitura,
    contarLeituras: contarLeituras,

    diarioDe: diarioDe,
    adicionarAnotacao: adicionarAnotacao,
    removerAnotacao: removerAnotacao,

    postsDoGrupo: postsDoGrupo,
    adicionarPost: adicionarPost,
    removerPost: removerPost,

    podeAnunciar: podeAnunciar,
    nichos: nichos,
    anunciosDoNicho: anunciosDoNicho,
    todosAnuncios: function () { return cache.anuncios.slice(); },
    meusAnuncios: meusAnuncios,
    salvarAnuncio: salvarAnuncio,
    removerAnuncio: removerAnuncio,
    uploadFotoAnuncio: uploadFotoAnuncio,
    meusEventosRede: meusEventosRede,
    salvarEventoRede: salvarEventoRede,
    removerEventoRede: removerEventoRede,
    novidades: novidades,
    marcarVisto: marcarVisto,

    recarregarCatalogo: recarregarCatalogo,
    adminAlunas: adminAlunas,
    adminAcessosDe: adminAcessosDe,
    adminLiberar: adminLiberar,
    adminTirar: adminTirar,
    adminAulas: adminAulas,
    adminSalvarAula: adminSalvarAula,
    adminRemoverAula: adminRemoverAula,
    adminSalvarProduto: adminSalvarProduto,
    adminPilares: adminPilares,
    adminSalvarPilar: adminSalvarPilar,
    adminRemoverPilar: adminRemoverPilar,
    adminUploadCapa: adminUploadCapa,
    adminEventos: adminEventos,
    adminSalvarEvento: adminSalvarEvento,
    adminRemoverEvento: adminRemoverEvento
  };
})();
