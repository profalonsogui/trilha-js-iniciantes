/* =========================================================
   09 · Eventos
   Todos os exemplos usam { auto: true }: já estão ativos na página.
   ========================================================= */

exemplo('ex-click', function () {
  const botao = document.getElementById('btn-contar');
  const contador = document.getElementById('contador');
  let cliques = 0;

  // "Quando clicar no botão, rode esta função"
  botao.addEventListener('click', () => {
    cliques++;
    contador.textContent = cliques;
  });
}, { auto: true, saida: false });

exemplo('ex-input', function () {
  const campo = document.getElementById('campo-nome');
  const eco = document.getElementById('eco');

  // "input" dispara a cada letra digitada
  campo.addEventListener('input', (evento) => {
    // evento.target = o elemento que disparou (o próprio campo)
    eco.textContent = evento.target.value || '…';
  });

  // "keydown" dispara ao apertar uma tecla; evento.key diz qual foi
  const campoTecla = document.getElementById('campo-tecla');
  const teclaOut = document.getElementById('tecla-out');
  campoTecla.addEventListener('keydown', (evento) => {
    teclaOut.textContent = evento.key === ' ' ? '(espaço)' : evento.key;
  });
}, { auto: true, saida: false });

exemplo('ex-submit', function () {
  const form = document.getElementById('form-login');
  const msg = document.getElementById('msg-form');

  form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // impede a página de recarregar

    const email = form.elements['email'].value.trim();

    if (!email.includes('@')) {
      msg.textContent = 'E-mail inválido ❌';
      return; // sai da função
    }
    msg.textContent = `Bem-vindo(a), ${email}! ✅`;
  });
}, { auto: true, saida: false });

exemplo('ex-delegacao', function () {
  const lista = document.getElementById('lista-cliques');

  // UM único ouvinte na lista, em vez de um por <li>
  lista.addEventListener('click', (evento) => {
    const item = evento.target.closest('li'); // qual <li> foi clicado?
    if (!item) return;                        // clicou fora de um <li>
    item.classList.toggle('feito');           // risca / desriscar
  });

  // Itens criados DEPOIS também funcionam automaticamente
  document.getElementById('btn-add-item').addEventListener('click', () => {
    const li = document.createElement('li');
    li.textContent = 'Novo item ' + (lista.children.length + 1);
    lista.appendChild(li);
  });
}, { auto: true, saida: false });
