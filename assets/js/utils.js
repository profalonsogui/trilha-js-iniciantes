/* =========================================================
   utils.js — ajudantes usados em TODAS as páginas do projeto

   Você NÃO precisa entender este arquivo para estudar JavaScript!
   Ele só faz o "trabalho de bastidor":

   exemplo(id, funcao, opcoes)
     1) mostra o código da função (colorido) dentro da <div id="...">
     2) cria o botão "▶ Executar"
     3) mostra na página tudo que o código mandar para console.log()

   Opções:
     auto:  true  → executa sozinho ao abrir a página (bom para eventos)
     saida: false → não mostra a caixa de saída (bom para exemplos de DOM)
     espera: 1500 → ms que a saída continua "ouvindo" (bom para setTimeout)
   ========================================================= */
(function () {
  'use strict';

  // Escapa caracteres especiais para exibir código dentro do HTML
  const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Realce de sintaxe bem simples (comentários, textos, palavras-chave, números)
  function destacar(codigo) {
    const re = new RegExp(
      '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                                   // 1: comentários
      '|(`(?:\\\\[\\s\\S]|[^`\\\\])*`|\'(?:\\\\.|[^\'\\\\\\n])*\'|"(?:\\\\.|[^"\\\\\\n])*")' + // 2: textos
      '|\\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|default|new|class|try|catch|finally|throw|async|await|of|in|typeof|instanceof|true|false|null|undefined|this)\\b' + // 3: palavras-chave
      '|\\b(\\d+(?:\\.\\d+)?)\\b',                                                  // 4: números
      'g'
    );
    let html = '';
    let ultimo = 0;
    let m;
    while ((m = re.exec(codigo)) !== null) {
      html += esc(codigo.slice(ultimo, m.index));
      const classe = m[1] ? 'com' : m[2] ? 'str' : m[3] ? 'kw' : 'num';
      html += '<span class="' + classe + '">' + esc(m[0]) + '</span>';
      ultimo = re.lastIndex;
    }
    return html + esc(codigo.slice(ultimo));
  }

  // Pega o texto do corpo da função e remove o recuo (indentação) extra
  function extrairCorpo(fn) {
    const src = fn.toString();
    const corpo = src.slice(src.indexOf('{') + 1, src.lastIndexOf('}'));
    const linhas = corpo.replace(/\t/g, '  ').split('\n');
    while (linhas.length && !linhas[0].trim()) linhas.shift();
    while (linhas.length && !linhas[linhas.length - 1].trim()) linhas.pop();
    const recuos = linhas.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
    const recuo = recuos.length ? Math.min(...recuos) : 0;
    return linhas.map((l) => l.slice(recuo)).join('\n');
  }

  // Converte qualquer valor em texto legível para a caixa de saída
  function formatar(v) {
    if (typeof v === 'string') return v;
    if (typeof v === 'undefined') return 'undefined';
    if (typeof v === 'function') return '[função ' + (v.name || 'anônima') + ']';
    if (typeof v === 'symbol') return v.toString();
    if (v instanceof Error) return v.name + ': ' + v.message;
    if (v instanceof Node) return '<' + (v.nodeName || '').toLowerCase() + '>';
    if (v instanceof NodeList || v instanceof HTMLCollection) return 'Lista(' + v.length + ')';
    if (v instanceof Set) return 'Set(' + JSON.stringify([...v]) + ')';
    if (v instanceof Map) return 'Map(' + JSON.stringify([...v]) + ')';
    if (typeof v === 'object' && v !== null) {
      try { return JSON.stringify(v); } catch (e) { return String(v); }
    }
    return String(v);
  }

  function exemplo(id, fn, opcoes) {
    const { auto = false, saida = true, espera = 0 } = opcoes || {};
    const alvo = document.getElementById(id);
    if (!alvo) { console.warn('exemplo(): elemento #' + id + ' não encontrado'); return; }

    alvo.classList.add('exemplo');
    alvo.innerHTML = '';

    const pre = document.createElement('pre');
    pre.className = 'codigo';
    const code = document.createElement('code');
    code.innerHTML = destacar(extrairCorpo(fn));
    pre.appendChild(code);
    alvo.appendChild(pre);

    const barra = document.createElement('div');
    barra.className = 'barra';
    alvo.appendChild(barra);

    let out = null;
    if (saida) {
      out = document.createElement('pre');
      out.className = 'saida';
      out.setAttribute('aria-live', 'polite');
      out.dataset.dica = 'A saída do console.log aparece aqui…';
      alvo.appendChild(out);
    }

    const escrever = (texto) => { if (out) out.textContent += texto + '\n'; };

    async function executar() {
      if (out) out.textContent = '';
      const original = console.log;
      // Enquanto o exemplo roda, console.log também escreve na página
      console.log = function () {
        original.apply(console, arguments);
        escrever(Array.prototype.map.call(arguments, formatar).join(' '));
      };
      try {
        await fn();
        if (espera) await new Promise((r) => setTimeout(r, espera));
      } catch (e) {
        const msg = e && e.message ? e.name + ': ' + e.message : (e && e.statusText) || 'falha na operação';
        escrever('❌ ' + msg);
      } finally {
        console.log = original;
      }
    }

    if (auto) {
      const nota = document.createElement('span');
      nota.className = 'nota';
      nota.textContent = '⚡ este exemplo já está rodando — interaja com o palco acima';
      barra.appendChild(nota);
      executar();
      return;
    }

    const btnRun = document.createElement('button');
    btnRun.type = 'button';
    btnRun.className = 'btn';
    btnRun.textContent = '▶ Executar';
    btnRun.addEventListener('click', executar);
    barra.appendChild(btnRun);

    if (saida) {
      const btnLimpar = document.createElement('button');
      btnLimpar.type = 'button';
      btnLimpar.className = 'btn btn-sec';
      btnLimpar.textContent = 'Limpar saída';
      btnLimpar.addEventListener('click', () => { out.textContent = ''; });
      barra.appendChild(btnLimpar);
    }
  }

  // Palcos com data-restaurar ganham um botão que devolve o HTML original
  function prepararPalcos() {
    document.querySelectorAll('.palco[data-restaurar]').forEach((palco) => {
      const original = palco.innerHTML;
      const acoes = document.createElement('div');
      acoes.className = 'palco-acoes';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-sec';
      btn.textContent = '↺ Restaurar palco';
      btn.addEventListener('click', () => { palco.innerHTML = original; });
      acoes.appendChild(btn);
      palco.insertAdjacentElement('afterend', acoes);
    });
  }

  // Realça blocos de código JS estáticos (<pre class="codigo estatico js">)
  function realcarEstaticos() {
    document.querySelectorAll('pre.codigo.estatico.js code').forEach((c) => {
      c.innerHTML = destacar(c.textContent);
    });
  }

  window.exemplo = exemplo;
  prepararPalcos();
  realcarEstaticos();
})();
