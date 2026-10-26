/* =========================================================
   06 · Arrays
   ========================================================= */

exemplo('ex-basico', function () {
  const cores = ['vermelho', 'verde'];

  cores.push('azul');      // adiciona no FIM
  cores.unshift('preto');  // adiciona no INÍCIO
  console.log(cores);      // ["preto","vermelho","verde","azul"]

  console.log(cores[0]);       // 'preto' (primeiro índice = 0)
  console.log(cores.length);   // 4 (tamanho)

  cores.pop();     // remove o último
  cores.shift();   // remove o primeiro
  console.log(cores); // ["vermelho","verde"]

  console.log(cores.includes('verde'));  // true
  console.log(cores.indexOf('verde'));   // 1 (-1 se não existir)
  console.log(cores.join(' | '));        // 'vermelho | verde'
});

exemplo('ex-map-filter', function () {
  const numeros = [1, 2, 3, 4, 5, 6];

  // map: transforma cada item → novo array
  const dobrados = numeros.map(n => n * 2);
  console.log('map:', dobrados);

  // filter: mantém só os que passam no teste
  const pares = numeros.filter(n => n % 2 === 0);
  console.log('filter:', pares);

  // find: o PRIMEIRO que passa no teste (ou undefined)
  const primeiro = numeros.find(n => n > 3);
  console.log('find:', primeiro);

  // reduce: resume tudo em um valor (começa em 0)
  const soma = numeros.reduce((total, n) => total + n, 0);
  console.log('reduce:', soma);

  // forEach: só percorre (não devolve nada)
  numeros.forEach((n, indice) => {
    if (indice < 2) console.log(`posição ${indice} → ${n}`);
  });
});

exemplo('ex-lista-objetos', function () {
  const produtos = [
    { nome: 'Mouse', preco: 50 },
    { nome: 'Teclado', preco: 120 },
    { nome: 'Monitor', preco: 800 },
  ];

  const baratos = produtos.filter(p => p.preco <= 120);
  console.log('Baratos:', baratos);

  const nomes = produtos.map(p => p.nome);
  console.log('Nomes:', nomes.join(', '));

  const total = produtos.reduce((acc, p) => acc + p.preco, 0);
  console.log('Total: R$', total);

  const monitor = produtos.find(p => p.nome === 'Monitor');
  console.log('Preço do monitor:', monitor.preco);

  // sort altera o array original → copie antes com [...produtos]
  const maisCaroPrimeiro = [...produtos].sort((a, b) => b.preco - a.preco);
  console.log('Ordem por preço:', maisCaroPrimeiro.map(p => p.nome));
});

exemplo('ex-spread', function () {
  const a = [1, 2];
  const b = [3, 4];

  const juntos = [...a, ...b];   // junta
  const copia = [...a];          // copia (outro array, não o mesmo)
  copia.push(99);
  console.log(juntos);  // [1,2,3,4]
  console.log(a);       // [1,2] → o original não mudou
  console.log(copia);   // [1,2,99]

  // Desestruturação: tirar valores do array em variáveis
  const [primeiro, segundo, ...resto] = [10, 20, 30, 40];
  console.log(primeiro, segundo, resto); // 10 20 [30,40]

  // slice(início, fim) copia um pedaço sem alterar o original
  console.log(juntos.slice(1, 3)); // [2,3]
});
