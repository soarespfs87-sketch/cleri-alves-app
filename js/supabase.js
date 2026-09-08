/* ============================================================
   Conexão única com o Supabase
   ------------------------------------------------------------
   Um lugar só pra guardar o endereço do projeto e a chave.
   Se algum dia mudar, muda aqui e pronto.

   A chave abaixo é PÚBLICA (publishable / anon). Pode ficar no
   código do app, porque quem protege cada dado é o RLS que
   ligamos no banco — a chave é só "a porta da frente do prédio".
   ============================================================ */

window.SUPABASE_URL = "https://uarnqfipiiiuqpgirawc.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_wfhWRsWu7EooW5xH6etidw_KQO7RKoV";

/* Cliente que o resto do app usa: window.sb */
window.sb = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_ANON_KEY
);
