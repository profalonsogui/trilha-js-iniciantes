/* =========================================================
   02 · Operadores
   ========================================================= */

exemplo('ex-aritmeticos', function () {
  console.log(10 + 3);   // 13   soma
  console.log(10 - 3);   // 7    subtração
  console.log(10 * 3);   // 30   multiplicação
  console.log(10 / 4);   // 2.5  divisão
  console.log(10 % 3);   // 1    resto da divisão
  console.log(2 ** 3);   // 8    potência (2 × 2 × 2)

  // Atalhos de atribuição
  let n = 5;
  n += 2;   // n = n + 2  → 7
  n *= 3;   // n = n * 3  → 21
  n++;      // n = n + 1  → 22
  console.log('n =', n);
});

exemplo('ex-comparacao', function () {
  console.log(5 == '5');    // true  → == converte tipos (evite!)
  console.log(5 === '5');   // false → === compara valor E tipo ✅
  console.log(5 !== 3);     // true  → diferente
  console.log(7 > 3, 7 <= 3); // true false

  // Curiosidade: números decimais têm pequenas imprecisões
  console.log(0.1 + 0.2);                 // 0.30000000000000004
  console.log(0.1 + 0.2 === 0.3);         // false
  console.log((0.1 + 0.2).toFixed(2));    // '0.30' (arredondado)
});

exemplo('ex-logicos', function () {
  const idade = 20;
  const temCarteira = true;

  console.log(idade >= 18 && temCarteira);  // true  (os dois são verdadeiros)
  console.log(idade < 18 || temCarteira);   // true  (basta um)
  console.log(!temCarteira);                // false (inverte)

  // || devolve o primeiro valor "verdadeiro" → bom para valor padrão
  const apelido = '';
  console.log(apelido || 'Visitante');      // 'Visitante'

  // ?? só usa o padrão se for null/undefined (0 e '' são mantidos)
  const quantidade = 0;
  console.log(quantidade || 10);   // 10 → 0 é falsy, então || troca
  console.log(quantidade ?? 10);   // 0  → 0 é um valor válido
});
