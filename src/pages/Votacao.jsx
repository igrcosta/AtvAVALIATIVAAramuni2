import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import {
  listarForaDaRoca,
  listarNaRoca,
  registrarVoto,
} from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [quantidadeVotos, setQuantidadeVotos] = useState(0);
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setQuantidadeVotos(quantidadeVotos + 1);
  }

  return (
    <main className="pagina votacao">
      <header className="pagina-cabecalho">
        <h1>Quem vai ser eliminado?</h1>
        <p>Parece que um dos peões vai colocar os pés para fora da fazenda.</p>
      </header>

      {ultimoVoto && (
        <p className="aviso voto-sucesso" role="status">
          Voto registrado para {ultimoVoto.nome}. Você já votou {quantidadeVotos}{' '}
          {quantidadeVotos === 1 ? 'vez' : 'vezes'}.{' '}
          <Link to="/resultado">Ver resultado</Link>
        </p>
      )}

      <section className="grade-roca" aria-label="Participantes na roça">
        {naRoca.map((participante) => (
          <ParticipanteCard
            key={participante.id}
            participante={participante}
            onVotar={handleVotar}
          />
        ))}
      </section>

      <section className="secao-fora-roca">
        <h2>Demais peões</h2>
        <p>Fora da roça esta semana, não adianta votar neles.</p>
        <div className="grade-fora-roca">
          {foraDaRoca.map((participante) => (
            <ParticipanteCard key={participante.id} participante={participante} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
