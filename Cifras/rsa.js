    function modExp(base, exp, mod) {
      let resultado = 1n;
      base = BigInt(base) % BigInt(mod);
      exp = BigInt(exp);
      mod = BigInt(mod);

      while (exp > 0n) {
        if (exp % 2n === 1n) resultado = (resultado * base) % mod;
        base = (base * base) % mod;
        exp = exp / 2n;
      }
      return resultado;
    }

    function gerarChavesRSA(p, q) {
      const N = p * q;
      const phi = (p - 1) * (q - 1);
      let E = 3;
      while (E < phi) {
        if ((phi % E !== 0) && ((p - 1) % E !== 0) && ((q - 1) % E !== 0)) break;
        E++;
      }
      let D = 1;
      while (D < phi) {
        if ((D * E) % phi === 1) break;
        D++;
      }
      return { publica: { E, N }, privada: { D, N } };
    }

    function cifrarRSA(texto, E, N) {
      const resultado = [];
      for (let i = 0; i < texto.length; i++) {
        const codigo = texto.charCodeAt(i);
        const cifrado = Number(modExp(codigo, E, N));
        resultado.push(cifrado);
      }
      return resultado;
    }

    function decifrarRSA(cifrado, D, N) {
      let resultado = "";
      for (let i = 0; i < cifrado.length; i++) {
        const decifrado = Number(modExp(cifrado[i], D, N));
        resultado += String.fromCharCode(decifrado);
      }
      return resultado;
    }

    const P = 17;
    const Q = 19;
    const CHAVES = gerarChavesRSA(P, Q);
    let mensagemCifrada = [];

    document.getElementById("chavePublica").textContent = `(E = ${CHAVES.publica.E})`;
    document.getElementById("chavePrivada").textContent = `(D = ${CHAVES.privada.D})`;
    document.getElementById("valorN").textContent = CHAVES.publica.N;

    function cifrar() {
      const texto = document.getElementById("mensagem").value;
      mensagemCifrada = cifrarRSA(texto, CHAVES.publica.E, CHAVES.publica.N);
      document.getElementById("cifrado").textContent = mensagemCifrada.join(", ");
      document.getElementById("decifrado").textContent = "";
    }

    function decifrar() {
      const texto = decifrarRSA(mensagemCifrada, CHAVES.privada.D, CHAVES.privada.N);
      document.getElementById("decifrado").textContent = texto;
    }
