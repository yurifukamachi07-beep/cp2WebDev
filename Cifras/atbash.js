function cifrarAtbash(mensagem) {
  var resultado = "";

  for (var i = 0; i < mensagem.length; i++) {
    var codigo = mensagem.charCodeAt(i);

    if (codigo >= 65 && codigo <= 90) {
      var novoCodigo = 90 - (codigo - 65);
      resultado += String.fromCharCode(novoCodigo);
    } else if (codigo >= 97 && codigo <= 122) {
      var novoCodigoMin = 122 - (codigo - 97);
      resultado += String.fromCharCode(novoCodigoMin);
    } else {
      resultado += mensagem[i];
    }
  }

  return resultado;
}