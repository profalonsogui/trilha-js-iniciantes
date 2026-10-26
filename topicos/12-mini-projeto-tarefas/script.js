/* =========================================================
   12 · Mini-projeto: lista de tarefas
   ========================================================= */

exemplo('ex-storage', function () {
  // Guardar um texto
  localStorage.setItem('intro-js:tema', 'escuro');
  console.log(localStorage.getItem('intro-js:tema')); // 'escuro'

  // Objetos precisam virar texto (JSON) antes de guardar
  const usuario = { nome: 'Ana', nivel: 2 };
  localStorage.setItem('intro-js:usuario', JSON.stringify(usuario));

  // ...e voltar a ser objeto na leitura
  const lido = JSON.parse(localStorage.getItem('intro-js:usuario'));
  console.log(lido.nome, lido.nivel);

  // Chave que não existe devolve null
  console.log(localStorage.getItem('intro-js:nao-existe'));

  // Apagar
  localStorage.removeItem('intro-js:tema');
  localStorage.removeItem('intro-js:usuario');
  console.log('Limpo!');
});

// O código abaixo É o app que está rodando no palco acima.
exemplo('app-tarefas', function () {
  const form = document.getElementById('form-tarefa');
  const campo = document.getElementById('campo-tarefa');
  const lista = document.getElementById('lista-tarefas');
  const contagem = document.getElementById('contagem');
  const CHAVE = 'intro-js:tarefas';

  // 1) ESTADO: array de objetos { id, texto, feita }
  let tarefas = carregar();

  function carregar() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch (erro) {
      return []; // JSON quebrado ou localStorage indisponível
    }
  }

  function salvar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(tarefas));
    } catch (erro) {
      console.warn('Não foi possível salvar', erro);
    }
  }

  // 2) RENDERIZAR: desenha a tela a partir do array
  function renderizar() {
    lista.innerHTML = '';

    tarefas.forEach((tarefa) => {
      const li = document.createElement('li');
      li.dataset.id = tarefa.id;
      li.className = tarefa.feita ? 'feito' : '';

      const texto = document.createElement('span');
      texto.textContent = tarefa.texto; // textContent evita injeção de HTML

      const remover = document.createElement('button');
      remover.type = 'button';
      remover.className = 'remover';
      remover.textContent = '✕';
      remover.setAttribute('aria-label', 'Remover tarefa');

      li.append(texto, remover);
      lista.appendChild(li);
    });

    const pendentes = tarefas.filter((t) => !t.feita).length;
    contagem.textContent = `${pendentes} pendente(s) de ${tarefas.length}`;
  }

  // 3) EVENTOS: mudam o estado → salvam → redesenham
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const texto = campo.value.trim();
    if (!texto) return; // ignora campo vazio

    tarefas.push({ id: Date.now(), texto: texto, feita: false });
    campo.value = '';
    salvar();
    renderizar();
  });

  // Delegação: um único ouvinte na lista inteira
  lista.addEventListener('click', (evento) => {
    const li = evento.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);

    if (evento.target.classList.contains('remover')) {
      tarefas = tarefas.filter((t) => t.id !== id); // remove
    } else {
      const tarefa = tarefas.find((t) => t.id === id);
      tarefa.feita = !tarefa.feita;                 // alterna feita/pendente
    }
    salvar();
    renderizar();
  });

  renderizar(); // primeira vez: mostra o que estava salvo
}, { auto: true, saida: false });
