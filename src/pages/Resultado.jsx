import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  calcularResultado,
  calcularTotalVotos,
  obterVotos,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(obterVotos);

  const totalVotos = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerarVotacao() {
    if (window.confirm('Tem certeza de que deseja zerar a votação?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina resultado">
      <header className="pagina-cabecalho">
        <h1>Parcial da eliminação</h1>
        <p className="total-votos">
          <strong>{totalVotos}</strong> {totalVotos === 1 ? 'voto computado' : 'votos computados'}
        </p>
      </header>

      {totalVotos === 0 ? (
        <section className="resultado-vazio">
          <h2>Nenhum voto por aqui ainda</h2>
          <p>
            <Link to="/votacao">Participe da votação</Link> e ajude a decidir quem vai sair da
            fazenda.
          </p>
        </section>
      ) : (
        <ol className="placar">
          {resultado.map((participante, indice) => (
            <li
              className={`placar-item ${indice === 0 ? 'placar-lider' : ''}`}
              key={participante.id}
            >
              <img src={participante.foto} alt={`Foto de ${participante.nome}`} />
              <div className="placar-conteudo">
                <div className="placar-nome">
                  <h2>{participante.nome}</h2>
                  {indice === 0 ? <span className="selo-lider">Sairia hoje</span> : null}
                </div>
                <div
                  className="barra"
                  role="img"
                  aria-label={`${participante.percentual.toLocaleString('pt-BR', {
                    maximumFractionDigits: 1,
                  })}% dos votos`}
                >
                  <span
                    className="barra-preenchida"
                    style={{ width: `${participante.percentual}%` }}
                  />
                </div>
                <p>
                  {participante.percentual.toLocaleString('pt-BR', {
                    maximumFractionDigits: 1,
                  })}
                  % ({participante.votos} {participante.votos === 1 ? 'voto' : 'votos'})
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}

      <button className="botao botao-zerar" onClick={handleZerarVotacao} type="button">
        Zerar votação
      </button>
    </main>
  );
}

export default Resultado;
