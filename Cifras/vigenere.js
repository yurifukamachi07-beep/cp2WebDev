function cifrarVigenere(mensagem, palavraChave, modo = 'codificar') {
  let resultado = '';
  let chaveIndex = 0;

  for (let i = 0; i < mensagem.length; i++) {
    let char = mensagem[i];
    let codigo = mensagem.charCodeAt(i);
    let letraBase;
    let novaLetra;
    
    if (codigo >= 65 && codigo <= 90) {
      letraBase = 65; // base 'A'
    }
    else if (codigo >= 97 && codigo <= 122) {
      letraBase = 97; // base 'a'
    }
    else {
      resultado += char;
      continue;
    }

    let letraMensagem = codigo - letraBase;
    let codigoChave = palavraChave.charCodeAt(chaveIndex % palavraChave.length);
    if (codigoChave >= 65 && codigoChave <= 90) {
      codigoChave += 32;
    }

    let letraChave = codigoChave - 97;
    let deslocamento;
    if (modo === 'codificar') {
      deslocamento = (letraMensagem + letraChave) % 26;
    } else {
      deslocamento = (letraMensagem - letraChave + 26) % 26;
    }

    novaLetra = String.fromCharCode(letraBase + deslocamento);
    resultado += novaLetra;
    chaveIndex++;
  }
  return resultado;
}
