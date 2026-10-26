/* =========================================================
   03 · Condicionais
   ========================================================= */

exemplo('ex-if', function () {
  const nota = 7.5;

  if (nota >= 7) {
    console.log('Aprovado ✅');
  } else if (nota >= 5) {
    console.log('Recuperação ⚠️');
  } else {
    console.log('Reprovado ❌');
  }

  // Dica: troque o valor de "nota" no código acima (no seu editor) e teste de novo.
});

exemplo('ex-if-interativo', function () {
  const botao = document.getElementById('btn-nota');
  const campo = document.getElementById('campo-nota');
  const resultado = document.getElementById('resultado-nota');

  botao.addEventListener('click', () => {
    const nota = Number(campo.value); // valor do campo vem como texto → converte

    if (nota >= 7) {
      resultado.textContent = 'Aprovado ✅';
    } else if (nota >= 5) {
      resultado.textContent = 'Recuperação ⚠️';
    } else {
      resultado.textContent = 'Reprovado ❌';
    }
  });
}, { auto: true, saida: false });

exemplo('ex-switch', function () {
  const dia = 6; // 1 = segunda ... 7 = domingo

  switch (dia) {
    case 6:
    case 7:
      // vários "case" seguidos compartilham o mesmo bloco
      console.log('Fim de semana 🎉');
      break; // sem o break, o código "cai" para o próximo case!
    case 1:
      console.log('Segunda... bora começar a semana 💪');
      break;
    default:
      // default = "nenhum case combinou"
      console.log('Dia útil');
  }
});

exemplo('ex-ternario', function () {
  const idade = 16;

  // condição ? valorSeVerdadeiro : valorSeFalso
  const status = idade >= 18 ? 'maior de idade' : 'menor de idade';
  console.log(status);

  // Equivalente com if/else (mais longo):
  let statusIf;
  if (idade >= 18) {
    statusIf = 'maior de idade';
  } else {
    statusIf = 'menor de idade';
  }
  console.log(statusIf);
});

exemplo('ex-truthy', function () {
  const nome = '';       // texto vazio é falsy
  const itens = [];      // array vazio é truthy! (cuidado)

  if (nome) {
    console.log('Tem nome:', nome);
  } else {
    console.log('Nome vazio → caiu no else');
  }

  if (itens.length) {
    console.log('Tem itens');
  } else {
    console.log('Sem itens → para arrays, teste o .length');
  }
});
