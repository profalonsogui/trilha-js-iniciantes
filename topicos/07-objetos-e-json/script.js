/* =========================================================
   07 · Objetos e JSON
   ========================================================= */

exemplo('ex-objeto', function () {
  const pessoa = {
    nome: 'Ana',
    idade: 28,
    hobbies: ['ler', 'correr'],
    endereco: { cidade: 'Campinas', estado: 'SP' }, // objeto dentro de objeto
    apresentar() {
      // "this" = o próprio objeto
      return `Oi, sou ${this.nome} e tenho ${this.idade} anos`;
    },
  };

  console.log(pessoa.nome);               // notação de ponto
  console.log(pessoa['idade']);           // notação de colchetes
  console.log(pessoa.endereco.cidade);    // acessando objeto aninhado
  console.log(pessoa.hobbies[0]);         // array dentro do objeto
  console.log(pessoa.apresentar());       // chamando o método

  pessoa.idade = 29;                      // alterar
  pessoa.profissao = 'Designer';          // adicionar nova propriedade
  delete pessoa.hobbies;                  // remover propriedade
  console.log(pessoa.idade, pessoa.profissao, pessoa.hobbies);
});

exemplo('ex-desestruturacao', function () {
  const usuario = { nome: 'Bruno', idade: 31, cidade: 'Santos' };

  // Desestruturação: cria variáveis a partir das propriedades
  const { nome, idade } = usuario;
  console.log(nome, idade);

  // Renomear: pega "cidade" e chama de "local"
  const { cidade: local } = usuario;
  console.log(local);

  // Spread: copia o objeto trocando só o que precisa
  const atualizado = { ...usuario, idade: 32, ativo: true };
  console.log(atualizado);
  console.log(usuario); // o original continua igual

  // Desestruturação direto nos parâmetros da função
  function mostrar({ nome, cidade }) {
    return `${nome} mora em ${cidade}`;
  }
  console.log(mostrar(usuario));
});

exemplo('ex-object-metodos', function () {
  const estoque = { maca: 10, banana: 0, uva: 4 };

  console.log(Object.keys(estoque));     // ["maca","banana","uva"]
  console.log(Object.values(estoque));   // [10,0,4]
  console.log(Object.entries(estoque));  // [["maca",10],["banana",0],["uva",4]]

  // Percorrendo com entries + desestruturação
  for (const [fruta, qtd] of Object.entries(estoque)) {
    console.log(`${fruta}: ${qtd > 0 ? qtd + ' un.' : 'esgotado'}`);
  }

  // Verificar se uma chave existe
  console.log('uva' in estoque);  // true
  console.log('pera' in estoque); // false
});

exemplo('ex-opcional', function () {
  const usuario = { nome: 'Ana', contato: { email: 'ana@exemplo.com' } };
  const visitante = { nome: 'Visitante' }; // sem "contato"

  console.log(usuario.contato?.email);           // 'ana@exemplo.com'
  console.log(visitante.contato?.email);         // undefined (sem erro!)
  console.log(visitante.contato?.email ?? 'sem e-mail'); // valor padrão

  // Sem o ?. isto daria erro:
  try {
    console.log(visitante.contato.email);
  } catch (erro) {
    console.log('Erro:', erro.message);
  }
});

exemplo('ex-json', function () {
  const tarefa = { id: 1, texto: 'Estudar JS', feita: false, tags: ['js', 'basico'] };

  // objeto → texto JSON
  const texto = JSON.stringify(tarefa);
  console.log(texto);
  console.log(typeof texto); // 'string'

  // texto JSON → objeto
  const objeto = JSON.parse(texto);
  console.log(objeto.texto, objeto.tags[1]);

  // O 2º e 3º argumentos deixam o JSON "bonito" (indentado)
  console.log(JSON.stringify(tarefa, null, 2));

  // JSON.parse com texto inválido gera erro → use try/catch
  try {
    JSON.parse('{ isso não é JSON }');
  } catch (erro) {
    console.log('JSON inválido!');
  }
});
