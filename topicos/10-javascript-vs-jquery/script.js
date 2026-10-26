/* =========================================================
   10 · JavaScript puro vs jQuery
   Cada exemplo tem a versão "-js" e a versão "-jq" fazendo a MESMA coisa.
   ========================================================= */

/* ---------- 1) Selecionar e alterar ---------- */
exemplo('ex1-js', function () {
  const titulo = document.querySelector('.p1-titulo');
  titulo.textContent = 'Olá, JavaScript puro!';
  titulo.style.color = 'royalblue';

  // Vários elementos → precisa percorrer
  document.querySelectorAll('.p1-texto').forEach((el) => {
    el.textContent = 'Alterado com JS puro';
  });
}, { saida: false });

exemplo('ex1-jq', function () {
  // $() seleciona; .text() e .css() podem ser encadeados
  $('.p1-titulo').text('Olá, jQuery!').css('color', 'seagreen');

  // Aplica em TODOS os .p1-texto automaticamente (sem forEach)
  $('.p1-texto').text('Alterado com jQuery');
}, { saida: false });

/* ---------- 2) Classes ---------- */
exemplo('ex2-js', function () {
  const alvo = document.getElementById('p2-alvo');
  alvo.classList.toggle('realce');
}, { saida: false });

exemplo('ex2-jq', function () {
  $('#p2-alvo').toggleClass('realce');
}, { saida: false });

/* ---------- 3) Evento de clique (auto: já ativo) ---------- */
exemplo('ex3-js', function () {
  const botao = document.getElementById('p3-btn-js');
  let cliques = 0;

  botao.addEventListener('click', () => {
    cliques++;
    document.getElementById('p3-out-js').textContent = cliques;
  });
}, { auto: true, saida: false });

exemplo('ex3-jq', function () {
  let cliques = 0;

  $('#p3-btn-jq').on('click', function () {
    cliques++;
    $('#p3-out-jq').text(cliques);
  });
}, { auto: true, saida: false });

/* ---------- 4) Criar e inserir ---------- */
exemplo('ex4-js', function () {
  const lista = document.getElementById('p4-lista');
  const li = document.createElement('li');
  li.textContent = 'Item (JS) ' + (lista.children.length + 1);
  lista.appendChild(li);
}, { saida: false });

exemplo('ex4-jq', function () {
  // .append() aceita uma string HTML direto
  const total = $('#p4-lista li').length + 1;
  $('#p4-lista').append('<li>Item (jQuery) ' + total + '</li>');
}, { saida: false });

/* ---------- 5) Efeitos ---------- */
exemplo('ex5-js', function () {
  const caixa = document.getElementById('p5-caixa-js');
  caixa.classList.toggle('escondida'); // a animação está no CSS (transition)
}, { saida: false });

exemplo('ex5-jq', function () {
  // Animação pronta: desliza para cima/baixo em 400 ms
  $('#p5-caixa-jq').slideToggle(400);
}, { saida: false });

/* ---------- 6) Buscar dados de uma API ---------- */
exemplo('ex6-js', async function () {
  const resposta = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const dados = await resposta.json();
  console.log('Título da tarefa:', dados.title);
});

exemplo('ex6-jq', async function () {
  // $.getJSON já faz o parse do JSON (e o "await" funciona com ele)
  // Estilo clássico: $.getJSON(url).done(fn).fail(fn)
  const dados = await $.getJSON('https://jsonplaceholder.typicode.com/todos/1');
  console.log('Título da tarefa:', dados.title);
});
