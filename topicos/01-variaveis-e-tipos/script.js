/* =========================================================
   01 · Variáveis e tipos de dados
   Cada exemplo abaixo aparece (com o código) na página index.html
   ========================================================= */

exemplo('ex-declarar', function () {
  // const → valor que NÃO será reatribuído (use por padrão)
  const nome = 'Ana';

  // let → valor que pode mudar depois
  let idade = 30;
  idade = 31; // ok! let permite reatribuir

  // var → forma antiga; evite (escopo confuso)
  var antigo = 'evite usar var';

  console.log(nome, idade, antigo);

  // Tentar mudar uma const gera erro:
  try {
    nome = 'Outro nome';
  } catch (erro) {
    console.log('Erro:', erro.message);
  }
});

exemplo('ex-tipos', function () {
  const texto = 'Olá';      // string
  const numero = 42;        // number
  const decimal = 3.14;     // number (inteiro e decimal são o mesmo tipo)
  const ativo = true;       // boolean
  const vazio = null;       // null → "sem valor", de propósito
  let semValor;             // undefined → declarada, mas sem valor

  console.log(typeof texto);    // 'string'
  console.log(typeof numero);   // 'number'
  console.log(typeof decimal);  // 'number'
  console.log(typeof ativo);    // 'boolean'
  console.log(typeof semValor); // 'undefined'
  console.log(typeof vazio);    // 'object' ← bug histórico do JS!
});

exemplo('ex-conversao', function () {
  console.log('10' + 5);          // '105'  (+ com texto concatena!)
  console.log(Number('10') + 5);  // 15     (converteu para número antes)
  console.log('10' - 5);          // 5      (- só faz sentido com números)

  console.log(parseInt('42px'));      // 42   (lê até onde der)
  console.log(parseFloat('3.14abc')); // 3.14
  console.log(Number('abc'));         // NaN  (Not a Number)

  console.log(String(123) + '!');     // '123!'
  console.log(Boolean(''), Boolean('texto'), Boolean(0)); // false true false
});

exemplo('ex-template', function () {
  const nome = 'Ana';
  const preco = 49.9;

  // Forma antiga: concatenando com +
  console.log('Olá, ' + nome + '! Total: R$ ' + preco);

  // Template string: crases e ${ }
  console.log(`Olá, ${nome}! Total: R$ ${preco.toFixed(2)}`);

  // Dá para fazer contas dentro do ${ }
  console.log(`Com 10% de desconto: R$ ${(preco * 0.9).toFixed(2)}`);
});
