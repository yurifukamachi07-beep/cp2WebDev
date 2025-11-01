function cifrarCesar(mensagem, chave) {
  var resultado = "";
  var deslocamento = ((chave % 26) + 26) % 26;

  for (var i = 0; i < mensagem.length; i++) {
    var codigo = mensagem.charCodeAt(i);

    if (codigo >= 65 && codigo <= 90) {
      var novoCodigo = ((codigo - 65 + deslocamento) % 26) + 65;
      resultado += String.fromCharCode(novoCodigo);
    } else if (codigo >= 97 && codigo <= 122) {
      var novoCodigoMin = ((codigo - 97 + deslocamento) % 26) + 97;
      resultado += String.fromCharCode(novoCodigoMin);
    } else {
      resultado += mensagem[i];
    }
  }

  return resultado;
}