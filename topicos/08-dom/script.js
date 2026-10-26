/* =========================================================
   08 · DOM
   Dica: depois de executar, use "↺ Restaurar palco" para recomeçar.
   ========================================================= */

exemplo('ex-selecionar', function () {
  const titulo = document.getElementById('titulo-dom');    // por id
  const primeiro = document.querySelector('.texto-dom');   // primeiro com a classe
  const todos = document.querySelectorAll('.texto-dom');   // todos com a classe

  console.log('Título:', titulo.textContent);
  console.log('Primeiro parágrafo:', primeiro.textContent);
  console.log('Quantidade de .texto-dom:', todos.length);

  // querySelectorAll devolve uma lista → dá para percorrer com forEach
  todos.forEach((p, i) => console.log(`  [${i}]`, p.textContent));
});

exemplo('ex-alterar', function () {
  const titulo = document.getElementById('titulo-dom');

  titulo.textContent = 'Título alterado pelo JS ✨';  // troca o texto
  titulo.style.color = 'crimson';                      // estilo inline
  titulo.classList.add('destaque');                    // adiciona classe CSS
  titulo.setAttribute('title', 'Passe o mouse aqui');  // atributo HTML

  // innerHTML interpreta tags HTML
  const paragrafo = document.querySelector('.texto-dom');
  paragrafo.innerHTML = 'Texto com <strong>negrito</strong> e <em>itálico</em>';

  console.log('Classes do título:', titulo.className);
}, { saida: true });

exemplo('ex-criar', function () {
  const lista = document.getElementById('lista-dom');

  const novo = document.createElement('li');            // 1) cria
  novo.textContent = 'Item ' + (lista.children.length + 1); // 2) configura
  lista.appendChild(novo);                              // 3) coloca na página (no fim)

  // lista.prepend(novo)  → colocaria no início
  console.log('Itens na lista:', lista.children.length);
});

exemplo('ex-remover', function () {
  const lista = document.getElementById('lista-dom');
  const ultimo = lista.lastElementChild; // último <li>

  if (ultimo) {
    ultimo.remove(); // tira do DOM
    console.log('Removido! Restam', lista.children.length);
  } else {
    console.log('A lista já está vazia');
  }
});
