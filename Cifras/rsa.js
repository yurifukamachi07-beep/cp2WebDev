let CHAVES = null;
let mensagemCifrada = [];

// Exponenciação modular rápida
function modExp(base, exp, mod) {
  base = BigInt(base);
  exp = BigInt(exp);
  mod = BigInt(mod);
  let resultado = 1n;
  while (exp > 0n) {
    if (exp % 2n === 1n) resultado = (resultado * base) % mod;
    base = (base * base) % mod;
    exp = exp / 2n;
  }
  return resultado;
}

// Gera as chaves RSA com base em p e q
function gerarChavesRSA(p, q) {
  const N = BigInt(p) * BigInt(q);
  const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);
  let E = 3n;
  // Encontrar E que seja coprimo com phi
  while (E < phi) {
    if (phi % E !== 0n) break;
    E++;
  }
  // Encontrar D tal que (D * E) % phi == 1
  let D = 1n;
  while (D < phi) {
    if ((D * E) % phi === 1n) break;
    D++;
  }
  return { publica: { E, N }, privada: { D, N } };
}

// Verifica se o número é primo
function isPrimo(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Gera as chaves a partir dos números inseridos
function gerarChaves() {
  const p = parseInt(document.getElementById("p").value);
  const q = parseInt(document.getElementById("q").value);

  if (!isPrimo(p) || !isPrimo(q)) {
    alert("Por favor, insira números primos válidos (ex: 17 e 19).");
    return;
  }

  CHAVES = gerarChavesRSA(p, q);

  document.getElementById("chavePublica").textContent = `(E = ${CHAVES.publica.E})`;
  document.getElementById("chavePrivada").textContent = `(D = ${CHAVES.privada.D})`;
  document.getElementById("valorN").textContent = CHAVES.publica.N;
}

// Cifra um texto com RSA
function cifrarRSA(texto, E, N) {
  const resultado = [];
  for (let i = 0; i < texto.length; i++) {
    const codigo = BigInt(texto.charCodeAt(i));
    const cifrado = modExp(codigo, E, N);
    resultado.push(cifrado.toString());
  }
  return resultado;
}

// Decifra um texto cifrado com RSA
function decifrarRSA(cifrado, D, N) {
  let resultado = "";
  for (let i = 0; i < cifrado.length; i++) {
    const decifrado = Number(modExp(BigInt(cifrado[i]), D, N));
    resultado += String.fromCharCode(decifrado);
  }
  return resultado;
}

// Botão: Cifrar
function cifrar() {
  if (!CHAVES) {
    alert("Gere as chaves primeiro!");
    return;
  }
  const texto = document.getElementById("mensagem").value;
  if (texto === "") {
    alert("Digite uma mensagem para cifrar.");
    return;
  }

  mensagemCifrada = cifrarRSA(texto, CHAVES.publica.E, CHAVES.publica.N);
  document.getElementById("cifrado").textContent = mensagemCifrada.join(", ");
  document.getElementById("decifrado").textContent = "";
}

// Botão: Decifrar
function decifrar() {
  if (!CHAVES || mensagemCifrada.length === 0) {
    alert("Nenhuma mensagem cifrada para decifrar!");
    return;
  }
  const texto = decifrarRSA(mensagemCifrada, CHAVES.privada.D, CHAVES.privada.N);
  document.getElementById("decifrado").textContent = texto;
}
