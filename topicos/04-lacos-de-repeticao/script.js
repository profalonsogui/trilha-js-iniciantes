/* =========================================================
   04 · Laços de repetição
   ========================================================= */

exemplo('ex-for', function () {
  // for (início; condição; passo)
  for (let i = 1; i <= 5; i++) {
    console.log('Volta número', i);
  }
  // i começa em 1 → repete enquanto i <= 5 → soma 1 a cada volta
});

exemplo('ex-tabuada', function () {
  const numero = 7;

  for (let i = 1; i <= 10; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`);
  }
});

exemplo('ex-while', function () {
  // while: testa ANTES de cada volta
  let tentativas = 3;
  while (tentativas > 0) {
    console.log('Restam', tentativas, 'tentativas');
    tentativas--; // muda a condição → evita loop infinito
  }
  console.log('Acabaram as tentativas!');

  // do...while: executa PELO MENOS UMA vez (testa depois)
  let n = 10;
  do {
    console.log('do...while rodou 1 vez mesmo com n =', n);
    n++;
  } while (n < 5);
});

exemplo('ex-forof', function () {
  // for...of → valores de um array
  const frutas = ['maçã', 'banana', 'uva'];
  for (const fruta of frutas) {
    console.log('Fruta:', fruta);
  }

  // for...in → chaves de um objeto
  const pessoa = { nome: 'Ana', idade: 25, cidade: 'Campinas' };
  for (const chave in pessoa) {
    console.log(chave, '=', pessoa[chave]);
  }
});

exemplo('ex-break', function () {
  for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) continue; // pula os números pares
    if (i > 7) break;          // para quando passar de 7
    console.log('Ímpar:', i);
  }
  console.log('Fim do laço');
});
