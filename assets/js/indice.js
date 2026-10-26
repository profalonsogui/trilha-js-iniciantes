/* indice.js — marca tópicos como "concluídos" (salvo no navegador) */
(function () {
  'use strict';
  const CHAVE = 'intro-js:concluidos';

  const ler = () => {
    try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch (e) { return []; }
  };
  const salvar = (lista) => {
    try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch (e) { /* ignora */ }
  };

  const cards = document.querySelectorAll('.card[data-topico]');
  const barra = document.getElementById('barra-progresso');
  const texto = document.getElementById('texto-progresso');

  function atualizar() {
    const feitos = ler();
    cards.forEach((c) => c.classList.toggle('concluido', feitos.includes(c.dataset.topico)));
    const pct = Math.round((feitos.filter((f) => document.querySelector('[data-topico="' + f + '"]')).length / cards.length) * 100);
    if (barra) barra.style.width = pct + '%';
    if (texto) texto.textContent = pct + '% concluído';
  }

  // Clique com Shift (ou botão direito) alterna "concluído" sem abrir a página
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      const feitos = ler();
      const id = card.dataset.topico;
      salvar(feitos.includes(id) ? feitos.filter((f) => f !== id) : feitos.concat(id));
      atualizar();
    });
  });

  const btnReset = document.getElementById('btn-zerar');
  if (btnReset) btnReset.addEventListener('click', () => { salvar([]); atualizar(); });

  atualizar();
})();
