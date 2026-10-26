/* =========================================================
   05 · Funções
   ========================================================= */

exemplo('ex-declaracao', function () {
  // "nome" é o parâmetro; return devolve o resultado
  function saudar(nome) {
    return 'Olá, ' + nome + '!';
  }

  // Chamando a função (quantas vezes quiser)
  console.log(saudar('Ana'));
  console.log(saudar('Bruno'));

  // Função com dois parâmetros
  function somar(a, b) {
    return a + b;
  }
  const resultado = somar(2, 3);
  console.log('2 + 3 =', resultado);
});

exemplo('ex-formas', function () {
  // 1) Declaração
  function dobro1(n) {
    return n * 2;
  }

  // 2) Expressão de função (guardada numa variável)
  const dobro2 = function (n) {
    return n * 2;
  };

  // 3) Arrow function
  const dobro3 = (n) => {
    return n * 2;
  };

  // 3b) Arrow com retorno implícito (sem chaves e sem return)
  const dobro4 = n => n * 2;

  console.log(dobro1(5), dobro2(5), dobro3(5), dobro4(5)); // 10 10 10 10
});

exemplo('ex-padrao', function () {
  // Valor padrão: usado quando o argumento não é enviado
  function apresentar(nome = 'visitante', saudacao = 'Olá') {
    return `${saudacao}, ${nome}!`;
  }
  console.log(apresentar());              // Olá, visitante!
  console.log(apresentar('Ana'));         // Olá, Ana!
  console.log(apresentar('Ana', 'Oi'));   // Oi, Ana!

  // ...rest: junta todos os argumentos em um array
  function somarTudo(...numeros) {
    let total = 0;
    for (const n of numeros) total += n;
    return total;
  }
  console.log(somarTudo(1, 2, 3, 4)); // 10
});

exemplo('ex-escopo', function () {
  const global = 'visível em todo lugar';

  function teste() {
    const local = 'só existe aqui dentro';
    console.log(global); // ok: funções enxergam o que está "fora"
    console.log(local);
  }
  teste();

  // Fora da função, "local" não existe:
  console.log(typeof local); // 'undefined'

  // let/const também respeitam blocos { }
  if (true) {
    let dentroDoBloco = 'só neste bloco';
  }
  console.log(typeof dentroDoBloco); // 'undefined'
});

exemplo('ex-callback', function () {
  // Callback: função recebida como argumento
  function executarDepois(acao) {
    console.log('Antes');
    acao(); // chama a função recebida
    console.log('Depois');
  }

  executarDepois(function () {
    console.log('Eu sou o callback!');
  });

  // Você já viu callbacks em arrays e eventos:
  [1, 2, 3].forEach((n) => console.log('forEach →', n));
});

exemplo('ex-closure', function () {
  // Closure: a função interna "lembra" da variável "total"
  function criarContador() {
    let total = 0;
    return function () {
      total++;
      return total;
    };
  }

  const contadorA = criarContador();
  const contadorB = criarContador(); // cada contador tem o seu próprio total

  console.log(contadorA(), contadorA(), contadorA()); // 1 2 3
  console.log(contadorB());                           // 1
});
