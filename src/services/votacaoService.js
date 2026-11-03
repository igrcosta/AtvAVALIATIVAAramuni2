import participantes from '../data/participantes.js';

// Chave usada para guardar os votos no localStorage do navegador.
const CHAVE_VOTOS = 'fazenda2026:votos';

// Retorna todos os participantes da temporada.
export function listarParticipantes() {
  return participantes;
}

// Retorna apenas os participantes que estão na roça (podem receber votos).
export function listarNaRoca() {
  return participantes.filter((p) => p.naRoca);
}

// Retorna os participantes que não estão na roça.
export function listarForaDaRoca() {
  return participantes.filter((p) => !p.naRoca);
}

// Lê os votos salvos no localStorage. Formato: { [idDoParticipante]: quantidade }
export function obterVotos() {
  const salvo = localStorage.getItem(CHAVE_VOTOS);
  if (!salvo) {
    return {};
  }

  let votos;
  try {
    votos = JSON.parse(salvo);
  } catch (error) {
    throw new Error('Os votos salvos estão inválidos. Zere a votação para começar novamente.', {
      cause: error,
    });
  }

  const idsNaRoca = new Set(listarNaRoca().map((participante) => String(participante.id)));
  const votosValidos =
    votos !== null &&
    typeof votos === 'object' &&
    !Array.isArray(votos) &&
    Object.entries(votos).every(
      ([id, quantidade]) =>
        idsNaRoca.has(id) && Number.isSafeInteger(quantidade) && quantidade >= 0,
    );

  if (!votosValidos) {
    throw new Error('Os votos salvos estão inválidos. Zere a votação para começar novamente.');
  }

  return votos;
}

// Registra 1 voto para eliminar o participante informado e devolve o placar atualizado.
// Lança um erro se o participante não estiver na roça.
export function registrarVoto(idParticipante) {
  const participante = participantes.find((p) => p.id === idParticipante);
  if (!participante || !participante.naRoca) {
    throw new Error('Só é possível votar em participantes que estão na roça.');
  }
  const votos = obterVotos();
  votos[idParticipante] = (votos[idParticipante] || 0) + 1;
  localStorage.setItem(CHAVE_VOTOS, JSON.stringify(votos));
  return votos;
}

// Soma todos os votos registrados.
export function calcularTotalVotos(votos) {
  return Object.values(votos).reduce((soma, qtd) => soma + qtd, 0);
}

// Monta o resultado da votação: cada participante da roça com seus votos e percentual,
// ordenado do mais votado para o menos votado.
export function calcularResultado(votos) {
  const total = calcularTotalVotos(votos);
  return listarNaRoca()
    .map((p) => {
      const qtd = votos[p.id] || 0;
      return {
        ...p,
        votos: qtd,
        percentual: total === 0 ? 0 : (qtd / total) * 100,
      };
    })
    .sort((a, b) => b.votos - a.votos);
}

// Apaga todos os votos (reinicia a votação).
export function zerarVotos() {
  localStorage.removeItem(CHAVE_VOTOS);
}
