/* =========================================================
   11 · Assincronismo
   ========================================================= */

exemplo('ex-timeout', function () {
  console.log('1) Início');

  // Agenda a função para daqui a 1000 ms (1 segundo) e SEGUE em frente
  setTimeout(() => {
    console.log('3) Rodou depois de 1 segundo');
  }, 1000);

  console.log('2) Fim do código (o timer ainda não terminou)');
}, { espera: 1300 });

exemplo('ex-interval', function () {
  let segundos = 0;

  // setInterval repete a cada 400 ms até alguém chamar clearInterval
  const id = setInterval(() => {
    segundos++;
    console.log('tick', segundos);

    if (segundos === 3) {
      clearInterval(id); // para o timer
      console.log('parou!');
    }
  }, 400);
}, { espera: 1600 });

exemplo('ex-promise', function () {
  // Criando uma Promise: resolve = deu certo, reject = deu erro
  function dividir(a, b) {
    return new Promise((resolve, reject) => {
      if (b === 0) {
        reject(new Error('Divisão por zero'));
      } else {
        resolve(a / b);
      }
    });
  }

  dividir(10, 2)
    .then((resultado) => console.log('10 / 2 =', resultado))
    .catch((erro) => console.log('Erro:', erro.message));

  dividir(1, 0)
    .then((resultado) => console.log('1 / 0 =', resultado))
    .catch((erro) => console.log('Erro:', erro.message))
    .finally(() => console.log('finally roda sempre'));
}, { espera: 100 });

exemplo('ex-async', async function () {
  // Função que devolve uma Promise que resolve depois de "ms" milissegundos
  const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function buscarUsuario() {
    console.log('Buscando usuário...');
    await esperar(800);                // "pausa" aqui sem travar a página
    console.log('Usuário encontrado!');
    return { nome: 'Ana' };
  }

  const usuario = await buscarUsuario(); // espera a função terminar
  console.log('Olá,', usuario.nome);
});

exemplo('ex-fetch', async function () {
  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/users/1');

    // fetch NÃO dá erro em 404/500 sozinho → confira resposta.ok
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);

    const usuario = await resposta.json(); // converte o corpo em objeto
    console.log('Nome:', usuario.name);
    console.log('E-mail:', usuario.email);
  } catch (erro) {
    console.log('Falhou:', erro.message);
  }
});

exemplo('ex-all', async function () {
  const esperar = (ms, valor) =>
    new Promise((resolve) => setTimeout(() => resolve(valor), ms));

  const inicio = Date.now();

  // As três tarefas começam juntas; Promise.all espera TODAS terminarem
  const [a, b, c] = await Promise.all([
    esperar(500, 'A'),
    esperar(700, 'B'),
    esperar(300, 'C'),
  ]);

  console.log(a, b, c);
  // Em sequência levaria ~1500 ms; em paralelo leva só ~700 ms
  console.log(Date.now() - inicio < 1200 ? 'Rodaram em paralelo ✅' : 'Rodaram em sequência');
});
